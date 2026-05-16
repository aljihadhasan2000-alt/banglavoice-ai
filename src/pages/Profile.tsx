import React from "react";
import { User, Shield, CreditCard, Bell, ShieldCheck } from "lucide-react";
import { useApp } from "../context/AppContext";
import { motion } from "motion/react";

const Profile = () => {
  const { user } = useApp();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center gap-6">
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-red-600 to-purple-600 p-[2px]">
          <div className="w-full h-full rounded-[calc(1.5rem-2px)] bg-black flex items-center justify-center">
            <User className="w-10 h-10 text-white/50" />
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-bold">{user?.name}</h2>
          <p className="text-white/40">{user?.email}</p>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-600/10 border border-red-500/20 rounded-full text-red-500 text-[10px] font-bold uppercase tracking-widest mt-3">
             <ShieldCheck className="w-3 h-3" />
             {user?.subscription} Member
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6 space-y-6">
          <h3 className="font-bold flex items-center gap-2">
            <Shield className="w-4 h-4 text-red-500" />
            Security
          </h3>
          <div className="space-y-4">
             <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                <p className="text-sm">Password</p>
                <button className="text-xs font-bold text-red-500">Change</button>
             </div>
             <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                <p className="text-sm">Two-Factor Auth</p>
                <button className="text-xs font-bold text-red-500">Enable</button>
             </div>
          </div>
        </div>

        <div className="glass-card p-6 space-y-6">
          <h3 className="font-bold flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-purple-500" />
            Billing & Usage
          </h3>
          <div className="space-y-4">
             <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm">Monthly Usage</p>
                  <p className="text-xs text-white/40">75%</p>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "75%" }}
                    className="h-full bg-gradient-to-r from-red-600 to-purple-600"
                  />
                </div>
             </div>
             <button className="w-full py-3 bg-white text-black font-bold rounded-xl text-sm transition-transform active:scale-95">
                Upgrade to Enterprise
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
