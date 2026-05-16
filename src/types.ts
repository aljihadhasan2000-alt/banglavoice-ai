import { LucideIcon } from "lucide-react";

export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  color: string;
  path: string;
  category: ToolCategory;
}

export type ToolCategory = "audio" | "video" | "social" | "seo" | "script";

export interface GenerationHistory {
  id: string;
  toolId: string;
  input: string;
  output: any;
  timestamp: number;
}

export interface VoiceOption {
  id: string;
  name: string;
  gender: "male" | "female";
  previewUrl?: string;
  category: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  subscription: "free" | "premium";
}
