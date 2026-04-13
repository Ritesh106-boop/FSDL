"use client";
import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { JellyButton } from "@/components/shared/JellyButton";

const TerminalWindow = () => (
  <div className="bg-[#1a1a2e] rounded-xl border border-zinc-700 p-4 w-full h-full overflow-hidden">
    <div className="flex gap-1.5 mb-3">
      <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
      <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
      <span className="w-3 h-3 rounded-full bg-[#28c840]" />
      <span className="ml-2 text-xs text-zinc-500 font-mono">terminal</span>
    </div>
    {[
      { cmd: true,  text: "git init" },
      { cmd: false, text: "Initialized empty Git repository in ~/project/.git/" },
      { cmd: true,  text: "git add ." },
      { cmd: true,  text: 'git commit -m "initial commit"' },
      { cmd: false, text: "[main (root-commit) a1b2c3d] initial commit" },
      { cmd: false, text: " 3 files changed, 42 insertions(+)" },
      { cmd: true,  text: "git push origin main" },
      { cmd: false, text: "To github.com:user/project.git" },
      { cmd: false, text: " * [new branch]  main -> main" },
    ].map((l, i) => (
      <div key={i} className="font-mono text-sm leading-relaxed">
        {l.cmd
          ? <><span className="text-zinc-500">~/project </span><span className="text-[#7dd3fc]">$ {l.text}</span></>
          : <span className="text-[#d1fae5]">{l.text}</span>
        }
      </div>
    ))}
    <div className="font-mono text-sm">
      <span className="text-zinc-500">~/project </span>
      <span className="text-[#7dd3fc]">$ </span>
      <span className="inline-block w-2 h-4 bg-[#a5f3a5] animate-pulse align-text-bottom" />
    </div>
  </div>
);

export const HeroSection = () => {
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <section id="hero">
      <ContainerScroll
        titleComponent={
          <div className="mb-8">
            <p className="text-xs font-mono text-purple-500 tracking-widest uppercase mb-3">
              interactive learning
            </p>
            <h1 className="text-4xl md:text-6xl font-semibold text-zinc-900 leading-tight mb-4">
              Master <span className="text-purple-500">Git</span>
              <br />version control
            </h1>
            <p className="text-lg text-zinc-500 max-w-md mx-auto mb-6">
              Learn essential Git commands, workflows, and concepts through hands-on interactive exercises.
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <JellyButton onClick={() => go("commands")}>Start learning</JellyButton>
              <JellyButton variant="outline" onClick={() => go("quiz")}>Take quiz</JellyButton>
            </div>
          </div>
        }
      >
        <TerminalWindow />
      </ContainerScroll>
    </section>
  );
};
