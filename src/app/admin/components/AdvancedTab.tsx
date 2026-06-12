"use client";

import { ContentData } from "@/context/content-context";
import { Plus, Trash2 } from "lucide-react";

interface AdvancedTabProps {
  data: ContentData;
  onChange: (data: ContentData) => void;
}

export function AdvancedTab({ data, onChange }: AdvancedTabProps) {
  
  // FAQ
  const handleFaqChange = (index: number, field: string, value: string) => {
    const newFaq = [...data.faq];
    newFaq[index] = { ...newFaq[index], [field]: value };
    onChange({ ...data, faq: newFaq });
  };

  const addFaq = () => {
    onChange({
      ...data,
      faq: [
        ...data.faq,
        { question: "New Question?", answer: "New Answer." }
      ]
    });
  };

  const removeFaq = (index: number) => {
    const newFaq = [...data.faq];
    newFaq.splice(index, 1);
    onChange({ ...data, faq: newFaq });
  };

  // GALLERY
  const handleGalleryChange = (index: number, field: string, value: string) => {
    const newGallery = [...data.gallery];
    newGallery[index] = { ...newGallery[index], [field]: value };
    onChange({ ...data, gallery: newGallery });
  };

  const addGallery = () => {
    onChange({
      ...data,
      gallery: [
        ...data.gallery,
        { id: `gal-${Date.now()}`, image: "https://...", title: "New Image", span: "col-span-1 row-span-1" }
      ]
    });
  };

  const removeGallery = (index: number) => {
    const newGallery = [...data.gallery];
    newGallery.splice(index, 1);
    onChange({ ...data, gallery: newGallery });
  };

  return (
    <div className="space-y-12 max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* FAQ Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between bg-white/5 border border-white/10 p-4 rounded-xl">
          <div>
            <h2 className="text-xl font-bold text-cyan-400">Frequently Asked Questions</h2>
            <p className="text-xs text-neutral-400 mt-1">Manage the Q&A section at the bottom of the site.</p>
          </div>
          <button
            onClick={addFaq}
            className="bg-cyan-500 hover:bg-cyan-600 text-black font-bold px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors shadow-[0_0_10px_rgba(34,211,238,0.3)]"
          >
            <Plus className="w-4 h-4" />
            Add FAQ
          </button>
        </div>

        <div className="space-y-4">
          {data.faq.map((faqItem, idx) => (
            <div key={idx} className="bg-black/50 border border-white/10 p-5 rounded-xl space-y-4 relative group">
              <button 
                onClick={() => removeFaq(idx)}
                className="absolute top-4 right-4 text-red-400 hover:text-red-300 p-1 rounded-md hover:bg-red-500/10 transition-colors opacity-0 group-hover:opacity-100"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              
              <div className="space-y-2 pr-8">
                <label className="text-xs text-neutral-400 uppercase tracking-wider">Question</label>
                <input 
                  type="text" 
                  value={faqItem.question}
                  onChange={(e) => handleFaqChange(idx, "question", e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 px-2 py-1 text-sm focus:outline-none focus:border-cyan-500 transition-colors font-bold text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-neutral-400 uppercase tracking-wider">Answer</label>
                <textarea 
                  value={faqItem.answer}
                  onChange={(e) => handleFaqChange(idx, "answer", e.target.value)}
                  rows={2}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between bg-white/5 border border-white/10 p-4 rounded-xl">
          <div>
            <h2 className="text-xl font-bold text-cyan-400">Photo Gallery</h2>
            <p className="text-xs text-neutral-400 mt-1">Manage grid images. Span should be like `col-span-1 row-span-1`.</p>
          </div>
          <button
            onClick={addGallery}
            className="bg-cyan-500 hover:bg-cyan-600 text-black font-bold px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors shadow-[0_0_10px_rgba(34,211,238,0.3)]"
          >
            <Plus className="w-4 h-4" />
            Add Image
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.gallery.map((img, idx) => (
            <div key={img.id} className="bg-black/50 border border-white/10 p-4 rounded-xl space-y-4 relative group">
              <button 
                onClick={() => removeGallery(idx)}
                className="absolute top-2 right-2 text-red-400 hover:text-red-300 p-1 rounded-md hover:bg-red-500/10 transition-colors opacity-0 group-hover:opacity-100"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              
              <div className="space-y-2 pr-6">
                <label className="text-xs text-neutral-400 uppercase tracking-wider">Image Title</label>
                <input 
                  type="text" 
                  value={img.title}
                  onChange={(e) => handleGalleryChange(idx, "title", e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 px-2 py-1 text-sm focus:outline-none focus:border-cyan-500 transition-colors font-bold text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-neutral-400 uppercase tracking-wider">Image URL</label>
                <input 
                  type="text" 
                  value={img.image}
                  onChange={(e) => handleGalleryChange(idx, "image", e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-neutral-400 uppercase tracking-wider">Grid Span</label>
                <input 
                  type="text" 
                  value={img.span}
                  onChange={(e) => handleGalleryChange(idx, "span", e.target.value)}
                  placeholder="col-span-1 row-span-1"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500 transition-colors font-mono"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
