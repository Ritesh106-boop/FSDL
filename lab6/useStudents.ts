"use client";
import { useState, useEffect, useCallback } from "react";
import { Student, StudentFormData } from "@/types/student";

const API = "http://localhost:5000/students";

export function useStudents() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const r = await fetch(API);
      if (!r.ok) throw new Error("Failed to fetch");
      setStudents(await r.json());
      setError(null);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const create = async (data: StudentFormData): Promise<Student> => {
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, createdAt: new Date().toISOString() }),
    });
    if (!res.ok) throw new Error("Failed to create");
    const created = await res.json();
    setStudents(p => [...p, created]);
    return created;
  };

  const update = async (id: string, data: Partial<StudentFormData>): Promise<Student> => {
    const res = await fetch(`${API}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update");
    const updated = await res.json();
    setStudents(p => p.map(s => s.id === id ? updated : s));
    return updated;
  };

  const remove = async (id: string) => {
    const res = await fetch(`${API}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete");
    setStudents(p => p.filter(s => s.id !== id));
  };

  return { students, loading, error, refetch: fetchAll, create, update, remove };
}
