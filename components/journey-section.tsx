"use client"

import { useState } from "react"
import { useInView } from "@/hooks/use-in-view"
import { GraduationCap, Briefcase, Calendar, ChevronRight, Award, MapPin, Trophy, Star, BookOpen } from "lucide-react"

type TabType = "education" | "experience" | "awards"

interface TimelineItem {
  id: string
  type: "education" | "experience" | "award"
  title: string
  organization: string
  location?: string
  period: string
  description?: string
  details?: string[]
  highlight?: string
  icon: typeof GraduationCap
  gradient: string
}

const timelineData: TimelineItem[] = [
  // --- College / Current ---
  {
    id: "dlsl",
    type: "education",
    title: "Bachelor's Degree in Computer Science",
    organization: "De La Salle Lipa",
    location: "Lipa City, Batangas",
    period: "Aug 2024 – Jun 2028",
    description:
      "Currently pursuing Computer Science with focus on software development, data structures, algorithms, and system design.",
    details: [
      "Core courses: Object-Oriented Programming, Data Structures, Algorithms",
      "Active member of Junior Philippine Computer Society (JPCS)",
      "Expanding skills in full-stack development and AI technologies",
    ],
    icon: GraduationCap,
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    id: "dlsl-dl-running",
    type: "award",
    title: "Dean's Lister Candidate (Running)",
    organization: "De La Salle Lipa",
    period: "1st Sem, A.Y. 2025-2026",
    description: "Currently maintaining academic standing for Dean's List honors for the first semester of the second year.",
    icon: Star,
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    id: "jpcs",
    type: "experience",
    title: "Project Head for External Affairs",
    organization: "Junior Philippine Computer Society (DLSL Chapter)",
    location: "De La Salle Lipa",
    period: "Jun 2025 – Present",
    description:
      "Leading external  and organizational communication for the university's premier computer science organization.",
    details: [
      "Leads external organizational communication for projects and events",
      "Applies project management for events, collaborations, and planning",
      "Works closely with internal and external officials",
      "Coordinates with other university organizations and industry partners",
    ],
    icon: Briefcase,
    gradient: "from-orange-500 to-red-500",
  },
  
  {
    id: "dlsl-dl-1y2s",
    type: "award",
    title: "Dean's Lister - 2nd Honors",
    organization: "De La Salle Lipa",
    period: "2nd Sem, A.Y. 2024-2025",
    description: "Achieved Second Honors distinction during the second semester of the first year.",
    icon: Star,
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    id: "nstp-lingkod",
    type: "award",
    title: "NSTP Lingkod Award",
    organization: "De La Salle Lipa",
    period: "June 5, 2025",
    description: "Recognized for outstanding service and dedication to the National Service Training Program.",
    icon: Award,
    gradient: "from-green-500 to-emerald-500",
  },
  {
    id: "dlsl-dl-1y1s",
    type: "award",
    title: "Dean's Lister - 2nd Honors",
    organization: "De La Salle Lipa",
    period: "1st Sem, A.Y. 2024-2025",
    description: "Achieved Second Honors distinction during the first semester of the first year.",
    icon: Star,
    gradient: "from-cyan-500 to-blue-500",
  },

  // --- Senior High School ---
  {
    id: "mayor-excellence",
    type: "award",
    title: "Mayor's Academic Excellence Award",
    organization: "Municipality of Marilao, Bulacan",
    period: "2024",
    description: "Special recognition awarded by the former Mayor of Marilao upon graduating Senior High School.",
    details: [
      "Awarded during Grade 12 graduation",
      "Recognized for academic performance and community potential"
    ],
    icon: Trophy,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    id: "honors-shs",
    type: "award",
    title: "With High Honors – Senior High School",
    organization: "Barcelona Academy",
    period: "2022 – 2024",
    description: "Achieved With High Honors distinction throughout Senior High School in the STEM strand.",
    icon: Trophy,
    gradient: "from-yellow-500 to-amber-500",
  },
  {
    id: "barcelona-shs",
    type: "education",
    title: "Senior High School – STEM Strand",
    organization: "Barcelona Academy",
    location: "Marilao, Bulacan",
    period: "2022 – 2024",
    description:
      "Completed Science, Technology, Engineering, and Mathematics strand with consistent academic excellence.",
    details: [
      "Specialized in advanced mathematics and science subjects",
      "Developed strong foundation in research and analytical thinking",
      "Graduated with High Honors",
    ],
    highlight: "With High Honors",
    icon: BookOpen,
    gradient: "from-violet-500 to-purple-500",
  },

  // --- Junior High School ---
  {
    id: "honors-jhs",
    type: "award",
    title: "Consistent With High Honors – Junior High School",
    organization: "Barcelona Academy",
    period: "2018 – 2022",
    description: "Maintained With High Honors standing consistently from Grade 7 through Grade 10.",
    details: [
      "Grade 7 – With High Honors",
      "Grade 8 – With High Honors",
      "Grade 9 – With High Honors",
      "Grade 10 – With High Honors",
    ],
    icon: Star,
    gradient: "from-yellow-500 to-amber-500",
  },
  {
    id: "barcelona-jhs",
    type: "education",
    title: "Junior High School (Grades 7-10)",
    organization: "Barcelona Academy",
    location: "Marilao, Bulacan",
    period: "2018 – 2022",
    description: "Completed junior high school education with consistent academic honors throughout all grade levels.",
    details: [
      "Consistent With High Honors recipient",
      "Developed early interest in technology and programming",
      "Active participation in academic competitions",
    ],
    highlight: "Consistent High Honors",
    icon: GraduationCap,
    gradient: "from-emerald-500 to-teal-500",
  },
]

export function JourneySection() {
  const { ref, isInView } = useInView()
  const [activeTab, setActiveTab] = useState<TabType>("education")
  const [expandedItem, setExpandedItem] = useState<string | null>(null)

  const tabs: { id: TabType; label: string; icon: typeof GraduationCap }[] = [
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "awards", label: "Awards", icon: Award },
  ]

  const filteredItems = timelineData.filter((item) =>
    activeTab === "awards" ? item.type === "award" : item.type === activeTab,
  )

  return (
    <section id="journey" className="py-20 px-4 bg-secondary/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
        <div
          ref={ref}
          className={`transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-3">
            <span className="text-primary">🚀</span> My Journey
          </h2>
          <div className="w-20 h-1 bg-primary rounded-full mb-8" />

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                    : "glass hover:bg-primary/10"
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary/20" />

            <div className="space-y-6">
              {filteredItems.map((item, index) => (
                <div
                  key={item.id}
                  className={`relative pl-16 md:pl-20 transition-all duration-500 ${
                    isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {/* Timeline dot */}
                  <div
                    className={`absolute left-4 md:left-6 top-6 w-4 h-4 rounded-full bg-gradient-to-r ${item.gradient} shadow-lg animate-pulse-glow`}
                  />

                  {/* Card */}
                  <div
                    onClick={() => setExpandedItem(expandedItem === item.id ? null : item.id)}
                    className={`glass rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 ${
                      expandedItem === item.id ? "border-primary/50 shadow-lg shadow-primary/10" : ""
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${item.gradient} bg-opacity-20 flex-shrink-0`}>
                        <item.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                          <h3 className="text-lg md:text-xl font-bold">{item.title}</h3>
                          {item.highlight && (
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${item.gradient} text-white`}
                            >
                              {item.highlight}
                            </span>
                          )}
                        </div>
                        <p className="text-primary font-medium mb-2">{item.organization}</p>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {item.period}
                          </span>
                          {item.location && (
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {item.location}
                            </span>
                          )}
                        </div>

                        {item.description && <p className="text-muted-foreground mb-3">{item.description}</p>}

                        {/* Expandable details */}
                        {item.details && (
                          <div
                            className={`overflow-hidden transition-all duration-300 ${
                              expandedItem === item.id ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
                            }`}
                          >
                            <div className="pt-4 border-t border-border/50">
                              <ul className="space-y-2">
                                {item.details.map((detail, idx) => (
                                  <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                                    <ChevronRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                                    <span>{detail}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}

                        {item.details && (
                          <button className="text-sm text-primary hover:underline mt-2 flex items-center gap-1">
                            {expandedItem === item.id ? "Show less" : "Show more"}
                            <ChevronRight
                              className={`w-4 h-4 transition-transform ${expandedItem === item.id ? "rotate-90" : ""}`}
                            />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}