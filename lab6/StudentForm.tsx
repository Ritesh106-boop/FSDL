"use client";
import React, { useState, useEffect } from "react";
import { Student, StudentFormData } from "@/types/student";
import { X, Plus, Minus } from "lucide-react";
import { LiquidButton } from "@/components/ui/liquid-glass-button";

const EMPTY: StudentFormData = {
  name: "", email: "", phone: "", course: "", year: "1st Year", cgpa: "",
  skills: [], bio: "", github: "", linkedin: "", avatar: "",
  projects: [{ title: "", desc: "" }],
};

interface Props {
  open: boolean;
  student?: Student | null;
  onClose: () => void;
  onSave: (data: StudentFormData) => Promise<void>;
}

const inputCls = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-white/25 text-sm focus:outline-none focus:border-white/30 focus:bg-white/8 transition-all";
const labelCls = "block text-white/50 text-xs mb-1.5 font-medium tracking-wide uppercase";

export function StudentForm({ open, student, onClose, onSave }: Props) {
  const [form, setForm] = useState<StudentFormData>(EMPTY);
  const [skillInput, setSkillInput] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (student) {
      setForm({ name: student.name, email: student.email, phone: student.phone,
        course: student.course, year: student.year, cgpa: student.cgpa,
        skills: [...student.skills], bio: student.bio, github: student.github,
        linkedin: student.linkedin, avatar: student.avatar, projects: [...student.projects] });
    } else {
      setForm(EMPTY);
    }
    setSkillInput("");
  }, [student, open]);

  if (!open) return null;

  const set = (k: keyof StudentFormData, v: any) => setForm(p => ({ ...p, [k]: v }));

  const addSkill = () => {
    const s = skillInput.trim();
    if (s && !form.skills.includes(s)) { set("skills", [...form.skills, s]); setSkillInput(""); }
  };
  const removeSkill = (s: string) => set("skills", form.skills.filter(x => x !== s));

  const setProject = (i: number, k: "title" | "desc", v: string) => {
    const p = [...form.projects]; p[i] = { ...p[i], [k]: v }; set("projects", p);
  };
  const addProject = () => set("projects", [...form.projects, { title: "", desc: "" }]);
  const removeProject = (i: number) => set("projects", form.projects.filter((_, j) => j !== i));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const initials = form.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
    try { await onSave({ ...form, avatar: initials }); onClose(); }
    catch {} finally { setSaving(false); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/15 bg-black/60 backdrop-blur-xl p-6"
        style={{ boxShadow: "0 0 80px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.1)" }}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white text-xl font-semibold tracking-tight">
            {student ? "Edit Student" : "Add New Student"}
          </h2>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Full Name *</label>
              <input className={inputCls} value={form.name} onChange={e => set("name", e.target.value)} placeholder="Aanya Sharma" required />
            </div>
            <div>
              <label className={labelCls}>Email *</label>
              <input type="email" className={inputCls} value={form.email} onChange={e => set("email", e.target.value)} placeholder="student@email.com" required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Phone</label>
              <input className={inputCls} value={form.phone} onChange={e => set("phone", e.target.value)} placeholder="+91 98765 43210" />
            </div>
            <div>
              <label className={labelCls}>CGPA</label>
              <input className={inputCls} value={form.cgpa} onChange={e => set("cgpa", e.target.value)} placeholder="9.2" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Course *</label>
              <input className={inputCls} value={form.course} onChange={e => set("course", e.target.value)} placeholder="B.Tech Computer Science" required />
            </div>
            <div>
              <label className={labelCls}>Year</label>
              <select className={inputCls} value={form.year} onChange={e => set("year", e.target.value)}
                style={{ backgroundColor: "rgba(255,255,255,0.05)" }}>
                {["1st Year","2nd Year","3rd Year","4th Year"].map(y => <option key={y} value={y} style={{ background: "#111" }}>{y}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className={labelCls}>Bio</label>
            <textarea className={inputCls} rows={3} value={form.bio} onChange={e => set("bio", e.target.value)} placeholder="Brief description about the student..." />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>GitHub URL</label>
              <input className={inputCls} value={form.github} onChange={e => set("github", e.target.value)} placeholder="https://github.com/username" />
            </div>
            <div>
              <label className={labelCls}>LinkedIn URL</label>
              <input className={inputCls} value={form.linkedin} onChange={e => set("linkedin", e.target.value)} placeholder="https://linkedin.com/in/username" />
            </div>
          </div>

          {/* Skills */}
          <div>
            <label className={labelCls}>Skills</label>
            <div className="flex gap-2 mb-2">
              <input className={inputCls} value={skillInput} onChange={e => setSkillInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addSkill())} placeholder="Add a skill and press Enter" />
              <button type="button" onClick={addSkill}
                className="px-3 rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-colors flex-shrink-0">
                <Plus size={16} />
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {form.skills.map(s => (
                <span key={s} className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border border-white/15 bg-white/8 text-white/70">
                  {s}
                  <button type="button" onClick={() => removeSkill(s)} className="text-white/40 hover:text-white transition-colors">
                    <X size={10} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className={labelCls}>Projects</label>
              <button type="button" onClick={addProject}
                className="flex items-center gap-1 text-xs text-white/40 hover:text-white transition-colors">
                <Plus size={12} /> Add
              </button>
            </div>
            <div className="space-y-2">
              {form.projects.map((p, i) => (
                <div key={i} className="flex gap-2">
                  <input className={inputCls} value={p.title} onChange={e => setProject(i, "title", e.target.value)} placeholder="Project title" />
                  <input className={inputCls} value={p.desc} onChange={e => setProject(i, "desc", e.target.value)} placeholder="Short description" />
                  {form.projects.length > 1 && (
                    <button type="button" onClick={() => removeProject(i)}
                      className="px-2 rounded-xl border border-red-500/20 bg-red-500/5 text-red-400/60 hover:text-red-400 transition-colors flex-shrink-0">
                      <Minus size={14} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 h-11 rounded-xl border border-white/10 text-white/50 hover:text-white hover:border-white/20 transition-all text-sm">
              Cancel
            </button>
            <LiquidButton type="submit" size="lg" className="flex-1 text-white border border-white/15 rounded-xl" disabled={saving}>
              {saving ? "Saving..." : student ? "Save Changes" : "Add Student"}
            </LiquidButton>
          </div>
        </form>
      </div>
    </div>
  );
}
