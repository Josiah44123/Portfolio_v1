"use client"

import { useState } from "react"
import { ExternalLink, Github, Layers, Monitor, Database } from "lucide-react"
import { cn } from "@/lib/utils"

const projects = [
 {
    title: "Productivity Hub",
    description:
      "A high-performance personal dashboard featuring real-time task tracking, dynamic progress visualization, and integrated resource management tools.",
    tags: ["React", "Node.js", "PostgreSQL", "Tailwind CSS"],
    github: "https://github.com/Josiah44123/v1productivity-app", // Add your repo link here
    demo: "https://personalizedproductivityhub.vercel.app",   // Add your hosted link here
    category: "Web App",
    icon: <Layers className="w-6 h-6" />,
    color: "from-orange-500 to-rose-500", // Matches the 'Productivity Hub' logo colors
  },
 
]

export function ProjectsSection() {
  const [filter, setFilter] = useState("All")
  const categories = ["All", "Web App", "Software", "Design"]

  const filteredProjects = filter === "All" ? projects : projects.filter((p) => p.category === filter)

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
              My <span className="text-primary">Projects</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              A collection of technical solutions and digital experiences crafted with precision.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={cn(
                  "px-5 py-2 rounded-full text-sm font-medium transition-all duration-300",
                  filter === cat
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "glass hover:bg-white/10",
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => (
            <div
              key={idx}
              className="group relative glass rounded-3xl overflow-hidden border border-white/5 hover:border-primary/30 transition-all duration-500 animate-fade-in-up"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className={cn("h-2 w-full bg-gradient-to-r", project.color)} />

              <div className="p-8">
                <div
                  className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-xl",
                    project.color,
                  )}
                >
                  {project.icon}
                </div>

                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{project.title}</h3>
                <p className="text-muted-foreground mb-6 line-clamp-3">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 mt-auto pt-4 border-t border-white/5">
                  <a
                    href={project.github}
                    className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
                  >
                    <Github className="w-4 h-4" /> Code
                  </a>
                  <a
                    href={project.demo}
                    className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" /> Live Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
