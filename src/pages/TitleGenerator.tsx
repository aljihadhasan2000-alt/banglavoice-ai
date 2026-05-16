import React, { useState } from "react";
import { generateWithAI, prompts } from "../services/geminiService";
import { 
  Search, 
  Copy, 
  Check, 
  Sparkles,
  RefreshCcw,
  Youtube,
  Hash,
  List
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import ReactMarkdown from "react-markdown";
import { useApp } from "../context/AppContext";
import toast from "react-hot-toast";

const categories = [
  "Movies", "Anime", "Gaming", "Tech", "Motivation", "Horror", "Football", "Crypto", "Islamic"
];

const TitleGenerator = () => {
  const [topic, setTopic] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const { addToHistory } = useApp();

  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast.error("Please enter a topic!");
      return;
    }

    setIsGenerating(true);
    setResult(null);

    try {
      const prompt = prompts.titles(topic, category);
      const res = await generateWithAI(prompt);
      setResult(res);
      addToHistory({
        toolId: "title-gen",
        input: topic,
        output: res
      });
      toast.success("Viral titles generated!");
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    toast.success("Result copied to clipboard!");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-2">Viral Title & SEO Generator</h2>
        <p className="text-white/50">Skyrocket your CTR with AI-powered clickbait and SEO titles.</p>
      </div>

      <div className="glass-card p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Video Topic</label>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. How to grow on YouTube 2024"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-red-500/50 transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 focus:outline-none focus:border-red-500/50 appearance-none transition-all text-white/80"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat} className="bg-[#0a0a0a] border-none">{cat}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={isGenerating || !topic.trim()}
          className="premium-button w-full flex items-center justify-center gap-2 group"
        >
          {isGenerating ? (
            <>
              <RefreshCcw className="w-5 h-5 animate-spin" />
              ANALYZING TRENDS...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              GENERATE VIRAL TITLES
            </>
          )}
        </button>
      </div>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-8 border-red-500/20 relative"
          >
             <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-xl bg-red-600/10 flex items-center justify-center">
                   <Youtube className="text-red-500 w-6 h-6" />
                 </div>
                 <div>
                   <h3 className="font-bold text-xl">Generation Result</h3>
                   <p className="text-xs text-white/40">Optimized for high CTR & SEO</p>
                 </div>
               </div>
               <button 
                onClick={copyToClipboard}
                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-white/60 hover:text-white flex items-center gap-2"
               >
                 <Copy className="w-4 h-4" />
                 <span className="text-xs font-bold">COPY ALL</span>
               </button>
             </div>

             <div className="markdown-body">
               <ReactMarkdown>{result}</ReactMarkdown>
             </div>

             <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
               {[
                 { icon: List, label: "Bullet points", desc: "Easy to read" },
                 { icon: Youtube, label: "CTR Optimized", desc: "Proven patterns" },
                 { icon: Hash, label: "SEO Tags", desc: "High ranking" }
               ].map((feat) => (
                 <div key={feat.label} className="p-4 rounded-2xl bg-white/5 border border-white/5">
                   <feat.icon className="w-5 h-5 text-red-500 mb-2" />
                   <p className="font-bold text-sm mb-1">{feat.label}</p>
                   <p className="text-[10px] text-white/30 uppercase tracking-tighter">{feat.desc}</p>
                 </div>
               ))}
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TitleGenerator;
