import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1];

const columns = [
  { title: "Languages", items: ["TypeScript", "Python", "Go", "Rust", "SQL"] },
  { title: "Backend", items: ["FastAPI", "Node.js", "gRPC", "GraphQL", "REST"] },
  { title: "Frontend", items: ["React", "Next.js", "Framer Motion", "Tailwind", "Vite"] },
  { title: "Systems & Infra", items: ["Kubernetes", "Terraform", "AWS", "Postgres", "Redis / Kafka"] },
];

export default function Skills() {
  return (
    <section id="skills" className="px-3 md:px-6 py-6" data-testid="skills-section">
      <div className="bg-ink text-paper px-6 md:px-14 py-20 md:py-28">
        <div className="flex items-end justify-between mb-16 md:mb-20">
          <div>
            <p className="font-mono2 text-[11px] uppercase tracking-[0.3em] text-tan mb-6" data-testid="skills-label">
              Capability Matrix
            </p>
            <h2 className="font-body font-extrabold tracking-[-0.03em] leading-[0.95] text-4xl md:text-6xl">
              The <span className="font-display italic font-medium text-tan tracking-normal">stack,</span><br />
              end to end.
            </h2>
          </div>
          <p className="hidden md:block font-mono2 text-sm text-paper/40">05 — tools</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-paper/10 border border-paper/10">
          {columns.map((col, i) => (
            <motion.div
              key={col.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
              className="bg-ink p-8 md:p-10 group hover:bg-[#181310] transition-colors duration-500"
              data-testid={`skills-col-${i}`}
            >
              <p className="font-mono2 text-[10px] uppercase tracking-[0.25em] text-tan mb-8">
                {String(i + 1).padStart(2, "0")} / {col.title}
              </p>
              <ul className="space-y-3">
                {col.items.map((item, j) => (
                  <li
                    key={item}
                    className="flex items-baseline gap-3 text-sm text-paper/80 group-hover:text-paper transition-colors duration-500"
                    data-testid={`skill-item-${i}-${j}`}
                  >
                    <span className="font-mono2 text-[9px] text-paper/30">{String(j + 1).padStart(2, "0")}</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
