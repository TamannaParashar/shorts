"use client"

import { useState } from "react"
import FileUpload from "@/components/FileUpload"
import Link from "next/link"

export default function AddImagePage() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [fileUpload,setFileUpload] = useState(0)

  const handleSubmit = async () => {
    if (!title || !description || !imageUrl) {
      alert("Please fill in all fields and upload an image.")
      return
    }

    setLoading(true)
    try {
      const res = await fetch("/api/video", {
        method: "POST",
        body: JSON.stringify({
          title,
          description,
          thumbnailUrl: imageUrl,
          videoUrl: "",
        }),
      })
      const data = await res.json()
      console.log("Saved:", data)
      alert("Image uploaded successfully!")
      setTitle("")
      setDescription("")
      setImageUrl(null)
      setLoading(false)
      setFileUpload(prev=>prev+1)
    } catch (err) {
       console.error("Failed to save image:", err);
      alert("Failed to save image")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-xl mx-auto p-8 space-y-4 bg-white rounded-xl shadow-lg border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">Upload Image</h1>

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50 hover:border-blue-400 transition-colors">
          <FileUpload
            key={fileUpload}
            fileType="image"
            onSuccessAction={({ url }) => {
              setImageUrl(url)
            }}
          />
        </div>

        {imageUrl && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-3">
            <p className="text-green-700 text-sm font-medium flex items-center">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Image uploaded!
            </p>
            <button
              onClick={() => alert("Directing to imagekit. Do you want to continue?")}
              className="text-blue-600 hover:text-blue-800 underline text-sm transition-colors"
            >
              <Link href={imageUrl}>Follow here</Link>
            </button>
            <img
              src={imageUrl || "/placeholder.svg"}
              alt=""
              className="w-full h-48 object-cover rounded-lg border border-gray-200 shadow-sm"
            />
          </div>
        )}

        <input
          type="text"
          placeholder="Title"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder-gray-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Description"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder-gray-500 resize-none h-32"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 shadow-sm"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Saving...
            </span>
          ) : (
            "Submit"
          )}
        </button>
      </div>
    </div>
  )
}
