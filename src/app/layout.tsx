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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://mujeeb-rahman-protfolio.vercel.app"),
  title: "Mujeeb Rahman | Computer Lab Assistant | Systems & Network Administration",
  description: "Computer Lab Assistant & Student Administrator specializing in Systems & Network Administration, pfSense, Samba Active Directory, PXE Imaging, and Web Deployment.",
  keywords: ["Mujeeb Rahman", "Mujeeb", "Portfolio", "Computer Lab Assistant", "Systems Administrator", "Network Administration", "pfSense", "Samba AD", "FOG Server", "Next.js", "React"],
  authors: [{ name: "Mujeeb Rahman" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mujeeb-rahman-protfolio.vercel.app",
    title: "Mujeeb Rahman | Computer Lab Assistant | Systems & Network Administration",
    description: "Computer Lab Assistant & Student Administrator specializing in Systems & Network Administration, pfSense, Samba Active Directory, PXE Imaging, and Web Deployment.",
    siteName: "Mujeeb Rahman Portfolio",
    images: [
      {
        url: "/images/projects/nexus.png",
        width: 1200,
        height: 630,
        alt: "Mujeeb Rahman - Systems, Network & Web Engineering Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mujeeb Rahman | Computer Lab Assistant | Systems & Network Administration",
    description: "Computer Lab Assistant & Student Administrator specializing in Systems & Network Administration, pfSense, Samba Active Directory, PXE Imaging, and Web Deployment.",
    images: ["/images/projects/nexus.png"],
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
