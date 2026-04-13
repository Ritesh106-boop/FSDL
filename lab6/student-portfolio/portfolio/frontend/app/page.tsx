"use client";
import React, { useState, useMemo } from "react";
import { WebGLShader } from "@/components/ui/web-gl-shader";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import { StudentCard } from "@/components/sections/StudentCard";
import { StudentForm } from "@/components/sections/StudentForm";
import { StudentDetail } from "@/components/sections/StudentDetail";
import { useStudents } from "@/hooks/useStudents";
import { Student, StudentFormData } from "@/types/student";
import { Plus, Search, Users, GraduationCap, BookOpen, AlertCircle, RefreshCw } from "lucide-react";

export default function Home() {
  const { students, loading, error, create, update, remove, refetch } = useStudents();
  const [formOpen, setFormOpen]       = useState(false);
  const [editing, setEditing]         = useState<Student | null>(null);
  const [viewing, setViewing]         = useState<Student | null>(null);
  const [search, setSearch]           = useState("");
  const [deleteId, setDeleteId]       = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!search.trim()) return students;
    const q = search.toLowerCase();
    return students.filter(s =>
      s.name.toLowerCase().includes(q) ||
      s.course.toLowerCase().includes(q) ||
      s.skills.some(sk => sk.toLowerCase().includes(q))
    );
  }, [students, search]);

  const avgCgpa = students.length
    ? (students.reduce((a, s) => a + parseFloat(s.cgpa || "0"), 0) / students.length).toFixed(1)
    : "—";

  const openCreate = () => { setEditing(null); setFormOpen(true); };
  const openEdit   = (s: Student) => { setEditing(s); setFormOpen(true); };
  const closeForm  = () => { setFormOpen(false); setEditing(null); };

  const handleSave = async (data: StudentFormData) => {
    if (editing) await update(editing.id, data);
    else         await create(data);
  };

  const confirmDelete = async (id: string) => {
    if (window.confirm("Delete this student profile?")) await remove(id);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <WebGLShader />

      {/* Content layer */}
      <div className="relative z-10 min-h-screen">

        {/* Navbar */}
        <nav className="border-b border-white/8 bg-black/20 backdrop-blur-md px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-white text-xl font-bold tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
              Student<span className="text-white/40">Portfolio</span>
            </h1>
            <p className="text-white/30 text-xs">MERN Stack · Full CRUD</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              <p className="text-green-400 text-xs">API Connected</p>
            </div>
            <LiquidButton size="sm" onClick={openCreate}
              className="text-white border border-white/15 rounded-full flex items-center gap-1.5">
              <Plus size={14} /> Add Student
            </LiquidButton>
          </div>
        </nav>

        <div className="px-6 py-8 max-w-7xl mx-auto">

          {/* Hero banner */}
          <div className="relative mb-8 rounded-2xl border border-white/10 bg-black/30 backdrop-blur-md p-8 overflow-hidden"
            style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)" }}>
            <div className="pointer-events-none absolute inset-0"
              style={{ background: "radial-gradient(800px circle at 30% 50%, rgba(255,255,255,0.03) 0%, transparent 60%)" }} />
            <p className="text-white/40 text-xs uppercase tracking-widest mb-2 font-medium">Design is Everything</p>
            <h2 className="text-white text-4xl md:text-5xl font-extrabold tracking-tighter mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>
              Student Portfolios
            </h2>
            <p className="text-white/50 text-sm max-w-md">
              Manage, showcase, and discover student profiles with full create, read, update, and delete capabilities.
            </p>

            {/* Stats */}
            <div className="flex gap-6 mt-6">
              {[
                { icon: Users, label: "Total Students", value: students.length },
                { icon: GraduationCap, label: "Average CGPA", value: avgCgpa },
                { icon: BookOpen, label: "Total Projects", value: students.reduce((a, s) => a + s.projects.filter(p => p.title).length, 0) },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-white/8 border border-white/10 flex items-center justify-center">
                    <Icon size={14} className="text-white/50" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-lg leading-tight">{value}</p>
                    <p className="text-white/40 text-xs">{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Search + toolbar */}
          <div className="flex items-center gap-3 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                className="w-full bg-black/30 backdrop-blur border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-white placeholder-white/25 text-sm focus:outline-none focus:border-white/25 transition-all"
                placeholder="Search by name, course, skill…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <span className="text-white/30 text-sm">{filtered.length} result{filtered.length !== 1 ? "s" : ""}</span>
            <button onClick={refetch} className="p-2 rounded-xl border border-white/10 bg-black/20 text-white/40 hover:text-white transition-colors">
              <RefreshCw size={14} />
            </button>
          </div>

          {/* Error state */}
          {error && (
            <div className="flex items-center gap-3 p-4 rounded-2xl border border-red-500/20 bg-red-500/5 mb-6">
              <AlertCircle size={16} className="text-red-400 flex-shrink-0" />
              <div>
                <p className="text-red-400 text-sm font-medium">Cannot connect to API</p>
                <p className="text-red-400/60 text-xs mt-0.5">Make sure json-server is running: <code className="bg-white/5 px-1 rounded">cd backend && npm start</code></p>
              </div>
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1,2,3].map(i => (
                <div key={i} className="h-56 rounded-2xl border border-white/8 bg-white/3 animate-pulse" />
              ))}
            </div>
          )}

          {/* Grid */}
          {!loading && (
            <>
              {filtered.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-white/20 text-5xl mb-4">∅</p>
                  <p className="text-white/40 text-sm">
                    {search ? "No students match your search" : "No students yet. Add your first one!"}
                  </p>
                  {!search && (
                    <button onClick={openCreate}
                      className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-white/50 hover:text-white hover:bg-white/10 transition-all text-sm">
                      <Plus size={14} /> Add Student
                    </button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filtered.map(s => (
                    <StudentCard
                      key={s.id}
                      student={s}
                      onEdit={openEdit}
                      onDelete={confirmDelete}
                      onClick={setViewing}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Modals */}
      <StudentForm
        open={formOpen}
        student={editing}
        onClose={closeForm}
        onSave={handleSave}
      />
      <StudentDetail
        student={viewing}
        onClose={() => setViewing(null)}
        onEdit={s => { setViewing(null); openEdit(s); }}
      />
    </div>
  );
}
