"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import data from "@/data/content.json";

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");

    const formData = new FormData(e.currentTarget);
    const formValues = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      });

      if (response.ok) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
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
            className="flex flex-col gap-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-2">Get in touch</h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                I'm currently {data.personal.availabilityStatus.toLowerCase()}.
              </p>
            </div>
            
            <div className="flex flex-col gap-4">
              <a href="mailto:hello@example.com" className="text-xl font-medium hover:text-blue-500 transition-colors">
                hello@example.com
              </a>
              <p className="text-neutral-500">Based in {data.personal.location}</p>
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
                <div className="flex items-center gap-2 mt-2 text-red-600 dark:text-red-500 text-sm font-medium">
                  <AlertCircle className="w-4 h-4" />
                  Failed to send message. Please try again.
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
