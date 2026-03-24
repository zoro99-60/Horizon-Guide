import {
  Brain,
  Globe,
  Database,
  Shield,
  Cog,
  Smartphone,
  type LucideIcon,
} from "lucide-react"

// ─── Types ───────────────────────────────────────────────────────────
export interface Domain {
  id: string
  title: string
  shortDescription: string
  overview: string
  icon: LucideIcon
  colorClass: string
  bgClass: string
  skills: string[]
  roles: string[]
  salaryRange: string
  futureScope: string
}

export interface RoadmapPhase {
  title: string
  weeks: string
  description: string
  skills: string[]
  tools: string[]
  resources: string[]
  projects: string[]
}

export interface QuizQuestion {
  id: number
  question: string
  options: { label: string; weights: Record<string, number> }[]
}

export interface Discussion {
  id: number
  title: string
  author: string
  avatar: string
  domain: string
  replies: number
  timestamp: string
  preview: string
  featured?: boolean
}

export interface Testimonial {
  name: string
  branch: string
  quote: string
  avatar: string
}

export interface Feature {
  title: string
  description: string
  icon: LucideIcon
}

// ─── Domains ─────────────────────────────────────────────────────────
export const domains: Domain[] = [
  {
    id: "ai-ml",
    title: "AI & Machine Learning",
    shortDescription: "Build intelligent systems that learn and adapt.",
    overview:
      "Artificial Intelligence and Machine Learning are transforming every industry. From self-driving cars to medical diagnostics, AI engineers build systems that can learn from data, recognize patterns, and make decisions. This field combines mathematics, statistics, and programming to create models that replicate human intelligence.",
    icon: Brain,
    colorClass: "text-violet-600 dark:text-violet-400",
    bgClass: "bg-violet-100 dark:bg-violet-950/50",
    skills: ["Python", "TensorFlow", "PyTorch", "Statistics", "Linear Algebra", "NLP", "Computer Vision", "Deep Learning", "Scikit-learn", "Data Preprocessing"],
    roles: ["ML Engineer", "Data Scientist", "AI Researcher", "NLP Engineer", "Computer Vision Engineer", "MLOps Engineer"],
    salaryRange: "₹8L - ₹15L",
    futureScope: "AI/ML continues to be the fastest-growing tech domain. With the rise of generative AI, LLMs, and autonomous systems, demand for skilled professionals is expected to grow 40% by 2030.",
  },
  {
    id: "web-dev",
    title: "Web Development",
    shortDescription: "Create modern, responsive web applications.",
    overview:
      "Web development encompasses building and maintaining websites and web applications. Full-stack developers work across the entire stack from databases and servers to user interfaces. Modern web development focuses on performance, accessibility, and user experience with frameworks like React, Next.js, and Node.js.",
    icon: Globe,
    colorClass: "text-blue-600 dark:text-blue-400",
    bgClass: "bg-blue-100 dark:bg-blue-950/50",
    skills: ["JavaScript", "TypeScript", "React", "Next.js", "Node.js", "CSS", "HTML", "PostgreSQL", "REST APIs", "GraphQL"],
    roles: ["Frontend Developer", "Backend Developer", "Full Stack Developer", "DevOps Engineer", "UI Engineer", "Web Architect"],
    salaryRange: "₹6L - ₹14L",
    futureScope: "Web development remains a cornerstone of tech. The shift to server components, edge computing, and AI-enhanced development tools is creating new opportunities for developers who stay current.",
  },
  {
    id: "data-science",
    title: "Data Science",
    shortDescription: "Extract insights from complex datasets.",
    overview:
      "Data Science combines domain expertise, programming skills, and knowledge of mathematics and statistics to extract meaningful insights from data. Data scientists use visualization, machine learning, and statistical analysis to inform business decisions and drive innovation.",
    icon: Database,
    colorClass: "text-emerald-600 dark:text-emerald-400",
    bgClass: "bg-emerald-100 dark:bg-emerald-950/50",
    skills: ["Python", "R", "SQL", "Pandas", "NumPy", "Matplotlib", "Tableau", "Statistics", "A/B Testing", "ETL Pipelines"],
    roles: ["Data Scientist", "Data Analyst", "Business Intelligence Analyst", "Data Engineer", "Analytics Manager", "Quantitative Analyst"],
    salaryRange: "₹7L - ₹14L",
    futureScope: "As organizations become more data-driven, the demand for data scientists continues to rise. Specializations in real-time analytics, AI-powered insights, and data governance are emerging as key growth areas.",
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    shortDescription: "Protect systems and data from digital threats.",
    overview:
      "Cybersecurity involves protecting computer systems, networks, and data from digital attacks. Security professionals identify vulnerabilities, implement defenses, and respond to incidents. With increasing cyber threats, this field is critical to every organization's operations.",
    icon: Shield,
    colorClass: "text-red-600 dark:text-red-400",
    bgClass: "bg-red-100 dark:bg-red-950/50",
    skills: ["Network Security", "Ethical Hacking", "SIEM", "Cryptography", "Penetration Testing", "Firewalls", "Incident Response", "Linux", "Python", "Compliance"],
    roles: ["Security Analyst", "Penetration Tester", "Security Architect", "CISO", "Incident Responder", "Security Consultant"],
    salaryRange: "₹7L - ₹15L",
    futureScope: "Cybersecurity is one of the most in-demand fields globally. With the expansion of IoT, cloud computing, and AI-powered threats, the need for skilled security professionals will only increase.",
  },
  {
    id: "core-eng",
    title: "Core Engineering",
    shortDescription: "Master fundamentals of mechanical and electrical systems.",
    overview:
      "Core Engineering encompasses traditional engineering disciplines including mechanical, electrical, and civil engineering. These roles focus on designing, building, and maintaining physical systems and infrastructure. Modern core engineering increasingly integrates software, IoT, and automation.",
    icon: Cog,
    colorClass: "text-orange-600 dark:text-orange-400",
    bgClass: "bg-orange-100 dark:bg-orange-950/50",
    skills: ["CAD/CAM", "MATLAB", "Thermodynamics", "Circuit Design", "PLC Programming", "SolidWorks", "Arduino", "Control Systems", "Manufacturing", "3D Printing"],
    roles: ["Mechanical Engineer", "Electrical Engineer", "Design Engineer", "Manufacturing Engineer", "Automation Engineer", "Project Manager"],
    salaryRange: "₹5L - ₹12L",
    futureScope: "Core engineering is evolving with Industry 4.0, smart manufacturing, and sustainable energy. Engineers who combine traditional skills with software and IoT expertise are highly valued.",
  },
  {
    id: "mobile-dev",
    title: "Mobile Development",
    shortDescription: "Build apps for iOS and Android platforms.",
    overview:
      "Mobile development involves creating applications for smartphones and tablets. Developers use platforms like React Native, Flutter, Swift, and Kotlin to build native or cross-platform apps. The mobile ecosystem continues to evolve with new capabilities and form factors.",
    icon: Smartphone,
    colorClass: "text-teal-600 dark:text-teal-400",
    bgClass: "bg-teal-100 dark:bg-teal-950/50",
    skills: ["React Native", "Flutter", "Swift", "Kotlin", "TypeScript", "Firebase", "REST APIs", "UI/UX Design", "App Store Optimization", "Push Notifications"],
    roles: ["iOS Developer", "Android Developer", "Mobile App Developer", "React Native Developer", "Flutter Developer", "Mobile Architect"],
    salaryRange: "₹6L - ₹13L",
    futureScope: "Mobile development continues to grow with AR/VR integration, wearable devices, and super apps. Cross-platform frameworks are making it easier to build for multiple platforms simultaneously.",
  },
]

// ─── Roadmap Templates ───────────────────────────────────────────────
export const roadmapTemplates: Record<string, RoadmapPhase[]> = {
  "ai-ml": [
    {
      title: "Phase 1: Foundations",
      weeks: "Weeks 1-4",
      description: "Build a solid mathematical and programming foundation for AI/ML.",
      skills: ["Python Basics", "Linear Algebra", "Probability & Statistics", "NumPy & Pandas"],
      tools: ["Jupyter Notebook", "Google Colab", "Anaconda", "VS Code"],
      resources: ["Khan Academy (Linear Algebra)", "Python for Data Science (Coursera)", "3Blue1Brown Essence of Linear Algebra"],
      projects: ["Data Analysis on a CSV Dataset", "Statistical Visualizations with Matplotlib"],
    },
    {
      title: "Phase 2: Core ML",
      weeks: "Weeks 5-10",
      description: "Learn core machine learning algorithms and techniques.",
      skills: ["Supervised Learning", "Unsupervised Learning", "Feature Engineering", "Model Evaluation"],
      tools: ["Scikit-learn", "Pandas", "Matplotlib", "Seaborn"],
      resources: ["Andrew Ng Machine Learning (Coursera)", "Hands-On Machine Learning (Book)", "Kaggle Learn"],
      projects: ["House Price Prediction", "Customer Segmentation with K-Means", "Spam Email Classifier"],
    },
    {
      title: "Phase 3: Deep Learning",
      weeks: "Weeks 11-16",
      description: "Dive into neural networks and deep learning frameworks.",
      skills: ["Neural Networks", "CNNs", "RNNs/LSTMs", "Transfer Learning", "NLP Basics"],
      tools: ["TensorFlow", "PyTorch", "Keras", "Hugging Face"],
      resources: ["Deep Learning Specialization (Coursera)", "Fast.ai Practical Deep Learning", "PyTorch Tutorials"],
      projects: ["Image Classification with CNNs", "Sentiment Analysis on Movie Reviews", "Text Generation Model"],
    },
    {
      title: "Phase 4: Projects & Career Prep",
      weeks: "Weeks 17-20",
      description: "Build a portfolio and prepare for ML engineering roles.",
      skills: ["Model Deployment", "MLOps", "API Development", "Research Papers"],
      tools: ["Docker", "FastAPI", "MLflow", "AWS SageMaker"],
      resources: ["Made With ML", "Papers With Code", "ML System Design (Book)"],
      projects: ["End-to-End ML Pipeline", "Deploy a Model as a REST API", "Contribute to an Open Source ML Project"],
    },
  ],
  "web-dev": [
    {
      title: "Phase 1: Foundations",
      weeks: "Weeks 1-4",
      description: "Master the building blocks of the web.",
      skills: ["HTML5", "CSS3", "JavaScript ES6+", "Responsive Design"],
      tools: ["VS Code", "Chrome DevTools", "Git & GitHub", "Figma"],
      resources: ["MDN Web Docs", "freeCodeCamp", "The Odin Project"],
      projects: ["Personal Portfolio Website", "Responsive Landing Page"],
    },
    {
      title: "Phase 2: Frontend Frameworks",
      weeks: "Weeks 5-10",
      description: "Learn modern frontend development with React.",
      skills: ["React", "TypeScript", "State Management", "Tailwind CSS", "Component Architecture"],
      tools: ["Next.js", "Vite", "React DevTools", "shadcn/ui"],
      resources: ["React Docs (react.dev)", "TypeScript Handbook", "Next.js Tutorial"],
      projects: ["Task Management App", "Weather Dashboard", "E-commerce Product Page"],
    },
    {
      title: "Phase 3: Full Stack",
      weeks: "Weeks 11-16",
      description: "Build complete applications with backend and database skills.",
      skills: ["Node.js", "REST API Design", "PostgreSQL", "Authentication", "ORM (Prisma)"],
      tools: ["Express.js", "Prisma", "Supabase", "Postman"],
      resources: ["Node.js Docs", "Prisma Getting Started", "Supabase Tutorials"],
      projects: ["Blog Platform with Auth", "Real-time Chat Application", "API with CRUD Operations"],
    },
    {
      title: "Phase 4: Projects & Career Prep",
      weeks: "Weeks 17-20",
      description: "Deploy production apps and prepare for developer roles.",
      skills: ["Deployment", "CI/CD", "Performance Optimization", "Testing"],
      tools: ["Vercel", "GitHub Actions", "Jest", "Playwright"],
      resources: ["Vercel Docs", "Testing Library Docs", "Web.dev Performance"],
      projects: ["Full Stack SaaS Application", "Open Source Contribution", "Technical Blog"],
    },
  ],
  "data-science": [
    {
      title: "Phase 1: Foundations",
      weeks: "Weeks 1-4",
      description: "Build core data manipulation and statistical skills.",
      skills: ["Python", "Statistics", "Pandas", "Data Cleaning"],
      tools: ["Jupyter Notebook", "Anaconda", "Excel", "Google Sheets"],
      resources: ["Statistics with Python (Coursera)", "Pandas Documentation", "Kaggle Intro to Data Science"],
      projects: ["Exploratory Data Analysis on a Dataset", "Statistical Summary Dashboard"],
    },
    {
      title: "Phase 2: Analysis & Visualization",
      weeks: "Weeks 5-10",
      description: "Master data visualization and analytical techniques.",
      skills: ["Data Visualization", "SQL", "A/B Testing", "Hypothesis Testing", "ETL"],
      tools: ["Matplotlib", "Seaborn", "Plotly", "Tableau", "PostgreSQL"],
      resources: ["Storytelling with Data (Book)", "Mode Analytics SQL Tutorial", "Tableau Public Tutorials"],
      projects: ["Interactive Dashboard", "A/B Test Analysis", "SQL Data Pipeline"],
    },
    {
      title: "Phase 3: Advanced Analytics",
      weeks: "Weeks 11-16",
      description: "Apply machine learning and advanced statistical methods.",
      skills: ["Predictive Modeling", "Time Series", "Clustering", "Regression", "NLP"],
      tools: ["Scikit-learn", "Statsmodels", "NLTK", "Apache Spark"],
      resources: ["Applied Data Science with Python (Coursera)", "Introduction to Statistical Learning (Book)"],
      projects: ["Sales Forecasting Model", "Customer Churn Prediction", "Text Mining Analysis"],
    },
    {
      title: "Phase 4: Projects & Career Prep",
      weeks: "Weeks 17-20",
      description: "Build a portfolio and prepare for data science roles.",
      skills: ["Presentation Skills", "Business Acumen", "Model Deployment", "Report Writing"],
      tools: ["Streamlit", "PowerBI", "Docker", "AWS"],
      resources: ["Data Science Interview Prep", "Kaggle Competitions", "Towards Data Science"],
      projects: ["End-to-End Data Science Project", "Kaggle Competition Entry", "Data-Driven Business Case Study"],
    },
  ],
  "cybersecurity": [
    {
      title: "Phase 1: Foundations",
      weeks: "Weeks 1-4",
      description: "Understand networking fundamentals and security basics.",
      skills: ["Networking (TCP/IP)", "Linux Administration", "Operating Systems", "Security Fundamentals"],
      tools: ["Wireshark", "VirtualBox", "Kali Linux", "Terminal"],
      resources: ["CompTIA Network+ Study Guide", "Linux Journey", "Cybrary Intro to Cybersecurity"],
      projects: ["Set Up a Home Lab with VMs", "Network Traffic Analysis"],
    },
    {
      title: "Phase 2: Offensive Security",
      weeks: "Weeks 5-10",
      description: "Learn penetration testing and vulnerability assessment.",
      skills: ["Penetration Testing", "Web App Security", "Vulnerability Scanning", "Social Engineering"],
      tools: ["Burp Suite", "Nmap", "Metasploit", "OWASP ZAP"],
      resources: ["TryHackMe", "HackTheBox", "OWASP Top 10", "PortSwigger Web Security Academy"],
      projects: ["Capture the Flag Challenges", "Web Application Security Audit", "Vulnerability Report"],
    },
    {
      title: "Phase 3: Defensive Security",
      weeks: "Weeks 11-16",
      description: "Master defense strategies and incident response.",
      skills: ["SIEM", "Incident Response", "Forensics", "Compliance", "Cryptography"],
      tools: ["Splunk", "ELK Stack", "Snort", "OpenSSL"],
      resources: ["SANS Cyber Defense", "Blue Team Field Manual", "Incident Response Handbook"],
      projects: ["SIEM Dashboard Setup", "Incident Response Playbook", "Cryptography Implementation"],
    },
    {
      title: "Phase 4: Projects & Career Prep",
      weeks: "Weeks 17-20",
      description: "Prepare for security certifications and roles.",
      skills: ["Security Architecture", "Risk Assessment", "Policy Writing", "Certification Prep"],
      tools: ["AWS Security", "Azure Security Center", "GRC Tools"],
      resources: ["CompTIA Security+ Study Guide", "CEH Study Materials", "NIST Framework"],
      projects: ["Complete Security Audit Report", "Security Policy Document", "CTF Competition Participation"],
    },
  ],
  "core-eng": [
    {
      title: "Phase 1: Foundations",
      weeks: "Weeks 1-4",
      description: "Strengthen core engineering principles and CAD skills.",
      skills: ["Engineering Mechanics", "Thermodynamics", "CAD Basics", "Technical Drawing"],
      tools: ["AutoCAD", "SolidWorks", "MATLAB", "MS Excel"],
      resources: ["MIT OpenCourseWare", "SolidWorks Tutorials", "Engineering Fundamentals Textbook"],
      projects: ["3D Model of a Simple Machine", "Engineering Calculations Spreadsheet"],
    },
    {
      title: "Phase 2: Specialization",
      weeks: "Weeks 5-10",
      description: "Deep dive into your engineering specialization.",
      skills: ["Advanced CAD/CAM", "FEA/CFD", "Circuit Design", "Material Science"],
      tools: ["ANSYS", "SolidWorks Simulation", "Arduino", "LabVIEW"],
      resources: ["ANSYS Student Tutorials", "Arduino Project Hub", "Engineering Explained (YouTube)"],
      projects: ["Structural Analysis Project", "IoT Sensor Prototype", "Simulation of a Physical System"],
    },
    {
      title: "Phase 3: Industry Skills",
      weeks: "Weeks 11-16",
      description: "Learn industry-relevant tools and modern engineering practices.",
      skills: ["PLC Programming", "Automation", "Quality Control", "Project Management"],
      tools: ["Siemens TIA Portal", "3D Printer", "ERP Systems", "Jira"],
      resources: ["Lean Manufacturing Principles", "Six Sigma Yellow Belt", "PLC Programming Tutorials"],
      projects: ["Automation Control System", "Quality Improvement Case Study", "3D Printed Prototype"],
    },
    {
      title: "Phase 4: Projects & Career Prep",
      weeks: "Weeks 17-20",
      description: "Build portfolio projects and prepare for engineering roles.",
      skills: ["Technical Reporting", "Presentation", "Industry Standards", "Interview Prep"],
      tools: ["MS Project", "LaTeX", "GitHub Portfolio"],
      resources: ["Engineering Resume Guide", "GATE Preparation (if applicable)", "Industry Webinars"],
      projects: ["Capstone Engineering Project", "Technical Paper/Report", "Industry Problem Solution"],
    },
  ],
  "mobile-dev": [
    {
      title: "Phase 1: Foundations",
      weeks: "Weeks 1-4",
      description: "Learn mobile development fundamentals and UI design.",
      skills: ["JavaScript/TypeScript", "UI/UX Principles", "Mobile Design Patterns", "Git"],
      tools: ["VS Code", "Figma", "Expo", "Android Studio / Xcode"],
      resources: ["React Native Docs", "Flutter Getting Started", "Human Interface Guidelines", "Material Design"],
      projects: ["Simple Calculator App", "Profile Card UI"],
    },
    {
      title: "Phase 2: Framework Mastery",
      weeks: "Weeks 5-10",
      description: "Build real mobile apps with a modern framework.",
      skills: ["React Native / Flutter", "Navigation", "State Management", "API Integration"],
      tools: ["React Navigation", "Redux/Zustand", "Axios", "Firebase"],
      resources: ["React Native Tutorial (official)", "Flutter Cookbook", "State Management Patterns"],
      projects: ["Todo App with Persistence", "News Reader App", "Weather App with API"],
    },
    {
      title: "Phase 3: Advanced Features",
      weeks: "Weeks 11-16",
      description: "Implement advanced mobile features and native capabilities.",
      skills: ["Push Notifications", "Offline Storage", "Animations", "Native Modules", "Testing"],
      tools: ["Firebase Cloud Messaging", "SQLite/Realm", "Reanimated", "Detox/Appium"],
      resources: ["Advanced React Native Patterns", "Firebase Documentation", "App Performance Optimization"],
      projects: ["Social Media App with Chat", "Fitness Tracker with Charts", "Offline-First App"],
    },
    {
      title: "Phase 4: Projects & Career Prep",
      weeks: "Weeks 17-20",
      description: "Publish apps and prepare for mobile developer roles.",
      skills: ["App Store Deployment", "CI/CD for Mobile", "Analytics", "Monetization"],
      tools: ["App Store Connect", "Google Play Console", "Fastlane", "CodePush"],
      resources: ["App Store Optimization Guide", "Mobile Dev Interview Prep", "App Marketing Basics"],
      projects: ["Publish an App to Store", "Portfolio App Showcasing Projects", "Open Source Mobile Library"],
    },
  ],
}

// ─── Company Data (by domain) ───────────────────────────────────────
export interface CompanyRole {
  title: string
  salaryRange: string
  level: string
  applyUrl: string
}

export interface Company {
  name: string
  logo: string
  industry: string
  roles: CompanyRole[]
}

export const companiesByDomain: Record<string, Company[]> = {
  "ai-ml": [
    {
      name: "Google DeepMind",
      logo: "GD",
      industry: "Technology / AI Research",
      roles: [
        { title: "ML Engineer", salaryRange: "₹18L - ₹35L", level: "Mid-Senior", applyUrl: "https://careers.google.com" },
        { title: "AI Research Scientist", salaryRange: "₹25L - ₹50L", level: "Senior", applyUrl: "https://careers.google.com" },
        { title: "NLP Engineer", salaryRange: "₹16L - ₹30L", level: "Mid", applyUrl: "https://careers.google.com" },
        { title: "MLOps Engineer", salaryRange: "₹14L - ₹28L", level: "Mid", applyUrl: "https://careers.google.com" },
      ],
    },
    {
      name: "OpenAI",
      logo: "OA",
      industry: "Artificial Intelligence",
      roles: [
        { title: "Research Engineer", salaryRange: "₹22L - ₹45L", level: "Mid-Senior", applyUrl: "https://openai.com/careers" },
        { title: "Applied ML Scientist", salaryRange: "₹20L - ₹42L", level: "Senior", applyUrl: "https://openai.com/careers" },
        { title: "Safety Researcher", salaryRange: "₹18L - ₹38L", level: "Mid-Senior", applyUrl: "https://openai.com/careers" },
      ],
    },
    {
      name: "NVIDIA",
      logo: "NV",
      industry: "Hardware / AI Computing",
      roles: [
        { title: "Deep Learning Engineer", salaryRange: "₹16L - ₹32L", level: "Mid", applyUrl: "https://nvidia.wd5.myworkdayjobs.com/NVIDIAExternalCareerSite" },
        { title: "Computer Vision Engineer", salaryRange: "₹15L - ₹30L", level: "Mid", applyUrl: "https://nvidia.wd5.myworkdayjobs.com/NVIDIAExternalCareerSite" },
        { title: "AI Solutions Architect", salaryRange: "₹20L - ₹40L", level: "Senior", applyUrl: "https://nvidia.wd5.myworkdayjobs.com/NVIDIAExternalCareerSite" },
      ],
    },
    {
      name: "Meta AI",
      logo: "MA",
      industry: "Social Technology / AI",
      roles: [
        { title: "ML Engineer", salaryRange: "₹18L - ₹36L", level: "Mid-Senior", applyUrl: "https://www.metacareers.com" },
        { title: "Research Scientist", salaryRange: "₹22L - ₹45L", level: "Senior", applyUrl: "https://www.metacareers.com" },
        { title: "Data Scientist", salaryRange: "₹14L - ₹28L", level: "Mid", applyUrl: "https://www.metacareers.com" },
      ],
    },
    {
      name: "Amazon AWS AI",
      logo: "AA",
      industry: "Cloud / AI Services",
      roles: [
        { title: "Applied Scientist", salaryRange: "₹18L - ₹38L", level: "Mid-Senior", applyUrl: "https://www.amazon.jobs" },
        { title: "ML Engineer", salaryRange: "₹16L - ₹32L", level: "Mid", applyUrl: "https://www.amazon.jobs" },
        { title: "SageMaker Engineer", salaryRange: "₹14L - ₹28L", level: "Mid", applyUrl: "https://www.amazon.jobs" },
      ],
    },
  ],
  "web-dev": [
    {
      name: "Vercel",
      logo: "VC",
      industry: "Developer Tools / Cloud",
      roles: [
        { title: "Frontend Engineer", salaryRange: "₹15L - ₹30L", level: "Mid-Senior", applyUrl: "https://vercel.com/careers" },
        { title: "Full Stack Developer", salaryRange: "₹14L - ₹28L", level: "Mid", applyUrl: "https://vercel.com/careers" },
        { title: "DX Engineer", salaryRange: "₹13L - ₹26L", level: "Mid", applyUrl: "https://vercel.com/careers" },
      ],
    },
    {
      name: "Shopify",
      logo: "SP",
      industry: "E-Commerce / SaaS",
      roles: [
        { title: "Senior Web Developer", salaryRange: "₹14L - ₹28L", level: "Senior", applyUrl: "https://www.shopify.com/careers" },
        { title: "React Developer", salaryRange: "₹10L - ₹22L", level: "Mid", applyUrl: "https://www.shopify.com/careers" },
        { title: "Backend Engineer (Node.js)", salaryRange: "₹12L - ₹26L", level: "Mid-Senior", applyUrl: "https://www.shopify.com/careers" },
      ],
    },
    {
      name: "Stripe",
      logo: "ST",
      industry: "Fintech / Payments",
      roles: [
        { title: "Full Stack Engineer", salaryRange: "₹18L - ₹35L", level: "Mid-Senior", applyUrl: "https://stripe.com/jobs" },
        { title: "Frontend Infrastructure", salaryRange: "₹16L - ₹32L", level: "Senior", applyUrl: "https://stripe.com/jobs" },
        { title: "API Platform Engineer", salaryRange: "₹15L - ₹30L", level: "Mid", applyUrl: "https://stripe.com/jobs" },
      ],
    },
    {
      name: "Atlassian",
      logo: "AT",
      industry: "Productivity / SaaS",
      roles: [
        { title: "Web Developer", salaryRange: "₹12L - ₹24L", level: "Mid", applyUrl: "https://www.atlassian.com/company/careers" },
        { title: "UI Engineer", salaryRange: "₹13L - ₹26L", level: "Mid", applyUrl: "https://www.atlassian.com/company/careers" },
        { title: "Platform Engineer", salaryRange: "₹15L - ₹30L", level: "Mid-Senior", applyUrl: "https://www.atlassian.com/company/careers" },
      ],
    },
    {
      name: "Netflix",
      logo: "NF",
      industry: "Entertainment / Streaming",
      roles: [
        { title: "Senior UI Engineer", salaryRange: "₹22L - ₹45L", level: "Senior", applyUrl: "https://jobs.netflix.com" },
        { title: "Web Platform Engineer", salaryRange: "₹20L - ₹40L", level: "Senior", applyUrl: "https://jobs.netflix.com" },
        { title: "Full Stack Developer", salaryRange: "₹18L - ₹35L", level: "Mid-Senior", applyUrl: "https://jobs.netflix.com" },
      ],
    },
  ],
  "data-science": [
    {
      name: "McKinsey & Company",
      logo: "MC",
      industry: "Consulting / Analytics",
      roles: [
        { title: "Data Scientist", salaryRange: "₹14L - ₹30L", level: "Mid", applyUrl: "https://www.mckinsey.com/careers" },
        { title: "Analytics Consultant", salaryRange: "₹12L - ₹26L", level: "Mid", applyUrl: "https://www.mckinsey.com/careers" },
        { title: "Quantitative Analyst", salaryRange: "₹16L - ₹35L", level: "Senior", applyUrl: "https://www.mckinsey.com/careers" },
      ],
    },
    {
      name: "Spotify",
      logo: "SF",
      industry: "Music / Entertainment",
      roles: [
        { title: "Data Scientist", salaryRange: "₹15L - ₹30L", level: "Mid-Senior", applyUrl: "https://www.lifeatspotify.com/jobs" },
        { title: "Analytics Engineer", salaryRange: "₹12L - ₹26L", level: "Mid", applyUrl: "https://www.lifeatspotify.com/jobs" },
        { title: "ML Data Analyst", salaryRange: "₹10L - ₹24L", level: "Mid", applyUrl: "https://www.lifeatspotify.com/jobs" },
      ],
    },
    {
      name: "Airbnb",
      logo: "AB",
      industry: "Travel / Marketplace",
      roles: [
        { title: "Data Scientist", salaryRange: "₹16L - ₹34L", level: "Mid-Senior", applyUrl: "https://careers.airbnb.com" },
        { title: "Business Intelligence Analyst", salaryRange: "₹10L - ₹22L", level: "Mid", applyUrl: "https://careers.airbnb.com" },
        { title: "Data Engineer", salaryRange: "₹15L - ₹30L", level: "Mid-Senior", applyUrl: "https://careers.airbnb.com" },
      ],
    },
    {
      name: "Goldman Sachs",
      logo: "GS",
      industry: "Finance / Banking",
      roles: [
        { title: "Quantitative Analyst", salaryRange: "₹18L - ₹38L", level: "Mid-Senior", applyUrl: "https://www.goldmansachs.com/careers" },
        { title: "Data Analyst", salaryRange: "₹8L - ₹18L", level: "Entry-Mid", applyUrl: "https://www.goldmansachs.com/careers" },
        { title: "Risk Data Scientist", salaryRange: "₹16L - ₹34L", level: "Senior", applyUrl: "https://www.goldmansachs.com/careers" },
      ],
    },
  ],
  cybersecurity: [
    {
      name: "CrowdStrike",
      logo: "CS",
      industry: "Cybersecurity",
      roles: [
        { title: "Security Analyst", salaryRange: "₹10L - ₹22L", level: "Mid", applyUrl: "https://www.crowdstrike.com/careers" },
        { title: "Threat Intelligence Engineer", salaryRange: "₹14L - ₹28L", level: "Mid-Senior", applyUrl: "https://www.crowdstrike.com/careers" },
        { title: "Incident Responder", salaryRange: "₹12L - ₹24L", level: "Mid", applyUrl: "https://www.crowdstrike.com/careers" },
      ],
    },
    {
      name: "Palo Alto Networks",
      logo: "PA",
      industry: "Network Security",
      roles: [
        { title: "Security Engineer", salaryRange: "₹13L - ₹26L", level: "Mid", applyUrl: "https://jobs.paloaltonetworks.com" },
        { title: "Penetration Tester", salaryRange: "₹12L - ₹25L", level: "Mid", applyUrl: "https://jobs.paloaltonetworks.com" },
        { title: "Security Architect", salaryRange: "₹18L - ₹36L", level: "Senior", applyUrl: "https://jobs.paloaltonetworks.com" },
      ],
    },
    {
      name: "Fortinet",
      logo: "FT",
      industry: "Cybersecurity / Networking",
      roles: [
        { title: "SOC Analyst", salaryRange: "₹6L - ₹14L", level: "Entry-Mid", applyUrl: "https://www.fortinet.com/corporate/careers" },
        { title: "Security Consultant", salaryRange: "₹14L - ₹28L", level: "Mid-Senior", applyUrl: "https://www.fortinet.com/corporate/careers" },
        { title: "Firewall Engineer", salaryRange: "₹10L - ₹22L", level: "Mid", applyUrl: "https://www.fortinet.com/corporate/careers" },
      ],
    },
    {
      name: "Microsoft Security",
      logo: "MS",
      industry: "Technology / Enterprise Security",
      roles: [
        { title: "Security Engineer", salaryRange: "₹16L - ₹32L", level: "Mid-Senior", applyUrl: "https://careers.microsoft.com" },
        { title: "Red Team Engineer", salaryRange: "₹18L - ₹35L", level: "Senior", applyUrl: "https://careers.microsoft.com" },
        { title: "Cloud Security Architect", salaryRange: "₹22L - ₹40L", level: "Senior", applyUrl: "https://careers.microsoft.com" },
      ],
    },
  ],
  "core-eng": [
    {
      name: "Siemens",
      logo: "SM",
      industry: "Industrial / Manufacturing",
      roles: [
        { title: "Mechanical Engineer", salaryRange: "₹6L - ₹14L", level: "Mid", applyUrl: "https://jobs.siemens.com" },
        { title: "Automation Engineer", salaryRange: "₹7L - ₹16L", level: "Mid", applyUrl: "https://jobs.siemens.com" },
        { title: "Design Engineer", salaryRange: "₹5L - ₹12L", level: "Entry-Mid", applyUrl: "https://jobs.siemens.com" },
      ],
    },
    {
      name: "Boeing",
      logo: "BG",
      industry: "Aerospace / Defense",
      roles: [
        { title: "Structural Engineer", salaryRange: "₹7L - ₹15L", level: "Mid", applyUrl: "https://jobs.boeing.com" },
        { title: "Systems Engineer", salaryRange: "₹8L - ₹18L", level: "Mid-Senior", applyUrl: "https://jobs.boeing.com" },
        { title: "Manufacturing Engineer", salaryRange: "₹6L - ₹14L", level: "Mid", applyUrl: "https://jobs.boeing.com" },
      ],
    },
    {
      name: "Tesla",
      logo: "TL",
      industry: "Automotive / Energy",
      roles: [
        { title: "Mechanical Design Engineer", salaryRange: "₹8L - ₹18L", level: "Mid", applyUrl: "https://www.tesla.com/careers" },
        { title: "Manufacturing Engineer", salaryRange: "₹7L - ₹15L", level: "Mid", applyUrl: "https://www.tesla.com/careers" },
        { title: "Electrical Engineer", salaryRange: "₹8L - ₹18L", level: "Mid-Senior", applyUrl: "https://www.tesla.com/careers" },
      ],
    },
    {
      name: "General Electric",
      logo: "GE",
      industry: "Industrial / Energy",
      roles: [
        { title: "Project Engineer", salaryRange: "₹6L - ₹14L", level: "Mid", applyUrl: "https://jobs.gecareers.com" },
        { title: "Thermal Engineer", salaryRange: "₹7L - ₹15L", level: "Mid", applyUrl: "https://jobs.gecareers.com" },
        { title: "Quality Engineer", salaryRange: "₹5L - ₹12L", level: "Entry-Mid", applyUrl: "https://jobs.gecareers.com" },
      ],
    },
  ],
  "mobile-dev": [
    {
      name: "Apple",
      logo: "AP",
      industry: "Technology / Consumer Electronics",
      roles: [
        { title: "iOS Developer", salaryRange: "₹18L - ₹36L", level: "Mid-Senior", applyUrl: "https://jobs.apple.com" },
        { title: "Swift Engineer", salaryRange: "₹16L - ₹32L", level: "Mid", applyUrl: "https://jobs.apple.com" },
        { title: "Mobile Architect", salaryRange: "₹24L - ₹45L", level: "Senior", applyUrl: "https://jobs.apple.com" },
      ],
    },
    {
      name: "Google",
      logo: "GO",
      industry: "Technology / Android",
      roles: [
        { title: "Android Developer", salaryRange: "₹16L - ₹35L", level: "Mid-Senior", applyUrl: "https://careers.google.com" },
        { title: "Mobile Platform Engineer", salaryRange: "₹18L - ₹36L", level: "Mid-Senior", applyUrl: "https://careers.google.com" },
        { title: "Flutter Developer", salaryRange: "₹14L - ₹28L", level: "Mid", applyUrl: "https://careers.google.com" },
      ],
    },
    {
      name: "Uber",
      logo: "UB",
      industry: "Transportation / Technology",
      roles: [
        { title: "Mobile Engineer (iOS)", salaryRange: "₹15L - ₹32L", level: "Mid-Senior", applyUrl: "https://www.uber.com/careers" },
        { title: "Mobile Engineer (Android)", salaryRange: "₹15L - ₹32L", level: "Mid-Senior", applyUrl: "https://www.uber.com/careers" },
        { title: "React Native Developer", salaryRange: "₹12L - ₹28L", level: "Mid", applyUrl: "https://www.uber.com/careers" },
      ],
    },
    {
      name: "Flipkart",
      logo: "FK",
      industry: "E-Commerce / Technology",
      roles: [
        { title: "Mobile App Developer", salaryRange: "₹10L - ₹22L", level: "Mid", applyUrl: "https://www.flipkartcareers.com" },
        { title: "React Native Engineer", salaryRange: "₹8L - ₹20L", level: "Mid", applyUrl: "https://www.flipkartcareers.com" },
        { title: "Mobile Lead", salaryRange: "₹18L - ₹35L", level: "Senior", applyUrl: "https://www.flipkartcareers.com" },
      ],
    },
  ],
}

// ─── Quiz Questions ──────────────────────────────────────────────────
export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What type of problem-solving excites you the most?",
    options: [
      { label: "Teaching computers to learn from data", weights: { "ai-ml": 3, "data-science": 2 } },
      { label: "Building beautiful, interactive user interfaces", weights: { "web-dev": 3, "mobile-dev": 2 } },
      { label: "Finding hidden patterns and insights in data", weights: { "data-science": 3, "ai-ml": 1 } },
      { label: "Protecting systems from hackers and threats", weights: { cybersecurity: 3 } },
    ],
  },
  {
    id: 2,
    question: "Which school subject did you enjoy the most?",
    options: [
      { label: "Mathematics and Statistics", weights: { "ai-ml": 2, "data-science": 3 } },
      { label: "Art and Design", weights: { "web-dev": 3, "mobile-dev": 2 } },
      { label: "Physics and Mechanics", weights: { "core-eng": 3 } },
      { label: "Computer Science and Logic", weights: { cybersecurity: 2, "web-dev": 1, "ai-ml": 1 } },
    ],
  },
  {
    id: 3,
    question: "How do you prefer to see the results of your work?",
    options: [
      { label: "Accurate predictions and smart recommendations", weights: { "ai-ml": 3, "data-science": 1 } },
      { label: "A website or app people can use and interact with", weights: { "web-dev": 3, "mobile-dev": 2 } },
      { label: "Charts, dashboards, and visual reports", weights: { "data-science": 3 } },
      { label: "A physical product or machine that works", weights: { "core-eng": 3 } },
    ],
  },
  {
    id: 4,
    question: "What kind of tools interest you?",
    options: [
      { label: "Python, TensorFlow, and Jupyter Notebooks", weights: { "ai-ml": 3, "data-science": 2 } },
      { label: "React, VS Code, and browsers", weights: { "web-dev": 3 } },
      { label: "Wireshark, Kali Linux, and terminal", weights: { cybersecurity: 3 } },
      { label: "CAD software, MATLAB, and simulators", weights: { "core-eng": 3 } },
    ],
  },
  {
    id: 5,
    question: "Which industry would you love to work in?",
    options: [
      { label: "Tech startups and SaaS companies", weights: { "web-dev": 2, "mobile-dev": 2 } },
      { label: "Healthcare, finance, or autonomous vehicles", weights: { "ai-ml": 3, "data-science": 1 } },
      { label: "Government, defense, or banking security", weights: { cybersecurity: 3 } },
      { label: "Manufacturing, automotive, or aerospace", weights: { "core-eng": 3 } },
    ],
  },
  {
    id: 6,
    question: "How comfortable are you with mathematics?",
    options: [
      { label: "Love it! Calculus and linear algebra are fun", weights: { "ai-ml": 3, "data-science": 2 } },
      { label: "I'm good with practical math and logic", weights: { "web-dev": 2, cybersecurity: 1 } },
      { label: "I enjoy statistics and probability", weights: { "data-science": 3 } },
      { label: "I prefer applied math in engineering contexts", weights: { "core-eng": 3 } },
    ],
  },
  {
    id: 7,
    question: "What do you do in your free time online?",
    options: [
      { label: "Read about new AI breakthroughs and research papers", weights: { "ai-ml": 3 } },
      { label: "Browse beautifully designed websites and apps", weights: { "web-dev": 2, "mobile-dev": 2 } },
      { label: "Analyze trends and explore datasets", weights: { "data-science": 3 } },
      { label: "Watch hacking tutorials or solve CTF challenges", weights: { cybersecurity: 3 } },
    ],
  },
  {
    id: 8,
    question: "Which project sounds most exciting to you?",
    options: [
      { label: "A chatbot that understands natural language", weights: { "ai-ml": 3 } },
      { label: "A mobile app used by thousands of people", weights: { "mobile-dev": 3, "web-dev": 1 } },
      { label: "A dashboard predicting business outcomes", weights: { "data-science": 3 } },
      { label: "A security system that detects intrusions", weights: { cybersecurity: 3 } },
    ],
  },
  {
    id: 9,
    question: "What is your ideal team role?",
    options: [
      { label: "The researcher who experiments and innovates", weights: { "ai-ml": 3, "data-science": 1 } },
      { label: "The builder who creates and ships products", weights: { "web-dev": 2, "mobile-dev": 2 } },
      { label: "The analyst who finds insights others miss", weights: { "data-science": 3 } },
      { label: "The protector who keeps everything secure", weights: { cybersecurity: 3 } },
    ],
  },
  {
    id: 10,
    question: "Where do you see yourself in 5 years?",
    options: [
      { label: "Leading AI projects at a top tech company", weights: { "ai-ml": 3 } },
      { label: "Running my own web/mobile app startup", weights: { "web-dev": 2, "mobile-dev": 2 } },
      { label: "Chief Data Officer making data-driven decisions", weights: { "data-science": 3 } },
      { label: "Head of security at a major organization", weights: { cybersecurity: 3 } },
    ],
  },
]

// ─── Community Discussions ───────────────────────────────────────────
export const discussions: Discussion[] = [
  {
    id: 1,
    title: "Best resources for learning TensorFlow in 2026?",
    author: "Priya Sharma",
    avatar: "PS",
    domain: "AI & Machine Learning",
    replies: 24,
    timestamp: "2 hours ago",
    preview: "I'm in my 3rd year of CSE and want to get started with TensorFlow. Any recommendations for beginners?",
    featured: true,
  },
  {
    id: 2,
    title: "React vs Next.js for a portfolio project",
    author: "Arjun Mehta",
    avatar: "AM",
    domain: "Web Development",
    replies: 18,
    timestamp: "4 hours ago",
    preview: "Should I build my portfolio with plain React or go with Next.js? What are the pros and cons for recruiters?",
    featured: true,
  },
  {
    id: 3,
    title: "How to prepare for data science internships?",
    author: "Sneha Reddy",
    avatar: "SR",
    domain: "Data Science",
    replies: 31,
    timestamp: "6 hours ago",
    preview: "I have 6 months before internship season. What skills and projects should I focus on?",
    featured: true,
  },
  {
    id: 4,
    title: "Recommended CTF platforms for beginners",
    author: "Karthik Nair",
    avatar: "KN",
    domain: "Cybersecurity",
    replies: 15,
    timestamp: "8 hours ago",
    preview: "Looking for beginner-friendly Capture the Flag platforms to practice ethical hacking skills.",
  },
  {
    id: 5,
    title: "SolidWorks vs Fusion 360 for mechanical students",
    author: "Rahul Gupta",
    avatar: "RG",
    domain: "Core Engineering",
    replies: 12,
    timestamp: "1 day ago",
    preview: "Which CAD software should I invest my time learning? My college teaches SolidWorks but I see Fusion 360 used a lot.",
  },
  {
    id: 6,
    title: "Flutter or React Native in 2026?",
    author: "Ananya Das",
    avatar: "AD",
    domain: "Mobile Development",
    replies: 42,
    timestamp: "1 day ago",
    preview: "The eternal debate! Which framework has better job prospects and community support right now?",
  },
  {
    id: 7,
    title: "How I landed a Google internship as a 2nd year student",
    author: "Vikram Singh",
    avatar: "VS",
    domain: "Web Development",
    replies: 89,
    timestamp: "2 days ago",
    preview: "Sharing my journey from knowing basic HTML to getting a SWE internship at Google. Here's what worked for me.",
    featured: true,
  },
  {
    id: 8,
    title: "Building a machine learning portfolio that stands out",
    author: "Meera Joshi",
    avatar: "MJ",
    domain: "AI & Machine Learning",
    replies: 27,
    timestamp: "3 days ago",
    preview: "Recruiters shared what they look for in ML portfolios. Here's a summary of key takeaways.",
  },
]

// ─── Testimonials ────────────────────────────────────────────────────
export const testimonials: Testimonial[] = [
  {
    name: "Aditya Kulkarni",
    branch: "Computer Science, 3rd Year",
    quote: "HorizonGuide's roadmap helped me go from zero ML knowledge to landing an AI internship in just 4 months. The step-by-step phases made everything feel achievable.",
    avatar: "AK",
  },
  {
    name: "Riya Patel",
    branch: "ECE, 4th Year",
    quote: "The career quiz helped me discover my passion for cybersecurity. I was confused between multiple domains, but now I have a clear path forward.",
    avatar: "RP",
  },
  {
    name: "Siddharth Verma",
    branch: "IT, 2nd Year",
    quote: "As someone overwhelmed by the options in tech, HorizonGuide gave me clarity. The community section is a bonus -- connecting with peers on the same journey is invaluable.",
    avatar: "SV",
  },
]

// ─── Platform Stats ──────────────────────────────────────────────────
export const stats = [
  { label: "Students Guided", value: "10,000+" },
  { label: "Roadmaps Generated", value: "50+" },
  { label: "Career Domains", value: "6" },
  { label: "Learning Resources", value: "500+" },
]

// ─── How It Works ────────────────────────────────────────────────────
import { Target, Map, TrendingUp, Award } from "lucide-react"

export const howItWorks = [
  {
    step: 1,
    title: "Choose Your Domain",
    description: "Explore 6 engineering career domains and find what excites you most.",
    icon: Target,
  },
  {
    step: 2,
    title: "Get Your Roadmap",
    description: "Receive a personalized, phase-by-phase learning plan tailored to your goals.",
    icon: Map,
  },
  {
    step: 3,
    title: "Track Progress",
    description: "Mark completed skills, track your learning hours, and stay motivated.",
    icon: TrendingUp,
  },
  {
    step: 4,
    title: "Achieve Your Goals",
    description: "Land your dream internship or job with a portfolio that stands out.",
    icon: Award,
  },
]

// ─── Features ────────────────────────────────────────────────────────
import { Route, BarChart3, Lightbulb, BookOpen, HelpCircle, Users } from "lucide-react"

export const features: Feature[] = [
  {
    title: "Personalized Roadmaps",
    description: "Get a custom learning path based on your branch, domain, skills, and experience level.",
    icon: Route,
  },
  {
    title: "Progress Tracking",
    description: "Monitor your learning journey with visual dashboards and skill checklists.",
    icon: BarChart3,
  },
  {
    title: "Career Insights",
    description: "Explore salary ranges, job roles, and future scope for each domain.",
    icon: Lightbulb,
  },
  {
    title: "Expert Resources",
    description: "Access curated tutorials, courses, and tools recommended by industry professionals.",
    icon: BookOpen,
  },
  {
    title: "Career Quiz",
    description: "Take a 10-question quiz to discover which engineering career path suits you best.",
    icon: HelpCircle,
  },
  {
    title: "Community Support",
    description: "Connect with fellow students, share experiences, and learn from peers.",
    icon: Users,
  },
]

// ─── Engineering Branches ────────────────────────────────────────────
export const engineeringBranches = [
  "Computer Science",
  "Information Technology",
  "Electronics & Communication",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Chemical Engineering",
  "Aerospace Engineering",
]

// ─── Dashboard Mock Data ─────────────────────────────────────────────
export const dashboardActivity = [
  { week: "Week 1", hours: 5 },
  { week: "Week 2", hours: 8 },
  { week: "Week 3", hours: 12 },
  { week: "Week 4", hours: 10 },
  { week: "Week 5", hours: 15 },
  { week: "Week 6", hours: 14 },
  { week: "Week 7", hours: 18 },
  { week: "Week 8", hours: 16 },
]

export const savedRoadmaps = [
  { id: 1, domain: "AI & Machine Learning", progress: 45, lastAccessed: "2 days ago", phase: "Phase 2: Core ML" },
  { id: 2, domain: "Web Development", progress: 72, lastAccessed: "1 week ago", phase: "Phase 3: Full Stack" },
  { id: 3, domain: "Data Science", progress: 20, lastAccessed: "3 days ago", phase: "Phase 1: Foundations" },
]

export const skillsChecklist = [
  { category: "Phase 1: Foundations", items: [
    { name: "Python Basics", completed: true },
    { name: "Linear Algebra", completed: true },
    { name: "Probability & Statistics", completed: true },
    { name: "NumPy & Pandas", completed: false },
  ]},
  { category: "Phase 2: Core ML", items: [
    { name: "Supervised Learning", completed: true },
    { name: "Unsupervised Learning", completed: false },
    { name: "Feature Engineering", completed: false },
    { name: "Model Evaluation", completed: false },
  ]},
]

export const recommendedNext = [
  { title: "Complete NumPy & Pandas module", description: "Finish the remaining exercises in Phase 1 to unlock Phase 2 fully.", domain: "AI & Machine Learning" },
  { title: "Start Kaggle competition", description: "Apply your ML skills in a real competition to build portfolio projects.", domain: "AI & Machine Learning" },
  { title: "Review REST API fundamentals", description: "Prepare for the Full Stack phase by brushing up on API concepts.", domain: "Web Development" },
  { title: "Build a data visualization project", description: "Create an interactive dashboard to strengthen your portfolio.", domain: "Data Science" },
]
