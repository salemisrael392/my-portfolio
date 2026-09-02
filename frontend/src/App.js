import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Home from "@/pages/Home";
import Dashboard from "@/pages/Dashboard";
import CaseStudy from "@/pages/CaseStudy";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work/:slug" element={<CaseStudy />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#111111",
            color: "#FDFBF7",
            border: "1px solid #6E473B",
            borderRadius: 0,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "12px",
          },
        }}
      />
    </BrowserRouter>
  );
}
