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
  const [errors, setErrors] = useState({ name: "", email: "", message: "" })
  const [touched, setTouched] = useState({ name: false, email: false, message: false })
  const [submitted, setSubmitted] = useState(false)
  const { toasts, addToast, removeToast } = useToast()

  const validateForm = (values = formData) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

    return {
      name: values.name.trim() ? "" : "Please enter your name.",
      email: emailPattern.test(values.email.trim()) ? "" : "Please enter a valid email address.",
      message: values.message.trim() ? "" : "Please enter a message.",
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    const nextFormData = { ...formData, [name]: value }
    const nextTouched = { ...touched, [name]: true }
    const nextErrors = validateForm(nextFormData)

    setFormData(nextFormData)
    setTouched(nextTouched)
    setSubmitted(false)
    setErrors({
      name: nextTouched.name ? nextErrors.name : "",
      email: nextTouched.email ? nextErrors.email : "",
      message: nextTouched.message ? nextErrors.message : "",
    })
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const nextErrors = validateForm()
    setErrors(nextErrors)
    setTouched({ name: true, email: true, message: true })

    if (Object.values(nextErrors).some(Boolean)) return

    addToast(`Thank you, ${formData.name.trim()}! I've received your message and will get back to you soon.`, "success", 5000)
    setFormData({ name: "", email: "", message: "" })
    setErrors({ name: "", email: "", message: "" })
    setTouched({ name: false, email: false, message: false })
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
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
            <form onSubmit={handleFormSubmit} className="space-y-4" noValidate>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-medium">Name</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your name"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className="w-full px-4 py-2 rounded-lg bg-background border border-white/10 focus:border-primary/50 focus:outline-none transition-colors"
                  />
                  {errors.name && <p id="name-error" role="alert" className="mt-2 text-sm font-medium text-destructive">{errors.name}</p>}
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className="w-full px-4 py-2 rounded-lg bg-background border border-white/10 focus:border-primary/50 focus:outline-none transition-colors"
                  />
                  {errors.email && <p id="email-error" role="alert" className="mt-2 text-sm font-medium text-destructive">{errors.email}</p>}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-medium">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Your message here..."
                  rows={4}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  className="w-full px-4 py-2 rounded-lg bg-background border border-white/10 focus:border-primary/50 focus:outline-none transition-colors resize-none"
                />
                {errors.message && <p id="message-error" role="alert" className="mt-2 text-sm font-medium text-destructive">{errors.message}</p>}
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
