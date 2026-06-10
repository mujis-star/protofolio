import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navigation } from "@/components/navigation";
import { CustomCursor } from "@/components/custom-cursor";
import { Footer } from "@/components/footer";
import { SmoothScroll } from "@/components/smooth-scroll";
import { AnimatedBackground } from "@/components/animated-background";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mujeeb | Creative Designer & Developer",
  description: "Crafting premium, ultra-modern digital experiences.",
  keywords: ["Mujeeb", "Portfolio", "Creative Developer", "Designer", "Next.js", "React", "Three.js"],
  authors: [{ name: "Mujeeb" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mujeeb-portfolio.example.com",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SmoothScroll>
            <AnimatedBackground />
            <CustomCursor />
            <Navigation />
            <main className="flex-1 pt-20">
              {children}
            </main>
            <Footer />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
