import campusImg from "@/assets/images/campus.jpg";
import heroImg from "@/assets/images/hero-classroom.jpg";
import devopsImg from "@/assets/images/course-devops.jpg";
import dataImg from "@/assets/images/course-data-analytics.jpg";
import cloudImg from "@/assets/images/course-cloud.jpg";
import biImg from "@/assets/images/course-bi.jpg";
import pythonFundamentalsImg from "@/assets/images/course-python-fundamentals.jpg";
import pythonBackendImg from "@/assets/images/course-python-backend.jpg";
import machineLearningImg from "@/assets/images/course-machine-learning.jpg";
import generativeAiImg from "@/assets/images/course-generative-ai.jpg";
import agenticAiImg from "@/assets/images/course-agentic-ai.jpg";
import advancedAiImg from "@/assets/images/course-advanced-ai.jpg";

export interface InstituteEvent {
  slug: string;
  title: string;
  date: string; // ISO
  time: string;
  location: string;
  description: string;
  image: string;
}

export const events: InstituteEvent[] = [
  {
    slug: "devops-open-lab",
    title: "DevOps Open Lab: Ship a pipeline in 3 hours",
    date: "2026-09-12",
    time: "10:00 – 13:00 IST",
    location: "Lab 2, Nova Tech Campus, Bengaluru",
    description:
      "A free hands-on session where you build and deploy a containerised app through a complete CI/CD pipeline, guided by our DevOps faculty.",
    image: devopsImg,
  },
  {
    slug: "python-fundamentals-batch",
    title: "Python Fundamentals — New Batch Orientation",
    date: "2026-09-21",
    time: "10:00 – 12:00 IST",
    location: "Hybrid · Nova Tech Campus & Online",
    description:
      "Kick-off for the beginner Python programme: development environment setup with VS Code, Python syntax, core programming concepts and problem-solving basics. 3 months · ₹28,000 · Instructors: Sachin, Arun, Gowtham.",
    image: pythonFundamentalsImg,
  },
  {
    slug: "python-backend-development-batch",
    title: "Python Backend Development — Batch Launch",
    date: "2026-10-05",
    time: "10:00 – 12:00 IST",
    location: "Hybrid · Nova Tech Campus & Online",
    description:
      "Orientation for the intermediate backend track covering FastAPI, Pydantic, PostgreSQL and Postman, ending with a complete database-driven backend capstone. 4 months · ₹32,000 · Instructors: Sachin, Arun, Gowtham, Hari.",
    image: pythonBackendImg,
  },
  {
    slug: "machine-learning-fundamentals-batch",
    title: "Machine Learning Fundamentals — Batch Launch",
    date: "2026-10-19",
    time: "10:00 – 12:00 IST",
    location: "Hybrid · Nova Tech Campus & Online",
    description:
      "Start of the ML foundations cohort: statistics, data preparation, regression, classification, clustering and model evaluation on real-world datasets. 4 months · ₹30,000 · Instructors: Arun, Sachin.",
    image: machineLearningImg,
  },
  {
    slug: "generative-ai-fundamentals-batch",
    title: "Generative AI Fundamentals — Batch Launch",
    date: "2026-11-02",
    time: "10:00 – 12:00 IST",
    location: "Hybrid · Nova Tech Campus & Online",
    description:
      "Orientation for the GenAI track: LLM fundamentals, LangChain, vector embeddings, basic RAG pipelines and AI chat agents, ending with a RAG chatbot capstone. 3 months · ₹30,000 · Instructor: Sachin.",
    image: generativeAiImg,
  },
  {
    slug: "agentic-ai-intermediate-batch",
    title: "Agentic AI Intermediate — Batch Launch",
    date: "2026-11-16",
    time: "10:00 – 12:00 IST",
    location: "Hybrid · Nova Tech Campus & Online",
    description:
      "Kick-off for the agentic systems cohort: ReAct agents, tool calling, LangChain, LangGraph and multi-agent workflows, with a multi-agent capstone project. 4 months · ₹35,000 · Instructor: Sachin.",
    image: agenticAiImg,
  },
  {
    slug: "advanced-ai-engineering-batch",
    title: "Advanced AI Engineering — Batch Launch",
    date: "2026-11-30",
    time: "10:00 – 12:00 IST",
    location: "Hybrid · Nova Tech Campus & Online",
    description:
      "Orientation for the advanced programme: agent loops, harness and loop engineering, guardrails, evaluation and forward-deployed engineering practices. 4 months · ₹35,000 · Instructor: Sachin.",
    image: advancedAiImg,
  },
  {
    slug: "power-bi-dashboard-jam",
    title: "Power BI Dashboard Jam",
    date: "2026-06-14",
    time: "10:00 – 16:00 IST",
    location: "Lab 4, Nova Tech Campus",
    description:
      "Teams built executive dashboards against a live retail dataset and were judged on accuracy, performance and clarity.",
    image: biImg,
  },
  {
    slug: "annual-placement-day",
    title: "Annual Placement Day 2026",
    date: "2026-04-05",
    time: "09:00 – 18:00 IST",
    location: "Nova Tech Campus",
    description:
      "Forty-two partner companies interviewed graduating cohorts across DevOps, analytics and cloud tracks.",
    image: campusImg,
  },
];

export function upcomingEvents(now = new Date()): InstituteEvent[] {
  return events
    .filter((e) => new Date(e.date) >= now)
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function pastEvents(now = new Date()): InstituteEvent[] {
  return events
    .filter((e) => new Date(e.date) < now)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export interface NewsArticle {
  slug: string;
  title: string;
  category: string;
  author: string;
  date: string;
  image: string;
  excerpt: string;
  body: string[];
}

export const news: NewsArticle[] = [
  {
    slug: "autumn-2026-admissions-open",
    title: "Autumn 2026 admissions are now open",
    category: "Admissions",
    author: "Admissions Office",
    date: "2026-08-18",
    image: campusImg,
    excerpt:
      "Applications for the September intake across all DevOps, data analytics and cloud tracks are open until 5 September 2026.",
    body: [
      "Applications for the Autumn 2026 intake are open across every career track at A² Technologies. Classroom, hybrid and online cohorts all begin the week of 15 September.",
      "Seats in the DevOps Engineering Professional and Data Analytics Career Track are capped at 30 learners per batch so that every participant receives lab-level mentoring. Early applications are reviewed on a rolling basis.",
      "Applicants who complete the form before 25 August are automatically considered for the merit scholarship, which covers up to 25% of programme fees for candidates from underrepresented backgrounds in technology.",
    ],
  },
  {
    slug: "placement-report-2026",
    title: "Placement report: 95% placement across 2025-26 cohorts",
    category: "Placements",
    author: "Career Services",
    date: "2026-07-30",
    image: dataImg,
    excerpt:
      "Our annual placement report covers 612 graduating learners, median salary movement and the roles hiring most this year.",
    body: [
      "Across the 2025-26 academic year, 612 learners graduated from A² Technologies and 95% accepted an offer within six months of completion.",
      "DevOps and platform roles remained the strongest hiring segment, followed by analytics engineering. Median compensation for career switchers rose by 62% against their pre-programme salary.",
      "The full report, including company-wise breakdowns and role definitions, is available from the career services desk on campus.",
    ],
  },
  {
    slug: "kubernetes-lab-expansion",
    title: "New Kubernetes lab adds 120 dedicated cluster seats",
    category: "Campus",
    author: "Priya Sundaram",
    date: "2026-07-04",
    image: cloudImg,
    excerpt:
      "Lab 2 has been rebuilt with dedicated per-learner clusters, so break-fix drills no longer share infrastructure.",
    body: [
      "We have completed the rebuild of Lab 2 into a dedicated Kubernetes practice environment with 120 isolated clusters.",
      "Each learner on the DevOps, SRE and CKA tracks now receives a private cluster for the duration of their programme, available 24 hours a day.",
      "Isolated clusters let us run destructive break-fix drills — deliberately corrupting etcd, exhausting node resources, breaking network policy — without affecting anybody else's environment.",
    ],
  },
  {
    slug: "analytics-curriculum-refresh",
    title: "Analytics curriculum refreshed for 2026-27",
    category: "Academics",
    author: "Meera Krishnan",
    date: "2026-06-21",
    image: biImg,
    excerpt:
      "Experimentation design and analytics engineering now carry more weight, following advisory board feedback.",
    body: [
      "Following the June advisory board review, the Data Analytics Career Track has been updated for the 2026-27 academic year.",
      "The statistics module now dedicates three weeks to experiment design and interpretation, reflecting how frequently our graduates are asked to evaluate A/B tests in their first year of work.",
      "A new elective in analytics engineering introduces version-controlled transformation models for learners who intend to move toward data engineering roles.",
    ],
  },
  {
    slug: "hero-batch-orientation",
    title: "Orientation week: what new learners should expect",
    category: "Academics",
    author: "Admissions Office",
    date: "2026-05-12",
    image: heroImg,
    excerpt:
      "A walkthrough of the first week on campus, from lab access setup to mentor allocation and cohort norms.",
    body: [
      "Orientation week sets up everything you need before technical modules begin: identity and lab access, mentor allocation, and cohort working agreements.",
      "Day one covers campus and lab safety, environment setup and a diagnostic exercise that helps mentors calibrate support for each learner.",
      "By the end of the week every learner has committed their first exercise to version control and joined a study pod of five.",
    ],
  },
];

export function getArticle(slug: string): NewsArticle | undefined {
  return news.find((n) => n.slug === slug);
}

export const galleryCategories = ["Campus", "Events", "Labs"] as const;
export type GalleryCategory = (typeof galleryCategories)[number];

export const gallery: { src: string; alt: string; category: GalleryCategory; width: number; height: number }[] = [
  { src: campusImg, alt: "A² Technologies campus entrance at golden hour", category: "Campus", width: 1600, height: 1000 },
  { src: heroImg, alt: "Learners in a DevOps classroom session with the instructor at the main screen", category: "Labs", width: 1600, height: 1200 },
  { src: cloudImg, alt: "Cloud architecture visual displayed in the cloud lab", category: "Labs", width: 1024, height: 640 },
  { src: dataImg, alt: "Analytics dashboards from a student capstone project", category: "Events", width: 1024, height: 640 },
  { src: biImg, alt: "Power BI dashboards built during the dashboard jam", category: "Events", width: 1024, height: 640 },
  { src: devopsImg, alt: "CI/CD pipeline visualisation used in the DevOps open lab", category: "Labs", width: 1024, height: 640 },
];

export const faqs = [
  {
    q: "Do I need a technical background to enrol?",
    a: "It depends on the track. The Data Analytics Career Track and Business Intelligence programme assume no coding background. DevOps, SRE and cloud tracks expect either prior IT experience or completion of our foundation module.",
  },
  {
    q: "Are classes available online?",
    a: "Yes. Most tracks run in classroom, hybrid or fully online modes. Online cohorts attend the same live sessions and receive identical lab environments and mentor access.",
  },
  {
    q: "What does placement assistance actually include?",
    a: "Portfolio and résumé reviews, at least three mock interview panels with practising engineers, and introductions to partner companies hiring for your track. We do not guarantee employment; we prepare you and open doors.",
  },
  {
    q: "Can I pay fees in instalments?",
    a: "Yes. All programmes can be paid in two or three instalments, and we work with two financing partners for longer tenures. Speak to the admissions office for current terms.",
  },
  {
    q: "Is there a scholarship?",
    a: "We run a merit scholarship covering up to 25% of programme fees each intake, prioritising candidates from underrepresented backgrounds in technology. Apply through the standard admission form before the published cut-off.",
  },
  {
    q: "What happens if I miss a live session?",
    a: "Every live session is recorded and available in your learner portal for the duration of the programme, and mentors hold weekly doubt-clearing hours for catch-up.",
  },
  {
    q: "Do you provide a certificate?",
    a: "Yes — a verifiable A² Technologies completion certificate. Several tracks also prepare you for external certifications such as CKA, AWS Solutions Architect and Microsoft Data Analyst.",
  },
];
