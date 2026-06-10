import { NextResponse } from "next/server";
import { Resend } from "resend";

// Initialize Resend with the API key from environment variables
// Note: If RESEND_API_KEY is not set, this will fail gracefully or throw depending on Resend sdk.
const resend = new Resend(process.env.RESEND_API_KEY || "placeholder_key");

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // In a real app, you would send this to your verified email
    // For now, we wrap it in a try/catch so the UI can still simulate success if the key is missing
    if (process.env.RESEND_API_KEY) {
      const data = await resend.emails.send({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: ["delivered@resend.dev"], // Replace with your actual email when going to production
        subject: `New Contact Request from ${name}`,
        html: `
          <h1>New message from ${name}</h1>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
      });

      return NextResponse.json({ success: true, data }, { status: 200 });
    } else {
      // Simulate network delay for UI testing without an API key
      await new Promise(resolve => setTimeout(resolve, 1500));
      return NextResponse.json({ 
        success: true, 
        message: "Simulated success (No API key found)" 
      }, { status: 200 });
    }

  } catch (error) {
    console.error("Resend error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
