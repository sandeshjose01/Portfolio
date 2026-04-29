"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface RotatorProps {
  items?: string[];
}

function TextRotator({ items = [] }: RotatorProps) {
  const [index, setIndex] = useState(0);
  const displayItems = items.length > 0 ? items : ["Designer", "Freelancer", "Creator"];

  useEffect(() => {
    const count = displayItems.length;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % count);
    }, 3000);
    return () => clearInterval(interval);
  }, [displayItems.length]);

  return (
    <div className="py-4 flex flex-col justify-center items-start overflow-hidden">
      <div className="font-poppins text-base sm:text-2xl text-white opacity-100">
        I am a Graphic Designer &
        <span className="inline-flex ml-2 flex-col relative h-[35px] sm:h-[45px] overflow-hidden">
          <motion.ul
            animate={{
              y: -(index * (typeof window !== 'undefined' && window.innerWidth < 640 ? 32 : 40)),
            }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="block text-left font-rubik text-lg sm:text-3xl leading-tight"
          >
            {displayItems.map((item, i) => (
              <li key={i} className="text-[#2f7df4] h-[32px] sm:h-[40px] flex items-center font-bold">
                {item}
              </li>
            ))}
          </motion.ul>
        </span>
      </div>
    </div>
  );
}

export default TextRotator;
