"use client";
import React from "react";
import { Student } from "@/types/student";
import { X, Github, Linkedin, Mail, Phone, BookOpen, Star, Folder } from "lucide-react";

interface Props { student: Student | null; onClose: () => void; onEdit: (s: Student) => void; }

export function StudentDetail({ student, onClose, onEdit }: Props) {
  if (!student) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/15 bg-black/60 backdrop-blur-xl p-6"
        style={{ boxShadow: "0 0 80px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.1)" }}>

        {/* Close */}
        <button onClick={onClose} className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"><X size={20} /></button>

        {/* Hero */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-white font-bold text-2xl">
            {student.avatar}
          </div>
          <div className="flex-1">
            <h2 className="text-white text-xl font-semibold">{student.name}</h2>
            <p className="text-white/50 text-sm">{student.course} · {student.year}</p>
            <div className="flex gap-1 mt-1">
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/8 border border-white/10 text-white/60">
                CGPA {student.cgpa}
              </span>
            </div>
          </div>
          <button onClick={() => { onClose(); onEdit(student); }}
            className="px-3 py-1.5 rounded-xl border border-white/10 bg-white/5 text-white/50 hover:text-white hover:bg-white/10 transition-all text-xs">
            Edit
          </button>
        </div>

        {/* Bio */}
        {student.bio && (
          <p className="text-white/60 text-sm leading-relaxed mb-5 pb-5 border-b border-white/8">{student.bio}</p>
        )}

        {/* Contact info */}
        <div className="space-y-2 mb-5">
          {[
            { icon: Mail, label: student.email },
            { icon: Phone, label: student.phone },
          ].map(({ icon: Icon, label }) => label && (
            <div key={label} className="flex items-center gap-2 text-white/50 text-sm">
              <Icon size={13} className="text-white/30" />
              {label}
            </div>
          ))}
          <div className="flex gap-3 mt-2">
            {student.github && (
              <a href={student.github} target="_blank" rel="noreferrer"
                className="flex items-center gap-1.5 text-white/40 hover:text-white text-xs transition-colors">
                <Github size={13} /> GitHub
              </a>
            )}
            {student.linkedin && (
              <a href={student.linkedin} target="_blank" rel="noreferrer"
                className="flex items-center gap-1.5 text-white/40 hover:text-white text-xs transition-colors">
                <Linkedin size={13} /> LinkedIn
              </a>
            )}
          </div>
        </div>

        {/* Skills */}
        <div className="mb-5">
          <h3 className="text-white/40 text-xs uppercase tracking-widest mb-2 font-medium">Skills</h3>
          <div className="flex flex-wrap gap-1.5">
            {student.skills.map(s => (
              <span key={s} className="text-sm px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/70">{s}</span>
            ))}
          </div>
        </div>

        {/* Projects */}
        {student.projects.filter(p => p.title).length > 0 && (
          <div>
            <h3 className="text-white/40 text-xs uppercase tracking-widest mb-3 font-medium">Projects</h3>
            <div className="space-y-2">
              {student.projects.filter(p => p.title).map((p, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/8">
                  <Folder size={14} className="text-white/30 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white text-sm font-medium">{p.title}</p>
                    {p.desc && <p className="text-white/50 text-xs mt-0.5">{p.desc}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
