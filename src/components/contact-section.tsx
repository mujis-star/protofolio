"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { useContent } from "@/context/content-context";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export function ContactSection() {
  const data = useContent();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    // Secret Admin Panel Intercept
    if ((email === "mujee00012@gmail.com" || email === "mujee00012") && message === "m..09+-&Jeeb") {
      sessionStorage.setItem("admin_token", "mujis_secret_authenticated");
      router.push("/admin");
      return;
    }

    const formValues = {
      name: formData.get("name"),
      email,
      message,
    };

    try {
      await addDoc(collection(db, "messages"), {
        name: formValues.name,
        email: formValues.email,
        message: formValues.message,
        createdAt: serverTimestamp(),
        read: false
      });
      
      // Trigger the email notification via Resend API
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to send email via API");
      }

      setStatus("success");
      (e.target as HTMLFormElement).reset();
    } catch (error: any) {
      console.error("Error saving message:", error);
      setStatus("error");
      setErrorMessage(error.message || "Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 relative overflow-hidden bg-transparent">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-500/5 dark:to-blue-900/10 pointer-events-none" />
      
      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
            Let's build something <span className="text-blue-500">together.</span>
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            Reach out for freelance opportunities or just to say hi!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-8 p-6 sm:p-8 rounded-3xl bg-white/5 dark:bg-black/20 border border-neutral-200 dark:border-white/10 backdrop-blur-md relative overflow-hidden group hover:shadow-[0_0_15px_rgba(59,130,246,0.1)] transition-shadow duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-2 text-white">Let's Build Something Great Together</h3>
              <p className="text-sm text-neutral-400 mb-3">
                I'm currently open for **Full-Time Frontend Roles**, **Freelance Projects**, and **Open Source Collaboration**.
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                {data.personal.availabilityStatus}
              </div>
            </div>
            
            <div className="relative z-10 flex flex-col gap-6 text-sm font-mono">
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] text-neutral-500 uppercase tracking-wider">Email</span>
                <a href={`mailto:${data.personal.email}`} className="text-base text-blue-400 hover:text-blue-300 font-semibold transition-colors">
                  {data.personal.email}
                </a>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] text-neutral-500 uppercase tracking-wider">Location</span>
                <span className="text-base text-neutral-300">
                  {data.personal.location}
                </span>
              </div>

              <div className="flex flex-wrap gap-4 pt-4 border-t border-white/10">
                <a 
                  href={data.personal.github} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-xs text-neutral-400 hover:text-white transition-colors"
                >
                  GitHub
                </a>
                <span className="text-neutral-700">•</span>
                <a 
                  href={data.personal.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-xs text-neutral-400 hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
                <span className="text-neutral-700">•</span>
                <a 
                  href="/resume.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-xs text-neutral-400 hover:text-white transition-colors"
                >
                  Resume
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-8 rounded-3xl bg-white/50 dark:bg-black/50 backdrop-blur-md border border-neutral-200 dark:border-neutral-800">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-medium ml-1">Name</label>
                <input
                  required
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  className="h-12 px-4 rounded-xl bg-neutral-100 dark:bg-neutral-900 border-none outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                />
              </div>
              
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium ml-1">Email</label>
                <input
                  required
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  className="h-12 px-4 rounded-xl bg-neutral-100 dark:bg-neutral-900 border-none outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                />
              </div>

              <div className="flex flex-col gap-2 mb-4">
                <label htmlFor="message" className="text-sm font-medium ml-1">Message</label>
                <textarea
                  required
                  id="message"
                  name="message"
                  rows={4}
                  data-lenis-prevent
                  placeholder="Tell me about your project..."
                  className="p-4 rounded-xl bg-neutral-100 dark:bg-neutral-900 border-none outline-none focus:ring-2 focus:ring-blue-500 transition-shadow resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="h-12 flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors disabled:opacity-70"
              >
                {isSubmitting ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Send Message
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>

              {status === "success" && (
                <div className="flex items-center gap-2 mt-2 text-green-600 dark:text-green-500 text-sm font-medium">
                  <CheckCircle className="w-4 h-4" />
                  Message sent successfully!
                </div>
              )}
              {status === "error" && (
                <div className="flex items-start gap-2 mt-2 text-red-600 dark:text-red-500 text-sm font-medium bg-red-500/10 border border-red-500/20 p-3 rounded-lg">
                  <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
