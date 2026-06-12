"use client";

import { ContentData } from "@/context/content-context";
import { Plus, Trash2, GripVertical } from "lucide-react";

interface ProjectsTabProps {
  data: ContentData;
  onChange: (data: ContentData) => void;
}

export function ProjectsTab({ data, onChange }: ProjectsTabProps) {
  
  const handleProjectChange = (index: number, field: string, value: string | string[]) => {
    const newProjects = [...data.projects];
    newProjects[index] = { ...newProjects[index], [field]: value };
    onChange({ ...data, projects: newProjects });
  };

  const handleTechStackChange = (index: number, commaSeparatedString: string) => {
    const techStack = commaSeparatedString.split(",").map(item => item.trim()).filter(item => item !== "");
    handleProjectChange(index, "techStack", techStack);
  };

  const addProject = () => {
    onChange({
      ...data,
      projects: [
        {
          id: `proj-${Date.now()}`,
          title: "New Project",
          category: "Category",
          description: "Project description goes here.",
          image: "/images/projects/aura.png",
          link: "#",
          techStack: ["React", "Tailwind"]
        },
        ...data.projects
      ]
    });
  };

  const removeProject = (index: number) => {
    const newProjects = [...data.projects];
    newProjects.splice(index, 1);
    onChange({ ...data, projects: newProjects });
  };

  return (
    <div className="space-y-6 max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="flex items-center justify-between bg-white/5 border border-white/10 p-4 rounded-xl">
        <div>
          <h2 className="text-xl font-bold text-cyan-400">Projects Manager</h2>
          <p className="text-xs text-neutral-400 mt-1">Add, edit, or remove your portfolio projects.</p>
        </div>
        <button
          onClick={addProject}
          className="bg-cyan-500 hover:bg-cyan-600 text-black font-bold px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors shadow-[0_0_10px_rgba(34,211,238,0.3)]"
        >
          <Plus className="w-4 h-4" />
          Add Project
        </button>
      </div>

      <div className="space-y-6">
        {data.projects.map((project, idx) => (
          <div key={project.id} className="bg-black/50 border border-white/10 rounded-xl overflow-hidden relative group">
            
            <div className="bg-white/5 px-4 py-3 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-3">
                <GripVertical className="w-4 h-4 text-neutral-500 cursor-grab" />
                <span className="font-bold text-sm text-white/90">Project #{idx + 1}</span>
              </div>
              <button 
                onClick={() => removeProject(idx)}
                className="text-red-400 hover:text-red-300 p-1 rounded-md hover:bg-red-500/10 transition-colors"
                title="Delete Project"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs text-neutral-400 uppercase tracking-wider">Title</label>
                <input 
                  type="text" 
                  value={project.title}
                  onChange={(e) => handleProjectChange(idx, "title", e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-neutral-400 uppercase tracking-wider">Category</label>
                <input 
                  type="text" 
                  value={project.category}
                  onChange={(e) => handleProjectChange(idx, "category", e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs text-neutral-400 uppercase tracking-wider">Description</label>
                <textarea 
                  value={project.description}
                  onChange={(e) => handleProjectChange(idx, "description", e.target.value)}
                  rows={2}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-neutral-400 uppercase tracking-wider">Image URL</label>
                <input 
                  type="text" 
                  value={project.image}
                  onChange={(e) => handleProjectChange(idx, "image", e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-neutral-400 uppercase tracking-wider">Link URL</label>
                <input 
                  type="text" 
                  value={project.link}
                  onChange={(e) => handleProjectChange(idx, "link", e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-xs text-neutral-400 uppercase tracking-wider">Tech Stack (comma separated)</label>
                <input 
                  type="text" 
                  value={project.techStack.join(", ")}
                  onChange={(e) => handleTechStackChange(idx, e.target.value)}
                  placeholder="React, Tailwind, Next.js"
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>
            </div>

          </div>
        ))}

        {data.projects.length === 0 && (
          <div className="text-center py-12 text-neutral-500 bg-white/5 border border-white/10 border-dashed rounded-xl">
            No projects added yet. Click "Add Project" to start.
          </div>
        )}
      </div>

    </div>
  );
}
