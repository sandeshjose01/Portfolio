"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface RotatorProps {
  items?: string[];
}

function TextRotator({ items = [] }: RotatorProps) {
  const [index, setIndex] = useState(0);
  const displayItems = items.length > 0 ? items : ["Freelancer", "Designer"];

  useEffect(() => {
    if (displayItems.length <= 1) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % displayItems.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [displayItems.length]);

  return (
    <div className="mt-4 flex items-center overflow-hidden h-[50px]">
      <p className="font-poppins text-xl md:text-2xl text-gray-600">
        I am a Graphic Designer &
      </p>
      <div className="ml-2 h-full overflow-hidden relative w-64">
        <motion.ul
          animate={{ y: -(index * 40) }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="block text-left font-rubik text-2xl md:text-3xl font-bold"
        >
          {displayItems.map((item, i) => (
            <li key={i} className="text-[#2f7df4] h-[40px] flex items-center">
              {item}
            </li>
          ))}
        </motion.ul>
      </div>
    </div>
  );
}

export default TextRotator;
