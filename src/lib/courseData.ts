/**
 * ANZEYL Course Catalogue — Centralized Course Configuration
 *
 * This file is the single source of truth for all course metadata,
 * curriculum, pricing, and training mode information.
 *
 * HOW PRICING WORKS:
 *   - priceInCents: null  → show "Contact ANZEYL for Course Fees"
 *   - priceInCents: 0     → Free
 *   - priceInCents: N     → Display as ₹N/100 (e.g. 2999900 → ₹29,999)
 *   - originalPriceInCents: optional, shows strikethrough price if set
 *
 * When real Supabase courses are present, the DB values override these
 * fallbacks. This file also drives the static public /courses page and
 * the /courses/[slug] detail pages (no DB required for public browsing).
 */

export interface CourseModule {
  title: string;
  topics: string[];
}

export interface AnzeylCourse {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  overview: string;
  durationMonths: number;
  durationLabel: string;
  modes: ("Online" | "Offline")[];
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  technologies: string[];
  skills: string[];
  modules: CourseModule[];
  projects: string[];
  learningOutcomes: string[];
  /** null = "Contact ANZEYL for Course Fees" */
  priceInCents: number | null;
  /** Set to show original/before-discount price */
  originalPriceInCents: number | null;
}

/** Format a price in cents to ₹ display string */
export function formatPrice(cents: number): string {
  const rupees = cents / 100;
  return `₹${rupees.toLocaleString("en-IN")}`;
}

/** Render the price label for a course */
export function getPriceLabel(course: Pick<AnzeylCourse, "priceInCents">): string {
  if (course.priceInCents === null) return "Contact ANZEYL for Course Fees";
  if (course.priceInCents === 0) return "Free";
  return formatPrice(course.priceInCents);
}

export const ANZEYL_COURSES: AnzeylCourse[] = [
  // ─────────────────────────────────────────────
  // 1. Full Stack Development
  // ─────────────────────────────────────────────
  {
    id: "course-fullstack",
    slug: "full-stack-development",
    title: "Full Stack Development",
    shortDescription:
      "Master modern web development from scratch — build responsive UIs, powerful REST APIs, and deploy full-stack applications to the cloud with real-world projects.",
    overview:
      "This comprehensive programme takes you from core HTML/CSS to building production-grade full-stack applications. You will learn React for dynamic UIs, Node.js and Express for REST APIs, MongoDB and PostgreSQL for data persistence, and deploy on cloud platforms. Hands-on projects run throughout the course so you graduate with a real portfolio.",
    durationMonths: 3,
    durationLabel: "3 Months",
    modes: ["Online", "Offline"],
    category: "Full Stack Development",
    difficulty: "intermediate",
    technologies: [
      "HTML5", "CSS3", "JavaScript (ES2024)", "TypeScript",
      "React 18", "Next.js", "Node.js", "Express.js",
      "MongoDB", "PostgreSQL", "REST APIs", "Git & GitHub",
      "Docker Basics", "Vercel / Railway",
    ],
    skills: [
      "Frontend component architecture",
      "State management with React hooks",
      "RESTful API design and implementation",
      "Database schema design",
      "Authentication and authorisation",
      "Deployment and CI/CD basics",
      "Debugging and performance profiling",
    ],
    modules: [
      {
        title: "Module 1 — Web Fundamentals",
        topics: [
          "Semantic HTML5 and accessibility",
          "Advanced CSS layouts: Flexbox & Grid",
          "JavaScript ES2024 core concepts",
          "TypeScript fundamentals",
        ],
      },
      {
        title: "Module 2 — React Frontend Development",
        topics: [
          "React component model and JSX",
          "Hooks: useState, useEffect, useContext, useMemo",
          "React Router and navigation patterns",
          "Form handling and validation",
        ],
      },
      {
        title: "Module 3 — Next.js and SSR",
        topics: [
          "Next.js App Router and file-based routing",
          "Server-side rendering and static generation",
          "API routes and middleware",
          "SEO and performance optimisation",
        ],
      },
      {
        title: "Module 4 — Backend with Node.js and Express",
        topics: [
          "Node.js runtime and event loop",
          "Express routing, middleware, and error handling",
          "RESTful API design principles",
          "Authentication with JWT and sessions",
        ],
      },
      {
        title: "Module 5 — Databases and ORMs",
        topics: [
          "PostgreSQL schema design and queries",
          "MongoDB document modelling",
          "ORM with Prisma and Mongoose",
          "Database migrations and seeding",
        ],
      },
      {
        title: "Module 6 — Deployment and DevOps Basics",
        topics: [
          "Git workflows and GitHub collaboration",
          "Docker containers and compose",
          "Cloud deployment: Vercel, Railway, Render",
          "Environment variables and secrets management",
        ],
      },
    ],
    projects: [
      "Portfolio website with dynamic project showcase",
      "E-commerce storefront with cart, auth, and order management",
      "Real-time task manager with WebSocket updates",
    ],
    learningOutcomes: [
      "Design, build, and deploy full-stack web applications independently",
      "Implement secure user authentication and role-based access",
      "Integrate SQL and NoSQL databases with server-side logic",
      "Optimise application performance and conduct code reviews",
    ],
    priceInCents: null,
    originalPriceInCents: null,
  },


  // ─────────────────────────────────────────────
  // 2. AI & Machine Learning
  // ─────────────────────────────────────────────
  {
    id: "course-ai-ml",
    slug: "ai-and-machine-learning",
    title: "AI & Machine Learning",
    shortDescription:
      "Understand, build, and deploy intelligent systems — from classical ML algorithms to deep learning, NLP, and production-ready LLM-powered applications.",
    overview:
      "This programme provides a thorough grounding in artificial intelligence and machine learning. You will study supervised and unsupervised learning, neural networks, natural language processing, and computer vision. Practical sessions use Python, scikit-learn, and PyTorch, culminating in deployed ML applications.",
    durationMonths: 3,
    durationLabel: "3 Months",
    modes: ["Online", "Offline"],
    category: "AI & Machine Learning",
    difficulty: "advanced",
    technologies: [
      "Python 3.12", "NumPy", "Pandas", "scikit-learn",
      "PyTorch", "TensorFlow / Keras", "Hugging Face Transformers",
      "OpenAI API", "LangChain", "Jupyter Notebooks", "FastAPI",
    ],
    skills: [
      "Data preprocessing and feature engineering",
      "Supervised and unsupervised model training",
      "Neural network architecture design",
      "NLP and text classification",
      "Model evaluation and hyperparameter tuning",
      "Deploying ML models as APIs",
    ],
    modules: [
      {
        title: "Module 1 — Python for Data Science",
        topics: [
          "NumPy arrays and linear algebra",
          "Pandas data manipulation and analysis",
          "Matplotlib and Seaborn visualisation",
          "Data cleaning and preprocessing pipelines",
        ],
      },
      {
        title: "Module 2 — Classical Machine Learning",
        topics: [
          "Regression, classification, and clustering algorithms",
          "Decision trees, random forests, and gradient boosting",
          "Model selection, cross-validation, and regularisation",
          "scikit-learn pipelines and preprocessing",
        ],
      },
      {
        title: "Module 3 — Deep Learning",
        topics: [
          "Neural network fundamentals and backpropagation",
          "Convolutional neural networks for image tasks",
          "Recurrent networks and sequence modelling",
          "PyTorch training loops and GPU acceleration",
        ],
      },
      {
        title: "Module 4 — Natural Language Processing",
        topics: [
          "Text preprocessing, tokenisation, and embeddings",
          "Transformer architecture and attention mechanisms",
          "Fine-tuning pre-trained models with Hugging Face",
          "Sentiment analysis and text classification projects",
        ],
      },
      {
        title: "Module 5 — LLMs and Generative AI",
        topics: [
          "Prompt engineering and chain-of-thought reasoning",
          "RAG (Retrieval-Augmented Generation) pipelines",
          "LangChain agent workflows",
          "OpenAI API integration and cost management",
        ],
      },
      {
        title: "Module 6 — MLOps and Deployment",
        topics: [
          "Model serialisation and versioning",
          "Serving models with FastAPI",
          "Monitoring model drift and performance",
          "Docker and cloud deployment for ML",
        ],
      },
    ],
    projects: [
      "Sentiment analysis tool for product reviews",
      "Image classification application with CNNs",
      "RAG-powered document Q&A assistant",
    ],
    learningOutcomes: [
      "Design and train machine learning models for real-world datasets",
      "Implement deep learning solutions using PyTorch",
      "Build LLM-powered applications using modern APIs and frameworks",
      "Deploy and monitor ML models in production environments",
    ],
    priceInCents: null,
    originalPriceInCents: null,
  },

  // ─────────────────────────────────────────────
  // 4. Data Science & Analytics
  // ─────────────────────────────────────────────
  {
    id: "course-data-science",
    slug: "data-science-and-analytics",
    title: "Data Science & Analytics",
    shortDescription:
      "Turn raw data into business insights — master Python, SQL, statistical analysis, and powerful visualisation tools to drive data-informed decisions.",
    overview:
      "Data Science & Analytics equips you with the full workflow from data collection to insight delivery. You will learn statistical thinking, exploratory data analysis, predictive modelling, and storytelling with data. The course uses Python for analysis, SQL for querying, and tools like Tableau and Power BI for dashboards.",
    durationMonths: 3,
    durationLabel: "3 Months",
    modes: ["Online", "Offline"],
    category: "Data Science",
    difficulty: "intermediate",
    technologies: [
      "Python 3.12", "Pandas", "NumPy", "Matplotlib",
      "Seaborn", "scikit-learn", "SQL (PostgreSQL)",
      "Tableau", "Power BI", "Jupyter Notebooks", "Excel / Google Sheets",
    ],
    skills: [
      "Statistical analysis and hypothesis testing",
      "Exploratory data analysis (EDA)",
      "Predictive modelling and regression",
      "Data visualisation and dashboard creation",
      "SQL for analytical queries",
      "Data storytelling and reporting",
    ],
    modules: [
      {
        title: "Module 1 — Foundations of Data Science",
        topics: [
          "Data science workflow and lifecycle",
          "Python programming for analysis",
          "Introduction to statistics and probability",
          "Data collection and cleaning strategies",
        ],
      },
      {
        title: "Module 2 — Exploratory Data Analysis",
        topics: [
          "Descriptive statistics and data profiling",
          "Distribution analysis and outlier detection",
          "Correlation and feature relationships",
          "Pandas EDA techniques",
        ],
      },
      {
        title: "Module 3 — SQL for Analytics",
        topics: [
          "Advanced SQL: window functions, CTEs, subqueries",
          "Analytical queries for business KPIs",
          "Joining and aggregating large datasets",
          "Query optimisation for analytics workloads",
        ],
      },
      {
        title: "Module 4 — Predictive Modelling",
        topics: [
          "Linear and logistic regression",
          "Time-series forecasting",
          "Classification models and evaluation metrics",
          "Model interpretation and business impact",
        ],
      },
      {
        title: "Module 5 — Data Visualisation",
        topics: [
          "Matplotlib and Seaborn for Python charts",
          "Tableau Desktop: dashboards and stories",
          "Power BI reports and DAX basics",
          "Principles of effective data communication",
        ],
      },
      {
        title: "Module 6 — Capstone and Reporting",
        topics: [
          "End-to-end data science project",
          "Business problem framing and stakeholder reporting",
          "Notebook-based presentation techniques",
          "Ethics in data and responsible analytics",
        ],
      },
    ],
    projects: [
      "Sales trend analysis and forecasting dashboard",
      "Customer churn prediction model",
      "Healthcare dataset EDA and insight report",
    ],
    learningOutcomes: [
      "Conduct full exploratory data analyses on real datasets",
      "Build and evaluate predictive models for business applications",
      "Create clear, compelling dashboards and reports",
      "Query and analyse data efficiently using advanced SQL",
    ],
    priceInCents: null,
    originalPriceInCents: null,
  },

  // ─────────────────────────────────────────────
  // 5. Cyber Security
  // ─────────────────────────────────────────────
  {
    id: "course-cyber-security",
    slug: "cyber-security",
    title: "Cyber Security",
    shortDescription:
      "Think like a hacker, defend like a professional — learn ethical hacking, network security, vulnerability assessment, and security operations hands-on.",
    overview:
      "This programme introduces the mindset and technical toolkit of a cybersecurity professional. You will study network security, ethical hacking methodologies, vulnerability assessment, cryptography, and security operations. Lab-based sessions use industry tools such as Kali Linux, Metasploit, and Wireshark in controlled environments.",
    durationMonths: 3,
    durationLabel: "3 Months",
    modes: ["Online", "Offline"],
    category: "Cyber Security",
    difficulty: "intermediate",
    technologies: [
      "Kali Linux", "Metasploit Framework", "Nmap", "Wireshark",
      "Burp Suite", "OWASP Top 10", "Python (scripting)",
      "Nessus / OpenVAS", "Splunk Basics", "VirtualBox / VMware",
    ],
    skills: [
      "Network scanning and enumeration",
      "Web application vulnerability assessment",
      "Ethical hacking and penetration testing basics",
      "Incident identification and response",
      "Cryptography fundamentals",
      "Security hardening and best practices",
    ],
    modules: [
      {
        title: "Module 1 — Security Fundamentals",
        topics: [
          "CIA triad: confidentiality, integrity, availability",
          "Common attack types and threat landscape",
          "Security frameworks: NIST, ISO 27001 basics",
          "Legal and ethical considerations",
        ],
      },
      {
        title: "Module 2 — Network Security",
        topics: [
          "TCP/IP networking and protocol analysis",
          "Firewalls, VPNs, and IDS/IPS concepts",
          "Network scanning with Nmap",
          "Packet analysis with Wireshark",
        ],
      },
      {
        title: "Module 3 — Ethical Hacking and Penetration Testing",
        topics: [
          "Penetration testing methodology and phases",
          "Exploitation with Metasploit (lab environment)",
          "Privilege escalation techniques",
          "Post-exploitation and reporting",
        ],
      },
      {
        title: "Module 4 — Web Application Security",
        topics: [
          "OWASP Top 10 vulnerabilities",
          "SQL injection and XSS attacks and defences",
          "Burp Suite for web application testing",
          "Secure coding practices",
        ],
      },
      {
        title: "Module 5 — Cryptography and Identity",
        topics: [
          "Symmetric and asymmetric encryption",
          "PKI, digital certificates, and TLS/SSL",
          "Password hashing and salting",
          "Multi-factor authentication mechanisms",
        ],
      },
      {
        title: "Module 6 — Security Operations",
        topics: [
          "Log analysis and SIEM basics",
          "Incident response lifecycle",
          "Vulnerability scanning and remediation",
          "Cyber hygiene and employee security training",
        ],
      },
    ],
    projects: [
      "Penetration test report on a deliberately vulnerable VM",
      "Web application security audit using Burp Suite",
      "Security hardening checklist for a Linux server",
    ],
    learningOutcomes: [
      "Conduct basic ethical hacking and vulnerability assessments",
      "Identify and mitigate common web and network security threats",
      "Apply cryptographic principles to protect data",
      "Respond to and document security incidents",
    ],
    priceInCents: null,
    originalPriceInCents: null,
  },

  // ─────────────────────────────────────────────
  // 5. Cloud & DevOps
  // ─────────────────────────────────────────────
  {
    id: "course-cloud-devops",
    slug: "cloud-and-devops",
    title: "Cloud & DevOps",
    shortDescription:
      "Architect resilient cloud solutions — automate CI/CD pipelines, orchestrate microservices with Docker & Kubernetes, and manage AWS infrastructure.",
    overview:
      "Cloud & DevOps combines infrastructure management with automation engineering. You will study cloud fundamentals on AWS, containerisation with Docker and Kubernetes, infrastructure-as-code with Terraform, and pipeline automation with GitHub Actions. The course emphasises reliable, repeatable deployments in real cloud environments.",
    durationMonths: 3,
    durationLabel: "3 Months",
    modes: ["Online", "Offline"],
    category: "Cloud & DevOps",
    difficulty: "intermediate",
    technologies: [
      "AWS (EC2, S3, RDS, Lambda, IAM)", "Docker", "Kubernetes",
      "Terraform", "GitHub Actions", "Ansible",
      "Linux (Ubuntu)", "Nginx", "Prometheus", "Grafana", "Helm",
    ],
    skills: [
      "Cloud infrastructure provisioning and management",
      "Container orchestration with Kubernetes",
      "Infrastructure-as-code with Terraform",
      "CI/CD pipeline design and automation",
      "Monitoring and alerting systems",
      "Cloud cost management and best practices",
    ],
    modules: [
      {
        title: "Module 1 — Linux and Networking Basics",
        topics: [
          "Linux command line and shell scripting",
          "File permissions, users, and processes",
          "Networking concepts: DNS, HTTP, TCP/IP",
          "SSH and remote server management",
        ],
      },
      {
        title: "Module 2 — Docker and Containers",
        topics: [
          "Container concepts vs virtual machines",
          "Writing Dockerfiles and multi-stage builds",
          "Docker Compose for local environments",
          "Container security and image optimisation",
        ],
      },
      {
        title: "Module 3 — AWS Cloud Fundamentals",
        topics: [
          "AWS global infrastructure and core services",
          "IAM: roles, policies, and least privilege",
          "Compute: EC2, Lambda, and Auto Scaling",
          "Storage: S3, EBS, and RDS",
        ],
      },
      {
        title: "Module 4 — Kubernetes",
        topics: [
          "Kubernetes architecture: nodes, pods, services",
          "Deployments, ReplicaSets, and rolling updates",
          "ConfigMaps, Secrets, and persistent volumes",
          "Helm charts for application packaging",
        ],
      },
      {
        title: "Module 5 — Infrastructure as Code",
        topics: [
          "Terraform HCL syntax and resource definitions",
          "State management and remote backends",
          "Modules and reusable infrastructure",
          "Drift detection and plan/apply workflow",
        ],
      },
      {
        title: "Module 6 — CI/CD and Observability",
        topics: [
          "GitHub Actions workflows and secrets",
          "Automated testing in pipelines",
          "Prometheus metrics and Grafana dashboards",
          "Log aggregation and alerting",
        ],
      },
    ],
    projects: [
      "Automated deployment pipeline for a Node.js application on AWS",
      "Kubernetes cluster setup with Helm-managed microservices",
      "Terraform module for a reproducible three-tier AWS architecture",
    ],
    learningOutcomes: [
      "Provision and manage cloud infrastructure on AWS using Terraform",
      "Build end-to-end CI/CD pipelines with GitHub Actions",
      "Deploy and scale containerised applications on Kubernetes",
      "Implement monitoring and observability with Prometheus and Grafana",
    ],
    priceInCents: null,
    originalPriceInCents: null,
  },

  // ─────────────────────────────────────────────
  // 6. UI/UX Design
  // ─────────────────────────────────────────────
  {
    id: "course-uiux",
    slug: "ui-ux-design",
    title: "UI/UX Design",
    shortDescription:
      "Design compelling digital experiences — conduct empathetic user research, build interactive Figma prototypes, and establish scalable design systems.",
    overview:
      "This programme develops your design thinking and practical skills for creating user-centred digital experiences. You will learn research methods, information architecture, interaction design, and visual design principles. The course uses Figma as the primary design tool, with sessions on handoff to developers and usability testing.",
    durationMonths: 3,
    durationLabel: "3 Months",
    modes: ["Online", "Offline"],
    category: "UI/UX Design",
    difficulty: "beginner",
    technologies: [
      "Figma", "FigJam", "Adobe XD (intro)", "Maze (usability testing)",
      "Notion (documentation)", "Zeplin (developer handoff)",
      "Lottie (micro-animations)", "Accessibility tools",
    ],
    skills: [
      "User research and persona creation",
      "Wireframing and low-fidelity prototyping",
      "High-fidelity UI design in Figma",
      "Interaction design and micro-interactions",
      "Design system creation and maintenance",
      "Usability testing and iterating on feedback",
    ],
    modules: [
      {
        title: "Module 1 — Design Thinking and UX Research",
        topics: [
          "Design thinking methodology",
          "User interviews and surveys",
          "Affinity mapping and insight synthesis",
          "Persona and user journey mapping",
        ],
      },
      {
        title: "Module 2 — Information Architecture and Wireframing",
        topics: [
          "Site maps and content hierarchy",
          "Card sorting and navigation patterns",
          "Low-fidelity wireframes in Figma",
          "User flow diagrams",
        ],
      },
      {
        title: "Module 3 — Visual Design Principles",
        topics: [
          "Typography, colour theory, and spacing",
          "Grid systems and layout composition",
          "Iconography and illustration basics",
          "Gestalt principles in UI design",
        ],
      },
      {
        title: "Module 4 — High-Fidelity Design and Prototyping",
        topics: [
          "Component-based design in Figma",
          "Auto layout and responsive frames",
          "Interactive prototyping with smart animations",
          "Micro-interaction design",
        ],
      },
      {
        title: "Module 5 — Design Systems",
        topics: [
          "Atomic design methodology",
          "Building a component library in Figma",
          "Design tokens and theming",
          "Documentation for developer handoff",
        ],
      },
      {
        title: "Module 6 — Usability Testing and Accessibility",
        topics: [
          "Moderated and unmoderated usability testing",
          "WCAG accessibility guidelines",
          "Colour contrast and screen reader compatibility",
          "Iterating designs based on test findings",
        ],
      },
    ],
    projects: [
      "End-to-end mobile app redesign with research and testing",
      "Design system for a SaaS web application",
      "Accessibility audit and improvement of an existing product",
    ],
    learningOutcomes: [
      "Conduct user research and synthesise findings into design decisions",
      "Create high-fidelity, interactive prototypes in Figma",
      "Build and document scalable design systems",
      "Test designs with real users and iterate based on feedback",
    ],
    priceInCents: null,
    originalPriceInCents: null,
  },

  // ─────────────────────────────────────────────
  // 7. Digital Marketing
  // ─────────────────────────────────────────────
  {
    id: "course-digital-marketing",
    slug: "digital-marketing",
    title: "Digital Marketing",
    shortDescription:
      "Drive exponential digital growth — master search engine optimization (SEO), performance marketing, automated email funnels, and data analytics.",
    overview:
      "Digital Marketing trains you in the tools and strategies used to grow businesses online. You will learn search engine optimisation, pay-per-click advertising, social media management, email campaigns, and web analytics. The course includes hands-on work with Google Analytics 4, Google Ads, Meta Ads Manager, and HubSpot.",
    durationMonths: 3,
    durationLabel: "3 Months",
    modes: ["Online", "Offline"],
    category: "Digital Marketing",
    difficulty: "beginner",
    technologies: [
      "Google Analytics 4", "Google Search Console", "Google Ads",
      "Meta Ads Manager", "HubSpot (CRM and email)",
      "Semrush / Ahrefs (SEO)", "Canva (creatives)",
      "Mailchimp", "WordPress basics", "Hootsuite",
    ],
    skills: [
      "SEO: on-page, off-page, and technical",
      "Paid search and social advertising",
      "Social media content planning and scheduling",
      "Email marketing and automation",
      "Web analytics and conversion tracking",
      "Content strategy and copywriting",
    ],
    modules: [
      {
        title: "Module 1 — Digital Marketing Foundations",
        topics: [
          "Overview of digital marketing channels",
          "Understanding the buyer journey",
          "Setting SMART marketing goals",
          "Introduction to Google Analytics 4",
        ],
      },
      {
        title: "Module 2 — Search Engine Optimisation (SEO)",
        topics: [
          "Keyword research and search intent",
          "On-page optimisation: titles, meta, content",
          "Technical SEO: site speed, crawlability, schema",
          "Link building strategies",
        ],
      },
      {
        title: "Module 3 — Paid Advertising (PPC)",
        topics: [
          "Google Ads campaign structure and bidding",
          "Search, display, and shopping ads",
          "Meta Ads: audience targeting and creative",
          "Budget management and ROAS optimisation",
        ],
      },
      {
        title: "Module 4 — Social Media Marketing",
        topics: [
          "Platform-specific strategies: Instagram, LinkedIn, YouTube",
          "Content calendar planning",
          "Community management and engagement",
          "Social media analytics and reporting",
        ],
      },
      {
        title: "Module 5 — Email Marketing and CRM",
        topics: [
          "Email list building and segmentation",
          "Campaign design and copywriting",
          "Automation workflows with HubSpot",
          "A/B testing and deliverability",
        ],
      },
      {
        title: "Module 6 — Analytics and Growth",
        topics: [
          "GA4 events, goals, and funnel analysis",
          "Conversion rate optimisation (CRO)",
          "Reporting dashboards and client presentations",
          "Marketing attribution models",
        ],
      },
    ],
    projects: [
      "Full SEO audit and content plan for a business website",
      "Google Ads campaign setup and optimisation report",
      "Social media content strategy and 30-day calendar",
    ],
    learningOutcomes: [
      "Plan and execute multi-channel digital marketing campaigns",
      "Optimise websites for search engine visibility",
      "Manage and analyse paid advertising across Google and Meta",
      "Track marketing performance and produce data-driven reports",
    ],
    priceInCents: null,
    originalPriceInCents: null,
  },

  // ─────────────────────────────────────────────
  // 8. Data Analytics with Power BI
  // ─────────────────────────────────────────────
  {
    id: "course-powerbi",
    slug: "data-analytics-with-power-bi",
    title: "Data Analytics with Power BI",
    shortDescription:
      "Translate raw corporate metrics into executive dashboards — master advanced DAX, Power Query pipelines, and real-time business intelligence.",
    overview:
      "This course teaches you to use Power BI to connect, clean, model, and visualise data from multiple sources. You will learn Power Query for data transformation, DAX for calculated measures, and report design best practices. By the end you will be able to deliver professional, interactive dashboards to stakeholders and organisations.",
    durationMonths: 3,
    durationLabel: "3 Months",
    modes: ["Online", "Offline"],
    category: "Data Analytics",
    difficulty: "beginner",
    technologies: [
      "Microsoft Power BI Desktop", "Power BI Service",
      "Power Query (M language)", "DAX (Data Analysis Expressions)",
      "Microsoft Excel", "SQL Server / PostgreSQL",
      "OneDrive / SharePoint (data sources)",
      "Power BI Embedded (overview)",
    ],
    skills: [
      "Connecting and importing data from multiple sources",
      "Data cleaning and transformation with Power Query",
      "Data modelling: relationships, star schema",
      "DAX measures, calculated columns, and time intelligence",
      "Report and dashboard design in Power BI",
      "Publishing, sharing, and scheduling refreshes",
    ],
    modules: [
      {
        title: "Module 1 — Power BI Fundamentals",
        topics: [
          "Power BI ecosystem: Desktop, Service, Mobile",
          "Connecting to Excel, CSV, and databases",
          "Introduction to the Power BI interface",
          "Creating your first report",
        ],
      },
      {
        title: "Module 2 — Power Query and Data Transformation",
        topics: [
          "Applied steps and M language basics",
          "Data type handling and column transformations",
          "Merging and appending queries",
          "Dealing with errors, nulls, and duplicates",
        ],
      },
      {
        title: "Module 3 — Data Modelling",
        topics: [
          "Star schema and snowflake schema",
          "Relationships: one-to-many and many-to-many",
          "Filter context and row context",
          "Date table and time intelligence setup",
        ],
      },
      {
        title: "Module 4 — DAX Essentials",
        topics: [
          "Measures vs calculated columns",
          "Core DAX functions: SUM, CALCULATE, FILTER, ALL",
          "Time intelligence: YTD, QTD, prior period comparison",
          "Ranking, top-N, and conditional calculations",
        ],
      },
      {
        title: "Module 5 — Report and Dashboard Design",
        topics: [
          "Chart selection and visual best practices",
          "Slicers, drill-through, and bookmarks",
          "Custom themes and colour accessibility",
          "Mobile-optimised report layouts",
        ],
      },
      {
        title: "Module 6 — Publishing and Advanced Features",
        topics: [
          "Publishing to Power BI Service",
          "Row-level security (RLS) setup",
          "Scheduled data refresh and gateways",
          "Power BI Embedded overview",
        ],
      },
    ],
    projects: [
      "Sales performance dashboard with time intelligence metrics",
      "HR analytics report tracking headcount and attrition",
      "Financial summary dashboard from multi-source data",
    ],
    learningOutcomes: [
      "Connect, clean, and model data for analysis in Power BI",
      "Write DAX measures including time intelligence calculations",
      "Design professional, interactive dashboards for business users",
      "Publish reports with row-level security and scheduled refresh",
    ],
    priceInCents: null,
    originalPriceInCents: null,
  },
];

/** Lookup by slug */
export function getCourseBySlug(slug: string): AnzeylCourse | undefined {
  return ANZEYL_COURSES.find((c) => c.slug === slug);
}

/** All unique categories */
export const COURSE_CATEGORIES = ["All", ...Array.from(new Set(ANZEYL_COURSES.map((c) => c.category)))];

/**
 * Map a learning goal or student domain to its matching ANZEYL course slug.
 */
export function goalToCourseSlug(goal?: string | null): string {
  if (!goal) return "full-stack-development";
  const g = goal.toLowerCase();
  if (g.includes("cyber") || g.includes("security")) return "cyber-security";
  if (g.includes("ai") || g.includes("machine") || g.includes("ml")) return "ai-and-machine-learning";
  if (g.includes("power") || g.includes("bi")) return "data-analytics-with-power-bi";
  if (g.includes("data") && (g.includes("science") || g.includes("analytics"))) return "data-science-and-analytics";
  if (g.includes("cloud") || g.includes("devops") || g.includes("aws")) return "cloud-and-devops";
  if (g.includes("ui") || g.includes("ux") || g.includes("design")) return "ui-ux-design";
  if (g.includes("marketing") || g.includes("digital")) return "digital-marketing";
  return "full-stack-development";
}

