"use client";

import { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Save, LogOut, Loader2, Database, User, FolderGit2, Briefcase, Wrench, Settings, Code } from "lucide-react";
import defaultData from "@/data/content.json";
import { ContentData } from "@/context/content-context";

import { PersonalTab } from "./components/PersonalTab";
import { ProjectsTab } from "./components/ProjectsTab";
import { ExperienceTab } from "./components/ExperienceTab";
import { SkillsTab } from "./components/SkillsTab";
import { AdvancedTab } from "./components/AdvancedTab";

type TabType = "personal" | "projects" | "experience" | "skills" | "advanced" | "raw";

export default function AdminPage() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [formData, setFormData] = useState<ContentData>(defaultData as ContentData);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [hasPermissionError, setHasPermissionError] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [activeTab, setActiveTab] = useState<TabType>("personal");
  
  // For raw json tab
  const [rawJsonText, setRawJsonText] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("admin_token");
    if (token !== "mujis_secret_authenticated") {
      window.location.href = "/";
      return;
    }
    setIsAuthorized(true);

    const fetchData = async () => {
      try {
        const docRef = doc(db, "portfolio", "content");
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data() as ContentData;
          setFormData(data);
          setRawJsonText(JSON.stringify(data, null, 2));
          setHasPermissionError(false);
        } else {
          setFormData(defaultData as ContentData);
          setRawJsonText(JSON.stringify(defaultData, null, 2));
          setMessage({ text: "No data in Firebase. Loaded defaults. Save to initialize.", type: "warning" });
          setHasPermissionError(false);
        }
      } catch (error: any) {
        console.error("Error fetching data:", error);
        setFormData(defaultData as ContentData);
        setRawJsonText(JSON.stringify(defaultData, null, 2));
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

  // Sync raw JSON to form data when typing in the Raw tab
  useEffect(() => {
    if (activeTab === "raw") {
      try {
        const parsed = JSON.parse(rawJsonText);
        setFormData(parsed);
      } catch (e) {
        // ignore JSON errors while typing
      }
    } else {
      // Sync form data back to raw json text when leaving other tabs
      setRawJsonText(JSON.stringify(formData, null, 2));
    }
  }, [activeTab, formData, rawJsonText]);

  const handleSave = async () => {
    setIsSaving(true);
    setMessage({ text: "", type: "" });

    try {
      // Use parsed raw text if we are on the raw tab, otherwise use form data directly
      let dataToSave = formData;
      if (activeTab === "raw") {
        dataToSave = JSON.parse(rawJsonText);
      }

      const docRef = doc(db, "portfolio", "content");
      await setDoc(docRef, dataToSave);
      
      setMessage({ text: "Saved successfully! Refreshing live site...", type: "success" });
      setHasPermissionError(false);
      
      setTimeout(() => {
        window.location.reload();
      }, 1500);

    } catch (error: any) {
      console.error("Error saving data:", error);
      if (error.code === 'permission-denied') {
        setMessage({ text: "Firebase Permission Denied: You must go to Firebase Console > Firestore Database > Rules and set 'allow read, write: if true;'", type: "error" });
      } else {
        setMessage({ text: `Error: ${error.message || "Invalid JSON syntax."}`, type: "error" });
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

  const tabs = [
    { id: "personal", label: "Personal", icon: User },
    { id: "projects", label: "Projects", icon: FolderGit2 },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "skills", label: "Skills", icon: Wrench },
    { id: "advanced", label: "Advanced", icon: Settings },
    { id: "raw", label: "Raw JSON", icon: Code },
  ];

  return (
    <div className="min-h-screen bg-[#030712] text-white p-4 md:p-8 font-sans relative z-50 overflow-y-auto">
      <div className="max-w-6xl mx-auto flex flex-col gap-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white/5 border border-white/10 p-4 md:p-6 rounded-2xl sticky top-4 z-40 backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 shadow-[0_0_15px_rgba(34,211,238,0.2)] shrink-0">
              <Database className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold tracking-tight">System Control</h1>
              <p className="text-xs md:text-sm text-neutral-400">Content Management System</p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex items-center gap-2 text-sm cursor-pointer z-50 flex-1 sm:flex-none justify-center"
            >
              <LogOut className="w-4 h-4" />
              Exit
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving || hasPermissionError}
              className="px-6 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-600 transition-all shadow-[0_0_15px_rgba(34,211,238,0.4)] flex items-center gap-2 text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer z-50 text-black flex-1 sm:flex-none justify-center"
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
          <div className={`p-4 rounded-xl text-sm ${
            message.type === "success" ? "bg-green-500/10 text-green-400 border border-green-500/20" :
            message.type === "error" ? "bg-red-500/10 text-red-400 border border-red-500/20" :
            "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
          }`}>
            {message.text}
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Tabs */}
          <div className="w-full lg:w-64 shrink-0 space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium ${
                    activeTab === tab.id 
                      ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_10px_rgba(34,211,238,0.1)]" 
                      : "text-neutral-400 hover:bg-white/5 hover:text-white border border-transparent"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Main Content Area */}
          <div className="flex-1 pb-20">
            {activeTab === "personal" && <PersonalTab data={formData} onChange={setFormData} />}
            {activeTab === "projects" && <ProjectsTab data={formData} onChange={setFormData} />}
            {activeTab === "experience" && <ExperienceTab data={formData} onChange={setFormData} />}
            {activeTab === "skills" && <SkillsTab data={formData} onChange={setFormData} />}
            {activeTab === "advanced" && <AdvancedTab data={formData} onChange={setFormData} />}
            
            {activeTab === "raw" && (
              <div className="flex-1 rounded-xl border border-white/10 bg-[#0a0a0a] overflow-hidden flex flex-col shadow-[0_0_30px_rgba(0,0,0,0.5)] animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-[600px]">
                <div className="px-4 py-2 border-b border-white/10 bg-white/5 flex items-center gap-2 text-xs text-neutral-400">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  <span className="ml-2 font-mono">portfolio/content.json (Raw)</span>
                </div>
                <textarea
                  value={rawJsonText}
                  onChange={(e) => setRawJsonText(e.target.value)}
                  spellCheck={false}
                  className="flex-1 w-full bg-transparent p-6 text-sm font-mono text-neutral-300 focus:outline-none resize-none leading-relaxed h-[600px]"
                />
              </div>
            )}
          </div>
          
        </div>

      </div>
    </div>
  );
}
