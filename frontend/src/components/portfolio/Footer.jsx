import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="px-3 md:px-6 pb-6" data-testid="site-footer">
      <div className="bg-paper border border-line px-6 md:px-14 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <p className="font-mono2 text-[11px] text-ink/60 tracking-wider" data-testid="footer-copy">
          © 2026 Israel — Full-Stack Engineer & Systems Architect
        </p>
        <div className="flex items-center gap-8">
          <a href="mailto:salemisrael392@gmail.com" data-testid="footer-email" className="link-underline font-mono2 text-[11px] uppercase tracking-[0.18em] text-ink/70 hover:text-ink transition-colors">Email</a>
          <a href="https://github.com/salemisrael392" target="_blank" rel="noopener noreferrer" data-testid="footer-github" className="link-underline font-mono2 text-[11px] uppercase tracking-[0.18em] text-ink/70 hover:text-ink transition-colors">GitHub</a>
          <a href="https://www.linkedin.com/in/israel-ibrahim-a8b816340" target="_blank" rel="noopener noreferrer" data-testid="footer-linkedin" className="link-underline font-mono2 text-[11px] uppercase tracking-[0.18em] text-ink/70 hover:text-ink transition-colors">LinkedIn</a>
          <Link to="/dashboard" data-testid="footer-inbox-link" className="link-underline font-mono2 text-[11px] uppercase tracking-[0.18em] text-espresso">
            Inbox
          </Link>
        </div>
      </div>
    </footer>
  );
}
