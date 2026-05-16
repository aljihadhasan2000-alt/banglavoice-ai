import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Bell, Search, User, LogOut, LayoutDashboard, Mic, Type, Zap, MessageSquare, FileText, Hash } from "lucide-react";
import { cn } from "../../lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { useApp } from "../../context/AppContext";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/" },
  { name: "Voice Gen", icon: Mic, path: "/tools/voice" },
  { name: "YouTube Titles", icon: Type, path: "/tools/titles" },
  { name: "Viral Hooks", icon: Zap, path: "/tools/hooks" },
  { name: "Captions", icon: MessageSquare, path: "/tools/captions" },
  { name: "Script Writer", icon: FileText, path: "/tools/scripts" },
  { name: "Hashtags", icon: Hash, path: "/tools/hashtags" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useApp();
  const location = useLocation();

  return (
    <nav className="nav-blur p-4 h-20 flex items-center justify-between">
      {/* Mobile Menu Trigger */}
      <button 
        onClick={() => setIsOpen(true)}
        className="lg:hidden p-2 text-white/70"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Desktop Search */}
      <div className="hidden lg:flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-xl w-96">
        <Search className="w-4 h-4 text-white/30" />
        <input 
          type="text" 
          placeholder="Search for tools..." 
          className="bg-transparent border-none focus:outline-none text-sm text-white w-full"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 text-white/70 hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-600 rounded-full border border-black"></span>
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-white/10">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-white">{user?.name || "Guest"}</p>
            <p className="text-[10px] text-white/40 uppercase tracking-widest">{user?.subscription || "Free"}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-purple-600 p-[1px]">
            <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
              <User className="w-5 h-5 text-white/70" />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-80 bg-[#0a0a0a] z-[70] p-6 lg:hidden shadow-2xl border-r border-white/5"
            >
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-red-600 to-purple-600 flex items-center justify-center">
                    <Mic className="text-white w-5 h-5" />
                  </div>
                  <h1 className="text-lg font-bold">BanglaVoice AI</h1>
                </div>
                <button onClick={() => setIsOpen(false)}>
                  <X className="w-6 h-6 text-white/40" />
                </button>
              </div>

              <div className="space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex items-center gap-4 p-4 rounded-2xl transition-all",
                        location.pathname === item.path
                          ? "bg-red-600/10 text-red-500 border border-red-600/20"
                          : "text-white/50 hover:bg-white/5"
                      )}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-semibold">{item.name}</span>
                    </Link>
                  );
                })}
              </div>

              <div className="absolute bottom-10 left-6 right-6">
                <button 
                  onClick={() => { logout(); setIsOpen(false); }}
                  className="w-full flex items-center gap-3 p-4 text-red-400 bg-red-400/5 rounded-2xl border border-red-400/10"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-bold">Logout</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
