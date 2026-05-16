import React from "react";
import AIToolPage from "../components/AIToolPage";
import { MessageSquare } from "lucide-react";
import { prompts } from "../services/geminiService";

const CaptionGenerator = () => {
  return (
    <AIToolPage
      title="AI Caption Generator"
      description="Professional, funny, or emotional captions for every platform."
      toolId="caption-gen"
      placeholder="What are you posting about? (e.g. My new car delivery)"
      icon={MessageSquare}
      getPrompt={(input, opts) => prompts.captions(input, opts.platform, opts.mode)}
      options={[
        {
          id: "platform",
          label: "Platform",
          type: "select",
          choices: ["Facebook", "Instagram", "TikTok", "YouTube Shorts"]
        },
        {
          id: "mode",
          label: "Vibe/Mode",
          type: "select",
          choices: ["Viral", "Emotional", "Funny", "Professional", "Mysterious"]
        }
      ]}
    />
  );
};

export default CaptionGenerator;
