"use client"

import type React from "react"

import { useInView } from "@/hooks/use-in-view"
import { useEffect, useState, useRef } from "react"
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
} from "lucide-react"

const skillCategories = [
  {
    name: "Technical",
    skills: [
      { name: "Java", level: 85, icon: Code2, gradient: "from-orange-500 to-red-500" },
      { name: "Programming", level: 80, icon: Code2, gradient: "from-blue-500 to-indigo-500" },
      { name: "Research Skills", level: 85, icon: Search, gradient: "from-green-500 to-emerald-500" },
      { name: "Design", level: 75, icon: Palette, gradient: "from-pink-500 to-rose-500" },
    ],
  },
  {
    name: "Leadership",
    skills: [
      { name: "Project Management", level: 80, icon: FolderKanban, gradient: "from-blue-500 to-cyan-500" },
      { name: "Student Leadership", level: 88, icon: Award, gradient: "from-yellow-500 to-orange-500" },
      { name: "Presentations", level: 90, icon: Presentation, gradient: "from-purple-500 to-pink-500" },
      { name: "New Business Development", level: 75, icon: Rocket, gradient: "from-teal-500 to-green-500" },
    ],
  },
  {
    name: "Business",
    skills: [
      { name: "Property Management", level: 78, icon: Building2, gradient: "from-slate-500 to-gray-600" },
      { name: "Real Estate", level: 75, icon: Home, gradient: "from-amber-500 to-yellow-500" },
      { name: "Finance", level: 72, icon: Wallet, gradient: "from-emerald-500 to-teal-500" },
      { name: "Vehicle Maintenance", level: 70, icon: Wrench, gradient: "from-zinc-500 to-stone-600" },
    ],
  },
  {
    name: "Marketing & AI",
    skills: [
      { name: "Creative Strategy", level: 82, icon: Lightbulb, gradient: "from-yellow-400 to-orange-500" },
      { name: "Advertising", level: 80, icon: Megaphone, gradient: "from-red-500 to-pink-500" },
      { name: "Artificial Intelligence", level: 78, icon: Bot, gradient: "from-violet-500 to-purple-500" },
      { name: "Generative AI for Leadership", level: 76, icon: BrainCircuit, gradient: "from-cyan-500 to-blue-500" },
    ],
  },
]

const topSkills = [
  { name: "Presentations", gradient: "from-purple-500 to-pink-500" },
  { name: "Student Leadership", gradient: "from-yellow-500 to-orange-500" },
  { name: "Java", gradient: "from-orange-500 to-red-500" },
  { name: "Research", gradient: "from-green-500 to-emerald-500" },
  { name: "Creative Strategy", gradient: "from-yellow-400 to-orange-500" },
]

function FloatingBinarySkills({ id }: { id: number }) {
  const initialX = useRef(Math.random() * 100)
  const initialY = useRef(Math.random() * 100)
  const speed = useRef(0.2 + Math.random() * 0.15)
  const char = useRef(Math.random() > 0.5 ? "1" : "0")
  const size = useRef(8 + Math.random() * 4)

  const [pos, setPos] = useState({ x: initialX.current, y: initialY.current })

  useEffect(() => {
    const animate = () => {
      setPos((prev) => {
        let newY = prev.y - speed.current
        if (newY < -5) {
          newY = 105
          initialX.current = Math.random() * 100
        }
        return { x: initialX.current, y: newY }
      })
    }

    const interval = setInterval(animate, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className="absolute font-mono text-primary/20 pointer-events-none select-none"
      style={{
        left: `${pos.x}%`,
        top: `${pos.y}%`,
        fontSize: size.current,
        transform: "translate(-50%, -50%)",
      }}
    >
      {char.current}
    </div>
  )
}

function SkillBar({
  name,
  level,
  delay,
  icon: Icon,
  gradient,
}: {
  name: string
  level: number
  delay: number
  icon: React.ElementType
  gradient: string
}) {
  const [animated, setAnimated] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const { ref, isInView } = useInView()

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setAnimated(true), delay)
      return () => clearTimeout(timer)
    }
  }, [isInView, delay])

  return (
    <div
      ref={ref}
      className="mb-6 group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-3">
          <div
            className={`p-2 rounded-lg transition-all duration-300 ${
              isHovered ? `bg-gradient-to-br ${gradient} text-white scale-110` : "bg-secondary text-muted-foreground"
            }`}
          >
            <Icon className="w-4 h-4" />
          </div>
          <span className={`font-medium transition-colors duration-300 ${isHovered ? "text-foreground" : ""}`}>
            {name}
          </span>
        </div>
        <span
          className={`font-mono text-sm transition-all duration-300 ${
            isHovered ? "text-foreground scale-110" : "text-primary"
          }`}
        >
          {animated ? level : 0}%
        </span>
      </div>
      <div className="h-3 bg-secondary rounded-full overflow-hidden relative">
        <div
          className={`h-full bg-gradient-to-r ${gradient} rounded-full transition-all duration-1000 ease-out relative`}
          style={{ width: animated ? `${level}%` : "0%" }}
        >
          <div
            className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transition-opacity duration-300 ${
              isHovered ? "opacity-100 animate-shimmer" : "opacity-0"
            }`}
          />
        </div>
        <div
          className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${gradient} blur-sm transition-all duration-1000 ease-out`}
          style={{ width: animated ? `${level}%` : "0%", opacity: isHovered ? 0.8 : 0.4 }}
        />
      </div>
    </div>
  )
}

export function SkillsSection() {
  const { ref, isInView } = useInView()
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
  const floatingParticles = Array.from({ length: 15 }, (_, i) => i)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section id="skills" className="py-20 px-4 bg-secondary/30 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        {mounted && floatingParticles.map((id) => <FloatingBinarySkills key={id} id={id} />)}
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        <div
          ref={ref}
          className={`transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-accent">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            Skills
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full mb-4" />

          <div className="flex flex-wrap gap-2 mb-8">
            <span className="text-sm text-muted-foreground mr-2">Top:</span>
            {topSkills.map((skill) => (
              <span
                key={skill.name}
                className={`text-xs px-3 py-1.5 rounded-full bg-gradient-to-r ${skill.gradient} text-white font-medium`}
              >
                {skill.name}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {skillCategories.map((category, index) => (
              <button
                key={category.name}
                onClick={() => setActiveTab(index)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeTab === index
                    ? "bg-gradient-to-r from-primary to-accent text-white"
                    : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="glass rounded-2xl p-6 md:p-8">
            {skillCategories[activeTab].skills.map((skill, index) => (
              <SkillBar
                key={skill.name}
                name={skill.name}
                level={skill.level}
                delay={index * 150}
                icon={skill.icon}
                gradient={skill.gradient}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
