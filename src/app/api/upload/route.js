import cloudinary from "@/lib/Cloudinary";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.formData();
    const file = data.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload using Cloudinary stream
    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "blog-app" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(buffer);
    });

    return NextResponse.json({ success: true, url: uploadResult.secure_url });

  } catch (error) {
    return NextResponse.json({ error: "Upload failed", details: error.message }, { status: 500 });
  }
}
