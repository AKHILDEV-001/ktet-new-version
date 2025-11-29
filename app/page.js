import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight, BookOpen, Calculator, Languages, Microscope, FileText, CheckCircle, Smartphone, BarChart3, BrainCircuit } from "lucide-react";

export const metadata = {
  title: "KTET Quiz App - Free Practice for Kerala Teacher Eligibility Test",
  description: "Free KTET practice quiz for Category 1, 2, 3, and 4. Prepare for the Kerala Teacher Eligibility Test (KTET) with our comprehensive mock tests and syllabus guides.",
  keywords: "KTET, Kerala Teacher Eligibility Test, KTET Quiz, KTET Mock Test, KTET Syllabus, KTET Preparation, KTET Online, KTET Exam, KTET Category 1, KTET Category 2, KTET Category 3, KTET Category 4",
  robots: "index, follow",
  openGraph: {
    title: "KTET Quiz App & Syllabus - Kerala Teacher Eligibility Test Practice",
    description: "Practice for the Kerala Teacher Eligibility Test with our free quiz and study materials.",
    type: "website",
    url: "https://www.ktetpreparation.online/",
  },
  twitter: {
    card: "summary",
  },
  alternates: {
    canonical: "https://www.ktetpreparation.online/",
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-secondary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-[500px] h-[500px] bg-accent/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-background/50 backdrop-blur-md border shadow-sm">
              <span className="text-sm font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                ✨ The #1 Platform for KTET Preparation
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight">
              Master the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">KTET Exam</span> <br className="hidden sm:block" />
              with Confidence
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Join thousands of future teachers using our AI-powered platform.
              Personalized quizzes, instant feedback, and comprehensive syllabus coverage.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="w-full sm:w-auto text-lg h-14 px-8 rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all">
                <Link href="#categories-section">
                  Start Practicing Free
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto text-lg h-14 px-8 rounded-xl bg-background/50 backdrop-blur-sm hover:bg-accent hover:text-accent-foreground transition-all">
                <Link href="/syllabus">
                  View Syllabus
                </Link>
              </Button>
            </div>
          </div>

          {/* Floating Stats - Keeping custom for now as they are specific */}
          <div className="mt-16 sm:mt-24 relative max-w-5xl mx-auto">
            <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl p-6 rounded-2xl transform rotate-[-2deg] hover:rotate-0 transition-all duration-500 absolute -top-10 left-4 sm:left-10 w-48 hidden md:block animate-float">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Success Rate</p>
                  <p className="font-bold text-gray-800">92%</p>
                </div>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl p-6 rounded-2xl transform rotate-[2deg] hover:rotate-0 transition-all duration-500 absolute -top-16 right-4 sm:right-10 w-52 hidden md:block animate-float" style={{ animationDelay: '1s' }}>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Questions</p>
                  <p className="font-bold text-gray-800">5000+</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Marquee Section */}
      <section className="py-10 bg-background/50 backdrop-blur-sm border-y">
        <div className="relative animate-marquee-container">
          <div className="animate-marquee flex gap-8">
            {[
              { title: "AI-Generated Quizzes", desc: "Fresh questions every time", icon: BrainCircuit, color: "text-primary", bg: "bg-primary/10" },
              { title: "Instant Feedback", desc: "Learn from mistakes", icon: CheckCircle, color: "text-secondary", bg: "bg-secondary/10" },
              { title: "Full Syllabus", desc: "All categories covered", icon: FileText, color: "text-accent-foreground", bg: "bg-accent" },
              { title: "Mobile Friendly", desc: "Practice anywhere", icon: Smartphone, color: "text-green-600", bg: "bg-green-50" },
              { title: "Detailed Analytics", desc: "Track your progress", icon: BarChart3, color: "text-orange-600", bg: "bg-orange-50" },
              { title: "AI-Generated Quizzes", desc: "Fresh questions every time", icon: BrainCircuit, color: "text-primary", bg: "bg-primary/10" },
              { title: "Instant Feedback", desc: "Learn from mistakes", icon: CheckCircle, color: "text-secondary", bg: "bg-secondary/10" },
            ].map((item, i) => (
              <div key={i} className={`flex-shrink-0 w-72 p-4 rounded-xl border ${item.bg} flex items-center gap-4`}>
                <div className={`w-12 h-12 rounded-full bg-background flex items-center justify-center shadow-sm ${item.color}`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="text-center py-16 px-4 bg-background">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-foreground">
            Prepare for the Kerala Teacher Eligibility Test (KTET)
          </h2>
          <p className="max-w-3xl mx-auto text-muted-foreground leading-relaxed">
            Our free interactive quiz is designed to help you master the KTET syllabus. Practice with
            questions covering Child Development & Pedagogy, Mathematics, Science, and more. Select a
            category and start your preparation today to secure your teaching career in Kerala.
          </p>
        </div>
      </section>

      {/* Category Cards Section */}
      <section id="categories-section" className="py-20 relative bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">Explore Our Quiz Categories</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive practice materials for all KTET categories. Select a subject to begin your journey.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Child Development",
                desc: "Master student psychology and teaching methods.",
                icon: BookOpen,
                color: "text-blue-600",
                bg: "bg-blue-50",
                href: "/quiz/child-development-pedagogy",
                btnVariant: "default"
              },
              {
                title: "Mathematics",
                desc: "Sharpen your quantitative reasoning skills.",
                icon: Calculator,
                color: "text-green-600",
                bg: "bg-green-50",
                href: "/quiz/mathematics",
                btnVariant: "default"
              },
              {
                title: "Malayalam",
                desc: "Test your knowledge of Malayalam grammar.",
                icon: Languages,
                color: "text-purple-600",
                bg: "bg-purple-50",
                href: "/quiz/malayalam",
                btnVariant: "default"
              },
              {
                title: "English",
                desc: "Improve your English language skills.",
                icon: Languages,
                color: "text-red-600",
                bg: "bg-red-50",
                href: "/quiz/english",
                btnVariant: "default"
              },
              {
                title: "Science",
                desc: "Test your scientific aptitude and knowledge.",
                icon: Microscope,
                color: "text-amber-600",
                bg: "bg-amber-50",
                href: "/quiz/science",
                btnVariant: "default"
              },
              {
                title: "KTET Syllabus",
                desc: "Access the complete syllabus for all categories.",
                icon: FileText,
                color: "text-indigo-600",
                bg: "bg-indigo-50",
                href: "/syllabus",
                btnVariant: "secondary",
                isSyllabus: true
              }
            ].map((category, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-border/50">
                <CardHeader>
                  <div className={`w-14 h-14 rounded-xl ${category.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <category.icon className={`w-7 h-7 ${category.color}`} />
                  </div>
                  <CardTitle className="text-xl">{category.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{category.desc}</CardDescription>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full" variant={category.btnVariant}>
                    <Link href={category.href}>
                      {category.isSyllabus ? 'View Options' : 'Start Quiz'} <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>What is the KTET exam?</AccordionTrigger>
              <AccordionContent>
                The Kerala Teacher Eligibility Test (KTET) is an exam to assess the quality of teacher candidates
                for Lower Primary, Upper Primary, and High School classes in Kerala.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Which categories are covered in this quiz?</AccordionTrigger>
              <AccordionContent>
                This quiz app provides questions for all major categories of the KTET exam, helping you prepare
                comprehensively.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Is this quiz app free?</AccordionTrigger>
              <AccordionContent>
                Yes, this practice quiz is completely free to use. Our goal is to provide accessible resources for
                all KTET aspirants.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background mt-12 sm:mt-16 border-t py-12">
        <div className="container mx-auto px-6 text-center text-muted-foreground text-sm">
          <p>&copy; 2024 KTET Quiz Hub. All Rights Reserved.</p>
          <p className="mt-2">Last updated: Nov 27, 2025</p>
        </div>
      </footer>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Quiz",
            name: "KTET Practice Quiz",
            description: "A free practice quiz to help you prepare for the Kerala Teacher Eligibility Test (KTET).",
            hasPart: [
              { "@type": "Question", name: "General Knowledge and Current Affairs" },
              { "@type": "Question", name: "Child Development and Pedagogy" },
              { "@type": "Question", name: "Mathematics & Science" }
            ],
            educationalLevel: "Teacher Certification",
            about: {
              "@type": "Event",
              name: "Kerala Teacher Eligibility Test (KTET)"
            },
            mainEntity: {
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "What is KTET?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "KTET stands for Kerala Teacher Eligibility Test. It is an eligibility exam for teachers for Lower Primary, Upper Primary, and High School classes in Kerala."
                  }
                },
                {
                  "@type": "Question",
                  name: "How can this quiz help me prepare for KTET?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "This quiz provides practice questions based on the official KTET syllabus. It helps you test your knowledge, identify weak areas, and get familiar with the exam pattern."
                  }
                }
              ]
            }
          }),
        }}
      />
    </div>
  );
}
