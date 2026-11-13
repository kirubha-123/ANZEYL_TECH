"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  SparklesIcon,
  ClockIcon,
  ChevronRightIcon,
  ArrowRightIcon,
  AwardIcon,
} from "@/components/Icons";

interface Question {
  id: number;
  question: string;
  codeSnippet?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const QUIZ_DATA: Record<string, { title: string; courseTitle: string; durationMins: number; questions: Question[] }> = {
  "react-mastery": {
    title: "React 19, Next.js 16 & Full-Stack Node.js Architecture",
    courseTitle: "Full Stack Development",
    durationMins: 25,
    questions: [
      {
        id: 1,
        question: "When using Server Actions in Next.js 16 App Router, where is the server action executed?",
        options: [
          "In the client browser via WebAssembly",
          "Exclusively on the server / edge runtime with direct access to backend resources",
          "In a background service worker thread on the client machine",
          "During static compilation only; it cannot run dynamically",
        ],
        correctIndex: 1,
        explanation: "Server Actions are asynchronous functions executed exclusively on the server or edge runtime. They compile into internal POST endpoints and have direct access to database clients, secrets, and private environment variables.",
      },
      {
        id: 2,
        question: "How does the React 19 Compiler change how developers optimize component re-renders?",
        codeSnippet: `// React 19 component
export function UserList({ users, filterQuery }) {
  const filtered = users.filter(u => u.name.includes(filterQuery));
  return <ul>{filtered.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}`,
        options: [
          "Developers must still manually wrap all array operations in useMemo",
          "The compiler parses the AST and automatically inserts fine-grained memoization instructions, removing the need for manual useMemo",
          "The compiler forces all components to become class components",
          "The compiler disables all re-renders completely",
        ],
        correctIndex: 1,
        explanation: "The React 19 compiler automatically detects dependencies and injects memoization at the syntax tree level, allowing developers to write idiomatic JavaScript without manually managing dependency arrays in useMemo and useCallback.",
      },
      {
        id: 3,
        question: "In PostgreSQL with Supabase Row Level Security (RLS) enabled, what is required for an authenticated user to read rows?",
        codeSnippet: `ALTER TABLE projects ENABLE ROW LEVEL SECURITY;`,
        options: [
          "RLS automatically permits all reads by default",
          "An explicit CREATE POLICY FOR SELECT must be defined that evaluates to TRUE for the user's auth.uid()",
          "The user must send their secret service_role key from the browser",
          "Supabase tables cannot be read once RLS is turned on",
        ],
        correctIndex: 1,
        explanation: "PostgreSQL RLS operates on a strict default-deny model. When enabled, zero rows are accessible until a policy (such as `CREATE POLICY \"Allow read\" ON projects FOR SELECT USING (auth.uid() = user_id);`) is declared.",
      },
      {
        id: 4,
        question: "What is the primary benefit of Partial Prerendering (PPR) in Next.js 16?",
        options: [
          "It serves a fast static shell from edge cache while streaming dynamic holes inside <Suspense> boundaries over the same HTTP stream",
          "It replaces all client components with static images",
          "It eliminates the need for CSS",
          "It turns client state into browser cookies automatically",
        ],
        correctIndex: 0,
        explanation: "PPR merges the instant TTFB benefits of static pre-rendering with dynamic server streaming, allowing static layout shells to be served instantly from global CDNs while dynamic user data streams concurrently.",
      },
      {
        id: 5,
        question: "Why should you never expose NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY in your Next.js application?",
        options: [
          "It makes the page render slower",
          "The NEXT_PUBLIC prefix bundles the key into client browser JavaScript, allowing malicious users to bypass all RLS policies and drop tables",
          "Supabase does not support service role keys",
          "The key only works in local development and fails in production",
        ],
        correctIndex: 1,
        explanation: "The service_role key has unrestricted superuser privileges and bypasses all Row Level Security. Any variable with `NEXT_PUBLIC_` is baked into the browser bundle and accessible to anyone via DevTools.",
      },
    ],
  },
  "java-microservices": {
    title: "Java 21 Enterprise & Spring Boot 3 Microservices",
    courseTitle: "Java Full Stack Development",
    durationMins: 25,
    questions: [
      {
        id: 1,
        question: "How do Java 21 Virtual Threads (Project Loom) differ from traditional platform threads in Spring Boot 3?",
        options: [
          "Virtual threads run on the GPU rather than the CPU",
          "Virtual threads are lightweight, managed by the JVM rather than the OS, allowing millions of concurrent socket requests without thread pool exhaustion",
          "Virtual threads require writing asynchronous callback code",
          "Virtual threads cannot execute database operations",
        ],
        correctIndex: 1,
        explanation: "Virtual threads decouple Java tasks from 1:1 OS kernel threads. The JVM handles thread scheduling and parking during blocking I/O, allowing developers to write synchronous, readable code that scales to hundreds of thousands of concurrent connections.",
      },
      {
        id: 2,
        question: "In Spring Data JPA, how do you prevent the notorious N+1 query problem when fetching parent entities with lazily-loaded children?",
        codeSnippet: `@Entity
public class Course {
    @OneToMany(fetch = FetchType.LAZY)
    private List<Module> modules;
}`,
        options: [
          "Change the fetch type to FetchType.EAGER everywhere",
          "Use a JPQL query with 'JOIN FETCH c.modules' or apply @EntityGraph on the repository method",
          "Disable Hibernate second-level cache",
          "Run a separate SQL query inside a for loop",
        ],
        correctIndex: 1,
        explanation: "Using `JOIN FETCH` or `@EntityGraph` forces Hibernate to retrieve the parent and its associated children in a single SQL query, eliminating the N additional queries triggered when traversing lazy relationships.",
      },
      {
        id: 3,
        question: "What is the purpose of Spring Boot 3's @RestControllerAdvice annotation?",
        options: [
          "To provide global exception handling and formatted JSON error responses across all @RestController classes",
          "To speed up database migrations at boot time",
          "To enforce OAuth2 token encryption",
          "To automatically generate HTML views",
        ],
        correctIndex: 0,
        explanation: "@RestControllerAdvice combines @ControllerAdvice and @ResponseBody to intercept exceptions thrown by controllers globally, allowing centralized RFC 7807 Problem Detail responses.",
      },
      {
        id: 4,
        question: "In modern Java 21, what is the main benefit of Sealed Classes?",
        codeSnippet: `public sealed interface PaymentMethod permits CreditCard, UpiPayment, BankTransfer {}`,
        options: [
          "They prevent variables from being garbage collected",
          "They restrict which other classes or interfaces may extend or implement them, enabling exhaustive compiler pattern matching",
          "They automatically encrypt class bytecode in memory",
          "They convert Java code into C++ binaries",
        ],
        correctIndex: 1,
        explanation: "Sealed classes restrict subtyping to an explicitly defined set of classes, which allows switch expressions to achieve complete exhaustiveness without requiring a default clause.",
      },
      {
        id: 5,
        question: "In Spring Security 6, how should stateless REST microservices authenticate requests?",
        options: [
          "Store user passwords in server-side HTTP sessions",
          "Use JWT (JSON Web Tokens) with a Bearer authentication filter and configure SecurityFilterChain with SessionCreationPolicy.STATELESS",
          "Disable all CORS and CSRF filters globally without replacement",
          "Send credentials as plain text query parameters in GET requests",
        ],
        correctIndex: 1,
        explanation: "Stateless APIs should validate cryptographically signed JWT tokens on every incoming request, avoiding server-side session memory consumption and facilitating horizontal scaling.",
      },
    ],
  },
  "ai-agent-engineering": {
    title: "Autonomous LLM Agents, PyTorch & RAG Architectures",
    courseTitle: "AI & Machine Learning",
    durationMins: 30,
    questions: [
      {
        id: 1,
        question: "In a Retrieval-Augmented Generation (RAG) system, what role does a vector database play?",
        options: [
          "It compiles Python code into binary executables",
          "It indexes high-dimensional text embeddings to perform semantic cosine similarity searches and retrieve context relevant to the user query",
          "It fine-tunes LLM weights during every user request",
          "It replaces the need for an LLM entirely",
        ],
        correctIndex: 1,
        explanation: "Vector databases store mathematical representations (embeddings) of document chunks. When a user asks a question, the question is embedded and compared against stored vectors to retrieve the most semantically relevant grounding passages.",
      },
      {
        id: 2,
        question: "When building an Autonomous Agent with Tool Calling (Function Calling), what does the LLM actually output when it decides to call a tool?",
        options: [
          "It runs the Python code directly inside the model's neural weights",
          "A structured JSON object specifying the target function name and argument parameters, which the host environment executes",
          "An HTTP 200 header and binary stream",
          "A compiled machine learning model",
        ],
        correctIndex: 1,
        explanation: "LLMs do not directly execute external code. Instead, based on function schemas provided in the system prompt, they generate structured JSON payloads containing the function name and arguments for the host environment to execute.",
      },
      {
        id: 3,
        question: "In PyTorch, why is optimizer.zero_grad() called before loss.backward() in training loops?",
        codeSnippet: `optimizer.zero_grad()
loss = criterion(outputs, labels)
loss.backward()
optimizer.step()`,
        options: [
          "To reset the model's weights to random values",
          "Because PyTorch accumulates gradients on subsequent backward passes by default, so they must be zeroed to prevent gradient mixing across batches",
          "To release GPU memory occupied by the dataset",
          "To calculate the accuracy metric automatically",
        ],
        correctIndex: 1,
        explanation: "In PyTorch, gradients accumulate on every .backward() call. Calling zero_grad() clears accumulated gradients from the previous batch before calculating new gradients.",
      },
      {
        id: 4,
        question: "What is the primary difference between Fine-Tuning an LLM and applying RAG (Retrieval-Augmented Generation)?",
        options: [
          "Fine-Tuning is for retrieving live documents, while RAG modifies model weights",
          "RAG injects external, up-to-date factual documents into the prompt at runtime without weight updates; Fine-Tuning updates model weights to adapt tone, format, or specialized domain behavior",
          "Fine-Tuning is free while RAG requires billions of dollars of compute",
          "There is no difference; they are identical techniques",
        ],
        correctIndex: 1,
        explanation: "RAG gives an LLM access to real-time external knowledge via runtime context injection. Fine-tuning adjusts the model's internal weights to instill style, formatting, or specialized reasoning patterns.",
      },
      {
        id: 5,
        question: "Which metric is most appropriate for evaluating a classification model on an imbalanced dataset where detecting the minority class (e.g., fraud) is critical?",
        options: [
          "Raw Accuracy",
          "F1-Score / Precision-Recall AUC",
          "Mean Squared Error (MSE)",
          "R-Squared (R²)",
        ],
        correctIndex: 1,
        explanation: "On imbalanced datasets, raw accuracy can be deceptively high by always predicting the majority class. Precision, Recall, and the F1-Score (harmonic mean) measure true performance on the critical minority class.",
      },
    ],
  },
  "data-science-predictive": {
    title: "Python Data Science, Pandas & Predictive Modelling",
    courseTitle: "Data Science & Analytics",
    durationMins: 25,
    questions: [
      {
        id: 1,
        question: "In Pandas, what is the most memory-efficient and fastest way to compute a new column from two existing columns?",
        options: [
          "Use a Python for-loop with df.iterrows()",
          "Use vectorized operations: df['c'] = df['a'] + df['b']",
          "Use df.apply(lambda row: row['a'] + row['b'], axis=1)",
          "Convert each row to a string and use regex",
        ],
        correctIndex: 1,
        explanation: "Vectorized operations in Pandas and NumPy run in compiled C code at SIMD hardware speeds, avoiding the massive Python interpreter overhead of iterrows() or row-wise apply().",
      },
      {
        id: 2,
        question: "What is the primary purpose of K-Fold Cross-Validation in machine learning?",
        options: [
          "To speed up model training by dropping data",
          "To assess how well a model generalizes to unseen data and guard against overfitting to a single train/test split",
          "To automatically select hyperparameter alpha",
          "To convert continuous data into categorical bins",
        ],
        correctIndex: 1,
        explanation: "K-Fold splits the dataset into K subsets and trains/evaluates K times so that every observation is tested. This yields an unbiased estimate of generalization error.",
      },
      {
        id: 3,
        question: "In statistical hypothesis testing, what does a p-value less than 0.05 signify?",
        options: [
          "There is a 95% probability that the null hypothesis is true",
          "Assuming the null hypothesis is true, there is less than a 5% chance of observing data as extreme as measured, leading to rejection of the null hypothesis",
          "The dataset has 5% corrupted records",
          "The test has 5% margin of error",
        ],
        correctIndex: 1,
        explanation: "The p-value is the probability of obtaining test results at least as extreme as the actual observation, assuming the null hypothesis is true. A p-value < 0.05 is statistically significant.",
      },
      {
        id: 4,
        question: "Why should feature scaling (e.g. StandardScaler) be fit ONLY on training data, then transformed on test data?",
        options: [
          "To avoid data leakage from test data into the training pipeline",
          "Because scikit-learn does not support test data scaling",
          "Scaling test data has no effect on model predictions",
          "To save computational memory",
        ],
        correctIndex: 0,
        explanation: "Fitting scaler statistics (mean, variance) on test data leaks test information into training. The test set must remain completely unseen until inference.",
      },
      {
        id: 5,
        question: "Which Scikit-Learn ensemble model builds sequential decision trees where each new tree corrects the residual errors of preceding trees?",
        options: [
          "Random Forest",
          "Gradient Boosting (e.g. XGBoost / GradientBoostingClassifier)",
          "K-Means Clustering",
          "Principal Component Analysis (PCA)",
        ],
        correctIndex: 1,
        explanation: "Gradient Boosting trains trees iteratively, where each subsequent tree fits on the pseudo-residuals of the previous trees, optimizing a loss function via gradient descent.",
      },
    ],
  },
  "cybersecurity-analyst": {
    title: "Ethical Hacking, Network Defense & OWASP Top 10",
    courseTitle: "Cyber Security",
    durationMins: 25,
    questions: [
      {
        id: 1,
        question: "What is the most effective defensive technique against SQL Injection in web applications?",
        options: [
          "Filtering quotes and semicolons with client-side JavaScript regex",
          "Using Parameterized Queries (Prepared Statements) or an ORM that separates SQL command logic from data inputs",
          "Encoding database inputs in Base64",
          "Restricting web traffic to HTTPS port 443 only",
        ],
        correctIndex: 1,
        explanation: "Parameterized queries treat user input strictly as parameters rather than executable SQL code, making SQL injection impossible regardless of input content.",
      },
      {
        id: 2,
        question: "What is the primary difference between Symmetric and Asymmetric Encryption?",
        options: [
          "Symmetric encryption uses one shared secret key for both encryption and decryption; Asymmetric encryption uses a public-private key pair",
          "Symmetric is quantum-proof while asymmetric is broken",
          "Symmetric encryption is only used for passwords",
          "Asymmetric encryption can only encrypt single bytes",
        ],
        correctIndex: 0,
        explanation: "Symmetric algorithms (like AES-256) use the same key for encryption and decryption. Asymmetric algorithms (like RSA, ECC) use a public key to encrypt and a private key to decrypt.",
      },
      {
        id: 3,
        question: "In Wireshark network analysis, what does a high volume of TCP SYN packets sent without subsequent ACK packets indicate?",
        options: [
          "Normal DNS lookup resolution",
          "A SYN Flood Denial-of-Service (DoS) attack or an aggressive TCP SYN port scan (nmap -sS)",
          "A successful TLS handshake session",
          "An active FTP file download",
        ],
        correctIndex: 1,
        explanation: "A half-open SYN without ACK exhausts server backlog connection queues (SYN flood) or represents a stealth SYN scan used by penetration testers to detect open ports.",
      },
      {
        id: 4,
        question: "What security header prevents Clickjacking attacks by preventing web pages from being rendered inside an <iframe> on external domains?",
        options: [
          "X-Content-Type-Options: nosniff",
          "Content-Security-Policy with 'frame-ancestors' directive or X-Frame-Options: DENY / SAMEORIGIN",
          "Access-Control-Allow-Origin: *",
          "Strict-Transport-Security",
        ],
        correctIndex: 1,
        explanation: "Clickjacking embeds target pages into invisible frames. Setting `Content-Security-Policy: frame-ancestors 'self'` or `X-Frame-Options: SAMEORIGIN` instructs browsers to refuse framing by unauthorized domains.",
      },
      {
        id: 5,
        question: "In Linux system administration, which file contains the hashed passwords of local user accounts?",
        options: [
          "/etc/passwd",
          "/etc/shadow",
          "/var/log/auth.log",
          "/etc/security/limits.conf",
        ],
        correctIndex: 1,
        explanation: "While `/etc/passwd` lists user account names and IDs (world-readable), the actual salt and password hashes are stored securely in `/etc/shadow`, readable only by the root superuser.",
      },
    ],
  },
  "cloud-devops-cicd": {
    title: "AWS Cloud Infrastructure, Docker & Kubernetes CI/CD",
    courseTitle: "Cloud & DevOps",
    durationMins: 25,
    questions: [
      {
        id: 1,
        question: "In Dockerfile authoring, what is the primary benefit of Multi-Stage Builds?",
        options: [
          "They allow running Windows and Linux containers simultaneously",
          "They compile dependencies in an intermediate build container and copy only compiled artifacts into a lightweight runtime image, significantly reducing image size and attack surface",
          "They make Docker images execute faster on the CPU",
          "They remove the need for Docker Compose",
        ],
        correctIndex: 1,
        explanation: "Multi-stage builds leave compiler toolchains, headers, and package manager caches behind in builder stages, producing ultra-compact (e.g. distroless or alpine) production images.",
      },
      {
        id: 2,
        question: "In Kubernetes architecture, what is the role of a Deployment object?",
        options: [
          "It allocates physical hard drives in AWS data centers",
          "It provides declarative updates for Pods and ReplicaSets, handling rolling updates, self-healing, and scaling",
          "It routes external internet traffic directly to worker nodes",
          "It compiles container source code into Docker images",
        ],
        correctIndex: 1,
        explanation: "A Deployment declarative manifest instructs the Kubernetes Control Plane to maintain a specified number of replica Pods and perform zero-downtime rolling upgrades.",
      },
      {
        id: 3,
        question: "On AWS, what is the safest way for an EC2 instance to read objects from an S3 bucket?",
        options: [
          "Hardcode AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY into the application code",
          "Attach an IAM Instance Profile (Role) to the EC2 instance with an S3 policy, allowing AWS STS to automatically manage temporary credentials",
          "Make the S3 bucket public to the entire internet",
          "Save the secret key in a public GitHub repository",
        ],
        correctIndex: 1,
        explanation: "IAM roles provide temporary, automatically rotated security credentials via the instance metadata service, eliminating hardcoded long-lived credentials.",
      },
      {
        id: 4,
        question: "In CI/CD pipelines, what is the difference between Continuous Delivery and Continuous Deployment?",
        options: [
          "There is no difference; they are synonymous terms",
          "Continuous Delivery automates builds and tests up to a production-ready artifact that requires manual approval to deploy; Continuous Deployment automatically releases every passing commit to production",
          "Continuous Delivery is for mobile apps; Continuous Deployment is for web apps",
          "Continuous Delivery does not include automated testing",
        ],
        correctIndex: 1,
        explanation: "In Continuous Delivery, every passing build can be deployed to production, but the trigger requires manual sign-off. In Continuous Deployment, every passing build deploys automatically without human intervention.",
      },
      {
        id: 5,
        question: "Which infrastructure as code (IaC) command in Terraform shows planned changes before applying them?",
        options: [
          "terraform apply --force",
          "terraform plan",
          "terraform init -reconfigure",
          "terraform destroy",
        ],
        correctIndex: 1,
        explanation: "`terraform plan` performs a dry-run comparison between the declared configuration and the actual remote state, showing exact additions, updates, and destructions before execution.",
      },
    ],
  },
  "uiux-design-systems": {
    title: "UI/UX Design Systems, Figma & Usability Testing",
    courseTitle: "UI/UX Design",
    durationMins: 20,
    questions: [
      {
        id: 1,
        question: "In Figma, how do Design Tokens improve consistency between design and production code?",
        options: [
          "They convert Figma files directly into MP4 videos",
          "They provide named semantic variables (e.g. colors, typography, spacing) that sync design values directly with CSS variables or design system packages",
          "They limit Figma files to only 10 artboards",
          "They disable developer inspection mode",
        ],
        correctIndex: 1,
        explanation: "Design tokens serve as single sources of truth for visual decisions (colors, radii, spacing) that translate seamlessly into code tokens in Tailwind or CSS custom properties.",
      },
      {
        id: 2,
        question: "According to WCAG 2.1 Level AA guidelines, what is the minimum required color contrast ratio for normal body text against its background?",
        options: [
          "2:1",
          "4.5:1 (3:1 for large text)",
          "10:1",
          "Contrast ratio is not regulated by WCAG",
        ],
        correctIndex: 1,
        explanation: "WCAG AA requires a 4.5:1 contrast ratio for regular body text (< 18pt or < 14pt bold) to ensure readability for users with low vision or color deficiencies.",
      },
      {
        id: 3,
        question: "What is the primary objective of creating an Information Architecture (IA) sitemap during UX research?",
        options: [
          "To design the visual illustration style",
          "To organize, structure, and label content logically so users can navigate and find information intuitively",
          "To test backend database query speeds",
          "To choose brand fonts and photography",
        ],
        correctIndex: 1,
        explanation: "Information Architecture defines how content is categorized and linked, serving as the navigational blueprint before wireframes or visual design begins.",
      },
      {
        id: 4,
        question: "In usability testing, what is the 'Think Aloud Protocol'?",
        options: [
          "Instructing designers to talk while coding",
          "Asking test participants to verbalize their thoughts, expectations, and confusions continuously while completing tasks on a prototype",
          "Reading aloud the terms of service to users",
          "Recording screen clicks without audio",
        ],
        correctIndex: 1,
        explanation: "The think-aloud method reveals user mental models, friction points, and expectations in real time as they interact with the design.",
      },
      {
        id: 5,
        question: "In Figma Auto Layout, what does setting a child frame's width to 'Fill container' accomplish?",
        options: [
          "It forces the child frame to have a fixed width of 1000px",
          "The child element dynamically stretches or shrinks to occupy all available width within its parent frame, enabling responsive design",
          "It crops the contents of the child frame",
          "It turns the frame into a circular shape",
        ],
        correctIndex: 1,
        explanation: "'Fill container' makes elements responsive: when the parent container expands or resizes across viewport breakpoints, the child automatically adapts to fill available space.",
      },
    ],
  },
  "digital-marketing-growth": {
    title: "Performance Marketing, SEO & Conversion Funnel Strategy",
    courseTitle: "Digital Marketing",
    durationMins: 20,
    questions: [
      {
        id: 1,
        question: "In Search Engine Optimization (SEO), what is the purpose of a canonical URL tag (<link rel='canonical' href='...'>)?",
        options: [
          "To encrypt web pages with TLS",
          "To tell search engines which master URL represents the authoritative version of duplicate or near-duplicate pages, preventing duplicate content penalties",
          "To redirect mobile users to desktop pages",
          "To block Googlebot from indexing the page entirely",
        ],
        correctIndex: 1,
        explanation: "Canonical tags prevent duplicate content issues when products or articles can be reached via multiple parameter URLs (e.g., tracking tags, filters).",
      },
      {
        id: 2,
        question: "In Google Analytics 4 (GA4), how does data measurement differ from legacy Universal Analytics?",
        options: [
          "GA4 uses session-based pageviews, while Universal Analytics was serverless",
          "GA4 is built on an event-based data model where every user interaction (pageview, click, scroll, purchase) is tracked as an event with custom parameters",
          "GA4 only works on mobile apps and cannot track websites",
          "GA4 does not support conversion tracking",
        ],
        correctIndex: 1,
        explanation: "GA4 replaced session-oriented hits with an event-driven model, unifying web and app measurement with rich contextual event parameters.",
      },
      {
        id: 3,
        question: "What formula calculates Customer Acquisition Cost (CAC)?",
        options: [
          "Total Sales Revenue ÷ Total Ad Spend",
          "(Total Marketing & Sales Costs) ÷ (Number of New Customers Acquired)",
          "Average Order Value × Churn Rate",
          "Page Views ÷ Total Conversions",
        ],
        correctIndex: 1,
        explanation: "CAC is calculated by dividing all sales and marketing expenditures in a given period by the total number of new customers gained in that period.",
      },
      {
        id: 4,
        question: "In Paid Search (Google Ads), how is Quality Score determined?",
        options: [
          "By bidding the highest amount of money per click",
          "By Expected Click-Through Rate (CTR), Ad Relevance, and Landing Page Experience",
          "By company revenue and size",
          "By the number of social media followers the brand has",
        ],
        correctIndex: 1,
        explanation: "Google Quality Score is a 1-10 rating based on relevance: historical and expected CTR, keyword-to-ad relevance, and landing page speed/relevance.",
      },
      {
        id: 5,
        question: "What does A/B testing statistical significance mean in Conversion Rate Optimization (CRO)?",
        options: [
          "The test was completed in less than 24 hours",
          "A mathematical confidence level (typically 95%+) indicating that the observed difference in conversion between variant A and B is unlikely due to random chance",
          "Variant B had more traffic than variant A",
          "Both variations produced identical conversion numbers",
        ],
        correctIndex: 1,
        explanation: "Statistical significance (p < 0.05 / 95% confidence) ensures marketing decisions are based on genuine user preference rather than random statistical noise.",
      },
    ],
  },
  "power-bi-analytics": {
    title: "Power BI Business Intelligence, DAX & Data Modelling",
    courseTitle: "Data Analytics with Power BI",
    durationMins: 25,
    questions: [
      {
        id: 1,
        question: "In Power BI data modeling, why is a Star Schema strongly recommended over a flat single-table denormalized structure?",
        options: [
          "Star schemas take up more hard drive space",
          "Star schemas split data into centralized Fact tables (metrics) and surrounding Dimension tables (attributes), dramatically optimizing the VertiPaq engine's columnar compression and relationship filtering speed",
          "Star schemas eliminate the need for DAX",
          "Star schemas only work with Microsoft Excel files",
        ],
        correctIndex: 1,
        explanation: "The VertiPaq in-memory engine achieves optimal performance and memory compression with star schemas: small unique dimension tables filter large compressed fact tables efficiently.",
      },
      {
        id: 2,
        question: "In DAX (Data Analysis Expressions), what is the function of the CALCULATE function?",
        options: [
          "It performs simple arithmetic like addition and multiplication",
          "It evaluates an expression in a modified filter context, enabling complex dynamic metrics",
          "It connects Power BI to a SQL server",
          "It creates animated charts",
        ],
        correctIndex: 1,
        explanation: "CALCULATE is the cornerstone of DAX. It transitions row context into filter context and applies, removes, or modifies filter contexts on the underlying data model.",
      },
      {
        id: 3,
        question: "What is the primary difference between a Calculated Column and a Measure in Power BI?",
        options: [
          "A Calculated Column computes a static value stored in memory for each row during data refresh; a Measure is calculated dynamically on-the-fly based on report slicers and visual filter contexts",
          "Calculated columns are faster and use less RAM than measures",
          "Measures cannot be used in charts",
          "Calculated columns can only contain text",
        ],
        correctIndex: 0,
        explanation: "Calculated columns consume RAM and disk space by computing values per row at refresh. Measures consume zero storage; they evaluate dynamically using VertiPaq CPU multi-threading.",
      },
      {
        id: 4,
        question: "In Power Query Editor, which language is executed behind every transformation step?",
        options: [
          "Python",
          "M Code (Power Query Formula Language)",
          "JavaScript",
          "DAX",
        ],
        correctIndex: 1,
        explanation: "Power Query uses the M functional language for ETL pipelines, data extraction, transformation, type casting, and query folding.",
      },
      {
        id: 5,
        question: "How do you implement Row-Level Security (RLS) in Power BI to ensure regional managers see only their territory's sales?",
        options: [
          "Create duplicate reports for each manager and email them separately",
          "Define DAX filter rules on roles in Power BI Desktop (e.g. [Region] = USERPRINCIPALNAME()) and assign users to roles in the Power BI Service",
          "Hide the column in Power Query",
          "Set passwords on individual visualization tiles",
        ],
        correctIndex: 1,
        explanation: "RLS uses DAX filter expressions on security roles in Power BI Desktop, with identity mapping in Power BI Service to restrict dataset access per user.",
      },
    ],
  },
};

export default function QuizRunnerClient({ quizId }: { quizId: string }) {
  const quiz = QUIZ_DATA[quizId] || QUIZ_DATA["react-mastery"];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<number[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showInstantExplanation, setShowInstantExplanation] = useState(false);
  const [voucherClaimed, setVoucherClaimed] = useState(false);

  const currentQ = quiz.questions[currentIndex];

  const handleSelectOption = (optIdx: number) => {
    if (isSubmitted) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [currentIndex]: optIdx,
    });
  };

  const toggleFlag = () => {
    if (flaggedQuestions.includes(currentIndex)) {
      setFlaggedQuestions(flaggedQuestions.filter((q) => q !== currentIndex));
    } else {
      setFlaggedQuestions([...flaggedQuestions, currentIndex]);
    }
  };

  let correctCount = 0;
  quiz.questions.forEach((q, idx) => {
    if (selectedAnswers[idx] === q.correctIndex) {
      correctCount++;
    }
  });

  const scorePercentage = Math.round((correctCount / quiz.questions.length) * 100);
  const passed = scorePercentage >= 70;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#e5e7eb] pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#64748b]">
            <Link href="/portal" className="hover:text-[#176b87] transition-colors">
              Portal
            </Link>
            <ChevronRightIcon className="w-3.5 h-3.5" />
            <Link href="/portal/quizzes" className="hover:text-[#176b87] transition-colors">
              Mock Tests
            </Link>
            <ChevronRightIcon className="w-3.5 h-3.5" />
            <span className="text-[#176b87] font-bold">{quiz.courseTitle}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#17191D] mt-1">
            {quiz.title}
          </h1>
        </div>

        {!isSubmitted && (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 font-mono text-xs font-bold">
              <ClockIcon className="w-4 h-4 text-amber-700" />
              <span>{quiz.durationMins}:00 Test Timer</span>
            </div>
            <button
              onClick={() => setIsSubmitted(true)}
              className="px-4 py-2 rounded-xl bg-[#176b87] hover:bg-[#12566c] text-white font-extrabold text-xs transition-all shadow-xs"
            >
              Submit Quiz
            </button>
          </div>
        )}
      </div>

      {!isSubmitted ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl border border-[#e5e7eb] bg-white space-y-6 shadow-xs relative">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#176b87]/10 text-[#176b87] border border-[#176b87]/20">
                  Question {currentIndex + 1} of {quiz.questions.length}
                </span>

                <button
                  onClick={toggleFlag}
                  className={`text-xs font-semibold px-3 py-1 rounded-xl border transition-colors flex items-center gap-1.5 ${
                    flaggedQuestions.includes(currentIndex)
                      ? "bg-amber-50 border-amber-300 text-amber-800"
                      : "bg-[#f7f5ef] border-[#e5e7eb] text-[#64748b] hover:text-[#17191D]"
                  }`}
                >
                  <span>{flaggedQuestions.includes(currentIndex) ? "🚩 Flagged" : "Flag for Review"}</span>
                </button>
              </div>

              <div className="space-y-4">
                <h2 className="text-base sm:text-lg font-bold text-[#17191D] leading-relaxed">
                  {currentQ.question}
                </h2>

                {currentQ.codeSnippet && (
                  <div className="rounded-2xl bg-[#263746] p-4 font-mono text-xs text-emerald-300 border border-slate-700 overflow-x-auto">
                    <pre>{currentQ.codeSnippet}</pre>
                  </div>
                )}
              </div>

              {/* Options */}
              <div className="space-y-3 pt-2">
                {currentQ.options.map((option, optIdx) => {
                  const isSelected = selectedAnswers[currentIndex] === optIdx;
                  const letter = String.fromCharCode(65 + optIdx);

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(optIdx)}
                      className={`w-full text-left p-4 rounded-2xl border text-xs sm:text-sm font-medium transition-all flex items-start gap-3 cursor-pointer ${
                        isSelected
                          ? "bg-[#e5f2f5] border-2 border-[#176b87] text-[#176b87] font-semibold shadow-xs"
                          : "bg-[#f7f5ef] border-[#d6dde0] text-[#263746] hover:bg-[#eef4f0] hover:border-[#176b87]"
                      }`}
                    >
                      <span
                        className={`w-6 h-6 rounded-lg font-bold text-xs flex items-center justify-center shrink-0 border ${
                          isSelected
                            ? "bg-[#176b87] text-white border-[#12566c] font-black"
                            : "bg-white text-[#263746] border-[#d6dde0]"
                        }`}
                      >
                        {letter}
                      </span>
                      <span className="mt-0.5 leading-relaxed">{option}</span>
                    </button>
                  );
                })}
              </div>

              {/* Hint / Explanation Peek */}
              <div className="pt-2">
                <button
                  onClick={() => setShowInstantExplanation(!showInstantExplanation)}
                  className="text-xs text-[#176b87] font-semibold hover:underline flex items-center gap-1"
                >
                  <SparklesIcon className="w-3.5 h-3.5 text-[#176b87]" />
                  <span>{showInstantExplanation ? "Hide Rationale" : "Peek Concept & Rationale"}</span>
                </button>
                {showInstantExplanation && (
                  <div className="mt-3 p-4 rounded-2xl bg-[#fff9eb] border border-[#edd7a6] text-xs text-[#713f12] leading-relaxed">
                    <strong className="block text-[#854d0e] mb-1 font-bold">Architecture Concept:</strong>
                    {currentQ.explanation}
                  </div>
                )}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between pt-6 border-t border-[#e5e7eb]">
                <button
                  disabled={currentIndex === 0}
                  onClick={() => {
                    setCurrentIndex((prev) => Math.max(0, prev - 1));
                    setShowInstantExplanation(false);
                  }}
                  className="px-4 py-2 rounded-xl bg-white hover:bg-[#f7f5ef] text-[#263746] border border-[#d6dde0] disabled:opacity-30 disabled:pointer-events-none text-xs font-bold transition-colors"
                >
                  ← Previous
                </button>

                {currentIndex < quiz.questions.length - 1 ? (
                  <button
                    onClick={() => {
                      setCurrentIndex((prev) => Math.min(quiz.questions.length - 1, prev + 1));
                      setShowInstantExplanation(false);
                    }}
                    className="px-5 py-2 rounded-xl bg-[#176b87] hover:bg-[#12566c] text-white text-xs font-bold transition-all shadow-xs"
                  >
                    Next Question →
                  </button>
                ) : (
                  <button
                    onClick={() => setIsSubmitted(true)}
                    className="px-6 py-2.5 rounded-xl bg-[#176b87] hover:bg-[#12566c] text-white font-black text-xs transition-all shadow-xs"
                  >
                    Finish & View Score
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Question Palette Sidebar */}
          <div className="space-y-4">
            <div className="p-6 rounded-3xl border border-[#e5e7eb] bg-white space-y-4 shadow-xs">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#64748b]">
                Question Palette
              </h3>
              <div className="grid grid-cols-5 gap-2">
                {quiz.questions.map((q, idx) => {
                  const isAnswered = selectedAnswers[idx] !== undefined;
                  const isCurrent = idx === currentIndex;
                  const isFlagged = flaggedQuestions.includes(idx);

                  return (
                    <button
                      key={q.id}
                      onClick={() => {
                        setCurrentIndex(idx);
                        setShowInstantExplanation(false);
                      }}
                      className={`h-10 rounded-xl font-bold text-xs transition-all border flex items-center justify-center relative ${
                        isCurrent
                          ? "border-2 border-[#176b87] text-[#176b87] bg-[#e5f2f5] ring-2 ring-[#176b87]/30"
                          : isAnswered
                          ? "bg-emerald-50 border-emerald-400 text-emerald-800"
                          : "bg-[#f7f5ef] border-[#e5e7eb] text-[#263746] hover:bg-white"
                      }`}
                    >
                      {idx + 1}
                      {isFlagged && (
                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-500 rounded-full" />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="space-y-2 pt-2 border-t border-[#e5e7eb] text-[11px] text-[#64748b]">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-emerald-500" />
                  <span>Answered ({Object.keys(selectedAnswers).length})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-[#f7f5ef] border border-[#e5e7eb]" />
                  <span>Unanswered ({quiz.questions.length - Object.keys(selectedAnswers).length})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-amber-500" />
                  <span>Flagged ({flaggedQuestions.length})</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Results View */
        <div className="space-y-8 animate-fade-in">
          <div className="p-8 sm:p-10 rounded-3xl border border-[#e5e7eb] bg-white text-center space-y-6 shadow-xs relative overflow-hidden">
            <div className="w-24 h-24 mx-auto rounded-3xl bg-[#176b87]/10 border-2 border-[#176b87]/30 flex items-center justify-center text-3xl font-black text-[#176b87]">
              {scorePercentage}%
            </div>

            <div className="space-y-2">
              <span
                className={`text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider inline-block ${
                  passed
                    ? "bg-emerald-50 text-emerald-800 border border-emerald-300"
                    : "bg-rose-50 text-rose-800 border border-rose-300"
                }`}
              >
                {passed ? "Assessment Passed • Qualified" : "Review Recommended"}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#17191D]">
                {passed ? "Outstanding Performance!" : "Good Effort, Keep Practicing!"}
              </h2>
              <p className="text-xs sm:text-sm text-[#263746] max-w-xl mx-auto leading-relaxed">
                You answered <strong className="text-[#17191D]">{correctCount} of {quiz.questions.length}</strong> questions correctly. {passed ? "You have qualified for an official ANZEYL Merit Tuition Discount Voucher!" : "Review the question rationales below and re-test to qualify for tuition discounts."}
              </p>
            </div>

            {passed && (
              <div className="p-6 rounded-3xl bg-[#fff9eb] border border-[#edd7a6] text-left max-w-xl mx-auto space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AwardIcon className="w-5 h-5 text-[#854d0e]" />
                    <span className="font-extrabold text-[#854d0e] text-sm">ANZEYL Merit Discount Voucher</span>
                  </div>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#fef3c7] text-[#92400e] border border-[#fde68a]">
                    Verified
                  </span>
                </div>
                <p className="text-xs text-[#713f12] leading-relaxed">
                  Congratulations on achieving {scorePercentage}%. You have earned a <strong>Up to 50% Merit Tuition Discount</strong> applicable to ANZEYL instructor-led classroom and online batches.
                </p>
                <div className="pt-2 flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#854d0e] bg-white px-3 py-1.5 rounded-xl border border-[#edd7a6]">
                    VOUCHER-ANZEYL-{scorePercentage}-OFF
                  </span>
                  <button
                    onClick={() => setVoucherClaimed(true)}
                    disabled={voucherClaimed}
                    className="px-4 py-1.5 rounded-xl bg-[#176b87] hover:bg-[#12566c] text-white font-bold text-xs shadow-xs disabled:opacity-50 transition-all"
                  >
                    {voucherClaimed ? "✓ Voucher Saved" : "Claim Voucher"}
                  </button>
                </div>
              </div>
            )}

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4 text-xs">
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setCurrentIndex(0);
                  setSelectedAnswers({});
                  setFlaggedQuestions([]);
                }}
                className="px-5 py-2.5 rounded-xl bg-white hover:bg-[#f7f5ef] text-[#263746] border border-[#d6dde0] font-bold transition-colors"
              >
                Retake Assessment
              </button>
              <Link
                href="/portal/quizzes"
                className="px-6 py-2.5 rounded-xl bg-[#176b87] hover:bg-[#12566c] text-white font-bold flex items-center gap-1.5 transition-all"
              >
                <span>Explore Other Assessments</span>
                <ArrowRightIcon className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Question Breakdown Review */}
          <div className="p-6 sm:p-8 rounded-3xl border border-[#e5e7eb] bg-white space-y-6 shadow-xs">
            <h3 className="text-base font-bold text-[#17191D]">Detailed Questions & Answers Review</h3>
            <div className="space-y-6">
              {quiz.questions.map((q, idx) => {
                const userAns = selectedAnswers[idx];
                const isCorrect = userAns === q.correctIndex;

                return (
                  <div key={q.id} className="p-5 rounded-2xl bg-[#f7f5ef] border border-[#e5e7eb] space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#64748b]">Question {idx + 1}</span>
                      <span
                        className={`font-bold px-2.5 py-0.5 rounded-full ${
                          isCorrect
                            ? "bg-emerald-50 text-emerald-800 border border-emerald-300"
                            : "bg-rose-50 text-rose-800 border border-rose-300"
                        }`}
                      >
                        {isCorrect ? "✓ Correct" : "✗ Incorrect"}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-[#17191D]">{q.question}</h4>

                    <div className="space-y-1.5 text-xs">
                      {q.options.map((opt, optIdx) => {
                        const isSelected = userAns === optIdx;
                        const isAnsCorrect = optIdx === q.correctIndex;

                        let style = "bg-white border-[#e5e7eb] text-[#263746]";
                        if (isAnsCorrect) {
                          style = "bg-emerald-50 border-emerald-500 text-emerald-900 font-bold";
                        } else if (isSelected && !isAnsCorrect) {
                          style = "bg-rose-50 border-rose-500 text-rose-900";
                        }

                        return (
                          <div key={optIdx} className={`p-3 rounded-xl border flex items-center gap-2 ${style}`}>
                            <span className="font-mono font-bold w-5">{String.fromCharCode(65 + optIdx)}.</span>
                            <span>{opt}</span>
                            {isAnsCorrect && <span className="ml-auto text-emerald-700 font-bold">Correct Answer</span>}
                            {isSelected && !isAnsCorrect && <span className="ml-auto text-rose-700 font-semibold">Your Selection</span>}
                          </div>
                        );
                      })}
                    </div>

                    <div className="p-3 rounded-xl bg-white border border-[#e5e7eb] text-xs text-[#263746]">
                      <strong className="block text-[#176b87] font-bold mb-0.5">Rationale:</strong>
                      {q.explanation}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
