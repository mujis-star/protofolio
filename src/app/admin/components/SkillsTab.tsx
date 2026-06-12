"use client";

import { ContentData } from "@/context/content-context";
import { Plus, Trash2 } from "lucide-react";

interface SkillsTabProps {
  data: ContentData;
  onChange: (data: ContentData) => void;
}

export function SkillsTab({ data, onChange }: SkillsTabProps) {
  
  // SKILLS
  const handleSkillCategoryChange = (index: number, value: string) => {
    const newSkills = [...data.skills];
    newSkills[index] = { ...newSkills[index], category: value };
    onChange({ ...data, skills: newSkills });
  };

  const handleSkillItemsChange = (index: number, commaSeparatedString: string) => {
    const items = commaSeparatedString.split(",").map(item => item.trim()).filter(item => item !== "");
    const newSkills = [...data.skills];
    newSkills[index] = { ...newSkills[index], items };
    onChange({ ...data, skills: newSkills });
  };

  const addSkillCategory = () => {
    onChange({
      ...data,
      skills: [
        ...data.skills,
        { category: "New Category", items: ["Skill 1", "Skill 2"] }
      ]
    });
  };

  const removeSkillCategory = (index: number) => {
    const newSkills = [...data.skills];
    newSkills.splice(index, 1);
    onChange({ ...data, skills: newSkills });
  };

  // SERVICES
  const handleServiceChange = (index: number, field: string, value: string) => {
    const newServices = [...data.services];
    newServices[index] = { ...newServices[index], [field]: value };
    onChange({ ...data, services: newServices });
  };

  const addService = () => {
    onChange({
      ...data,
      services: [
        ...data.services,
        { title: "New Service", description: "Service description." }
      ]
    });
  };

  const removeService = (index: number) => {
    const newServices = [...data.services];
    newServices.splice(index, 1);
    onChange({ ...data, services: newServices });
  };

  // CLIENTS
  const handleClientChange = (index: number, value: string) => {
    const newClients = [...data.clients];
    newClients[index] = { name: value };
    onChange({ ...data, clients: newClients });
  };

  const addClient = () => {
    onChange({
      ...data,
      clients: [...data.clients, { name: "NEW CLIENT" }]
    });
  };

  const removeClient = (index: number) => {
    const newClients = [...data.clients];
    newClients.splice(index, 1);
    onChange({ ...data, clients: newClients });
  };

  return (
    <div className="space-y-12 max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Skills Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between bg-white/5 border border-white/10 p-4 rounded-xl">
          <div>
            <h2 className="text-xl font-bold text-cyan-400">Skills</h2>
            <p className="text-xs text-neutral-400 mt-1">Manage your skill categories and items.</p>
          </div>
          <button
            onClick={addSkillCategory}
            className="bg-cyan-500 hover:bg-cyan-600 text-black font-bold px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors shadow-[0_0_10px_rgba(34,211,238,0.3)]"
          >
            <Plus className="w-4 h-4" />
            Add Category
          </button>
        </div>

        <div className="space-y-4">
          {data.skills.map((skillGroup, idx) => (
            <div key={idx} className="bg-black/50 border border-white/10 p-6 rounded-xl relative group">
              <button 
                onClick={() => removeSkillCategory(idx)}
                className="absolute top-4 right-4 text-red-400 hover:text-red-300 p-1 rounded-md hover:bg-red-500/10 transition-colors opacity-0 group-hover:opacity-100"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-xs text-neutral-400 uppercase tracking-wider">Category Name</label>
                  <input 
                    type="text" 
                    value={skillGroup.category}
                    onChange={(e) => handleSkillCategoryChange(idx, e.target.value)}
                    className="w-full bg-transparent border-b border-white/20 px-2 py-1 text-sm focus:outline-none focus:border-cyan-500 transition-colors font-bold"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs text-neutral-400 uppercase tracking-wider">Skills (comma separated)</label>
                  <input 
                    type="text" 
                    value={skillGroup.items.join(", ")}
                    onChange={(e) => handleSkillItemsChange(idx, e.target.value)}
                    placeholder="HTML, CSS, JS..."
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between bg-white/5 border border-white/10 p-4 rounded-xl">
          <div>
            <h2 className="text-xl font-bold text-cyan-400">Services</h2>
            <p className="text-xs text-neutral-400 mt-1">What you offer to clients.</p>
          </div>
          <button
            onClick={addService}
            className="bg-cyan-500 hover:bg-cyan-600 text-black font-bold px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors shadow-[0_0_10px_rgba(34,211,238,0.3)]"
          >
            <Plus className="w-4 h-4" />
            Add Service
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.services.map((service, idx) => (
            <div key={idx} className="bg-black/50 border border-white/10 p-5 rounded-xl space-y-4 relative group">
              <button 
                onClick={() => removeService(idx)}
                className="absolute top-2 right-2 text-red-400 hover:text-red-300 p-1 rounded-md hover:bg-red-500/10 transition-colors opacity-0 group-hover:opacity-100"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              
              <div className="space-y-2 pr-6">
                <label className="text-xs text-neutral-400 uppercase tracking-wider">Service Title</label>
                <input 
                  type="text" 
                  value={service.title}
                  onChange={(e) => handleServiceChange(idx, "title", e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 px-2 py-1 text-sm focus:outline-none focus:border-cyan-500 transition-colors font-bold text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-neutral-400 uppercase tracking-wider">Description</label>
                <textarea 
                  value={service.description}
                  onChange={(e) => handleServiceChange(idx, "description", e.target.value)}
                  rows={2}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Clients Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between bg-white/5 border border-white/10 p-4 rounded-xl">
          <div>
            <h2 className="text-xl font-bold text-cyan-400">Clients / Logos</h2>
            <p className="text-xs text-neutral-400 mt-1">Scrolling marquee items.</p>
          </div>
          <button
            onClick={addClient}
            className="bg-cyan-500 hover:bg-cyan-600 text-black font-bold px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors shadow-[0_0_10px_rgba(34,211,238,0.3)]"
          >
            <Plus className="w-4 h-4" />
            Add Client
          </button>
        </div>

        <div className="flex flex-wrap gap-3">
          {data.clients.map((client, idx) => (
            <div key={idx} className="bg-black/50 border border-white/10 px-3 py-2 rounded-lg flex items-center gap-2">
              <input 
                type="text" 
                value={client.name}
                onChange={(e) => handleClientChange(idx, e.target.value)}
                className="bg-transparent border-none w-24 text-sm focus:outline-none focus:border-cyan-500 transition-colors text-white font-bold uppercase"
              />
              <button 
                onClick={() => removeClient(idx)}
                className="text-neutral-500 hover:text-red-400 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
