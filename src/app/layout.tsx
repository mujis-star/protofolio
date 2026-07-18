import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navigation } from "@/components/navigation";
import { CustomCursor } from "@/components/custom-cursor";
import { ThreeBackground } from "@/components/three-background";
import { Footer } from "@/components/footer";
import { SmoothScroll } from "@/components/smooth-scroll";
import { AnimatedBackground } from "@/components/animated-background";

import { Outfit, Space_Grotesk } from "next/font/google";

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
});

import { ContentProvider } from "@/context/content-context";

export const metadata: Metadata = {
  title: "Mujeeb P | Frontend Developer & UI Engineer",
  description: "Crafting fast, beautiful, and scalable digital experiences. Specializing in React, Next.js, UI Engineering, and creative web solutions.",
  keywords: ["Mujeeb P", "Mujeeb", "Portfolio", "Frontend Developer", "UI Engineer", "Creative Developer", "Next.js", "React", "Three.js", "Framer Motion"],
  authors: [{ name: "Mujeeb P" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mujeeb-portfolio.vercel.app",
    title: "Mujeeb P | Frontend Developer & UI Engineer",
    description: "Crafting fast, beautiful, and scalable digital experiences. Specializing in React, Next.js, UI Engineering, and creative web solutions.",
    siteName: "Mujeeb P Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mujeeb P | Frontend Developer & UI Engineer",
    description: "Crafting fast, beautiful, and scalable digital experiences. Specializing in React, Next.js, UI Engineering, and creative web solutions.",
    creator: "@mujeeb",
  },
  verification: {
    google: "r5HJUpVSFMw7h3xPvmNC0jywmwmb-mEemyxkogNMkac",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${outfit.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          disableTransitionOnChange
        >
          <SmoothScroll>
            <ContentProvider>
              <CustomCursor />
              <ThreeBackground />
              <AnimatedBackground />
              <Navigation />
              <main className="flex-1 pt-20">
                {children}
              </main>
              <Footer />
            </ContentProvider>
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
