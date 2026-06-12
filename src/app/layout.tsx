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
  title: "Mujeeb | Creative Designer & Developer",
  description: "Crafting premium, ultra-modern digital experiences.",
  keywords: ["Mujeeb", "Portfolio", "Creative Developer", "Designer", "Next.js", "React", "Three.js"],
  authors: [{ name: "Mujeeb" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://protofolio-mujeeb.vercel.app",
    title: "Mujeeb | Creative Designer & Developer",
    description: "Crafting premium, ultra-modern digital experiences.",
    siteName: "Mujeeb Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mujeeb | Creative Designer & Developer",
    description: "Crafting premium, ultra-modern digital experiences.",
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
