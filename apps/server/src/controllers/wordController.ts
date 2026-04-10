import { Request, Response } from 'express';
import Word from '../models/Word';
import * as googleTTS from 'google-tts-api';
import fs from 'fs';
import path from 'path';
import axios from 'axios';
import * as xlsx from 'xlsx';

// Helper to generate and save audio
async function generateWordAudio(text: string): Promise<string> {
  const fileName = `${text.toLowerCase().replace(/\s+/g, '_')}.mp3`;
  const filePath = path.join(process.cwd(), 'uploads/words', fileName);
  
  // If audio already exists, don't re-download (saves time/API calls)
  if (fs.existsSync(filePath)) return `/uploads/words/${fileName}`;

  const url = googleTTS.getAudioUrl(text, {
    lang: 'en',
    slow: false,
    host: 'https://translate.google.com',
  });

  try {
    const response = await axios({ url, method: 'GET', responseType: 'stream' });
    const writer = fs.createWriteStream(filePath);
    response.data.pipe(writer);
    await new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
    });
    return `/uploads/words/${fileName}`;
  } catch (e) {
    return "";
  }
}

export const getWords = async (req: Request, res: Response): Promise<any> => {
  try {
    const words = await Word.find().sort({ level: 1, phase: 1, text: 1 });
    return res.json({ success: true, count: words.length, data: words });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createWord = async (req: Request, res: Response): Promise<any> => {
  try {
    const { text } = req.body;
    const audioUrl = await generateWordAudio(text);
    const word = await Word.create({ ...req.body, audioUrl });
    return res.status(201).json({ success: true, data: word });
  } catch (error: any) {
    if (error.code === 11000) return res.status(400).json({ success: false, message: 'Word already exists' });
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const bulkUploadWords = async (req: Request, res: Response): Promise<any> => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });

    const workbook = xlsx.readFile(req.file.path);
    const results = { created: 0, skipped: 0, errors: 0 };

    // Iterate through ALL sheets in the Excel file
    for (const sheetName of workbook.SheetNames) {
      const worksheet = workbook.Sheets[sheetName];
      const rows: any[] = xlsx.utils.sheet_to_json(worksheet);
      
      // Determine base level from sheet name (e.g. "Level 0" -> 0)
      let baseLevel = 0;
      const levelMatch = sheetName.match(/\d+/);
      if (levelMatch) baseLevel = parseInt(levelMatch[0]);

      for (const row of rows) {
        try {
          // Define our magic keyword maps
          const mapping = [
            { keywords: ["Beginning", "Sept", "Phase 1"], phase: 1, level: baseLevel },
            { keywords: ["Middle", "Dec", "Phase 2"], phase: 2, level: baseLevel },
            { keywords: ["End", "March", "Phase 3"], phase: 3, level: baseLevel },
            // Handle "Master List" style columns
            { keywords: ["Kindergarten"], phase: 1, level: 0 },
            { keywords: ["1st Grade", "First Grade"], phase: 1, level: 1 },
            { keywords: ["2nd Grade", "Second Grade"], phase: 1, level: 2 },
            { keywords: ["3rd Grade", "Third Grade"], phase: 1, level: 3 },
          ];

          for (const [colHeader, cellValue] of Object.entries(row)) {
            if (!cellValue) continue;

            // Find match for this column
            const match = mapping.find(m => m.keywords.some(k => colHeader.toLowerCase().includes(k.toLowerCase())));
            
            if (match) {
                const text = String(cellValue).trim();
                const audioUrl = await generateWordAudio(text);
                
                await Word.create({
                    text,
                    level: match.level,
                    phase: match.phase as any,
                    phaseLabel: colHeader.trim(), // Store the actual header string!
                    type: 'sight',
                    audioUrl
                });
                results.created++;
            }
          }
        } catch (err: any) {
            if (err.code === 11000) results.skipped++;
            else results.errors++;
        }
      }
    }

    fs.unlinkSync(req.file.path); // Clean up temp file
    res.json({ success: true, ...results });

  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateWord = async (req: Request, res: Response): Promise<any> => {
  try {
    const word = await Word.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.json({ success: true, data: word });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteWord = async (req: Request, res: Response): Promise<any> => {
  try {
    await Word.findByIdAndDelete(req.params.id);
    return res.json({ success: true, message: 'Word deleted' });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};
