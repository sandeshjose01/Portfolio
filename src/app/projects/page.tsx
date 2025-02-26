import FramerWrapper from "@/components/animation/FramerWrapper";
import Heading from "@/components/Heading";
import ProjectCards from "@/components/ProjectsCard";
import { Badge } from "@/components/ui/badge";
import { Layers } from "lucide-react";

const projectsPage = () => {
  // PROJECTS DATA
  const Projects = [
    {
      title: "Devzone - A community chat app for devs",
      description: `DevZone is the ultimate chat platform for developers
to connect, collaborate, and code together. Join the conversation and level up your coding journey.`,
      tags: ["Zustand", "Supabase", "Shadcn Ui", "Nextjs"],
      link: "https://devzone-ti.vercel.app/",
      imageLink:
        "https://scontent.fktm21-2.fna.fbcdn.net/v/t39.30808-6/473381834_459271083906430_5869194846565264125_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=127cfc&_nc_ohc=jfxg_UgDzXYQ7kNvgET91Zk&_nc_oc=Adj9mt_Qvi2LC_c2Dk0iMrRtQjjcPaHlyxo1kd-w233ksAM3trlmYMybWUDaqsQV9qRLGEDfvwLdgUXolIHktzT1&_nc_zt=23&_nc_ht=scontent.fktm21-2.fna&_nc_gid=A11Mb24qGzVmVXyMsAMjR6k&oh=00_AYB0dmieNuPZSnPRojnWlJjfsH7QrBCOoGHiMwUyRCGTOg&oe=67C3C677",
    },
    {
      title: "itZmyLink- One Page many Links",
      description:
        "itZmyLink is a simple platform where user can create a personalized page to showcase all your social media profiles in one place. ",
      tags: ["Nextjs", "Typescript", "Shadcn Ui"],
      link: "https://github.com/taqui-786/itZmyLink",
      imageLink:
        "https://scontent.fktm21-2.fna.fbcdn.net/v/t39.30808-6/473381834_459271083906430_5869194846565264125_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=127cfc&_nc_ohc=jfxg_UgDzXYQ7kNvgET91Zk&_nc_oc=Adj9mt_Qvi2LC_c2Dk0iMrRtQjjcPaHlyxo1kd-w233ksAM3trlmYMybWUDaqsQV9qRLGEDfvwLdgUXolIHktzT1&_nc_zt=23&_nc_ht=scontent.fktm21-2.fna&_nc_gid=A11Mb24qGzVmVXyMsAMjR6k&oh=00_AYB0dmieNuPZSnPRojnWlJjfsH7QrBCOoGHiMwUyRCGTOg&oe=67C3C677",
    },
    {
      title: "GitEstimate- Github estimate worth generator",
      description:
        "GitEstimate is a simple fun tool where user can generate their github estimate worth card just by entering their github username. ",
      tags: ["Nextjs", "Typescript", "Shadcn Ui"],
      link: "https://github.com/taqui-786/GitEstimate",
      imageLink:
        "https://scontent.fktm21-2.fna.fbcdn.net/v/t39.30808-6/473381834_459271083906430_5869194846565264125_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=127cfc&_nc_ohc=jfxg_UgDzXYQ7kNvgET91Zk&_nc_oc=Adj9mt_Qvi2LC_c2Dk0iMrRtQjjcPaHlyxo1kd-w233ksAM3trlmYMybWUDaqsQV9qRLGEDfvwLdgUXolIHktzT1&_nc_zt=23&_nc_ht=scontent.fktm21-2.fna&_nc_gid=A11Mb24qGzVmVXyMsAMjR6k&oh=00_AYB0dmieNuPZSnPRojnWlJjfsH7QrBCOoGHiMwUyRCGTOg&oe=67C3C677",
    },
    {
      title: "Mixcn-ui- Reusable components for Nextjs",
      description:
        "This is Nextjs app with a Collection of Nextjs Components - (Currently under Devlelopment) ",
      tags: ["Nextjs", "Shadcnui", "Npx", "Library"],
      link: "https://mixcn-ui.vercel.app",
      imageLink:
        "https://scontent.fktm21-2.fna.fbcdn.net/v/t39.30808-6/473381834_459271083906430_5869194846565264125_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=127cfc&_nc_ohc=jfxg_UgDzXYQ7kNvgET91Zk&_nc_oc=Adj9mt_Qvi2LC_c2Dk0iMrRtQjjcPaHlyxo1kd-w233ksAM3trlmYMybWUDaqsQV9qRLGEDfvwLdgUXolIHktzT1&_nc_zt=23&_nc_ht=scontent.fktm21-2.fna&_nc_gid=A11Mb24qGzVmVXyMsAMjR6k&oh=00_AYB0dmieNuPZSnPRojnWlJjfsH7QrBCOoGHiMwUyRCGTOg&oe=67C3C677",
    },
  ];

  return (
    // PROJECT PAGE
    <div className="h-full w-full relative flex flex-col items-start gap-5 overflow-hidden">
      <Badge variant="secondary" className="gap-1.5 py-1 ">
        <Layers className="h-4 w-4" />
        Projects
      </Badge>
      <div className="flex flex-col gap-3">
        <Heading>My Projects</Heading>
        <FramerWrapper y={0} x={200}>
          <p className=" font-poppins text-lg w-full text-primary max-sm:text-base">
            I love to Build Cool Projects. Here, you&#x27;ll find a curated
            collection of my creative endeavors and technical projects. Each
            piece represents a journey of innovation, problem-solving, and
            continuous learning. Feel free to explore this showcase of my
            passion and expertise in action.
          </p>
        </FramerWrapper>
      </div>

      <div className=" w-full flex flex-row flex-wrap gap-3 max-lg:flex-col">
        {Projects.map((val, indx) => {
          return <ProjectCards key={indx} value={val} num={indx} />;
        })}
      </div>
    </div>
  );
};

export default projectsPage;
