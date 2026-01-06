"use client"

import { useState } from "react"
import { ExternalLink, Github, Layers, Database, Network, Palette } from "lucide-react"
import { cn } from "@/lib/utils"

const projects = [
  {
    title: "Productivity Hub",
    description:
      "A high-performance personal dashboard featuring real-time task tracking, dynamic progress visualization, and integrated resource management tools.",
    tags: ["React", "Node.js", "Tailwind CSS"],
    github: "https://github.com/Josiah44123/v1productivity-app",
    demo: "https://personalizedproductivityhub.vercel.app",
    category: "Web App",
    icon: <Layers className="w-6 h-6" />,
    color: "from-orange-500 to-rose-500",
  },
  {
    title: "Advanced Banking System",
    description:
      "A robust terminal-based banking simulation demonstrating core OOP principles. Features secure user authentication, polymorphic transaction handling, admin dashboards, and file-based data persistence.",
    tags: ["Java", "OOP", "File Handling", "CLI"],
    github: "https://github.com/Josiah44123/C2A-OOProg-Finals",
    demo: "https://github.com/Josiah44123/C2A-OOProg-Finals",
    category: "Software",
    icon: <Database className="w-6 h-6" />,
    color: "from-blue-600 to-cyan-500",
  },
  {
    title: "Data Structures Visualizer",
    description:
      "An educational system building core data structures (BST, Linked Lists, Stacks, Queues) from scratch. Focuses on algorithmic efficiency and real-time visualization of data operations.",
    tags: ["Java", "Algorithms", "Data Structures", "Visualization"],
    github: "https://github.com/Josiah44123/C2A-Datastrc-Finals",
    demo: "https://github.com/Josiah44123/C2A-Datastrc-Finals",
    category: "Software",
    icon: <Network className="w-6 h-6" />,
    color: "from-violet-600 to-indigo-600",
  },
  {
    title: "Elevate",
    description:
      "A mobile-first UI/UX project designed to balance productivity with personal wellness. Features an integrated task manager, health hub, and focus mode with Pomodoro timers.",
    tags: ["Figma", "UI/UX", "HCI", "Prototyping"],
    // Updated link for the Source button
    github: "https://www.figma.com/proto/viCKZfz0pLVMijceZvLrFq/Group2_Elevate?node-id=1484-1170&p=f&t=Qf4S2YY6AqNiXae7-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1484%3A347&show-proto-sidebar=1",
    demo: "https://www.figma.com/proto/viCKZfz0pLVMijceZvLrFq/Group2_Elevate?node-id=1593-13388&p=f&t=Qf4S2YY6AqNiXae7-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1593%3A13379&show-proto-sidebar=1",
    category: "Design",
    icon: <Palette className="w-6 h-6" />,
    color: "from-pink-500 to-purple-500",
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
              A collection of technical solutions, programs and digital experiences crafted with precision.
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
                  {/* Conditionally render Github icon based on category */}
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "flex items-center text-sm font-medium hover:text-primary transition-colors",
                      project.category !== "Design" ? "gap-2" : "",
                    )}
                  >
                    {project.category !== "Design" && <Github className="w-4 h-4" />} Source
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
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