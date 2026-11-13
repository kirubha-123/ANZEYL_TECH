/**
 * ANZEYL Academic Course Assignments
 * Comprehensive hands-on assignments covering all 9 ANZEYL programmes.
 */

export interface AssignmentItem {
  id: string;
  courseTitle: string;
  courseSlug: string;
  moduleTitle: string;
  title: string;
  dueDate: string;
  status: "Pending" | "Submitted" | "Graded";
  score?: string;
  maxScore: number;
  description: string;
  rubric: { criterion: string; weightPercent: number }[];
  deliverablesRequired: string[];
}

export const COURSE_ASSIGNMENTS: AssignmentItem[] = [
  // 1. Full Stack Development
  {
    id: "asg-fs-1",
    courseTitle: "Full Stack Development",
    courseSlug: "full-stack-development",
    moduleTitle: "Module 2: React Fundamentals",
    title: "Interactive E-Commerce Product Filter & Cart Island",
    dueDate: "Nov 20, 2026",
    status: "Pending",
    maxScore: 100,
    description:
      "Build a responsive React client component that filters items by category and price slider, managing state via useReducer with persistent cart storage.",
    deliverablesRequired: ["GitHub repository link", "Live demo link (Vercel/Netlify)"],
    rubric: [
      { criterion: "Component Architecture & Custom Hooks", weightPercent: 40 },
      { criterion: "Responsive Tailwind CSS Polish", weightPercent: 30 },
      { criterion: "State Management & Error Boundaries", weightPercent: 30 },
    ],
  },
  {
    id: "asg-fs-2",
    courseTitle: "Full Stack Development",
    courseSlug: "full-stack-development",
    moduleTitle: "Module 4: Node.js & Express",
    title: "JWT Authentication Middleware & Secure Cookie Parser",
    dueDate: "Nov 28, 2026",
    status: "Pending",
    maxScore: 100,
    description:
      "Implement custom Express middleware that parses HttpOnly signed cookies, verifies RS256 JWT tokens, and enforces granular role permissions.",
    deliverablesRequired: ["GitHub repository link", "Postman / Bruno test collection"],
    rubric: [
      { criterion: "Middleware Security & Cookie Parsing", weightPercent: 40 },
      { criterion: "Error Handling & HTTP Status Codes", weightPercent: 30 },
      { criterion: "Test Coverage & Edge Cases", weightPercent: 30 },
    ],
  },
  {
    id: "asg-fs-3",
    courseTitle: "Full Stack Development",
    courseSlug: "full-stack-development",
    moduleTitle: "Module 5: Database Architecture",
    title: "Relational Schema Design & Supabase RLS Policies",
    dueDate: "Dec 05, 2026",
    status: "Pending",
    maxScore: 100,
    description:
      "Author PostgreSQL migration files defining a multi-tenant database schema with foreign keys, indexes, and strict Row Level Security (RLS) policies.",
    deliverablesRequired: ["SQL migration script (.sql)", "Schema ER diagram (PNG/PDF)"],
    rubric: [
      { criterion: "Schema Normalization & Indexing", weightPercent: 40 },
      { criterion: "Row Level Security Verification", weightPercent: 40 },
      { criterion: "Documentation & Performance", weightPercent: 20 },
    ],
  },

  // 2. AI & Machine Learning
  {
    id: "asg-aiml-1",
    courseTitle: "AI & Machine Learning",
    courseSlug: "ai-and-machine-learning",
    moduleTitle: "Module 2: Classical Machine Learning",
    title: "Customer Churn Prediction with scikit-learn Pipelines",
    dueDate: "Nov 22, 2026",
    status: "Pending",
    maxScore: 100,
    description:
      "Train Random Forest and Gradient Boosting models, compute ROC-AUC curves, tune hyperparameters with GridSearchCV, and perform 5-fold cross-validation.",
    deliverablesRequired: ["Jupyter Notebook (.ipynb)", "Model artifact (.joblib or .pkl)"],
    rubric: [
      { criterion: "Pipeline Engineering & Feature Scaling", weightPercent: 35 },
      { criterion: "Model Evaluation & Metric Interpretation", weightPercent: 35 },
      { criterion: "Code Reproducibility & Commentary", weightPercent: 30 },
    ],
  },
  {
    id: "asg-aiml-2",
    courseTitle: "AI & Machine Learning",
    courseSlug: "ai-and-machine-learning",
    moduleTitle: "Module 4: Deep Learning & PyTorch",
    title: "Image Classification with Transfer Learning (ResNet)",
    dueDate: "Dec 02, 2026",
    status: "Pending",
    maxScore: 100,
    description:
      "Fine-tune a pretrained ResNet-50 model in PyTorch on a custom medical scan or industrial inspection dataset, tracking loss curves and confusion matrix.",
    deliverablesRequired: ["GitHub repository with train.py script", "Loss curve plot & training logs"],
    rubric: [
      { criterion: "PyTorch Dataset & DataLoader Pipeline", weightPercent: 35 },
      { criterion: "Transfer Learning & Fine-Tuning Strategy", weightPercent: 35 },
      { criterion: "Test Accuracy & Overfitting Prevention", weightPercent: 30 },
    ],
  },

  // 4. Data Science & Analytics
  {
    id: "asg-dsa-1",
    courseTitle: "Data Science & Analytics",
    courseSlug: "data-science-and-analytics",
    moduleTitle: "Module 2: Python for Data Analysis",
    title: "Exploratory Data Analysis on Global Sales Transactions",
    dueDate: "Nov 24, 2026",
    status: "Pending",
    maxScore: 100,
    description:
      "Clean 500,000+ transaction rows using Pandas, impute missing values, identify statistical anomalies with boxplots, and compute correlation matrices.",
    deliverablesRequired: ["Jupyter Notebook (.ipynb) with visualizations", "Cleaned dataset CSV link"],
    rubric: [
      { criterion: "Data Cleaning & Imputation Rigor", weightPercent: 40 },
      { criterion: "Statistical Visualizations (Seaborn/Matplotlib)", weightPercent: 35 },
      { criterion: "Written Analytical Insights", weightPercent: 25 },
    ],
  },
  {
    id: "asg-dsa-2",
    courseTitle: "Data Science & Analytics",
    courseSlug: "data-science-and-analytics",
    moduleTitle: "Module 3: Advanced SQL for Analytics",
    title: "Cohort Retention & Revenue Attribution Queries",
    dueDate: "Dec 01, 2026",
    status: "Pending",
    maxScore: 100,
    description:
      "Write advanced SQL queries featuring Common Table Expressions (CTEs), window functions (ROW_NUMBER, LEAD/LAG, NTILE), and rolling revenue aggregations.",
    deliverablesRequired: ["SQL script file (.sql)", "Query execution plan output & analysis"],
    rubric: [
      { criterion: "Window Function & CTE Accuracy", weightPercent: 45 },
      { criterion: "Query Optimization & Explain Plan", weightPercent: 30 },
      { criterion: "Business Query Results Validation", weightPercent: 25 },
    ],
  },

  // 5. Cyber Security
  {
    id: "asg-cs-1",
    courseTitle: "Cyber Security",
    courseSlug: "cyber-security",
    moduleTitle: "Module 2: Network Reconnaissance",
    title: "Network Vulnerability Assessment & Wireshark Analysis",
    dueDate: "Nov 26, 2026",
    status: "Pending",
    maxScore: 100,
    description:
      "Perform port scanning with Nmap, capture PCAP traces in Wireshark, analyze unencrypted protocols, and produce a formal risk classification report.",
    deliverablesRequired: ["Reconnaissance Report (PDF)", "Wireshark PCAP capture file"],
    rubric: [
      { criterion: "Scanning Methodology & Port Accuracy", weightPercent: 35 },
      { criterion: "Packet Inspection & Protocol Breakdown", weightPercent: 35 },
      { criterion: "Risk Severity Rating (CVSS v3)", weightPercent: 30 },
    ],
  },
  {
    id: "asg-cs-2",
    courseTitle: "Cyber Security",
    courseSlug: "cyber-security",
    moduleTitle: "Module 4: Web Application Defense",
    title: "SQL Injection & XSS Exploitation and Hardening Lab",
    dueDate: "Dec 04, 2026",
    status: "Pending",
    maxScore: 100,
    description:
      "Identify SQL Injection and Cross-Site Scripting flaws in an authorized lab app, document exploit proof-of-concepts, and deploy parameterized query fixes.",
    deliverablesRequired: ["Security Remediation Code Diff", "Exploit PoC Walkthrough Document"],
    rubric: [
      { criterion: "Exploit Verification (Non-Destructive)", weightPercent: 40 },
      { criterion: "Remediation Efficacy & Code Quality", weightPercent: 40 },
      { criterion: "Documentation & Attack Vector Explanation", weightPercent: 20 },
    ],
  },

  // 6. Cloud & DevOps
  {
    id: "asg-cdo-1",
    courseTitle: "Cloud & DevOps",
    courseSlug: "cloud-and-devops",
    moduleTitle: "Module 2: Docker Containers",
    title: "Multi-Stage Distroless Dockerfile Optimization",
    dueDate: "Nov 25, 2026",
    status: "Pending",
    maxScore: 100,
    description:
      "Write a multi-stage Docker build producing a hardened production container image under 80MB, utilizing non-root user execution and security scanning.",
    deliverablesRequired: ["Dockerfile and docker-compose.yml", "Trivy vulnerability scan report"],
    rubric: [
      { criterion: "Image Size Reduction & Multi-Stage Efficiency", weightPercent: 40 },
      { criterion: "Container Security (Non-root, Minimal Base)", weightPercent: 35 },
      { criterion: "Documentation & Run Verification", weightPercent: 25 },
    ],
  },
  {
    id: "asg-cdo-2",
    courseTitle: "Cloud & DevOps",
    courseSlug: "cloud-and-devops",
    moduleTitle: "Module 3: Continuous Integration",
    title: "Automated CI Pipeline with GitHub Actions & Docker Hub",
    dueDate: "Dec 03, 2026",
    status: "Pending",
    maxScore: 100,
    description:
      "Configure a GitHub Actions workflow that runs linter, executes test suites with coverage thresholds, builds container images, and pushes to Docker Hub on tag release.",
    deliverablesRequired: ["GitHub repository link with .github/workflows/ci.yml", "Successful run badge & Docker Hub repository link"],
    rubric: [
      { criterion: "Workflow Design & Build Caching", weightPercent: 40 },
      { criterion: "Secret Management & Security Gates", weightPercent: 35 },
      { criterion: "Execution Speed & Reliability", weightPercent: 25 },
    ],
  },

  // 7. UI/UX Design
  {
    id: "asg-uiux-1",
    courseTitle: "UI/UX Design",
    courseSlug: "ui-ux-design",
    moduleTitle: "Module 2: Design Systems & Tokens",
    title: "Scalable Component Library & Auto-Layout in Figma",
    dueDate: "Nov 23, 2026",
    status: "Pending",
    maxScore: 100,
    description:
      "Construct a production-ready Figma design system containing color styles, typography scales, spacing tokens, and component sets with interactive variant states.",
    deliverablesRequired: ["Public Figma file link (view access)", "Design token specification document"],
    rubric: [
      { criterion: "Auto-Layout & Responsive Constraints", weightPercent: 35 },
      { criterion: "Variant Properties & Component Tokens", weightPercent: 35 },
      { criterion: "Accessibility (WCAG 2.1 AA Contrast)", weightPercent: 30 },
    ],
  },
  {
    id: "asg-uiux-2",
    courseTitle: "UI/UX Design",
    courseSlug: "ui-ux-design",
    moduleTitle: "Module 3: UX Research & Prototyping",
    title: "User Empathy Mapping & High-Fidelity Prototype",
    dueDate: "Dec 01, 2026",
    status: "Pending",
    maxScore: 100,
    description:
      "Synthesize user interviews into 2 primary user personas, define the checkout onboarding flow, and connect animated screen micro-interactions in Figma.",
    deliverablesRequired: ["Figma prototype link", "User journey map presentation (PDF)"],
    rubric: [
      { criterion: "User Research Translation & Empathy Mapping", weightPercent: 35 },
      { criterion: "Micro-Interactions & Prototype Smoothness", weightPercent: 35 },
      { criterion: "Visual Hierarchy & Typography", weightPercent: 30 },
    ],
  },

  // 8. Digital Marketing
  {
    id: "asg-dm-1",
    courseTitle: "Digital Marketing",
    courseSlug: "digital-marketing",
    moduleTitle: "Module 2: Search Engine Optimization",
    title: "Technical SEO Audit & Keyword Strategy Plan",
    dueDate: "Nov 25, 2026",
    status: "Pending",
    maxScore: 100,
    description:
      "Perform a technical crawl on an assigned domain, identify indexing bottlenecks and Core Web Vitals issues, and map search queries by search intent.",
    deliverablesRequired: ["SEO Audit Document (PDF)", "Keyword mapping spreadsheet (.xlsx / Google Sheets link)"],
    rubric: [
      { criterion: "Technical Audit Rigor & Site Architecture", weightPercent: 35 },
      { criterion: "Keyword Search Intent & Difficulty Analysis", weightPercent: 35 },
      { criterion: "Actionable Content Recommendations", weightPercent: 30 },
    ],
  },
  {
    id: "asg-dm-2",
    courseTitle: "Digital Marketing",
    courseSlug: "digital-marketing",
    moduleTitle: "Module 3: Paid Advertising (PPC)",
    title: "Google Search Ads Campaign Structure & Copy Deck",
    dueDate: "Dec 04, 2026",
    status: "Pending",
    maxScore: 100,
    description:
      "Architect a multi-group Google Ads search campaign targeting high-intent courses, authoring 15 responsive search ads and negative keyword lists.",
    deliverablesRequired: ["Campaign Structure Workbook (PDF / Sheet)", "Ad Copy Deck with Extensions"],
    rubric: [
      { criterion: "Ad Group Segmentation & Match Type Logic", weightPercent: 35 },
      { criterion: "Compelling Ad Copy & Headline Variety", weightPercent: 35 },
      { criterion: "Negative Keyword Defense & Budget Model", weightPercent: 30 },
    ],
  },

  // 9. Data Analytics with Power BI
  {
    id: "asg-pbi-1",
    courseTitle: "Data Analytics with Power BI",
    courseSlug: "data-analytics-with-power-bi",
    moduleTitle: "Module 2: Data Modeling & Star Schema",
    title: "Power Query Cleansing & Star Schema Construction",
    dueDate: "Nov 26, 2026",
    status: "Pending",
    maxScore: 100,
    description:
      "Transform messy multi-table transactional Excel files in Power Query, create date dimensions, and build a high-performance 1-to-many star schema.",
    deliverablesRequired: ["Power BI report file (.pbix)", "Schema relationship screenshot"],
    rubric: [
      { criterion: "Power Query Applied Steps Cleanliness", weightPercent: 40 },
      { criterion: "Star Schema Relationships & Cardinality", weightPercent: 40 },
      { criterion: "Data Type Formatting & Best Practices", weightPercent: 20 },
    ],
  },
  {
    id: "asg-pbi-2",
    courseTitle: "Data Analytics with Power BI",
    courseSlug: "data-analytics-with-power-bi",
    moduleTitle: "Module 3: DAX Calculations & Measures",
    title: "Time Intelligence & Financial DAX Formulas",
    dueDate: "Dec 05, 2026",
    status: "Pending",
    maxScore: 100,
    description:
      "Author 10+ essential DAX measures including Year-Over-Year Growth, Quarter-to-Date revenue, rolling 30-day moving average, and dynamic ranking.",
    deliverablesRequired: ["Power BI report (.pbix) with DAX measure table", "DAX Formulas Documentation Sheet"],
    rubric: [
      { criterion: "DAX Syntax & Time Intelligence Functions", weightPercent: 45 },
      { criterion: "Filter Context Handling & CALCULATE Usage", weightPercent: 35 },
      { criterion: "Measure Performance & Formatting", weightPercent: 20 },
    ],
  },
];

