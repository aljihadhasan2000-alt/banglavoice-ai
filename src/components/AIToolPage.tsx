import React, { useState } from "react";
import { generateWithAI } from "../services/geminiService";
import { 
  Copy, 
  Sparkles,
  RefreshCcw,
  LucideIcon
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import ReactMarkdown from "react-markdown";
import { useApp } from "../context/AppContext";
import toast from "react-hot-toast";
import { cn } from "../lib/utils";

interface AIToolPageProps {
  title: string;
  description: string;
  toolId: string;
  placeholder: string;
  icon: LucideIcon;
  getPrompt: (input: string, options?: any) => string;
  options?: {
    id: string;
    label: string;
    type: "select" | "text";
    choices?: string[];
  }[];
}

const AIToolPage: React.FC<AIToolPageProps> = ({ 
  title, 
  description, 
  toolId, 
  placeholder, 
  icon: Icon, 
  getPrompt,
  options = []
}) => {
  const [input, setInput] = useState("");
  const [formOptions, setFormOptions] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    options.forEach(opt => {
      if (opt.type === "select" && opt.choices) {
        initial[opt.id] = opt.choices[0];
      } else {
        initial[opt.id] = "";
      }
    });
    return initial;
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const { addToHistory } = useApp();

  const handleGenerate = async () => {
    if (!input.trim()) {
      toast.error("Please provide some input!");
      return;
    }

    setIsGenerating(true);
    setResult(null);

    try {
      const prompt = getPrompt(input, formOptions);
      const res = await generateWithAI(prompt);
      setResult(res);
      addToHistory({
        toolId,
        input,
        output: res
      });
      toast.success("Content generated!");
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    toast.success("Result copied!");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-2">{title}</h2>
        <p className="text-white/50">{description}</p>
      </div>

      <div className="glass-card p-8 space-y-6">
        <div className="space-y-4">
          <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Input Details</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            className="w-full h-32 bg-white/5 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-red-500/50 transition-all resize-none"
          />
        </div>

        {options.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {options.map((opt) => (
              <div key={opt.id} className="space-y-2">
                <label className="text-xs font-bold text-white/40 uppercase tracking-widest">{opt.label}</label>
                {opt.type === "select" ? (
                  <select
                    value={formOptions[opt.id]}
                    onChange={(e) => setFormOptions(prev => ({ ...prev, [opt.id]: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-red-500/50 appearance-none transition-all text-white/80"
                  >
                    {opt.choices?.map((choice) => (
                      <option key={choice} value={choice} className="bg-[#0a0a0a]">{choice}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    value={formOptions[opt.id]}
                    onChange={(e) => setFormOptions(prev => ({ ...prev, [opt.id]: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-red-500/50 transition-all text-white/80"
                  />
                )}
              </div>
            ))}
          </div>
        )}

        <button
          onClick={handleGenerate}
          disabled={isGenerating || !input.trim()}
          className="premium-button w-full flex items-center justify-center gap-2"
        >
          {isGenerating ? (
            <RefreshCcw className="w-5 h-5 animate-spin" />
          ) : (
            <Sparkles className="w-5 h-5" />
          )}
          {isGenerating ? "GENERATING..." : "GENERATE CONTENT"}
        </button>
      </div>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-8"
          >
             <div className="flex items-center justify-between mb-8">
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-xl bg-red-600/10 flex items-center justify-center">
                   <Icon className="text-red-500 w-6 h-6" />
                 </div>
                 <h3 className="font-bold text-xl">Generated Result</h3>
               </div>
               <button 
                onClick={copyToClipboard}
                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-white/60 hover:text-white"
               >
                 <Copy className="w-4 h-4" />
               </button>
             </div>

             <div className="markdown-body">
               <ReactMarkdown>{result}</ReactMarkdown>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIToolPage;
