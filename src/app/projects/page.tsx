"use client";
import { useState, useEffect } from "react";
import FramerWrapper from "@/components/animation/FramerWrapper";
import Heading from "@/components/Heading";
import { Badge } from "@/components/ui/badge";
import { Layers, X, ArrowLeft, ExternalLink, Inbox } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const ProjectPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isWindowFocused, setIsWindowFocused] = useState(true);

  useEffect(() => {
    const handleBlur = () => setIsWindowFocused(false);
    const handleFocus = () => setIsWindowFocused(true);
    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    document.addEventListener("contextmenu", handleContextMenu);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "F12" || (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J" || e.key === "C")) || (e.metaKey && e.shiftKey && (e.key === "I" || e.key === "J" || e.key === "C")) || (e.ctrlKey && e.key === "U") || (e.metaKey && e.key === "U") || (e.ctrlKey && e.key === "S") || (e.metaKey && e.key === "S") || (e.ctrlKey && e.key === "P") || (e.metaKey && e.key === "P")) e.preventDefault();
      if (e.key === "PrintScreen") navigator.clipboard.writeText("Screenshots are disabled.");
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const categories = [
    { id: 1, title: "Personal Project", description: "Logo Design, Photo Manipulation, Typography Choices.", subcategories: ["Cohesive Social Media Posts", "Logo Design", "Photo Manipulation", "Typography Choices", "Brand Color Palettes", "Corporate Stationery"], image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1000&auto=format&fit=crop" },
    { id: 2, title: "Brand Identity & Logo Design", description: "Logo Design, Typography Choices, Brand Color Palettes.", subcategories: ["Logo Design", "Typography Choices", "Brand Color Palettes", "Corporate Stationery"], image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1000&auto=format&fit=crop" },
    { id: 3, title: "UI/UX & Web Design", description: "Website landing pages, mobile app interfaces.", subcategories: ["Website Landing Pages", "Mobile App Interfaces", "Portfolio Designs", "Wireframing"], image: "https://images.unsplash.com/photo-1581291518062-c9a79e7df0f0?q=80&w=1000&auto=format&fit=crop" },
    { id: 4, title: "Social Media & Digital Marketing", description: "Instagram grids, ad banners, and posts.", subcategories: ["Instagram Grids", "Ad Banners", "Cohesive Social Media Posts", "Email Templates"], image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1000&auto=format&fit=crop" },
    { id: 5, title: "Print & Large Format Media", description: "Flex designs, Calendars, brochures, posters.", subcategories: ["Flex Designs", "Calendars", "Brochures", "Event Posters"], image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1000&auto=format&fit=crop" },
    { id: 6, title: "Packaging & Canvas Printing", description: "Product labels, boxes and Canvas prints.", subcategories: ["Product Labels", "Product Boxes", "Custom Canvas Prints", "3D Mockups"], image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=1000&auto=format&fit=crop" },
  ];

  const allProjects = [
    { title: "Republic Day", description: "An experimental, festive design.", tags: ["Social Media", "Festive"], link: "https://www.behance.net/gallery/227068231/Republic-Day", imageLink: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/4fbc15227068231.6839311180b2b.png", subcategory: "Cohesive Social Media Posts", category: "Personal Project" },
    { title: "Buddha Jayanti", description: "An Experimental Buddha Jayanti Post.", tags: ["Festive", "Social Media"], link: "https://www.behance.net/gallery/225648851/Buddha-Jayanti", imageLink: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/108f27225648851.68217e11dcc90.png", subcategory: "Cohesive Social Media Posts", category: "Personal Project" },
  ];

  const filteredProjects = allProjects.filter(p => p.category === selectedCategory?.title && p.subcategory === selectedSubcategory);

  const handleCloseAll = () => { setSelectedCategory(null); setSelectedSubcategory(null); setSelectedProject(null); };

  return (
    <div className="h-full w-full relative flex flex-col items-start gap-8 pb-20 px-4 md:px-10 select-none">
      <Badge variant="secondary" className="gap-1.5 py-1"><Layers className="w-4 h-4" /> My Projects</Badge>

      <div className="flex flex-col gap-3">
        <Heading>My Projects</Heading>
        <p className="font-poppins text-lg text-muted-foreground max-w-2xl">Combine creative intuition and technical skill to build your visual legacy.</p>
      </div>

      {/* CATEGORY GRID */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {categories.map((cat, index) => (
          <FramerWrapper key={cat.id} y={20} delay={index * 0.1}>
            <motion.div 
              whileHover={{ scale: 1.01 }}
              onClick={() => setSelectedCategory(cat)}
              className="group relative cursor-pointer aspect-[16/10] w-full bg-white/5 rounded-2xl overflow-hidden border border-white/20 shadow-sm"
            >
              <img src={cat.image} className={`h-full w-full object-cover transition-all duration-700 group-hover:scale-105 ${!isWindowFocused ? 'blur-2xl opacity-50' : ''}`} />
              <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent opacity-20" />
              <div className="absolute bottom-0 left-0 right-0 p-5 backdrop-blur-2xl bg-white/10 border-t border-white/20">
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.3em]">Category 0{index + 1}</span>
                <h3 className="text-xl font-bold text-slate-900 mt-0.5">{cat.title}</h3>
              </div>
            </motion.div>
          </FramerWrapper>
        ))}
      </div>

      {/* MODAL SYSTEM WITH LAYOUT ANIMATION */}
      <AnimatePresence>
        {selectedCategory && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={handleCloseAll} className="absolute inset-0 bg-white/5 backdrop-blur-md" />

            <motion.div 
              layout // CRITICAL: This enables the modal height to animate smoothly
              initial={{ scale: 0.95, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ layout: { type: "spring", stiffness: 200, damping: 25 }, opacity: { duration: 0.2 } }}
              className="relative w-full max-w-6xl max-h-[90vh] overflow-hidden rounded-[2rem] bg-white/5 border border-white/30 backdrop-blur-3xl shadow-2xl flex flex-col"
            >
              {/* STICKY NAV */}
              <div className="flex justify-between items-center p-6 bg-white/10 backdrop-blur-2xl border-b border-white/20 z-[60]">
                {selectedSubcategory ? (
                  <button onClick={() => selectedProject ? setSelectedProject(null) : setSelectedSubcategory(null)} className="flex items-center gap-2 text-slate-800 bg-white/20 px-4 py-2 rounded-xl hover:bg-white/40 transition-all text-sm font-bold border border-white/30">
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                ) : <div />}
                <button onClick={handleCloseAll} className="p-2 rounded-xl bg-white/20 hover:bg-red-500/10 text-slate-800 border border-white/30 transition-all"><X className="w-6 h-6" /></button>
              </div>

              {/* SCROLLABLE AREA */}
              <div className="overflow-y-auto flex-1 hide-scrollbar">
                <AnimatePresence mode="wait">
                  {selectedProject ? (
                    <motion.div 
                      key="project" 
                      initial={{ opacity: 0, y: 10 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      exit={{ opacity: 0, y: -10 }}
                      className="flex flex-col"
                    >
                      <div className="w-full bg-white/5 flex items-center justify-center overflow-hidden">
                        <img src={selectedProject.imageLink} className={`w-full h-auto object-contain transition-all duration-1000 ${!isWindowFocused ? 'blur-3xl scale-110' : 'scale-100'}`} />
                      </div>
                      <div className="p-8 md:p-12 space-y-6 bg-gradient-to-b from-transparent to-white/10">
                        <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                          <div className="space-y-4 flex-1">
                            <h2 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tighter">{selectedProject.title}</h2>
                            <p className="text-slate-700 text-lg leading-relaxed font-semibold">{selectedProject.description}</p>
                            <div className="flex flex-wrap gap-2">{selectedProject.tags.map((t:any) => <span key={t} className="px-4 py-1.5 bg-white/30 rounded-lg text-xs text-slate-600 border border-white/40 uppercase tracking-widest font-bold">{t}</span>)}</div>
                          </div>
                          <Link href={selectedProject.link} target="_blank" className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all hover:scale-105 flex items-center gap-3 shrink-0">Visit Project <ExternalLink className="w-4 h-4" /></Link>
                        </div>
                      </div>
                    </motion.div>
                  ) : selectedSubcategory ? (
                    <motion.div 
                      key="list" 
                      initial={{ opacity: 0, scale: 0.98 }} 
                      animate={{ opacity: 1, scale: 1 }} 
                      exit={{ opacity: 0, scale: 0.98 }}
                      className="p-6"
                    >
                      {filteredProjects.length > 0 ? (
                        <div className="columns-1 md:columns-2 gap-4 space-y-4">
                          {filteredProjects.map((proj, i) => (
                            <motion.div key={i} onClick={() => setSelectedProject(proj)} className="break-inside-avoid group bg-white/10 border border-white/20 rounded-2xl overflow-hidden cursor-pointer hover:border-blue-400 transition-all">
                              <img src={proj.imageLink} className={`w-full h-auto transition-transform duration-700 group-hover:scale-105 ${!isWindowFocused ? 'blur-xl' : ''}`} />
                              <div className="p-6 bg-white/20 backdrop-blur-2xl border-t border-white/20">
                                <h3 className="text-xl font-bold text-slate-800">{proj.title}</h3>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-20 flex flex-col items-center justify-center text-center space-y-5">
                          <Inbox className="w-12 h-12 text-slate-300" />
                          <div className="space-y-2">
                             <h3 className="text-2xl font-bold text-slate-800 tracking-tight">No {selectedSubcategory} added yet.</h3>
                             <p className="text-slate-500 font-bold max-w-xs mx-auto text-sm">Working on it! Check back later.</p>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="subs" 
                      initial={{ opacity: 0, x: 20 }} 
                      animate={{ opacity: 1, x: 0 }} 
                      exit={{ opacity: 0, x: -20 }}
                      className="p-8 md:p-12 space-y-10"
                    >
                      <h2 className="text-5xl md:text-7xl font-bold text-slate-900 tracking-tighter leading-none">{selectedCategory.title}</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedCategory.subcategories.map((sub: string) => (
                          <button key={sub} onClick={() => setSelectedSubcategory(sub)} className="flex items-center justify-between p-8 bg-white/5 border border-white/20 hover:bg-white/20 hover:border-blue-300 transition-all group rounded-2xl shadow-sm backdrop-blur-2xl">
                            <span className="text-xl font-bold text-slate-700 group-hover:text-slate-900 transition-colors">{sub}</span>
                            <ArrowLeft className="w-5 h-5 rotate-180 text-blue-500 transition-all group-hover:translate-x-1" />
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        img { transition: filter 0.8s ease-in-out, transform 0.8s ease-in-out; }
      `}</style>
    </div>
  );
};

export default ProjectPage;
