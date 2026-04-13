import { Navbar }           from "@/components/shared/Navbar";
import { HeroSection }      from "@/components/sections/HeroSection";
import { CommandsSection }  from "@/components/sections/CommandsSection";
import { SimulatorSection } from "@/components/sections/SimulatorSection";
import { WorkflowSection }  from "@/components/sections/WorkflowSection";
import { QuizSection }      from "@/components/sections/QuizSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <Navbar />
      <HeroSection />
      <hr className="border-zinc-200" />
      <CommandsSection />
      <hr className="border-zinc-200" />
      <SimulatorSection />
      <hr className="border-zinc-200" />
      <WorkflowSection />
      <hr className="border-zinc-200" />
      <QuizSection />
      <footer className="text-center py-8 text-sm text-zinc-400">
        gitlearn — interactive Git tutorial
      </footer>
    </main>
  );
}
