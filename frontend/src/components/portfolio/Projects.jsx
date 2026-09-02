import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, MoveRight } from "lucide-react";
import { projects } from "@/data/projects";

export default function Projects() {
  const sectionRef = useRef(null);
  const railRef = useRef(null);
  const [range, setRange] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (railRef.current) {
        setRange(Math.max(0, railRef.current.scrollWidth - window.innerWidth + 96));
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef });
  const x = useTransform(scrollYProgress, [0, 1], [0, -range]);

  return (
    <section id="work" ref={sectionRef} className="relative h-[420vh] px-3 md:px-6 py-6" data-testid="projects-section">
      <div className="sticky top-6 h-[calc(100vh-3rem)] bg-paper border border-line overflow-hidden flex items-center">
        <motion.div ref={railRef} style={{ x }} className="flex items-stretch gap-6 md:gap-10 px-8 md:px-14 will-change-transform">
          {/* intro panel */}
          <div className="w-[78vw] md:w-[34rem] shrink-0 flex flex-col justify-center pr-4">
            <p className="font-mono2 text-[11px] uppercase tracking-[0.3em] text-espresso mb-6" data-testid="projects-label">
              Selected Work
            </p>
            <h2 className="font-body font-extrabold tracking-[-0.03em] leading-[0.95] text-4xl md:text-6xl">
              Systems shipped,<br />
              <span className="font-display italic font-medium text-espresso tracking-normal">problems solved.</span>
            </h2>
            <p className="mt-8 text-sm text-ink/60 max-w-sm leading-relaxed">
              Five products across SaaS, AI, real estate, security, and fintech — each one built end to end.
            </p>
            <p className="mt-10 inline-flex items-center gap-3 font-mono2 text-[11px] uppercase tracking-[0.2em] text-rust">
              Keep scrolling — the shelf slides sideways <MoveRight className="w-4 h-4" />
            </p>
          </div>

          {projects.map((p) => (
            <article
              key={p.n}
              className="group w-[80vw] md:w-[30rem] shrink-0 border border-line bg-paper p-7 md:p-9 flex flex-col hover:bg-cream/60 transition-colors duration-500"
              data-testid={`project-card-${p.n}`}
            >
              <div className="flex items-start justify-between mb-6">
                <span className="font-display italic text-4xl text-tan group-hover:text-espresso transition-colors duration-500">{p.n}</span>
                <Link
                  to={`/work/${p.slug}`}
                  data-testid={`project-link-${p.n}`}
                  className="w-10 h-10 rounded-full border border-line flex items-center justify-center group-hover:border-ink group-hover:bg-ink transition-all duration-500"
                  aria-label={`Read the ${p.title} case study`}
                >
                  <ArrowUpRight className="w-4 h-4 text-ink group-hover:text-paper transition-colors duration-500" />
                </Link>
              </div>

              {p.logo ? (
                <div className="mb-6 h-44 border border-line overflow-hidden bg-paper" data-testid={`project-logo-${p.n}`}>
                  <img
                    src={p.logo}
                    alt={`${p.title} logo`}
                    className="w-full h-full object-cover grayscale opacity-70 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-[1.03]"
                  />
                </div>
              ) : p.image ? (
                <div className="mb-6 overflow-hidden border border-line" data-testid={`project-image-${p.n}`}>
                  <img src={p.image} alt={`${p.title} screenshot`} className="w-full h-44 object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-700" />
                </div>
              ) : (
                <div className="bg-ink mb-6 overflow-hidden" data-testid={`project-code-${p.n}`}>
                  <div className="flex items-center gap-1.5 px-4 py-3 border-b border-paper/10">
                    <span className="w-2 h-2 rounded-full bg-espresso" />
                    <span className="w-2 h-2 rounded-full bg-rust" />
                    <span className="w-2 h-2 rounded-full bg-tan" />
                    <span className="ml-2 font-mono2 text-[10px] text-paper/40 tracking-widest">{p.file}</span>
                  </div>
                  <div className="px-4 py-4 font-mono2 text-[10px] md:text-[11px] leading-[1.85] overflow-x-auto">
                    {p.code.map((line, li) => (
                      <div key={li} className="whitespace-pre">
                        {line.map((seg, si) => (
                          <span key={si} className={seg.c}>{seg.t}</span>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <h3 className="font-body font-extrabold tracking-[-0.02em] text-2xl md:text-3xl" data-testid={`project-title-${p.n}`}>
                <Link to={`/work/${p.slug}`} className="hover:text-espresso transition-colors duration-300">
                  {p.title}
                </Link>
                <span className="text-rust">.</span>
              </h3>
              <p className="font-display italic text-lg text-espresso mt-1 mb-4">{p.kind}</p>
              <p className="text-sm leading-relaxed text-ink/70 mb-8">{p.desc}</p>
              <ul className="mt-auto flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <li key={s} className="font-mono2 text-[10px] uppercase tracking-[0.15em] border border-line px-3 py-1.5 text-ink/70">
                    {s}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </motion.div>

        {/* progress hairline */}
        <div className="absolute bottom-7 left-8 md:left-14 right-8 md:right-14 h-px bg-line">
          <motion.div style={{ scaleX: scrollYProgress }} className="h-full bg-espresso origin-left" />
        </div>
      </div>
    </section>
  );
}
