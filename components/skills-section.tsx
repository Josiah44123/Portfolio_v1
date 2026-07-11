"use client"

import React, { useEffect, useState, useRef, useMemo } from "react"
import {
  Code2,
  Presentation,
  Search,
  Award,
  Lightbulb,
  Building2,
  Home,
  Megaphone,
  Wallet,
  Wrench,
  Rocket,
  FolderKanban,
  Palette,
  Bot,
  BrainCircuit,
  Cpu,
} from "lucide-react"

// --- Data ---
const skillCategories = [
  {
    name: "Technical",
    icon: Code2,
    skills: [
      { name: "Java", level: 85, icon: Code2, gradient: "from-orange-500 to-red-500" },
      { name: "Programming", level: 80, icon: Cpu, gradient: "from-blue-500 to-indigo-500" },
      { name: "Research", level: 85, icon: Search, gradient: "from-green-500 to-emerald-500" },
      { name: "Design", level: 75, icon: Palette, gradient: "from-pink-500 to-rose-500" },
    ],
  },
  {
    name: "Leadership",
    icon: Award,
    skills: [
      { name: "Project Mgmt", level: 80, icon: FolderKanban, gradient: "from-blue-500 to-cyan-500" },
      { name: "Student Lead.", level: 88, icon: Award, gradient: "from-yellow-500 to-orange-500" },
      { name: "Presentations", level: 90, icon: Presentation, gradient: "from-purple-500 to-pink-500" },
      { name: "Biz Dev", level: 75, icon: Rocket, gradient: "from-teal-500 to-green-500" },
    ],
  },
  {
    name: "Business",
    icon: Building2,
    skills: [
      { name: "Property Mgmt", level: 78, icon: Building2, gradient: "from-slate-500 to-gray-600" },
      { name: "Real Estate", level: 75, icon: Home, gradient: "from-amber-500 to-yellow-500" },
      { name: "Finance", level: 72, icon: Wallet, gradient: "from-emerald-500 to-teal-500" },
      { name: "Maintenance", level: 70, icon: Wrench, gradient: "from-zinc-500 to-stone-600" },
    ],
  },
  {
    name: "Marketing & AI",
    icon: BrainCircuit,
    skills: [
      { name: "Creative Strat.", level: 82, icon: Lightbulb, gradient: "from-yellow-400 to-orange-500" },
      { name: "Advertising", level: 80, icon: Megaphone, gradient: "from-red-500 to-pink-500" },
      { name: "Artificial Intel.", level: 78, icon: Bot, gradient: "from-violet-500 to-purple-500" },
      { name: "Gen AI Leadership", level: 76, icon: BrainCircuit, gradient: "from-cyan-500 to-blue-500" },
    ],
  },
]


function BinaryParticle({ style }: { style: React.CSSProperties }) {
  return (
    <div
      className="absolute font-mono text-primary/10 select-none pointer-events-none animate-float-up"
      style={style}
    >
      {Math.random() > 0.5 ? "1" : "0"}
    </div>
  )
}

function SkillCard({
  name,
  level,
  icon: Icon,
  gradient,
  index,
}: {
  name: string
  level: number
  icon: React.ElementType
  gradient: string
  index: number
}) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    
    const timer = setTimeout(() => setShow(true), index * 100)
    return () => clearTimeout(timer)
  }, [index])

  return (
    <div
      className={`group relative bg-white/5 dark:bg-black/20 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:border-white/20 transition-all duration-500 transform ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-4">
        <div
          className={`p-2.5 rounded-lg bg-gradient-to-br ${gradient} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
        >
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
            {name}
          </h4>
          <p className="text-xs text-muted-foreground font-mono">Proficiency: {level}%</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-2 bg-secondary/50 rounded-full overflow-hidden relative">
        <div
          className={`h-full bg-gradient-to-r ${gradient} rounded-full transition-all duration-1000 ease-out relative`}
          style={{ width: show ? `${level}%` : "0%" }}
        >
          {/* Shimmer Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:animate-shimmer" />
        </div>
        
        {/* Glow under the bar */}
        <div
          className={`absolute top-0 left-0 h-full w-full blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-500 bg-gradient-to-r ${gradient}`}
          style={{ width: `${level}%` }}
        />
      </div>
    </div>
  )
}

export function SkillsSection() {
  const [activeTab, setActiveTab] = useState(0)
  const [mounted, setMounted] = useState(false)

  const particles = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      style: {
        left: `${Math.random() * 100}%`,
        fontSize: `${Math.random() * 1.5 + 0.5}rem`,
        animationDuration: `${Math.random() * 10 + 10}s`,
        animationDelay: `-${Math.random() * 10}s`,
      } as React.CSSProperties,
    }))
  }, [])

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section id="skills" className="py-24 px-4 relative overflow-hidden bg-background">
      {/* CSS-based Background Animation */}
      <style jsx global>{`
        @keyframes float-up {
          0% { transform: translateY(110vh); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-10vh); opacity: 0; }
        }
        .animate-float-up {
          animation-name: float-up;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          bottom: -20px;
        }
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }
      `}</style>

      {/* Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {mounted && particles.map((p) => <BinaryParticle key={p.id} style={p.style} />)}
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
        
        {}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Code2 className="w-4 h-4" />
            <span>Expertise & Stack</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
            Technical Proficiency
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            A diverse skillset spanning software engineering, leadership, and modern AI strategies.
          </p>
        </div>

        {/* Tab Navigation (Pill Style) */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <div className="bg-secondary/50 p-1.5 rounded-2xl inline-flex flex-wrap justify-center gap-2 backdrop-blur-sm border border-border/50">
            {skillCategories.map((category, index) => {
              const isActive = activeTab === index
              const Icon = category.icon
              return (
                <button
                  key={category.name}
                  onClick={() => setActiveTab(index)}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-background text-foreground shadow-sm ring-1 ring-black/5 dark:ring-white/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-primary" : ""}`} />
                  {category.name}
                </button>
              )
            })}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="min-h-[400px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {skillCategories[activeTab].skills.map((skill, index) => (
              <SkillCard
                key={`${activeTab}-${skill.name}`} // Force re-render on tab change for animation
                index={index}
                {...skill}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}