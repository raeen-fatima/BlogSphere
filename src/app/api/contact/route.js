import connectDB from "@/lib/db";
import { NextResponse } from "next/server";
import Contact from "@/models/Contact";
import nodemailer from "nodemailer";
export async function POST(req) {
  await connectDB();

  let body;

  // ✅ Protect JSON parsing
  try {
    body = await req.json();
  } catch (err) {
    return NextResponse.json(
      { error: "Invalid or empty request body" },
      { status: 400 }
    );
  }

  const { name, email, message } = body;

  // Validation
  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json(
      { error: "Invalid email format" },
      { status: 400 }
    );
  }

  try {
    // ✅ Save DB FIRST (always safe)
    const newMsg = await Contact.create({ name, email, message });

    // ✅ Email sending (optional, never crash API)
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: `"BlogSphere Contact" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        replyTo: email,
        subject: "📩 New Contact Message",
        html: `
          <h2>New Message Received</h2>
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Message:</b><br/> ${message}</p>
        `,
      });
    } catch (mailErr) {
      console.log("Email failed but message saved:", mailErr);
    }

    return NextResponse.json(
      { success: true, data: newMsg },
      { status: 201 }
    );

  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Database error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: "Contact API is live!" });
}
