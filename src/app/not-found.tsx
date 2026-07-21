import Link from "next/link";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <div className="w-20 h-20 rounded-3xl bg-blue-500/10 text-blue-400 flex items-center justify-center mx-auto mb-8 animate-pulse">
        <Compass className="w-10 h-10" />
      </div>
      <h1 className="text-6xl font-black text-white mb-4 tracking-tighter">404</h1>
      <h2 className="text-2xl font-bold text-neutral-300 mb-4">Page Not Found</h2>
      <p className="text-neutral-400 mb-8 max-w-md mx-auto">
        The page or case study you're looking for doesn't exist. It might have been moved or deleted.
      </p>
      <Link
        href="/"
        className="px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold transition-colors shadow-[0_0_30px_rgba(37,99,235,0.4)]"
      >
        Return Home
      </Link>
    </div>
  );
}
