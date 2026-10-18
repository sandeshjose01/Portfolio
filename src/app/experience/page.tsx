"use client";
import React, { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

interface Role {
  title: string;
  workType: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string[];
}

interface ExperienceItem {
  id: string;
  company: string;
  location: string;
  logo: string;
  roles: Role[];
}

interface RecommendationItem {
  id: string;
  name: string;
  role: string;
  image: string;
  description: string[];
}

export default function PortfolioExperiencePage() {
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
  const [recommendations, setRecommendations] = useState<RecommendationItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch Experiences in real-time
    const unsubExp = onSnapshot(
      collection(db, "experience"),
      (snapshot) => {
        const list = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as ExperienceItem[];
        
        // Optional sorting if createdAt exists
        list.sort((a: any, b: any) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
        setExperiences(list);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching experiences:", error);
        setLoading(false);
      }
    );

    // Fetch Recommendations in real-time
    const unsubRec = onSnapshot(
      collection(db, "recommendations"),
      (snapshot) => {
        const list = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as RecommendationItem[];
        
        list.sort((a: any, b: any) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
        setRecommendations(list);
      },
      (error) => {
        console.error("Error fetching recommendations:", error);
      }
    );

    return () => {
      unsubExp();
      unsubRec();
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-sm uppercase tracking-widest text-white/50 animate-pulse">Loading Experience...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-24 px-6 space-y-24 text-white">
      {/* Experience Section */}
      <div className="space-y-12">
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter">Experience</h1>
        
        {experiences.length === 0 ? (
          <p className="text-white/40 text-sm">No experience records found.</p>
        ) : (
          <div className="space-y-12">
            {experiences.map((exp) => (
              <div key={exp.id} className="p-8 md:p-10 rounded-[3rem] bg-white/[0.03] border border-white/10 space-y-8">
                {/* Company Header */}
                <div className="flex items-center gap-6">
                  {exp.logo ? (
                    <img src={exp.logo} alt={exp.company} className="w-16 h-16 rounded-2xl object-cover border border-white/10" />
                  ) : (
                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold text-white/40">
                      LOGO
                    </div>
                  )}
                  <div>
                    <h2 className="text-2xl md:text-3xl font-black">{exp.company}</h2>
                    <p className="text-xs uppercase tracking-widest text-white/40 font-bold">{exp.location}</p>
                  </div>
                </div>

                {/* Roles / Promotions Breakdown */}
                <div className="space-y-6 pl-2 md:pl-6 border-l-2 border-white/10">
                  {exp.roles?.map((role, rIdx) => (
                    <div key={rIdx} className="space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="text-xl font-bold">{role.title}</h3>
                        <span className="text-[10px] uppercase font-black tracking-widest text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full">
                          {role.workType}
                        </span>
                      </div>
                      <p className="text-xs text-white/40 font-bold uppercase tracking-wider">
                        {role.startDate} — {role.isCurrent ? "Present" : role.endDate}
                      </p>
                      {role.description && role.description.length > 0 && (
                        <ul className="list-disc list-inside space-y-2 text-sm text-white/70 pt-2">
                          {role.description.map((bullet, bIdx) => (
                            <li key={bIdx} className="leading-relaxed">{bullet}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recommendations Section */}
      <div className="space-y-12 pt-12 border-t border-white/10">
        <h2 className="text-6xl md:text-8xl font-black tracking-tighter italic opacity-90">Recommendations</h2>

        {recommendations.length === 0 ? (
          <p className="text-white/40 text-sm">No recommendations found.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {recommendations.map((rec) => (
              <div key={rec.id} className="p-8 rounded-[3rem] bg-white/[0.03] border border-white/10 space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  {rec.description && rec.description.length > 0 && (
                    <div className="space-y-2 text-sm text-white/80 leading-relaxed italic">
                      {rec.description.map((p, pIdx) => (
                        <p key={pIdx}>&ldquo;{p}&rdquo;</p>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                  {rec.image ? (
                    <img src={rec.image} alt={rec.name} className="w-12 h-12 rounded-2xl object-cover border border-white/10" />
                  ) : (
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-bold text-white/40">
                      IMG
                    </div>
                  )}
                  <div>
                    <h3 className="text-base font-black">{rec.name}</h3>
                    <p className="text-xs text-white/40">{rec.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
