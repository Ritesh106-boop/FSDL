export interface Project {
  title: string;
  desc: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  course: string;
  year: string;
  cgpa: string;
  skills: string[];
  bio: string;
  github: string;
  linkedin: string;
  avatar: string;
  projects: Project[];
  createdAt: string;
}

export type StudentFormData = Omit<Student, "id" | "createdAt">;
