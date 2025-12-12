"use client"

import { useInView } from "@/hooks/use-in-view"
import { GraduationCap, Calendar } from "lucide-react"

export function EducationSection() {
  const { ref, isInView } = useInView()

  return (
    <section id="education" className="py-20 px-4 bg-secondary/30">
      <div className="container mx-auto max-w-4xl">
        <div
          ref={ref}
          className={`transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-3">
            <span className="text-primary">🎓</span> Education
          </h2>
          <div className="w-20 h-1 bg-primary rounded-full mb-8" />

          <div className="glass rounded-2xl p-6 md:p-8 hover:-translate-y-1 transition-all duration-300 group hover:border-primary/50">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/20 rounded-xl group-hover:bg-primary/30 transition-colors">
                <GraduationCap className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-bold mb-1">De La Salle Lipa</h3>
                <p className="text-primary font-medium mb-3">Bachelor&apos;s Degree in Computer Science</p>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>Aug 2024 – Jun 2028</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
