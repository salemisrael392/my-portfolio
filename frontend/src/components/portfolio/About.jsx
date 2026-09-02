import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1];

const chapters = [
  {
    n: "01",
    title: "Craft",
    body: "Code is an editorial act. Every function is a sentence, every module a paragraph. Israel writes software the way a careful writer drafts prose — deliberate, readable, and stripped of everything that does not serve the reader.",
  },
  {
    n: "02",
    title: "Systems",
    body: "A product is only as honest as its architecture. From queues and caches to service boundaries and failure domains, he designs systems that degrade gracefully and scale without ceremony.",
  },
  {
    n: "03",
    title: "Discipline",
    body: "Tests, tracing, and telemetry are not chores — they are the contract. What gets measured gets trusted. Shipping is a rhythm, not an event, and reliability is a feature users feel.",
  },
];

export default function About() {
  return (
    <section id="about" className="px-3 md:px-6 py-6" data-testid="about-section">
      <div className="bg-paper border border-line px-6 md:px-14 py-20 md:py-28">
        <div className="flex items-end justify-between mb-16 md:mb-20">
          <div>
            <p className="font-mono2 text-[11px] uppercase tracking-[0.3em] text-espresso mb-6" data-testid="about-label">
              About / Manifesto
            </p>
            <h2 className="font-display italic font-medium text-4xl md:text-5xl leading-tight">
              Three chapters,<br />one practice.
            </h2>
          </div>
          <p className="hidden md:block font-mono2 text-sm text-ink/50">01 — 03</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0">
          {chapters.map((c, i) => (
            <motion.div
              key={c.n}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: i * 0.12, ease: EASE }}
              className="group md:px-10 md:border-l md:border-line md:first:border-l-0 md:first:pl-0 md:last:pr-0"
              data-testid={`about-chapter-${c.n}`}
            >
              <span className="block font-display italic text-6xl md:text-7xl text-tan group-hover:text-espresso transition-colors duration-500 mb-6">
                {c.n}
              </span>
              <h3 className="font-body font-extrabold uppercase tracking-[-0.02em] text-2xl md:text-3xl mb-4">
                {c.title}
              </h3>
              <p className="text-base leading-relaxed text-ink/70">{c.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
