"use client";
import { useState } from "react";
import FramerWrapper from "@/components/animation/FramerWrapper";
import Heading from "@/components/Heading";
import { Badge } from "@/components/ui/badge";
import { Layers, X, ArrowRight, ArrowLeft, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const ProjectPage = () => {
  // Modal Navigation State
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<any>(null);

  // 1. ALL 6 CATEGORIES
  const categories = [
    {
      id: 1,
      title: "Personal Project",
      description: "Logo Design, Typography Choices, Brand Color Palettes, Corporate Stationery.",
      subcategories: ["Logo Design", "Typography Choices", "Brand Color Palettes", "Corporate Stationery"],
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Brand Identity & Logo Design",
      description: "Logo Design, Typography Choices, Brand Color Palettes, Corporate Stationery.",
      subcategories: ["Logo Design", "Typography Choices", "Brand Color Palettes", "Corporate Stationery"],
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "UI/UX & Web Design",
      description: "Website landing pages, mobile app interfaces, and Portfolio designs.",
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
    }
  ];

  // 2. YOUR ACTUAL PROJECTS DATA
  const allProjects = [
    {
      title: "TechFlow Branding",
      description: "A complete modern logo and brand identity package for a rising SaaS startup. This project includes corporate stationery, color palettes, and typography rules to maintain consistency across all platforms.",
      tags: ["Logo Design", "Illustrator", "Branding"],
      link: "https://yourlink.com",
      imageLink: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1000&auto=format&fit=crop",
      subcategory: "Logo Design", 
    },
    {
      title: "EcoStore Landing Page",
      description: "High-conversion landing page designed for an eco-friendly e-commerce brand. It features seamless UI transitions and accessible color contrast to maximize user retention.",
      tags: ["UI/UX", "Figma", "Web Design"],
      link: "https://yourlink.com",
      imageLink: "https://images.unsplash.com/photo-1581291518062-c9a79e7df0f0?q=80&w=1000&auto=format&fit=crop",
      subcategory: "Website Landing Pages", 
    }
  ];

  const filteredProjects = allProjects.filter((p) => p.subcategory === selectedSubcategory);

  // Navigation Handlers
  const handleCloseAll = () => {
    setSelectedCategory(null);
    setSelectedSubcategory(null);
    setSelectedProject(null);
  };

  const handleBackToSubcategories = () => {
    setSelectedSubcategory(null);
    setSelectedProject(null);
  };

  const handleBackToProjectsList = () => {
    setSelectedProject(null);
  };

  return (
    <div className="h-full w-full relative flex flex-col items-start gap-8 pb-20 px-4 md:px-10">
      <Badge variant="secondary" className="gap-1.5 py-1">
        <Layers className="w-4 h-4" />
        My Projects
      </Badge>

      <div className="flex flex-col gap-3">
        <Heading>Creative Portfolio</Heading>
        <p className="font-poppins text-lg w-full text-muted-foreground max-w-2xl">
          A curated collection of my design work. Select a category to explore sub-categories.
        </p>
      </div>

      {/* BACKGROUND MAIN GRID */}
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

      {/* GLASSMORPHISM POPUP MODAL (Handles all 3 views) */}
      <AnimatePresence>
        {selectedCategory && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Dark Overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseAll}
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
            />

            {/* Glass Modal Container */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white/10 dark:bg-black/30 backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-2xl p-6 md:p-10 flex flex-col hide-scrollbar"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} // Hide scrollbar for clean glass look
            >
              {/* Top Navigation Bar inside Modal */}
              <div className="flex justify-between items-center mb-8 sticky top-0 z-10">
                {selectedProject ? (
                  <button onClick={handleBackToProjectsList} className="flex items-center gap-2 text-white/70 hover:text-white transition bg-black/20 px-4 py-2 rounded-full backdrop-blur-md">
                    <ArrowLeft className="w-4 h-4" /> Back to Projects
                  </button>
                ) : selectedSubcategory ? (
                  <button onClick={handleBackToSubcategories} className="flex items-center gap-2 text-white/70 hover:text-white transition bg-black/20 px-4 py-2 rounded-full backdrop-blur-md">
                    <ArrowLeft className="w-4 h-4" /> Back to Subcategories
                  </button>
                ) : (
                  <div /> // Empty div to keep X button on the right
                )}

                <button 
                  onClick={handleCloseAll}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors backdrop-blur-md"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* DYNAMIC MODAL CONTENT */}

              {/* VIEW 3: FULL PROJECT DETAILS */}
              {selectedProject ? (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} 
                  className="flex flex-col gap-6 text-white"
                >
                  {/* Protected Image Area */}
                  <div 
                    className="relative w-full rounded-2xl overflow-hidden border border-white/20 shadow-2xl group select-none pointer-events-none"
                    onContextMenu={(e) => e.preventDefault()} // Disables Right Click
                  >
                    {/* Watermark Overlay (Optional, makes stealing harder) */}
                    <div className="absolute inset-0 z-10 flex items-center justify-center opacity-10 mix-blend-overlay pointer-events-none">
                       <span className="text-4xl md:text-6xl font-bold rotate-[-30deg] tracking-widest uppercase">Protected</span>
                    </div>

                    <img 
                      src={selectedProject.imageLink} 
                      alt={selectedProject.title} 
                      className="w-full h-auto max-h-[60vh] object-contain bg-black/50 pointer-events-none"
                      draggable="false" // Disables Dragging image to desktop
                    />
                  </div>

                  <div className="flex flex-col md:flex-row justify-between items-start gap-6 mt-4">
                    <div className="space-y-4 flex-1">
                      <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                        {selectedProject.title}
                      </h2>
                      <p className="text-white/70 text-lg leading-relaxed max-w-2xl">
                        {selectedProject.description}
                      </p>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {selectedProject.tags.map((tag: string, i: number) => (
                          <span key={i} className="px-3 py-1 text-sm bg-white/10 border border-white/20 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Link 
                      href={selectedProject.link} 
                      target="_blank" 
                      className="shrink-0 flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-full font-medium transition-all hover:scale-105 shadow-[0_0_15px_rgba(37,99,235,0.5)] pointer-events-auto"
                    >
                      Visit Project <ExternalLink className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>

              // VIEW 2: LIST OF PROJECTS FOR SUBCATEGORY
              ) : selectedSubcategory ? (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} 
                  className="flex flex-col gap-6"
                >
                  <div className="space-y-2 mb-4">
                    <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight">
                      {selectedSubcategory}
                    </h2>
                    <p className="text-blue-300 font-medium text-sm">Select a project to view details</p>
                  </div>

                  {filteredProjects.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {filteredProjects.map((project, index) => (
                        <div 
                          key={index}
                          onClick={() => setSelectedProject(project)}
                          className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer flex flex-col"
                        >
                          <div 
                            className="relative h-48 w-full overflow-hidden select-none"
                            onContextMenu={(e) => e.preventDefault()}
                          >
                            <img 
                              src={project.imageLink} 
                              alt={project.title}
                              draggable="false"
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 pointer-events-none"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                          </div>
                          <div className="p-5 flex flex-col gap-2">
                            <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{project.title}</h3>
                            <p className="text-sm text-white/60 line-clamp-2">{project.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-12 border border-dashed border-white/20 rounded-2xl flex items-center justify-center text-white/50 bg-black/20">
                      No projects uploaded for "{selectedSubcategory}" yet.
                    </div>
                  )}
                </motion.div>

              // VIEW 1: LIST OF SUBCATEGORIES
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} 
                  className="flex flex-col gap-8"
                >
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
                        onClick={() => setSelectedSubcategory(sub)}
                        className="flex items-center gap-4 p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/20 hover:scale-[1.02] cursor-pointer transition-all text-white shadow-lg"
                      >
                        <div className="h-2 w-2 bg-blue-400 rounded-full shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
                        <span className="font-poppins text-base md:text-lg">{sub}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectPage;
