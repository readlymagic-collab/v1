"use client";

import { useState, useRef } from "react";
import { 
  useGetWordsQuery, 
  useCreateWordMutation, 
  useDeleteWordMutation,
  useBulkUploadWordsMutation
} from "@/lib/redux/api/apiSlice";
import { Plus, Trash2, Search, BookOpen, Volume2, UploadCloud, CheckCircle2, ChevronRight, FileSpreadsheet, Loader2 } from "lucide-react";

export default function AdminWordsPage() {
  const { data, isLoading } = useGetWordsQuery();
  const [createWord] = useCreateWordMutation();
  const [deleteWord] = useDeleteWordMutation();
  const [bulkUpload, { isLoading: isUploading }] = useBulkUploadWordsMutation();

  const [newWord, setNewWord] = useState({ text: "", level: 0, phase: 1, type: "sight" });
  const [mode, setMode] = useState<"single" | "bulk" | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createWord(newWord).unwrap();
      setNewWord({ ...newWord, text: "" });
      setMode(null);
    } catch (err: any) {
      alert(err.data?.message || "Failed to add word");
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("level", String(newWord.level));

    try {
      const result = await bulkUpload(formData).unwrap();
      alert(`Magic Upload Complete!\nCreated: ${result.created}\nSkipped (Duplicates): ${result.skipped}\nErrors: ${result.errors}`);
      setMode(null);
    } catch (err: any) {
      alert(err.data?.message || "Excel upload failed. Check the file format.");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this word?")) {
      await deleteWord(id);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-zinc-800">Curriculum Library</h1>
          <p className="text-sm font-bold text-zinc-500 mt-1">Manage Levelled Word Content via Excel or Manual Entry.</p>
        </div>
        <div className="flex gap-3">
            <button 
                onClick={() => setMode(mode === "bulk" ? null : "bulk")}
                className="flex items-center gap-2 bg-brand-green/10 text-brand-green px-6 py-3 rounded-xl font-black text-sm hover:bg-brand-green/20 transition-all border border-brand-green/10"
            >
                <FileSpreadsheet className="h-4 w-4" /> Excel Upload
            </button>
            <button 
                onClick={() => setMode(mode === "single" ? null : "single")}
                className="flex items-center gap-2 bg-readly-blue text-white px-6 py-3 rounded-xl font-black text-sm hover:bg-readly-blue/90 transition-all shadow-lg shadow-readly-blue/20"
            >
                <Plus className="h-4 w-4" /> Add Word
            </button>
        </div>
      </div>

      {/* Excel Upload Area */}
      {mode === "bulk" && (
          <div className="bg-zinc-50 border-2 border-dashed border-zinc-200 p-12 rounded-3xl text-center animate-in fade-in zoom-in-95 duration-300">
             <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-brand-green/10 text-brand-green rounded-full flex items-center justify-center mx-auto mb-6">
                    <UploadCloud className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-black text-zinc-800">Upload Curriculum Sheet</h3>
                <p className="text-sm font-bold text-zinc-400 mt-2 mb-8">
                    Select an Excel (.xlsx) or CSV file. The system will auto-map columns like "Beginning", "Middle", and "End" to your Phase phases.
                </p>
                
                <div className="space-y-4">
                    <div>
                        <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest block mb-2">Target Base Level</label>
                        <select 
                            value={newWord.level}
                            onChange={e => setNewWord({...newWord, level: parseInt(e.target.value)})}
                            className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-white font-bold outline-none focus:border-readly-blue"
                        >
                            {[0, 1, 2, 3, 4, 5].map(lv => (
                                <option key={lv} value={lv}>Import into Level {lv}</option>
                            ))}
                        </select>
                    </div>

                    <input 
                        type="file" 
                        ref={fileInputRef}
                        accept=".xlsx, .xls, .csv"
                        className="hidden"
                        onChange={handleFileUpload}
                    />
                    
                    <button 
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploading}
                        className="w-full bg-zinc-800 text-white py-4 rounded-xl font-black flex items-center justify-center gap-3 hover:bg-zinc-900 transition-colors disabled:opacity-50"
                    >
                        {isUploading ? (
                            <><Loader2 className="h-5 w-5 animate-spin" /> Processing Sheet...</>
                        ) : (
                            <><FileSpreadsheet className="h-5 w-5" /> Select Excel File</>
                        )}
                    </button>
                    
                    <button onClick={() => setMode(null)} className="text-xs font-bold text-zinc-400 mt-4 hover:text-zinc-600 transition-colors">Cancel Upload</button>
                </div>
             </div>
          </div>
      )}

      {/* Single Add Form */}
      {mode === "single" && (
        <div className="bg-zinc-50 border border-zinc-100 p-8 rounded-3xl animate-in fade-in slide-in-from-top-4 duration-300 shadow-sm">
           <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Learning Level</label>
                    <select 
                        value={newWord.level}
                        onChange={e => setNewWord({...newWord, level: parseInt(e.target.value)})}
                        className="w-full mt-1 px-4 py-3 rounded-xl border border-zinc-200 bg-white font-bold outline-none focus:border-readly-blue"
                    >
                        {[0, 1, 2, 3, 4, 5].map(lv => (
                            <option key={lv} value={lv}>Level {lv}</option>
                        ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Current Phase</label>
                    <select 
                        value={newWord.phase}
                        onChange={e => setNewWord({...newWord, phase: parseInt(e.target.value)})}
                        className="w-full mt-1 px-4 py-3 rounded-xl border border-zinc-200 bg-white font-bold outline-none focus:border-readly-blue"
                    >
                        <option value={1}>Phase 1 (Beginning)</option>
                        <option value={2}>Phase 2 (Middle)</option>
                        <option value={3}>Phase 3 (End)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Word Category</label>
                    <select 
                        value={newWord.type}
                        onChange={e => setNewWord({...newWord, type: e.target.value as any})}
                        className="w-full mt-1 px-4 py-3 rounded-xl border border-zinc-200 bg-white font-bold outline-none focus:border-readly-blue"
                    >
                        <option value="sight">Sight Word</option>
                        <option value="phonetic">Phonetic</option>
                        <option value="challenge">Challenge</option>
                    </select>
                  </div>
              </div>

              <div>
                  <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">The Word</label>
                  <input 
                    type="text" 
                    value={newWord.text}
                    onChange={e => setNewWord({...newWord, text: e.target.value})}
                    placeholder="Type word here..."
                    className="w-full mt-1 px-4 py-3 rounded-xl border border-zinc-200 bg-white font-bold outline-none focus:border-readly-blue"
                    required
                  />
              </div>

              <div className="flex justify-end gap-3">
                 <button type="button" onClick={() => setMode(null)} className="px-6 py-3 font-bold text-zinc-400">Cancel</button>
                 <button className="bg-zinc-800 text-white px-8 py-3 rounded-xl font-black text-sm hover:bg-zinc-900 shadow-md">
                    Save Word
                 </button>
              </div>
           </form>
        </div>
      )}

      {/* Table Section */}
      <div className="bg-white border border-zinc-100 rounded-3xl overflow-hidden shadow-sm">
           <table className="w-full text-left border-collapse font-bold">
              <thead>
                 <tr className="bg-zinc-50/50 border-b border-zinc-100">
                    <th className="px-8 py-5 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Word</th>
                    <th className="px-8 py-5 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Gaming Level</th>
                    <th className="px-8 py-5 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Phase</th>
                    <th className="px-8 py-5 text-[10px] font-black text-zinc-400 uppercase tracking-widest text-right">Actions</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50">
                 {data?.data?.map((word: any) => (
                    <tr key={word._id} className="hover:bg-zinc-50/30 transition-colors group">
                       <td className="px-8 py-4 flex items-center gap-3">
                          <span className="text-zinc-800 text-lg font-black">{word.text}</span>
                          {word.audioUrl && <CheckCircle2 className="h-3 w-3 text-brand-green" />}
                       </td>
                       <td className="px-8 py-4 px-8 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-black text-readly-blue bg-readly-blue/5 px-3 py-1 rounded-lg border border-readly-blue/10">Level {word.level}</span>
                                <ChevronRight className="h-3 w-3 text-zinc-300" />
                            </div>
                       </td>
                       <td className="px-8 py-4">
                          <span className="text-[10px] bg-zinc-100 px-2.5 py-1 rounded-md text-zinc-600 uppercase tracking-wider">
                              {word.phaseLabel || (word.phase === 1 ? 'Phase 1 (Beginning)' : word.phase === 2 ? 'Phase 2 (Middle)' : 'Phase 3 (End)')}
                          </span>
                       </td>
                       <td className="px-8 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                             {word.audioUrl && (
                                <button 
                                  onClick={() => new Audio(word.audioUrl).play()}
                                  className="p-2 text-readly-blue hover:bg-readly-blue/10 rounded-lg transition-all"
                                >
                                   <Volume2 className="h-4 w-4" />
                                </button>
                             )}
                             <button 
                               onClick={() => handleDelete(word._id)}
                               className="p-2 text-zinc-200 hover:text-red-500 rounded-lg transition-all"
                             >
                                <Trash2 className="h-4 w-4" />
                             </button>
                          </div>
                       </td>
                    </tr>
                 ))}
              </tbody>
           </table>
           
           {!isLoading && data?.data?.length === 0 && (
             <div className="py-24 flex flex-col items-center justify-center">
                <BookOpen className="h-12 w-12 text-zinc-200 mb-4" />
                <h3 className="font-black text-zinc-800">No Levelled Content Yet</h3>
                <p className="text-zinc-400 text-sm mt-1">Ready to sync from your Excel sheet?</p>
             </div>
           )}
      </div>
    </div>
  );
}
