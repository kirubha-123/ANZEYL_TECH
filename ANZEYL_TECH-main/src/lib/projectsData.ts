/**
 * ANZEYL Practical Projects & Course Assignments
 * Covers all 9 ANZEYL courses with realistic project briefs, requirements,
 * deliverables, and evaluation rubrics.
 */

export interface CourseProject {
  id: string;
  courseSlug: string;
  courseTitle: string;
  title: string;
  type: "capstone" | "module_assignment";
  summary: string;
  durationWeeks: number;
  difficulty: "beginner" | "intermediate" | "advanced";
  requirements: string[];
  deliverables: string[];
  rubric: { criterion: string; weightPercent: number }[];
}

export const COURSE_PROJECTS: CourseProject[] = [
  // 1. Full Stack Development
  {
    id: "proj-fs-capstone",
    courseSlug: "full-stack-development",
    courseTitle: "Full Stack Development",
    title: "Production Multi-Tenant SaaS Platform",
    type: "capstone",
    summary:
      "Design and deploy an end-to-end SaaS application with Supabase SSR Auth, Stripe payments, Row Level Security, and dynamic team workspaces.",
    durationWeeks: 4,
    difficulty: "advanced",
    requirements: [
      "Next.js App Router with Server Components and Server Actions",
      "Supabase PostgreSQL with complete Row Level Security (RLS) on all tables",
      "Responsive UI built with Tailwind CSS and accessible interactive states",
      "Optimized production bundle deployed on Vercel or cloud VPS",
    ],
    deliverables: [
      "Public GitHub repository with comprehensive README.md and setup instructions",
      "Live deployment URL (Vercel / Railway / Render)",
      "Database schema diagram and ERD explanation",
    ],
    rubric: [
      { criterion: "Architectural Cleanliness & Next.js Best Practices", weightPercent: 30 },
      { criterion: "Security (RLS, Auth Validation & Input Sanitization)", weightPercent: 30 },
      { criterion: "UI/UX Responsiveness & Polish", weightPercent: 20 },
      { criterion: "Documentation & Deployment Integrity", weightPercent: 20 },
    ],
  },
  {
    id: "proj-fs-assignment-1",
    courseSlug: "full-stack-development",
    courseTitle: "Full Stack Development",
    title: "RESTful Task Management API with Express & MongoDB",
    type: "module_assignment",
    summary:
      "Build a secure REST API with JWT authentication, role segregation, input validation using Zod, and full CRUD operations on tasks.",
    durationWeeks: 1,
    difficulty: "intermediate",
    requirements: [
      "JWT-based access token authentication with secure cookie storage",
      "Zod schema validation middleware for all request payloads",
      "Pagination and filtering on task list endpoints",
    ],
    deliverables: [
      "GitHub repo link with Postman / Bruno collection export",
      "Documented environment variables example (.env.example)",
    ],
    rubric: [
      { criterion: "API Contract & REST Standards", weightPercent: 40 },
      { criterion: "Authentication & Security", weightPercent: 30 },
      { criterion: "Code Structure & Error Handling", weightPercent: 30 },
    ],
  },

  // 2. AI & Machine Learning
  {
    id: "proj-aiml-capstone",
    courseSlug: "ai-and-machine-learning",
    courseTitle: "AI & Machine Learning",
    title: "Autonomous Document Intelligence & RAG System",
    type: "capstone",
    summary:
      "Develop a multimodal RAG application that parses enterprise PDFs, computes vector embeddings, stores them in a vector index, and provides cited answers.",
    durationWeeks: 4,
    difficulty: "advanced",
    requirements: [
      "Document ingestion pipeline with smart text chunking and metadata enrichment",
      "Vector database indexing (pgvector / Chroma / Pinecone)",
      "Hybrid retrieval with semantic similarity and keyword BM25 reranking",
      "FastAPI backend with streaming response support",
    ],
    deliverables: [
      "GitHub repository with notebook benchmarks and pipeline scripts",
      "Evaluation report showing retrieval recall and hallucination checks",
      "Demo walkthrough video or live web interface URL",
    ],
    rubric: [
      { criterion: "RAG Pipeline Architecture & Chunking Strategy", weightPercent: 35 },
      { criterion: "Retrieval Accuracy & Evaluation Metrics", weightPercent: 30 },
      { criterion: "API & Frontend Engineering", weightPercent: 20 },
      { criterion: "Documentation & Benchmark Analysis", weightPercent: 15 },
    ],
  },

  // 4. Data Science & Analytics
  {
    id: "proj-dsa-capstone",
    courseSlug: "data-science-and-analytics",
    courseTitle: "Data Science & Analytics",
    title: "Customer Lifetime Value & Churn Prediction Model",
    type: "capstone",
    summary:
      "End-to-end data science project analyzing customer transaction history, engineering behavioral features, and training predictive churn models.",
    durationWeeks: 3,
    difficulty: "intermediate",
    requirements: [
      "Comprehensive Exploratory Data Analysis (EDA) with distribution and correlation charts",
      "Feature engineering including RFM (Recency, Frequency, Monetary) metrics",
      "Trained classification models with hyperparameter tuning and cross-validation",
      "Business executive summary translating metrics into revenue retention strategies",
    ],
    deliverables: [
      "Jupyter Notebook (.ipynb) with clean markdown commentary and visualizations",
      "Executive slide deck (PDF) with business recommendations",
      "Dataset metadata and replication instructions",
    ],
    rubric: [
      { criterion: "Exploratory Analysis Depth & Data Quality", weightPercent: 30 },
      { criterion: "Modeling Rigor & Validation Methodology", weightPercent: 30 },
      { criterion: "Business Actionability & Communication", weightPercent: 40 },
    ],
  },

  // 5. Cyber Security
  {
    id: "proj-cs-capstone",
    courseSlug: "cyber-security",
    courseTitle: "Cyber Security",
    title: "Enterprise Web Application Penetration Test & Hardening Report",
    type: "capstone",
    summary:
      "Perform a simulated black-box and grey-box security assessment on an authorized target environment, following the OWASP Testing Guide.",
    durationWeeks: 3,
    difficulty: "advanced",
    requirements: [
      "Network enumeration and service discovery documentation",
      "Vulnerability assessment targeting OWASP Top 10 flaws",
      "Proof-of-concept exploit documentation without service disruption",
      "Comprehensive remediation roadmap with CVSS v3.1 scoring",
    ],
    deliverables: [
      "Professional Penetration Testing Report (PDF)",
      "Technical remediation guide for engineering teams",
    ],
    rubric: [
      { criterion: "Methodology Adherence (OWASP PTES)", weightPercent: 35 },
      { criterion: "Technical Proof & Impact Accuracy", weightPercent: 35 },
      { criterion: "Remediation Feasibility & Executive Clarity", weightPercent: 30 },
    ],
  },

  // 6. Cloud & DevOps
  {
    id: "proj-cdo-capstone",
    courseSlug: "cloud-and-devops",
    courseTitle: "Cloud & DevOps",
    title: "Multi-Tier Infrastructure as Code & GitOps Pipeline on AWS",
    type: "capstone",
    summary:
      "Provision a secure, highly available AWS environment using Terraform and automate Kubernetes container deployments with GitHub Actions.",
    durationWeeks: 4,
    difficulty: "advanced",
    requirements: [
      "Terraform configuration provisioning VPC, subnets, NAT gateways, and EKS/EC2",
      "Docker multi-stage builds optimizing image sizes under 80MB",
      "GitHub Actions workflow for automated testing, build, security scan, and deploy",
      "Prometheus and Grafana dashboards tracking cluster health metrics",
    ],
    deliverables: [
      "GitHub repository containing Terraform code and CI/CD manifests",
      "Architecture diagram showing network topology and ingress routing",
      "Runbook documentation for disaster recovery and rollback",
    ],
    rubric: [
      { criterion: "IaC Modularity & Security Best Practices", weightPercent: 35 },
      { criterion: "Pipeline Automation & Speed", weightPercent: 30 },
      { criterion: "Observability & Disaster Recovery Runbook", weightPercent: 35 },
    ],
  },

  // 7. UI/UX Design
  {
    id: "proj-uiux-capstone",
    courseSlug: "ui-ux-design",
    courseTitle: "UI/UX Design",
    title: "Fintech Mobile Banking App & Comprehensive Design System",
    type: "capstone",
    summary:
      "Conduct user research, formulate user personas, create low-fidelity wireframes, and build an accessible, interactive high-fidelity prototype in Figma.",
    durationWeeks: 3,
    difficulty: "intermediate",
    requirements: [
      "User research findings synthesis and user empathy maps",
      "Information architecture and wireframe user flows",
      "Full Figma design system with components, variants, and design tokens",
      "Interactive prototype with micro-interactions and usability testing results",
    ],
    deliverables: [
      "Public Figma file link with view access and organized artboards",
      "Interactive Figma prototype link",
      "Case study documentation on Behance, Notion, or PDF",
    ],
    rubric: [
      { criterion: "Research & Problem Framing", weightPercent: 25 },
      { criterion: "Design System Architecture & Tokens", weightPercent: 30 },
      { criterion: "Visual Craft & Micro-interactions", weightPercent: 25 },
      { criterion: "Usability Testing Insights", weightPercent: 20 },
    ],
  },

  // 8. Digital Marketing
  {
    id: "proj-dm-capstone",
    courseSlug: "digital-marketing",
    courseTitle: "Digital Marketing",
    title: "360° Omnichannel Growth Strategy & Campaign Execution",
    type: "capstone",
    summary:
      "Formulate and simulate an end-to-end digital acquisition strategy for an EdTech or B2B brand, spanning technical SEO, Google Ads, and social funnels.",
    durationWeeks: 3,
    difficulty: "intermediate",
    requirements: [
      "Technical SEO audit and keyword intent mapping across 50+ target terms",
      "Google Ads search campaign structure with ad copies and negative keyword lists",
      "30-day social media content matrix with creative briefs",
      "Google Analytics 4 event tracking measurement plan and conversion funnel map",
    ],
    deliverables: [
      "Comprehensive Digital Marketing Strategy Document (PDF/Slides)",
      "SEO keyword research and competitor gap spreadsheet",
      "Ad copy deck with target audience demographics",
    ],
    rubric: [
      { criterion: "SEO Analysis Depth & Technical Soundness", weightPercent: 30 },
      { criterion: "Paid Acquisition Targeting & ROI Logic", weightPercent: 30 },
      { criterion: "Content Strategy & Funnel Alignment", weightPercent: 25 },
      { criterion: "Analytics & KPI Measurement Framework", weightPercent: 15 },
    ],
  },

  // 9. Data Analytics with Power BI
  {
    id: "proj-pbi-capstone",
    courseSlug: "data-analytics-with-power-bi",
    courseTitle: "Data Analytics with Power BI",
    title: "Executive Revenue, Operations & Supply Chain BI Dashboard",
    type: "capstone",
    summary:
      "Transform multi-source raw transactional data into an enterprise-grade Power BI dashboard with star-schema modeling and advanced DAX time intelligence.",
    durationWeeks: 3,
    difficulty: "intermediate",
    requirements: [
      "Power Query data cleansing, column transformations, and star schema creation",
      "Date table creation with custom financial calendar logic",
      "10+ DAX measures including YTD, MoM growth, rolling 30-day averages, and ranking",
      "Interactive executive report with drill-through pages, bookmarks, and slicers",
    ],
    deliverables: [
      "Packaged Power BI file (.pbix) with verified data model",
      "PDF export of the executive report presentation",
      "Data dictionary explaining all measures and schema tables",
    ],
    rubric: [
      { criterion: "Data Model & Star Schema Architecture", weightPercent: 35 },
      { criterion: "DAX Complexity & Accuracy", weightPercent: 30 },
      { criterion: "Visual Design, Usability & Drill-Through UX", weightPercent: 25 },
      { criterion: "Data Dictionary & Documentation", weightPercent: 10 },
    ],
  },
];

