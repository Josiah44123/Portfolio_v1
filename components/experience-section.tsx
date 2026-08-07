"use client"

import { useInView } from "@/hooks/use-in-view"
import { Briefcase, Calendar, ChevronRight } from "lucide-react"

interface Experience {
  role: string
  organization: string
  duration: string
  responsibilities: string[]
}

export function ExperienceSection() {
  const { ref, isInView } = useInView()

  const experiences: Experience[] = [
    {
      role: "President",
      organization: "Junior Philippine Computer Society (DLSL Chapter)",
<<<<<<< HEAD
      duration: "Present", 
=======
      duration: "Present",
>>>>>>> 2b6e0d7d90f8b1a10f1529d1cfdea1ca807d34f4
      responsibilities: [
        "Provides overall leadership, strategic direction, and vision for the student chapter",
        "Oversees executive officers, organizational committees, and general assemblies",
        "Represents the organization in official school-wide and national events",
        "Fosters student community growth and professional development in IT/CS fields"
      ]
    },
    {
      role: "Project Head for External Affairs",
      organization: "Junior Philippine Computer Society (DLSL Chapter)",
      duration: "Jun 2025 – Present",
      responsibilities: [
        "Leads external partnerships and organizational communication",
        "Applies project management for events, collaborations, and planning",
        "Works closely with internal and external stakeholders",
      ]
    }
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

          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border md:left-1/2 md:-translate-x-1/2" />

            <div className="space-y-12">
              {experiences.map((exp, index) => {
                const isEven = index % 2 === 0
                return (
                  <div
                    key={index}
                    className={`flex flex-col md:flex-row relative ${
                      isEven ? "md:justify-start" : "md:justify-end"
                    }`}
                  >
                    <div className="absolute left-6 md:left-1/2 -translate-x-[7px] top-8 w-4 h-4 bg-primary rounded-full border-4 border-background z-10 animate-pulse-glow" />

                    <div
                      className={`glass rounded-2xl p-6 md:p-8 ml-12 md:ml-0 md:w-[calc(50%-2rem)] hover:-translate-y-1 transition-all duration-300 group hover:border-primary/50`}
                    >
                      <div className="flex items-start gap-3 mb-4">
                        <Briefcase className="w-6 h-6 text-primary flex-shrink-0" />
                        <div>
                          <h3 className="text-lg md:text-xl font-bold">{exp.role}</h3>
                          <p className="text-primary font-medium">{exp.organization}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-muted-foreground mb-4">
                        <Calendar className="w-4 h-4" />
                        <span>{exp.duration}</span>
                      </div>

                      <ul className="space-y-2">
                        {exp.responsibilities.map((bullet, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                            <ChevronRight className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
