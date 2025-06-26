"use client";

import { upload } from "@imagekit/next";
import { useState } from "react";

interface FileUploadProps {
  fileType: "image" | "video";
  onSuccessAction: (data: { url: string; thumbnailUrl?: string }) => void;
}

export default function FileUpload({ fileType, onSuccessAction }: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setUploading(true);

    try {
      const authRes = await fetch("/api/auth/imagekit-auth");
      const auth = await authRes.json();

      const result = await upload({
        file,
        fileName: file.name,
        publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
        signature: auth.signature,
        expire: auth.expire,
        token: auth.token,
      });

      if (!result.url) {
          throw new Error("Upload did not return a URL.");
      }

      onSuccessAction({ url: result.url, thumbnailUrl: result.thumbnailUrl });
    } catch (err: unknown) {
      console.error("Upload failed", err);
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <input
        type="file"
        accept={fileType === "video" ? "video/*" : "image/*"}
        onChange={handleFileChange}
        className="file-input file-input-bordered w-full"
      />
      {uploading && <p className="text-sm text-blue-500">Uploading...</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
