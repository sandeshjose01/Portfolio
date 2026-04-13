import Heading from "@/components/Heading";
import SkillsFooter from "@/components/SkillsFotter";
import { Badge } from "@/components/ui/badge";
import { LightbulbIcon } from "lucide-react";

import FramerWrapper from "@/components/animation/FramerWrapper";
const skillPage = () => {
  const designingTools = [
    {
      name: "Adobe Creative Suite",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Adobe_Creative_Cloud_Logo_2020.svg/512px-Adobe_Creative_Cloud_Logo_2020.svg.png",
    },
    {
      name: "Adobe Photoshop",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Adobe_Photoshop_CC_icon.svg/512px-Adobe_Photoshop_CC_icon.svg.png",
    },
    {
      name: "Adobe Illustrator",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Adobe_Illustrator_CC_icon.svg/512px-Adobe_Illustrator_CC_icon.svg.png",
    },
    {
      name: "Adobe InDesign",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Adobe_InDesign_CC_icon.svg/512px-Adobe_InDesign_CC_icon.svg.png",
    },
    {
      name: "Canva",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Canva_Logo.svg/512px-Canva_Logo.svg.png",
    },
  ];

  return (
    // SKILLS PAGE
    <div className="h-full w-full relative flex flex-col items-start gap-5 overflow-hidden">
      <Badge variant="secondary" className="gap-1.5 py-1 ">
        <LightbulbIcon className="w-4 h-4" />
        My Skills
      </Badge>
      <div className="flex flex-col gap-3">
        <Heading>My Technical Experience/Skills.</Heading>
        <FramerWrapper y={0} x={200}>
          <p className="font-poppins text-xl w-full text-primary max-sm:text-lg">
            Currently I am a Graphic Designer with 3+ year of experience and I have a solid 
            understand of Photoshop, Illustrator, Canva & Microsoft Office.
          </p>
        </FramerWrapper>
        <FramerWrapper y={100} delay={0.3} className="block w-full">
          <h1 className="gap-2 text-2xl font-poppins text-primary font-semibold flex text_underline relative max-sm:text-xl mb-4">
            Designing Tools
          </h1>
          <div className="w-full grid grid-cols-7 max-lg:grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2 gap-4">
            <SkillsFooter items={designingTools} />
          </div>
        </FramerWrapper>
      </div>
    </div>
  );
};

export default skillPage;
