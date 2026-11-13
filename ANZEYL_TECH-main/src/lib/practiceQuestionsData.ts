/**
 * ANZEYL Practice Questions & Question Bank
 * Covers all 9 ANZEYL courses with topic-wise questions, difficulty levels,
 * answer choices, and detailed explanations.
 */

export interface PracticeQuestion {
  id: string;
  courseSlug: string;
  courseTitle: string;
  topic: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  questionType: "single_choice" | "multiple_choice" | "true_false" | "scenario" | "coding";
  prompt: string;
  codeSnippet?: string;
  options: string[];
  correctIndices: number[]; // 0-indexed indices of correct options
  explanation: string;
  published: boolean;
}

export const PRACTICE_TOPICS_BY_COURSE: Record<string, string[]> = {
  "full-stack-development": [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Next.js",
    "Node.js",
    "Express",
    "MongoDB",
    "REST APIs",
  ],
  "ai-and-machine-learning": [
    "Python",
    "Statistics",
    "Data Preprocessing",
    "Supervised Learning",
    "Unsupervised Learning",
    "Model Evaluation",
    "Neural Networks",
  ],
  "data-science-and-analytics": [
    "Python",
    "NumPy",
    "Pandas",
    "Statistics",
    "Data Visualization",
    "SQL",
    "Data Analysis",
  ],
  "cyber-security": [
    "Networking",
    "Linux",
    "Security Fundamentals",
    "Cryptography",
    "Web Security",
    "Vulnerability Assessment",
  ],
  "cloud-and-devops": [
    "Cloud Fundamentals",
    "AWS",
    "Git",
    "Docker",
    "CI/CD",
    "Linux",
    "Deployment",
  ],
  "ui-ux-design": [
    "Design Fundamentals",
    "User Research",
    "Wireframing",
    "Prototyping",
    "Figma",
    "Usability Testing",
  ],
  "digital-marketing": [
    "SEO",
    "SEM",
    "Social Media Marketing",
    "Content Marketing",
    "Email Marketing",
    "Analytics",
  ],
  "data-analytics-with-power-bi": [
    "Excel",
    "SQL",
    "Data Cleaning",
    "Power Query",
    "Data Modelling",
    "DAX",
    "Power BI Dashboards",
  ],
};

export const INITIAL_PRACTICE_QUESTIONS: PracticeQuestion[] = [
  // 1. Full Stack Development
  {
    id: "fs-1",
    courseSlug: "full-stack-development",
    courseTitle: "Full Stack Development",
    topic: "React",
    difficulty: "intermediate",
    questionType: "single_choice",
    prompt: "In React 18 and 19, what is the primary purpose of the useMemo hook?",
    options: [
      "To execute side-effects after every render",
      "To cache the result of a computationally expensive calculation between re-renders",
      "To directly mutate the DOM without triggering a re-render",
      "To create global state shared across asynchronous boundaries",
    ],
    correctIndices: [1],
    explanation:
      "useMemo caches the result of a calculation between renders unless one of its specified dependencies changes.",
    published: true,
  },
  {
    id: "fs-2",
    courseSlug: "full-stack-development",
    courseTitle: "Full Stack Development",
    topic: "JavaScript",
    difficulty: "beginner",
    questionType: "true_false",
    prompt: "In JavaScript, variables declared with 'const' are immutable, meaning their object properties cannot be modified.",
    options: ["True", "False"],
    correctIndices: [1],
    explanation:
      "'const' prevents re-assigning the variable binding itself, but object properties or array elements can still be mutated.",
    published: true,
  },
  {
    id: "fs-3",
    courseSlug: "full-stack-development",
    courseTitle: "Full Stack Development",
    topic: "Next.js",
    difficulty: "advanced",
    questionType: "scenario",
    prompt: "You are building a high-traffic e-commerce product page in Next.js App Router. You need the product details to be cached globally on the edge, while the inventory count must remain real-time. Which approach is recommended?",
    options: [
      "Mark the entire page with 'use client' and query the database directly from browser useEffect",
      "Use Partial Prerendering (PPR) or wrap the dynamic inventory section inside a React Suspense boundary with dynamic fetching",
      "Disable caching globally across all routes in next.config.js",
      "Render everything on the client with polling intervals of 100ms",
    ],
    correctIndices: [1],
    explanation:
      "Wrapping dynamic sections in <Suspense> allows Next.js to prerender the static product shell while streaming fresh dynamic inventory data without delaying the initial TTFB.",
    published: true,
  },
  {
    id: "fs-4",
    courseSlug: "full-stack-development",
    courseTitle: "Full Stack Development",
    topic: "REST APIs",
    difficulty: "intermediate",
    questionType: "single_choice",
    prompt: "Which HTTP status code should a RESTful server return when a client attempts to access a protected resource without supplying valid credentials?",
    options: [
      "400 Bad Request",
      "401 Unauthorized",
      "403 Forbidden",
      "404 Not Found",
    ],
    correctIndices: [1],
    explanation:
      "HTTP 401 Unauthorized indicates that the request lacks valid authentication credentials. HTTP 403 indicates authentication was provided but insufficient permissions exist.",
    published: true,
  },

  // 2. Java Full Stack Development
  {
    id: "jfs-1",
    courseSlug: "java-full-stack-development",
    courseTitle: "Java Full Stack Development",
    topic: "Core Java",
    difficulty: "beginner",
    questionType: "single_choice",
    prompt: "Which Java collection interface maintains unique elements and guarantees elements are sorted in ascending order?",
    options: ["List", "HashSet", "TreeSet", "LinkedList"],
    correctIndices: [2],
    explanation:
      "TreeSet implements the NavigableSet interface and stores unique elements in ascending sorted order using a Red-Black tree structure.",
    published: true,
  },
  {
    id: "jfs-2",
    courseSlug: "java-full-stack-development",
    courseTitle: "Java Full Stack Development",
    topic: "Spring Boot",
    difficulty: "intermediate",
    questionType: "single_choice",
    prompt: "In Spring Boot, which annotation is a combination of @Controller and @ResponseBody?",
    options: [
      "@Service",
      "@RestController",
      "@Repository",
      "@Component",
    ],
    correctIndices: [1],
    explanation:
      "@RestController is a convenience annotation that combines @Controller and @ResponseBody, serializing return values directly to JSON or XML response bodies.",
    published: true,
  },
  {
    id: "jfs-3",
    courseSlug: "java-full-stack-development",
    courseTitle: "Java Full Stack Development",
    topic: "OOP",
    difficulty: "intermediate",
    questionType: "scenario",
    prompt: "A banking system requires an Account class where balance can only be updated through verified deposit and withdraw methods. Which OOP principle is being applied?",
    options: ["Polymorphism", "Encapsulation", "Multiple Inheritance", "Reflection"],
    correctIndices: [1],
    explanation:
      "Encapsulation hides internal object state (private fields) and requires all interactions to occur through public methods with validation logic.",
    published: true,
  },

  // 3. AI & Machine Learning
  {
    id: "aiml-1",
    courseSlug: "ai-and-machine-learning",
    courseTitle: "AI & Machine Learning",
    topic: "Supervised Learning",
    difficulty: "beginner",
    questionType: "single_choice",
    prompt: "What distinguishes Supervised Learning from Unsupervised Learning?",
    options: [
      "Supervised learning requires labeled training data with ground-truth targets",
      "Supervised learning does not use algorithms",
      "Unsupervised learning only works on numerical data",
      "Supervised learning cannot be used for classification",
    ],
    correctIndices: [0],
    explanation:
      "Supervised learning models learn a mapping function from input features to known labeled targets.",
    published: true,
  },
  {
    id: "aiml-2",
    courseSlug: "ai-and-machine-learning",
    courseTitle: "AI & Machine Learning",
    topic: "Model Evaluation",
    difficulty: "intermediate",
    questionType: "single_choice",
    prompt: "In medical disease detection where missing a sick patient has severe consequences, which metric should be prioritized?",
    options: ["Accuracy", "Recall (Sensitivity)", "Precision", "L2 Loss"],
    correctIndices: [1],
    explanation:
      "Recall measures True Positives / (True Positives + False Negatives). High recall minimizes false negatives (missed sick patients).",
    published: true,
  },
  {
    id: "aiml-3",
    courseSlug: "ai-and-machine-learning",
    courseTitle: "AI & Machine Learning",
    topic: "Neural Networks",
    difficulty: "advanced",
    questionType: "single_choice",
    prompt: "What mathematical problem in deep neural networks does the ReLU activation function primarily help mitigate compared to Sigmoid?",
    options: [
      "Exploding memory allocation",
      "Vanishing gradient problem",
      "Loss of convexity",
      "Underfitting on linear datasets",
    ],
    correctIndices: [1],
    explanation:
      "ReLU has a constant derivative of 1 for positive inputs, preventing gradients from shrinking exponentially during backpropagation in deep networks.",
    published: true,
  },

  // 4. Data Science & Analytics
  {
    id: "dsa-1",
    courseSlug: "data-science-and-analytics",
    courseTitle: "Data Science & Analytics",
    topic: "Pandas",
    difficulty: "beginner",
    questionType: "coding",
    prompt: "In Pandas, which method is used to remove rows containing any null (NaN) values from a DataFrame named 'df'?",
    codeSnippet: "# Complete the operation\nclean_df = df.______",
    options: [
      "df.dropna()",
      "df.remove_empty()",
      "df.filter_nulls()",
      "df.clear_na()",
    ],
    correctIndices: [0],
    explanation:
      "DataFrame.dropna() drops rows (or columns with axis=1) that contain missing or NaN values.",
    published: true,
  },
  {
    id: "dsa-2",
    courseSlug: "data-science-and-analytics",
    courseTitle: "Data Science & Analytics",
    topic: "SQL",
    difficulty: "intermediate",
    questionType: "single_choice",
    prompt: "Which SQL clause is used to filter records AFTER an aggregation with GROUP BY has been computed?",
    options: ["WHERE", "HAVING", "FILTER", "LIMIT"],
    correctIndices: [1],
    explanation:
      "WHERE filters rows before aggregation. HAVING filters grouped rows after aggregate functions (like SUM, COUNT, AVG) are evaluated.",
    published: true,
  },

  // 5. Cyber Security
  {
    id: "cs-1",
    courseSlug: "cyber-security",
    courseTitle: "Cyber Security",
    topic: "Cryptography",
    difficulty: "intermediate",
    questionType: "single_choice",
    prompt: "Which statement correctly describes Asymmetric Encryption?",
    options: [
      "It uses the same secret key to encrypt and decrypt data",
      "It uses a mathematically related key pair: a public key for encryption and a private key for decryption",
      "It is only used for hashing passwords",
      "It cannot be used over the public Internet",
    ],
    correctIndices: [1],
    explanation:
      "Asymmetric cryptography (e.g. RSA, ECC) relies on a public key distributed openly and a private key kept strictly confidential.",
    published: true,
  },
  {
    id: "cs-2",
    courseSlug: "cyber-security",
    courseTitle: "Cyber Security",
    topic: "Web Security",
    difficulty: "beginner",
    questionType: "single_choice",
    prompt: "What is the primary defence against SQL Injection vulnerabilities in web applications?",
    options: [
      "Filtering out single quotes on the client side",
      "Using Parameterized Queries (Prepared Statements) with an ORM or database driver",
      "Increasing the database server's firewall timeout",
      "Encrypting the database connection string with Base64",
    ],
    correctIndices: [1],
    explanation:
      "Parameterized queries treat user input strictly as parameters/data rather than executable SQL code, neutralizing SQL injection.",
    published: true,
  },

  // 6. Cloud & DevOps
  {
    id: "cdo-1",
    courseSlug: "cloud-and-devops",
    courseTitle: "Cloud & DevOps",
    topic: "Docker",
    difficulty: "beginner",
    questionType: "single_choice",
    prompt: "In Docker, what is the key difference between an Image and a Container?",
    options: [
      "An image is a running process; a container is a static configuration file",
      "An image is a read-only template containing application code and runtime; a container is a running instance of an image",
      "Containers only run on Linux; images only run on Windows",
      "There is no difference between images and containers",
    ],
    correctIndices: [1],
    explanation:
      "A Docker Image is an immutable build snapshot. A Container is an isolated, writable running instance created from that image.",
    published: true,
  },
  {
    id: "cdo-2",
    courseSlug: "cloud-and-devops",
    courseTitle: "Cloud & DevOps",
    topic: "CI/CD",
    difficulty: "intermediate",
    questionType: "single_choice",
    prompt: "What does the 'CD' in CI/CD represent in modern DevOps pipelines?",
    options: [
      "Continuous Documentation & Continuous Debugging",
      "Continuous Delivery or Continuous Deployment",
      "Centralized Database & Container Division",
      "Client Distribution & Cache Diagnostics",
    ],
    correctIndices: [1],
    explanation:
      "CI/CD refers to Continuous Integration and Continuous Delivery (manual gate to production) or Continuous Deployment (automatic production rollout).",
    published: true,
  },

  // 7. UI/UX Design
  {
    id: "uiux-1",
    courseSlug: "ui-ux-design",
    courseTitle: "UI/UX Design",
    topic: "Design Fundamentals",
    difficulty: "beginner",
    questionType: "single_choice",
    prompt: "According to WCAG 2.1 AA accessibility guidelines, what is the minimum contrast ratio required for normal body text against its background?",
    options: ["2.0:1", "3.0:1", "4.5:1", "7.0:1"],
    correctIndices: [2],
    explanation:
      "WCAG 2.1 Level AA requires a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text (18pt+ or 14pt bold).",
    published: true,
  },
  {
    id: "uiux-2",
    courseSlug: "ui-ux-design",
    courseTitle: "UI/UX Design",
    topic: "Figma",
    difficulty: "intermediate",
    questionType: "single_choice",
    prompt: "In Figma, which feature allows components and frames to automatically adapt their size and spacing based on internal content?",
    options: ["Vector Networks", "Auto Layout", "Smart Animate", "Boolean Groups"],
    correctIndices: [1],
    explanation:
      "Auto Layout allows frames to behave like flexbox containers, dynamically adjusting padding, direction, and gaps as content changes.",
    published: true,
  },

  // 8. Digital Marketing
  {
    id: "dm-1",
    courseSlug: "digital-marketing",
    courseTitle: "Digital Marketing",
    topic: "SEO",
    difficulty: "beginner",
    questionType: "single_choice",
    prompt: "What is the purpose of the 'canonical' link tag in website HTML for search engines?",
    options: [
      "To accelerate page loading speed using CDN prefetching",
      "To tell search engines which URL represents the master/original copy to prevent duplicate content penalties",
      "To prevent search engines from indexing the page completely",
      "To force all traffic over HTTPS",
    ],
    correctIndices: [1],
    explanation:
      "The canonical tag (rel='canonical') informs search crawlers which version of a URL is preferred when identical or similar content exists on multiple URLs.",
    published: true,
  },

  // 9. Data Analytics with Power BI
  {
    id: "pbi-1",
    courseSlug: "data-analytics-with-power-bi",
    courseTitle: "Data Analytics with Power BI",
    topic: "DAX",
    difficulty: "intermediate",
    questionType: "single_choice",
    prompt: "Which DAX function is the most fundamental in Power BI for modifying filter context in calculations?",
    options: ["SUM()", "CALCULATE()", "FILTER()", "LOOKUPVALUE()"],
    correctIndices: [1],
    explanation:
      "CALCULATE evaluates an expression in a modified filter context and is the core function for custom business metrics in DAX.",
    published: true,
  },
  {
    id: "pbi-2",
    courseSlug: "data-analytics-with-power-bi",
    courseTitle: "Data Analytics with Power BI",
    topic: "Power Query",
    difficulty: "beginner",
    questionType: "single_choice",
    prompt: "In Power BI, which engine and functional programming language powers data transformation inside Power Query?",
    options: ["Python 3", "M Language (Mashup)", "JavaScript", "Transact-SQL"],
    correctIndices: [1],
    explanation:
      "Power Query transformations are executed using the M formula language, which records transformation steps sequentially.",
    published: true,
  },
];

