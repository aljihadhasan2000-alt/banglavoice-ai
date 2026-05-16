import { Tool } from "./types";
import { Mic, Type, Zap, MessageSquare, FileText, Hash } from "lucide-react";

export const TOOLS: Tool[] = [
  {
    id: "voice-gen",
    name: "AI Voice Generator",
    description: "Realistic Bangla, English & Hindi AI voices for your content.",
    icon: Mic,
    color: "from-blue-500 to-cyan-400",
    path: "/tools/voice",
    category: "audio",
  },
  {
    id: "title-gen",
    name: "Viral Title & SEO",
    description: "Generate clickbait titles and high-ranking SEO tags for YouTube.",
    icon: Type,
    color: "from-red-500 to-orange-400",
    path: "/tools/titles",
    category: "seo",
  },
  {
    id: "hook-gen",
    name: "Viral Hook Generator",
    description: "Catchy opening lines to skyrocket your viewer retention.",
    icon: Zap,
    color: "from-purple-500 to-pink-400",
    path: "/tools/hooks",
    category: "social",
  },
  {
    id: "caption-gen",
    name: "AI Caption Generator",
    description: "Multi-platform captions for FB, IG, TikTok & Shorts.",
    icon: MessageSquare,
    color: "from-green-500 to-emerald-400",
    path: "/tools/captions",
    category: "social",
  },
  {
    id: "script-gen",
    name: "AI Script Writer",
    description: "Complete scripts for Shorts, Reels, and Movie Explanations.",
    icon: FileText,
    color: "from-amber-500 to-yellow-400",
    path: "/tools/scripts",
    category: "script",
  },
  {
    id: "hashtag-gen",
    name: "Hashtag Generator",
    description: "Trending hashtags for maximum organic reach.",
    icon: Hash,
    color: "from-indigo-500 to-blue-400",
    path: "/tools/hashtags",
    category: "seo",
  }
];
