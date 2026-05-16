import React from "react";
import AIToolPage from "../components/AIToolPage";
import { Zap } from "lucide-react";
import { prompts } from "../services/geminiService";

const HookGenerator = () => {
  return (
    <AIToolPage
      title="Viral Hook Generator"
      description="Grab attention in the first 3 seconds with psychology-backed hooks."
      toolId="hook-gen"
      placeholder="What is your video about? (e.g. My morning routine as a software engineer)"
      icon={Zap}
      getPrompt={(input) => prompts.hooks(input)}
    />
  );
};

export default HookGenerator;
