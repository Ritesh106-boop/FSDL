"use client";
import React, { useState } from "react";
import { questions } from "@/data/commands";
import { JellyButton } from "@/components/shared/JellyButton";

export const QuizSection = () => {
  const [answered, setAnswered] = useState<Record<number, number>>({});

  const score = Object.entries(answered).filter(
    ([qi, oi]) => questions[Number(qi)].ans === (oi as unknown as number)
  ).length;
  const done  = Object.keys(answered).length;
  const total = questions.length;

  const answer = (qi: number, oi: number) => {
    if (answered[qi] !== undefined) return;
    setAnswered(p => ({ ...p, [qi]: oi }));
  };

  return (
    <section id="quiz" className="px-4 py-14 bg-zinc-50">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
          <div>
            <h2 className="text-2xl font-semibold text-zinc-900 mb-1">Knowledge check</h2>
            <p className="text-sm text-zinc-500">Test what you've learned about Git</p>
          </div>
          <span className="bg-purple-100 text-purple-700 text-sm font-semibold px-3 py-1 rounded-full self-start mt-1">
            Score: {score} / {total}
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-zinc-200 rounded-full h-1.5 mb-7">
          <div
            className="bg-purple-500 h-1.5 rounded-full transition-all duration-500"
            style={{ width: `${(done / total) * 100}%` }}
          />
        </div>

        <div className="space-y-4">
          {questions.map((q, qi) => {
            const ua         = answered[qi];
            const isAnswered = ua !== undefined;
            return (
              <div key={qi} className="bg-white rounded-2xl border border-zinc-200 p-5">
                <p className="text-base font-medium text-zinc-800 mb-3">
                  <span className="text-purple-400 font-mono text-sm mr-1.5">{qi + 1}.</span>
                  {q.q}
                </p>
                <div className="space-y-2">
                  {q.opts.map((opt, oi) => {
                    let cls = "border border-zinc-200 bg-zinc-50 text-zinc-700 hover:border-purple-300";
                    if (isAnswered) {
                      if (oi === q.ans)     cls = "border border-green-400 bg-green-50 text-green-800";
                      else if (oi === ua)   cls = "border border-red-400   bg-red-50   text-red-800";
                    }
                    return (
                      <button
                        key={oi}
                        disabled={isAnswered}
                        onClick={() => answer(qi, oi)}
                        className={`w-full text-left px-4 py-2.5 rounded-xl text-sm transition-all ${cls} ${isAnswered ? "cursor-default" : "cursor-pointer"}`}
                      >
                        <span className="font-mono text-xs text-zinc-400 mr-2">{String.fromCharCode(65 + oi)}.</span>
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {isAnswered && (
                  <div className={`mt-3 text-sm px-3 py-2 rounded-lg ${ua === q.ans ? "bg-green-50 text-green-800" : "bg-red-50 text-red-700"}`}>
                    {ua === q.ans ? "✓ Correct! " : "✗ Incorrect. "}{q.exp}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {done === total && (
          <div className="mt-6 text-center">
            <p className="text-zinc-500 text-sm mb-4">
              {score === total ? "Perfect score! You're a Git pro." : score >= 3 ? "Great work! Review the ones you missed." : "Keep practicing — use the simulator to reinforce the concepts."}
            </p>
            <JellyButton onClick={() => setAnswered({})}>Try again</JellyButton>
          </div>
        )}
      </div>
    </section>
  );
};
