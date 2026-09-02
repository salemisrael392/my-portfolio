import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { projects } from "@/data/projects";

const EASE = [0.16, 1, 0.3, 1];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 36 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: EASE },
});

export default function CaseStudy() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);
  const next = project ? projects[(projects.indexOf(project) + 1) % projects.length] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <div className="grain bg-cream text-ink min-h-screen px-3 md:px-6 py-6" data-testid="case-study-not-found">
        <div className="bg-paper border border-line min-h-[calc(100vh-3rem)] px-6 md:px-14 py-14 flex flex-col items-start justify-center">
          <p className="font-display italic text-4xl text-ink/60 mb-8">That project doesn't exist.</p>
          <Link to="/" data-testid="case-back-link" className="link-underline font-mono2 text-[11px] uppercase tracking-[0.18em] text-espresso">
            Back to portfolio
          </Link>
        </div>
      </div>
    );
  }

  const chapters = [
    { key: "problem", label: "The Problem", n: "01", text: project.story.problem },
    { key: "built", label: "What I Built", n: "02", text: project.story.built },
    { key: "outcome", label: "The Outcome", n: "03", text: project.story.outcome },
  ];

  return (
    <div className="grain bg-cream text-ink min-h-screen px-3 md:px-6 py-6" data-testid="case-study-page">
      <div className="bg-paper border border-line min-h-[calc(100vh-3rem)] px-6 md:px-14 py-10 md:py-14">
        <div className="flex items-start justify-between mb-16 md:mb-24">
          <Link
            to="/"
            data-testid="case-back-link"
            className="group inline-flex items-center gap-3 font-mono2 text-[11px] uppercase tracking-[0.18em] text-ink/70 hover:text-ink transition-colors"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-500 group-hover:-translate-x-1" />
            All work
          </Link>
          <p className="font-mono2 text-sm font-bold tracking-[0.2em]">ISRAEL<span className="text-rust">.</span></p>
        </div>

        <div className="grid grid-cols-12 gap-8 mb-16 md:mb-24">
          <motion.div {...fadeUp(0.05)} className="col-span-12 lg:col-span-8">
            <p className="font-mono2 text-[11px] uppercase tracking-[0.3em] text-espresso mb-6" data-testid="case-index">
              Case Study {project.n} / 05
            </p>
            <h1
              className="font-body font-extrabold tracking-[-0.03em] leading-[0.95] text-5xl md:text-7xl"
              data-testid="case-study-title"
            >
              {project.title}
              <span className="text-rust">.</span>
            </h1>
            <p className="font-display italic text-2xl md:text-3xl text-espresso mt-4">{project.kind}</p>
          </motion.div>
          <motion.div {...fadeUp(0.15)} className="col-span-12 lg:col-span-4 flex flex-col justify-end gap-6 lg:text-right">
            <div>
              <p className="font-mono2 text-[10px] uppercase tracking-[0.25em] text-ink/50 mb-1">Role</p>
              <p className="text-sm font-medium" data-testid="case-role">{project.role}</p>
            </div>
            <div>
              <p className="font-mono2 text-[10px] uppercase tracking-[0.25em] text-ink/50 mb-1">Year</p>
              <p className="text-sm font-medium" data-testid="case-year">{project.year}</p>
            </div>
            <ul className="flex flex-wrap gap-2 lg:justify-end">
              {project.stack.map((s) => (
                <li key={s} className="font-mono2 text-[10px] uppercase tracking-[0.15em] border border-line px-3 py-1.5 text-ink/70">
                  {s}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {project.logo ? (
          <motion.div {...fadeUp(0.25)} className="mb-16 md:mb-24 border border-line overflow-hidden h-64 md:h-80 bg-paper" data-testid="case-logo">
            <img src={project.logo} alt={`${project.title} logo`} className="w-full h-full object-cover" />
          </motion.div>
        ) : (
        <motion.div {...fadeUp(0.25)} className="bg-ink mb-16 md:mb-24 overflow-hidden" data-testid="case-code-window">
          <div className="flex items-center gap-1.5 px-5 py-4 border-b border-paper/10">
            <span className="w-2.5 h-2.5 rounded-full bg-espresso" />
            <span className="w-2.5 h-2.5 rounded-full bg-rust" />
            <span className="w-2.5 h-2.5 rounded-full bg-tan" />
            <span className="ml-3 font-mono2 text-[10px] text-paper/40 tracking-widest">{project.file}</span>
          </div>
          <div className="px-5 py-6 font-mono2 text-xs md:text-sm leading-[1.9] overflow-x-auto">
            {project.code.map((line, li) => (
              <div key={li} className="whitespace-pre">
                {line.map((seg, si) => (
                  <span key={si} className={seg.c}>{seg.t}</span>
                ))}
              </div>
            ))}
          </div>
        </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0 mb-20 md:mb-28">
          {chapters.map((c, i) => (
            <motion.div
              key={c.key}
              {...fadeUp(0.1 + i * 0.12)}
              className="md:px-10 md:border-l md:border-line md:first:border-l-0 md:first:pl-0 md:last:pr-0"
              data-testid={`case-story-${c.key}`}
            >
              <span className="block font-display italic text-6xl text-tan mb-6">{c.n}</span>
              <h2 className="font-body font-extrabold uppercase tracking-[-0.02em] text-2xl mb-4">{c.label}</h2>
              <p className="text-base leading-relaxed text-ink/70">{c.text}</p>
            </motion.div>
          ))}
        </div>

        {next && (
          <Link
            to={`/work/${next.slug}`}
            data-testid="case-next-link"
            className="group block border-t border-line pt-12"
          >
            <p className="font-mono2 text-[11px] uppercase tracking-[0.3em] text-espresso mb-4">Next project</p>
            <div className="flex items-center justify-between gap-6">
              <span className="font-body font-extrabold tracking-[-0.03em] text-4xl md:text-6xl group-hover:text-espresso transition-colors duration-500">
                {next.title}<span className="text-rust">.</span>
              </span>
              <ArrowRight className="w-8 h-8 shrink-0 text-ink transition-all duration-500 group-hover:translate-x-2 group-hover:text-espresso" />
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
