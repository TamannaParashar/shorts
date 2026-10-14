import { authOptions } from "@/lib/auth";
import Video, { IVideo } from "@/models/video";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/utils/db";

export async function GET() {
  try {
    await connectDB();

    const videos = await Video.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json(videos, { status: 200 });
  } catch (error) {
    console.error("Some problem occured:", error);
    return NextResponse.json(
      { error: "Failed to fetch videos" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions) as { user?: { email?: string } } | null;
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    
    const body: IVideo = await request.json();
    if (
      !body.title ||
      !body.description ||
      (!body.videoUrl && !body.thumbnailUrl)
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    const userEmail = session.user?.email;
    const videoData = {
      ...body,
      videoUrl: body.videoUrl || "",
      controls: body.controls ?? true,
      transformation: {
        height: 1920,
        width: 1080,
        quality: body.transformation?.quality ?? 100,
      },
      uploadedBy: userEmail,
    };

    const newVideo = await Video.create(videoData);

    return NextResponse.json(newVideo, { status: 201 });
  } catch (error) {
    console.error("Some problem occured", error);
    return NextResponse.json(
      { error: "Failed to create video" },
      { status: 500 }
    );
  }
}
