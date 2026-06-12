"use client";

import { ContentData } from "@/context/content-context";

interface PersonalTabProps {
  data: ContentData;
  onChange: (data: ContentData) => void;
}

export function PersonalTab({ data, onChange }: PersonalTabProps) {
  const handlePersonalChange = (field: keyof ContentData["personal"], value: string) => {
    onChange({
      ...data,
      personal: { ...data.personal, [field]: value }
    });
  };

  const handleParagraphChange = (index: number, value: string) => {
    const newParagraphs = [...data.about.paragraphs];
    newParagraphs[index] = value;
    onChange({
      ...data,
      about: { ...data.about, paragraphs: newParagraphs }
    });
  };

  const handleSocialChange = (index: number, field: "name" | "url", value: string) => {
    const newSocials = [...data.socials];
    newSocials[index] = { ...newSocials[index], [field]: value };
    onChange({ ...data, socials: newSocials });
  };

  return (
    <div className="space-y-8 max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Personal Info */}
      <section className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-6">
        <h2 className="text-xl font-bold text-cyan-400">Personal Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs text-neutral-400 uppercase tracking-wider">Full Name</label>
            <input 
              type="text" 
              value={data.personal.name}
              onChange={(e) => handlePersonalChange("name", e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs text-neutral-400 uppercase tracking-wider">Role</label>
            <input 
              type="text" 
              value={data.personal.role}
              onChange={(e) => handlePersonalChange("role", e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs text-neutral-400 uppercase tracking-wider">Email</label>
            <input 
              type="text" 
              value={data.personal.email}
              onChange={(e) => handlePersonalChange("email", e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs text-neutral-400 uppercase tracking-wider">Location</label>
            <input 
              type="text" 
              value={data.personal.location}
              onChange={(e) => handlePersonalChange("location", e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs text-neutral-400 uppercase tracking-wider">Short Bio (Hero Section)</label>
          <textarea 
            value={data.personal.bio}
            onChange={(e) => handlePersonalChange("bio", e.target.value)}
            rows={3}
            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-cyan-500 transition-colors resize-none"
          />
        </div>
      </section>

      {/* About Paragraphs */}
      <section className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-6">
        <h2 className="text-xl font-bold text-cyan-400">About Section</h2>
        <div className="space-y-4">
          {data.about.paragraphs.map((p, idx) => (
            <div key={idx} className="space-y-2 relative">
              <label className="text-xs text-neutral-400 uppercase tracking-wider">Paragraph {idx + 1}</label>
              <textarea 
                value={p}
                onChange={(e) => handleParagraphChange(idx, e.target.value)}
                rows={4}
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-cyan-500 transition-colors resize-none"
              />
              <button 
                onClick={() => {
                  const newP = [...data.about.paragraphs];
                  newP.splice(idx, 1);
                  onChange({ ...data, about: { paragraphs: newP } });
                }}
                className="absolute top-0 right-0 text-xs text-red-400 hover:text-red-300 px-2 py-1"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={() => {
              onChange({ ...data, about: { paragraphs: [...data.about.paragraphs, ""] } });
            }}
            className="text-sm text-cyan-400 hover:text-cyan-300"
          >
            + Add Paragraph
          </button>
        </div>
      </section>

      {/* Social Links */}
      <section className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-6">
        <h2 className="text-xl font-bold text-cyan-400">Social Links</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.socials.map((social, idx) => (
            <div key={idx} className="bg-black/50 border border-white/10 p-4 rounded-lg space-y-3 relative group">
              <button 
                onClick={() => {
                  const newS = [...data.socials];
                  newS.splice(idx, 1);
                  onChange({ ...data, socials: newS });
                }}
                className="absolute top-2 right-2 text-xs text-red-400 hover:text-red-300 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Remove
              </button>
              <input 
                type="text" 
                value={social.name}
                onChange={(e) => handleSocialChange(idx, "name", e.target.value)}
                placeholder="Platform Name"
                className="w-full bg-transparent border-b border-white/20 px-2 py-1 text-sm focus:outline-none focus:border-cyan-500 transition-colors font-bold"
              />
              <input 
                type="text" 
                value={social.url}
                onChange={(e) => handleSocialChange(idx, "url", e.target.value)}
                placeholder="https://..."
                className="w-full bg-transparent border-b border-white/20 px-2 py-1 text-sm focus:outline-none focus:border-cyan-500 transition-colors text-neutral-400"
              />
            </div>
          ))}
          <button
            onClick={() => {
              onChange({ ...data, socials: [...data.socials, { name: "New Link", url: "#" }] });
            }}
            className="bg-white/5 border border-white/10 border-dashed rounded-lg flex items-center justify-center text-sm text-cyan-400 hover:text-cyan-300 hover:bg-white/10 transition-colors min-h-[100px]"
          >
            + Add Social Link
          </button>
        </div>
      </section>

    </div>
  );
}
