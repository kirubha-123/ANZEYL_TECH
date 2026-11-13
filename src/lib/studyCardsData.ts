/**
 * ANZEYL Study Cards & Conceptual Revision Flashcards
 * Covers all 9 ANZEYL courses with course-wise and topic-wise cards.
 */

export interface StudyCard {
  id: string;
  courseSlug: string;
  courseTitle: string;
  topic: string;
  frontPrompt: string;
  frontHint?: string;
  backConcept: string;
  backCodeSnippet?: string;
  backExplanation: string;
  interviewTip: string;
}

export const COURSE_STUDY_CARDS: Record<string, StudyCard[]> = {
  "full-stack-development": [
    {
      id: "fs-sc-1",
      courseSlug: "full-stack-development",
      courseTitle: "Full Stack Development",
      topic: "React 19 & Next.js",
      frontPrompt: "What is the key difference between Server Components and Client Components in Next.js App Router?",
      frontHint: "Think about where the JavaScript bundle executes and what is shipped to the client browser.",
      backConcept: "Server-First Execution vs Client Island Hydration",
      backCodeSnippet: `// Server Component (Default in App Router):
// Zero client bundle, runs on server/edge, direct DB access
async function UserProfile({ id }: { id: string }) {
  const user = await db.users.findUnique({ where: { id } });
  return <div>{user.name}</div>;
}`,
      backExplanation: "Server Components execute solely on the server and emit serialized React Server Component (RSC) payload HTML without client JS bundles. Client components ('use client') hydrate in the browser and enable hooks (useState, useEffect, event listeners).",
      interviewTip: "Interviewers look for understanding that 'use client' does NOT mean server rendering is skipped; client components are still SSR'd on initial page load!",
    },
    {
      id: "fs-sc-2",
      courseSlug: "full-stack-development",
      courseTitle: "Full Stack Development",
      topic: "Security",
      frontPrompt: "Why must you ALWAYS authenticate inside a Server Action even if the button is on an authenticated page?",
      frontHint: "Think of Server Actions as public HTTP POST endpoints under the hood.",
      backConcept: "Server Action Endpoint Exposure",
      backCodeSnippet: `export async function deletePost(postId: string) {
  'use server';
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized 401"); // MUST VERIFY
}`,
      backExplanation: "Every Server Action compiles into a publicly routable POST endpoint with a unique hashed action ID. Anyone with curl or Postman can trigger it directly without going through your UI.",
      interviewTip: "Always emphasize zero-trust architecture: never rely on client-side state or UI guardrails for backend authorization.",
    },
  ],

  "ai-and-machine-learning": [
    {
      id: "aiml-sc-1",
      courseSlug: "ai-and-machine-learning",
      courseTitle: "AI & Machine Learning",
      topic: "LLMs & RAG",
      frontPrompt: "What is Retrieval-Augmented Generation (RAG) and why is it preferred over fine-tuning for domain knowledge?",
      frontHint: "Think about knowledge freshness, hallucination mitigation, and model retraining cost.",
      backConcept: "RAG Architecture & Semantic Retrieval",
      backExplanation: "RAG retrieves relevant private context from a vector database at query time and injects it into the LLM prompt. It eliminates costly model retraining, mitigates hallucinations with cited sources, and allows instant document updates.",
      interviewTip: "Be ready to explain the steps: chunking, embedding generation, vector similarity search (cosine distance), and prompt augmentation.",
    },
  ],

  "data-science-and-analytics": [
    {
      id: "dsa-sc-1",
      courseSlug: "data-science-and-analytics",
      courseTitle: "Data Science & Analytics",
      topic: "Statistics",
      frontPrompt: "What is the difference between Type I and Type II errors in hypothesis testing?",
      frontHint: "Think of false alarms vs missed detections.",
      backConcept: "Alpha (False Positive) vs Beta (False Negative)",
      backExplanation: "Type I error (False Positive) is rejecting a true null hypothesis (a false alarm). Type II error (False Negative) is failing to reject a false null hypothesis (missing an actual effect).",
      interviewTip: "In medical diagnostics, Type II error is often far more dangerous (telling a sick person they are healthy). In spam filters, Type I error is worse (marking legitimate emails as spam).",
    },
  ],

  "cyber-security": [
    {
      id: "cs-sc-1",
      courseSlug: "cyber-security",
      courseTitle: "Cyber Security",
      topic: "Network Security",
      frontPrompt: "What is the difference between a Vulnerability Assessment and a Penetration Test?",
      frontHint: "Think about discovery vs exploitation.",
      backConcept: "Scanning & Identifying vs Active Exploitation",
      backExplanation: "A vulnerability assessment uses automated tools to identify and catalog known security weaknesses without attempting exploitation. A penetration test actively exploits vulnerabilities to determine how far an attacker could penetrate.",
      interviewTip: "Security compliance standards often require both: periodic automated scanning plus annual independent human penetration testing.",
    },
  ],

  "cloud-and-devops": [
    {
      id: "cdo-sc-1",
      courseSlug: "cloud-and-devops",
      courseTitle: "Cloud & DevOps",
      topic: "Kubernetes",
      frontPrompt: "What is the difference between a Kubernetes Pod and a Kubernetes Deployment?",
      frontHint: "Think about single ephemeral container units vs declarative rolling updates.",
      backConcept: "Atomic Execution Unit vs Controller Abstraction",
      backExplanation: "A Pod is the smallest deployable unit in Kubernetes, hosting one or more containers sharing network and storage. A Deployment manages a set of identical Pods, handling self-healing, scaling, and zero-downtime rolling updates.",
      interviewTip: "Always explain that in production, you rarely deploy bare Pods directly; you use Deployments, StatefulSets, or DaemonSets.",
    },
  ],

  "ui-ux-design": [
    {
      id: "uiux-sc-1",
      courseSlug: "ui-ux-design",
      courseTitle: "UI/UX Design",
      topic: "Design Systems",
      frontPrompt: "What are Design Tokens and why are they critical for scalable product teams?",
      frontHint: "Think about sharing values across design tools and codebases.",
      backConcept: "Platform-Agnostic Design Variables",
      backExplanation: "Design tokens are semantic key-value pairs representing design decisions (colors, typography, spacing, border radii) stored in a central JSON format. They synchronize Figma styles with CSS variables and native mobile apps automatically.",
      interviewTip: "Explain 3-tier token hierarchy: Global/Primitive tokens (blue-500) -> Semantic tokens (color-primary) -> Component tokens (btn-primary-bg).",
    },
  ],

  "digital-marketing": [
    {
      id: "dm-sc-1",
      courseSlug: "digital-marketing",
      courseTitle: "Digital Marketing",
      topic: "Analytics & Attribution",
      frontPrompt: "What is the difference between First-Touch and Last-Touch attribution models?",
      frontHint: "Consider which point in the customer journey gets credit for the conversion.",
      backConcept: "Marketing Attribution Modeling",
      backExplanation: "First-touch attribution gives 100% of conversion credit to the channel where the user first discovered the brand. Last-touch attribution gives 100% credit to the final channel the user interacted with immediately before converting.",
      interviewTip: "Modern digital marketing relies on Data-Driven or Multi-Touch attribution to understand the interplay across the entire marketing funnel.",
    },
  ],

  "data-analytics-with-power-bi": [
    {
      id: "pbi-sc-1",
      courseSlug: "data-analytics-with-power-bi",
      courseTitle: "Data Analytics with Power BI",
      topic: "Data Modelling",
      frontPrompt: "Why is a Star Schema strongly preferred over a flat single table or snowflake schema in Power BI?",
      frontHint: "Consider VertiPaq columnar compression engine and relationship traversal.",
      backConcept: "Star Schema & Dimensional Modelling",
      backExplanation: "A star schema separates business events into a central Fact table surrounded by discrete Dimension tables. This optimizes the VertiPaq engine's columnar compression, improves DAX calculation speed, and provides intuitive report slicers.",
      interviewTip: "Demonstrate understanding that snowflake schemas normalize dimensions into sub-tables, adding relationship hops that degrade analytical performance.",
    },
  ],
};

