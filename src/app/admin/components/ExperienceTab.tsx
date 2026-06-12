"use client";

import { ContentData } from "@/context/content-context";
import { Plus, Trash2, GripVertical } from "lucide-react";

interface ExperienceTabProps {
  data: ContentData;
  onChange: (data: ContentData) => void;
}

export function ExperienceTab({ data, onChange }: ExperienceTabProps) {
  
  const handleExperienceChange = (index: number, field: string, value: string) => {
    const newExperience = [...data.experience];
    newExperience[index] = { ...newExperience[index], [field]: value };
    onChange({ ...data, experience: newExperience });
  };

  const addExperience = () => {
    onChange({
      ...data,
      experience: [
        {
          role: "New Role",
          company: "Company Name",
          period: "2024 - Present",
          description: "Describe your responsibilities and achievements here."
        },
        ...data.experience
      ]
    });
  };

  const removeExperience = (index: number) => {
    const newExperience = [...data.experience];
    newExperience.splice(index, 1);
    onChange({ ...data, experience: newExperience });
  };

  const handleAchievementChange = (index: number, field: string, value: string) => {
    const newAch = [...data.achievements];
    newAch[index] = { ...newAch[index], [field]: value };
    onChange({ ...data, achievements: newAch });
  };

  const addAchievement = () => {
    onChange({
      ...data,
      achievements: [
        {
          title: "New Achievement",
          category: "Category",
          date: "2024",
          description: "Description of the achievement.",
          icon: "award"
        },
        ...data.achievements
      ]
    });
  };

  const removeAchievement = (index: number) => {
    const newAch = [...data.achievements];
    newAch.splice(index, 1);
    onChange({ ...data, achievements: newAch });
  };

  return (
    <div className="space-y-12 max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Experience Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between bg-white/5 border border-white/10 p-4 rounded-xl">
          <div>
            <h2 className="text-xl font-bold text-cyan-400">Experience Timeline</h2>
            <p className="text-xs text-neutral-400 mt-1">Manage your work and academic experience.</p>
          </div>
          <button
            onClick={addExperience}
            className="bg-cyan-500 hover:bg-cyan-600 text-black font-bold px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors shadow-[0_0_10px_rgba(34,211,238,0.3)]"
          >
            <Plus className="w-4 h-4" />
            Add Experience
          </button>
        </div>

        <div className="space-y-6">
          {data.experience.map((exp, idx) => (
            <div key={idx} className="bg-black/50 border border-white/10 rounded-xl overflow-hidden relative group">
              <div className="bg-white/5 px-4 py-3 flex items-center justify-between border-b border-white/10">
                <div className="flex items-center gap-3">
                  <GripVertical className="w-4 h-4 text-neutral-500 cursor-grab" />
                  <span className="font-bold text-sm text-white/90">Experience #{idx + 1}</span>
                </div>
                <button 
                  onClick={() => removeExperience(idx)}
                  className="text-red-400 hover:text-red-300 p-1 rounded-md hover:bg-red-500/10 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs text-neutral-400 uppercase tracking-wider">Role / Title</label>
                  <input 
                    type="text" 
                    value={exp.role}
                    onChange={(e) => handleExperienceChange(idx, "role", e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-neutral-400 uppercase tracking-wider">Company</label>
                  <input 
                    type="text" 
                    value={exp.company}
                    onChange={(e) => handleExperienceChange(idx, "company", e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs text-neutral-400 uppercase tracking-wider">Time Period</label>
                  <input 
                    type="text" 
                    value={exp.period}
                    onChange={(e) => handleExperienceChange(idx, "period", e.target.value)}
                    placeholder="e.g. 2022 - Present"
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs text-neutral-400 uppercase tracking-wider">Description</label>
                  <textarea 
                    value={exp.description}
                    onChange={(e) => handleExperienceChange(idx, "description", e.target.value)}
                    rows={3}
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Achievements Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between bg-white/5 border border-white/10 p-4 rounded-xl">
          <div>
            <h2 className="text-xl font-bold text-cyan-400">Achievements</h2>
            <p className="text-xs text-neutral-400 mt-1">Manage your certifications and awards.</p>
          </div>
          <button
            onClick={addAchievement}
            className="bg-cyan-500 hover:bg-cyan-600 text-black font-bold px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors shadow-[0_0_10px_rgba(34,211,238,0.3)]"
          >
            <Plus className="w-4 h-4" />
            Add Achievement
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {data.achievements.map((ach, idx) => (
            <div key={idx} className="bg-black/50 border border-white/10 rounded-xl overflow-hidden relative group">
              <div className="bg-white/5 px-4 py-3 flex items-center justify-between border-b border-white/10">
                <span className="font-bold text-sm text-white/90">Achievement #{idx + 1}</span>
                <button 
                  onClick={() => removeAchievement(idx)}
                  className="text-red-400 hover:text-red-300 p-1 rounded-md hover:bg-red-500/10 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs text-neutral-400 uppercase tracking-wider">Title</label>
                  <input 
                    type="text" 
                    value={ach.title}
                    onChange={(e) => handleAchievementChange(idx, "title", e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-neutral-400 uppercase tracking-wider">Category</label>
                  <input 
                    type="text" 
                    value={ach.category}
                    onChange={(e) => handleAchievementChange(idx, "category", e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-neutral-400 uppercase tracking-wider">Date/Year</label>
                  <input 
                    type="text" 
                    value={ach.date}
                    onChange={(e) => handleAchievementChange(idx, "date", e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-neutral-400 uppercase tracking-wider">Icon Name (lucide)</label>
                  <input 
                    type="text" 
                    value={ach.icon}
                    onChange={(e) => handleAchievementChange(idx, "icon", e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs text-neutral-400 uppercase tracking-wider">Description</label>
                  <textarea 
                    value={ach.description}
                    onChange={(e) => handleAchievementChange(idx, "description", e.target.value)}
                    rows={2}
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
