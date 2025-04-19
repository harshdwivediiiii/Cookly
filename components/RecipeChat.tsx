"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GeminiChatResponse } from "@/lib/gemini";
import { Loader2 } from "lucide-react";

export default function RecipeChat({ onResponse }: { onResponse: (data: GeminiChatResponse) => void }) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const askGemini = async () => {
    setLoading(true);
    const res = await fetch("/api/gemini", {
      method: "POST",
      body: JSON.stringify({ prompt: query }),
    });
    const data = await res.json();
    onResponse(data);
    setQuery("");
    setLoading(false);
  };

  return (
    <div className="flex gap-2 items-center">
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Type ingredients or ask a recipe..."
      />
      <Button onClick={askGemini} disabled={loading}>
        {loading ? <Loader2 className="animate-spin w-4 h-4" /> : "Ask"}
      </Button>
    </div>
  );
}
