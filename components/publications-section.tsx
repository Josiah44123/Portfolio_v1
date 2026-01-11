import { BookOpen, ExternalLink, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function PublicationsSection() {
  const publication = {
    title: "Financial Challenges and Coping Mechanisms Among Filipino Parents of Grade 11 Students",
    date: "February 2023",
    publisher: "International Journal of Academic Multidisciplinary Research (IJAMR)",
    description:
      "This research paper employs a qualitative design to explore the financial difficulties and coping strategies of Filipino parents of Grade 11 students in Bulacan, Philippines. Through semi-structured interviews and thematic analysis, the study identifies key challenges such as low income, high cost of living, and limited resources. It also highlights common coping mechanisms like budgeting, saving, and side hustles, while noting the significant stress and anxiety parents experience. The study concludes by recommending policy interventions, financial literacy programs, and community support to better assist these families.",
    tags: ["Qualitative Research", "Financial Literacy", "Socioeconomic Issues"],
    link: "https://www.scribd.com/document/667420413/Financial-Challenges-and-Coping-Mechanisms-Among-Filipino-Parents-of-Grade-11-Students-of-Barcelona-Academy?fbclid=IwY2xjawPEl0ZleHRuA2FlbQIxMQBzcnRjBmFwcF9pZAEwAAEezjle0HX07JyFa7x7W_MbJZav8FcTuNtyi2qjazJEpN-h8M0hzJeuoGkE0Nk_aem_-iaERYPLk9S5Zw-K1d9Htg",
  }

  return (
    <section id="publications" className="py-20 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <BookOpen className="w-8 h-8 text-primary" />
          <h2 className="text-3xl font-bold tracking-tight">Research & Publications</h2>
        </div>

        <Card className="glass-card overflow-hidden border-primary/20 hover:border-primary/50 transition-colors">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <Badge variant="outline" className="mb-2 text-primary border-primary/30">
                  High School Thesis
                </Badge>
                <CardTitle className="text-2xl mb-2">{publication.title}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Published on {publication.publisher} • {publication.date}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed mb-4">{publication.description}</p>
            <div className="flex flex-wrap gap-2">
              {publication.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-primary/10 text-primary border-none">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter className="bg-primary/5 pt-1">
            <Button asChild className="w-full sm:w-auto">
              <a href={publication.link} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                View on Scribd
              </a>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  )
}
