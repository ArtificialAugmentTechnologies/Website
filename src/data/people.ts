import imgSachithanantham from "@/assets/images/faculty-sachithanantham.jpg.asset.json";
import imgArunkumar from "@/assets/images/faculty-arunkumar.jpg.asset.json";
import imgMahendran from "@/assets/images/faculty-mahendran.jpg.asset.json";
import imgAravind from "@/assets/images/faculty-aravind.jpg.asset.json";
import imgGowtham from "@/assets/images/faculty-gowtham.jpg.asset.json";

export interface Faculty {
  slug: string;
  name: string;
  designation: string;
  departments: string[];
  qualification: string;
  experience: string;
  subjects: string[];
  bio: string;
  image: string;
  featured: boolean;
}

export const faculty: Faculty[] = [
  {
    slug: "sachithanantham-rangasamy",
    name: "Sachithanantham Rangasamy",
    designation: "Leadership & Data/AI",
    departments: ["Leadership & Data/AI"],
    qualification: "Mahendra Institutions · Microsoft Certified: Azure AI Fundamentals · Microsoft Certified: Azure AI Engineer Associate",
    experience: "13 years",
    subjects: ["Leadership", "Data Visualization", "Predictive Analytics", "Artificial Intelligence"],
    bio: "Data & AI professional focused on analytics, predictive analytics, data visualization and technology-driven solutions. Recognized for translating business requirements into innovative solutions and contributing to engineering and analytics initiatives.",
    image: imgSachithanantham.url,
    featured: true,
  },
  {
    slug: "gowtham-j",
    name: "Gowtham J",
    designation: "Power Platform & Copilot Development",
    departments: ["Power Platform & Copilot Development"],
    qualification: "Microsoft GitHub Copilot Certification",
    experience: "7 years",
    subjects: ["Power Apps", "Power Automate", "Copilot", "AI-Assisted Development"],
    bio: "Power Platform and Copilot-focused developer working with Microsoft technologies and AI-assisted development. His profile is connected with GitHub Copilot certification and professional development around AI-powered software development.",
    image: imgGowtham.url,
    featured: true,
  },
  {
    slug: "arunkumar-varadharajan",
    name: "Arunkumar Varadharajan",
    designation: "Data Analytics",
    departments: ["Data Analytics"],
    qualification: "Government College of Technology, Coimbatore · Microsoft Power BI Data Analyst training/certification · Microsoft Azure Fundamentals training",
    experience: "4 years",
    subjects: ["Power BI", "Data Analytics", "SQL", "DAX", "Microsoft Copilot"],
    bio: "Data Analyst and Data Consultant with hands-on experience transforming raw data into meaningful insights. He has experience with Power BI and has conducted training in Power BI and Microsoft Copilot.",
    image: imgArunkumar.url,
    featured: true,
  },
  {
    slug: "mahendran-jayavelu",
    name: "Mahendran Jayavelu",
    designation: "Data Analytics, Power Platform & Copilot Development",
    departments: ["Data Analytics", "Power Platform & Copilot Development"],
    qualification: "Government Arts College, Salem · Microsoft PL-900: Power Platform Fundamentals",
    experience: "4 years",
    subjects: ["Power BI", "Power Apps", "Power Platform", "Copilot Development"],
    bio: "Data and Power Platform professional with experience working with Power BI, Power Apps and Power Platform solutions. He also develops and delivers Copilot solutions, combining data analytics, low-code platforms and AI-assisted development.",
    image: imgMahendran.url,
    featured: true,
  },
  {
    slug: "j-aravind-laxman",
    name: "J Aravind Laxman",
    designation: "Power Platform & Copilot Development",
    departments: ["Power Platform & Copilot Development"],
    qualification: "Paavai Engineering College · 2018–2022",
    experience: "4 years",
    subjects: ["Power Platform", "Power Apps", "Copilot", "Automation"],
    bio: "Experienced Power Platform Developer focused on designing and developing solutions using Microsoft's Power Platform ecosystem, with hands-on experience across Power Platform development and automation in professional environments.",
    image: imgAravind.url,
    featured: true,
  },
];

export function getFaculty(slug: string): Faculty | undefined {
  return faculty.find((f) => f.slug === slug);
}

export const testimonials = [
  {
    name: "Nithin Reddy",
    role: "DevOps Engineer, fintech platform",
    course: "DevOps Engineering Professional",
    quote:
      "I came in as a support engineer with no pipeline experience. The graded labs were relentless in the best way — I walked into interviews able to whiteboard a full delivery platform.",
  },
  {
    name: "Fathima Rasheed",
    role: "Data Analyst, retail group",
    course: "Data Analytics Career Track",
    quote:
      "The fortnightly panel reviews changed how I present. My final case study became the portfolio piece that got me hired within three weeks of finishing.",
  },
  {
    name: "Suresh Iyer",
    role: "Cloud Architect, healthcare SaaS",
    course: "Cloud Architecture on AWS",
    quote:
      "Defending an architecture in front of a mentor playing the client is uncomfortable and completely worth it. It is the closest thing to the real job I have seen in a classroom.",
  },
];

export const whyChooseUs = [
  {
    title: "Experienced faculty",
    body: "Every instructor has shipped production systems at scale before they ever taught a batch.",
  },
  {
    title: "Practical learning",
    body: "Graded labs on live cloud infrastructure from week one — no slide-only modules.",
  },
  {
    title: "Industry-oriented curriculum",
    body: "Tracks are reviewed twice a year with an advisory board of hiring managers.",
  },
  {
    title: "Placement assistance",
    body: "Mock interview panels, portfolio reviews and introductions to 180+ partner companies.",
  },
  {
    title: "Recognised certification",
    body: "Course completion certificates plus structured preparation for CKA, AWS and Microsoft exams.",
  },
  {
    title: "Modern infrastructure",
    body: "Dedicated cloud lab credits, 24/7 practice environments and a fully equipped campus.",
  },
];
