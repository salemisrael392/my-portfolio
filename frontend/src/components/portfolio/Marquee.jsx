const items = [
  "Full-Stack Engineering",
  "System Architecture",
  "API Design",
  "Distributed Systems",
  "Observability",
  "Infrastructure as Code",
  "Performance",
  "Reliability",
];

export default function Marquee() {
  const row = (key) => (
    <div key={key} className="flex items-center shrink-0">
      {items.map((item, i) => (
        <span key={i} className="flex items-center shrink-0">
          <span
            className={
              i % 2 === 0
                ? "font-body font-extrabold uppercase tracking-[-0.02em] text-2xl md:text-4xl px-8"
                : "font-display italic text-2xl md:text-4xl text-espresso px-8"
            }
          >
            {item}
          </span>
          <span className="w-2 h-2 bg-tan rotate-45 shrink-0" />
        </span>
      ))}
    </div>
  );

  return (
    <section className="border-y border-line bg-paper py-6 overflow-hidden" data-testid="marquee-section">
      <div className="marquee-track flex w-max">
        {row("a")}
        {row("b")}
      </div>
    </section>
  );
}
