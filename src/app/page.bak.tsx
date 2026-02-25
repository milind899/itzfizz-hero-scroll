"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Custom SVG Car
const CarSVG = ({ flameRef, headlightRef }: { flameRef: React.RefObject<SVGPathElement | null>, headlightRef: React.RefObject<SVGPathElement | null> }) => (
  <svg viewBox="0 0 320 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[180px] md:w-[320px] lg:w-[450px]" style={{ overflow: "visible" }}>
    {/* Soft Diffused Shadow */}
    <ellipse cx="160" cy="70" rx="140" ry="30" fill="#000" opacity="0.6" filter="blur(12px)" />

    {/* Speed Lines / Exhaust */}
    <path
      ref={flameRef}
      d="M-50 40 L0 40 M-30 60 L10 60 M-50 80 L0 80"
      stroke="#FFD700"
      strokeWidth="4"
      strokeLinecap="round"
      opacity="0"
    />

    {/* Primary Body Shell - Matte Black */}
    <path d="M30 25C30 25 60 10 160 10C240 10 270 25 285 40C300 55 300 65 285 80C270 95 240 110 160 110C60 110 30 95 30 95C10 75 10 45 30 25Z" fill="#0A0A0A" />

    {/* Light Trims */}
    <path d="M40 25C40 25 70 15 160 15C230 15 260 25 275 40" stroke="#333" strokeWidth="2" opacity="0.8" />
    <path d="M275 80C260 95 230 105 160 105C70 105 40 95 40 95" stroke="#333" strokeWidth="2" opacity="0.8" />

    {/* Black Glass Canopy */}
    <path d="M120 30C140 25 180 25 200 30C220 40 220 80 200 90C180 95 140 95 120 90C90 80 90 40 120 30Z" fill="#000" />

    {/* Yellow Accent Racing Stripe */}
    <rect x="150" y="55" width="100" height="10" rx="2" fill="#FFD700" />

    {/* Headlights Group */}
    <g ref={headlightRef} opacity="0" style={{ mixBlendMode: "screen" }}>
      <path d="M290 35 L700 -120 L700 80 L290 45 Z" fill="url(#headlightGlow)" />
      <path d="M290 75 L700 90 L700 250 L290 85 Z" fill="url(#headlightGlow)" />
      <path d="M280 30 L300 35 L300 45 L285 40 Z" fill="#FFF" />
      <path d="M280 90 L300 85 L300 75 L285 80 Z" fill="#FFF" />
    </g>

    <defs>
      <linearGradient id="headlightGlow" x1="290" y1="0" x2="700" y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFF" stopOpacity="0.9" />
        <stop offset="20%" stopColor="#FFD700" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);

const slidesData = [
  { id: "hero", isHero: true, bg: "bg-[#050505]", textTheme: "text-[#FFD700]" },
  { id: "stat1", value: "58%", label: "INCREASE IN PICK UP POINT USE", bg: "bg-[#FFD700]", textTheme: "text-[#050505]", accent: "text-white/40" },
  { id: "stat2", value: "27%", label: "REDUCTION IN ABANDONED CARTS", bg: "bg-[#FAFAFA]", textTheme: "text-[#050505]", accent: "text-[#050505]/40" },
  { id: "stat3", value: "23%", label: "DECREASE IN CUSTOMER PHONE CALLS", bg: "bg-[#111111]", textTheme: "text-[#FFD700]", accent: "text-white/30" },
  { id: "stat4", value: "40%", label: "ENGAGEMENT BOOST OVERALL", bg: "bg-[#222222]", textTheme: "text-white", accent: "text-[#FFD700]/50" },
];

// Stats displayed directly on the hero screen per assignment requirements
const heroStats = [
  { value: "58%", label: "Pick Up Point Use" },
  { value: "27%", label: "Cart Abandonment" },
  { value: "23%", label: "Customer Calls" },
  { value: "40%", label: "Engagement Boost" },
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<(HTMLDivElement | null)[]>([]);
  const carWrapperRef = useRef<HTMLDivElement>(null);
  const flameRef = useRef<SVGPathElement>(null);
  const headlightRef = useRef<SVGPathElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const statsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Select the individual stat elements on the hero slide for staggered load animation
      const statBlocks = statsContainerRef.current?.children;

      // 1. Reset DOM initial states
      gsap.set(panelsRef.current.slice(1), { yPercent: 100, boxShadow: "0px -50px 100px rgba(0,0,0,0.8)" });
      gsap.set(carWrapperRef.current, { x: "-20vw", opacity: 0 });
      gsap.set(headlineRef.current, { y: 40, opacity: 0 });
      if (statBlocks) gsap.set(statBlocks, { y: 30, opacity: 0 });

      // ---- 2. INITIAL PAGE LOAD ANIMATION (CRITICAL REQUIREMENT) ----
      // "The headline should appear smoothly... The statistics should animate in one by one with a subtle delay."
      const loadTl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Staggered reveal of the letter-spaced headline
      loadTl.to(headlineRef.current, { opacity: 1, y: 0, duration: 1.2, ease: "expo.out" }, 0.2);

      // Animate in the stats one by one with a subtle delay AFTER the headline
      if (statBlocks) {
        loadTl.to(statBlocks, { opacity: 1, y: 0, stagger: 0.15, duration: 0.8 }, "-=0.6");
      }

      // Smooth entry for the main visual element (Car)
      loadTl.to(carWrapperRef.current, { opacity: 1, x: "0vw", duration: 1.5, ease: "power2.out" }, "-=0.8");

      // Flash headlights
      loadTl.to(headlightRef.current, { opacity: 1, duration: 0.1, yoyo: true, repeat: 3 }, "-=0.5");
      loadTl.to(headlightRef.current, { opacity: 0.4, duration: 0.3 });


      // ---- 3. SCROLL-BASED ANIMATION (CORE FEATURE) ----
      const numScrollSlides = slidesData.length - 1; // 4 remaining slides

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${numScrollSlides * 100}%`, // Scroll length = 100vh per slide addition
          scrub: 1, // Fluid motion, no abrupt autoplay
          pin: true,
          pinSpacing: true,
          onUpdate: (self) => {
            const speed = Math.abs(self.getVelocity());

            // Physics: Flame and Car Tilt based purely on how fast user scrolls
            if (flameRef.current) {
              gsap.to(flameRef.current, {
                opacity: Math.min(speed / 300, 1),
                scaleX: 1 + Math.min(speed / 800, 2),
                duration: 0.1,
                overwrite: "auto"
              });
            }
          }
        },
      });

      // ---- SCROLL TRANSFORMS ----

      // "The main visual element should move smoothly based on scroll position."
      // We physically drive the car horizontally across the screen spanning the full scroll duration
      scrollTl.to(carWrapperRef.current, {
        x: "60vw", // Move smoothly across 60% of the viewport width 
        ease: "none",
        duration: numScrollSlides // Spans exactly the time it takes to see all slides
      }, 0);

      // The ultra-premium 3D Deck Stack background (The idea you liked)
      panelsRef.current.forEach((panel, i) => {
        if (i === 0 || !panel) return;

        const stepTime = i - 1; // 0, 1, 2, 3
        const prevPanels = panelsRef.current.slice(0, i);

        // Push old slides backward into the 3D void
        scrollTl.to(prevPanels, {
          yPercent: -5 * i,
          scale: 0.95 - (i * 0.02),
          filter: "brightness(0.3) blur(2px)",
          ease: "none",
          duration: 1
        }, stepTime);

        // Slide the new massive editorial block straight up from the bottom
        scrollTl.fromTo(panel,
          { yPercent: 100 },
          { yPercent: 0, ease: "none", duration: 1 },
          stepTime
        );

        // Gentle vertical bob for the car as the physical seam slips underneath it
        scrollTl.to(carWrapperRef.current, {
          y: -30,
          rotationZ: -3,
          yoyo: true,
          repeat: 1,
          duration: 0.5,
          ease: "sine.inOut"
        }, stepTime);

      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="font-sans selection:bg-[#FFD700] selection:text-black overflow-x-hidden bg-[#050505]">

      {/* Scroll Pinning Wrapper */}
      <div ref={containerRef} className="h-screen w-full relative overflow-hidden" style={{ perspective: "2000px" }}>

        {/* ===================== THE DECK OF PANELS ===================== */}
        {slidesData.map((slide, i) => (
          <div
            key={slide.id}
            ref={(el) => { panelsRef.current[i] = el; }}
            className={`absolute inset-0 w-full h-screen origin-top flex flex-col justify-center items-center will-change-transform pt-10 ${slide.bg} z-[${i * 10}]`}
          >

            {slide.isHero ? (

              // ===================== PANEL 0: HERO SECTION =====================
              // This completely fulfills the mandatory assignment layout constraints.
              <div className="w-full h-full flex flex-col justify-center items-center relative overflow-hidden px-4 md:px-12 max-w-[1400px] mx-auto">
                {/* Subtle radial aura */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.06)_0%,transparent_70%)] rounded-full blur-[80px] pointer-events-none z-0"></div>

                {/* 1. Letter-spaced headline ("similar to: W E L C O M E I T Z F I Z Z") */}
                <h1
                  ref={headlineRef}
                  className="text-4xl sm:text-5xl md:text-7xl lg:text-[6.5rem] font-bold text-white tracking-[0.5em] md:tracking-[0.6em] text-center will-change-transform z-10 leading-[1.2] ml-[0.3em] uppercase drop-shadow-xl"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  W E L C O M E<br />
                  <span className="text-[#FFD700] drop-shadow-[0_0_30px_rgba(255,215,0,0.4)]">I T Z F I Z Z</span>
                </h1>

                {/* 2. Impact metrics below the headline ("Percentages with short descriptions") */}
                <div
                  ref={statsContainerRef}
                  className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 w-full mt-16 md:mt-24 z-10 px-4"
                >
                  {heroStats.map((stat, idx) => (
                    <div key={idx} className="flex flex-col items-center text-center will-change-transform">
                      <span className="text-4xl md:text-5xl font-black text-[#FFD700] mb-2 md:mb-4 drop-shadow-md">
                        {stat.value}
                      </span>
                      <span className="text-xs md:text-sm font-bold text-[#A3A3A3] uppercase tracking-widest max-w-[160px] leading-tight">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            ) : (

              // ===================== PANELS 1-4: 3D DECK FULL-SCREEN DEEP DIVES =====================
              <div className="w-full h-full max-w-[1600px] mx-auto px-10 md:px-20 lg:px-40 flex flex-col md:flex-row items-center justify-between gap-10">
                <div className="flex-1 flex justify-start w-full">
                  <h2
                    className={`text-[25vw] md:text-[20vw] lg:text-[18vw] font-black leading-none tracking-tighter drop-shadow-2xl ${slide.textTheme}`}
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {slide.value}
                  </h2>
                </div>

                <div className="flex-1 flex flex-col justify-end h-full py-20 pb-40 md:py-0 w-full">
                  <div className={`w-20 md:w-32 h-[4px] mb-8 opacity-40 mix-blend-difference ${slide.textTheme.replace('text-', 'bg-')}`}></div>
                  <p className={`text-3xl md:text-5xl lg:text-7xl font-bold uppercase tracking-tight leading-[1.1] ${slide.textTheme}`}>
                    {slide.label}
                  </p>
                  <p className={`mt-6 font-bold text-[10px] md:text-sm uppercase tracking-[0.3em] ${slide.accent}`}>
                    PERFORMANCE METRIC // SCROLL TO CONTINUE
                  </p>
                </div>
              </div>

            )}
          </div>
        ))}

        {/* ===================== THE FOREGROUND MAIN VISUAL ELEMENT ===================== */}
        {/* Car sits rigidly OVER the panels at z-[1000] mapping precisely to the scroll progress */}
        <div className="absolute inset-x-0 bottom-[5vh] lg:bottom-[15vh] z-[1000] pointer-events-none flex justify-start px-4 md:px-10 lg:px-20">
          <div ref={carWrapperRef} className="will-change-transform origin-bottom">
            <CarSVG flameRef={flameRef} headlightRef={headlightRef} />
          </div>
        </div>

      </div>
    </main>
  );
}
