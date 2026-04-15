import Heading from "@/components/Heading";
import { Badge } from "@/components/ui/badge";
import { Layers, ArrowRight } from "lucide-react";
import FramerWrapper from "@/components/animation/FramerWrapper";
import Link from "next/link";

const ProjectPage = () => {
  const categories = [
    {
      title: "Visual Identity Design",
      subText: "6 subcategories",
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1000&auto=format&fit=crop",
      slug: "visual-identity-design"
    },
    {
      title: "Marketing & Advertising Design",
      subText: "5 subcategories",
      image: "https://images.unsplash.com/photo-1557838923-2985c318be48?q=80&w=1000&auto=format&fit=crop",
      slug: "marketing-advertising-design"
    },
    {
      title: "UI & Digital Design",
      subText: "5 subcategories",
      image: "https://images.unsplash.com/photo-1581291518062-c9a79e7df0f0?q=80&w=1000&auto=format&fit=crop",
      slug: "ui-digital-design"
    },
    {
      title: "Packaging Design",
      subText: "5 subcategories",
      image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=1000&auto=format&fit=crop",
      slug: "packaging-design"
    }
  ];

  return (
    <div className="h-full w-full relative flex flex-col items-start gap-8 pb-20 px-6">
      <Badge variant="secondary" className="gap-1.5 py-1">
        <Layers className="w-4 h-4" />
        Projects
      </Badge>

      <div className="flex flex-col gap-3">
        <Heading>My Projects</Heading>
        <p className="font-poppins text-lg w-full text-muted-foreground max-w-2xl">
          A curated collection of my graphic design work. Click a category below to explore projects.
        </p>
      </div>

      {/* THE BIG CATEGORY GRID */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        {categories.map((cat, index) => (
          <FramerWrapper 
            key={index} 
            y={50} 
            delay={index * 0.1}
            className="group"
          >
            <Link href={`/projects/${cat.slug}`} className="block h-full">
              {/* THE MAIN CATEGORY CONTAINER (Now Big with Image) */}
              <div className="relative h-64 w-full overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
                
                {/* Background Image */}
                <img 
                  src={cat.image} 
                  alt={cat.title} 
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Dark Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                {/* Info Content (Keeping your title and sub-category text) */}
                <div className="absolute inset-0 p-8 flex items-end justify-between">
                  <div className="flex flex-col gap-1">
                    <h2 className="text-2xl font-bold text-white tracking-tight">
                      {cat.title}
                    </h2>
                    {/* Sub-category part exactly as you wanted */}
                    <p className="text-gray-300 text-sm font-medium">
                      {cat.subText}
                    </p>
                  </div>

                  {/* Icon on the right */}
                  <div className="bg-white/10 backdrop-blur-md p-2 rounded-full border border-white/20 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowRight className="w-5 h-5" />
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
