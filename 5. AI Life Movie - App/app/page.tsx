"use client";

import { useState } from "react";
import StoryResult from "@/components/StoryResult";

export default function Home() {
  const [memories, setMemories] = useState("");
  const [story, setStory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateStory = async () => {
    if (!memories.trim()) return;

    setLoading(true);
    setStory("");
    setError("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ memories })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Something went wrong");
      }

      if (!data.story) {
        throw new Error("Empty response from server");
      }

      setStory(data.story);
    } catch (err: any) {
      setError(err.message || "Failed to generate story");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-2xl space-y-6">

        {/* HEADER */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold">AILifeMovie</h1>
          <p className="text-gray-400">
            Turn your memories into a cinematic life story
          </p>
        </div>

        {/* INPUT */}
        <textarea
          value={memories}
          onChange={(e) => setMemories(e.target.value)}
          placeholder="Paste your memories here... childhood, travel, achievements, family moments..."
          className="w-full h-40 p-4 rounded-xl bg-zinc-900 border border-zinc-700 outline-none"
        />

        {/* BUTTON */}
        <button
          onClick={generateStory}
          disabled={loading || !memories.trim()}
          className="w-full py-3 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 disabled:opacity-50"
        >
          {loading ? "Generating your movie..." : "Generate Life Movie"}
        </button>

        {/* ERROR */}
        {error && (
          <div className="text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        {/* OUTPUT */}
        {story && <StoryResult story={story} />}
      </div>
    </main>
  );
}