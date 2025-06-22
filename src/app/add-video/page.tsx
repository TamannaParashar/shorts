"use client";

import { useState } from "react";
import FileUpload from "@/components/FileUpload";

export default function AddVideoPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title || !description || !videoUrl || !thumbnailUrl) {
      alert("Please complete all fields and upload a video.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/video", {
        method: "POST",
        body: JSON.stringify({
          title,
          description,
          videoUrl,
          thumbnailUrl,
          transformation: {
            quality: 90,
          },
        }),
      });
      const data = await res.json();
      console.log("Saved:", data);
      alert("Video uploaded successfully!");
    } catch (err) {
      alert("Failed to save video");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Upload Video</h1>

      <FileUpload
        fileType="video"
        onSuccessAction={({ url, thumbnailUrl }) => {
          setVideoUrl(url);
          setThumbnailUrl(thumbnailUrl || url);
        }}
      />

      {videoUrl && <p className="text-green-600 text-sm">Video uploaded!</p>}

      <input
        type="text"
        placeholder="Title"
        className="input input-bordered w-full"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Description"
        className="textarea textarea-bordered w-full"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button className="btn btn-primary w-full" onClick={handleSubmit} disabled={loading}>
        {loading ? "Saving..." : "Submit"}
      </button>
    </div>
  );
}
