import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Mic, 
  Type, 
  Zap, 
  MessageSquare, 
  FileText, 
  Hash, 
  History, 
  Settings,
  LogOut,
  ChevronRight
} from "lucide-react";
import { cn } from "../../lib/utils";
import { motion } from "motion/react";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/" },
  { name: "Voice Gen", icon: Mic, path: "/tools/voice" },
  { name: "YouTube Titles", icon: Type, path: "/tools/titles" },
  { name: "Viral Hooks", icon: Zap, path: "/tools/hooks" },
  { name: "Captions", icon: MessageSquare, path: "/tools/captions" },
  { name: "Script Writer", icon: FileText, path: "/tools/scripts" },
  { name: "Hashtags", icon: Hash, path: "/tools/hashtags" },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="hidden lg:flex flex-col w-72 h-screen sidebar-gradient sticky top-0 left-0 p-6 overflow-y-auto">
      <div className="flex items-center gap-3 mb-10">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600 to-purple-600 flex items-center justify-center shadow-lg shadow-red-600/20">
          <Mic className="text-white w-6 h-6" />
        </div>
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
          BanglaVoice AI
        </h1>
      </div>

      <nav className="flex-1 space-y-2">
        <p className="text-xs font-semibold text-white/30 uppercase tracking-wider mb-4 ml-2">Main Menu</p>
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "group flex items-center justify-between p-3 rounded-xl transition-all duration-300",
                location.pathname === item.path
                  ? "bg-white/10 text-white shadow-lg border border-white/5"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              )}
            >
              <div className="flex items-center gap-3">
                <Icon className={cn(
                  "w-5 h-5 transition-colors",
                  location.pathname === item.path ? "text-red-500" : "group-hover:text-red-400"
                )} />
                <span className="font-medium">{item.name}</span>
              </div>
              {location.pathname === item.path && (
                <motion.div layoutId="activeDot">
                  <ChevronRight className="w-4 h-4 text-white/40" />
                </motion.div>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="mt-10 pt-10 border-t border-white/5 space-y-2">
        <Link
          to="/history"
          className="flex items-center gap-3 p-3 text-white/50 hover:text-white hover:bg-white/5 rounded-xl transition-all"
        >
          <History className="w-5 h-5" />
          <span className="font-medium">My History</span>
        </Link>
        <Link
          to="/settings"
          className="flex items-center gap-3 p-3 text-white/50 hover:text-white hover:bg-white/5 rounded-xl transition-all"
        >
          <Settings className="w-5 h-5" />
          <span className="font-medium">Settings</span>
        </Link>
        <button
          className="w-full flex items-center gap-3 p-3 text-red-400/70 hover:text-red-400 hover:bg-red-400/5 rounded-xl transition-all text-left"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
      
      <div className="mt-8 p-4 rounded-2xl bg-gradient-to-br from-red-600/10 to-purple-600/10 border border-red-500/10">
        <p className="text-xs font-semibold text-red-400 mb-1">PRO PLAN</p>
        <p className="text-[10px] text-white/50 mb-3">Unlimited voice generation and viral scripts.</p>
        <button className="w-full py-2 bg-white text-black text-xs font-bold rounded-lg hover:bg-white/90 transition-colors">
          UPGRADE NOW
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
