import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { ArrowRight, Loader2 } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1];
const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await axios.post(`${API}/messages`, form);
      toast.success("Message received. Israel will get back to you.");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      toast.error("Could not send your message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const inputCls =
    "w-full bg-transparent border-b border-line focus:border-espresso outline-none py-4 text-base placeholder:text-ink/30 transition-colors duration-500";

  return (
    <section id="contact" className="px-3 md:px-6 py-6" data-testid="contact-section">
      <div className="bg-paper border border-line px-6 md:px-14 py-20 md:py-28">
        <div className="grid grid-cols-12 gap-6 md:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: EASE }}
            className="col-span-12 lg:col-span-6"
          >
            <p className="font-mono2 text-[11px] uppercase tracking-[0.3em] text-espresso mb-6" data-testid="contact-label">
              Contact
            </p>
            <h2 className="font-display italic font-medium leading-[1.05] text-5xl md:text-6xl lg:text-7xl" data-testid="contact-heading">
              Let's build<br />something that<br />
              <span className="not-italic font-body font-extrabold tracking-[-0.03em]">lasts.</span>
            </h2>
            <p className="mt-8 text-base text-ink/70 max-w-md leading-relaxed">
              Systems to design, products to ship, teams to support — write a few lines
              and it lands directly in Israel's inbox.
            </p>
            <a
              href="mailto:salemisrael392@gmail.com"
              data-testid="contact-email-link"
              className="link-underline inline-block mt-10 font-display italic text-2xl md:text-3xl text-espresso break-all"
            >
              salemisrael392@gmail.com
            </a>
            <p className="font-mono2 text-[11px] text-rust mt-4 tracking-wider">UTC+1 · replies within 24h</p>
          </motion.div>

          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
            className="col-span-12 lg:col-span-5 lg:col-start-8 flex flex-col justify-center"
            data-testid="contact-form"
          >
            <label className="block mb-8">
              <span className="font-mono2 text-[10px] uppercase tracking-[0.25em] text-ink/50">01 / Your name</span>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Ada Lovelace"
                className={inputCls}
                data-testid="contact-name-input"
              />
            </label>
            <label className="block mb-8">
              <span className="font-mono2 text-[10px] uppercase tracking-[0.25em] text-ink/50">02 / Your email</span>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="ada@analytical.engine"
                className={inputCls}
                data-testid="contact-email-input"
              />
            </label>
            <label className="block mb-10">
              <span className="font-mono2 text-[10px] uppercase tracking-[0.25em] text-ink/50">03 / The brief</span>
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell me about the system you're dreaming of…"
                className={`${inputCls} resize-none`}
                data-testid="contact-message-input"
              />
            </label>
            <button
              type="submit"
              disabled={sending}
              data-testid="contact-submit-button"
              className="group self-start inline-flex items-center gap-4 bg-ink text-paper px-8 py-4 font-mono2 text-[11px] uppercase tracking-[0.25em] hover:bg-espresso transition-colors duration-500 disabled:opacity-60"
            >
              {sending ? (
                <>
                  Sending <Loader2 className="w-4 h-4 animate-spin" />
                </>
              ) : (
                <>
                  Send message
                  <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
                </>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
