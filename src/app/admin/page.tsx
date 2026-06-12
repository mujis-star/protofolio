"use client";

import { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Save, LogOut, Loader2, Database } from "lucide-react";
import defaultData from "@/data/content.json";

export default function AdminPage() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [jsonData, setJsonData] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [hasPermissionError, setHasPermissionError] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    // Check authorization
    const token = sessionStorage.getItem("admin_token");
    if (token !== "mujis_secret_authenticated") {
      window.location.href = "/";
      return;
    }
    setIsAuthorized(true);

    // Fetch data from Firebase
    const fetchData = async () => {
      try {
        const docRef = doc(db, "portfolio", "content");
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setJsonData(JSON.stringify(docSnap.data(), null, 2));
          setHasPermissionError(false);
        } else {
          // If no data exists in Firebase yet, use local default and show message
          setJsonData(JSON.stringify(defaultData, null, 2));
          setMessage({ text: "No data in Firebase. Loaded defaults. Save to initialize.", type: "warning" });
          setHasPermissionError(false);
        }
      } catch (error: any) {
        console.error("Error fetching data:", error);
        setJsonData(JSON.stringify(defaultData, null, 2));
        setHasPermissionError(true);
        setMessage({ 
          text: `Firebase Error: ${error.message}. Please ensure you have created a Firestore Database in Test Mode.`, 
          type: "error" 
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    setMessage({ text: "", type: "" });

    try {
      // Validate JSON
      const parsedData = JSON.parse(jsonData);
      
      // Save to Firebase
      const docRef = doc(db, "portfolio", "content");
      await setDoc(docRef, parsedData);
      
      setMessage({ text: "Saved successfully! Refreshing live site...", type: "success" });
      setHasPermissionError(false);
      
      // Optional: Give it a moment to read success message before reloading
      setTimeout(() => {
        window.location.reload();
      }, 1500);

    } catch (error: any) {
      console.error("Error saving data:", error);
      if (error.code === 'permission-denied') {
        setMessage({ text: "Firebase Permission Denied: You must go to Firebase Console > Firestore Database > Rules and set 'allow read, write: if true;'", type: "error" });
      } else {
        setMessage({ text: `Error: ${error.message || "Invalid JSON or network issue."}`, type: "error" });
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_token");
    window.location.href = "/";
  };

  if (!isAuthorized || isLoading) {
    return (
      <div className="min-h-screen bg-[#030712] flex items-center justify-center text-white relative z-50">
        <Loader2 className="w-8 h-8 animate-spin text-cyan-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030712] text-white p-6 md:p-12 font-mono relative z-50">
      <div className="max-w-6xl mx-auto flex flex-col h-[calc(100vh-6rem)]">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
              <Database className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">System Control</h1>
              <p className="text-sm text-neutral-400">Raw JSON Database Editor</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex items-center gap-2 text-sm cursor-pointer z-50"
            >
              <LogOut className="w-4 h-4" />
              Exit
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving || hasPermissionError}
              className="px-6 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-600 transition-all shadow-[0_0_15px_rgba(34,211,238,0.4)] flex items-center gap-2 text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer z-50"
            >
              {isSaving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {hasPermissionError ? "Locked" : "Save to Firebase"}
            </button>
          </div>
        </div>

        {/* Status Message */}
        {message.text && (
          <div className={`p-4 rounded-lg mb-6 text-sm ${
            message.type === "success" ? "bg-green-500/10 text-green-400 border border-green-500/20" :
            message.type === "error" ? "bg-red-500/10 text-red-400 border border-red-500/20" :
            "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
          }`}>
            {message.text}
          </div>
        )}

        {/* Editor */}
        <div className="flex-1 rounded-xl border border-white/10 bg-[#0a0a0a] overflow-hidden flex flex-col shadow-[0_0_30px_rgba(0,0,0,0.5)] z-50">
          <div className="px-4 py-2 border-b border-white/10 bg-white/5 flex items-center gap-2 text-xs text-neutral-400">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
            <span className="ml-2 font-mono">portfolio/content.json</span>
          </div>
          <textarea
            value={jsonData}
            onChange={(e) => setJsonData(e.target.value)}
            spellCheck={false}
            className="flex-1 w-full bg-transparent p-6 text-sm font-mono text-neutral-300 focus:outline-none resize-none leading-relaxed"
          />
        </div>

      </div>
    </div>
  );
}
