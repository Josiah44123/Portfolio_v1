"use client"

import { useInView } from "@/hooks/use-in-view"
import { Briefcase, Calendar, ChevronRight } from "lucide-react"

export function ExperienceSection() {
  const { ref, isInView } = useInView()

  const responsibilities = [
    "Leads external partnerships and organizational communication",
    "Applies project management for events, collaborations, and planning",
    "Works closely with internal and external stakeholders",
  ]

  return (
    <section id="experience" className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div
          ref={ref}
          className={`transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-3">
            <span className="text-primary">📌</span> Experience
          </h2>
          <div className="w-20 h-1 bg-primary rounded-full mb-8" />

          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border md:left-1/2 md:-translate-x-1/2" />

            <div className="glass rounded-2xl p-6 md:p-8 ml-12 md:ml-0 md:w-[calc(50%-2rem)] relative hover:-translate-y-1 transition-all duration-300 group hover:border-primary/50">
              {/* Timeline dot */}
              <div className="absolute left-[-2.25rem] top-8 w-4 h-4 bg-primary rounded-full border-4 border-background md:left-auto md:-right-[2.5rem] animate-pulse-glow" />

              <div className="flex items-start gap-3 mb-4">
                <Briefcase className="w-6 h-6 text-primary flex-shrink-0" />
                <div>
                  <h3 className="text-lg md:text-xl font-bold">Project Head for External Affairs</h3>
                  <p className="text-primary font-medium">Junior Philippine Computer Society (DLSL Chapter)</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-muted-foreground mb-4">
                <Calendar className="w-4 h-4" />
                <span>Jun 2025 – Present</span>
              </div>

              <ul className="space-y-2">
                {responsibilities.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-muted-foreground">
                    <ChevronRight className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
