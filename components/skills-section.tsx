"use client"

import type React from "react"

import { useInView } from "@/hooks/use-in-view"
import { useEffect, useState, useRef } from "react"
import { Code2, Users, Presentation, Search, Award } from "lucide-react"

const skills = [
  { name: "Java", level: 85, icon: Code2, gradient: "from-orange-500 to-red-500" },
  { name: "Project Management", level: 80, icon: Users, gradient: "from-blue-500 to-cyan-500" },
  { name: "Presentations", level: 90, icon: Presentation, gradient: "from-purple-500 to-pink-500" },
  { name: "Research", level: 85, icon: Search, gradient: "from-green-500 to-emerald-500" },
  { name: "Student Leadership", level: 88, icon: Award, gradient: "from-yellow-500 to-orange-500" },
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
            Top Skills
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full mb-8" />

          <div className="glass rounded-2xl p-6 md:p-8">
            {skills.map((skill, index) => (
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
