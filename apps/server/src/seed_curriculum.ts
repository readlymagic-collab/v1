import mongoose from 'mongoose';
import Word from './models/Word';
import * as googleTTS from 'google-tts-api';
import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { config } from './config';

interface WordSection {
  level: number;
  phase: 1 | 2 | 3;
  phaseLabel: string;
  words: string[];
}

const wordsData: WordSection[] = [
  // LEVEL 0
  { level: 0, phase: 1, phaseLabel: "Beginning of Year (Sept-Nov)", words: ["a", "and", "I", "in", "is", "it", "the", "to", "we", "you", "can", "go", "like", "see", "me", "my", "up"] },
  { level: 0, phase: 2, phaseLabel: "Middle of Year (Dec-Feb)", words: ["look", "come", "help", "here", "for", "on", "not", "am", "do", "said", "are", "he", "she", "was"] },
  { level: 0, phase: 3, phaseLabel: "End of Year (March-May)", words: ["away", "big", "blue", "down", "find", "funny", "jump", "make", "one", "play", "red", "run", "three", "two", "where", "yellow", "with", "this", "that", "yes", "no", "what", "an", "be", "good", "has", "him"] },

  // LEVEL 1
  { level: 1, phase: 1, phaseLabel: "Beginning of Year (Sept-Nov)", words: ["am", "are", "at", "be", "black", "brown", "but", "came", "did", "do", "eat", "four", "get", "good", "have", "he", "into", "like"] },
  { level: 1, phase: 2, phaseLabel: "Middle of Year (Dec-Feb)", words: ["must", "new", "no", "now", "on", "our", "out", "please", "pretty", "ran", "ride", "saw", "say", "she", "so", "soon", "that", "there", "they", "this"] },
  { level: 1, phase: 3, phaseLabel: "End of Year (Mar-May)", words: ["after", "again", "all", "an", "any", "as", "ask", "by", "could", "every", "fly", "from", "give", "going", "had", "has", "her", "him", "how", "just", "know", "let", "live", "may", "of", "old", "once", "open", "over", "put", "round", "some", "stop", "take", "thank", "them", "then", "think", "too", "under", "walk", "want", "was", "well", "went", "were", "what", "when", "white", "who", "why", "will", "with", "yes", "been", "if", "off", "their", "your", "does", "because"] },

  // LEVEL 2
  { level: 2, phase: 1, phaseLabel: "Beginning of Year (Sept-Nov)", words: ["always", "around", "because", "been", "before", "best", "both", "buy", "call", "cold", "does", "don't", "first", "found", "gave", "goes", "green", "its"] },
  { level: 2, phase: 2, phaseLabel: "Middle of Year (Dec-Feb)", words: ["made", "many", "off", "or", "pull", "read", "right", "sing", "sit", "sleep", "tell", "their", "these", "those", "upon", "us", "use", "very", "wash", "which"] },
  { level: 2, phase: 3, phaseLabel: "End of Year (Mar-May)", words: ["about", "after", "again", "also", "another", "any", "ask", "away", "back", "better", "big", "boy", "bring", "can't", "each", "even", "fast", "few", "five", "fun", "girl", "grow", "hold", "keep", "kind", "laugh", "light", "long", "much", "myself", "only", "own", "pick", "show", "six", "small", "start", "ten", "thank", "today", "together", "try", "under", "warm", "why", "wish", "work", "would", "write", "your", "away", "every", "once", "should", "again", "near", "also"] },

  // LEVEL 3
  { level: 3, phase: 1, phaseLabel: "Beginning of Year (Sept-Nov)", words: ["about", "better", "bring", "carry", "cut", "done", "draw", "eight", "fall", "far", "full", "got", "grow", "hold", "hot", "if", "keep", "kind", "laugh", "light"] },
  { level: 3, phase: 2, phaseLabel: "Middle of Year (Dec-Feb)", words: ["long", "much", "myself", "never", "only", "own", "pick", "seven", "shall", "show", "six", "small", "start", "ten", "today", "together", "try", "warm", "again", "also"] },
  { level: 3, phase: 3, phaseLabel: "End of Year (Mar-May)", words: ["almost", "answer", "any", "around", "ask", "because", "behind", "below", "between", "change", "children", "city", "class", "clean", "different", "drink", "early", "enough", "even", "every", "example", "family", "father", "few", "find", "food", "form", "found", "friends", "girl", "group", "head", "hurt", "idea", "important", "leave", "life", "might", "more", "mother", "move", "name", "near", "next", "paper", "part", "people", "place", "point", "read", "really", "school", "sentence", "should", "something", "sound", "still", "story", "such", "teacher", "than", "their", "them", "there", "thing", "thought", "through", "told", "took", "top", "under", "upon", "walk", "want", "watch", "while", "why", "word", "work", "world", "would", "write", "year", "young", "your", "across", "area", "became", "beautiful", "during", "favorite", "finally", "however", "important", "knew"] }
];

async function generateAudio(text: string) {
    const url = googleTTS.getAudioUrl(text, { lang: 'en', slow: false, host: 'https://translate.google.com' });
    const fileName = `${text.toLowerCase().replace(/\s+/g, '_')}.mp3`;
    const filePath = path.join(process.cwd(), 'uploads/words', fileName);
    
    if (fs.existsSync(filePath)) return `/uploads/words/${fileName}`;

    try {
        const response = await axios({ url, method: 'GET', responseType: 'stream' });
        const writer = fs.createWriteStream(filePath);
        response.data.pipe(writer);
        await new Promise((resolve, reject) => { writer.on('finish', resolve); writer.on('error', reject); });
        return `/uploads/words/${fileName}`;
    } catch (e) {
        return null;
    }
}

async function seed() {
    try {
        await mongoose.connect(config.mongoUri);
        console.log("Connected to MongoDB for seeding...");

        // CRITICAL: Drop ALL stale indexes to prevent conflicts
        console.log("🧹 Wiping stale database rules...");
        try {
            await Word.collection.dropIndexes();
            console.log("✅ Old rules wiped.");
        } catch (e) {
            console.log("ℹ️ Database clean.");
        }

        const dir = path.join(process.cwd(), 'uploads/words');
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

        for (const section of wordsData) {
            console.log(`\n📦 Level ${section.level} - ${section.phaseLabel}...`);
            for (const text of section.words) {
                // If existing in same level/phase, skip
                const existing = await Word.findOne({ text, level: section.level, phase: section.phase });
                if (existing) {
                    // Update label if missing
                    if (!existing.phaseLabel) {
                        existing.phaseLabel = section.phaseLabel;
                        await existing.save();
                    }
                    continue;
                }

                const audioUrl = await generateAudio(text);
                await Word.create({
                    text,
                    level: section.level,
                    phase: section.phase,
                    phaseLabel: section.phaseLabel,
                    type: 'sight',
                    audioUrl: audioUrl || undefined
                });
                process.stdout.write(".");
            }
        }

        console.log("\n\n✅ Magic Curriculum Seeding Complete with Phase Labels!");
        process.exit(0);
    } catch (error) {
        console.error("\n❌ Seeding failed:", error);
        process.exit(1);
    }
}

seed();
