"use client";
import React from "react";
import { Student } from "@/types/student";
import { Github, Linkedin, Pencil, Trash2, Star } from "lucide-react";

interface Props {
  student: Student;
  onEdit: (s: Student) => void;
  onDelete: (id: string) => void;
  onClick: (s: Student) => void;
}

export function StudentCard({ student, onEdit, onDelete, onClick }: Props) {
  return (
    <div
      onClick={() => onClick(student)}
      className="group relative cursor-pointer rounded-2xl border border-white/10 bg-black/30 backdrop-blur-md p-5 transition-all duration-300 hover:border-white/25 hover:bg-black/40 hover:-translate-y-1"
      style={{ boxShadow: "0 0 30px rgba(255,255,255,0.03), inset 0 1px 0 rgba(255,255,255,0.08)" }}
    >
      {/* Glow accent */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: "radial-gradient(400px circle at 50% 0%, rgba(255,255,255,0.04) 0%, transparent 70%)" }} />

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white font-bold text-lg tracking-tight">
            {student.avatar}
          </div>
          <div>
            <h3 className="text-white font-semibold text-base leading-tight">{student.name}</h3>
            <p className="text-white/50 text-xs mt-0.5">{student.course}</p>
          </div>
        </div>
        {/* Action buttons */}
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity" onClick={e => e.stopPropagation()}>
          <button onClick={() => onEdit(student)}
            className="p-1.5 rounded-lg border border-white/10 bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-colors">
            <Pencil size={13} />
          </button>
          <button onClick={() => onDelete(student.id)}
            className="p-1.5 rounded-lg border border-red-500/20 bg-red-500/5 text-red-400/60 hover:text-red-400 hover:bg-red-500/10 transition-colors">
            <Trash2 size={13} />
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="flex gap-3 mb-4">
        <div className="flex-1 rounded-xl bg-white/5 border border-white/8 px-3 py-2 text-center">
          <p className="text-white font-bold text-lg leading-tight">{student.cgpa}</p>
          <p className="text-white/40 text-xs">CGPA</p>
        </div>
        <div className="flex-1 rounded-xl bg-white/5 border border-white/8 px-3 py-2 text-center">
          <p className="text-white font-bold text-lg leading-tight">{student.projects.length}</p>
          <p className="text-white/40 text-xs">Projects</p>
        </div>
        <div className="flex-1 rounded-xl bg-white/5 border border-white/8 px-3 py-2 text-center">
          <p className="text-white font-bold text-lg leading-tight">{student.year.split(" ")[0]}</p>
          <p className="text-white/40 text-xs">Year</p>
        </div>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {student.skills.slice(0, 4).map(s => (
          <span key={s} className="text-xs px-2 py-0.5 rounded-full border border-white/10 bg-white/5 text-white/60">
            {s}
          </span>
        ))}
        {student.skills.length > 4 && (
          <span className="text-xs px-2 py-0.5 rounded-full border border-white/10 bg-white/5 text-white/40">
            +{student.skills.length - 4}
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-white/8">
        <p className="text-white/30 text-xs truncate max-w-[160px]">{student.email}</p>
        <div className="flex gap-2">
          <a href={student.github} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}
            className="text-white/30 hover:text-white transition-colors"><Github size={14} /></a>
          <a href={student.linkedin} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}
            className="text-white/30 hover:text-white transition-colors"><Linkedin size={14} /></a>
        </div>
      </div>
    </div>
  );
}
