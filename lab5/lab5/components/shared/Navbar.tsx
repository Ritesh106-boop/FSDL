"use client";
import React, { useState, useEffect } from "react";

const NAV = [
  { label: "Home",      id: "hero"      },
  { label: "Commands",  id: "commands"  },
  { label: "Simulator", id: "simulator" },
  { label: "Workflow",  id: "workflow"  },
  { label: "Quiz",      id: "quiz"      },
];

export const Navbar: React.FC = () => {
  const [active,   setActive]   = useState("hero");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActive(id);
  };

  return (
    <nav
      className={`sticky top-0 z-50 flex items-center gap-1 flex-wrap px-4 py-2 border-b border-zinc-200 transition-all ${
        scrolled ? "bg-white/90 backdrop-blur-sm shadow-sm" : "bg-white"
      }`}
    >
      <span className="text-sm font-bold text-purple-600 mr-4 tracking-tight">
        git<span className="text-zinc-800">learn</span>
      </span>
      {NAV.map((n) => (
        <button
          key={n.id}
          onClick={() => scrollTo(n.id)}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            active === n.id
              ? "bg-purple-100 text-purple-700"
              : "text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100"
          }`}
        >
          {n.label}
        </button>
      ))}
    </nav>
  );
};
