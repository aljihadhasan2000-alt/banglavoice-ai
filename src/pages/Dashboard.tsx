import React from "react";
import { Link } from "react-router-dom";
import { TOOLS } from "../constants";
import { 
  ArrowRight, 
  TrendingUp, 
  Users, 
  Mic2,
  Sparkles,
  History as HistoryIcon
} from "lucide-react";
import { motion } from "motion/react";
import { useApp } from "../context/AppContext";
import { formatDate } from "../lib/utils";

const Dashboard = () => {
  const { history, user } = useApp();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1 }
  };

  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <section className="relative p-8 md:p-12 glass-card overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/20 blur-[100px] -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/20 blur-[100px] -ml-32 -mb-32"></div>
        
        <div className="relative z-10 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-red-400 text-xs font-bold mb-6"
          >
            <Sparkles className="w-3 h-3" />
            <span>AI-POWERED CREATOR PLATFORM</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight"
          >
            Boost Your <span className="text-red-500">Content</span> with <br />
            BanglaVoice AI
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/60 text-lg mb-8"
          >
            The premium toolkit for YouTubers, TikTokers, and Facebook creators. Generate realistic voices, viral titles, and complete scripts in seconds.
          </motion.p>
          
          <div className="flex flex-wrap gap-4">
            <Link to="/tools/voice" className="premium-button flex items-center gap-2">
              Get Started <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/tools/scripts" className="secondary-button">
              Explore Tools
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Generations", value: "2.4k", icon: TrendingUp, color: "text-blue-500" },
          { label: "Active Creators", value: "850+", icon: Users, color: "text-purple-500" },
          { label: "Voice Minutes", value: "45k", icon: Mic2, color: "text-red-500" },
          { label: "Credits Rem.", value: user?.subscription === "premium" ? "∞" : "15", icon: Sparkles, color: "text-yellow-500" },
        ].map(({ icon: Icon, label, value, color }, idx) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 + 0.3 }}
            className="glass-card p-6 flex items-center justify-between"
          >
            <div>
              <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-2">{label}</p>
              <h3 className="text-2xl font-bold text-white">{value}</h3>
            </div>
            <div className={color}>
              <Icon className="w-8 h-8 opacity-80" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tools Grid */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-2xl font-bold">Creator Toolbox</h3>
            <p className="text-white/40 text-sm">Everything you need to go viral.</p>
          </div>
          <Link to="/tools" className="text-sm font-bold text-red-500 hover:underline">View All Tools</Link>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {TOOLS.map((tool) => (
            <Link key={tool.id} to={tool.path}>
              <motion.div 
                variants={item}
                whileHover={{ y: -5 }}
                className="group glass-card p-6 h-full relative overflow-hidden flex flex-col"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${tool.color} opacity-[0.03] group-hover:opacity-10 transition-opacity blur-3xl`}></div>
                
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-6 shadow-lg shadow-black group-hover:scale-110 transition-transform`}>
                  {(() => {
                    const Icon = tool.icon;
                    return <Icon className="text-white w-6 h-6" />;
                  })()}
                </div>
                
                <h4 className="text-xl font-bold mb-3">{tool.name}</h4>
                <p className="text-white/50 text-sm mb-6 flex-1">{tool.description}</p>
                
                <div className="flex items-center text-xs font-bold text-white/40 group-hover:text-red-500 transition-colors mt-auto">
                  USE TOOL <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </section>

      {/* Recent Activity */}
      <section className="glass-card p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
              <HistoryIcon className="text-white/40 w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Recent Activity</h3>
              <p className="text-white/40 text-xs">Your latest AI generations.</p>
            </div>
          </div>
          <Link to="/history" className="text-xs font-bold text-white/30 hover:text-white transition-colors">VIEW HISTORY</Link>
        </div>

        {history.length > 0 ? (
          <div className="space-y-4">
            {history.slice(0, 5).map((log) => (
              <div key={log.id} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-lg bg-red-600/10 flex items-center justify-center text-red-500">
                    {(() => {
                      const tool = TOOLS.find(t => t.id === log.toolId);
                      if (!tool) return <HistoryIcon className="w-4 h-4" />;
                      const Icon = tool.icon;
                      return <Icon className="w-4 h-4" />;
                    })()}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{TOOLS.find(t => t.id === log.toolId)?.name}</p>
                    <p className="text-[10px] text-white/30 uppercase">{formatDate(new Date(log.timestamp))}</p>
                  </div>
                </div>
                <button className="text-xs font-bold text-white/30 hover:text-white">VIEW FULL</button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-white/20 text-sm">No recent activity. Start creating!</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
