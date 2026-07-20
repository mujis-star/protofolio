import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navigation } from "@/components/navigation";
import { CustomCursor } from "@/components/custom-cursor";
import { ThreeBackground } from "@/components/three-background";
import { Footer } from "@/components/footer";
import { SmoothScroll } from "@/components/smooth-scroll";
import { AnimatedBackground } from "@/components/animated-background";
import { CommandPalette } from "@/components/command-palette";

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
  title: "Mujeeb Rahman | Full Stack + Infrastructure Engineer",
  description: "Crafting fast, beautiful, and scalable digital experiences. Specializing in Systems Infrastructure, Next.js, and robust web solutions.",
  keywords: ["Mujeeb P", "Mujeeb", "Portfolio", "Frontend Developer", "UI Engineer", "Creative Developer", "Next.js", "React", "Three.js", "Framer Motion"],
  authors: [{ name: "Mujeeb P" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mujeeb-rahman-portfolio.vercel.app",
    title: "Mujeeb Rahman | Full Stack + Infrastructure Engineer",
    description: "Crafting fast, beautiful, and scalable digital experiences. Specializing in Systems Infrastructure, Next.js, and robust web solutions.",
    siteName: "Mujeeb Rahman Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mujeeb Rahman | Full Stack + Infrastructure Engineer",
    description: "Crafting fast, beautiful, and scalable digital experiences. Specializing in Systems Infrastructure, Next.js, and robust web solutions.",
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
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[99999] focus:px-6 focus:py-3 focus:bg-blue-600 focus:text-white focus:font-bold focus:rounded-xl focus:shadow-2xl focus:outline-none"
        >
          Skip to main content
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          disableTransitionOnChange
        >
          <SmoothScroll>
            <ContentProvider>
              <CustomCursor />
              <CommandPalette />
              <ThreeBackground />
              <AnimatedBackground />
              <Navigation />
              <main id="main-content" tabIndex={-1} className="flex-1 pt-20 outline-none">
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
