import React from "react";
import { useApp } from "../context/AppContext";
import { History as HistoryIcon, Trash2, Clock, ExternalLink, Type, Mic, Zap, MessageSquare, FileText, Hash } from "lucide-react";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { motion, AnimatePresence } from "motion/react";
import { TOOLS } from "../constants";

const History = () => {
  const { history, clearHistory } = useApp();

  const getToolIcon = (toolId: string) => {
    const tool = TOOLS.find(t => t.id === toolId);
    return tool ? tool.icon : HistoryIcon;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-2">My History</h2>
          <p className="text-white/50">Keep track of your generated viral content.</p>
        </div>
        <button 
          onClick={clearHistory}
          disabled={history.length === 0}
          className="flex items-center gap-2 px-4 py-2 bg-red-600/10 border border-red-500/20 rounded-xl text-red-500 text-sm font-bold hover:bg-red-600/20 disabled:opacity-50 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          Clear All
        </button>
      </div>

      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {history.length > 0 ? (
            history.map((item) => {
              const Icon = getToolIcon(item.toolId);
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="glass-card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6"
                >
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-red-500 shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-lg truncate">
                          {TOOLS.find(t => t.id === item.toolId)?.name || "AI Generation"}
                        </h4>
                        <span className="text-[10px] text-white/20 uppercase bg-white/5 px-2 py-0.5 rounded-full">
                          {item.toolId}
                        </span>
                      </div>
                      <p className="text-sm text-white/40 truncate italic mb-2">"{item.input}"</p>
                      <div className="flex items-center gap-2 text-[10px] text-white/20 font-bold uppercase tracking-widest">
                        <Clock className="w-3 h-3" />
                        {new Date(item.timestamp).toLocaleString()}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs font-bold transition-colors hover:bg-white/10 flex items-center gap-2">
                       View Details <ExternalLink className="w-3 h-3 text-white/30" />
                    </button>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 glass-card"
            >
              <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center mx-auto mb-6">
                 <HistoryIcon className="w-8 h-8 text-white/10" />
              </div>
              <h3 className="text-xl font-bold mb-2">No History Yet</h3>
              <p className="text-white/30 text-sm">Your generated content will appear here.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default History;
