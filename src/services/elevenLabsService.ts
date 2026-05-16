export interface TTSRequest {
  text: string;
  voice_id?: string;
  model_id?: string;
}

export const generateSpeech = async (data: TTSRequest): Promise<string> => {
  try {
    const response = await fetch("/api/tts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to generate speech");
    }

    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch (error: any) {
    console.error("ElevenLabs Service Error:", error);
    throw error;
  }
};

export const BANGLA_VOICES = [
  { id: "21m00Tcm4TlvDq8ikWAM", name: "Rachel (Realistic)", gender: "female", category: "Cinematic" },
  { id: "AZnzlk1XhkMTxbHL8dzm", name: "Nicole (Energetic)", gender: "female", category: "Social Media" },
  { id: "EXAVITQu4vr4xnSDxMaL", name: "Bella (Soft)", gender: "female", category: "Storytelling" },
  { id: "ErXw3sSqcqbw8gKVEnUo", name: "Antoni (Professional)", gender: "male", category: "News" },
  { id: "Lcf7uXOjYHYKOsbBrveP", name: "Josh (Deep)", gender: "male", category: "Documentary" },
  { id: "MF3mGyEYCl7XYW7L9Cc0", name: "Marcus (Energetic)", gender: "male", category: "Gaming" },
];
