"use client"
import { useInView } from "@/hooks/use-in-view"
import { Mail, Phone, Linkedin, Github, Download, ExternalLink } from "lucide-react"

const contactLinks = [
  {
    icon: Mail,
    label: "Email Me",
    value: "roselljosiahlamuel@gmail.com",
    href: "mailto:roselljosiahlamuel@gmail.com",
    color: "from-red-500 to-orange-500",
  },
  {
    icon: Phone,
    label: "Call Me",
    value: "+63 991 529 3929",
    href: "tel:+639915293929", 
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "Connect with me",
    href: "https://www.linkedin.com/in/josiahlamuelrosell/",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "View my projects",
    href: "https://github.com/Josiah44123/portfolio",
    color: "from-gray-500 to-gray-700",
  },
]

export function ContactSection() {
  const { ref, isInView } = useInView()

  return (
    <section id="contact" className="py-20 px-4 bg-secondary/30">
      <div className="container mx-auto max-w-4xl">
        <div
          ref={ref}
          className={`transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-3">
            <span className="text-primary">📬</span> Get In Touch
          </h2>
          <div className="w-20 h-1 bg-primary rounded-full mb-4" />
          <p className="text-muted-foreground mb-8 max-w-2xl">
            I&apos;m always open to discussing new opportunities, collaborations, or just having a chat about
            technology and innovation.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {contactLinks.map((link, index) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="glass rounded-xl p-5 flex items-center gap-4 hover:-translate-y-1 transition-all duration-300 group hover:border-primary/50 hover:glow-sm"
                style={{
                  transitionDelay: `${index * 100}ms`,
                  opacity: isInView ? 1 : 0,
                  transform: isInView ? "translateY(0)" : "translateY(20px)",
                }}
              >
                <div className={`p-3 rounded-xl bg-gradient-to-br ${link.color} text-white`}>
                  <link.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold group-hover:text-primary transition-colors">{link.label}</h3>
                  <p className="text-sm text-muted-foreground">{link.value}</p>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            ))}
          </div>
          
          {/* Download CV Button */}
          <div className="text-center">
            <a
              href="/images/CV.pdf"
              download="Josiah_Lamuel_Rosell_CV.pdf" // Forces download with this specific filename
              target="_blank" // Fallback: opens in new tab if download fails
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-medium transition-all duration-300 hover:scale-105 hover:glow group cursor-pointer"
            >
              <Download className="w-5 h-5 group-hover:animate-bounce" />
              Download   CV
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}