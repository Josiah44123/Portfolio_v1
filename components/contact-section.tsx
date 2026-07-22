"use client"
import { useState } from "react"
import { useInView } from "@/hooks/use-in-view"
import { Mail, Phone, Linkedin, Github, Download, ExternalLink } from "lucide-react"
import { useToast, ToastContainer } from "@/components/ui/toast"

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
    value: "+63 938 394 4834",
    href: "tel:+639383944834", 
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
    href: "https://github.com/Josiah44123",
    color: "from-gray-500 to-gray-700",
  },
]

export function ContactSection() {
  const { ref, isInView } = useInView()
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [submitted, setSubmitted] = useState(false)
  const { toasts, addToast, removeToast } = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (formData.name && formData.email && formData.message) {
      addToast(`Thank you, ${formData.name}! I've received your message and will get back to you soon.`, "success", 5000)
      setFormData({ name: "", email: "", message: "" })
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 3000)
    } else {
      addToast("Please fill in all fields before submitting!", "error")
    }
  }

  return (
    <section id="contact" className="py-20 px-4 bg-secondary/30">
      <div className="container mx-auto max-w-4xl">
        <div
          ref={ref}
          className={`transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-2 flex items-center justify-center gap-3">
              <span className="text-primary">📬</span> Get In Touch!
            </h2>
            <div className="w-20 h-1 bg-primary rounded-full mb-4 mx-auto" />
            <p className="text-muted-foreground max-w-2xl mx-auto">
              I&apos;m always open to discussing about new opportunities, collaborations, or just having a chat regarding
              technology and innovation.
            </p>
          </div>
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

          <div className="glass rounded-xl p-8 mb-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold mb-6 text-center">Send Me a Message</h3>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your name"
                    className="w-full px-4 py-2 rounded-lg bg-background border border-white/10 focus:border-primary/50 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    className="w-full px-4 py-2 rounded-lg bg-background border border-white/10 focus:border-primary/50 focus:outline-none transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Your message here..."
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg bg-background border border-white/10 focus:border-primary/50 focus:outline-none transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:scale-105 transition-all duration-300"
              >
                Send Message
              </button>
              {submitted && (
                <p className="text-center text-green-500 text-sm font-medium">
                  Message submitted successfully! ✓
                </p>
              )}
            </form>
          </div>
          
          <div className="text-center">
            <a
              href="/images/CV.pdf"
              download="Josiah_Lamuel_Rosell_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-medium transition-all duration-300 hover:scale-105 hover:glow group cursor-pointer"
            >
              <Download className="w-5 h-5 group-hover:animate-bounce" />
              Download   CV
            </a>
          </div>
        </div>
      </div>

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </section>
  )
}
