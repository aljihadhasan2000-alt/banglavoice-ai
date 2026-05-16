import React, { useState, useRef } from "react";
import { BANGLA_VOICES, generateSpeech } from "../services/elevenLabsService";
import { 
  Play, 
  Pause, 
  Download, 
  Copy, 
  Volume2, 
  Check, 
  RefreshCcw,
  Sparkles,
  Music4
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useApp } from "../context/AppContext";
import toast from "react-hot-toast";

const VoiceGenerator = () => {
  const [text, setText] = useState("");
  const [selectedVoice, setSelectedVoice] = useState(BANGLA_VOICES[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { addToHistory } = useApp();

  const handleGenerate = async () => {
    if (!text.trim()) {
      toast.error("Please enter some text!");
      return;
    }
    if (text.length > 500) {
      toast.error("Text is too long! (Max 500 chars)");
      return;
    }

    setIsGenerating(true);
    setAudioUrl(null);
    
    try {
      const url = await generateSpeech({
        text,
        voice_id: selectedVoice.id
      });
      setAudioUrl(url);
      addToHistory({
        toolId: "voice-gen",
        input: text,
        output: { url, voice: selectedVoice.name }
      });
      toast.success("Voice generated successfully!");
    } catch (error: any) {
      toast.error(error.message || "Failed to generate voice");
    } finally {
      setIsGenerating(false);
    }
  };

  const togglePlayback = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const downloadAudio = () => {
    if (!audioUrl) return;
    const link = document.createElement("a");
    link.href = audioUrl;
    link.download = `voice_${Date.now()}.mp3`;
    link.click();
  };

  const copyText = () => {
    navigator.clipboard.writeText(text);
    toast.success("Text copied to clipboard");
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold mb-2">AI Voice Generator</h2>
          <p className="text-white/50">Realistic multi-lingual AI voices for your content.</p>
        </div>
        <div className="flex gap-2">
          <button className="secondary-button !py-2 !text-xs flex items-center gap-2">
            <RefreshCcw className="w-3 h-3" /> Reset
          </button>
          <button className="premium-button !py-2 !px-4 !text-xs flex items-center gap-2">
            <Sparkles className="w-3 h-3" /> Pro Settings
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Input */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-6 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-bold text-white/40 uppercase tracking-widest">Script Content</label>
              <span className={text.length > 450 ? "text-red-500 text-xs" : "text-white/20 text-xs"}>
                {text.length}/500
              </span>
            </div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your Bangla, English or Hindi script here..."
              className="w-full h-64 bg-white/5 border border-white/10 rounded-2xl p-6 focus:outline-none focus:border-red-500/50 transition-colors resize-none text-lg leading-relaxed"
            />
            <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl">
               <div className="flex gap-4">
                 <button onClick={copyText} className="text-white/40 hover:text-white transition-colors">
                   <Copy className="w-4 h-4" />
                 </button>
               </div>
               <button 
                onClick={handleGenerate}
                disabled={isGenerating || !text.trim()}
                className="premium-button disabled:opacity-50 disabled:grayscale disabled:scale-100 min-w-[200px]"
               >
                 {isGenerating ? (
                   <div className="flex items-center gap-2 justify-center">
                     <RefreshCcw className="w-4 h-4 animate-spin" />
                     GENERATING...
                   </div>
                 ) : (
                   "GENERATE VOICE"
                 )}
               </button>
            </div>
          </div>

          <AnimatePresence>
            {audioUrl && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="glass-card p-8 neon-border"
              >
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-red-600/20 blur-xl group-hover:bg-red-600/40 transition-colors"></div>
                    <button 
                      onClick={togglePlayback}
                      className="relative w-20 h-20 bg-white text-black rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-2xl"
                    >
                      {isPlaying ? <Pause className="w-8 h-8 fill-black" /> : <Play className="w-8 h-8 fill-black ml-1" />}
                    </button>
                  </div>

                  <div className="flex-1 w-full space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-xl mb-1">Generated Sample</h4>
                        <p className="text-sm text-white/40">Voice: {selectedVoice.name} ({selectedVoice.gender})</p>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={downloadAudio}
                          className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
                        >
                          <Download className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    
                    {/* Fake Waveform for animation */}
                    <div className="h-12 flex items-center gap-1">
                      {Array.from({ length: 40 }).map((_, i) => (
                        <motion.div
                          key={i}
                          animate={isPlaying ? {
                            height: [16, Math.random() * 40 + 10, 16],
                          } : { height: 8 }}
                          transition={isPlaying ? {
                            duration: 0.5,
                            repeat: Infinity,
                            delay: i * 0.05
                          } : {}}
                          className="w-[2px] bg-gradient-to-t from-red-600 to-purple-400 rounded-full"
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <audio 
                  ref={audioRef} 
                  src={audioUrl} 
                  onEnded={() => setIsPlaying(false)}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Column: Settings */}
        <div className="space-y-6">
          <div className="glass-card p-6">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-red-500" />
              Select Voice
            </h3>
            <div className="space-y-3">
              {BANGLA_VOICES.map((voice) => (
                <button
                  key={voice.id}
                  onClick={() => setSelectedVoice(voice)}
                  className={cn(
                    "w-full p-4 rounded-2xl border text-left transition-all relative group overflow-hidden",
                    selectedVoice.id === voice.id
                      ? "bg-red-600/10 border-red-500/50 shadow-lg shadow-red-600/5"
                      : "bg-white/5 border-white/5 hover:bg-white/[0.08]"
                  )}
                >
                  <div className="relative z-10 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-sm mb-1">{voice.name}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded-full text-white/40 uppercase font-bold tracking-widest">{voice.gender}</span>
                        <span className="text-[10px] text-white/30 truncate">{voice.category}</span>
                      </div>
                    </div>
                    {selectedVoice.id === voice.id && (
                      <div className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="glass-card p-6 bg-gradient-to-br from-blue-600/10 to-indigo-600/10 border-blue-500/10">
            <h3 className="text-md font-bold mb-3 flex items-center gap-2 text-blue-400">
              <Music4 className="w-4 h-4" />
              Creator Tip
            </h3>
            <p className="text-sm text-white/50 leading-relaxed">
              Use <span className="text-white">multilingual_v2</span> for better emotion and realism. For Bangla, use professional or soft voices for best results.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceGenerator;
