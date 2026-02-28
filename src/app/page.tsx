"use client";

import { useEffect, useRef, useState } from "react";
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
  { value: "90%", label: "FASTER LOAD TIME VS BENCHMARK", color: "bg-[#FFD700]", text: "text-[#1A1A1A]", numericValue: 90, suffix: "%" },
  { value: "98%", label: "LIGHTHOUSE PERFORMANCE SCORE", color: "bg-[#1A1A1A]", text: "text-white", numericValue: 98, suffix: "%" },
  { value: "60%", label: "LESS CPU USAGE DURING SCROLL", color: "bg-white", text: "text-[#1A1A1A]", border: "border-[3px] border-[#1A1A1A]", numericValue: 60, suffix: "%" },
  { value: "0%", label: "LAYOUT REFLOWS DURING ANIMATION", color: "bg-[#F5F6F8]", text: "text-[#1A1A1A]", numericValue: 0, suffix: "%" },
];

const CounterStat = ({ numericValue, suffix, isWord }: { numericValue: number, suffix: string, isWord?: boolean }) => {
  const counterRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current || !counterRef.current) return;
    hasAnimated.current = true;

    if (isWord) {
      counterRef.current.textContent = "Zero";
      return;
    }

    const obj = { val: 0 };
    gsap.to(obj, {
      val: numericValue,
      duration: 1.8,
      delay: 2.5,
      ease: "power2.out",
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = Math.round(obj.val) + suffix;
        }
      }
    });
  }, [numericValue, suffix, isWord]);

  return <span ref={counterRef}>{isWord ? "Zero" : `0${suffix}`}</span>;
};

const ExhaustSmoke = ({ exhaustRef }: { exhaustRef: React.RefObject<HTMLDivElement | null> }) => (
  <div
    ref={exhaustRef}
    className="absolute pointer-events-none opacity-0"
    style={{ left: '-30px', top: '50%', transform: 'translateY(-50%)' }}
  >
    {[...Array(6)].map((_, i) => (
      <div
        key={i}
        className="absolute rounded-full"
        style={{
          width: `${4 + i * 3}px`,
          height: `${4 + i * 3}px`,
          left: `${-i * 12}px`,
          top: `${(i % 2 === 0 ? -1 : 1) * (i * 2)}px`,
          background: 'rgba(180,180,180,0.3)',
          filter: `blur(${2 + i}px)`,
          opacity: 1 - i * 0.15,
        }}
      />
    ))}
  </div>
);

// Floating Dust Particles for the Night Sky
const Particles = () => {
  const [particles, setParticles] = useState<{ width: string, height: string, top: string, left: string, delay: string, duration: string, glow: boolean }[]>([]);

  useEffect(() => {
    setParticles([...Array(25)].map(() => {
      const size = Math.random() * 5 + 1;
      return {
        width: size + "px",
        height: size + "px",
        top: Math.random() * 100 + "%",
        left: Math.random() * 100 + "%",
        duration: Math.random() * 12 + 8 + "s",
        delay: "-" + Math.random() * 12 + "s",
        glow: size > 3,
      };
    }));
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-50">
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full mix-blend-screen"
          style={{
            width: p.width,
            height: p.height,
            top: p.top,
            left: p.left,
            background: p.glow ? "radial-gradient(circle, #FFD700 0%, transparent 70%)" : "white",
            filter: p.glow ? "blur(2px)" : "blur(1px)",
            animation: `float ${p.duration} linear infinite`,
            animationDelay: p.delay
          }}
        />
      ))}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 0.8; }
          50% { opacity: 1; }
          90% { opacity: 0.6; }
          100% { transform: translateY(-120px) translateX(60px); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bandRef = useRef<HTMLDivElement>(null);
  const carWrapperRef = useRef<HTMLDivElement>(null);
  const flameRef = useRef<SVGPathElement>(null);
  const headlightRef = useRef<SVGPathElement>(null); // Ignition ref
  const scrollPromptRef = useRef<HTMLDivElement>(null);
  const statsRefs = useRef<(HTMLDivElement | null)[]>([]);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const progressRef = useRef<HTMLDivElement>(null);
  const nightAreaRef = useRef<HTMLDivElement>(null);
  const isRevvingRef = useRef(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const decorSvgsRef = useRef<HTMLDivElement>(null);
  const exhaustRef = useRef<HTMLDivElement>(null);
  const trailCanvasRef = useRef<HTMLCanvasElement>(null);

  // Easter Egg 1: Press the gas pedal
  const handleCarClick = () => {
    if (isRevvingRef.current || !carWrapperRef.current || !flameRef.current) return;
    isRevvingRef.current = true;

    // Massive engine rev
    gsap.timeline({ onComplete: () => { isRevvingRef.current = false; } })
      .to(carWrapperRef.current, { y: -5, rotationZ: -2, duration: 0.1, yoyo: true, repeat: 5 })
      .to(flameRef.current, { opacity: 1, scaleX: 3, x: -60, duration: 0.1 }, 0)
      .to(flameRef.current, { opacity: 0, scaleX: 1, x: 0, duration: 0.5, ease: "power2.in" }, 0.4);
  };

  const handleNightHover = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!trailCanvasRef.current) return;
    const canvas = trailCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 215, 0, 0.3)';
    ctx.fill();

    setTimeout(() => {
      ctx.clearRect(x - 6, y - 6, 12, 12);
    }, 600);
  };

  // Mouse hover effects removed as requested; stats should only move with scroll

  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.set(statsRefs.current, { y: 40, opacity: 0, scale: 0.9 });
      gsap.set(bandRef.current, { clipPath: "inset(0 100% 0 0)" });
      gsap.set(carWrapperRef.current, { x: "-50vw", opacity: 0 });
      gsap.set(letterRefs.current, { opacity: 0, y: 30, rotateX: 90 });

      const loadTl = gsap.timeline();

      loadTl.to(letterRefs.current, {
        opacity: 1, y: 0, rotateX: 0,
        duration: 0.8,
        stagger: 0.04,
        ease: "back.out(1.7)"
      });

      loadTl.to(carWrapperRef.current, { x: "-20vw", opacity: 1, duration: 1.5, ease: "power3.out" }, "-=0.5");

      loadTl.to(headlightRef.current, { opacity: 1, duration: 0.1, yoyo: true, repeat: 3 }, "-=0.2");
      loadTl.to(headlightRef.current, { opacity: 0.8, duration: 0.3 });

      statsRefs.current.forEach((el, i) => {
        if (!el) return;
        loadTl.fromTo(el,
          { y: 150, opacity: 0, scale: 0.9 }, // Changed initial y position to be further down
          { y: 150, opacity: 0, scale: 0.9, duration: 0 }, // We don't animate them in on load anymore, they wait for scroll
          `-=${i === 0 ? 0.3 : 0.35}`
        );
      });

      gsap.to(headlightRef.current, {
        opacity: 0.4,
        duration: 2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 2.5
      });

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=300%",
          scrub: 1,
          pin: true,
          pinType: "fixed",
          onUpdate: (self) => {
            const speedBoost = Math.abs(self.getVelocity());

            gsap.to(carWrapperRef.current, {
              scaleX: 1 + Math.min(speedBoost / 4000, 0.15),
              skewX: -Math.min(self.getVelocity() / 500, 10),
              duration: 0.3,
              overwrite: "auto",
            });

            if (flameRef.current && !isRevvingRef.current) {
              gsap.to(flameRef.current, {
                opacity: Math.min(speedBoost / 600, 1),
                x: -Math.min(speedBoost / 50, 40),
                scaleX: 1 + Math.min(speedBoost / 800, 1),
                duration: 0.2,
                overwrite: "auto"
              });
            }

            if (scrollPromptRef.current) {
              if (self.progress > 0.05) {
                gsap.to(scrollPromptRef.current, { opacity: 0, duration: 0.3, overwrite: "auto" });
              } else {
                gsap.to(scrollPromptRef.current, { opacity: 1, duration: 0.3, overwrite: "auto" });
              }
            }

            if (exhaustRef.current) {
              gsap.to(exhaustRef.current, {
                opacity: Math.min(speedBoost / 500, 0.7),
                duration: 0.2,
                overwrite: "auto"
              });
            }
          }
        },
      });

      scrollTl.fromTo(carWrapperRef.current,
        { x: "-20vw" },
        { x: "120vw", ease: "none" },
        0
      );

      scrollTl.fromTo(bandRef.current,
        { clipPath: "polygon(0% 0%, 0% 0%, -10% 100%, -10% 100%)" },
        { clipPath: "polygon(0% 0%, 150% 0%, 120% 100%, 0% 100%)", ease: "none" },
        0
      );

      if (progressRef.current) {
        scrollTl.fromTo(progressRef.current,
          { scaleX: 0 },
          { scaleX: 1, ease: "none" },
          0
        );
      }

      if (gridRef.current) {
        scrollTl.fromTo(gridRef.current,
          { y: 0 },
          { y: -40, ease: "none" },
          0
        );
      }

      if (decorSvgsRef.current) {
        scrollTl.fromTo(decorSvgsRef.current,
          { y: 0 },
          { y: -80, ease: "none" },
          0
        );
      }

      if (statsRefs.current.length > 0) {
        scrollTl.fromTo(statsRefs.current,
          { y: 150, opacity: 0, scale: 0.8 }, // Start below the screen, invisible
          {
            y: 0, // End at original position
            opacity: 1, // End fully visible
            scale: 1,
            ease: "none",
            stagger: 0.1 // Stagger them slightly as they come in
          }, 0
        );
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    let scrollAccumulator = 0;
    let ticking = false;

    const flushScroll = () => {
      if (scrollAccumulator !== 0) {
        window.scrollBy(0, scrollAccumulator);
        scrollAccumulator = 0;
      }
      ticking = false;
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowUp") {
        e.preventDefault();
        scrollAccumulator += 80;
      } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
        e.preventDefault();
        scrollAccumulator -= 80;
      }
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(flushScroll);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (trailCanvasRef.current) {
      const resize = () => {
        if (!trailCanvasRef.current) return;
        trailCanvasRef.current.width = trailCanvasRef.current.offsetWidth;
        trailCanvasRef.current.height = trailCanvasRef.current.offsetHeight;
      };
      resize();
      window.addEventListener('resize', resize);
      return () => window.removeEventListener('resize', resize);
    }
  }, []);

  useEffect(() => {
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const deltaY = touchStartY - e.touches[0].clientY;
      if (Math.abs(deltaY) > 5) {
        window.scrollBy(0, deltaY * 0.5);
        touchStartY = e.touches[0].clientY;
      }
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return (
    <>
      <main className="bg-[#1A1A1A] font-sans selection:bg-[#FFD700] selection:text-black overflow-x-hidden">

        <section ref={containerRef} className="h-screen w-full relative overflow-hidden">

          {/* ===================== NIGHT THEME (Bottom Base Layer) ===================== */}
          <div
            ref={nightAreaRef}
            onMouseMove={handleNightHover}
            className="absolute inset-0 z-0 overflow-hidden"
          >
            <canvas
              ref={trailCanvasRef}
              className="absolute inset-0 w-full h-full pointer-events-none z-[3]"
              style={{ mixBlendMode: 'screen' }}
            />
            {/* Atmospheric Floating Particles */}
            <Particles />

            {/* Signature Grid Background (Dark Mode) - radial fade */}
            <div
              ref={gridRef}
              className="absolute inset-0 pointer-events-none will-change-transform"
              style={{
                backgroundImage: 'linear-gradient(#2A2A2A 1px, transparent 1px), linear-gradient(90deg, #2A2A2A 1px, transparent 1px)',
                backgroundSize: '40px 40px',
                mask: 'radial-gradient(ellipse 80% 80% at 50% 40%, black 20%, transparent 100%)',
                WebkitMask: 'radial-gradient(ellipse 80% 80% at 50% 40%, black 20%, transparent 100%)'
              }}
            />

            {/* Cinematic Vignette */}
            <div
              className="absolute inset-0 pointer-events-none z-[1]"
              style={{
                background: 'radial-gradient(ellipse 70% 60% at 50% 40%, transparent 0%, rgba(0,0,0,0.6) 100%)'
              }}
            />

            <div ref={decorSvgsRef} className="will-change-transform">
              <div className="absolute top-[8%] left-[4%] opacity-[0.07] transform -rotate-12 pointer-events-none hidden md:block">
                <svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 50 C 30 10, 70 90, 90 50" stroke="#FFD700" strokeWidth="6" strokeLinecap="round" />
                </svg>
              </div>
              <div className="absolute bottom-[15%] right-[4%] opacity-[0.07] transform rotate-45 pointer-events-none">
                <svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50" cy="50" r="40" stroke="#FFD700" strokeWidth="6" strokeDasharray="12 8" />
                </svg>
              </div>
              <div className="absolute top-[60%] left-[8%] opacity-[0.05] pointer-events-none hidden md:block">
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                  <rect x="10" y="10" width="40" height="40" rx="8" stroke="#FFD700" strokeWidth="4" transform="rotate(15 30 30)" />
                </svg>
              </div>
              <div className="absolute top-[15%] right-[12%] opacity-[0.05] pointer-events-none hidden lg:block">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <polygon points="20,2 38,38 2,38" stroke="#FFF" strokeWidth="3" fill="none" />
                </svg>
              </div>
            </div>

            <header className="absolute top-[8%] md:top-[10%] left-0 w-full h-[35vh] md:h-[38vh] flex items-center justify-center pointer-events-none z-[2]">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[300px] h-[300px] md:w-[700px] md:h-[700px] rounded-full bg-[#FFD700]/[0.04] blur-[80px] md:blur-[120px] pointer-events-none" />
              </div>
              <div className="w-full max-w-[1400px] px-4 md:px-8 flex flex-col items-center justify-center gap-2 md:gap-3">
                <h1
                  ref={headlineRef}
                  className="text-[clamp(1.2rem,min(7vw,8vh),10rem)] md:text-[clamp(1.5rem,min(7vw,10vh),10rem)] leading-none font-black tracking-[0.1em] md:tracking-widest uppercase"
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    textShadow: '0 0 60px rgba(255,215,0,0.15), 0 0 120px rgba(255,215,0,0.05)',
                    perspective: '600px'
                  }}
                >
                  {"WELCOME ".split("").map((char, i) => (
                    <span
                      key={i}
                      ref={(el) => { letterRefs.current[i] = el; }}
                      className="inline-block text-white"
                      style={{ opacity: 0 }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </span>
                  ))}
                  {"ITZFIZZ".split("").map((char, i) => (
                    <span
                      key={i + 8}
                      ref={(el) => { letterRefs.current[i + 8] = el; }}
                      className="inline-block text-white"
                      style={{ opacity: 0 }}
                    >
                      {char}
                    </span>
                  ))}
                </h1>
                <p className="text-white/25 text-[8px] md:text-[10px] lg:text-xs tracking-[0.3em] md:tracking-[0.4em] uppercase font-medium">Scroll to explore · Arrow keys to drive</p>
              </div>
              <div className="absolute top-1/2 left-0 w-full h-[1px] -translate-y-1/2 -z-10">
                <div className="w-full h-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
              </div>
            </header>
          </div>

          {/* ===================== DAY THEME (Top Clipped Layer) ===================== */}
          <div
            ref={bandRef}
            className="absolute inset-0 z-10 bg-white overflow-hidden pointer-events-none"
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
            <div className="absolute top-[8%] md:top-[10%] left-0 w-full h-[35vh] md:h-[38vh] flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full bg-[#FFD700]/[0.06] blur-[80px] md:blur-[100px] pointer-events-none" />
              </div>
              <div className="w-full max-w-[1400px] px-4 md:px-8 flex flex-col items-center justify-center gap-2 md:gap-4">
                <h1
                  className="text-[clamp(1.2rem,min(7vw,8vh),10rem)] md:text-[clamp(1.5rem,min(7vw,10vh),10rem)] leading-none font-black tracking-[0.1em] md:tracking-widest text-[#FFD700] uppercase drop-shadow-md"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  WELCOME ITZFIZZ
                </h1>
                <p className="text-[#1A1A1A]/30 text-[8px] md:text-xs lg:text-sm tracking-[0.3em] uppercase font-medium">Scroll to explore · Arrow keys to drive</p>
              </div>
              <div className="absolute top-1/2 left-0 w-full h-[1px] -translate-y-1/2 -z-10">
                <div className="w-full h-full bg-gradient-to-r from-transparent via-[#1A1A1A]/10 to-transparent" />
              </div>
            </div>
          </div>

          {/* ===================== FOREGROUND OVERLAYS (Car & Stats) ===================== */}
          <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">

            <div className="absolute top-[8%] md:top-[10%] left-0 w-full h-[35vh] md:h-[38vh] flex items-center justify-center">
              <div className="w-full max-w-[1400px] relative h-full">
                <div
                  ref={carWrapperRef}
                  onClick={handleCarClick}
                  className="absolute top-1/2 -translate-y-1/2 pointer-events-auto flex items-center cursor-pointer will-change-transform"
                  style={{ left: 0 }}
                >
                  <ExhaustSmoke exhaustRef={exhaustRef} />
                  <div className="-translate-x-[40%] md:-translate-x-[50%]">
                    <CarSVG flameRef={flameRef} headlightRef={headlightRef} />
                  </div>
                </div>
              </div>
            </div>

            <nav className="absolute bottom-[16vh] md:bottom-[12vh] left-0 w-full z-30 pointer-events-none">
              <div className="container">
                <div className="row gx-2 gx-md-3 px-3 px-md-4 pointer-events-auto" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                  {statsData.map((stat, index) => (
                    <div key={index} className="col-6 col-lg-3">
                      <div
                        ref={(el) => { statsRefs.current[index] = el; }}
                        className={`group w-full rounded-xl md:rounded-2xl lg:rounded-3xl p-3 md:p-5 lg:p-8 shadow-lg flex flex-col justify-center items-center text-center will-change-transform transition-shadow duration-500 hover:shadow-2xl ${stat.color} ${stat.text} ${stat.border || ''}`}
                        style={{ transformOrigin: "center bottom", fontFamily: "'Inter', sans-serif" }}
                      >
                        <h2 className="text-2xl md:text-3xl lg:text-5xl font-extrabold mb-0.5 md:mb-1 lg:mb-2 pointer-events-none tracking-tight transition-transform duration-300 group-hover:scale-105">
                          <CounterStat numericValue={stat.numericValue} suffix={stat.suffix} />
                        </h2>
                        <div className="w-8 md:w-10 h-[2px] bg-current rounded-full mb-1.5 md:mb-2 lg:mb-3 opacity-20 pointer-events-none"></div>
                        <p className="font-semibold text-[7px] md:text-[9px] lg:text-[11px] uppercase tracking-wider max-w-[120px] md:max-w-[180px] pointer-events-none leading-relaxed">
                          {stat.label}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </nav>

          </div>

        </section>
      </main>
      <div ref={scrollPromptRef} className="fixed bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center pointer-events-none">
        <span className="text-white/30 text-[9px] md:text-[10px] font-bold tracking-[0.3em] uppercase mb-1.5">Scroll</span>
        <div className="flex flex-col items-center gap-0.5 animate-bounce">
          <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-white/10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        </div>
      </div>
      <div
        ref={progressRef}
        className="fixed top-0 left-0 h-[3px] z-[100] pointer-events-none"
        style={{
          width: '100%',
          transformOrigin: 'left center',
          transform: 'scaleX(0)',
          background: 'linear-gradient(90deg, #FFD700, #FFD700/80, transparent)'
        }}
      />
    </>
  );
}
