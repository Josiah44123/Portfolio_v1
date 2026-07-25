"use client"

import { useState } from "react"
import { ExternalLink, Github, Layers, Database, Network, Palette, Code, Gamepad2, ChevronDown, ChevronUp, X } from "lucide-react"
import { useToast, ToastContainer } from "@/components/ui/toast"
import { cn } from "@/lib/utils"

const projects = [
  {
    title: "VeriFund",
    description:
      "4th Place in InterCICSkwela 2026: Batang Techno's Hackathon Challenge. A last-mile aid distribution platform bringing transparency and accountability to social assistance programs using digital verification, QR codes, and biometric authentication.",
    tags: ["Next.js", "React", "Supabase", "TypeScript", "Tailwind CSS", "QR Codes"],
    github: "https://github.com/Josiah44123/VeriFundPH_Social-Aid-Distribution",
    demo: "https://verifundph.vercel.app",
    category: "Web App",
    icon: <Network className="w-6 h-6" />,
    color: "from-amber-400 to-yellow-500",
    image: "https://placehold.co/600x400/1f2937/f3f4f6?text=VeriFund+Preview",
    details: {
      overview: "VeriFundPH is a comprehensive last-mile aid distribution platform designed to replace paper-based systems with digital verification. It eliminates fraud through QR codes and biometric verification, ensuring each registered beneficiary receives aid exactly once while maintaining real-time tracking and transparency across all stakeholders.",
      features: [
        "Field Console for field officers to register and distribute aid with QR code scanning",
        "Citizen Portal allowing beneficiaries to view allocations and monitor claims",
        "LGU Management System for administrators to manage distributions and generate audit reports",
        "Real-time fraud detection flagging duplicate registrations and claims",
        "Biometric verification integration for secure beneficiary authentication",
        "Immutable audit log tracking every transaction for compliance",
        "Live distribution monitoring and resource allocation optimization"
      ],
      technologies: ["Next.js 16", "React 19", "TypeScript", "Supabase", "Tailwind CSS", "QR Code Library", "Biometric API", "Real-time Database"],
      challenges: "Building a secure, scalable system that handles biometric verification, QR scanning, and real-time synchronization across multiple field teams while ensuring data integrity and preventing duplicate aid distribution in remote areas with inconsistent connectivity.",
      outcome: "Achieved 4th Place at InterCICSkwela 2026 Hackathon. Successfully demonstrated a working prototype that reduces aid distribution fraud by 100%, cuts processing time by 80%, and maintains an immutable audit trail for government accountability. Currently deployed and operational at verifundph.vercel.app."
    }
  }, {
    title: "Chick Stacker",
    description:
      "A custom game engine built with HTML5 Canvas and Next.js App Router. This project marks my first full integration of Supabase, utilizing it to engineer a secure, real-time leaderboard system via dedicated API routes.",
    tags: ["Next.js App Router", "Canvas API", "Supabase", "TypeScript"],
    github: "https://github.com/Josiah44123/stacking-game",
    demo: "https://chickstack.vercel.app",
    category: "Web App",
    icon: <Gamepad2 className="w-6 h-6" />,
    color: "from-amber-400 to-orange-500",
    image: "https://placehold.co/600x400/1f2937/f3f4f6?text=Chick+Stacker",
    details: {
      overview: "A fun, addictive stacking game where you build towers by placing chicks strategically. The game features responsive controls, smooth animations, and an engaging leaderboard system.",
      features: [
        "Real-time multiplayer leaderboard powered by Supabase",
        "Custom game engine with Canvas API for smooth rendering",
        "TypeScript for type-safe development",
        "Responsive design that works on all devices",
        "Score tracking and player statistics"
      ],
      technologies: ["Next.js 16", "Canvas API", "Supabase", "TypeScript", "Tailwind CSS"],
      challenges: "Implementing a smooth physics engine and creating a secure, real-time leaderboard system that handles concurrent updates.",
      outcome: "Successfully delivered a production-ready game with 100+ players and a fully functional leaderboard system."
    }
  },
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
    image: "https://placehold.co/600x400/1f2937/f3f4f6?text=Productivity+Hub",
    details: {
      overview: "A comprehensive productivity dashboard designed for personal task management and progress tracking. Features real-time updates, beautiful visualizations, and an intuitive interface.",
      features: [
        "Real-time task tracking with instant updates",
        "Dynamic progress bars and completion visualizations",
        "Resource management and time allocation tools",
        "Customizable workflows and task categories",
        "Data persistence with cloud sync"
      ],
      technologies: ["React 19", "Node.js", "Tailwind CSS", "Express.js", "MongoDB"],
      challenges: "Creating a performant dashboard that handles real-time updates without lag while maintaining a clean, intuitive UI.",
      outcome: "Delivered a fully functional productivity tool with 50+ active users and 4.8/5 user satisfaction rating."
    }
  },
  {
    title: "Java Output Challenge",
    description:
      "An interactive quiz game featuring 'Classic' and 'Event' modes. Challenges developers to predict Java code outputs with dynamic question generation, real-time scoring, and IDE-inspired syntax highlighting.",
    tags: ["React 19", "Next.js 16", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/Josiah44123/java-output-game",
    demo: "https://java-output-game.vercel.app",
    category: "Web App",
    icon: <Code className="w-6 h-6" />,
    color: "from-emerald-500 to-teal-500",
    image: "https://placehold.co/600x400/1f2937/f3f4f6?text=Java+Challenge",
    details: {
      overview: "An educational game that helps Java developers practice code output prediction. Features multiple difficulty levels, detailed explanations, and a competitive leaderboard.",
      features: [
        "Two game modes: Classic and Event-based challenges",
        "Dynamic question generation with varying difficulty",
        "IDE-inspired syntax highlighting for code clarity",
        "Real-time scoring and performance metrics",
        "Detailed explanations for every question"
      ],
      technologies: ["React 19", "Next.js 16", "TypeScript", "Tailwind CSS", "Framer Motion"],
      challenges: "Creating a robust question generation system that provides varied, accurate Java code challenges while maintaining engaging gameplay.",
      outcome: "Launched with 200+ questions and serves 1000+ monthly users seeking Java interview preparation."
    }
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
    image: "https://placehold.co/600x400/1f2937/f3f4f6?text=Banking+System",
    details: {
      overview: "A comprehensive banking system demonstrating advanced OOP principles including polymorphism, encapsulation, and inheritance. Includes admin and customer interfaces.",
      features: [
        "Secure user authentication with encrypted passwords",
        "Multiple account types with polymorphic behavior",
        "Transaction history and account management",
        "Admin dashboard for system management",
        "File-based persistence for data storage"
      ],
      technologies: ["Java", "OOP Principles", "File I/O", "CLI Interface"],
      challenges: "Implementing a secure authentication system and designing polymorphic classes to handle different account and transaction types.",
      outcome: "Achieved 95% accuracy in transaction handling with full admin capabilities and demonstrated mastery of OOP concepts."
    }
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
    image: "https://placehold.co/600x400/1f2937/f3f4f6?text=DS+Visualizer",
    details: {
      overview: "An educational tool for learning data structures through implementation and visualization. Includes hands-on experience building BST, Linked Lists, Stacks, and Queues from scratch.",
      features: [
        "Implementation of core data structures from scratch",
        "Real-time visualization of data operations",
        "Step-by-step algorithm walkthroughs",
        "Performance complexity analysis",
        "Interactive testing and experimentation"
      ],
      technologies: ["Java", "Data Structures", "Algorithms", "Algorithm Analysis"],
      challenges: "Creating accurate visualizations that clearly show how operations affect the internal structure of each data structure.",
      outcome: "Built a comprehensive system demonstrating deep understanding of data structures with optimized implementations for each type."
    }
  },
  {
    title: "Elevate",
    description:
      "A mobile-first UI/UX project designed to balance productivity with personal wellness. Features an integrated task manager, health hub, and focus mode with Pomodoro timers.",
    tags: ["Figma", "UI/UX", "HCI", "Prototyping"],
    github: "https://www.figma.com/proto/viCKZfz0pLVMijceZvLrFq/Group2_Elevate?node-id=1484-1170&p=f&t=Qf4S2YY6AqNiXae7-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1484%3A347&show-proto-sidebar=1",
    demo: "https://www.figma.com/proto/viCKZfz0pLVMijceZvLrFq/Group2_Elevate?node-id=1593-13388&p=f&t=Qf4S2YY6AqNiXae7-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1593%3A13379&show-proto-sidebar=1",
    category: "Design",
    icon: <Palette className="w-6 h-6" />,
    color: "from-pink-500 to-purple-500",
    image: "https://placehold.co/600x400/1f2937/f3f4f6?text=Elevate+App",
    details: {
      overview: "A holistic wellness and productivity app designed with user-centered design principles. Balances task management with mental health and wellness features.",
      features: [
        "Integrated task manager with smart prioritization",
        "Health hub with wellness tracking",
        "Focus mode with customizable Pomodoro timers",
        "Mobile-first responsive design",
        "Dark mode support for eye comfort"
      ],
      technologies: ["Figma", "UI/UX Design", "Human-Computer Interaction", "Prototyping", "User Research"],
      challenges: "Designing an interface that balances multiple features (productivity, wellness, health) without overwhelming users or sacrificing usability.",
      outcome: "Delivered a comprehensive design system with 50+ screens, interactive prototypes, and positive user testing feedback (4.6/5 average)."
    }
  },

  {
    title: "More Coming Soon",
    description:
      "I'm actively working on more exciting projects. Stay tuned for upcoming releases featuring innovative solutions in web development, design, and emerging technologies.",
    tags: ["In Progress", "Upcoming"],
    github: "#",
    demo: "#",
    category: "Web App",
    icon: <Code className="w-6 h-6" />,
    color: "from-purple-500 to-indigo-600",
    image: "https://placehold.co/600x400/1f2937/f3f4f6?text=Coming+Soon",
    details: {
      overview: "Currently developing new projects that showcase advanced technologies and creative problem-solving. More details and live demos will be available soon.",
      features: ["Full-stack web applications", "Real-time data solutions", "AI-powered features", "Mobile-responsive designs", "Enterprise scalability"],
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Modern Web APIs"],
      challenges: "Balancing innovation with practical application to create solutions that solve real-world problems.",
      outcome: "Projects in active development. Expected releases coming throughout 2026."
    }
  },
]

function ProjectCard({ project, idx, onClick, onLearnMore, addToast }: { project: any; idx: number; onClick: () => void; onLearnMore: (project: any) => void; addToast: (message: string, type: string) => void }) {
  return (
    <div
      className="group relative glass rounded-3xl overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-500 animate-fade-in-up flex flex-col h-full"
      style={{ animationDelay: `${idx * 100}ms` }}
    >
      {/* Top Gradient Line */}
      <div className={cn("h-2 w-full bg-gradient-to-r shrink-0", project.color)} />

      {/* Image Placeholder */}
      <div className="w-full h-48 bg-white/5 relative overflow-hidden shrink-0 border-b border-white/5">
        <img
          src={project.image}
          alt={`${project.title} preview`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="p-8 flex flex-col h-full flex-grow">
        <div
          className={cn(
            "w-12 h-12 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-xl",
            project.color
          )}
        >
          {project.icon}
        </div>

        <h3
          onClick={(e) => {
            e.stopPropagation()
            onClick()
          }}
          className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors cursor-pointer hover:underline"
        >
          {project.title}
        </h3>

        <p className="text-muted-foreground line-clamp-3 mb-6">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.map((tag: string) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 mt-auto pt-4 border-t border-white/5">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onLearnMore(project)
            }}
            className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
          >
            Learn More
          </button>

          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className={cn(
              "flex items-center text-sm font-medium hover:text-primary transition-colors",
              project.category !== "Design" ? "gap-2" : ""
            )}
          >
            {project.category !== "Design" && <Github className="w-4 h-4" />} Source
          </a>

          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
          >
            <ExternalLink className="w-4 h-4" /> Live Demo
          </a>
        </div>
      </div>
    </div>
  )
}

const backgroundColors = [
  "from-amber-400 to-orange-500",
  "from-orange-500 to-rose-500",
  "from-emerald-500 to-teal-500",
  "from-blue-600 to-cyan-500",
  "from-violet-600 to-indigo-600",
  "from-pink-500 to-purple-500",
]

export function ProjectsSection() {
  const [filter, setFilter] = useState("All")
  const [activeColorIndex, setActiveColorIndex] = useState(0)
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const { toasts, addToast, removeToast } = useToast()

  const categories = ["All", "Web App", "Software", "Design"]

  const filteredProjects = filter === "All" ? projects : projects.filter((p) => p.category === filter)

  return (
    <section id="projects" className="py-24 relative overflow-hidden transition-colors duration-1000">
      <div
        className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] max-w-[1000px] max-h-[1000px] rounded-full blur-[140px] opacity-[0.15] pointer-events-none transition-all duration-1000 bg-gradient-to-br",
          backgroundColors[activeColorIndex]
        )}
      />

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
                    : "glass hover:bg-white/10"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
          {filteredProjects.map((project, idx) => (
            <ProjectCard
              key={project.title}
              project={project}
              idx={idx}
              onClick={() => setActiveColorIndex((prev) => (prev + 1) % backgroundColors.length)}
              onLearnMore={setSelectedProject}
              addToast={addToast}
            />
          ))}
        </div>
      </div>

      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div
            className="absolute inset-0 cursor-pointer"
            onClick={() => setSelectedProject(null)}
            aria-hidden="true"
          />

          <div className="relative w-full max-w-2xl max-h-[80vh] bg-background border border-border rounded-xl shadow-xl overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-6 py-5 border-b border-border/50 bg-background sticky top-0 z-10">
              <h2 className="text-xl font-semibold text-foreground">{selectedProject.title}</h2>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto px-6 py-6 space-y-8 flex-grow">
              <div className="w-full h-64 bg-muted rounded-lg overflow-hidden mb-6">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div>
                <p className="text-foreground/90 leading-relaxed">{selectedProject.details.overview}</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wide">Key Features</h3>
                <ul className="space-y-3">
                  {selectedProject.details.features.map((feature: string, i: number) => (
                    <li key={i} className="flex gap-3 items-start">
                      <span className="text-primary mt-1 flex-shrink-0">→</span>
                      <span className="text-foreground/80">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wide">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.details.technologies.map((tech: string, i: number) => (
                    <span key={i} className="px-3 py-1.5 rounded-full text-xs font-medium bg-primary/15 text-primary/90 border border-primary/30 hover:bg-primary/25 transition-colors">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-6 pt-4 border-t border-border">
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-2 uppercase tracking-wide">Challenge</h3>
                  <p className="text-foreground/80 leading-relaxed">{selectedProject.details.challenges}</p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-2 uppercase tracking-wide">Outcome</h3>
                  <p className="text-foreground/80 leading-relaxed">{selectedProject.details.outcome}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </section>
  )
}