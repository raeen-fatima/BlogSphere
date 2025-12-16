import cloudinary from "@/lib/Cloudinary";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("image");

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary
    const upload = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: "blogs",
          resource_type: "image",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });

    return NextResponse.json({
      imageUrl: upload.secure_url,
      publicId: upload.public_id,
    });
  } catch (error) {
    console.error("CLOUDINARY UPLOAD ERROR 👉", error);
    return NextResponse.json(
      { error: "Image upload failed" },
      { status: 500 }
    );
  }
}
