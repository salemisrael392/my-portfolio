import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const links = [
  { label: "Work", href: "#work", id: "work" },
  { label: "About", href: "#about", id: "about" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Contact", href: "#contact", id: "contact" },
];

const scrollTo = (hash) => (e) => {
  e.preventDefault();
  const el = document.querySelector(hash);
  if (!el) return;
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -20 });
  else el.scrollIntoView({ behavior: "smooth" });
};

export default function Nav() {
  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 bg-cream/80 backdrop-blur-md"
      data-testid="site-nav"
    >
      <div className="mx-auto max-w-[1400px] px-4 md:px-10 py-4 md:py-5 flex items-center justify-between gap-4">
        <a
          href="#top"
          onClick={scrollTo("#top")}
          data-testid="nav-logo"
          className="font-mono2 leading-none shrink-0"
        >
          <span className="text-sm font-bold tracking-[0.2em]">ISRAEL<span className="text-rust">.</span></span>
          <span className="hidden md:block text-[10px] text-espresso/60 mt-1 font-light tracking-[0.15em]">FS — SA</span>
        </a>
        <nav className="flex items-center gap-3.5 md:gap-8 overflow-x-auto">
          {links.map((l) => (
            <a
              key={l.id}
              href={l.href}
              onClick={scrollTo(l.href)}
              data-testid={`nav-link-${l.id}`}
              className="link-underline font-mono2 text-[10px] md:text-[11px] uppercase tracking-[0.14em] md:tracking-[0.18em] text-ink/80 hover:text-ink transition-colors duration-300 whitespace-nowrap"
            >
              {l.label}
            </a>
          ))}
          <Link
            to="/dashboard"
            data-testid="nav-link-inbox"
            className="link-underline font-mono2 text-[10px] md:text-[11px] uppercase tracking-[0.14em] md:tracking-[0.18em] text-espresso whitespace-nowrap"
          >
            Inbox
          </Link>
        </nav>
      </div>
    </motion.header>
  );
}
