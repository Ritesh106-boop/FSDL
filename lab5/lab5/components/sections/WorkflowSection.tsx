"use client";
import React from "react";
import { flowSteps, flowCards } from "@/data/commands";

export const WorkflowSection = () => (
  <section id="workflow" className="px-4 py-14 max-w-5xl mx-auto">
    <h2 className="text-2xl font-semibold text-zinc-900 mb-1">Git workflow</h2>
    <p className="text-sm text-zinc-500 mb-6">The standard feature branch workflow used in professional teams</p>

    {/* Step flow */}
    <div className="flex flex-wrap items-center gap-1 mb-8 p-5 bg-white rounded-2xl border border-zinc-200">
      {flowSteps.map((s, i) => (
        <React.Fragment key={s.label}>
          <div className={`flex flex-col items-center px-4 py-2.5 rounded-xl min-w-[90px] border ${
            s.label === "main" || s.label === "merge"
              ? "border-purple-400 bg-purple-50"
              : "border-zinc-200 bg-zinc-50"
          }`}>
            <span className="text-sm font-semibold text-zinc-800">{s.label}</span>
            <span className="text-xs text-zinc-400 mt-0.5 font-mono">{s.sub}</span>
          </div>
          {i < flowSteps.length - 1 && (
            <span className="text-purple-400 font-bold text-lg">→</span>
          )}
        </React.Fragment>
      ))}
    </div>

    {/* Info cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
      {flowCards.map(c => (
        <div key={c.title} className="bg-white rounded-xl border border-zinc-200 p-4">
          <h3 className="text-sm font-semibold text-zinc-800 mb-1.5">{c.title}</h3>
          <p className="text-sm text-zinc-500 leading-relaxed">{c.body}</p>
        </div>
      ))}
    </div>

    {/* SVG branch graph */}
    <div className="bg-[#1a1a2e] rounded-2xl border border-zinc-700 p-5 overflow-x-auto">
      <p className="text-xs text-zinc-500 font-mono mb-3">branch graph</p>
      <svg viewBox="0 0 700 120" className="w-full" style={{ minWidth: 400 }}>
        <line x1="30" y1="40" x2="670" y2="40" stroke="#7c3aed" strokeWidth="2.5" />
        <line x1="180" y1="40" x2="280" y2="90" stroke="#0ea5e9" strokeWidth="2" />
        <line x1="280" y1="90" x2="520" y2="90" stroke="#0ea5e9" strokeWidth="2" />
        <line x1="520" y1="90" x2="580" y2="40" stroke="#0ea5e9" strokeWidth="2" />
        {[30, 130, 580, 650].map(x => <circle key={x} cx={x} cy="40" r="6" fill="#7c3aed" />)}
        {[280, 380, 480].map(x => <circle key={x} cx={x} cy="90" r="5" fill="#0ea5e9" />)}
        <text x="30"  y="25" fill="#a78bfa" fontSize="11" fontFamily="monospace">main</text>
        <text x="270" y="108" fill="#7dd3fc" fontSize="11" fontFamily="monospace">feature/my-task</text>
        <text x="555" y="25" fill="#a5f3a5" fontSize="11" fontFamily="monospace">merge</text>
      </svg>
    </div>
  </section>
);
