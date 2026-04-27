"use client";
import React, { useState, useEffect } from "react";
import { db } from "@/lib/firebase"; // Make sure this file exists in your lib folder
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import FramerWrapper from "@/components/animation/FramerWrapper";
import Heading from "@/components/Heading";
import { ExternalLink, PackagePlus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function MorePage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(collection(db, "more"), orderBy("createdAt", "desc"));
        const snap = await getDocs(q);
        setItems(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching 'More' data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="h-full w-full flex flex-col items-start gap-8 pb-20 px-4 md:px-10">
      <FramerWrapper y={0} x={-100}>
        <Badge variant="secondary" className="gap-1.5 py-1">
          <PackagePlus className="h-4 w-4" /> More
        </Badge>
        <div className="flex flex-col gap-3 mt-4">
           <Heading>Extra Contributions</Heading>
           <p className="font-poppins text-lg text-muted-foreground max-w-2xl">
             Explore additional works, certificates, and creative pieces beyond the main categories.
           </p>
        </div>
      </FramerWrapper>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          // Loading pulse effect
          [1, 2, 3].map((n) => (
            <div key={n} className="h-64 w-full bg-muted animate-pulse rounded-[2rem]" />
          ))
        ) : items.length > 0 ? (
          items.map((item, i) => (
            <FramerWrapper key={item.id} y={20} x={0} delay={i * 0.1}>
              <div className="bg-card border border-border/50 rounded-[2rem] overflow-hidden group hover:shadow-2xl hover:border-primary/20 transition-all duration-500 flex flex-col h-full">
                {item.image && (
                  <div className="h-48 w-full overflow-hidden bg-secondary">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                  </div>
                )}
                <div className="p-8 flex flex-col flex-1">
                  <h3 className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-4 leading-relaxed flex-1">
                    {item.desc}
                  </p>
                  {item.link && (
                    <a 
                      href={item.link} 
                      target="_blank" 
                      className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline group/link"
                    >
                      Explore <ExternalLink size={14} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                    </a>
                  )}
                </div>
              </div>
            </FramerWrapper>
          ))
        ) : (
          <div className="col-span-full py-20 text-center opacity-30 font-bold uppercase tracking-widest">
            No extra nodes deployed yet.
          </div>
        )}
      </div>
    </div>
  );
}
