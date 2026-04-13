"use client";
import React, { useState } from "react";
import { JellyButton } from "@/components/shared/JellyButton";

type Status = "untracked" | "staged" | "committed";
interface SimFile { name: string; status: Status }
interface Log { text: string; type: "cmd" | "out" | "warn" }

const INIT: SimFile[] = [
  { name: "index.html", status: "untracked" },
  { name: "style.css",  status: "untracked" },
  { name: "app.js",     status: "untracked" },
  { name: "README.md",  status: "untracked" },
];

const dot:   Record<Status, string> = { untracked: "bg-amber-400", staged: "bg-green-400", committed: "bg-blue-400" };
const badge: Record<Status, string> = {
  untracked: "bg-amber-100 text-amber-800",
  staged:    "bg-green-100 text-green-800",
  committed: "bg-blue-100  text-blue-800",
};

export const SimulatorSection = () => {
  const [files, setFiles]   = useState<SimFile[]>(INIT.map(f => ({ ...f })));
  const [log,   setLog]     = useState<Log[]>([]);
  const [count, setCount]   = useState(0);

  const addLog = (text: string, type: Log["type"]) => setLog(p => [...p, { text, type }]);

  const stageAll = () => {
    const ut = files.filter(f => f.status === "untracked");
    if (!ut.length) { addLog("Nothing to stage. All files already staged or committed.", "warn"); return; }
    setFiles(p => p.map(f => f.status === "untracked" ? { ...f, status: "staged" } : f));
    addLog(`$ git add .  →  ${ut.length} file(s) moved to staging area`, "cmd");
  };

  const commit = () => {
    const st = files.filter(f => f.status === "staged");
    if (!st.length) { addLog("Nothing to commit. Use git add . first.", "warn"); return; }
    const n = count + 1; setCount(n);
    setFiles(p => p.map(f => f.status === "staged" ? { ...f, status: "committed" } : f));
    addLog(`$ git commit -m "commit #${n}"  →  [main] ${st.length} file(s) committed`, "out");
  };

  const reset = () => { setFiles(INIT.map(f => ({ ...f }))); setLog([]); setCount(0); };

  return (
    <section id="simulator" className="px-4 py-14 bg-zinc-50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold text-zinc-900 mb-1">Stage & commit simulator</h2>
        <p className="text-sm text-zinc-500 mb-6">Practice the add → stage → commit cycle interactively</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* File panel */}
          <div className="bg-white rounded-2xl border border-zinc-200 p-5">
            <h3 className="text-sm font-semibold text-zinc-700 mb-4">Working directory</h3>
            <div className="space-y-2 mb-5">
              {files.map(f => (
                <div key={f.name} className="flex items-center justify-between bg-zinc-50 rounded-lg px-3 py-2.5 border border-zinc-100">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${dot[f.status]}`} />
                    <code className="text-sm font-mono text-zinc-700">{f.name}</code>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${badge[f.status]}`}>{f.status}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-2 flex-wrap">
              <JellyButton size="sm" onClick={stageAll}>git add .</JellyButton>
              <JellyButton size="sm" onClick={commit}>git commit</JellyButton>
              <button onClick={reset} className="px-4 h-10 rounded-full text-sm border border-zinc-300 text-zinc-600 hover:bg-zinc-100 transition-colors">
                reset
              </button>
            </div>
          </div>

          {/* Terminal log */}
          <div className="bg-[#1a1a2e] rounded-2xl border border-zinc-700 p-5 min-h-[240px]">
            <div className="flex gap-1.5 mb-3">
              <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <span className="w-3 h-3 rounded-full bg-[#28c840]" />
              <span className="ml-2 text-xs text-zinc-500 font-mono">output</span>
            </div>
            <div className="space-y-1.5">
              {log.length === 0
                ? <p className="text-zinc-600 text-sm font-mono"># Click the buttons to see output...</p>
                : log.map((e, i) => (
                    <p key={i} className={`text-sm font-mono ${e.type === "cmd" ? "text-[#7dd3fc]" : e.type === "out" ? "text-[#a5f3a5]" : "text-[#fbbf24]"}`}>
                      {e.text}
                    </p>
                  ))
              }
              {log.length > 0 && <span className="inline-block w-2 h-4 bg-[#a5f3a5] animate-pulse align-text-bottom" />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
