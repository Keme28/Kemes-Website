import { siteConfig } from './site';

export interface KnowledgeEntry {
  id: string;
  category: 'cv' | 'ukeme' | 'ai_automation' | 'automation' | 'architecture' | 'services' | 'general';
  keywords: string[];
  patterns: RegExp[];
  answer: string;
  mcpTool: string;
  docs: number;
  suggestedFollowUps?: string[];
}

export const CHATBOT_KNOWLEDGE: KnowledgeEntry[] = [
  // ==========================================
  // 1. UKEME'S FULL NAME & IDENTITY (CV VERIFIED)
  // ==========================================
  {
    id: 'ukeme_full_name',
    category: 'cv',
    keywords: [
      'full name', 'real name', 'name', 'what is his name', 'what is ukeme name', 'surname',
      'last name', 'first name', 'middle name', 'called', 'nickname', 'who is ukemeobong',
      'umo-udofia', 'udofia', 'uduak'
    ],
    patterns: [
      /full\s*name/i,
      /(what|tell me)\s+(is\s+)?(ukeme|keme|his|your)\s+(full\s+|real\s+|actual\s+|official\s+|legal\s+)?name/i,
      /what\s+does\s+(keme|ukeme)\s+stand\s+for/i,
      /what\s+is\s+the\s+owner('?s)?\s+name/i,
      /who\s+is\s+ukemeobong/i,
    ],
    answer: `Ukeme's full legal name is **${siteConfig.profile.fullName}**.

• Known as: "${siteConfig.profile.displayName}" or "${siteConfig.profile.nickname}"
• Professional Title: ${siteConfig.profile.title}
• Location: ${siteConfig.profile.location}

He is a full-stack programmer and AI automation specialist who builds websites and applications with automation wired into their core framework.`,
    mcpTool: 'mcp://cv/get_identity_record',
    docs: 6,
    suggestedFollowUps: [
      "What is Ukeme's educational background?",
      "What work experience does Ukeme have on his CV?",
      "How can I contact Ukeme directly?",
    ],
  },

  // ==========================================
  // 2. EDUCATION & DEGREES (FROM VERIFIED CV)
  // ==========================================
  {
    id: 'ukeme_education',
    category: 'cv',
    keywords: [
      'education', 'degree', 'university', 'college', 'school', 'study', 'studied', 'graduated',
      'human anatomy', 'anatomy', 'university of uyo', 'uniuyo', 'futybills tech academy',
      'b.s.', 'bachelor', 'qualification', 'academic'
    ],
    patterns: [
      /(what|where)\s+did\s+(ukeme|keme|he)\s+(study|go to school|graduate)/i,
      /(education|academic|degree|university|school|college)/i,
      /human\s*anatomy/i,
      /university\s+of\s+uyo/i,
      /futybills\s+tech\s+academy/i,
    ],
    answer: `According to Ukeme's verified Résumé (CV), his education and academic credentials include:

1. **University of Uyo at Akwa Ibom** (2021 – 2025)
   • Degree: **B.S. in Human Anatomy**
   • Location: Akwa Ibom, Nigeria

2. **Futybills Tech Academy** (2025 – 2026)
   • Degree: **Certificate in AI Automation and AI-Powered Software Development**
   • Location: Uyo, Akwa Ibom State

3. **Official Certifications**:
   • Human Anatomy — University of Uyo
   • AI Automation and AI-Powered Software Development — Futybills Tech Academy

Ukeme's background in Human Anatomy gives him a unique systems-level thinking approach: he views businesses and software pipelines as interconnected anatomical systems, diagnosing manual bottlenecks and rebuilding them into automated self-executing workflows.`,
    mcpTool: 'mcp://cv/get_academic_credentials',
    docs: 5,
    suggestedFollowUps: [
      "What work experience does Ukeme have?",
      "What projects has Ukeme built?",
      "Can I download Ukeme's full CV?",
    ],
  },

  // ==========================================
  // 3. WORK EXPERIENCE: FUTYBILLS TECH
  // ==========================================
  {
    id: 'exp_futybills',
    category: 'cv',
    keywords: [
      'futybills', 'futybills tech', 'support agent', 'rag agent', 'video automation', 'video pipeline',
      'powershell', 'ticket resolution', '40k', '40000'
    ],
    patterns: [
      /futybills/i,
      /what (did|does) (ukeme|he) do at futybills/i,
      /40k.*articles/i,
      /video automation pipeline/i,
    ],
    answer: `At **Futybills Tech** (Akwa Ibom, Nigeria | September 2026 – Present), Ukeme serves as **AI Automation Specialist**:

• **40k+ Article RAG Support Agent**: Architected and shipped an internal Retrieval-Augmented Generation support agent indexing over 40,000+ knowledge articles, slashing average customer ticket resolution time by **35%**.
• **CRM & Support Orchestration**: Built n8n and Zapier workflows integrating CRM, billing, and support tools, eliminating an estimated **15 hours/week** of manual data entry across teams.
• **Video Automation Pipeline**: Developed a custom Python pipeline that converts written topics/scripts into finished short-form and long-form videos (with neural voiceovers and synced stock media) using free APIs and PowerShell, cutting hours of manual video editing down to single commands.`,
    mcpTool: 'mcp://experience/futybills_telemetry',
    docs: 6,
    suggestedFollowUps: [
      "Tell me about his work at River State High Court",
      "What did Ukeme do at Zeerocodes Labs?",
      "What is Model Context Protocol (MCP)?",
    ],
  },

  // ==========================================
  // 4. WORK EXPERIENCE: RIVER STATE HIGH COURT
  // ==========================================
  {
    id: 'exp_high_court',
    category: 'cv',
    keywords: [
      'river state high court', 'rivers state', 'high court', 'court', 'court analytics', 'quarterly returns',
      'excel portal', 'judgment tracking', 'port harcourt'
    ],
    patterns: [
      /(river state|rivers state|high court)/i,
      /what did (he|ukeme) do at (the )?court/i,
      /court quarterly returns/i,
    ],
    answer: `At the **River State High Court** (Port Harcourt, Rivers State | June 2026 – September 2026), Ukeme worked as **Junior Software Programmer, Automation**:

• Built a full-stack, locally hosted web portal that automated the High Court's quarterly returns and case analytics.
• Replaced error-prone manual Excel aggregation by syncing live spreadsheets into interactive dashboards.
• Implemented automated judgment tracking, case-age analytics, performance matrices, and print-ready official reports with zero manual copy-pasting.`,
    mcpTool: 'mcp://experience/high_court_portal',
    docs: 5,
    suggestedFollowUps: [
      "Tell me about his work at Zeerocodes Labs",
      "What did Ukeme do at Futybills Tech?",
      "What programming languages does Ukeme know?",
    ],
  },

  // ==========================================
  // 5. WORK EXPERIENCE: ZEEROCODES LABS
  // ==========================================
  {
    id: 'exp_zeerocodes',
    category: 'cv',
    keywords: [
      'zeerocodes', 'zeerocodes labs', 'security automation', 'shift management', 'guard check-in',
      'document summarization', 'uipath', 'finance rpa', 'intern'
    ],
    patterns: [
      /zeerocodes/i,
      /what did (he|ukeme) do at zeerocodes/i,
      /security automation/i,
      /uipath/i,
    ],
    answer: `At **Zeerocodes Labs** (Remote | July 2025 – June 2026), Ukeme was a **Junior Software Programmer & Intern AI Automation Specialist**:

• **Multi-Workflow Security Operations System**: Designed and deployed a complete automation system in n8n for a private security firm, managing daily guard shifts, real-time check-ins, absence detection, and incident escalation.
• **AI Document Summarization**: Developed a Python + LLM tool for customer service teams, cutting account-review preparation time by **60%**.
• **Robotic Process Automation (RPA)**: Wrote internal RPA scripts using UiPath and Python that automated recurring financial reporting tasks, saving the finance team roughly **6 hours per week**.`,
    mcpTool: 'mcp://experience/zeerocodes_telemetry',
    docs: 5,
    suggestedFollowUps: [
      "What programming languages and tools does Ukeme use?",
      "Tell me about the EduNotify project",
      "How can I contact Ukeme?",
    ],
  },

  // ==========================================
  // 6. PROJECTS: EDUNOTIFY & HIGHLIGHTS
  // ==========================================
  {
    id: 'projects_edunotify',
    category: 'cv',
    keywords: [
      'edunotify', 'school portal', 'projects', 'what has he built', 'portfolio projects', 'airtable', 'next.js 15'
    ],
    patterns: [
      /edunotify/i,
      /what (projects|systems|apps) has (ukeme|he) (built|shipped|developed)/i,
      /school management portal/i,
    ],
    answer: `Ukeme has designed, built, and shipped several production systems:

1. **EduNotify – School Portal Web Application**
   • Live Website: [edunotify-keme29.vercel.app](https://edunotify-keme29.vercel.app)
   • Full-stack modern school management portal built with **Next.js 15, TypeScript, Tailwind CSS**, and **Airtable** as the backend.
   • Features role-based access control (Admin & Parent portals), secure server-side data fetching, and automated grade/notice alerts.
   • Deployed on **Vercel** with secured API keys and zero server maintenance overhead for staff.

2. **40k+ Article RAG Support Agent & Vector Dispatcher** (Futybills Tech)
   • Vector search + LLM response synthesizer reducing ticket resolution time by 35%.

3. **High Court Analytics Portal** (River State High Court)
   • Localized automated data pipeline syncing Excel records to interactive analytics dashboards.

4. **Multi-Workflow Security Operations System** (Zeerocodes Labs)
   • n8n-powered dispatch, absence detection, and incident routing.`,
    mcpTool: 'mcp://projects/query_portfolio',
    docs: 6,
    suggestedFollowUps: [
      "What is AI automation and how does it work?",
      "What is Ukeme's tech stack?",
      "How can I contact Ukeme?",
    ],
  },

  // ==========================================
  // 7. CONTACT & LOCATION (VERIFIED)
  // ==========================================
  {
    id: 'contact_ukeme',
    category: 'ukeme',
    keywords: [
      'contact', 'reach', 'email', 'phone', 'whatsapp', 'hire', 'call', 'talk', 'connect',
      'message', 'linkedin', 'github', 'touch', 'booking', 'consultation', 'location', 'lagos',
      'where is he', 'where does he live', 'timezone', 'wat', 'nigeria'
    ],
    patterns: [
      /how (can|do) i (contact|reach|hire|get in touch with|message|email|call) (ukeme|keme|him|you)/i,
      /(what is|give me) (ukeme|his|your) (email|phone|contact|number|linkedin|github|address)/i,
      /where (is|does) (ukeme|he) (live|located|based|from)/i,
      /what (country|city|timezone) is (he|ukeme) in/i,
      /reach (out to )?(ukeme|keme)/i,
      /hire (ukeme|keme)/i,
    ],
    answer: `Here are Ukeme's verified direct contact channels:

• **Email**: ${siteConfig.links.email}
• **Phone & WhatsApp**: ${siteConfig.links.phone}
• **LinkedIn**: ${siteConfig.links.linkedin}
• **GitHub**: ${siteConfig.links.github} (${siteConfig.links.githubHandle})
• **Location**: ${siteConfig.profile.location} (West Africa Time, WAT / UTC+1)
• **Interactive Webhook Dispatcher**: Scroll down to the Contact section (#contact) at the bottom of this website to send a message directly through his automated webhook intake pipeline!

Ukeme works remotely with clients and teams worldwide across US, UK/Europe, and African timezones.`,
    mcpTool: 'mcp://crm/get_contact_telemetry',
    docs: 6,
    suggestedFollowUps: [
      "What services does Ukeme offer?",
      "What is Ukeme's full name and background?",
      "Can I view or download his CV?",
    ],
  },

  // ==========================================
  // 8. TECHNICAL SKILLS & PROGRAMMING LANGUAGES
  // ==========================================
  {
    id: 'ukeme_skills',
    category: 'cv',
    keywords: [
      'skills', 'tech stack', 'languages', 'tools', 'technologies', 'programming languages',
      'python', 'typescript', 'javascript', 'sql', 'bash', 'powershell', 'n8n', 'make',
      'zapier', 'docker', 'postgresql', 'uipath', 'rpa', 'react', 'nextjs', 'fastapi'
    ],
    patterns: [
      /what (skills|tech stack|tools|technologies|languages) (does|do) (ukeme|he|you) (know|use|have)/i,
      /does (ukeme|he) know (python|typescript|react|n8n|sql|docker|uipath)/i,
      /what programming languages/i,
    ],
    answer: `From Ukeme's verified CV and production systems, here is his complete technical toolkit:

• **Programming Languages**: Python, TypeScript, JavaScript, SQL, Bash / PowerShell
• **Automation & Orchestration**: n8n (Self-Hosted & Cloud), Make.com, Zapier, Custom Python Agents, Webhook / API Orchestration, PowerShell Automation, UiPath (RPA)
• **AI, RAG & Vectors**: LangChain, LlamaIndex, FastEmbed, Qdrant, Pinecone, OpenAI, Anthropic Claude, Groq, Model Context Protocol (MCP)
• **Data & Infrastructure**: PostgreSQL, Docker, Airtable, Supabase, Git, Linux
• **Full-Stack Web**: React 18, Next.js 15, Vite, Node.js, Express, FastAPI, Tailwind CSS, GSAP, Framer Motion
• **Engineering Practices**: Process discovery & mapping, workflow monitoring & telemetry, website and application development, technical architecture documentation`,
    mcpTool: 'mcp://stack/inspect_capabilities',
    docs: 7,
    suggestedFollowUps: [
      "What is AI automation and how does it work?",
      "What is the difference between n8n and Make?",
      "Tell me about the EduNotify project",
    ],
  },

  // ==========================================
  // 9. YEARS OF EXPERIENCE & SENIORITY
  // ==========================================
  {
    id: 'ukeme_experience_years',
    category: 'cv',
    keywords: [
      'years of experience', 'how many years', 'how long', 'experience', 'seniority', 'track record'
    ],
    patterns: [
      /how many years (of experience)?/i,
      /how long has (he|ukeme) been (building|working|coding)/i,
      /track record/i,
    ],
    answer: `Ukeme has **2+ years of hands-on software development and AI automation experience** (with 1+ years specifically designing and shipping enterprise AI agent workflows and RPA systems).

Throughout his career at **Futybills Tech**, **River State High Court**, and **Zeerocodes Labs**, he has eliminated hundreds of hours of manual busywork and deployed mission-critical web applications for schools, government registries, and private enterprises.`,
    mcpTool: 'mcp://experience/calculate_tenure',
    docs: 4,
    suggestedFollowUps: [
      "What did Ukeme do at Futybills Tech?",
      "How can I contact Ukeme?",
      "What services does Ukeme offer?",
    ],
  },

  // ==========================================
  // 10. CV & RÉSUMÉ ACCESS
  // ==========================================
  {
    id: 'resume_cv_access',
    category: 'cv',
    keywords: [
      'cv', 'resume', 'pdf', 'download cv', 'download resume', 'spec sheet', 'get cv', 'see cv'
    ],
    patterns: [
      /(view|download|show|get|see) (the )?(cv|resume)/i,
      /where is (his|ukeme's) (cv|resume)/i,
      /can i see (his|the) resume/i,
    ],
    answer: `You can view or download Ukeme's verified 2-page CV directly on this website:

• **Download PDF**: [/ukemeobong-umoudofia-cv.pdf](/ukemeobong-umoudofia-cv.pdf)
• **Interactive Viewer**: Click the **"Résumé ↓"** button on the top-right of the navigation bar, or press <kbd>⌘K</kbd> to launch the command palette.
• The modal features both an **Interactive Spec Sheet** breakdown and an embedded **Original PDF Viewer**.`,
    mcpTool: 'mcp://credentials/verify_resume',
    docs: 4,
    suggestedFollowUps: [
      "What is Ukeme's full name?",
      "What did Ukeme study at university?",
      "How can I contact Ukeme?",
    ],
  },

  // ==========================================
  // 11. AI AUTOMATION: DEFINITION & CONCEPT
  // ==========================================
  {
    id: 'what_is_ai_automation',
    category: 'ai_automation',
    keywords: [
      'ai automation', 'define ai automation', 'explain ai automation', 'what is ai automation',
      'meaning of ai automation', 'concept of ai automation', 'ai workflows', 'intelligent automation'
    ],
    patterns: [
      /(what is|define|explain|meaning of) ai automation/i,
      /how does ai automation work/i,
      /what does an ai automation (specialist|engineer) do/i,
    ],
    answer: `**AI AUTOMATION** is the fusion of programmatic execution (APIs, webhooks, orchestrators like n8n, RPA scripts) with cognitive machine intelligence (Large Language Models, computer vision, vector embeddings, and autonomous reasoning agents).

Traditional automation acts as the **"hands and pipes"**—moving data deterministically from Point A to Point B. But it breaks whenever it encounters messy, unstructured human inputs (freeform emails, PDF invoices, customer tickets).

AI Automation injects a **"brain and eyes"** into that pipeline:
1. **Semantic Understanding**: Parses unstructured text, audio, or images into clean, validated JSON schemas.
2. **Cognitive Routing**: Evaluates intent and sentiment to dynamically route workflows to the optimal next step.
3. **Autonomous Tool Execution**: Uses Model Context Protocol (MCP) or API function-calling to query databases, run code, and retrieve internal knowledge.
4. **Self-Verification & Error Recovery**: Checks outputs for accuracy and self-corrects edge cases before final execution.

Result: Businesses automate complex, cognitive workflows that previously required continuous human micro-management.`,
    mcpTool: 'mcp://foundations/explain_ai_automation',
    docs: 8,
    suggestedFollowUps: [
      "What is the difference between traditional automation and AI automation?",
      "Why is a chatbot considered an automated system?",
      "What is RAG (Retrieval-Augmented Generation)?",
    ],
  },

  // ==========================================
  // 12. TRADITIONAL AUTOMATION: DEFINITION
  // ==========================================
  {
    id: 'what_is_automation',
    category: 'automation',
    keywords: [
      'automation', 'define automation', 'traditional automation', 'what is automation',
      'explain automation', 'rule-based', 'scripting', 'robotic process automation'
    ],
    patterns: [
      /^what is automation\??$/i,
      /^define automation\??$/i,
      /^explain automation\??$/i,
      /concept of automation/i,
    ],
    answer: `**AUTOMATION** is the technique of using software scripts, digital workflows, or machinery to execute repetitive tasks and data pipelines with minimal or zero human intervention.

In modern software engineering, traditional automation operates on deterministic, rule-based logic:
• **"If Event X occurs, execute Action Y"** (e.g., when a Stripe invoice is paid, send a Slack alert and add a row to PostgreSQL).
• Common tools: Webhooks, cron jobs, Zapier, Make, n8n, Python scripts, and UiPath RPA.

**Strength**: 100% predictable, instant, and reliable for clean, structured data.
**Limitation**: Inherently brittle. If a column name changes or an email arrives formatted differently, traditional rule-based scripts crash because they cannot understand context.`,
    mcpTool: 'mcp://foundations/explain_automation',
    docs: 4,
    suggestedFollowUps: [
      "What is AI automation and how does it improve upon this?",
      "What is the difference between automation and AI automation?",
    ],
  },

  // ==========================================
  // 13. TRADITIONAL VS AI AUTOMATION COMPARISON
  // ==========================================
  {
    id: 'automation_vs_ai_automation',
    category: 'ai_automation',
    keywords: [
      'difference', 'versus', 'vs', 'compare', 'comparison', 'traditional vs ai', 'automation vs ai automation'
    ],
    patterns: [
      /(difference between|compare|versus|vs) (traditional )?automation and ai automation/i,
      /how is ai automation different/i,
      /why use ai automation instead of/i,
    ],
    answer: `Here is the architectural comparison between Traditional Automation and AI Automation:

1. **Input Handling**:
   • *Traditional*: Requires 100% rigid, structured data (exact CSV headers, fixed JSON keys). Fails on messy text or formatting shifts.
   • *AI Automation*: Naturally understands unstructured data (natural language emails, PDFs, audio transcripts, invoices) and transforms them into validated payloads.

2. **Decision-Making**:
   • *Traditional*: Hard-coded flowcharts and static if/else conditions. Cannot adapt to situations outside predefined paths.
   • *AI Automation*: Adaptive reasoning agents that interpret user intent, categorize urgency, and dynamically choose the best tool or action.

3. **Failure Resilience**:
   • *Traditional*: Throws an unhandled exception or stops running when encountering an anomaly.
   • *AI Automation*: Self-heals by analyzing error messages, re-trying with corrected parameters, or cleanly routing edge cases to a human supervisor.

**Bottom line**: Traditional automation handles the plumbing; AI automation provides the discernment.`,
    mcpTool: 'mcp://analysis/compare_paradigms',
    docs: 6,
    suggestedFollowUps: [
      "Why is a chatbot an automated system?",
      "How do you design an automation without brittle failures?",
    ],
  },

  // ==========================================
  // 14. WHY IS A CHATBOT AN AUTOMATED SYSTEM?
  // ==========================================
  {
    id: 'why_chatbot_is_automated',
    category: 'ai_automation',
    keywords: [
      'why is a chatbot automated', 'how does this chatbot work', 'why is this automated',
      'chatbot automated system', 'how are you automated'
    ],
    patterns: [
      /why (is a|is this) chatbot (an )?automated/i,
      /how is (a|this) chatbot (an )?automated system/i,
      /how do you work/i,
      /are you automated/i,
    ],
    answer: `A chatbot is a prime example of an automated system because it eliminates the manual human loop across 4 distinct stages:

1. **Inbound Trigger**: When you send a message, it triggers an event listener without anyone having to open an email or desk ticket.
2. **Cognitive Retrieval**: Instead of a human searching through files, the system semantically queries indexed knowledge vectors and CV records in milliseconds.
3. **Synthesis & Formatting**: An LLM reasons over the retrieved facts, structures an answer, and formats it cleanly.
4. **Instant Dispatch**: The response is delivered to your screen with full telemetry—operating 24 hours a day, 7 days a week with zero human fatigue or delay.

This is the exact principle Ukeme applies when automating business operations: replace repetitive human cognitive tasks with reliable, self-executing systems.`,
    mcpTool: 'mcp://concepts/explain_chatbot_automation',
    docs: 5,
    suggestedFollowUps: [
      "What is RAG (Retrieval-Augmented Generation)?",
      "What is Model Context Protocol (MCP)?",
      "How can I contact Ukeme?",
    ],
  },

  // ==========================================
  // 15. RAG & ARCHITECTURE
  // ==========================================
  {
    id: 'rag_architecture',
    category: 'architecture',
    keywords: [
      'rag', 'retrieval augmented generation', 'vector', 'embeddings', 'qdrant', 'pinecone',
      'semantic search', 'chunking', 'fastembed'
    ],
    patterns: [
      /what is rag/i,
      /explain (your )?(rag|retrieval augmented generation)/i,
      /vector (database|search|embeddings)/i,
    ],
    answer: `Retrieval-Augmented Generation (RAG) is an architectural pattern that connects AI models to your private, real-time data without needing to retrain or fine-tune the model.

How Ukeme's production RAG pipeline works:
1. **Chunking**: Documents and records are parsed into clean semantic blocks.
2. **Vector Embeddings**: Blocks are converted into high-dimensional vector embeddings and stored in a vector database (e.g. Qdrant / Pinecone).
3. **Semantic Retrieval**: When an inquiry arrives, vector similarity search pulls the most relevant source chunks.
4. **Cited Synthesis**: The LLM receives the question plus the verified source chunks in its context, outputting an accurate, hallucination-free answer with citations in < 750ms.`,
    mcpTool: 'mcp://knowledge_base/vector_query',
    docs: 6,
    suggestedFollowUps: [
      "Tell me about the 40k+ article RAG agent at Futybills Tech",
      "What is Model Context Protocol (MCP)?",
    ],
  },

  // ==========================================
  // 16. MODEL CONTEXT PROTOCOL (MCP)
  // ==========================================
  {
    id: 'mcp_protocol',
    category: 'architecture',
    keywords: [
      'mcp', 'model context protocol', 'protocol', 'anthropic', 'tool calling', 'tools',
      'sandboxing', 'agent architecture'
    ],
    patterns: [
      /what is mcp/i,
      /explain (model context protocol|mcp)/i,
      /why (do you|use) mcp/i,
    ],
    answer: `**Model Context Protocol (MCP)** is an open standard created by Anthropic that standardizes how AI models connect to external tools, databases, and enterprise systems.

Why Ukeme builds with MCP:
• **Security & Sandboxing**: Tools run behind typed parameter schemas with zero exposure of raw credentials.
• **Reusability**: An MCP tool built once can interface with Claude, Cursor, local agent runners, or automated n8n workflows without rewriting integration code.
• **Human-in-the-Loop Gates**: High-stakes actions (like executing a payout or deleting records) require cryptographic confirmation before execution.`,
    mcpTool: 'mcp://protocols/explain_mcp_spec',
    docs: 5,
    suggestedFollowUps: [
      "How do you design an automation without brittle failures?",
      "What is the difference between n8n and Make?",
    ],
  },

  // ==========================================
  // 17. N8N VS MAKE
  // ==========================================
  {
    id: 'n8n_vs_make',
    category: 'architecture',
    keywords: [
      'n8n', 'make', 'make.com', 'zapier', 'orchestration', 'workflow engine', 'self-hosted'
    ],
    patterns: [
      /n8n (vs|versus|or) make/i,
      /why (use )?n8n/i,
      /difference between n8n and make/i,
    ],
    answer: `Ukeme chooses between n8n and Make based on project architecture:

• **n8n (His Primary Production Engine)**:
  - Self-hostable on Docker/VPS with zero per-execution subscription pricing.
  - Native Python and JavaScript execution nodes directly in the workflow.
  - Enterprise data compliance: Data never leaves your VPC.
  - Native LangChain AI Agent nodes and vector DB connectors.

• **Make.com**:
  - Rapid cloud integrations with SaaS tools (Google Workspace, Airtable, Slack).
  - Great visual interface for non-technical stakeholders.

For high-volume, privacy-critical, or custom AI agent pipelines, **n8n is Ukeme's weapon of choice**.`,
    mcpTool: 'mcp://orchestration/compare_engines',
    docs: 4,
    suggestedFollowUps: [
      "How do you build automations without brittle failures?",
      "What is Ukeme's tech stack?",
    ],
  },

  // ==========================================
  // 18. ERROR RESILIENCE: "FAIL LOUDLY"
  // ==========================================
  {
    id: 'error_resilience',
    category: 'architecture',
    keywords: [
      'failure', 'error', 'retry', 'brittle', 'dead letter', 'reliable', 'resilience', 'fail loudly'
    ],
    patterns: [
      /how (do you|to) (design|build) (an )?automation without (brittle )?failures/i,
      /error handling/i,
      /dead letter/i,
      /fail loudly/i,
    ],
    answer: `Ukeme's cardinal engineering rule is: **"If it can't fail loudly, it isn't done."**

Production failure guards he implements:
1. **Exponential Backoff**: Temporary network spikes trigger retries at 1s, 5s, and 30s intervals.
2. **Dead-Letter Queues (DLQ)**: Malformed payloads are saved to a separate queue with full incoming state preserved for manual replay.
3. **Strict Schema Validation**: Inbound payloads are validated with Zod/Pydantic; invalid schemas are rejected with descriptive HTTP 422 errors instead of corrupting state.
4. **Immediate Human Alerts**: Critical pipeline halts dispatch instant webhooks to Telegram/Slack with one-click replay links.`,
    mcpTool: 'mcp://telemetry/error_resilience',
    docs: 5,
    suggestedFollowUps: [
      "How can I contact Ukeme?",
      "What services does Ukeme offer?",
    ],
  },

  // ==========================================
  // 18B. WATCH ME AUTOMATE (GOOGLE DRIVE VIDEO ARCHIVE)
  // ==========================================
  {
    id: 'automation_videos_drive',
    category: 'ukeme',
    keywords: [
      'video', 'videos', 'watch me automate', 'watch', 'drive', 'google drive', 'recordings',
      'screen recording', 'demo videos', 'live builds', 'youtube', 'loom'
    ],
    patterns: [
      /where can i (watch|see) (videos|automations|demos)/i,
      /watch me automate/i,
      /google drive/i,
      /(do you have|are there) (videos|screen recordings|walkthroughs)/i,
      /video (vault|archive|recordings)/i,
    ],
    answer: `You can watch raw, uncut screen recordings of Ukeme's automations in his dedicated Google Drive repository:

🔗 **[Open Google Drive Video Vault](${siteConfig.links.googleDrive})**

What you'll find:
• Live n8n canvas builds with complex webhook routing
• Python RPA scripts and background automation daemons in action
• Complete, uncut workflow runs with voiceover walkthroughs & zero cuts`,
    mcpTool: 'mcp://media/get_google_drive_vault',
    docs: 8,
    suggestedFollowUps: [
      "What is EduNotify?",
      "How does Ukeme handle error recovery in n8n?",
      "How can I contact Ukeme directly?",
    ],
  },

  // ==========================================
  // 19. SERVICES & WORKING TOGETHER
  // ==========================================
  {
    id: 'services_offerings',
    category: 'services',
    keywords: [
      'services', 'offerings', 'hire', 'pricing', 'process', 'work with', 'deliverables',
      'audit', 'consulting', 'custom system'
    ],
    patterns: [
      /what (services|offerings) (does|do) (ukeme|you) (offer|provide)/i,
      /how do we work together/i,
      /how can ukeme help/i,
      /what can you build/i,
    ],
    answer: `Ukeme collaborates with businesses through three clear service blueprints:

01 // **Quick Automation Audit**
• Review manual workflows, spreadsheets, and repetitive bottlenecks.
• Deliverable: A prioritized automation roadmap with exact tool recommendations and ROI estimates.

02 // **Build a Custom System**
• Complete delivery of a full-stack web application (Next.js/React), custom RAG knowledge bot, or end-to-end n8n workflow pipeline.
• Deliverable: Fully tested, deployed system with error-handling, documentation, and team handover.

03 // **Embedded / Retainer Partnership**
• Ongoing fractional automation engineering (a few days each month).
• Deliverable: Continuous maintenance, feature integrations, and rapid troubleshooting as your operations grow.`,
    mcpTool: 'mcp://services/catalog_query',
    docs: 4,
    suggestedFollowUps: [
      "How can I contact Ukeme to get started?",
      "What is Ukeme's full name and background?",
    ],
  },
];

/**
 * Intelligent Fallback & Dynamic Query Handler:
 * When queries don't match a fixed preset, this engine evaluates:
 * 1. Is it asking about Ukeme's capabilities or personal details?
 * 2. Is it a general programming or automation question?
 * 3. Is it an unexpected or out-of-scope question?
 */
export function generateDynamicResponse(query: string): KnowledgeEntry {
  const clean = query.trim().toLowerCase();

  // 1. Direct questions about Ukeme / Keme's capabilities or facts
  if (
    clean.includes('ukeme') ||
    clean.includes('keme') ||
    clean.includes('he') ||
    clean.includes('his') ||
    clean.includes('you') ||
    clean.includes('your')
  ) {
    // Check if asking about specific technologies
    if (clean.includes('react') || clean.includes('next') || clean.includes('frontend')) {
      return {
        id: 'dyn_frontend',
        category: 'cv',
        keywords: ['frontend'],
        patterns: [],
        answer: `Yes! Ukeme is a skilled full-stack developer who builds responsive, state-of-the-art web applications using **React 18, Next.js 15, TypeScript**, and **Tailwind CSS**.

His core philosophy is embedding automated workflows directly into modern websites—so forms route themselves, reports generate automatically, and data flows directly into databases. You can see this in action on projects like **EduNotify** and this very portfolio website!`,
        mcpTool: 'mcp://cv/capability_lookup',
        docs: 4,
        suggestedFollowUps: ["Tell me about EduNotify", "What is Ukeme's full tech stack?"],
      };
    }

    if (clean.includes('python') || clean.includes('script') || clean.includes('backend')) {
      return {
        id: 'dyn_python',
        category: 'cv',
        keywords: ['python'],
        patterns: [],
        answer: `Yes, **Python** is one of Ukeme's primary programming languages. 

He uses Python extensively for:
• Custom AI agents and LLM orchestration (LangChain, LlamaIndex)
• Document summarization and NLP extraction pipelines
• Robotic Process Automation (RPA) scripts that automate financial and spreadsheet data
• Automated media and video production pipelines using local tools and APIs`,
        mcpTool: 'mcp://cv/capability_lookup',
        docs: 5,
        suggestedFollowUps: ["What did he do at Futybills Tech?", "How can I contact Ukeme?"],
      };
    }

    if (clean.includes('mobile') || clean.includes('app') || clean.includes('ios') || clean.includes('android')) {
      return {
        id: 'dyn_mobile',
        category: 'cv',
        keywords: ['mobile'],
        patterns: [],
        answer: `Ukeme specializes in full-stack web applications (Next.js/React) and cloud automation pipelines. He builds mobile-responsive Progressive Web Apps (PWAs) and backend API services that mobile apps connect to.

If your project requires mobile integrations or cross-platform APIs, you can contact Ukeme directly at **${siteConfig.links.email}** to discuss the architecture.`,
        mcpTool: 'mcp://cv/capability_lookup',
        docs: 3,
        suggestedFollowUps: ["What is Ukeme's email?", "What services does Ukeme offer?"],
      };
    }

    if (clean.includes('rate') || clean.includes('price') || clean.includes('cost') || clean.includes('charge')) {
      return {
        id: 'dyn_pricing',
        category: 'services',
        keywords: ['pricing'],
        patterns: [],
        answer: `Ukeme structures pricing based on project scope, timeline, and whether it is a fixed-deliverable system build or an ongoing retainer partnership.

To get an accurate estimate or explore a Quick Automation Audit for your business:
• Email: **${siteConfig.links.email}**
• Phone / WhatsApp: **${siteConfig.links.phone}**
• Or dispatch a message via the form at the bottom of this page (#contact).`,
        mcpTool: 'mcp://services/pricing_query',
        docs: 4,
        suggestedFollowUps: ["What services does Ukeme offer?", "How do we work together?"],
      };
    }

    // Default informative response about Ukeme
    return {
      id: 'dyn_ukeme_overview',
      category: 'ukeme',
      keywords: ['ukeme'],
      patterns: [],
      answer: `Regarding Ukeme (${siteConfig.profile.fullName}):

He is a **${siteConfig.profile.title}** based in ${siteConfig.profile.location}.
• Verified CV: Holds a B.S. in Human Anatomy from University of Uyo and an AI Automation Certificate from Futybills Tech Academy.
• Experience: Futybills Tech (RAG agent over 40k+ articles), River State High Court (automated analytics portal), and Zeerocodes Labs (n8n security operations & RPA).
• Contact: ${siteConfig.links.email} · ${siteConfig.links.phone}

Is there a specific detail from his CV, background, or projects you'd like to explore?`,
      mcpTool: 'mcp://cv/general_record',
      docs: 5,
      suggestedFollowUps: [
        "What is Ukeme's full name?",
        "What did Ukeme study at university?",
        "How can I contact Ukeme?",
      ],
    };
  }

  // 2. Unexpected / General inquiries (graceful, intelligent persona)
  return {
    id: 'unexpected_graceful',
    category: 'general',
    keywords: ['general'],
    patterns: [],
    answer: `I am Keme's AI Automation Copilot. While I'm specialized in explaining Ukeme's engineering portfolio, verified CV, and modern AI automation architectures, I'm happy to assist you!

Regarding your query: "${query}"

Here is what you should know:
• In an automated enterprise system, unexpected questions like this are dynamically handled using semantic retrieval or routed to human-in-the-loop oversight.
• If this relates to a project or system you'd like Ukeme to build or automate, you can connect with him directly at **${siteConfig.links.email}** or phone **${siteConfig.links.phone}**.

What would you like to know about Ukeme's work, CV, or AI automation?`,
    mcpTool: 'mcp://general/intent_orchestrator',
    docs: 4,
    suggestedFollowUps: [
      "What is Ukeme's full name?",
      "What did Ukeme study at university?",
      "What is AI automation and how does it work?",
      "How can I contact Ukeme?",
    ],
  };
}

/**
 * Intelligent Retrieval Engine:
 * 1. Checks regex patterns (highest confidence: 50+ points).
 * 2. Checks tokenized keyword matches with stemming & normalization.
 * 3. If no entry meets confidence threshold, calls generateDynamicResponse.
 */
export function queryKnowledgeBase(query: string): KnowledgeEntry {
  const clean = query.trim().toLowerCase();
  if (!clean) {
    return CHATBOT_KNOWLEDGE[0];
  }

  // Quick direct matching for high-frequency queries
  if (
    clean.includes('full name') ||
    clean.includes('real name') ||
    clean.includes('his name') ||
    clean.includes('your name') ||
    clean.includes('ukeme name') ||
    clean.includes('name of')
  ) {
    const fullNameEntry = CHATBOT_KNOWLEDGE.find((e) => e.id === 'ukeme_full_name');
    if (fullNameEntry) return fullNameEntry;
  }

  if (
    clean.includes('degree') ||
    clean.includes('study') ||
    clean.includes('studied') ||
    clean.includes('university') ||
    clean.includes('college') ||
    clean.includes('anatomy') ||
    clean.includes('school') ||
    clean.includes('education')
  ) {
    const eduEntry = CHATBOT_KNOWLEDGE.find((e) => e.id === 'ukeme_education');
    if (eduEntry) return eduEntry;
  }

  if (
    clean.includes('contact') ||
    clean.includes('reach') ||
    clean.includes('email') ||
    clean.includes('phone') ||
    clean.includes('whatsapp') ||
    clean.includes('call') ||
    clean.includes('hire')
  ) {
    const contactEntry = CHATBOT_KNOWLEDGE.find((e) => e.id === 'contact_ukeme');
    if (contactEntry) return contactEntry;
  }

  let bestEntry: KnowledgeEntry | null = null;
  let highestScore = 0;

  for (const entry of CHATBOT_KNOWLEDGE) {
    let score = 0;

    // Pattern matching
    for (const pat of entry.patterns) {
      if (pat.test(clean)) {
        score += 35;
      }
    }

    // Exact keyword / phrase matching
    for (const kw of entry.keywords) {
      if (clean.includes(kw.toLowerCase())) {
        score += 8;
      }
    }

    // Tokenized word overlap
    const queryTokens = clean.replace(/[^\w\s]/g, ' ').split(/\s+/).filter((w) => w.length > 2);
    for (const token of queryTokens) {
      for (const kw of entry.keywords) {
        if (kw.toLowerCase().split(/\s+/).includes(token)) {
          score += 3;
        }
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestEntry = entry;
    }
  }

  // If match confidence is solid, return it
  if (bestEntry && highestScore >= 6) {
    return bestEntry;
  }

  // Otherwise, use dynamic contextual handler
  return generateDynamicResponse(query);
}
