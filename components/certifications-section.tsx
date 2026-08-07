"use client"

import { useInView } from "@/hooks/use-in-view"
import {
  ExternalLink,
  Calendar,
  Shield,
  Building2,
  Bot,
  PenTool,
  BarChart3,
  FolderKanban,
  Rocket,
  Code2,
  Wallet,
  Database,
  Cpu, 
} from "lucide-react"

type Category = "Project Management" | "Internet of Things (IoT)" | "Data & AI" | "Development" | "Business & Management"

const certifications = [
  {
    title: "Project Management Foundations",
    issuer: "LinkedIn Learning",
    date: "Issued Jun 2025",
    credentialId: "N/A",
    credentialUrl: "https://www.linkedin.com/in/josiahlamuelrosell/details/certifications/",
    skills: ["Project Management", "Agile"],
    icon: FolderKanban,
    gradient: "from-blue-500 to-cyan-500",
    category: "Project Management",  
  },
  {
    title: "Essentials of Property Management Work",
    issuer: "Alison",
    date: "Issued Nov 2025",
    credentialId: "5776-53971925",
    credentialUrl: "https://alison.com/certification/check/1aa0e25752",
    skills: ["Real Estate", "Project Management", "Property Management"],
    badge: "CPD Certified",
    icon: Building2,
    gradient: "from-slate-500 to-gray-600",
    category: "Project Management",  
  },

  {
    title: "Introduction to IoT and Digital Transformation",
    issuer: "Cisco Networking Academy",
    date: "Issued Feb 2026",
    credentialId: "N/A",
    credentialUrl: "https://www.credly.com/badges/8a19a22c-93f5-41ff-b0f1-35a1929a19c0",
    skills: ["IoT", "Networking", "Digital Transformation"],
    icon: Cpu,
    gradient: "from-cyan-500 to-blue-500",
    category: "Internet of Things (IoT)",  
  },

  {
    title: "Introduction to SQL",
    issuer: "DataCamp",
    date: "Issued Jan 2026",
    credentialId: "N/A", 
    credentialUrl: "https://www.datacamp.com/completed/statement-of-accomplishment/course/00cacc3cf6d9879c3c112a1b9cafaf1581272927", 
    skills: ["SQL", "Data Management"],
    icon: Database,
    gradient: "from-green-500 to-teal-600",
    category: "Data & AI",
  },
  {
    title: "Introduction to AI for Work",
    issuer: "DataCamp",
    date: "Issued Jan 2026",
    credentialId: "N/A",
    credentialUrl: "https://www.datacamp.com/completed/statement-of-accomplishment/course/409cc1b69e1c090a42a93ae97a228dc0b99e11d0", 
    skills: ["AI", "Productivity", "Workflow Automation"],
    icon: Bot,
    gradient: "from-emerald-400 to-green-500",
    category: "Data & AI",
  },
  {
    title: "Introduction to Data Science",
    issuer: "Cisco Networking Academy",
    date: "Issued Jan 2026",
    credentialId: "N/A",
    credentialUrl: "https://www.credly.com/badges/2bf72180-b1e8-4f4c-a71e-1152a3579dcf/public_url",
    skills: ["Data Science", "Data Analysis", "Data Visualization"],
    icon: Wallet,
    gradient: "from-blue-600 to-indigo-600",
    category: "Data & AI",
  },
  {
    title: "Generative AI for Business Leaders",
    issuer: "LinkedIn Learning",
    date: "Issued Nov 2025",
    credentialId: "N/A",
    credentialUrl:
      "https://www.linkedin.com/learning/certificates/6702b5accde429e6f3817d2a85c19540f204c9a94f698034930d6643d8e5e804",
    skills: ["AI", "Generative AI", "Management"],
    icon: Bot,
    gradient: "from-violet-500 to-purple-500",
    category: "Data & AI",
  },

  {
    title: "DLSL – Java Programming 1",
    issuer: "CodeChum",
    date: "Issued Mar 2025",
    credentialId: "N/A",
    credentialUrl: "https://www.linkedin.com/in/josiahlamuelrosell/details/certifications/",
    skills: ["Java Programming", "OOP"],
    icon: Code2,
    gradient: "from-orange-500 to-red-500",
    category: "Development",
  },

  {
    title: "Google Ads Creative Certification",
    issuer: "Google Skillshop",
    date: "Issued Nov 2025 · Expires Nov 2026",
    credentialId: "167690530",
    credentialUrl: "https://skillshop.credential.net/c9379b6c-3cbc-448a-819a-45df0e8fa7f4",
    skills: ["Creative Strategy", "Advertising"],
    icon: PenTool,
    gradient: "from-yellow-400 to-orange-500",
    category: "Business & Management",
  },
  {
    title: "Google Ads Display Certification",
    issuer: "Google Skillshop",
    date: "Issued Jun 2025 · Expires Jun 2026",
    credentialId: "150130236",
    credentialUrl: "https://skillshop.credential.net/912d0b72-e879-48f0-bd48-8faf67d30c65#acc.DB40MCaH",
    skills: ["Advertising", "Marketing Analytics"],
    icon: BarChart3,
    gradient: "from-red-500 to-pink-500",
    category: "Business & Management",
  },
  {
    title: "Start and Improve Your Business",
    issuer: "TESDA",
    date: "Issued Jun 2025",
    credentialId: "N/A",
    credentialUrl: "https://www.linkedin.com/in/josiahlamuelrosell/details/certifications/",
    skills: ["Business Development", "Entrepreneurship"],
    icon: Rocket,
    gradient: "from-teal-500 to-green-500",
    category: "Business & Management",
  },
  {
    title: "Managing Your Personal Finances",
    issuer: "TESDA",
    date: "Issued Jun 2020",
    credentialId: "N/A",
    credentialUrl: "https://www.linkedin.com/in/josiahlamuelrosell/details/certifications/",
    skills: ["Finance", "Budgeting"],
    icon: Wallet,
    gradient: "from-emerald-500 to-teal-500",
    category: "Business & Management",
  },
]

export function CertificationsSection() {
  const { ref, isInView } = useInView()

  const categories: Record<Category, typeof certifications> = {
    "Project Management": certifications.filter((c) => c.category === "Project Management"),
    "Business & Management": certifications.filter((c) => c.category === "Business & Management"),
    "Internet of Things (IoT)": certifications.filter((c) => c.category === "Internet of Things (IoT)"),
    "Data & AI": certifications.filter((c) => c.category === "Data & AI"),
    "Development": certifications.filter((c) => c.category === "Development"),
    
  }

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
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-accent">
              <Shield className="w-6 h-6 text-white" />
            </div>
            Certifications
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full mb-12" />

          <div className="space-y-12">
            {(Object.entries(categories) as [Category, typeof certifications][]).map(([categoryName, items], catIndex) => (
              items.length > 0 && (
                <div key={categoryName} className="space-y-6">
                  <h3 className="text-xl font-semibold flex items-center gap-2 text-muted-foreground/80">
                    <span className="w-2 h-2 rounded-full bg-primary/50" />
                    {categoryName}
                  </h3>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {items.map((cert, index) => {
                      const Icon = cert.icon
                      const delay = (catIndex * 200) + (index * 50)
                      
                      return (
                        <div
                          key={cert.title}
                          className="glass rounded-2xl p-6 hover:-translate-y-2 transition-all duration-300 group hover:border-primary/50 hover:glow-sm cursor-pointer flex flex-col h-full"
                          style={{
                            transitionDelay: `${delay}ms`,
                            opacity: isInView ? 1 : 0,
                            transform: isInView ? "translateY(0)" : "translateY(20px)",
                          }}
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className={`p-3 rounded-xl bg-gradient-to-br ${cert.gradient} text-white shadow-lg`}>
                              <Icon className="w-6 h-6" />
                            </div>
                            {cert.badge && (
                              <span className="flex items-center gap-1 text-xs bg-primary/20 text-primary px-2 py-1 rounded-full border border-primary/20">
                                <Shield className="w-3 h-3" />
                                {cert.badge}
                              </span>
                            )}
                          </div>

                          <div className="flex-grow">
                            <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors line-clamp-2">
                              {cert.title}
                            </h3>
                            <p className="text-muted-foreground text-sm mb-2">{cert.issuer}</p>

                            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                              <Calendar className="w-3 h-3" />
                              <span>{cert.date}</span>
                            </div>

                            {cert.credentialId !== "N/A" && (
                              <div className="text-xs text-muted-foreground mb-3 font-mono opacity-70">
                                ID: {cert.credentialId}
                              </div>
                            )}

                            <div className="flex flex-wrap gap-1.5 mb-4">
                              {cert.skills.map((skill) => (
                                <span
                                  key={skill}
                                  className="text-xs bg-secondary/50 border border-secondary px-2 py-1 rounded-md text-secondary-foreground"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>

                          <a
                            href={cert.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-sm text-primary hover:underline group-hover:translate-x-1 transition-transform mt-auto"
                          >
                            View Credential <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
