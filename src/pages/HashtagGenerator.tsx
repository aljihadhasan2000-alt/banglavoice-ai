import React from "react";
import AIToolPage from "../components/AIToolPage";
import { Hash } from "lucide-react";
import { prompts } from "../services/geminiService";

const HashtagGenerator = () => {
  return (
    <AIToolPage
      title="Hashtag Generator"
      description="Find the perfect balance of tags to trend organic."
      toolId="hashtag-gen"
      placeholder="Topic or main keyword? (e.g. travel bangladesh)"
      icon={Hash}
      getPrompt={(input) => prompts.hashtags(input)}
    />
  );
};

export default HashtagGenerator;
