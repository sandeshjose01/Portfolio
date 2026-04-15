import Heading from "@/components/Heading";
import { Badge } from "@/components/ui/badge";
import { Layers, ArrowRight } from "lucide-react";
import FramerWrapper from "@/components/animation/FramerWrapper";
import Link from "next/link";

const ProjectPage = () => {
  const categories = [
    {
      title: "Visual Identity Design",
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1000&auto=format&fit=crop",
      subcategories: ["Logo Design", "Color Systems", "Typography", "Iconography", "Brand Style Guides", "Corporate Stationery"],
    },
    {
      title: "Marketing & Advertising Design",
      image: "https://images.unsplash.com/photo-1557838923-2985c318be48?q=80&w=1000&auto=format&fit=crop",
      subcategories: ["Social Media Graphics", "Print Collateral", "Large-Format Design", "Digital Advertising", "Presentation Design"],
    },
    {
      title: "UI & Digital Design",
      image: "https://images.unsplash.com/photo-1581291518062-c9a79e7df0f0?q=80&w=1000&auto=format&fit=crop",
      subcategories: ["Webpage Design", "App Design", "Wireframing", "Game Interfaces", "Interactive Prototyping"],
    },
    {
      title: "Publication Design",
      image: "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?q=80&w=1000&auto=format&fit=crop",
      subcategories: ["Magazines", "Book Covers", "Annual Reports", "Newsletters", "Catalogs & Brochures"],
    },
    {
      title: "Packaging Design",
      image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=1000&auto=format&fit=crop",
      subcategories: ["Label & Sticker", "Container Design", "Inner Packaging", "Outer Packaging", "Mockups"],
    },
    {
      title: "Motion Graphics",
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop",
      subcategories: ["Video Editing", "2D Animation", "Explainer Videos", "Title Sequences", "Social Media Motion"],
    }
  ];

  return (
    <div className="h-full w-full relative flex flex-col items-start gap-8 pb-20 px-4 md:px-10">
      <Badge variant="secondary" className="gap-1.5 py-1">
        <Layers className="w-4 h-4" />
        Projects
      </Badge>

      <div className="flex flex-col gap-3">
        <Heading>My Creative Portfolio.</Heading>
        <p className="font-poppins text-lg w-full text-muted-foreground max-w-2xl">
          Click on a category to explore specialized design projects.
        </p>
      </div>

      {/* THE BIG GALLERY GRID */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {categories.map((cat, index) => (
          <FramerWrapper 
            key={index} 
            y={50} 
            delay={index * 0.1}
            className="group"
          >
            <Link href={`/projects/${cat.title.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`} className="block h-full">
              <div className="relative h-[450px] w-full overflow-hidden rounded-[2rem] shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                
                {/* BACKGROUND IMAGE */}
                <img 
                  src={cat.image} 
                  alt={cat.title} 
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* DARK GRADIENT OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                {/* CONTENT AREA */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end gap-4">
                  <div className="flex justify-between items-end">
                    <h2 className="text-3xl font-bold text-white leading-tight max-w-[80%]">
                      {cat.title}
                    </h2>
                    <div className="bg-white/20 backdrop-blur-md p-2 rounded-full border border-white/30 text-white mb-2">
                      <ArrowRight className="w-6 h-6" />
                    </div>
                  </div>

                  {/* SUB-CATEGORIES TAGS */}
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-white/20">
                    {cat.subcategories.slice(0, 4).map((sub, i) => (
                      <span 
                        key={i} 
                        className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-white/10 backdrop-blur-md rounded-lg text-white/90 border border-white/10"
                      >
                        {sub}
                      </span>
                    ))}
                    {cat.subcategories.length > 4 && (
                      <span className="text-[10px] font-bold text-white/60 px-2 py-1 italic">
                        +{cat.subcategories.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          </FramerWrapper>
        ))}
      </div>
    </div>
  );
};

export default ProjectPage;
