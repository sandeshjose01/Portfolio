"use client";
import FramerWrapper from "@/components/animation/FramerWrapper";
import Heading from "@/components/Heading";
import { Badge } from "@/components/ui/badge";
import { Layers, ChevronRight } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";

const categories = [
  {
    main: "Visual Identity Design",
    icon: "🎨",
    subs: ["Logo Design","Color Systems","Typography","Iconography & Graphic Patterns","Brand Style Guides","Corporate Stationery"],
  },
  {
    main: "Marketing & Advertising Design",
    icon: "📣",
    subs: ["Social Media Graphics","Print Collateral","Large-Format Design","Digital Advertising","Presentation Design"],
  },
  {
    main: "UI & Digital Design",
    icon: "💻",
    subs: ["Webpage Design","App Design","Wireframing","Game Interfaces","Interactive Prototyping"],
  },
  {
    main: "Packaging Design",
    icon: "📦",
    subs: ["Label & Sticker Design","Container Design","Inner Packaging","Outer Packaging","Mockups & Print-Ready Files"],
  },
];

// ─────────────────────────────────────────────
// ADD NEW PROJECTS AT THE TOP — newest first
// ─────────────────────────────────────────────
const Projects = [
  {
    title: "New Year 2082 BS",
    description: "A vibrant social media post designed for Nepali New Year 2082, created using Photoshop and Illustrator. Focused on cultural aesthetics with modern design elements.",
    tags: ["Social Media Graphics","Photoshop","Illustrator","Client Work"],
    category: "Marketing & Advertising Design",
    sub: "Social Media Graphics",
    link: "https://www.linkedin.com/posts/sanjoshi1_happynewyear2082-leadership-growthmindset-activity-7317287398688669696-jwi-?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEAIaRgB46xLEH58WXwdcGbC3eWaQ-Bo7dY",
    imageLink: "https://media.licdn.com/dms/image/v2/D4D22AQEQ9cVqRN-V6Q/feedshare-shrink_2048_1536/B4DZYw6FNIG4Ao-/0/1744577262820?e=1749081600&v=beta&t=6ulyhT3YHPLdfoU2GjCzHKMllcqkGN8Q-pusZOHKJxY",
  },
  {
    title: "Brand Logo Design",
    description: "A modern logo design project for a local business. Focused on clean shapes, strong symbolism, and versatility across digital and print mediums.",
    tags: ["Logo Design","Illustrator","Client Work"],
    category: "Visual Identity Design",
    sub: "Logo Design",
    link: "#",
    imageLink: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=800&q=80",
  },
  {
    title: "Brand Style Guide",
    description: "A comprehensive brand style guide covering logo usage, color palette, typography, and design rules to ensure consistent brand representation.",
    tags: ["Brand Style Guides","Illustrator","Freelancing"],
    category: "Visual Identity Design",
    sub: "Brand Style Guides",
    link: "#",
    imageLink: "https://images.unsplash.com/photo-1586717799252-bd134ad00e26?w=800&q=80",
  },
  {
    title: "Corporate Stationery Set",
    description: "A professional stationery set including business cards, letterhead, and envelopes designed to reflect the client's brand identity consistently.",
    tags: ["Corporate Stationery","Illustrator","Client Work"],
    category: "Visual Identity Design",
    sub: "Corporate Stationery",
    link: "#",
    imageLink: "https://images.unsplash.com/photo-1613909207039-6b173b755cc1?w=800&q=80",
  },
  {
    title: "Event Poster Design",
    description: "A bold and eye-catching event poster created with strong typography, vibrant colors, and a clear visual hierarchy to attract maximum attention.",
    tags: ["Print Collateral","Photoshop","Freelancing"],
    category: "Marketing & Advertising Design",
    sub: "Print Collateral",
    link: "#",
    imageLink: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
  },
  {
    title: "Product Label Design",
    description: "A creative label design for a local product, balancing aesthetics with practical print requirements. Includes mockup presentation for client approval.",
    tags: ["Label & Sticker Design","Photoshop","Client Work"],
    category: "Packaging Design",
    sub: "Label & Sticker Design",
    link: "#",
    imageLink: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=800&q=80",
  },
];

type Project = typeof Projects[0];

const projectsPage = () => {
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [overlayAnim, setOverlayAnim] = useState(false);
  const [activeMain, setActiveMain] = useState<string | null>(null);
  const [activeSub, setActiveSub] = useState<string | null>(null);
  const [popup, setPopup] = useState<Project | null>(null);
  const [popupAnim, setPopupAnim] = useState(false);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const barRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const startPos = useRef({ x: 0, y: 0 });
  const popupRef = useRef<HTMLDivElement>(null);

  const currentCategory = categories.find((c) => c.main === activeMain);
  const filtered = activeSub
    ? Projects.filter((p) => p.category === activeMain && p.sub === activeSub)
    : [];

  const openOverlay = (main: string) => {
    setActiveMain(main);
    setActiveSub(null);
    setOverlayOpen(true);
    setTimeout(() => setOverlayAnim(true), 10);
  };

  const closeOverlay = () => {
    setOverlayAnim(false);
    closePopupAnim();
    setTimeout(() => { setOverlayOpen(false); setActiveMain(null); setActiveSub(null); }, 320);
  };

  const showPopup = (p: Project) => {
    setPopup(p);
    setTimeout(() => setPopupAnim(true), 10);
  };

  const closePopupAnim = useCallback(() => {
    setPopupAnim(false);
    setTimeout(() => setPopup(null), 220);
  }, []);

  const cancelHover = (idx: number) => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    const bar = barRefs.current[idx];
    if (bar) { bar.style.transition = "none"; bar.style.width = "0%"; }
  };

  const startHover = (p: Project, idx: number, x: number, y: number) => {
    startPos.current = { x, y };
    const bar = barRefs.current[idx];
    if (bar) {
      bar.style.transition = "none";
      bar.style.width = "0%";
      setTimeout(() => {
        bar.style.transition = "width 3s linear";
        bar.style.width = "100%";
      }, 10);
    }
    hoverTimer.current = setTimeout(() => showPopup(p), 3000);
  };

  const onMouseMove = (e: React.MouseEvent, p: Project, idx: number) => {
    if (popup) return;
    const dx = Math.abs(e.clientX - startPos.current.x);
    const dy = Math.abs(e.clientY - startPos.current.y);
    if (dx > 6 || dy > 6) {
      cancelHover(idx);
      startHover(p, idx, e.clientX, e.clientY);
    }
  };

  useEffect(() => {
    if (!popup) return;
    const handler = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        closePopupAnim();
      }
    };
    document.addEventListener("mousemove", handler);
    return () => document.removeEventListener("mousemove", handler);
  }, [popup, closePopupAnim]);

  return (
    <div className="h-full w-full relative flex flex-col items-start gap-5 overflow-hidden">
      <Badge variant="secondary" className="gap-1.5 py-1">
        <Layers className="h-4 w-4" />
        Projects
      </Badge>
      <div className="flex flex-col gap-3">
        <Heading>My Projects</Heading>
        <FramerWrapper y={0} x={200}>
          <p className="font-poppins text-lg w-full text-primary max-sm:text-base">
            A curated collection of my graphic design work. Click a category below to explore projects.
          </p>
        </FramerWrapper>
      </div>

      {/* Main Category Cards */}
      <div className="w-full grid grid-cols-2 max-sm:grid-cols-1 gap-4">
        {categories.map((cat, i) => (
          <FramerWrapper key={cat.main} y={50} delay={i * 0.1}>
            <button
              onClick={() => openOverlay(cat.main)}
              className="w-full text-left p-6 rounded-xl border-2 border-primary/20 hover:border-primary hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{cat.icon}</span>
                  <div>
                    <h3 className="font-poppins font-semibold text-lg text-primary group-hover:text-primary/80 transition-colors">
                      {cat.main}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {cat.subs.length} subcategories
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" />
              </div>
            </button>
          </FramerWrapper>
        ))}
      </div>

      {/* OVERLAY */}
      {overlayOpen && (
        <div
          className="fixed inset-0 z-50 flex items-stretch"
          style={{
            background: overlayAnim ? "rgba(0,0,0,0.55)" : "rgba(0,0,0,0)",
            transition: "background 0.3s ease",
          }}
          onClick={(e) => { if (e.target === e.currentTarget) closeOverlay(); }}
        >
          {/* Left Sub Panel */}
          <div
            className="flex flex-col h-full overflow-hidden"
            style={{
              width: "220px",
              background: "rgba(15,15,25,0.78)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              borderRight: "0.5px solid rgba(255,255,255,0.12)",
              transform: overlayAnim ? "translateX(0)" : "translateX(-100%)",
              transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
            }}
          >
            <div style={{ padding: "16px 14px 10px", borderBottom: "0.5px solid rgba(255,255,255,0.1)" }}>
              <p style={{ fontSize: "9px", fontWeight: 500, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "4px" }}>
                Category
              </p>
              <p style={{ fontSize: "13px", fontWeight: 500, color: "rgba(255,255,255,0.92)", lineHeight: 1.4 }}>
                {activeMain}
              </p>
            </div>
            <div style={{ padding: "10px 10px", display: "flex", flexDirection: "column", gap: "5px", overflowY: "auto", flex: 1 }}>
              {currentCategory?.subs.map((sub, i) => {
                const count = Projects.filter((p) => p.category === activeMain && p.sub === sub).length;
                const isActive = activeSub === sub;
                return (
                  <button
                    key={sub}
                    onClick={() => { setActiveSub(sub); closePopupAnim(); }}
                    style={{
                      padding: "8px 10px",
                      borderRadius: "6px",
                      fontSize: "11px",
                      fontWeight: 500,
                      color: isActive ? "#111" : "rgba(255,255,255,0.65)",
                      background: isActive ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.05)",
                      border: `0.5px solid ${isActive ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.1)"}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "6px",
                      cursor: "pointer",
                      transition: "all 0.18s",
                      opacity: overlayAnim ? 1 : 0,
                      transform: overlayAnim ? "translateX(0)" : "translateX(-12px)",
                      transitionDelay: overlayAnim ? `${0.08 + i * 0.05}s` : "0s",
                      width: "100%",
                      textAlign: "left",
                    }}
                  >
                    <span>{sub}</span>
                    <span style={{ fontSize: "9px", padding: "1px 6px", borderRadius: "4px", background: isActive ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.1)", color: isActive ? "#333" : "rgba(255,255,255,0.5)", flexShrink: 0 }}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Content Area */}
          <div
            className="flex flex-col flex-1 overflow-hidden"
            style={{
              opacity: overlayAnim ? 1 : 0,
              transform: overlayAnim ? "translateY(0)" : "translateY(14px)",
              transition: "all 0.32s ease 0.06s",
            }}
          >
            {/* Header */}
            <div style={{ padding: "12px 16px", borderBottom: "0.5px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(255,255,255,0.06)", backdropFilter: "blur(8px)" }}>
              <div>
                <p style={{ fontSize: "12px", fontWeight: 500, color: "rgba(255,255,255,0.9)" }}>
                  {activeSub || "Select a subcategory"}
                </p>
                <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.45)", marginTop: "2px" }}>
                  {activeSub ? `${filtered.length} project${filtered.length !== 1 ? "s" : ""} — hover a card for 3s to preview` : "Choose from the left panel"}
                </p>
              </div>
              <button onClick={closeOverlay} style={{ width: "24px", height: "24px", borderRadius: "50%", background: "rgba(255,255,255,0.1)", border: "0.5px solid rgba(255,255,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: "12px", color: "rgba(255,255,255,0.7)" }}>
                ✕
              </button>
            </div>

            {/* Projects Grid */}
            <div style={{ flex: 1, overflowY: "auto", padding: "12px" }}>
              {!activeSub ? (
                <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.35)", fontSize: "13px", gap: "10px" }}>
                  <span style={{ fontSize: "28px", opacity: 0.4 }}>←</span>
                  Pick a subcategory to view projects
                </div>
              ) : filtered.length === 0 ? (
                <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.35)", fontSize: "13px", gap: "10px" }}>
                  <span style={{ fontSize: "28px", opacity: 0.4 }}>🎨</span>
                  No projects yet in this subcategory — coming soon!
                </div>
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "10px" }}>
                  {filtered.map((p, idx) => (
                    <div
                      key={idx}
                      onContextMenu={(e) => e.preventDefault()}
                      onDragStart={(e) => e.preventDefault()}
                      onMouseEnter={(e) => startHover(p, idx, e.clientX, e.clientY)}
                      onMouseMove={(e) => onMouseMove(e, p, idx)}
                      onMouseLeave={() => cancelHover(idx)}
                      style={{ borderRadius: "8px", border: "0.5px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.07)", overflow: "hidden", cursor: "pointer", position: "relative" }}
                    >
                      <div style={{ position: "relative", width: "100%", overflow: "hidden" }}>
                        <img
                          src={p.imageLink}
                          alt={p.title}
                          draggable={false}
                          style={{ width: "100%", display: "block", objectFit: "cover", pointerEvents: "none", WebkitUserDrag: "none" } as React.CSSProperties}
                        />
                        {/* Progress bar */}
                        <div
                          ref={(el) => { barRefs.current[idx] = el; }}
                          style={{ position: "absolute", bottom: 0, left: 0, height: "2px", width: "0%", background: "rgba(255,255,255,0.85)", zIndex: 3 }}
                        />
                      </div>
                      <div style={{ padding: "6px 8px", borderTop: "0.5px solid rgba(255,255,255,0.08)" }}>
                        <p style={{ fontSize: "10px", fontWeight: 500, color: "rgba(255,255,255,0.85)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {p.title}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* HOVER POPUP */}
          {popup && (
            <div
              ref={popupRef}
              style={{
                position: "fixed",
                top: "5%",
                left: "50%",
                transform: popupAnim ? "translateX(-50%) scale(1) translateY(0)" : "translateX(-50%) scale(0.92) translateY(12px)",
                width: "80%",
                maxWidth: "700px",
                height: "90%",
                background: "white",
                borderRadius: "12px",
                border: "0.5px solid rgba(0,0,0,0.1)",
                zIndex: 60,
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                opacity: popupAnim ? 1 : 0,
                transition: popupAnim
                  ? "opacity 0.28s cubic-bezier(0.4,0,0.2,1), transform 0.28s cubic-bezier(0.4,0,0.2,1)"
                  : "opacity 0.18s ease, transform 0.18s ease",
              }}
            >
              <div style={{ padding: "14px 16px", borderBottom: "0.5px solid rgba(0,0,0,0.08)", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
                <div>
                  <p style={{ fontSize: "15px", fontWeight: 500, color: "#111" }}>{popup.title}</p>
                  <p style={{ fontSize: "11px", color: "#888", marginTop: "2px" }}>{popup.sub} · Move mouse away to dismiss</p>
                </div>
                <button onClick={closePopupAnim} style={{ width: "26px", height: "26px", borderRadius: "50%", background: "#f4f4f4", border: "0.5px solid #e0e0e0", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: "12px", color: "#666" }}>✕</button>
              </div>
              <div style={{ flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: "14px" }}>
                <div style={{ width: "100%", borderRadius: "8px", overflow: "hidden", border: "0.5px solid #eee", flexShrink: 0, position: "relative" }}>
                  <img src={popup.imageLink} alt={popup.title} draggable={false} onContextMenu={(e) => e.preventDefault()} style={{ width: "100%", display: "block", pointerEvents: "none" }} />
                </div>
                <p style={{ fontSize: "15px", fontWeight: 500, color: "#111" }}>{popup.title}</p>
                <p style={{ fontSize: "12px", color: "#666", lineHeight: 1.7 }}>{popup.description}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {popup.tags.map((t) => (
                    <span key={t} style={{ fontSize: "11px", padding: "3px 10px", borderRadius: "5px", background: "#f4f4f4", color: "#555", border: "0.5px solid #e0e0e0" }}>{t}</span>
                  ))}
                </div>
                {popup.link !== "#" && (
                  <a href={popup.link} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "12px", fontWeight: 500, color: "#111", background: "#f4f4f4", border: "0.5px solid #e0e0e0", borderRadius: "6px", padding: "7px 14px", textDecoration: "none", width: "fit-content" }}>
                    View Project ↗
                  </a>
                )}
                <div style={{ fontSize: "11px", color: "#999", display: "flex", alignItems: "center", gap: "6px", padding: "8px 10px", borderRadius: "6px", background: "#fafafa", border: "0.5px solid #eee" }}>
                  <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#E24B4A", flexShrink: 0, display: "inline-block" }} />
                  Image protected — right-click & download disabled
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default projectsPage;
