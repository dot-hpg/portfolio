// All the text on the site lives here. Edit this file to update your portfolio.

export const site = {
  name: "Guntuku Hariprasad",
  shortName: "Hariprasad",
  role: "AI App Developer",
  tagline:
    "I design and build AI-powered web apps — fast, beautiful and genuinely useful.",
  about: [
    "Hi, I'm Hariprasad. I build modern web applications that put AI to work on real problems.",
    "I enjoy turning ideas into polished products, from the first prototype to a live deployment. My toolkit centres on Next.js, React, Tailwind CSS and the latest AI models.",
    "When I'm not shipping apps, I'm exploring new tools and learning how to make software feel effortless to use.",
  ],
  skills: [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Framer Motion",
    "AI / LLM apps",
    "Prompt engineering",
    "Vercel",
  ],
  projects: [
    {
      title: "Twitter Named Entity Recognition",
      desc: "Finds people, places, companies and products in noisy tweets. Compares a BiLSTM-CRF built in TensorFlow with a fine-tuned BERT model.",
      tags: ["NLP", "TensorFlow", "BERT"],
      href: "https://github.com/dot-hpg/twitter-ner",
    },
    {
      title: "AI Chat Assistant",
      desc: "A conversational assistant that answers questions and drafts content in seconds.",
      tags: ["Next.js", "AI"],
      href: "#",
    },
    {
      title: "Smart Document Summarizer",
      desc: "Upload a document and get a clear, short summary with the key points.",
      tags: ["React", "LLM"],
      href: "#",
    },
    {
      title: "Portfolio Website",
      desc: "This site — animated with Framer Motion and deployed on Vercel.",
      tags: ["Next.js", "Tailwind"],
      href: "#",
    },
  ],
  // Replace with the email address you want visitors to use.
  email: "your.email@example.com",
  socials: [
    { label: "GitHub", href: "https://github.com/dot-hpg" },
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
  ],
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/#projects" },
  { label: "Contact", href: "/#contact" },
];
