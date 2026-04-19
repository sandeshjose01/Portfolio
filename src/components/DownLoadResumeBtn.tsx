import { cn } from "@/lib/utils";
import { Download } from "lucide-react";
import React from "react";
import { buttonVariants } from "./ui/button";
import { motion } from "framer-motion";
import { downloadATSResume } from "@/lib/generateResume";

const DownLoadResumeBtn = () => {
  return (
    <div className="px-4">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={downloadATSResume}
        className={cn(
          buttonVariants({ variant: "default", size: "lg" }),
          "flex gap-2 font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-500/20"
        )}
      >
        <Download className="h-5 w-5" />
        Download CV
      </motion.button>
    </div>
  );
};

export default DownLoadResumeBtn;
