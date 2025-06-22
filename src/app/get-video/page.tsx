"use client"
import { useEffect, useState } from "react"

interface Video {
  _id: string
  title: string
  description: string
  videoUrl: string
  thumbnailUrl: string
}

export default function HomePage() {
  const [videos, setVideos] = useState<Video[]>([])

  useEffect(() => {
    const fetchVideos = async () => {
      try{
        const response = await fetch('/api/video')
        const data = await response.json()
        setVideos(data)
      } catch(err) {
        console.log("Error fetching videos",err)
      }
    }

    fetchVideos()
  }, [])

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">All Uploaded Videos</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {videos.map((video) => (
          <div key={video._id} className="bg-gray-600 rounded-lg p-4 shadow-md">
            <h2 className="text-xl font-semibold">{video.title}</h2>
            <p className="text-gray-400 mb-2">{video.description}</p>
            {video.videoUrl ? (
              <video
                src={video.videoUrl}
                controls
                className="w-full rounded mt-2"
              />
            ) : (
              <img
                src={video.thumbnailUrl}
                alt="Thumbnail"
                className="w-full rounded mt-2"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
