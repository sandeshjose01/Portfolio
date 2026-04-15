"use client";
import { useState } from "react";
import FramerWrapper from "@/components/animation/FramerWrapper";
import Heading from "@/components/Heading";
import { Badge } from "@/components/ui/badge";
import { Layers, X, ArrowRight, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCards from "@/components/ProjectCard"; // <-- UPDATE THIS PATH IF NEEDED

const ProjectPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);

  // 1. YOUR CATEGORIES (No changes here)
  const categories = [
    {
      id: 1,
      title: "Brand Identity & Logo Design",
      description: "Logo Design, Typography Choices, Brand Color Palettes, Corporate Stationery.",
      subcategories: ["Logo Design", "Typography Choices", "Brand Color Palettes", "Corporate Stationery"],
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "UI/UX & Web Design",
      description: "Website landing pages, mobile app interfaces, and Portfolio designs.",
      subcategories: ["Website Landing Pages", "Mobile App Interfaces", "Portfolio Designs", "Wireframing"],
      image: "https://images.unsplash.com/photo-1581291518062-c9a79e7df0f0?q=80&w=1000&auto=format&fit=crop",
    },
    // ... I kept the first two for brevity, add the rest of your 6 categories back here
  ];

  // 2. MOCK PROJECTS DATABASE
  // Notice the 'subcategory' property matches the strings in the categories array above!
  const allProjects = [
    {
      title: "TechFlow Branding",
      description: "A complete modern logo and brand identity package for a rising SaaS startup.",
      tags: ["Logo Design", "Illustrator", "Branding"],
      link: "https://yourlink.com",
      imageLink: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1000&auto=format&fit=crop",
      subcategory: "Logo Design", // Maps to the subcategory
    },
    {
      title: "EcoStore Landing Page",
      description: "High-conversion landing page designed for an eco-friendly e-commerce brand.",
      tags: ["Nextjs", "Shadcn Ui", "Typescript", "Figma"],
      link: "https://yourlink.com",
      imageLink: "https://images.unsplash.com/photo-1581291518062-c9a79e7df0f0?q=80&w=1000&auto=format&fit=crop",
      subcategory: "Website Landing Pages", 
    },
    {
      title: "Finance App Interface",
      description: "Clean and accessible mobile app interface for a personal finance tracker.",
      tags: ["UI/UX", "Personal", "Figma"],
      link: "https://yourlink.com",
      imageLink: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1000&auto=format&fit=crop",
      subcategory: "Mobile App Interfaces", 
    }
  ];

  // Filter projects based on what the user clicked
  const filteredProjects = allProjects.filter((p) => p.subcategory === selectedSubcategory);

  // Handle clicking a subcategory from the modal
  const handleSubcategoryClick = (subcategory: string) => {
    setSelectedCategory(null); // Close the modal
    setSelectedSubcategory(subcategory); // Show the projects
  };

  return (
    <div className="h-full w-full relative flex flex-col items-start gap-8 pb-20 px-4 md:px-10">
      <Badge variant="secondary" className="gap-1.5 py-1">
        <Layers className="w-4 h-4" />
        My Projects
      </Badge>

      {/* HEADER TEXT */}
      <div className="flex flex-col gap-3">
        <Heading>{selectedSubcategory ? selectedSubcategory : "Creative Portfolio"}</Heading>
        <p className="font-poppins text-lg w-full text-muted-foreground max-w-2xl">
          {selectedSubcategory 
            ? `Viewing all projects related to ${selectedSubcategory}.` 
            : "A curated collection of my design work. Select a category to explore sub-categories."}
        </p>
      </div>

      {/* --- CONDITIONAL RENDERING --- */}
      {selectedSubcategory ? (
        
        // VIEW A: SHOW INDIVIDUAL PROJECTS 
        <div className="w-full flex flex-col gap-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {/* Back Button */}
          <button 
            onClick={() => setSelectedSubcategory(null)}
            className="flex items-center gap-2 text-primary hover:text-blue-600 transition-colors font-medium w-fit group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Categories
          </button>

          {/* Render ProjectCards */}
          {filteredProjects.length > 0 ? (
            <div className="flex flex-wrap gap-x-4 gap-y-8 w-full">
              {filteredProjects.map((project, index) => (
                <ProjectCards key={index} value={project} num={index} />
              ))}
            </div>
          ) : (
            <div className="p-8 border-2 border-dashed rounded-xl flex items-center justify-center text-muted-foreground">
              No projects uploaded for "{selectedSubcategory}" yet.
            </div>
          )}
        </div>

      ) : (

        // VIEW B: SHOW CATEGORIES GRID (Your original UI)
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 mt-4">
          {categories.map((cat, index) => (
            <FramerWrapper key={cat.id} y={20} delay={index * 0.1}>
              <div 
                onClick={() => setSelectedCategory(cat)}
                className="group cursor-pointer flex flex-col w-full"
              >
                <div className="relative aspect-video w-full overflow-hidden border border-gray-200 dark:border-gray-800">
                  <img 
                    src={cat.image} 
                    alt={cat.title} 
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="pt-4 flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                     <span className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em]">Category {index + 1}</span>
                  </div>
                  <h3 className="text-xl font-bold text-primary group-hover:text-blue-600 transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-1">{cat.description}</p>
                </div>
              </div>
            </FramerWrapper>
          ))}
        </div>
      )}

      {/* GLASSMORPHISM POPUP MODAL */}
      <AnimatePresence>
        {selectedCategory && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCategory(null)}
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-white/10 dark:bg-black/30 backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-2xl p-8 md:p-12"
            >
              <button 
                onClick={() => setSelectedCategory(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex flex-col gap-8">
                <div className="space-y-3">
                  <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight">
                    {selectedCategory.title}
                  </h2>
                  <p className="text-blue-300 font-semibold tracking-wide uppercase text-xs">Explore Sub-categories</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedCategory.subcategories.map((sub: string, i: number) => (
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      key={i} 
                      onClick={() => handleSubcategoryClick(sub)} // <-- ADDED CLICK HANDLER HERE
                      className="flex items-center gap-4 p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/20 hover:scale-[1.02] cursor-pointer transition-all text-white"
                    >
                      <div className="h-2 w-2 bg-blue-400 rounded-full shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
                      <span className="font-poppins text-base md:text-lg">{sub}</span>
                    </motion.div>
                  ))}
                </div>

                <button 
                   onClick={() => setSelectedCategory(null)}
                   className="mt-4 flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm group w-fit"
                >
                  <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
                  Close and go back to projects
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectPage;
