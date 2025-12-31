"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { ChevronDown, Github, Linkedin, Mail } from "lucide-react"

function TypeWriter({ texts, className }: { texts: string[]; className?: string }) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const text = texts[currentTextIndex]
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (currentText.length < text.length) {
            setCurrentText(text.slice(0, currentText.length + 1))
          } else {
            setTimeout(() => setIsDeleting(true), 2000)
          }
        } else {
          if (currentText.length > 0) {
            setCurrentText(text.slice(0, currentText.length - 1))
          } else {
            setIsDeleting(false)
            setCurrentTextIndex((prev) => (prev + 1) % texts.length)
          }
        }
      },
      isDeleting ? 50 : 100,
    )
    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, currentTextIndex, texts])

  return (
    <span className={className}>
      {currentText}
      <span className="animate-blink text-primary">|</span>
    </span>
  )
}

function FloatingBinary({ id, mousePos }: { id: number; mousePos: { x: number; y: number } }) {
  const initialX = useRef(Math.random() * 100)
  const initialY = useRef(Math.random() * 100)
  const speed = useRef(0.3 + Math.random() * 0.2)
  const char = useRef(Math.random() > 0.5 ? "1" : "0")
  const size = useRef(10 + Math.random() * 6)

  const [pos, setPos] = useState({ x: initialX.current, y: initialY.current })
  const [offset, setOffset] = useState({ x: 0, y: 0 })

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

  // Separate effect for cursor attraction - just visual offset, doesn't stop movement
  useEffect(() => {
    const dx = mousePos.x - pos.x
    const dy = mousePos.y - pos.y
    const distance = Math.sqrt(dx * dx + dy * dy)

    const attractionRadius = 15
    if (distance < attractionRadius && distance > 0) {
      const force = ((attractionRadius - distance) / attractionRadius) * 8
      setOffset({ x: (dx / distance) * force, y: (dy / distance) * force })
    } else {
      setOffset((prev) => ({ x: prev.x * 0.9, y: prev.y * 0.9 }))
    }
  }, [mousePos, pos])

  return (
    <div
      className="absolute font-mono text-primary/30 pointer-events-none select-none"
      style={{
        left: `${pos.x + offset.x}%`,
        top: `${pos.y + offset.y}%`,
        fontSize: size.current,
        transform: "translate(-50%, -50%)",
        transition: "left 0.1s ease-out, top 0.1s ease-out",
      }}
    >
      {char.current}
    </div>
  )
}

export function HeroSection() {
  const [mounted, setMounted] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 })
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setMousePos({ x, y })
  }

  const floatingParticles = Array.from({ length: 25 }, (_, i) => i)

  return (
    <section
      ref={sectionRef}
      id="home"
      className="min-h-screen flex flex-col items-center justify-center relative px-4 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Primary interactive glow */}
        <div
          className="absolute w-[600px] h-[600px] rounded-full blur-3xl transition-all duration-300 ease-out"
          style={{
            background: `radial-gradient(circle, oklch(0.72 0.18 195 / 0.25) 0%, transparent 70%)`,
            left: `${mousePos.x}%`,
            top: `${mousePos.y}%`,
            transform: "translate(-50%, -50%)",
          }}
        />
        {/* Secondary static glows for depth */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />

        {mounted && floatingParticles.map((id) => <FloatingBinary key={id} id={id} mousePos={mousePos} />)}
      </div>

      <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
        {/* Primary interactive glow */}
        <div
          className="absolute w-[600px] h-[600px] rounded-full blur-3xl transition-all duration-300 ease-out"
          style={{
            background: `radial-gradient(circle, oklch(0.72 0.18 195 / 0.25) 0%, transparent 70%)`,
            left: `${mousePos.x}%`,
            top: `${mousePos.y}%`,
            transform: "translate(-50%, -50%)",
          }}
        />
        {/* Secondary static glows for depth */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />

        {mounted && floatingParticles.map((id) => <FloatingBinary key={id} id={id} mousePos={mousePos} />)}
      </div>

      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="absolute top-20 left-8 w-20 h-20 border-l-2 border-t-2 border-primary/20 rounded-tl-xl" />
      <div className="absolute top-20 right-8 w-20 h-20 border-r-2 border-t-2 border-primary/20 rounded-tr-xl" />
      <div className="absolute bottom-20 left-8 w-20 h-20 border-l-2 border-b-2 border-primary/20 rounded-bl-xl" />
      <div className="absolute bottom-20 right-8 w-20 h-20 border-r-2 border-b-2 border-primary/20 rounded-br-xl" />

      <div className="hidden lg:flex absolute left-8 top-1/2 -translate-y-1/2 flex-col gap-5 items-center">
        <div className="w-px h-24 bg-gradient-to-b from-transparent via-primary/50 to-transparent" />
        <a
          href="https://github.com/Josiah44123"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 glass rounded-xl hover:bg-primary/20 hover:scale-110 transition-all duration-300"
        >
          <Github className="w-6 h-6 text-muted-foreground hover:text-primary" />
        </a>
        <a
          href="https://www.linkedin.com/in/josiahlamuelrosell/"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 glass rounded-xl hover:bg-primary/20 hover:scale-110 transition-all duration-300"
        >
          <Linkedin className="w-6 h-6 text-muted-foreground hover:text-primary" />
        </a>
        <a
          href="mailto:[your.email@example.com]"
          className="p-3 glass rounded-xl hover:bg-primary/20 hover:scale-110 transition-all duration-300"
        >
          <Mail className="w-6 h-6 text-muted-foreground hover:text-primary" />
        </a>
        <div className="w-px h-24 bg-gradient-to-b from-transparent via-primary/50 to-transparent" />
      </div>

      <div className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col gap-4 items-end">
        <div className="flex items-center gap-3 text-sm text-muted-foreground glass px-4 py-2 rounded-xl">
          <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
          <span className="font-medium">Open to opportunities</span>
        </div>
        <div className="text-sm text-muted-foreground/60 font-mono glass px-4 py-2 rounded-xl">DLSL • BSCS</div>
      </div>

      <div
        className={`text-center relative z-10 transition-all duration-1000 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <p className="text-primary font-mono text-sm md:text-base mb-4 tracking-wider">Hello, I&apos;m</p>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance">
          <span className="text-foreground">Josiah Lamuel</span>{" "}
          <span className="text-primary relative">
            Rosell
            <svg
              className="absolute -bottom-2 left-0 w-full"
              viewBox="0 0 200 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 5.5C47 2 153 2 199 5.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className="text-primary/50"
              />
            </svg>
          </span>
        </h1>

        <div className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-4 h-8">
          <TypeWriter
            texts={["Computer Science Student", "Aspiring Software Developer", "Tech Enthusiast", "Problem Solver"]}
            className="font-medium"
          />
        </div>

        <p className="text-base md:text-lg text-muted-foreground/80 max-w-xl mx-auto mb-10 text-pretty">
          Building solutions at the intersection of code, creativity, and purpose.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#certifications"
            className="group relative px-8 py-4 bg-primary text-primary-foreground rounded-xl font-medium overflow-hidden transition-all duration-300 hover:scale-105 hover:glow flex items-center justify-center gap-2"
          >
            <span className="relative z-10">View My Certifications</span>
            <ChevronDown className="w-4 h-4 relative z-10 group-hover:translate-y-1 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>
          <a
            href="#contact"
            className="group px-8 py-4 glass rounded-xl font-medium transition-all duration-300 hover:scale-105 hover:border-primary/50 flex items-center justify-center gap-2"
          >
            <Mail className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            Contact Me
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <a href="#about" className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 group">
        <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors">
          Scroll to explore
        </span>
        <ChevronDown className="w-6 h-6 text-muted-foreground animate-bounce group-hover:text-primary transition-colors" />
      </a>
    </section>
  )
}
