"use client";
import { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase"; // IMPORTED FROM LIB
import FramerWrapper from "@/components/animation/FramerWrapper";
import Heading from "@/components/Heading";
import { Badge } from "@/components/ui/badge";
import { Layers, X, ArrowLeft, ExternalLink, Inbox, Github, Youtube, Linkedin, Facebook, Instagram, Link as LinkIcon, Dribbble, Figma, Twitch, Gitlab, Codepen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// Custom SVG Icons
const TikTokIcon = () => <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>;
const BehanceIcon = () => <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.806l.041.629h-8c.073 2.283 1.061 3.3 2.717 3.3 1.206 0 2.11-.481 2.59-1.06l1.824 1.082v-.162zm-5.442-4.633c-.084-1.154-1.109-1.84-2.127-1.811-1.284.052-1.922.911-2.119 1.811h4.246zM11.82 10.34C11 8.995 9.5 8 7.414 8H0v12h7.336c2.626 0 4.646-1.115 4.646-3.765 0-2.138-1.583-3.411-3.238-3.851 1.082-.26 2.476-1.134 2.476-3.336zm-1.576 2.185c0 1.284-1.055 1.737-2.322 1.737H2.822v-3.32h4.544c1.284 0 2.322.473 2.322 1.634v-.051zm.557 5.02c0 1.437-1.144 2.052-2.776 2.052H2.822v-3.784h4.896c1.543 0 2.677.615 2.677 2.083v-.351z"/></svg>;

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
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<any>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const q = query(collection(db, "projects"), orderBy("order", "asc"));
        const querySnapshot = await getDocs(q);
        const items: any[] = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          imageLink: doc.data().image,
          link: doc.data().demoLink,
          resourceType: doc.data().image?.match(/\.(mp4|webm|mov)$/i) ? "video" : "image"
        }));
        setProjects(items);
      } catch (error) { console.error(error); } finally { setLoading(false); }
    };
    fetchProjects();
  }, []);

  const renderSmartButtons = (proj: any) => {
    const detected = (proj.smartLinks || []).map((url: string) => {
      const u = url.toLowerCase();
      if (u.includes('github.com')) return { url, label: "Visit GitHub", color: "bg-black", icon: <Github size={16}/> };
      if (u.includes('behance.net')) return { url, label: "Visit Behance", color: "bg-blue-600", icon: <BehanceIcon /> };
      if (u.includes('youtube.com')) return { url, label: "Watch YouTube", color: "bg-red-600", icon: <Youtube size={16}/> };
      return { url, label: "Visit Link", color: "bg-slate-700", icon: <LinkIcon size={16}/> };
    });

    return (
      <div className="flex flex-wrap gap-3">
        {proj.link && (
          <Link href={proj.link} target="_blank" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2">
            Visit Project <ExternalLink size={16} />
          </Link>
        )}
        {detected.map((btn: any, i: number) => (
          <Link key={i} href={btn.url} target="_blank" className={`${btn.color} text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2`}>
            {btn.icon} {btn.label}
          </Link>
        ))}
      </div>
    );
  };

  return (
    <div className="p-10 space-y-10">
      <Heading>My Projects</Heading>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Category Mapping Logic... */}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/50 backdrop-blur-xl">
             <div className="bg-white/10 p-10 rounded-[3rem] max-w-4xl w-full overflow-y-auto max-h-[90vh]">
                <button onClick={() => setSelectedProject(null)} className="float-right"><X /></button>
                <h2 className="text-4xl font-bold text-white mb-6">{selectedProject.title}</h2>
                
                {/* PARAGRAPH FORMATTING DISPLAY */}
                <div className="text-white/80 space-y-4 mb-8">
                   {Array.isArray(selectedProject.description) 
                     ? selectedProject.description.map((p: string, i: number) => <p key={i}>{p}</p>)
                     : <p>{selectedProject.description}</p>
                   }
                </div>

                {renderSmartButtons(selectedProject)}
             </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectPage;
