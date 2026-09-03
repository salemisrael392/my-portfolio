import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { ArrowLeft, Trash2, MailOpen, Inbox, Lock, ArrowRight, Loader2, LogOut } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL || ""}/api`;
const TOKEN_KEY = "inbox_token";

const authHeader = () => ({ Authorization: `Bearer ${sessionStorage.getItem(TOKEN_KEY)}` });

function LoginGate({ onSuccess }) {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(`${API}/auth/inbox-login`, { password });
      sessionStorage.setItem(TOKEN_KEY, res.data.token);
      onSuccess();
    } catch (err) {
      const detail = err.response?.data?.detail;
      setError(typeof detail === "string" ? detail : "Could not sign in. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-md mx-auto mt-16"
      data-testid="inbox-login-gate"
    >
      <div className="flex items-center gap-3 mb-8">
        <span className="w-10 h-10 border border-line flex items-center justify-center">
          <Lock className="w-4 h-4 text-espresso" />
        </span>
        <p className="font-mono2 text-[11px] uppercase tracking-[0.3em] text-espresso">Owner only</p>
      </div>
      <h2 className="font-display italic font-medium text-4xl md:text-5xl leading-tight mb-4">
        This inbox is<br />kept private.
      </h2>
      <p className="text-sm text-ink/60 mb-10">Enter the inbox password to read your messages.</p>
      <form onSubmit={submit}>
        <label className="block mb-8">
          <span className="font-mono2 text-[10px] uppercase tracking-[0.25em] text-ink/50">Password</span>
          <input
            type="password"
            required
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••••"
            className="w-full bg-transparent border-b border-line focus:border-espresso outline-none py-4 text-base placeholder:text-ink/30 transition-colors duration-500"
            data-testid="inbox-password-input"
          />
        </label>
        {error && (
          <p className="font-mono2 text-[11px] text-rust mb-6" data-testid="inbox-login-error">{error}</p>
        )}
        <button
          type="submit"
          disabled={loading}
          data-testid="inbox-login-submit"
          className="group inline-flex items-center gap-4 bg-ink text-paper px-8 py-4 font-mono2 text-[11px] uppercase tracking-[0.25em] hover:bg-espresso transition-colors duration-500 disabled:opacity-60"
        >
          {loading ? (
            <>Unlocking <Loader2 className="w-4 h-4 animate-spin" /></>
          ) : (
            <>Unlock inbox <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" /></>
          )}
        </button>
      </form>
    </motion.div>
  );
}

export default function Dashboard() {
  const [authed, setAuthed] = useState(() => !!sessionStorage.getItem(TOKEN_KEY));
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleAuthError = useCallback(() => {
    sessionStorage.removeItem(TOKEN_KEY);
    setAuthed(false);
    setLoading(false);
  }, []);

  const load = useCallback(async () => {
    try {
      const res = await axios.get(`${API}/messages`, { headers: authHeader() });
      setMessages(res.data);
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) return handleAuthError();
      toast.error("Could not load messages.");
    } finally {
      setLoading(false);
    }
  }, [handleAuthError]);

  useEffect(() => {
    if (authed) load();
    else setLoading(false);
  }, [authed, load]);

  const markRead = async (id) => {
    try {
      await axios.patch(`${API}/messages/${id}/read`, {}, { headers: authHeader() });
      setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, read: true } : m)));
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) return handleAuthError();
      toast.error("Could not update message.");
    }
  };

  const remove = async (id) => {
    try {
      await axios.delete(`${API}/messages/${id}`, { headers: authHeader() });
      setMessages((prev) => prev.filter((m) => m.id !== id));
      toast.success("Message deleted.");
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) return handleAuthError();
      toast.error("Could not delete message.");
    }
  };

  const logout = () => {
    sessionStorage.removeItem(TOKEN_KEY);
    setAuthed(false);
    setMessages([]);
  };

  const unread = messages.filter((m) => !m.read).length;

  return (
    <div className="grain bg-cream text-ink min-h-screen px-3 md:px-6 py-6" data-testid="dashboard-page">
      <div className="bg-paper border border-line min-h-[calc(100vh-3rem)] px-6 md:px-14 py-10 md:py-14">
        <div className="flex items-start justify-between mb-14">
          <Link
            to="/"
            data-testid="dashboard-back-link"
            className="group inline-flex items-center gap-3 font-mono2 text-[11px] uppercase tracking-[0.18em] text-ink/70 hover:text-ink transition-colors"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-500 group-hover:-translate-x-1" />
            Portfolio
          </Link>
          <div className="flex items-center gap-6">
            {authed && (
              <button
                onClick={logout}
                data-testid="inbox-logout-btn"
                className="link-underline inline-flex items-center gap-2 font-mono2 text-[11px] uppercase tracking-[0.18em] text-ink/70 hover:text-ink transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" /> Lock
              </button>
            )}
            <p className="font-mono2 text-sm">israel<span className="text-rust">.</span></p>
          </div>
        </div>

        {!authed ? (
          <LoginGate onSuccess={() => { setAuthed(true); setLoading(true); }} />
        ) : (
          <>
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="font-mono2 text-[11px] uppercase tracking-[0.3em] text-espresso mb-4">Command Center</p>
                <h1 className="font-body font-extrabold tracking-[-0.03em] leading-[0.95] text-4xl md:text-6xl" data-testid="dashboard-heading">
                  Inbox<span className="text-rust">.</span>
                </h1>
              </div>
              <p className="font-mono2 text-[11px] text-ink/50" data-testid="dashboard-count">
                {loading ? "…" : `${unread} unread / ${messages.length} total`}
              </p>
            </div>

            {loading ? (
              <p className="font-mono2 text-sm text-ink/50" data-testid="dashboard-loading">Loading messages…</p>
            ) : messages.length === 0 ? (
              <div className="border border-dashed border-line py-24 flex flex-col items-center gap-4" data-testid="dashboard-empty">
                <Inbox className="w-8 h-8 text-espresso/50" />
                <p className="font-display italic text-2xl text-ink/60">Quiet for now. Messages will land here.</p>
              </div>
            ) : (
              <ul className="border-t border-line">
                <AnimatePresence initial={false}>
                  {messages.map((m) => (
                    <motion.li
                      key={m.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -40 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="border-b border-line py-8 grid grid-cols-12 gap-6 group"
                      data-testid={`message-card-${m.id}`}
                    >
                      <div className="col-span-12 md:col-span-3">
                        <p className="font-body font-bold text-base flex items-center gap-2">
                          {!m.read && <span className="w-2 h-2 bg-rust rounded-full" data-testid={`unread-dot-${m.id}`} />}
                          {m.name}
                        </p>
                        <p className="font-mono2 text-[11px] text-espresso mt-1">{m.email}</p>
                        <p className="font-mono2 text-[10px] text-ink/40 mt-2">
                          {new Date(m.created_at).toLocaleString()}
                        </p>
                      </div>
                      <p className="col-span-12 md:col-span-7 text-sm leading-relaxed text-ink/75 whitespace-pre-wrap">
                        {m.message}
                      </p>
                      <div className="col-span-12 md:col-span-2 flex md:flex-col items-center md:items-end gap-3">
                        {!m.read && (
                          <button
                            onClick={() => markRead(m.id)}
                            data-testid={`mark-read-btn-${m.id}`}
                            className="inline-flex items-center gap-2 border border-line px-4 py-2 font-mono2 text-[10px] uppercase tracking-[0.15em] text-ink/70 hover:border-ink hover:text-ink transition-all duration-300"
                          >
                            <MailOpen className="w-3.5 h-3.5" /> Read
                          </button>
                        )}
                        <button
                          onClick={() => remove(m.id)}
                          data-testid={`delete-btn-${m.id}`}
                          className="inline-flex items-center gap-2 border border-line px-4 py-2 font-mono2 text-[10px] uppercase tracking-[0.15em] text-ink/70 hover:border-rust hover:text-rust transition-all duration-300"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Delete
                        </button>
                      </div>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  );
}
