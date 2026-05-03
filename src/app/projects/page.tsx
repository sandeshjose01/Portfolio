"use client";
import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase"; 
import FramerWrapper from "@/components/animation/FramerWrapper";
import Heading from "@/components/Heading";
import { Badge } from "@/components/ui/badge";
import { Layers, X, ArrowLeft, ExternalLink, Inbox, Github, Youtube, Linkedin, Facebook, Instagram, Link as LinkIcon, Dribbble, Figma, Twitch, Gitlab, Codepen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// ==========================================================
// SECTION 1: ICONS & BRANDING (Edit Icons here)
// ==========================================================

// Official ArtStation Icon
const ArtStationIcon = () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.554 16.486l6.757-11.703 3.96 6.858H1.554zm14.856-15.333l-5.112 8.854-1.711-2.964 5.112-8.854h3.424zM14.043 15.65H6.26l9.789-16.953h3.425L9.688 15.65h4.355z"/>
    </svg>
);

// Official Behance Icon
const BehanceIcon = () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 7h-7v-2h7v2zm-5.462 6.074c.054-1.103.522-2.148 1.55-2.148 1.279 0 1.634 1.157 1.634 2.148h-3.184zm3.184 1.564c-.033 1.25-.668 2.221-1.767 2.221-1.12 0-1.635-1.045-1.666-2.221h3.433zm-4.135 1.564c-.114 2.875 1.954 4.548 4.417 4.548 2.392 0 3.966-1.574 4.14-3.708l-2.008-.04c-.08 1.134-1.01 1.96-2.132 1.96-1.258 0-1.92-1.016-2.127-2.76h6.266c.154-3.666-1.189-6.074-4.246-6.074-2.873 0-4.31 2.235-4.31 6.074zM0 8h7.414c2.086 0 3.586.995 4.406 2.34-1.654.202-3.238 1.472-3.238 3.851 1.655.44 2.476 1.713 2.476 3.851 0 2.65-2.02 3.765-4.646 3.765H0V8zm2.822 3.32v3.32h4.544c1.267 0 2.322-.453 2.322-1.737s-1.055-1.585-2.322-1.583H2.822zm0 5.46v3.784h4.896c1.632 0 2.776-.615 2.776-2.052 0-1.468-1.134-2.083-2.677-2.083H2.822z"/>
    </svg>
);

const TikTokIcon = () => <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>;
const PinterestIcon = () => <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.951-7.252 4.168 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.367 18.592 0 12.017 0z"/></svg>;

const SOFTWARE_ICONS: Record<string, string> = {
  "Adobe Photoshop": "https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg",
  "Adobe Illustrator": "https://upload.wikimedia.org/wikipedia/commons/f/fb/Adobe_Illustrator_CC_icon.svg",
  "Adobe InDesign": "https://upload.wikimedia.org/wikipedia/commons/4/48/Adobe_InDesign_CC_icon.svg",
  "Canva": "https://upload.wikimedia.org/wikipedia/commons/0/08/Canva_icon_2021.svg",
  "Adobe Premiere Pro": "https://upload.wikimedia.org/wikipedia/commons/4/40/Adobe_Premiere_Pro_CC_icon.svg",
  "Adobe After Effects": "https://upload.wikimedia.org/wikipedia/commons/c/cb/Adobe_After_Effects_CC_icon.svg",
  "CapCut": "https://upload.wikimedia.org/wikipedia/en/2/23/CapCut_logo.png",
};

// ==========================================================
// SECTION 2: STATIC DEFINITIONS
// ==========================================================

const categories = [
  { id: 1, title: "Personal Project", subcategories: ["Social Media Posts", "Logo Design", "Photo Manipulation", "Conceptual Rebrands", "Speculative UI/UX (Concept Apps)", "Artistic & Experimental Design"], image: "https://github.com/sandeshjose01/Portfolio/blob/master/Personal%20Project/personal%20project.png?raw=true" },
  { id: 2, title: "Brand Identity", subcategories: ["Logo Design", "Typography", "Brand Color Palettes", "Corporate Stationery", "Brand Guidelines (Style Guides)", "Iconography & Graphic Devices"], image: "https://github.com/sandeshjose01/Portfolio/blob/master/Personal%20Project/brand%20identity.png?raw=true" },
  { id: 3, title: "UI/UX Design", subcategories: ["Website Landing Pages", "Mobile App Interfaces", "Portfolio Designs", "Wireframing"], image: "https://github.com/sandeshjose01/Portfolio/blob/master/Personal%20Project/ui_ux%20design.png?raw=true" },
  { id: 4, title: "Social Media Post", subcategories: ["Facebook Post", "Instagram Post", "LinkedIn Post & Carousel", "Carousel Design", "Ad Banners", "Email Templates"], image: "https://github.com/sandeshjose01/Portfolio/blob/master/Personal%20Project/social%20media%20post.png?raw=true" },
  { id: 5, title: "Print Media", subcategories: ["Brand Guide", "Stationery Suite", "Flex Designs", "Calendars", "Brochures", "Event Posters"], image: "https://github.com/sandeshjose01/Portfolio/blob/master/Personal%20Project/print%20media.png?raw=true" },
  { id: 6, title: "Motion", subcategories: ["Brand Documentary", "Product Informational", "Micro-Storytelling"], image: "https://github.com/sandeshjose01/Portfolio/blob/master/Personal%20Project/motion.png?raw=true" },
];

// ==========================================================
// SECTION 3: COMPONENT LOGIC (State & Sync)
// ==========================================================

const ProjectPage = () => {
  const [projects, setProjects] = useState<any[]>([]); 
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<any>(null);

  useEffect(() => {
    // text: Caching Logic for 0ms delay
    const cached = localStorage.getItem("sj_projects_cache");
    if (cached) setProjects(JSON.parse(cached));

    // text: Real-time listener for instant Admin updates
    const q = query(collection(db, "projects"), orderBy("order", "asc"));
    const unsub = onSnapshot(q, (snap) => {
        const items = snap.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            imageLink: doc.data().image,
            link: doc.data().demoLink,
            resourceType: doc.data().image?.match(/\.(mp4|webm|mov|m4v)$/i) ? "video" : "image"
        }));
        setProjects(items);
        setLoading(false);
        localStorage.setItem("sj_projects_cache", JSON.stringify(items));
    });
    return () => unsub();
  }, []);

  const handleCloseAll = () => { setSelectedCategory(null); setSelectedSubcategory(null); setSelectedProject(null); };

  // ==========================================================
  // SECTION 4: SMART LINK ENGINE (Fixed Recognition)
  // ==========================================================

  const renderSmartButtons = (proj: any) => {
    const detectedButtons = (proj.smartLinks || []).filter((u: string) => u.trim() !== "").map((url: string) => {
      const u = url.toLowerCase();
      
      // text: Fixed recognition keywords for Facebook and Behance
      if (u.includes('behance')) return { url, label: "Visit Behance", color: "bg-[#1769ff] text-white", icon: <BehanceIcon /> };
      if (u.includes('facebook') || u.includes('fb.com')) return { url, label: "Visit Facebook", color: "bg-[#1877F2] text-white", icon: <Facebook className="w-4 h-4" /> };
      if (u.includes('artstation')) return { url, label: "Visit ArtStation", color: "bg-[#13aff0] text-white", icon: <ArtStationIcon /> };
      if (u.includes('pinterest') || u.includes('pin.it')) return { url, label: "Visit Pinterest", color: "bg-[#E60023] text-white", icon: <PinterestIcon /> };
      
      if (u.includes('github')) return { url, label: "Visit GitHub", color: "bg-black text-white", icon: <Github className="w-4 h-4" /> };
      if (u.includes('youtube') || u.includes('youtu.be')) return { url, label: "Watch on YouTube", color: "bg-[#FF0000] text-white", icon: <Youtube className="w-4 h-4" /> };
      if (u.includes('linkedin')) return { url, label: "Visit LinkedIn", color: "bg-[#0A66C2] text-white", icon: <Linkedin className="w-4 h-4" /> };
      if (u.includes('instagram')) return { url, label: "Visit Instagram", color: "bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCB045] text-white", icon: <Instagram className="w-4 h-4" /> };
      if (u.includes('tiktok')) return { url, label: "Visit TikTok", color: "bg-black text-white", icon: <TikTokIcon /> };
      
      return { url, label: "Visit Link", color: "bg-slate-700 text-white", icon: <LinkIcon className="w-4 h-4" /> };
    });

    return (
      <div className="flex flex-wrap gap-3 mt-4 md:mt-0 items-center justify-start md:justify-end">
        {proj.link && (
          <Link href={proj.link} target="_blank" className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold transition-all hover:scale-105 flex items-center gap-3 shrink-0 shadow-lg shadow-blue-500/20">
            Visit Project <ExternalLink className="w-4 h-4" />
          </Link>
        )}
        {detectedButtons.map((btn: any, i: number) => (
          <Link key={i} href={btn.url} target="_blank" className={`${btn.color} px-6 py-3 rounded-xl font-bold transition-all hover:scale-105 flex items-center gap-2 shrink-0 shadow-lg shadow-black/10`}>
            {btn.icon} {btn.label}
          </Link>
        ))}
      </div>
    );
  };

  // ==========================================================
  // SECTION 5: UI RENDER
  // ==========================================================

  const filteredProjects = projects.filter(p => 
    p.category === selectedCategory?.title && p.subCategory === selectedSubcategory
  );

  return (
    <div className="h-full w-full relative flex flex-col items-start gap-8 pb-20 px-4 md:px-10 select-none">
      <Badge variant="secondary" className="gap-1.5 py-1"><Layers className="w-4 h-4" /> My Projects</Badge>
      <div className="flex flex-col gap-3"><Heading>My Projects</Heading><p className="font-poppins text-lg text-muted-foreground max-w-2xl">Combine creative intuition and technical skill to build your visual legacy.</p></div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {categories.map((cat, index) => (
          <FramerWrapper key={cat.id} y={20} delay={index * 0.1}>
            <motion.div whileHover={{ scale: 1.01 }} onClick={() => setSelectedCategory(cat)} className="group relative cursor-pointer aspect-[16/10] w-full bg-white/40 rounded-2xl overflow-hidden border border-white/60 shadow-sm">
              <img src={cat.image} className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105" alt={cat.title} />
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
            <motion.div layout initial={{ scale: 0.98, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.98, opacity: 0 }} className="relative w-full max-w-6xl max-h-[90vh] overflow-hidden rounded-3xl bg-white/40 border border-white/60 backdrop-blur-xl shadow-2xl flex flex-col">
              <div className="flex justify-between items-center p-6 sticky top-0 z-50 bg-white/40 backdrop-blur-xl border-b border-white/40">
                {selectedSubcategory ? (
                  <button onClick={() => selectedProject ? setSelectedProject(null) : setSelectedSubcategory(null)} className="flex items-center gap-2 text-slate-800 bg-white/60 px-4 py-2 rounded-xl hover:bg-white/90 transition-all font-bold border border-white/60 shadow-sm"><ArrowLeft className="w-4 h-4" /> Back</button>
                ) : <div />}
                <button onClick={handleCloseAll} className="p-2 rounded-xl bg-white/60 hover:bg-red-500/10 text-slate-800 border border-white/60 transition-all"><X className="w-6 h-6" /></button>
              </div>

              <div className="overflow-y-auto flex-1 hide-scrollbar">
                <AnimatePresence mode="wait">
                  {selectedProject ? (
                    <motion.div key="project" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col">
                      <div className="w-full bg-white/10 flex items-center justify-center overflow-hidden">
                        {selectedProject.resourceType === "video" ? (
                             <video src={selectedProject.imageLink} controls autoPlay muted loop className="w-full h-auto max-h-[85vh] object-contain" />
                        ) : (
                             <img src={selectedProject.imageLink} className="w-full h-auto max-h-[85vh] object-contain" alt={selectedProject.title} />
                        )}
                      </div>
                      <div className="p-8 md:p-12 space-y-6 bg-gradient-to-b from-transparent to-white/40">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                          <div className="space-y-6 flex-1 w-full">
                            <h2 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tighter drop-shadow-sm">{selectedProject.title}</h2>
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
                          {renderSmartButtons(selectedProject)}
                        </div>
                      </div>
                    </motion.div>
                  ) : selectedSubcategory ? (
                    <motion.div key="list" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} className="p-6">
                      {filteredProjects.length > 0 ? (
                        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
                          {filteredProjects.map((proj, i) => (
                            <motion.div key={i} onClick={() => setSelectedProject(proj)} className="break-inside-avoid group bg-white/40 border border-white/60 rounded-2xl overflow-hidden cursor-pointer hover:border-blue-400 transition-all shadow-sm">
                              {proj.resourceType === "video" ? <video src={proj.imageLink} muted loop className="w-full h-auto" /> : <img src={proj.imageLink} className="w-full h-auto transition-transform duration-700 group-hover:scale-105" alt={proj.title} />}
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
      `}</style>
    </div>
  );
};

export default ProjectPage;
