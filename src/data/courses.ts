import dataImg from "@/assets/images/course-data-analytics.jpg";
import powerPlatformImg from "@/assets/images/course-power-platform.jpg";
import aiAutomationImg from "@/assets/images/course-ai-automation.jpg";

export type CourseLevel =
  | "Beginner"
  | "Basic to Intermediate"
  | "Beginner to Intermediate"
  | "Intermediate"
  | "Advanced";
export type CourseMode = "Classroom" | "Online" | "Hybrid" | "Online / Offline";

export interface Course {
  slug: string;
  name: string;
  category: string;
  level: CourseLevel;
  mode: CourseMode;
  durationMonths: number;
  duration: string;
  fees: number;
  feesDisplay?: string;
  eligibility: string;
  instructor: string;
  image: string;
  summary: string;
  overview: string;
  outcomes: string[];
  curriculum: { title: string; topics: string[] }[];
  careers: string[];
  featured: boolean;
}

export const courses: Course[] = [
  {
    slug: "data-analyst-basic-to-intermediate",
    name: "Data Analyst — Basic to Intermediate",
    category: "Data Analytics",
    level: "Basic to Intermediate",
    mode: "Online / Offline",
    durationMonths: 4,
    duration: "Online class: 60 hours | Offline: 4 months (Saturday and Sunday batches)",
    fees: 25000,
    feesDisplay: "₹25,000",
    eligibility: "Graduate in any stream; no prior analytics experience required",
    instructor: "Arun · Mahendran",
    image: dataImg,
    summary:
      "Build practical data analysis skills with Advanced Excel, SQL, Power BI and SharePoint. Learn to transform raw data into meaningful insights, reports and interactive dashboards.",
    overview:
      "A practical, project-focused programme designed to take you from spreadsheet fundamentals to building professional business dashboards. Learn how to clean, analyze, visualize and manage data using industry-relevant Microsoft and database technologies.",
    outcomes: [
      "Analyze and clean business data using Advanced Excel and SQL",
      "Create interactive dashboards and reports using Power BI",
      "Build data models and perform basic DAX calculations",
      "Manage and integrate business data using SharePoint",
      "Transform raw datasets into meaningful business insights",
      "Develop a complete data analytics project",
    ],
    curriculum: [
      {
        title: "Module 1 · Advanced Excel",
        topics: [
          "Excel fundamentals and data management",
          "Advanced formulas and functions",
          "XLOOKUP, INDEX & MATCH",
          "IF, SUMIFS and COUNTIFS",
          "Data cleaning and validation",
          "Pivot Tables and Pivot Charts",
          "Conditional formatting",
          "Interactive Excel dashboards",
        ],
      },
      {
        title: "Module 2 · SQL",
        topics: [
          "Database and relational database concepts",
          "SQL queries and data retrieval",
          "Filtering and sorting data",
          "Aggregate functions",
          "GROUP BY and HAVING",
          "Joins",
          "Subqueries",
          "CASE statements",
          "Data manipulation",
          "Practical SQL exercises",
        ],
      },
      {
        title: "Module 3 · Power BI",
        topics: [
          "Power BI fundamentals",
          "Data import and connections",
          "Power Query",
          "Data cleaning and transformation",
          "Data modelling",
          "Relationships",
          "DAX fundamentals",
          "Measures and calculated columns",
          "Interactive reports and dashboards",
        ],
      },
      {
        title: "Module 4 · SharePoint",
        topics: [
          "SharePoint fundamentals",
          "SharePoint Lists and Libraries",
          "Creating and managing business data",
          "Columns, views and filters",
          "Data permissions",
          "Connecting SharePoint with Power BI",
          "Managing collaborative data",
        ],
      },
      {
        title: "Module 5 · Data Visualization & Reporting",
        topics: [
          "Choosing the right visualizations",
          "KPI development",
          "Interactive reports",
          "Dashboard design principles",
          "Business insights",
          "Report sharing and presentation",
        ],
      },
      {
        title: "Capstone · Business Analytics Dashboard",
        topics: [
          "Build an end-to-end analytics solution using Excel, SQL, Power BI and SharePoint",
          "Clean data, generate insights and create an interactive business dashboard",
        ],
      },
    ],
    careers: ["Data Analyst", "Business Analyst", "Reporting Analyst", "MIS Analyst"],
    featured: true,
  },
  {
    slug: "power-platform-developer",
    name: "Power Platform Developer",
    category: "Power Platform",
    level: "Beginner to Intermediate",
    mode: "Online / Offline",
    durationMonths: 4,
    duration: "Online class: 60 hours | Offline: 4 months (Saturday and Sunday batches)",
    fees: 25000,
    feesDisplay: "₹25,000",
    eligibility: "Graduate in any stream; basic understanding of business processes is helpful",
    instructor: "Gowtham · Mahendran · Aravind",
    image: powerPlatformImg,
    summary:
      "Build business applications and automate workflows using Power Apps, Dataverse, Power Automate and SharePoint.",
    overview:
      "A hands-on programme focused on building low-code business applications and automating everyday business processes. Learn to create applications, manage business data and develop automated workflows using Microsoft's Power Platform ecosystem.",
    outcomes: [
      "Build business applications using Power Apps",
      "Develop Canvas Apps using Power Fx",
      "Design and manage Dataverse databases",
      "Integrate applications with SharePoint",
      "Create automated workflows using Power Automate",
      "Build approval and notification systems",
      "Develop end-to-end low-code business solutions",
    ],
    curriculum: [
      {
        title: "Module 1 · Power Platform Fundamentals",
        topics: [
          "Introduction to Microsoft Power Platform",
          "Power Apps",
          "Power Automate",
          "Dataverse",
          "SharePoint",
          "Power Platform environments",
          "Understanding business applications",
        ],
      },
      {
        title: "Module 2 · Power Apps",
        topics: [
          "Introduction to Power Apps",
          "Canvas Apps",
          "Application interface design",
          "Screens and navigation",
          "Forms and galleries",
          "Controls and properties",
          "Variables and collections",
          "Power Fx fundamentals",
          "Search and filtering",
          "Form validation",
          "CRUD operations",
        ],
      },
      {
        title: "Module 3 · Dataverse",
        topics: [
          "Introduction to Microsoft Dataverse",
          "Tables and columns",
          "Data types",
          "Choice and lookup columns",
          "Relationships",
          "Data management",
          "Business rules",
          "Security fundamentals",
          "Connecting Dataverse with Power Apps",
        ],
      },
      {
        title: "Module 4 · SharePoint Integration",
        topics: [
          "SharePoint Lists",
          "SharePoint Libraries",
          "Connecting Power Apps with SharePoint",
          "Creating, reading, updating and deleting records",
          "Filtering and searching data",
          "Managing permissions",
          "SharePoint-based business applications",
        ],
      },
      {
        title: "Module 5 · Power Automate",
        topics: [
          "Introduction to workflow automation",
          "Automated cloud flows",
          "Instant flows",
          "Scheduled flows",
          "Triggers and actions",
          "Conditions",
          "Variables",
          "Loops",
          "Approvals",
          "Email notifications",
          "SharePoint automation",
          "Dataverse automation",
          "Error handling",
        ],
      },
      {
        title: "Module 6 · Business Process Automation",
        topics: [
          "Connecting Power Apps and Power Automate",
          "Automated approval systems",
          "Notifications and alerts",
          "Employee workflows",
          "Data-driven automation",
          "Business process improvement",
        ],
      },
      {
        title: "Capstone · Business Application & Automation",
        topics: [
          "Build a complete business solution using Power Apps, Dataverse, Power Automate and SharePoint",
          "Include an application interface, database and automated workflow",
        ],
      },
    ],
    careers: ["Power Platform Developer", "Power Apps Developer", "Automation Specialist", "Low-Code Consultant"],
    featured: true,
  },
  {
    slug: "copilot-developer",
    name: "Copilot Developer",
    category: "AI & Automation",
    level: "Beginner to Intermediate",
    mode: "Online / Offline",
    durationMonths: 4,
    duration: "Online class: 60 hours | Offline: 4 months (Saturday and Sunday batches)",
    fees: 30000,
    eligibility: "Graduate in any stream; no prior AI experience required",
    instructor: "Gowtham · Mahendran · Aravind",
    image: aiAutomationImg,
    summary:
      "Build AI-powered business assistants and intelligent automation solutions using Copilot, Power Automate and Dataverse.",
    overview:
      "A practical programme focused on developing AI-powered assistants and automating business processes. Learn the fundamentals of Copilot development, connect AI solutions with business data and build intelligent workflows using Power Automate and Dataverse.",
    outcomes: [
      "Understand AI and Microsoft Copilot fundamentals",
      "Build conversational AI assistants using Copilot Studio",
      "Connect Copilot solutions with Dataverse",
      "Create automated workflows using Power Automate",
      "Build AI-powered business applications",
      "Automate business processes using AI",
      "Develop and demonstrate an end-to-end Copilot project",
    ],
    curriculum: [
      {
        title: "Module 1 · AI & Copilot Fundamentals",
        topics: [
          "Introduction to Artificial Intelligence",
          "Generative AI fundamentals",
          "Introduction to Microsoft Copilot",
          "Copilot ecosystem",
          "AI-powered business solutions",
          "Copilot use cases",
          "Conversational AI concepts",
        ],
      },
      {
        title: "Module 2 · Copilot Development",
        topics: [
          "Introduction to Copilot Studio",
          "Creating a Copilot",
          "Topics and conversation flows",
          "Triggers",
          "Questions and responses",
          "Variables",
          "Entities",
          "Generative AI capabilities",
          "Testing and debugging",
        ],
      },
      {
        title: "Module 3 · Dataverse",
        topics: [
          "Introduction to Dataverse",
          "Tables and columns",
          "Data types",
          "Relationships",
          "Business data management",
          "Connecting Copilot with Dataverse",
          "Retrieving business information",
          "Updating records",
        ],
      },
      {
        title: "Module 4 · Power Automate Integration",
        topics: [
          "Introduction to workflow automation",
          "Creating automated flows",
          "Triggers and actions",
          "Connecting Copilot with Power Automate",
          "Automating business processes",
          "Email and notification automation",
          "Approval workflows",
          "Dataverse automation",
        ],
      },
      {
        title: "Module 5 · Intelligent Business Solutions",
        topics: [
          "AI-powered employee assistants",
          "FAQ assistants",
          "IT support assistants",
          "Customer support assistants",
          "HR support assistants",
          "Complaint management automation",
          "Business data assistants",
        ],
      },
      {
        title: "Module 6 · AI Automation & Integration",
        topics: [
          "Copilot and Dataverse integration",
          "Copilot and Power Automate integration",
          "Automated business workflows",
          "Intelligent data retrieval",
          "Conversational business applications",
          "Testing and deployment concepts",
        ],
      },
      {
        title: "Capstone · AI Business Assistant",
        topics: [
          "Build an intelligent business assistant that interacts with users",
          "Retrieve information from Dataverse and trigger automated workflows using Power Automate",
        ],
      },
    ],
    careers: ["Copilot Developer", "AI Automation Specialist", "Conversational AI Developer", "Business AI Consultant"],
    featured: true,
  },
];

export const courseCategories = Array.from(new Set(courses.map((c) => c.category))).sort();
export const courseLevels: CourseLevel[] = [
  "Beginner",
  "Basic to Intermediate",
  "Beginner to Intermediate",
  "Intermediate",
  "Advanced",
];
export const courseModes: CourseMode[] = ["Classroom", "Online", "Hybrid", "Online / Offline"];

export function getCourse(slug: string): Course | undefined {
  return courses.find((c) => c.slug === courseSlug(slug));
}

function courseSlug(slug: string): string {
  return slug;
}

export function formatFees(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}
