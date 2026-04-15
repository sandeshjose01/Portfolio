"use client";
import { useState, useEffect } from "react";
import FramerWrapper from "@/components/animation/FramerWrapper";
import Heading from "@/components/Heading";
import { Badge } from "@/components/ui/badge";
import { Layers, X, ArrowLeft, ExternalLink } from "lucide-react";
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
    { title: "Personal Logo", description: "A fun logo design.", tags: ["Logo", "Experimental"], link: "#", imageLink: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1000&auto=format&fit=crop", subcategory: "Logo Design", category: "Personal Project" },
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

      {/* CATEGORY GRID: FULL IMAGE COVER */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {categories.map((cat, index) => (
          <FramerWrapper key={cat.id} y={20} delay={index * 0.1}>
            <motion.div 
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedCategory(cat)}
              className="group relative cursor-pointer aspect-[4/5] w-full bg-black rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl"
            >
              <img src={cat.image} className={`h-full w-full object-cover transition-all duration-700 group-hover:scale-110 ${!isWindowFocused ? 'blur-2xl opacity-50' : ''}`} />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
              
              <div className="absolute bottom-0 left-0 right-0 p-8 backdrop-blur-md bg-white/5 border-t border-white/10">
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.3em]">Category 0{index + 1}</span>
                <h3 className="text-2xl font-bold text-white mt-1">{cat.title}</h3>
                <p className="text-sm text-white/60 line-clamp-1 mt-2">{cat.description}</p>
              </div>
            </motion.div>
          </FramerWrapper>
        ))}
      </div>

      {/* MODAL SYSTEM */}
      <AnimatePresence>
        {selectedCategory && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={handleCloseAll} className="absolute inset-0 bg-black/90 backdrop-blur-2xl" />

            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-6xl max-h-[92vh] overflow-y-auto rounded-[3.5rem] bg-white/5 border border-white/10 p-6 md:p-14 hide-scrollbar shadow-2xl"
            >
              <div className="flex justify-between items-center mb-12 sticky top-0 z-50">
                {selectedSubcategory && (
                  <motion.button initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} onClick={() => selectedProject ? setSelectedProject(null) : setSelectedSubcategory(null)} className="flex items-center gap-2 text-white bg-white/10 px-6 py-3 rounded-full hover:bg-white/20 transition-all">
                    <ArrowLeft className="w-4 h-4" /> Back
                  </motion.button>
                )}
                <div />
                <button onClick={handleCloseAll} className="p-4 rounded-full bg-white/10 hover:bg-red-500/20 text-white transition-all"><X className="w-6 h-6" /></button>
              </div>

              <AnimatePresence mode="wait">
                {selectedProject ? (
                  /* VIEW 3: FULL PROJECT PREVIEW */
                  <motion.div key="project" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col gap-10">
                    <div className="relative w-full rounded-[2.5rem] overflow-hidden border border-white/10 bg-black/40 shadow-inner">
                      <img src={selectedProject.imageLink} className={`w-full h-auto object-contain max-h-[75vh] mx-auto ${!isWindowFocused ? 'blur-3xl' : ''}`} />
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                      <div className="space-y-4 max-w-3xl">
                        <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter">{selectedProject.title}</h2>
                        <p className="text-white/60 text-xl leading-relaxed">{selectedProject.description}</p>
                        <div className="flex flex-wrap gap-2 pt-4">{selectedProject.tags.map((t:any) => <span key={t} className="px-5 py-2 bg-white/10 rounded-full text-sm text-white/80 border border-white/5">{t}</span>)}</div>
                      </div>
                      <Link href={selectedProject.link} target="_blank" className="bg-blue-600 text-white px-10 py-5 rounded-full font-bold hover:bg-blue-500 transition-all hover:scale-105 flex items-center gap-3 shrink-0 shadow-lg shadow-blue-600/20">Visit Project <ExternalLink className="w-5 h-5" /></Link>
                    </div>
                  </motion.div>
                ) : selectedSubcategory ? (
                  /* VIEW 2: MASONRY GALLERY (AUTO-ARRANGE) */
                  <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="columns-1 md:columns-2 gap-6 space-y-6">
                    {filteredProjects.map((proj, i) => (
                      <motion.div 
                        key={i} 
                        initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.1 }}
                        onClick={() => setSelectedProject(proj)} 
                        className="break-inside-avoid group bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden cursor-pointer hover:bg-white/10 transition-all shadow-lg"
                      >
                        <div className="relative overflow-hidden">
                          <img src={proj.imageLink} className={`w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105 ${!isWindowFocused ? 'blur-xl' : ''}`} />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                             <span className="text-white font-bold bg-blue-600 px-6 py-2 rounded-full">View Full Case</span>
                          </div>
                        </div>
                        <div className="p-8">
                          <h3 className="text-2xl font-bold text-white">{proj.title}</h3>
                        </div>
                      </motion.div>
                    ))}
                    {filteredProjects.length === 0 && <div className="text-white/40 text-center py-20 w-full col-span-full">No projects in this category yet.</div>}
                  </motion.div>
                ) : (
                  /* VIEW 1: SUBCATEGORY LIST */
                  <motion.div key="subs" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-10">
                    <h2 className="text-6xl md:text-8xl font-bold text-white tracking-tighter">{selectedCategory.title}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {selectedCategory.subcategories.map((sub: string) => (
                        <button key={sub} onClick={() => setSelectedSubcategory(sub)} className="flex items-center justify-between p-10 bg-white/5 border border-white/10 rounded-[2rem] hover:bg-white/10 hover:border-blue-500/50 transition-all group text-left">
                          <span className="text-2xl font-medium text-white/90 group-hover:text-white">{sub}</span>
                          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-blue-600 transition-all">
                             <ArrowLeft className="w-6 h-6 rotate-180 text-white" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        img { transition: filter 0.8s ease-in-out; }
      `}</style>
    </div>
  );
};

export default ProjectPage;
