"use client"

import { useInView } from "@/hooks/use-in-view"
import { ExternalLink, Calendar, Shield } from "lucide-react"

const certifications = [
  {
    title: "Essentials of Property Management Work",
    issuer: "Alison",
    date: "Issued Nov 2025",
    credentialId: "5776-53971925",
    skills: ["Real Estate", "Project Management", "Property Management"],
    badge: "CPD Certified",
    icon: "🏢",
  },
  {
    title: "Generative AI for Business Leaders",
    issuer: "LinkedIn Learning",
    date: "Issued Nov 2025",
    credentialId: "167690530",
    skills: ["AI", "Generative AI for Leadership", "AI for Management"],
    icon: "🤖",
  },
  {
    title: "Google Ads Creative Certification",
    issuer: "Google Skillshop",
    date: "Issued Nov 2025 · Expires Nov 2026",
    credentialId: "167690530",
    skills: ["Creative Strategy", "Advertising"],
    icon: "🎨",
  },
  {
    title: "Google Ads Display Certification",
    issuer: "Google Skillshop",
    date: "Issued Jun 2025 · Expires Jun 2026",
    credentialId: "150130236",
    skills: ["Advertising"],
    icon: "📊",
  },
  {
    title: "Project Management Foundations",
    issuer: "LinkedIn Learning",
    date: "Issued Jun 2025",
    credentialId: "N/A",
    skills: ["Project Management"],
    icon: "📋",
  },
  {
    title: "Start and Improve Your Business",
    issuer: "TESDA",
    date: "Issued Jun 2025",
    credentialId: "N/A",
    credentialUrl: "https://www.linkedin.com/in/josiahlamuelrosell/details/certifications/",
    skills: ["New Business Development"],
    icon: "🚀",
  },
  {
    title: "DLSL – Java Programming 1",
    issuer: "CodeChum",
    date: "Issued Mar 2025",
    credentialId: "N/A",
    credentialUrl: "https://drive.google.com/file/d/1gkXoX1bYxX3Y2F1Q1Z2Z3Z4Z5Z6Z7Z8Z/view?usp=sharing",
    skills: ["Java Programming"],
    icon: "☕",
  },
  {
    title: "Managing Your Personal Finances",
    issuer: "TESDA",
    date: "Issued Jun 2020",
    credentialId: "N/A",
    credentialUrl: "https://drive.google.com/file/d/1gkXoX1bYxX3Y2F1Q1Z2Z3Z4Z5Z6Z7Z8Z/view?usp=sharing",
    skills: ["Finance"],
    icon: "💰",
  },
]

export function CertificationsSection() {
  const { ref, isInView } = useInView()

  return (
    <section id="certifications" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div
          ref={ref}
          className={`transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-3">
            <span className="text-primary">📜</span> Certifications
          </h2>
          <div className="w-20 h-1 bg-primary rounded-full mb-8" />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert, index) => (
              <div
                key={cert.title}
                className="glass rounded-2xl p-6 hover:-translate-y-2 transition-all duration-300 group hover:border-primary/50 hover:glow-sm cursor-pointer"
                style={{
                  transitionDelay: `${index * 50}ms`,
                  opacity: isInView ? 1 : 0,
                  transform: isInView ? "translateY(0)" : "translateY(20px)",
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl">{cert.icon}</span>
                  {cert.badge && (
                    <span className="flex items-center gap-1 text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                      <Shield className="w-3 h-3" />
                      {cert.badge}
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors line-clamp-2">
                  {cert.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-2">{cert.issuer}</p>

                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                  <Calendar className="w-3 h-3" />
                  <span>{cert.date}</span>
                </div>

                <div className="text-xs text-muted-foreground mb-3 font-mono">ID: {cert.credentialId}</div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {cert.skills.map((skill) => (
                    <span key={skill} className="text-xs bg-secondary px-2 py-1 rounded-md text-secondary-foreground">
                      {skill}
                    </span>
                  ))}
                </div>

                <button className="flex items-center gap-1 text-sm text-primary hover:underline group-hover:translate-x-1 transition-transform">
                  View Credential <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
