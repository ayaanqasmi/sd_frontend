"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [generatedImage, setGeneratedImage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!prompt.trim()) {
      setError("Please enter a description");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // For now, im using a placeholder image API. Change this to where you deployed the api and also add the domain to next.config.ts
      const response = await fetch("https://picsum.photos/512");
      if (!response.ok) throw new Error("Failed to generate image");

      setGeneratedImage(response.url);
    } catch (err) {
      setError("Failed to generate image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Section - Form */}
        <div className="flex flex-col gap-6">
          <h1 className="text-2xl font-bold">
            Image Generator using Stable Diffusion
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label
                htmlFor="prompt"
                className="block text-sm font-medium mb-2"
              >
                Image Description
              </label>
              <textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full h-32 p-3 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                placeholder="Describe the image you want to generate..."
              />
              {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Generating..." : "Generate Image"}
            </button>
          </form>
        </div>

        {/* Right Section - Generated Image */}
        <div className="flex flex-col items-center justify-center min-h-[400px] border rounded-lg p-4">
          {generatedImage ? (
            <Image
              src={generatedImage}
              alt="Generated image"
              width={512}
              height={512}
              className="rounded-lg"
            />
          ) : (
            <div className="text-center text-gray-500">
              Generated image will appear here
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
