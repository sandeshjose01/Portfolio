"use client";
import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, query, orderBy } from "firebase/firestore";
import FramerWrapper from "@/components/animation/FramerWrapper";
import Heading from "@/components/Heading";
import { Badge } from "@/components/ui/badge";
import { Layers, X, ArrowLeft, ExternalLink, Inbox } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const firebaseConfig = {
    apiKey: "AIzaSyCChQzdSuNW8EzBXtRxZyvwh4WOjj67FCs",
    authDomain: "my-portfolio-96764.firebaseapp.com",
    projectId: "my-portfolio-96764",
    storageBucket: "my-portfolio-96764.firebasestorage.app",
    messagingSenderId: "1018154031940",
    appId: "1:1018154031940:web:937edbfb442a6dfc041511"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const SOFTWARE_ICONS: Record<string, string> = {
  "Adobe Photoshop": "https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg",
  "Adobe Illustrator": "https://upload.wikimedia.org/wikipedia/commons/f/fb/Adobe_Illustrator_CC_icon.svg",
  "Adobe InDesign": "https://upload.wikimedia.org/wikipedia/commons/4/48/Adobe_InDesign_CC_icon.svg",
  "Canva": "https://upload.wikimedia.org/wikipedia/commons/0/08/Canva_icon_2021.svg",
  "Adobe Premiere Pro": "https://upload.wikimedia.org/wikipedia/commons/4/40/Adobe_Premiere_Pro_CC_icon.svg",
  "Adobe After Effects": "https://upload.wikimedia.org/wikipedia/commons/c/cb/Adobe_After_Effects_CC_icon.svg",
  "CapCut": "https://upload.wikimedia.org/wikipedia/en/2/23/CapCut_logo.png",
};

const ProjectPage = () => {
  const [projects, setProjects] = useState<any[]>([]); 
  const [loading, setLoading] = useState(true);
  const[selectedCategory, setSelectedCategory] = useState<any>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isWindowFocused, setIsWindowFocused] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const q = query(collection(db, "projects"), orderBy("order", "asc"));
        const querySnapshot = await getDocs(q);
        const items: any[] =[];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const isVideo = data.image?.match(/\.(mp4|webm|mov|ogg|m4v)$/i);
          items.push({
            id: doc.id,
            ...data,
            imageLink: data.image,   
            link: data.demoLink,     
            category: data.category,
            subCategory: data.subCategory,
            softwareUsed: data.softwareUsed ||[],
            resourceType: isVideo ? "video" : "image"
          });
        });
        setProjects(items);
      } catch (error) { console.error("Firebase Error:", error); } finally { setLoading(false); }
    };
    fetchProjects();
  },[]);

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
      window.removeEventListener("blur", handleBlur); window.removeEventListener("focus", handleFocus);
      document.removeEventListener("contextmenu", handleContextMenu); document.removeEventListener("keydown", handleKeyDown);
    };
  },[]);

  const categories = [
    { id: 1, title: "Personal Project", subcategories:["Social Media Posts", "Logo Design", "Photo Manipulation", "Conceptual Rebrands", "Speculative UI/UX (Concept Apps)", "Artistic & Experimental Design"], image: "https://github.com/sandeshjose01/Portfolio/blob/master/Personal%20Project/personal%20project.png?raw=true" },
    { id: 2, title: "Brand Identity", subcategories:["Logo Design", "Typography", "Brand Color Palettes", "Corporate Stationery", "Brand Guidelines (Style Guides)", "Iconography & Graphic Devices"], image: "https://github.com/sandeshjose01/Portfolio/blob/master/Personal%20Project/brand%20identity.png?raw=true" },
    { id: 3, title: "UI/UX Design", subcategories:["Website Landing Pages", "Mobile App Interfaces", "Portfolio Designs", "Wireframing"], image: "https://github.com/sandeshjose01/Portfolio/blob/master/Personal%20Project/ui_ux%20design.png?raw=true" },
    { id: 4, title: "Social Media Post", subcategories:["Facebook Post", "Instagram Post", "LinkedIn Post & Carousel", "Carousel Design", "Ad Banners", "Email Templates"], image: "https://github.com/sandeshjose01/Portfolio/blob/master/Personal%20Project/social%20media%20post.png?raw=true" },
    { id: 5, title: "Print Media", subcategories:["Brand Guide", "Stationery Suite", "Flex Designs", "Calendars", "Brochures", "Event Posters"], image: "https://github.com/sandeshjose01/Portfolio/blob/master/Personal%20Project/print%20media.png?raw=true" },
    { id: 6, title: "Motion", subcategories:["Brand Documentary", "Product Informational", "Micro-Storytelling"], image: "https://github.com/sandeshjose01/Portfolio/blob/master/Personal%20Project/motion.png?raw=true" },
  ];

  const filteredProjects = projects.filter(p => p.category === selectedCategory?.title && p.subCategory === selectedSubcategory);

  const handleCloseAll = () => { setSelectedCategory(null); setSelectedSubcategory(null); setSelectedProject(null); };

  return (
    <div className="h-full w-full relative flex flex-col items-start gap-8 pb-20 px-4 md:px-10 select-none">
      <Badge variant="secondary" className="gap-1.5 py-1"><Layers className="w-4 h-4" /> My Projects</Badge>

      <div className="flex flex-col gap-3">
        <Heading>My Projects</Heading>
        <p className="font-poppins text-lg text-muted-foreground max-w-2xl">Combine creative intuition and technical skill to build your visual legacy.</p>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {categories.map((cat, index) => (
          <FramerWrapper key={cat.id} y={20} delay={index * 0.1}>
            <motion.div whileHover={{ scale: 1.01 }} onClick={() => setSelectedCategory(cat)} className="group relative cursor-pointer aspect-[16/10] w-full bg-white/40 rounded-2xl overflow-hidden border border-white/60 shadow-sm">
              <img src={cat.image} className={`h-full w-full object-cover transition-all duration-700 group-hover:scale-105 ${!isWindowFocused ? 'blur-2xl opacity-50' : ''}`} alt={cat.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent opacity-40" />
              <div className="absolute bottom-0 left-0 right-0 p-5 backdrop-blur-xl bg-white/40 border-t border-white/60">
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.3em]">Category 0{index + 1}</span>
                <h3 className="text-xl font-bold text-slate-900 mt-0.5">{cat.title}</h3>
              </div>
            </motion.div>
          </FramerWrapper>
        ))}
      </div>

      <AnimatePresence>
        {selectedCategory && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={handleCloseAll} className="absolute inset-0 bg-white/40 backdrop-blur-xl" />

            <motion.div layout initial={{ scale: 0.98, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.98, opacity: 0 }} transition={{ layout: { type: "spring", stiffness: 200, damping: 25 }, opacity: { duration: 0.2 } }} className="relative w-full max-w-6xl max-h-[90vh] overflow-hidden rounded-3xl bg-white/40 border border-white/60 backdrop-blur-xl shadow-2xl flex flex-col">
              <div className="flex justify-between items-center p-6 sticky top-0 z-50 bg-white/40 backdrop-blur-xl border-b border-white/40">
                {selectedSubcategory ? (
                  <button onClick={() => selectedProject ? setSelectedProject(null) : setSelectedSubcategory(null)} className="flex items-center gap-2 text-slate-800 bg-white/60 px-4 py-2 rounded-xl hover:bg-white/90 font-bold border border-white/60 shadow-sm"><ArrowLeft className="w-4 h-4" /> Back</button>
                ) : <div />}
                <button onClick={handleCloseAll} className="p-2 rounded-xl bg-white/60 hover:bg-red-500/10 text-slate-800 border border-white/60"><X className="w-6 h-6" /></button>
              </div>

              <div className="overflow-y-auto flex-1 hide-scrollbar">
                <AnimatePresence mode="wait">
                  {selectedProject ? (
                    <motion.div key="project" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col">
                      <div className="w-full bg-white/10 flex items-center justify-center overflow-hidden">
                        {selectedProject.resourceType === "video" ? (
                             <video src={selectedProject.imageLink} controls autoPlay muted loop className={`w-full h-auto max-h-[85vh] object-contain transition-all duration-1000 ${!isWindowFocused ? 'blur-3xl' : ''}`} />
                        ) : (
                             <img src={selectedProject.imageLink} className={`w-full h-auto max-h-[85vh] object-contain transition-all duration-1000 ${!isWindowFocused ? 'blur-3xl scale-110' : 'scale-100'}`} alt={selectedProject.title} />
                        )}
                      </div>
                      <div className="p-8 md:p-12 space-y-6 bg-gradient-to-b from-transparent to-white/40">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                          <div className="space-y-6 flex-1 w-full">
                            <h2 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tighter drop-shadow-sm">{selectedProject.title}</h2>
                            
                            {/* REMOVED BULLET POINTS - NOW RENDERS AS PARAGRAPHS */}
                            <div className="text-slate-800 text-lg leading-relaxed font-medium space-y-4">
                                {Array.isArray(selectedProject.description) 
                                    ? selectedProject.description.map((line: string, i: number) => <p key={i}>{line}</p>) 
                                    : <p className="whitespace-pre-wrap">{selectedProject.description}</p>}
                            </div>

                            {selectedProject.softwareUsed && selectedProject.softwareUsed.length > 0 && (
                                <div className="space-y-3 pt-2">
                                  <h4 className="text-[10px] uppercase font-bold text-slate-500 tracking-[0.2em]">Crafted Using</h4>
                                  <div className="flex flex-wrap gap-4 items-center">
                                    {selectedProject.softwareUsed.map((soft: string) => (
                                      <div key={soft} title={soft} className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-center p-2 hover:scale-110 transition-transform">
                                        <img src={SOFTWARE_ICONS[soft]} alt={soft} className="w-full h-full object-contain" />
                                      </div>
                                    ))}
                                  </div>
                                </div>
                            )}

                            <div className="flex flex-wrap gap-2 pt-2">
                                {selectedProject.tags && selectedProject.tags.map((t:any) => <span key={t} className="px-4 py-1.5 bg-white/80 rounded-lg text-xs text-slate-600 border border-white uppercase tracking-widest font-bold shadow-sm">{t}</span>)}
                            </div>
                          </div>
                          {selectedProject.link && (
                            <Link href={selectedProject.link} target="_blank" className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 hover:scale-105 flex items-center gap-3 shrink-0 shadow-lg shadow-blue-500/20 mt-4 md:mt-0">
                                Visit Project <ExternalLink className="w-4 h-4" />
                            </Link>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ) : selectedSubcategory ? (
                    <motion.div key="list" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} className="p-6">
                      {loading ? <p className="text-center py-10">Loading projects...</p> : filteredProjects.length > 0 ? (
                        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
                          {filteredProjects.map((proj, i) => (
                            <motion.div key={i} onClick={() => setSelectedProject(proj)} className="break-inside-avoid group bg-white/40 border border-white/60 rounded-2xl overflow-hidden cursor-pointer hover:border-blue-400 transition-all shadow-sm">
                              {proj.resourceType === "video" ? <video src={proj.imageLink} muted loop className={`w-full h-auto ${!isWindowFocused ? 'blur-xl' : ''}`} /> : <img src={proj.imageLink} className={`w-full h-auto transition-transform duration-700 group-hover:scale-105 ${!isWindowFocused ? 'blur-xl' : ''}`} alt={proj.title} />}
                              <div className="p-6 bg-white/60 backdrop-blur-xl border-t border-white/60"><h3 className="text-xl font-bold text-slate-800">{proj.title}</h3></div>
                            </motion.div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-20 flex flex-col items-center justify-center text-center space-y-5">
                          <div className="w-20 h-20 bg-white/60 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white shadow-sm"><Inbox className="w-10 h-10 text-slate-400" /></div>
                          <div className="space-y-2"><h3 className="text-2xl font-bold text-slate-800 tracking-tight">No items in {selectedSubcategory} yet.</h3><p className="text-slate-500 font-bold text-sm">Working on some fresh magic! Check back later.</p></div>
                        </div>
                      )}
                    </motion.div>
                  ) : (
                    <motion.div key="subs" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-8 md:p-12 space-y-10">
                      <h2 className="text-5xl md:text-7xl font-bold text-slate-900 tracking-tighter leading-none">Explore {selectedCategory.title}</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedCategory.subcategories.map((sub: string) => (
                          <button key={sub} onClick={() => setSelectedSubcategory(sub)} className="flex items-center justify-between p-8 bg-white/40 border border-white hover:bg-white/80 hover:border-blue-300 transition-all group rounded-2xl shadow-sm backdrop-blur-xl">
                            <span className="text-xl font-bold text-slate-800 group-hover:text-slate-900 transition-colors">{sub}</span>
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
        img, video { transition: filter 0.8s ease-in-out, transform 0.8s ease-in-out; }
      `}</style>
    </div>
  );
};

export default ProjectPage;
