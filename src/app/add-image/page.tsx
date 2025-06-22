"use client";

import { useState } from "react";
import FileUpload from "@/components/FileUpload";
import Link from "next/link";

export default function AddImagePage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title || !description || !imageUrl) {
      alert("Please fill in all fields and upload an image.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/video", {
        method: "POST",
        body: JSON.stringify({
          title,
          description,
          thumbnailUrl: imageUrl,
          videoUrl: "", 
        }),
      });
      const data = await res.json();
      console.log("Saved:", data);
      alert("Image uploaded successfully!");
    } catch (err) {
      alert("Failed to save image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Upload Image</h1>

      <FileUpload
        fileType="image"
        onSuccessAction={({ url }) => {
          setImageUrl(url);
        }}
      />

      {imageUrl && 
      <div><p className="text-green-600 text-sm">Image uploaded!</p>
      <button onClick={()=>alert('Directing to imagekit. Do you want to continue?')}>
      <Link href={imageUrl}>Follow here</Link>
      </button>
      <img src={imageUrl} alt="" />
      </div>
      }

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
