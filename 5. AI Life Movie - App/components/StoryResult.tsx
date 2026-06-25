"use client";

import { useState } from "react";

export default function StoryResult({ story }: { story: string }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(story);
      setCopied(true);

      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  return (
    <div className="mt-6 p-5 rounded-xl bg-zinc-900 border border-zinc-700 space-y-4">
      
      <h2 className="text-lg font-semibold">Your Life Movie 🎬</h2>

      <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
        {story}
      </p>

      <button
        onClick={copyToClipboard}
        className="px-4 py-2 bg-white text-black rounded-lg text-sm font-medium hover:bg-gray-200"
      >
        {copied ? "Copied ✓" : "Copy"}
      </button>

    </div>
  );
}