// All the text on the site lives here. Edit this file to update your portfolio.

export type Project = {
  title: string;
  desc: string;
  tags: string[];
  // Featured projects span the full width and show their highlights.
  featured?: boolean;
  // Replaces the "Featured project" label on the card.
  badge?: string;
  // Internal page with the full write-up, e.g. "/projects/fitcheck".
  caseStudy?: string;
  highlights?: { value: string; label: string }[];
  links?: { label: string; href: string }[];
};

export const site = {
  name: "Guntuku Hariprasad",
  shortName: "Hariprasad",
  role: "AI Engineer",
  tagline:
    "I build AI systems that people can actually use, from model experiments to tested, deployed products.",
  about: [
    "Hi, I'm Hariprasad, an AI Engineer. I take machine learning from a notebook to a working product that solves a real problem.",
    "My work covers NLP, embeddings and forecasting. I fine-tuned BERT to read tweets, built a LightGBM model that forecasts sales for 365 stores, and shipped FitCheck, which runs a sentence-embedding model entirely in the browser. I care about honest evaluation, explainable results, testing and clean deployment as much as model accuracy.",
    "I'm always learning new models and tools, and I enjoy making AI fast, private and easy to trust.",
  ],
  skills: [
    "Python",
    "NLP",
    "Transformers / BERT",
    "Embeddings",
    "TensorFlow",
    "LightGBM / XGBoost",
    "Time-series forecasting",
    "Transformers.js / ONNX",
    "FastAPI / Flask",
    "Docker / Kubernetes",
    "TypeScript / React",
    "Testing & CI/CD",
  ],
  projects: [
    {
      title: "FitCheck — AI Resume & Job Match",
      desc: "Built for my AI Engineer applications: a private resume checker that scores how well a resume matches a job post and explains every point of the score. A sentence-embedding model (all-MiniLM-L6-v2) runs entirely in the browser to match each job requirement with the resume line that means the same thing, even in different words. It also finds missing skills and rewrites weak bullet points. Nothing is uploaded, and there is no backend or sign-up.",
      tags: ["On-device AI", "Transformers.js", "ONNX Runtime Web", "Embeddings", "NLP", "React 19", "TypeScript", "Playwright"],
      featured: true,
      badge: "Built for AI Engineer roles",
      caseStudy: "/projects/fitcheck",
      highlights: [
        { value: "100%", label: "On-device: no server, nothing uploaded" },
        { value: "350+", label: "Skill aliases across ~100 skills" },
        { value: "~97%", label: "Test coverage of the matching engine" },
      ],
      links: [
        { label: "Try the live app", href: "https://dot-hpg.github.io/fitcheck/" },
        { label: "View on GitHub", href: "https://github.com/dot-hpg/fitcheck" },
      ],
    },
    {
      title: "Twitter Named Entity Recognition",
      desc: "An end-to-end NLP system that reads tweets and identifies the people, places, companies and products being discussed, without relying on hashtags. I compared a BiLSTM-CRF built in TensorFlow with a fine-tuned BERT model across 17 controlled experiments on the WNUT-16 dataset, then served the best model through a production-ready API.",
      tags: ["NLP", "BERT", "TensorFlow", "BiLSTM-CRF", "FastAPI", "Docker", "Kubernetes"],
      featured: true,
      highlights: [
        { value: "0.437", label: "Test F1 (fine-tuned BERT)" },
        { value: "3.2×", label: "Better than the LSTM baseline" },
        { value: "17", label: "Controlled experiments" },
      ],
      links: [
        { label: "View on GitHub", href: "https://github.com/dot-hpg/twitter-ner" },
        {
          label: "Read the LinkedIn post",
          href: "https://www.linkedin.com/posts/dot-hpg_artificialintelligence-machinelearning-nlp-share-7520422456981921793-UofA",
        },
        {
          label: "Read the article on Medium",
          href: "https://medium.com/@connect.hpg/teaching-machines-to-read-tweets-named-entity-recognition-with-bilstm-crf-and-bert-5b8e1e1ec07d",
        },
        { label: "See it on Instagram", href: "https://www.instagram.com/p/De9KozimMyt/" },
      ],
    },
    {
      title: "Retail Sales Forecasting",
      desc: "Forecasts daily sales for 365 retail stores, 61 days ahead, so the business can plan inventory, staffing and promotions. After testing 8 hypotheses and comparing 10 models with leakage-free features and rolling-origin validation, a global LightGBM model came out on top. It is served through a Flask REST API and a mobile-friendly Streamlit app.",
      tags: ["Time series", "LightGBM", "XGBoost", "Python", "Flask", "Streamlit", "SHAP"],
      featured: true,
      highlights: [
        { value: "~90%", label: "Accurate for store-month planning" },
        { value: "16.8%", label: "Daily WAPE on a 61-day hold-out" },
        { value: "+33%", label: "Sales lift from discounts, measured" },
      ],
      links: [
        { label: "View on GitHub", href: "https://github.com/dot-hpg/sales-forecasting" },
        { label: "Read the blog post", href: "https://github.com/dot-hpg/sales-forecasting/blob/main/docs/blog.md" },
      ],
    },
    {
      title: "AI Chat Assistant",
      desc: "A conversational assistant that answers questions and drafts content in seconds.",
      tags: ["Next.js", "AI"],
    },
    {
      title: "Smart Document Summarizer",
      desc: "Upload a document and get a clear, short summary with the key points.",
      tags: ["React", "LLM"],
    },
    {
      title: "Portfolio Website",
      desc: "This site — animated with Framer Motion and deployed on Vercel.",
      tags: ["Next.js", "Tailwind"],
    },
  ] as Project[],
  // Replace with the email address you want visitors to use.
  email: "your.email@example.com",
  socials: [
    { label: "GitHub", href: "https://github.com/dot-hpg" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/dot-hpg" },
    { label: "Instagram", href: "https://www.instagram.com/dot_agentic/" },
  ],
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/#projects" },
  { label: "Contact", href: "/#contact" },
];
