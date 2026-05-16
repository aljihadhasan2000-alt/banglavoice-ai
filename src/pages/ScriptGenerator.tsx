import React from "react";
import AIToolPage from "../components/AIToolPage";
import { FileText } from "lucide-react";
import { prompts } from "../services/geminiService";

const ScriptGenerator = () => {
  return (
    <AIToolPage
      title="AI Script Writer"
      description="Write engaging story-based scripts for your videos."
      toolId="script-gen"
      placeholder="Topic of the script? (e.g. 5 things people don't know about Bangladesh)"
      icon={FileText}
      getPrompt={(input, opts) => prompts.scripts(input, opts.type)}
      options={[
        {
          id: "type",
          label: "Script Type",
          type: "select",
          choices: ["YouTube Short/Reel", "Movie Explanation", "Storytelling", "Educational", "Motivational"]
        }
      ]}
    />
  );
};

export default ScriptGenerator;
