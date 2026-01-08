"use client"

import { useInView } from "@/hooks/use-in-view"
import { User, Code, Lightbulb } from "lucide-react"

export function AboutSection() {
  const { ref, isInView } = useInView()

  return (
    <section id="about" className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div
          ref={ref}
          className={`transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-3">
            <span className="text-primary">👤</span> About Me
          </h2>
          <div className="w-20 h-1 bg-primary rounded-full mb-8" />

          {/* MAIN CARD CONTAINER */}
          <div className="glass rounded-2xl p-6 md:p-8">
            
            {/* --- BLOCK 1: TOP ROW (Photo + First Paragraph) --- */}
            {/* This flex container forces the text to stay next to the photo */}
            <div className="flex flex-col md:flex-row gap-8 items-start mb-6">
              
              {/* Photo Column */}
              <div className="flex-shrink-0 mx-auto md:mx-0">
                <div className="w-40 h-40 md:w-48 md:h-48 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border-2 border-dashed border-primary/40 flex items-center justify-center overflow-hidden group hover:border-primary/60 transition-colors">
                  <img
                    src="/images/profile.jpg"
                    alt="Josiah Lamuel Rosell"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Text Column (First Paragraph Only) */}
              {/* 'flex-1' makes this fill the remaining width perfectly */}
              <div className="flex-1">
                <p className="text-muted-foreground leading-relaxed text-lg mb-3 text-justify">
                  I am a Computer Science student at De La Salle Lipa; passionate
                  about software development, digital solutions, and communication-
                  focused technologies. I enjoy building projects that balance technical depth with clarity, 
                  usability, and real-world impact. Beyond coding, I value clear communication, 
                  thoughtful design, and the ability to translate complex ideas into accessible solutions.
                </p>
              </div>
            </div>

            {/* --- BLOCK 2: BOTTOM ROW (Rest of the content) --- */}
            {/* This sits naturally below the Flex container above */}
            <div className="text-muted-foreground leading-relaxed text-lg">
              <p className="mb-4 text-justify">
                I believe technology isn&apos;t just about code — it&apos;s about creating tools that help people, tell
                meaningful stories, and solve real problems. I carry a mindset of continuous learning, curiosity, and
                purpose in everything I build.
              </p>

              <p className="text-primary font-medium">
                Open to internships, mentorships, and collaborations that create real-world impact through technology..
              </p>
            </div>

          </div>

          {/* Values Cards */}
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            {[
              {
                icon: User,
                title: "People-First",
                description: "Creating tools that genuinely help users",
              },
              {
                icon: Code,
                title: "Craftsmanship",
                description: "Writing clean, maintainable code",
              },
              {
                icon: Lightbulb,
                title: "Curiosity",
                description: "Always learning, always growing",
              },
            ].map((item, index) => (
              <div
                key={item.title}
                className="glass rounded-xl p-5 hover:-translate-y-1 transition-all duration-300 hover:border-primary/50"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <item.icon className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-semibold mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}