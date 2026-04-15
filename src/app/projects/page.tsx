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

  // SECURITY: PREVENT THEFT
  useEffect(() => {
    const handleBlur = () => setIsWindowFocused(false);
    const handleFocus = () => setIsWindowFocused(true);
    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);

    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    document.addEventListener("contextmenu", handleContextMenu);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J" || e.key === "C")) ||
        (e.metaKey && e.shiftKey && (e.key === "I" || e.key === "J" || e.key === "C")) ||
        (e.ctrlKey && e.key === "U") || (e.metaKey && e.key === "U") ||
        (e.ctrlKey && e.key === "S") || (e.metaKey && e.key === "S") ||
        (e.ctrlKey && e.key === "P") || (e.metaKey && e.key === "P")
      ) {
        e.preventDefault();
      }
      if (e.key === "PrintScreen") {
        navigator.clipboard.writeText("Screenshots are disabled.");
      }
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
    {
      id: 1,
      title: "Personal Project",
      description: "Logo Design, Photo Manipulation, Typography Choices.",
      subcategories: ["Logo Design", "Photo Manipulation", "Typography Choices", "Brand Color Palettes", "Corporate Stationery"],
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Brand Identity & Logo Design",
      description: "Logo Design, Typography Choices, Brand Color Palettes.",
      subcategories: ["Logo Design", "Typography Choices", "Brand Color Palettes", "Corporate Stationery"],
      image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "UI/UX & Web Design",
      description: "Website landing pages, mobile app interfaces.",
      subcategories: ["Website Landing Pages", "Mobile App Interfaces", "Portfolio Designs", "Wireframing"],
      image: "https://images.unsplash.com/photo-1581291518062-c9a79e7df0f0?q=80&w=1000&auto=format&fit=crop",
    },
    {
        id: 4,
        title: "Social Media & Digital Marketing",
        description: "Instagram grids, ad banners, and cohesive social media post sets.",
        subcategories: ["Instagram Grids", "Ad Banners", "Cohesive Social Media Posts", "Email Templates"],
        image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1000&auto=format&fit=crop",
      },
      {
        id: 5,
        title: "Print & Large Format Media",
        description: "Flex designs, Calendars, brochures, and event posters.",
        subcategories: ["Flex Designs", "Calendars", "Brochures", "Event Posters"],
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1000&auto=format&fit=crop",
      },
      {
        id: 6,
        title: "Packaging & Canvas Printing",
        description: "Product labels/boxes and your custom Canvas printing designs.",
        subcategories: ["Product Labels", "Product Boxes", "Custom Canvas Prints", "3D Mockups"],
        image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=1000&auto=format&fit=crop",
      },
  ];

  const allProjects = [
    {
      title: "Personal Logo Concept",
      description: "An experimental, fun logo design created as a personal challenge.",
      tags: ["Logo Design", "Personal", "Experimental"],
      link: "#",
      imageLink: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1000&auto=format&fit=crop",
      subcategory: "Logo Design",
      category: "Personal Project", 
    },
  ];

  const filteredProjects = allProjects.filter(
    (p) => p.category === selectedCategory?.title && p.subcategory === selectedSubcategory
  );

  const handleCloseAll = () => {
    setSelectedCategory(null);
    setSelectedSubcategory(null);
    setSelectedProject(null);
  };

  return (
    <div className="h-full w-full relative flex flex-col items-start gap-8 pb-20 px-4 md:px-10 select-none">
      <Badge variant="secondary" className="gap-1.5 py-1">
        <Layers className="w-4 h-4" />
        My Projects
      </Badge>

      <div className="flex flex-col gap-3">
        <Heading>My Projects</Heading>
        <p className="font-poppins text-lg w-full text-muted-foreground max-w-2xl">
          Explore my work to see how we can combine creative intuition and technical skill to build your visual legacy.
        </p>
      </div>

      {/* BACKGROUND MAIN GRID - GLASS STYLE */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
        {categories.map((cat, index) => (
          <FramerWrapper key={cat.id} y={20} delay={index * 0.1}>
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedCategory(cat)}
              className="group cursor-pointer flex flex-col w-full bg-white/5 dark:bg-white/5 backdrop-blur-md border border-white/10 rounded-[2rem] overflow-hidden hover:border-blue-500/50 transition-all duration-500 shadow-xl"
            >
              <div className="relative aspect-video w-full overflow-hidden">
                <img 
                  src={cat.image} 
                  alt={cat.title} 
                  className={`h-full w-full object-cover transition-all duration-700 group-hover:scale-110 pointer-events-none ${!isWindowFocused ? 'blur-2xl opacity-50' : ''}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
              </div>
              <div className="p-6 flex flex-col gap-2">
                <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">Category 0{index + 1}</span>
                <h3 className="text-xl font-bold text-primary transition-colors group-hover:text-blue-500">{cat.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{cat.description}</p>
              </div>
            </motion.div>
          </FramerWrapper>
        ))}
      </div>

      {/* MODAL SYSTEM */}
      <AnimatePresence>
        {selectedCategory && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={handleCloseAll}
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            />

            <motion.div 
              layoutId={`modal-${selectedCategory.id}`}
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-2xl shadow-2xl p-6 md:p-12 flex flex-col hide-scrollbar"
            >
              <div className="flex justify-between items-center mb-10 sticky top-0 z-50">
                <div className="flex gap-2">
                   {selectedSubcategory && (
                     <motion.button 
                        initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                        onClick={() => selectedProject ? setSelectedProject(null) : setSelectedSubcategory(null)} 
                        className="flex items-center gap-2 text-white/70 hover:text-white transition bg-white/10 px-5 py-2.5 rounded-full backdrop-blur-md"
                     >
                       <ArrowLeft className="w-4 h-4" /> Back
                     </motion.button>
                   )}
                </div>
                <button onClick={handleCloseAll} className="p-3 rounded-full bg-white/10 hover:bg-red-500/20 text-white transition-all"><X className="w-6 h-6" /></button>
              </div>

              <AnimatePresence mode="wait">
                {selectedProject ? (
                  <motion.div key="project" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="flex flex-col gap-8">
                    <div className="relative w-full rounded-3xl overflow-hidden border border-white/10 bg-black/40">
                      <img src={selectedProject.imageLink} className={`w-full h-auto max-h-[65vh] object-contain transition-all duration-700 ${!isWindowFocused ? 'blur-3xl' : ''}`} />
                      <div className="absolute inset-0 z-10 flex items-center justify-center opacity-5 pointer-events-none">
                        <span className="text-9xl font-bold rotate-[-30deg]">PROTECTED</span>
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                      <div className="space-y-4">
                        <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter">{selectedProject.title}</h2>
                        <p className="text-white/60 text-xl max-w-2xl leading-relaxed">{selectedProject.description}</p>
                        <div className="flex flex-wrap gap-2">{selectedProject.tags.map((t:any) => <span key={t} className="px-4 py-1.5 bg-white/10 rounded-full text-sm text-white/80">{t}</span>)}</div>
                      </div>
                      <Link href={selectedProject.link} target="_blank" className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold hover:bg-blue-500 transition-all hover:scale-105 flex items-center gap-2 shrink-0">Visit Project <ExternalLink className="w-5 h-5" /></Link>
                    </div>
                  </motion.div>
                ) : selectedSubcategory ? (
                  <motion.div key="list" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredProjects.map((proj, i) => (
                      <div key={i} onClick={() => setSelectedProject(proj)} className="group bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden cursor-pointer hover:bg-white/10 transition-all">
                        <div className="relative aspect-video overflow-hidden">
                           <img src={proj.imageLink} className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${!isWindowFocused ? 'blur-xl' : ''}`} />
                        </div>
                        <div className="p-6"><h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">{proj.title}</h3></div>
                      </div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div key="subs" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="space-y-8">
                    <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter">{selectedCategory.title}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedCategory.subcategories.map((sub: string) => (
                        <button key={sub} onClick={() => setSelectedSubcategory(sub)} className="flex items-center gap-4 p-8 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 hover:scale-[1.02] transition-all text-left text-white group">
                          <div className="w-3 h-3 rounded-full bg-blue-500 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.8)] transition-all" />
                          <span className="text-xl font-medium">{sub}</span>
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
        img { transition: filter 0.6s cubic-bezier(0.4, 0, 0.2, 1); }
      `}</style>
    </div>
  );
};

export default ProjectPage;
