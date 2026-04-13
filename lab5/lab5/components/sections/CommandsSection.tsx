"use client";
import React, { useState } from "react";
import { commands, GitCommand } from "@/data/commands";

const catColor: Record<GitCommand["category"], string> = {
  setup:     "bg-blue-100  text-blue-700",
  staging:   "bg-green-100 text-green-700",
  branching: "bg-amber-100 text-amber-700",
  remote:    "bg-rose-100  text-rose-700",
  utility:   "bg-zinc-100  text-zinc-600",
};

export const CommandsSection = () => {
  const [active, setActive] = useState<number | null>(null);
  const toggle = (i: number) => setActive(active === i ? null : i);

  return (
    <section id="commands" className="px-4 py-14 max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold text-zinc-900 mb-1">Essential Git commands</h2>
      <p className="text-sm text-zinc-500 mb-6">Click any command to see details and examples</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {commands.map((cmd, i) => (
          <button
            key={cmd.tag}
            onClick={() => toggle(i)}
            className={`text-left p-4 rounded-xl border transition-all duration-200 w-full ${
              active === i
                ? "border-purple-400 bg-purple-50"
                : "border-zinc-200 bg-white hover:border-purple-300 hover:-translate-y-0.5"
            }`}
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <code className="text-sm bg-[#1a1a2e] text-[#7dd3fc] px-2 py-1 rounded font-mono">
                {cmd.tag}
              </code>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${catColor[cmd.category]}`}>
                {cmd.category}
              </span>
            </div>
            <p className="text-sm text-zinc-500 leading-relaxed">{cmd.desc}</p>
          </button>
        ))}
      </div>

      {active !== null && (
        <div className="mt-4 border-l-4 border-purple-500 bg-white rounded-r-xl p-4 border border-zinc-200">
          <p className="text-xs font-mono text-purple-500 mb-2 font-semibold">
            {commands[active].tag}
          </p>
          <pre className="text-sm text-zinc-700 font-mono whitespace-pre-wrap leading-relaxed">
            {commands[active].detail}
          </pre>
        </div>
      )}
    </section>
  );
};
