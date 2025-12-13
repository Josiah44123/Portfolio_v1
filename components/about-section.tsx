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

          <div className="glass rounded-2xl p-6 md:p-8"> {/* Removed flex class here */}

            {/* NEW WRAPPER DIV for the float layout on large screens */}
            <div className="mb-6 clearfix"> 

              {/* Photo Container: Added md:float-left and md:mr-8 for wrapping */}
              <div className="flex-shrink-0 mb-6 md:mb-0 md:float-left md:mr-8">
                <div className="w-40 h-40 md:w-48 md:h-48 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border-2 border-dashed border-primary/40 flex items-center justify-center overflow-hidden group hover:border-primary/60 transition-colors">
                  <img
                    src="/profile.jpg" // <--- YOUR PHOTO PATH
                    alt="Josiah Lamuel Rosell"
                    className="w-full h-full object-cover" 
                  />
                </div>
              </div>

              {/* First Paragraph: This paragraph will now wrap around the floated image */}
              <p className="text-muted-foreground leading-relaxed text-lg mb-6">
                I am a Computer Science student at De La Salle Lipa passionate about software development, digital
                solutions, and communication-focused technologies. With a strong foundation in Java and object-oriented
                programming, I am actively expanding my skills in data structures, algorithms, system design, and
                end-to-end problem solving.
              </p>
            </div> 
            {/* End of the clearfix wrapper */}


            {/* Second Paragraph and Contact Line: Now start AFTER the float element */}
            <p className="text-muted-foreground leading-relaxed text-lg mb-6 clear-left">
              I believe technology isn&apos;t just about code — it&apos;s about creating tools that help people, tell
              meaningful stories, and solve real problems. I carry a mindset of continuous learning, curiosity, and
              intentional craftsmanship in everything I build.
            </p>
            <p className="text-primary font-medium">
              Open to internships, mentorships, and collaborations that create real-world impact through technology.
            </p>

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