import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1];

const LiveClock = () => {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const time = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit", minute: "2-digit", second: "2-digit", timeZone: "Africa/Lagos",
  }).format(now);
  return <span data-testid="hero-local-time">{time} UTC+1</span>;
};

const MaskedLine = ({ children, delay = 0, className = "" }) => (
  <span className={`block overflow-hidden ${className}`}>
    <motion.span
      className="block"
      initial={{ y: "115%" }}
      animate={{ y: 0 }}
      transition={{ duration: 1.1, delay, ease: EASE }}
    >
      {children}
    </motion.span>
  </span>
);

const codeLines = [
  [
    { t: "// architecture, as a discipline", c: "text-paper/40" },
  ],
  [
    { t: "const ", c: "text-tan" },
    { t: "system", c: "text-paper" },
    { t: " = ", c: "text-paper/60" },
    { t: "await ", c: "text-tan" },
    { t: "architect", c: "text-rust" },
    { t: "({", c: "text-paper/60" },
  ],
  [
    { t: "  services: ", c: "text-paper/70" },
    { t: '["api", "workers", "queue"]', c: "text-tan" },
    { t: ",", c: "text-paper/60" },
  ],
  [
    { t: "  database: ", c: "text-paper/70" },
    { t: '"postgres"', c: "text-tan" },
    { t: ", cache: ", c: "text-paper/70" },
    { t: '"redis"', c: "text-tan" },
    { t: ",", c: "text-paper/60" },
  ],
  [
    { t: "  deploy: ", c: "text-paper/70" },
    { t: '"kubernetes"', c: "text-tan" },
    { t: ", ", c: "text-paper/60" },
  ],
  [
    { t: "  uptime: ", c: "text-paper/70" },
    { t: '"99.99%"', c: "text-rust" },
  ],
  [
    { t: "});", c: "text-paper/60" },
  ],
  [{ t: "" }],
  [
    { t: "system", c: "text-paper" },
    { t: ".", c: "text-paper/60" },
    { t: "scale", c: "text-rust" },
    { t: "({ to: ", c: "text-paper/60" },
    { t: '"planet"', c: "text-tan" },
    { t: " });", c: "text-paper/60" },
  ],
];

export default function Hero() {
  const sectionRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const visualY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const headY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 120, damping: 18 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 120, damping: 18 });

  const onMouseMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section id="top" ref={sectionRef} className="px-3 md:px-6 pt-3 md:pt-6 pb-6" data-testid="hero-section">
      <div className="relative bg-paper border border-line min-h-[calc(100vh-3rem)] flex flex-col">
        <div className="flex-1 grid grid-cols-12 gap-0 pt-28 md:pt-32 pb-10 px-6 md:px-14">
          {/* left: headline */}
          <motion.div style={{ y: isDesktop ? headY : 0 }} className="col-span-12 lg:col-span-7 relative z-20 flex flex-col justify-center">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="font-mono2 text-[11px] uppercase tracking-[0.3em] text-espresso mb-6"
              data-testid="hero-eyebrow"
            >
              <span className="bg-espresso text-paper px-2 py-1 font-bold tracking-[0.3em]">ISRAEL</span>
              <span className="ml-3">— Portfolio © 2026</span>
            </motion.p>
            <h1
              className="font-body font-extrabold tracking-[-0.04em] leading-[0.94] text-[clamp(3rem,8.5vw,7.5rem)]"
              data-testid="hero-headline"
            >
              <MaskedLine delay={0.15}>Full-Stack</MaskedLine>
              <MaskedLine delay={0.28}>
                <span className="font-display italic font-medium text-espresso tracking-normal">engineer</span>
                <span className="text-rust"> &</span>
              </MaskedLine>
              <MaskedLine delay={0.41}>Systems</MaskedLine>
              <MaskedLine delay={0.54}>Architect</MaskedLine>
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.9, ease: EASE }}
              className="mt-14 md:mt-20 max-w-xs"
            >
              <p className="font-mono2 text-2xl md:text-3xl font-light mb-4" data-testid="hero-year">2020</p>
              <p className="text-sm leading-relaxed text-ink/70" data-testid="hero-blurb">
                <span className="font-bold text-ink">ISRAEL</span> is a full-stack engineer and systems architect. He designs and ships
                resilient software — from the interface down to the infrastructure it runs on.
              </p>
            </motion.div>
          </motion.div>

          {/* center: clipped code visual */}
          <div className="col-span-12 lg:col-span-3 relative flex items-center justify-center py-14 lg:py-0 lg:-ml-44 z-10" style={{ perspective: 1200 }}>
            <motion.div
              style={{
                y: isDesktop ? visualY : 0,
                rotateX: isDesktop ? rotateX : 0,
                rotateY: isDesktop ? rotateY : 0,
                transformStyle: "preserve-3d",
              }}
              onMouseMove={onMouseMove}
              onMouseLeave={() => { mx.set(0); my.set(0); }}
              initial={{ clipPath: "inset(100% 0 0 0)" }}
              animate={{ clipPath: "inset(0% 0 0 0)" }}
              transition={{ duration: 1.3, delay: 0.7, ease: EASE }}
              className="w-full max-w-[380px] aspect-[3/4] bg-ink shadow-[0_40px_80px_-30px_rgba(17,17,17,0.45)]"
              data-testid="hero-code-visual"
            >
              <div className="flex items-center gap-1.5 px-5 pt-5 pb-4 border-b border-paper/10">
                <span className="w-2.5 h-2.5 rounded-full bg-espresso" />
                <span className="w-2.5 h-2.5 rounded-full bg-rust" />
                <span className="w-2.5 h-2.5 rounded-full bg-tan" />
                <span className="ml-3 font-mono2 text-[10px] text-paper/40 tracking-widest">system.ts</span>
              </div>
              <div className="px-5 py-5 font-mono2 text-[11px] md:text-xs leading-[1.9]">
                {codeLines.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2 + i * 0.09, duration: 0.5 }}
                    className="whitespace-pre"
                  >
                    {line.map((seg, j) => (
                      <span key={j} className={seg.c}>{seg.t}</span>
                    ))}
                  </motion.div>
                ))}
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1.1, repeat: Infinity }}
                  className="inline-block w-2 h-4 bg-tan align-middle"
                />
              </div>
            </motion.div>
          </div>

          {/* right: stat + location */}
          <div className="col-span-12 lg:col-span-2 flex flex-col sm:flex-row sm:items-end sm:justify-between lg:flex-col lg:items-end gap-8 lg:gap-10 z-20 lg:pl-4">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.9, ease: EASE }}
              className="lg:text-right"
            >
              <p className="font-body font-extrabold tracking-[-0.03em] text-3xl md:text-5xl whitespace-nowrap" data-testid="hero-range">
                Web <span className="text-espresso font-light">—</span> Kernel
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.25, duration: 0.9, ease: EASE }}
              className="sm:text-right lg:text-right"
            >
              <p className="text-sm font-medium" data-testid="hero-location">Remote-first</p>
              <p className="text-sm text-ink/70">Worldwide</p>
              <div className="flex sm:justify-end items-center gap-2 mt-4" data-testid="availability-badge">
                <span className="relative flex w-2 h-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tan opacity-75" />
                  <span className="relative inline-flex rounded-full w-2 h-2 bg-espresso" />
                </span>
                <span className="font-mono2 text-[10px] uppercase tracking-[0.2em] text-espresso">Available for work</span>
              </div>
              <p className="font-mono2 text-[11px] text-rust mt-2 tracking-wider"><LiveClock /></p>
              <a
                href="#work"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.querySelector("#work");
                  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -20 });
                }}
                data-testid="hero-cta-button"
                className="group mt-8 inline-flex w-14 h-14 rounded-full border border-ink items-center justify-center transition-colors duration-500 hover:bg-ink"
              >
                <ArrowRight className="w-5 h-5 -rotate-45 text-ink transition-all duration-500 group-hover:text-paper group-hover:rotate-0" />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
