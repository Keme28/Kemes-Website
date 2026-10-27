export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: 'automation' | 'fullstack' | 'hybrid';
  year: string;
  metrics: { label: string; value: string; unit?: string }[];
  pipeline: {
    input: string;
    process: string;
    output: string;
  };
  overview: {
    problem: string;
    built: string;
    result: string;
  };
  stack: string[];
  architecture: {
    nodes: { id: string; label: string; type: 'trigger' | 'action' | 'ai' | 'database'; x: number; y: number }[];
    edges: { from: string; to: string; label?: string }[];
  };
  liveUrl?: string;
  githubUrl?: string;
}

export interface SpecItem {
  index: string;
  label: string;
  value: string;
}

export interface ExperienceItem {
  id: string;
  period: string;
  role: string;
  company: string;
  location: string;
  status: 'CURRENT' | 'COMPLETED';
  bullets: string[];
}

export interface EducationItem {
  institution: string;
  location: string;
  period: string;
  degree: string;
}

export interface PrincipleItem {
  number: string;
  title: string;
  note: string;
  tag: 'DRAFT';
}

export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  company: string;
}

export interface ServiceItem {
  index: string;
  title: string;
  badge: string;
  description: string;
  steps: string[];
}

export const siteConfig = {
  profile: {
    fullName: "Ukemeobong Uduak Umo-Udofia",
    displayName: "Keme",
    nickname: "Ukeme",
    title: "Software Programmer | AI Automation Specialist",
    location: "Lagos, Nigeria",
    phone: "(+234) 0813 549 4115",
    timezone: "Africa/Lagos",
    yearsOfExperience: 2,
    availability: "Available for Q4/Q1 Projects",
    avatar: "/keme-photo.jpg",
    avatarFallback: "/keme-photo-2.jpg",
  },

  positioning: {
    headline: "I make the boring stuff go away.",
    support: "As a Full-stack developer and AI automation specialist. I take the repetitive work off your plate so people can do the work only people can. I build websites with automation built in.",
    heroSubheadline: "Machine precision × Human warmth. Custom web applications wired directly into intelligent self-executing workflows.",
  },

  summary: `AI automation specialist and full-stack programmer with 1+ years designing and shipping automated workflows that combine LLMs, Robotic Process Automation (RPA), AI agents, and custom code. Skilled at finding manual, repetitive processes across a business and rebuilding them as reliable, monitored systems, from lead-qualification pipelines to internal document-processing agents. I build websites and applications whilst integrating automation into the core framework. Comfortable owning a project end-to-end.`,

  bio: {
    firstPerson: `Hi! I’m Ukeme, a full-stack developer who got tired of doing boring and repetitive work (Why do I have to start checking my Gmail and respond when I'm trying to work on a website?). So I started building the systems that do it for me and for my websites too, and then I'm like, "Hold on! Others could benefit from this too!"

I design and ship web apps end-to-end. Then I automate everything around them: the forms that route themselves, the reports that write themselves, the follow-ups I have to create a reminder for? Most of my work lives in the gap between “this should be automatic” and “somehow it still isn’t.”

I’m based in Lagos, I’ve been building for 2 years, and I care about work that is not system-reliant.`,
    
    specSheet: [
      { index: "01", label: "Based in", value: "Lagos, Nigeria (WAT / GMT+1)" },
      { index: "02", label: "Languages", value: "Python, TypeScript/JavaScript, SQL, Bash" },
      { index: "03", label: "Currently building", value: "Multi-agent RAG knowledge routing & n8n orchestration pipelines" },
    ] as SpecItem[],

    marginNotes: [
      { text: "hi, that's me", rotation: -6 },
      { text: "zero patience for busywork", rotation: 4 },
      { text: "code runs while I sleep", rotation: -3 },
    ],
  },

  technicalSkills: {
    languages: ["Python", "TypeScript / JavaScript", "SQL", "Bash"],
    automation: [
      "n8n Orchestration",
      "Make.com",
      "Zapier",
      "PowerShell Automation",
      "Custom Python Agents",
      "Webhook / API Routing",
      "RPA (UiPath)",
    ],
    dataInfra: ["PostgreSQL", "Docker", "Vector DBs", "Airtable"],
    practices: [
      "Process discovery & mapping",
      "Workflow telemetry & monitoring",
      "Full-Stack Web & App Development",
      "Technical architecture documentation",
    ],
  },

  experience: [
    {
      id: "exp-01",
      period: "September 2026 – Present",
      role: "AI Automation Specialist",
      company: "Futybills Tech",
      location: "Akwa Ibom, Nigeria",
      status: "CURRENT",
      bullets: [
        "Built n8n and Zapier workflows connecting CRM, billing, and support tools, eliminating an estimated 15 hours/week of manual data entry across teams.",
        "Designed and shipped a Retrieval-Augmented Generation (RAG) internal support agent over 40k+ knowledge-based articles, cutting average ticket resolution time by 35%.",
        "Built a Python automation pipeline that converts a topic or script into finished short-form or long-form videos (with neural voiceovers and matched stock images and videos) using free APIs and local tools like PowerShell, cutting production from hours of manual work to a few commands.",
      ],
    },
    {
      id: "exp-02",
      period: "June 2026 – September 2026",
      role: "Junior Software Programmer, Automation",
      company: "River State High Court",
      location: "Port Harcourt, Rivers State",
      status: "COMPLETED",
      bullets: [
        "Built a full-stack locally hosted portal that automates High Court quarterly returns and case analytics by syncing live Excel data into interactive dashboards featuring performance matrices, judgment tracking, case-age analytics, and print-ready official reports.",
      ],
    },
    {
      id: "exp-03",
      period: "July 2025 – June 2026",
      role: "Junior Software Programmer, Intern AI Automation Specialist",
      company: "Zeerocodes Labs",
      location: "Remote",
      status: "COMPLETED",
      bullets: [
        "Designed and built a complete multi-workflow automation system in n8n for a private security company, covering daily shift management, real-time guard check-ins, absence detection, and incident reporting.",
        "Developed a Python + LLM document-summarization tool for the customer service team, reducing account-review prep time by 60%.",
        "Wrote internal RPA scripts (UiPath, Python) that automated recurring reporting tasks, saving the finance team roughly 6 hours per week.",
      ],
    },
  ] as ExperienceItem[],

  education: [
    {
      institution: "Futybills Tech Academy",
      location: "Uyo, Akwa Ibom State",
      period: "2025 – 2026",
      degree: "Certificate in AI Automation and AI-Powered Software Development",
    },
    {
      institution: "University of Uyo at Akwa Ibom",
      location: "Akwa Ibom, Nigeria",
      period: "2021 – 2025",
      degree: "B.S. in Human Anatomy",
    },
  ] as EducationItem[],

  certifications: [
    "Human Anatomy — University of Uyo",
    "AI Automation and AI-Powered Software Development — Futybills Tech Academy",
  ],

  projects: [
    {
      id: "p-edunotify",
      slug: "edunotify-school-portal",
      title: "EduNotify – School Portal Web Application",
      tagline: "Full-stack school management portal with role-based auth, secure server-side fetching, and automated record sync.",
      category: "fullstack",
      year: "2026",
      metrics: [
        { label: "Deployment", value: "Vercel", unit: "Edge" },
        { label: "Role Auth", value: "Admin + Parent", unit: "Secured" },
        { label: "Backend Sync", value: "Airtable", unit: "API" },
      ],
      pipeline: {
        input: "Parent / Student Portal Requests",
        process: "Next.js 15 Server-Side Rendering + Role Gatekeeper",
        output: "Live Academic Records & Automated Parent Notifications",
      },
      overview: {
        problem: "Schools struggled with paper records and fragmented parent communication for fees, attendance, and quarterly grades.",
        built: "Designed and developed a responsive modern web application using Next.js 15, TypeScript, Tailwind CSS, and Airtable backend with environment variable security.",
        result: "Instant parent self-service for results and notices, with zero server management overhead for school staff.",
      },
      stack: ["Next.js 15", "TypeScript", "Tailwind CSS", "Airtable API", "Vercel"],
      architecture: {
        nodes: [
          { id: "ed-1", label: "Parent / Admin Client", type: "trigger", x: 10, y: 50 },
          { id: "ed-2", label: "Next.js 15 Edge Server", type: "action", x: 45, y: 50 },
          { id: "ed-3", label: "Airtable Secure DB", type: "database", x: 80, y: 50 },
        ],
        edges: [
          { from: "ed-1", to: "ed-2", label: "authenticated session" },
          { from: "ed-2", to: "ed-3", label: "read/write sync" },
        ],
      },
      liveUrl: "https://edunotify-keme29.vercel.app",
    },
    {
      id: "p-rag",
      slug: "rag-knowledge-support-agent",
      title: "40k+ Article RAG Support Agent & Vector Dispatcher",
      tagline: "Cut ticket resolution time by 35% across thousands of enterprise knowledge articles.",
      category: "automation",
      year: "2026",
      metrics: [
        { label: "Articles Indexed", value: "40,000+", unit: "Docs" },
        { label: "Resolution Time Cut", value: "35", unit: "%" },
        { label: "Staff Hours Saved", value: "15", unit: "hrs/wk" },
      ],
      pipeline: {
        input: "Customer Support Ticket / Inbound Chat",
        process: "Vector Similarity Retrieval + LLM Synthesis",
        output: "Contextual Resolution Draft + Verified Source Citations",
      },
      overview: {
        problem: "Support teams were flooded with complex queries requiring endless manual documentation lookups across 40,000+ support files.",
        built: "Engineered an intelligent Retrieval-Augmented Generation agent integrated with n8n and Zapier orchestrating CRM and billing tools.",
        result: "Reduced average resolution duration by 35% while eliminating 15 hours per week of manual data entry.",
      },
      stack: ["n8n", "Python", "Vector DB", "LLM APIs", "Zapier", "PostgreSQL"],
      architecture: {
        nodes: [
          { id: "rag-1", label: "Support Ticket Trigger", type: "trigger", x: 10, y: 50 },
          { id: "rag-2", label: "Vector Search (40k Docs)", type: "database", x: 45, y: 30 },
          { id: "rag-3", label: "LLM Synthesizer", type: "ai", x: 45, y: 70 },
          { id: "rag-4", label: "CRM & Ticket Dispatch", type: "action", x: 85, y: 50 },
        ],
        edges: [
          { from: "rag-1", to: "rag-2", label: "query embedding" },
          { from: "rag-2", to: "rag-3", label: "top k chunks" },
          { from: "rag-3", to: "rag-4", label: "resolved answer" },
        ],
      },
    },
    {
      id: "p-court",
      slug: "high-court-analytics-portal",
      title: "High Court Quarterly Returns & Judgment Analytics",
      tagline: "Locally hosted analytics portal converting Excel data into real-time legal analytics.",
      category: "hybrid",
      year: "2026",
      metrics: [
        { label: "Report Generation", value: "Instant", unit: "PDF" },
        { label: "Data Source", value: "Live Excel", unit: "Sync" },
      ],
      pipeline: {
        input: "Quarterly High Court Case Spreadsheets",
        process: "Automated Data Ingestion & Metric Normalization",
        output: "Performance Matrices, Judgment Tracking & Print Reports",
      },
      overview: {
        problem: "Judicial staff spent weeks compiling paper quarterly returns and calculating case age analytics manually from disconnected spreadsheets.",
        built: "A locally hosted full-stack portal synchronizing live spreadsheet updates into interactive dashboards with judgment tracking and print-ready returns.",
        result: "Zero compilation lag and instant official audit reporting for High Court registrars.",
      },
      stack: ["Full-Stack", "JavaScript", "Python", "Excel Automation", "Dashboards"],
      architecture: {
        nodes: [
          { id: "hc-1", label: "Court Case Excel Sheets", type: "trigger", x: 10, y: 50 },
          { id: "hc-2", label: "ETL Normalization Worker", type: "action", x: 45, y: 50 },
          { id: "hc-3", label: "Analytics Dashboard", type: "action", x: 80, y: 50 },
        ],
        edges: [
          { from: "hc-1", to: "hc-2", label: "file ingestion" },
          { from: "hc-2", to: "hc-3", label: "metrics feed" },
        ],
      },
    },
    {
      id: "p-video",
      slug: "neural-video-automation-pipeline",
      title: "Script-to-Video Autonomous Rendering Engine",
      tagline: "Converts raw scripts into complete videos with neural voiceovers and stock b-roll via local CLI.",
      category: "automation",
      year: "2026",
      metrics: [
        { label: "Production Time", value: "Minutes", unit: "from hours" },
        { label: "Cost Per Video", value: "$0.00", unit: "Free APIs" },
      ],
      pipeline: {
        input: "Text Topic or Script",
        process: "Neural TTS + Stock Clip Matcher + FFmpeg Assembly",
        output: "Finished Short-Form / Long-Form Rendered Video",
      },
      overview: {
        problem: "Creating video content required hours of repetitive voice recording, b-roll searching, and timeline slicing.",
        built: "Python automation pipeline orchestrating free APIs and PowerShell scripts to automatically synthesize neural speech and assemble matched footage.",
        result: "Production reduced from hours of manual video editing to a single command.",
      },
      stack: ["Python", "PowerShell", "FFmpeg", "Free APIs", "Neural TTS"],
      architecture: {
        nodes: [
          { id: "vid-1", label: "Script CLI Prompt", type: "trigger", x: 10, y: 50 },
          { id: "vid-2", label: "Neural Audio Synthesis", type: "ai", x: 45, y: 30 },
          { id: "vid-3", label: "Media Sourcing & Assembly", type: "action", x: 80, y: 50 },
        ],
        edges: [
          { from: "vid-1", to: "vid-2", label: "script payload" },
          { from: "vid-2", to: "vid-3", label: "audio + cues" },
        ],
      },
    },
    {
      id: "p-security",
      slug: "guard-shift-n8n-automation",
      title: "Multi-Workflow Private Security Ops System",
      tagline: "Full-scale n8n operations system for shift management, real-time check-ins, and absence detection.",
      category: "automation",
      year: "2025",
      metrics: [
        { label: "Absence Detection", value: "Real-time", unit: "Automated" },
        { label: "Prep Time Reduced", value: "60", unit: "%" },
        { label: "Finance Time Saved", value: "6", unit: "hrs/wk" },
      ],
      pipeline: {
        input: "Guard Mobile Check-in Ping",
        process: "n8n Stateful Logic + Absence Fallback",
        output: "Supervisor Escalation + Client Real-time Audit",
      },
      overview: {
        problem: "Security firms struggled with missed shift check-ins, ghost guarding, and late manual incident reports.",
        built: "Engineered multi-workflow n8n system with automated absence detection, document summarization with Python LLMs, and UiPath RPA scripts.",
        result: "Saved 6 hours/week for finance and reduced customer service account-prep by 60%.",
      },
      stack: ["n8n", "Python", "UiPath", "LLM APIs", "Webhooks"],
      architecture: {
        nodes: [
          { id: "sec-1", label: "Guard Location Ping", type: "trigger", x: 10, y: 50 },
          { id: "sec-2", label: "n8n Workflow Controller", type: "action", x: 45, y: 50 },
          { id: "sec-3", label: "Alert Dispatch / DB Log", type: "action", x: 80, y: 50 },
        ],
        edges: [
          { from: "sec-1", to: "sec-2", label: "location token" },
          { from: "sec-2", to: "sec-3", label: "verified dispatch" },
        ],
      },
    },
  ] as ProjectItem[],

  toolbox: {
    contextText: [
      "I do not view tools as identity badges, but as precision levers.",
      "Frontend work is built to be fast, tactile, and accessible to human beings.",
      "Automation architecture is built to run quietly, fail loudly, and never drop a packet.",
    ],
    build: [
      { name: "Python", label: "Automation Core" },
      { name: "TypeScript", label: "Type Safety" },
      { name: "JavaScript", label: "Web Runtime" },
      { name: "Next.js 15", label: "App Framework" },
      { name: "React 18", label: "UI Systems" },
      { name: "Tailwind CSS", label: "Design System" },
      { name: "PostgreSQL", label: "Relational DB" },
      { name: "Docker", label: "Containerization" },
      { name: "Bash / CLI", label: "Scripting" },
    ],
    automate: [
      { name: "n8n", label: "Workflow Orchestration" },
      { name: "Make.com", label: "Integrations" },
      { name: "Zapier", label: "App Automation" },
      { name: "PowerShell", label: "System Automation" },
      { name: "Python Agents", label: "Autonomous Workers" },
      { name: "RAG Pipelines", label: "Knowledge Retrieval" },
      { name: "Webhooks", label: "Event Listeners" },
      { name: "RPA (UiPath)", label: "Process Automation" },
    ],
  },

  principles: [
    {
      number: "01",
      title: "Automate the boring. Keep the human.",
      note: "Computers execute; humans evaluate taste, empathy, and strategy.",
      tag: "DRAFT",
    },
    {
      number: "02",
      title: "Do it by hand twice before you build it.",
      note: "Premature automation codifies friction into permanent debt.",
      tag: "DRAFT",
    },
    {
      number: "03",
      title: "If it can't fail loudly, it isn't done.",
      note: "Silent failures create phantom confidence. Notify the human.",
      tag: "DRAFT",
    },
    {
      number: "04",
      title: "Hairline precision, warm editorial soul.",
      note: "A tool should feel as tactile and thoughtful as physical paper.",
      tag: "DRAFT",
    },
    {
      number: "05",
      title: "Latency is the enemy of momentum.",
      note: "Fast APIs, instant feedback loops, zero perceptual lag.",
      tag: "DRAFT",
    },
  ] as PrincipleItem[],

  testimonials: [
    {
      quote: "[PLACEHOLDER] Ukeme replaced what used to take our ops coordinator two hours every morning with a single silent webhook that has not failed once in four months.",
      author: "[Client Name]",
      role: "Operations Director",
      company: "[Tech Studio]",
    },
    {
      quote: "[PLACEHOLDER] Finding someone who can code an Awwwards-worthy frontend and also wire up multi-agent backend systems is ridiculously rare. He delivered beyond expectations.",
      author: "[Partner Name]",
      role: "Founder & Creative Lead",
      company: "[Design Agency]",
    },
    {
      quote: "[PLACEHOLDER] The architecture diagrams alone saved us weeks of debate. The systems he built are clean, self-documenting, and human-friendly.",
      author: "[Lead Engineer]",
      role: "VP of Engineering",
      company: "[SaaS Enterprise]",
    },
  ] as TestimonialItem[],

  services: [
    {
      index: "01",
      title: "Automation\nAudit",
      badge: "DISCOVERY",
      description: "I find the repetitive work hiding in your week.",
      steps: [
        "We talk through how your team works today.",
        "I map what can run on its own.",
        "You get a clear plan, ranked by time saved.",
      ],
    },
    {
      index: "02",
      title: "Build a System",
      badge: "DELIVERY",
      description: "A website or tool with the automation built in.",
      steps: [
        "We agree on what it must do.",
        "I design, build and test it with you.",
        "I hand it over with simple docs.",
      ],
    },
    {
      index: "03",
      title: "Embedded /\nRetainer",
      badge: "PARTNERSHIP",
      description: "Ongoing help, a few days a month.",
      steps: [
        "We set priorities each month.",
        "I build and fix as things come up.",
        "You get a short report of what changed.",
      ],
    },
  ] as ServiceItem[],

  links: {
    email: "ukemeobonguduak@gmail.com",
    phone: "(+234) 0813 549 4115",
    github: "https://github.com/Keme28",
    githubHandle: "@Keme28",
    linkedin: "https://www.linkedin.com/in/ukeme-umoudofia-ba009b239",
    resumePdf: "/ukemeobong-umoudofia-cv.pdf",
    calendly: "[PLACEHOLDER: Consultation booking link]",
    googleDrive: "https://drive.google.com/drive/folders/1FVFIONSv3IdPPicoFdv7aD632j9Y1Tkq?usp=drive_link",
  },

  intro: {
    command: "run: who_is Keme",
    checks: [
      "developer",
      "automation specialist",
      "Lagos",
      "ships things",
    ],
    ctaText: "RUN",
    skipText: "Skip intro [ESC]",
  },

  navigation: [
    { number: "01", label: "Home", href: "#hero" },
    { number: "02", label: "About", href: "#about" },
    { number: "03", label: "Journey", href: "#journey" },
    { number: "04", label: "Work", href: "#work" },
    { number: "05", label: "Contact", href: "#contact" },
  ],
};
