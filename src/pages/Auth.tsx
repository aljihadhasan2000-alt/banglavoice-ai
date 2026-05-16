import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mic, ArrowRight, Github, Chrome } from "lucide-react";
import { motion } from "motion/react";
import toast from "react-hot-toast";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(isLogin ? "Welcome back!" : "Account created!");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/10 blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 blur-[120px]"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md glass-card p-10 border-white/5"
      >
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-red-600 to-purple-600 flex items-center justify-center shadow-2xl mb-6">
            <Mic className="text-white w-8 h-8" />
          </div>
          <h1 className="text-3xl font-extrabold mb-2">BanglaVoice AI</h1>
          <p className="text-white/40 text-sm">{isLogin ? "Elevate your content today" : "Create your creator account"}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="space-y-1">
              <label className="text-xs font-bold text-white/30 uppercase ml-2">Full Name</label>
              <input 
                type="text" 
                required 
                className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:outline-none focus:border-red-500/50 transition-all"
                placeholder="Al Jihad Hasan"
              />
            </div>
          )}
          <div className="space-y-1">
            <label className="text-xs font-bold text-white/30 uppercase ml-2">Email Address</label>
            <input 
              type="email" 
              required 
              className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:outline-none focus:border-red-500/50 transition-all"
              placeholder="creator@banglavoice.ai"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-white/30 uppercase ml-2">Password</label>
            <input 
              type="password" 
              required 
              className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:outline-none focus:border-red-500/50 transition-all"
              placeholder="••••••••"
            />
          </div>

          <button type="submit" className="w-full premium-button !mt-8 py-4 flex items-center justify-center gap-2">
            {isLogin ? "SIGN IN" : "CREATE ACCOUNT"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-8 flex items-center gap-4">
          <div className="h-[1px] flex-1 bg-white/5"></div>
          <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Or Continue With</span>
          <div className="h-[1px] flex-1 bg-white/5"></div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-2 p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
            <Chrome className="w-4 h-4" />
            <span className="text-xs font-bold">Google</span>
          </button>
          <button className="flex items-center justify-center gap-2 p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
            <Github className="w-4 h-4" />
            <span className="text-xs font-bold">GitHub</span>
          </button>
        </div>

        <p className="mt-10 text-center text-sm text-white/40">
          {isLogin ? "New to BanglaVoice?" : "Already a creator?"} {" "}
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-red-500 font-bold hover:underline"
          >
            {isLogin ? "Create account" : "Sign in now"}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default Auth;
