"use client";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase"; // This will now work!
import { doc, onSnapshot } from "firebase/firestore";

export default function SecurityProvider({ children }: { children: React.ReactNode }) {
  const [isProtected, setIsProtected] = useState(true);
  const [isHiding, setIsHiding] = useState(false);

  useEffect(() => {
    // Listen to the Admin Toggle in real-time
    // Note: Ensure you created the "settings/security" document in your Firebase Console
    const unsub = onSnapshot(doc(db, "settings", "security"), (doc) => {
      if (doc.exists()) {
        setIsProtected(doc.data().antiScreenshot);
      }
    });

    if (!isProtected) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "PrintScreen" || 
        (e.ctrlKey && e.key === "p") || 
        (e.metaKey && e.shiftKey && (e.key === "3" || e.key === "4" || e.key === "5"))
      ) {
        e.preventDefault();
        alert("Screenshots are disabled.");
      }
    };

    const handleBlur = () => setIsHiding(true);
    const handleFocus = () => setIsHiding(false);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);
    window.addEventListener("contextmenu", (e) => e.preventDefault());

    return () => {
      unsub();
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
    };
  }, [isProtected]);

  return (
    <div className={`transition-all duration-700 ${isHiding && isProtected ? "blur-[120px] grayscale opacity-0" : ""}`}>
      <div className={isProtected ? "select-none" : ""}>
        {children}
      </div>
    </div>
  );
}
