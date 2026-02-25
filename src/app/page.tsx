"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Custom SVG Car
const CarSVG = ({ flameRef, headlightRef }: { flameRef: React.RefObject<SVGPathElement | null>, headlightRef: React.RefObject<SVGPathElement | null> }) => (
  <svg viewBox="0 0 320 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[180px] md:w-[320px] lg:w-[400px]" style={{ overflow: "visible" }}>
    {/* Soft Diffused Shadow */}
    <ellipse cx="160" cy="70" rx="140" ry="30" fill="#000" opacity="0.2" filter="blur(8px)" />

    {/* Speed Lines (Hidden Initially) */}
    <path
      ref={flameRef}
      d="M-50 40 L0 40 M-30 60 L10 60 M-50 80 L0 80"
      stroke="#FFD700"
      strokeWidth="4"
      strokeLinecap="round"
      opacity="0"
    />

    {/* Primary Body Shell - Matte Black */}
    <path d="M30 25C30 25 60 10 160 10C240 10 270 25 285 40C300 55 300 65 285 80C270 95 240 110 160 110C60 110 30 95 30 95C10 75 10 45 30 25Z" fill="#1A1A1A" />

    {/* White Side Trim */}
    <path d="M40 25C40 25 70 15 160 15C230 15 260 25 275 40" stroke="#FFF" strokeWidth="2" opacity="0.8" />
    <path d="M275 80C260 95 230 105 160 105C70 105 40 95 40 95" stroke="#FFF" strokeWidth="2" opacity="0.8" />

    {/* Black Glass Canopy */}
    <path d="M120 30C140 25 180 25 200 30C220 40 220 80 200 90C180 95 140 95 120 90C90 80 90 40 120 30Z" fill="#000" />

    {/* Yellow Accent Racing Stripe */}
    <rect x="150" y="55" width="100" height="10" rx="2" fill="#FFD700" />

    {/* Headlights Group (Now controlled by Ref for ignition flash) */}
    <g ref={headlightRef} opacity="0" style={{ mixBlendMode: "screen" }}>
      {/* Massive Beams cutting through the night */}
      <path d="M290 35 L600 -80 L600 55 L290 45 Z" fill="url(#headlightGlow)" />
      <path d="M290 75 L600 65 L600 200 L290 85 Z" fill="url(#headlightGlow)" />
      {/* Bulbs */}
      <path d="M280 30 L300 35 L300 45 L285 40 Z" fill="#FFF" />
      <path d="M280 90 L300 85 L300 75 L285 80 Z" fill="#FFF" />
    </g>

    <defs>
      <linearGradient id="headlightGlow" x1="290" y1="0" x2="600" y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFD700" stopOpacity="0.8" />
        <stop offset="30%" stopColor="#FFD700" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
      </linearGradient>
    </defs>

  </svg>
);

const statsData = [
  { value: "58%", label: "INCREASE IN PICK UP POINT USE", color: "bg-[#FFD700]", text: "text-[#1A1A1A]" },
  { value: "27%", label: "INCREASE IN PICK UP POINT USE", color: "bg-[#1A1A1A]", text: "text-white" },
  { value: "23%", label: "DECREASED IN CUSTOMER PHONE CALLS", color: "bg-white", text: "text-[#1A1A1A]", border: "border-[3px] border-[#1A1A1A]" },
  { value: "40%", label: "DECREASED IN CUSTOMER PHONE CALLS", color: "bg-[#F5F6F8]", text: "text-[#1A1A1A]" },
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bandRef = useRef<HTMLDivElement>(null);
  const carWrapperRef = useRef<HTMLDivElement>(null);
  const flameRef = useRef<SVGPathElement>(null);
  const headlightRef = useRef<SVGPathElement>(null); // Ignition ref
  const scrollPromptRef = useRef<HTMLDivElement>(null);
  const statsRefs = useRef<(HTMLDivElement | null)[]>([]);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  // 3D Hover Interactions for stats cards
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = statsRefs.current[index];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate rotation between -10 and +10 degrees based on mouse position
    const xPct = x / rect.width - 0.5;
    const yPct = y / rect.height - 0.5;

    gsap.to(card, {
      rotationY: xPct * 20,
      rotationX: -yPct * 20,
      ease: "power2.out",
      overwrite: "auto",
      duration: 0.4
    });
  };

  const handleMouseLeave = (index: number) => {
    const card = statsRefs.current[index];
    if (card) {
      // Bouncy reset back to flat
      gsap.to(card, { rotationY: 0, rotationX: 0, ease: "elastic.out(1, 0.3)", duration: 1.2, overwrite: "auto" });
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Reset DOM state
      gsap.set(statsRefs.current, { y: 150, opacity: 0, scale: 0.8, rotationX: 45 }); // 3D tilt
      gsap.set(bandRef.current, { clipPath: "inset(0 100% 0 0)" });
      gsap.set(carWrapperRef.current, { x: "-30vw", opacity: 0 });

      // 1. Initial Load Animation
      const loadTl = gsap.timeline();

      loadTl.fromTo(headlineRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 1, ease: "power3.out" }
      );

      loadTl.to(carWrapperRef.current, { opacity: 1, duration: 0.5, ease: "none" }, "-=0.5");

      // -> NEW: Ignition Sequence
      // Rapid flash of headlights when the car settles into position
      loadTl.to(headlightRef.current, { opacity: 1, duration: 0.1, yoyo: true, repeat: 3 }, "-=0.2");
      loadTl.to(headlightRef.current, { opacity: 0.8, duration: 0.3 }); // Settle on partial brightness

      // 2. Hardware-accelerated SCROLL Timeline Pinning
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=500%",
          scrub: 1.5,
          pin: true,
          pinType: "fixed",
          onUpdate: (self) => {
            const speedBoost = Math.abs(self.getVelocity());

            // Dynamic stretch
            gsap.to(carWrapperRef.current, {
              scaleX: 1 + Math.min(speedBoost / 4000, 0.15),
              skewX: -Math.min(self.getVelocity() / 500, 10),
              duration: 0.3,
              overwrite: "auto",
            });

            // Flame exhaust on speed
            if (flameRef.current) {
              gsap.to(flameRef.current, {
                opacity: Math.min(speedBoost / 600, 1),
                x: -Math.min(speedBoost / 50, 40),
                duration: 0.2,
                overwrite: "auto"
              });
            }

            // -> NEW: Auto-fade Scroll Prompt
            // Fade out the "Scroll Down" text once they actually start scrolling
            if (scrollPromptRef.current) {
              if (self.progress > 0.05) {
                gsap.to(scrollPromptRef.current, { opacity: 0, duration: 0.3, overwrite: "auto" });
              } else {
                gsap.to(scrollPromptRef.current, { opacity: 1, duration: 0.3, overwrite: "auto" });
              }
            }
          }
        },
      });

      // -- ANIMATION MAPPING --
      scrollTl.fromTo(carWrapperRef.current,
        { x: "-20vw" },
        { x: "120vw", ease: "none" },
        0
      );

      // Unmask the DAY theme with a soft, glowing angled mask transition.
      // Instead of an abrupt straight line, an angled sweeping clip-path looks much more cinematic.
      scrollTl.fromTo(bandRef.current,
        { clipPath: "polygon(0% 0%, 0% 0%, -10% 100%, -10% 100%)" },
        { clipPath: "polygon(0% 0%, 150% 0%, 120% 100%, 0% 100%)", ease: "none" },
        0
      );

      // Box Reveal tracking the Object's movement directly
      // Tightly compressed stagger and duration makes them all arrive well before the car exits
      scrollTl.fromTo(statsRefs.current,
        {
          y: 150,
          opacity: 0,
          scale: 0.8,
          rotationX: 45 // Premium 3D tilt
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotationX: 0,
          stagger: 0.15, // Compressed stagger so they appear much faster organically
          ease: "back.out(1.5)", // Smooth bouncy arrival mapping
          duration: 0.35 // Significantly reduced duration so cards beat the car
        },
        0.1 // Begin triggering right after the user starts scrolling down
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="bg-[#1A1A1A] font-sans selection:bg-[#FFD700] selection:text-black overflow-x-hidden">

      <div ref={containerRef} className="h-screen w-full relative">

        {/* ===================== NIGHT THEME (Bottom Base Layer) ===================== */}
        <div className="absolute inset-0 z-0 flex flex-col justify-center items-center px-4 md:px-8 pointer-events-none">
          {/* Signature Grid Background (Dark Mode) */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'linear-gradient(#2A2A2A 1px, transparent 1px), linear-gradient(90deg, #2A2A2A 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }}
          />

          {/* Playful Decorative Background Elements (Dark Mode) */}
          <div className="absolute top-[10%] left-[5%] opacity-10 transform -rotate-12">
            <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 50 C 30 10, 70 90, 90 50" stroke="#FFF" strokeWidth="8" strokeLinecap="round" />
            </svg>
          </div>
          <div className="absolute bottom-[20%] right-[5%] opacity-10 transform rotate-45">
            <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="40" stroke="#FFF" strokeWidth="8" strokeDasharray="15 15" />
            </svg>
          </div>

          {/* The Track Line / Headline Area (Dark Mode) */}
          <div className="relative w-full h-[40vh] max-h-[350px] flex items-center justify-center w-full max-w-[1400px]">
            <div className="absolute inset-0 flex items-center justify-center">
              <h1
                ref={headlineRef}
                className="text-[clamp(1.5rem,8vw,12rem)] leading-none font-black tracking-widest text-white uppercase opacity-0"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                WELCOME ITZFIZZ
              </h1>
            </div>
            <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white/10 -translate-y-1/2 -z-10 border-dashed" />
          </div>
        </div>

        {/* ===================== DAY THEME (Top Clipped Layer) ===================== */}
        <div
          ref={bandRef}
          className="absolute inset-0 z-10 bg-white flex flex-col justify-center items-center px-4 md:px-8 pointer-events-none"
          style={{ clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" }}
        >
          {/* Signature Grid Background (Light Mode) */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'linear-gradient(#f0f0f0 1px, transparent 1px), linear-gradient(90deg, #f0f0f0 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }}
          />

          {/* Playful Decorative Background Elements (Light Mode) */}
          <div className="absolute top-[10%] left-[5%] opacity-20 transform -rotate-12">
            <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 50 C 30 10, 70 90, 90 50" stroke="#1A1A1A" strokeWidth="8" strokeLinecap="round" />
            </svg>
          </div>
          <div className="absolute bottom-[20%] right-[5%] opacity-20 transform rotate-45">
            <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="40" stroke="#FFD700" strokeWidth="8" strokeDasharray="15 15" />
            </svg>
          </div>

          {/* The Track Line / Headline Area (Light Mode) */}
          <div className="relative w-full h-[40vh] max-h-[350px] flex items-center justify-center w-full max-w-[1400px]">
            <div className="absolute inset-0 flex items-center justify-center">
              <h1
                className="text-[clamp(1.5rem,8vw,12rem)] leading-none font-black tracking-widest text-[#FFD700] uppercase drop-shadow-md"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                WELCOME ITZFIZZ
              </h1>
            </div>
            <div className="absolute top-1/2 left-0 w-full h-[2px] bg-[#1A1A1A]/10 -translate-y-1/2 -z-10 border-dashed" />
          </div>
        </div>

        {/* ===================== FOREGROUND OVERLAYS (Car & Stats) ===================== */}
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center px-4 md:px-8 pointer-events-none">

          {/* Car Track */}
          <div className="relative w-full h-[40vh] max-h-[350px] flex items-center justify-center w-full max-w-[1400px]">
            {/* Moving Car object */}
            <div
              ref={carWrapperRef}
              className="absolute top-1/2 -translate-y-1/2 pointer-events-none flex items-center"
              style={{ left: 0 }}
            >
              <div className="-translate-x-[40%] md:-translate-x-[50%]">
                <CarSVG flameRef={flameRef} headlightRef={headlightRef} />
              </div>
            </div>
          </div>

          {/* STATISTICS CARDS - Perspective applied securely inside the fixed container only! */}
          <div className="relative w-full max-w-[1200px] mt-[2vh] md:mt-[5vh] flex flex-wrap justify-between items-stretch gap-4 md:gap-6 px-2 pointer-events-auto" style={{ perspective: "1000px", transformStyle: "preserve-3d" }}>
            {statsData.map((stat, index) => (
              <div
                key={index}
                ref={(el) => { statsRefs.current[index] = el; }}
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseLeave={() => handleMouseLeave(index)}
                className={`flex-1 w-full sm:min-w-[45%] lg:min-w-[200px] rounded-[30px] p-6 md:p-8 shadow-sm transition-all duration-300 flex flex-col justify-center items-center text-center will-change-transform ${stat.color} ${stat.text} ${stat.border || ''}`}
                style={{ transformOrigin: "center center", cursor: "crosshair" }}
              >
                <h2 className="text-4xl md:text-5xl lg:text-7xl font-black mb-3 pointer-events-none">
                  {stat.value}
                </h2>
                <div className="w-12 h-1 bg-[#1A1A1A] rounded-full mb-3 opacity-20 pointer-events-none"></div>
                <p className="font-bold text-[10px] md:text-xs uppercase tracking-widest max-w-[200px] pointer-events-none">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>

      <div ref={scrollPromptRef} className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 text-white/40 text-xs font-bold tracking-[0.2em] uppercase flex flex-col items-center animate-pulse pointer-events-none">
        <span>Scroll Down</span>
        <svg className="w-5 h-5 mt-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
      </div>

    </main>
  );
}
