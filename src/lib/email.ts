import emailjs from "@emailjs/browser";
import type { ContactFormData } from "./schemas";

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

export async function sendContactEmail(
  data: Omit<ContactFormData, "website">,
): Promise<{ success: boolean; message: string }> {
  try {
    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        from_name: data.name,
        from_email: data.email,
        subject: data.subject || "Portfolio Contact",
        message: data.message,
      },
      PUBLIC_KEY,
    );

    return {
      success: true,
      message: "Message sent successfully! I'll get back to you soon.",
    };
  } catch {
    return {
      success: false,
      message:
        "Failed to send message. Please try emailing me directly.",
    };
  }
}
