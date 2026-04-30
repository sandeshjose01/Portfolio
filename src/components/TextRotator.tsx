"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function TextRotator({ items = [], staticRole }: any) {
  const [index, setIndex] = useState(0);
  const displayItems = items && items.length > 0 ? items : ["Freelancer", "Designer", "Creator"];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % displayItems.length);
    }, 3000); // Time each word stays still
    return () => clearInterval(interval);
  }, [displayItems.length]);

  return (
    <div className="py-4 flex items-center gap-2 overflow-hidden">
      <div className="font-poppins text-base sm:text-2xl [text-wrap:balance] text-gray-700">
        {staticRole || "I am a Graphic Designer &"}
      </div>

      {/* // text: The 'Clock' Container */}
      <div className="relative h-[32px] sm:h-[48px] overflow-hidden min-w-[180px]">
        <AnimatePresence initial={false}>
          <motion.div
            key={displayItems[index]}
            // // text: initial = where it starts (below the view)
            initial={{ y: "100%", opacity: 0 }}
            // // text: animate = where it rests (in the center)
            animate={{ y: "0%", opacity: 1 }}
            // // text: exit = where it goes (above the view)
            exit={{ y: "-100%", opacity: 0 }}
            // // text: This transition creates the 'swift' mechanical click feel
            transition={{ 
                duration: 0.5, 
                ease: [0.76, 0, 0.24, 1] // Custom Cubic Bezier for that 'Clock' snap
            }}
            className="text-[#2f7df4] font-rubik text-lg sm:text-3xl font-bold absolute inset-0 flex items-center"
          >
            {displayItems[index]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default TextRotator;
