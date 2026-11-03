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
      title: "FlipItNews — News Article Classification",
      desc: "Sorts news articles into Business, Politics, Sports, Technology and Entertainment for a fintech content platform. A tested text pipeline (tokenisation, stopwords, POS-aware lemmatisation) feeds Bag of Words or TF-IDF features into six scikit-learn models, ranked with cross-validation and checked for duplicate leakage. The deployed model's confidence score sends unsure articles to an editor. It is served through a FastAPI REST API and a Streamlit app, packaged with Docker.",
      tags: ["NLP", "scikit-learn", "NLTK", "TF-IDF", "FastAPI", "Streamlit", "Docker"],
      featured: true,
      highlights: [
        { value: "98.0%", label: "Test accuracy (Logistic Regression)" },
        { value: "99.8%", label: "Accuracy with editor review rule" },
        { value: "12", label: "Model + vectorizer pairs compared" },
      ],
      links: [
        { label: "View on GitHub", href: "https://github.com/dot-hpg/flipitnews-news-classification" },
        {
          label: "Read the blog post",
          href: "https://github.com/dot-hpg/flipitnews-news-classification/blob/main/docs/blog.md",
        },
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
  // Business cases from the Scaler program, shown on the /scaler page in this order.
  scalerProjects: [
    {
      title: "Target Brazil — E-commerce Operations SQL Case Study",
      desc: "An end-to-end SQL analysis of 99,441 orders placed with Target in Brazil between September 2016 and October 2018, built for the Scaler Target SQL business case. 30 BigQuery queries answer every question in the brief, then go further with six deep-dives into lateness and reviews, local vs cross-state fulfilment, seller coverage, categories, retention and peak-season delays. The work ends with eight ranked, evidence-backed recommendations, and one script rebuilds every result from the raw data.",
      tags: ["SQL", "BigQuery", "DuckDB", "Python", "pandas", "matplotlib", "Business analytics"],
      caseStudy: "/scaler/target-brazil",
      highlights: [
        { value: "+137%", label: "Order value, Jan-Aug 2018 vs 2017" },
        { value: "4.32 → 1.70", label: "Review score, very early vs very late orders" },
        { value: "2x faster", label: "Same-state delivery, with 43% lower freight" },
      ],
      links: [
        { label: "View on GitHub", href: "https://github.com/dot-hpg/target-brazil-sql-case-study" },
        {
          label: "Read the report (PDF)",
          href: "https://github.com/dot-hpg/target-brazil-sql-case-study/blob/main/report/Target_SQL_Case_Study_Guntuku_Hariprasad.pdf",
        },
      ],
    },
    {
      title: "Netflix — Content Strategy Analysis",
      desc: "What should Netflix produce next, and where should it grow? An end-to-end exploratory analysis of 8,807 movies and TV shows, built for a Scaler business case. I cleaned the catalogue, engineered features, un-nested actors, directors, countries and genres, then analysed trends, markets and launch timing across 23 charts. It shows a pivot to TV, a family-content gap, each country's content personality and fast-rising markets, and ends with ten recommendations.",
      tags: ["EDA", "Python", "pandas", "Seaborn", "Feature engineering", "Data storytelling"],
      caseStudy: "/scaler/netflix",
      highlights: [
        { value: "25% → 34%", label: "TV's share of new additions, 2018 to 2021" },
        { value: "67%", label: "TV shows with exactly one season" },
        { value: "59%", label: "Titles from the US, India and the UK" },
      ],
      links: [
        { label: "View on GitHub", href: "https://github.com/dot-hpg/netflix-content-insights" },
        {
          label: "Read the report (PDF)",
          href: "https://github.com/dot-hpg/netflix-content-insights/blob/main/reports/Netflix_EDA_Case_Study.pdf",
        },
      ],
    },
    {
      title: "Aerofit — Treadmill Customer Profiling",
      desc: "Who buys which treadmill, and how should Aerofit recommend the right one? An exploratory analysis and probability study of 180 customers across three products. Using contingency tables, marginal and conditional probabilities, a Bayes check and chi-square tests, I profiled the buyer of each model. Income, usage and fitness decide who buys the premium KP781, while age and marital status don't change the choice. It ends with a simple sales checklist and five more recommendations.",
      tags: ["Probability", "Python", "pandas", "SciPy", "Seaborn", "Chi-square", "Customer profiling"],
      caseStudy: "/scaler/aerofit",
      highlights: [
        { value: "100%", label: "Bought the KP781 when income was above $80K" },
        { value: "80.8%", label: "Bought the KP781 when running 5-7 days a week" },
        { value: "31.7% vs 9.2%", label: "Men vs women buying the KP781" },
      ],
      links: [
        { label: "View on GitHub", href: "https://github.com/dot-hpg/aerofit-treadmill-customer-profiling" },
        {
          label: "Read the report (PDF)",
          href: "https://github.com/dot-hpg/aerofit-treadmill-customer-profiling/blob/main/reports/Aerofit_Case_Study.pdf",
        },
      ],
    },
    {
      title: "Walmart — Black Friday Spending Analysis",
      desc: "Do women spend more than men on Black Friday? Confidence intervals and the Central Limit Theorem applied to 550,068 transactions. I ran bootstrap experiments at three sample sizes and built 90%, 95% and 99% intervals for gender, marital status and age. Men spend about 8% more per transaction, but product mix explains the whole gap: within the same category, women pay the same. It ends with ten recommendations for Walmart.",
      tags: ["Statistics", "Central Limit Theorem", "Confidence intervals", "Python", "pandas", "SciPy"],
      caseStudy: "/scaler/walmart",
      highlights: [
        { value: "550,068", label: "Transactions analysed" },
        { value: "8%", label: "More spent per transaction by men" },
        { value: "100%", label: "Of the gender gap explained by product mix" },
      ],
      links: [
        { label: "View on GitHub", href: "https://github.com/dot-hpg/walmart-black-friday-clt-analysis" },
        {
          label: "Read the report (PDF)",
          href: "https://github.com/dot-hpg/walmart-black-friday-clt-analysis/blob/main/reports/Walmart_CLT_Case_Study.pdf",
        },
      ],
    },
    {
      title: "Yulu — What Drives E-Cycle Demand",
      desc: "Yulu saw a dip in revenue, so this project uses 10,886 hourly rental records to find which factors really affect demand. I used t-tests, ANOVA, chi-square and regression, checked each parametric test's assumptions and confirmed results with non-parametric tests. Weather and season swing demand by 40-50%, hour of day is the dominant driver, and a regression on these drivers explains most of the variation. It ends with five operational recommendations.",
      tags: ["Hypothesis testing", "Python", "SciPy", "statsmodels", "ANOVA", "Regression"],
      caseStudy: "/scaler/yulu",
      highlights: [
        { value: "R² 0.93", label: "How well the drivers explain demand" },
        { value: "−42%", label: "Rentals in light rain vs clear weather" },
        { value: "~81%", label: "Rides from registered users" },
      ],
      links: [
        { label: "View on GitHub", href: "https://github.com/dot-hpg/yulu-hypothesis-testing" },
        {
          label: "Read the report (PDF)",
          href: "https://github.com/dot-hpg/yulu-hypothesis-testing/blob/main/reports/Yulu_Hypothesis_Testing.pdf",
        },
      ],
    },
    {
      title: "Delhivery — Feature Engineering on Trip Data",
      desc: "Turns 144,867 raw logistics rows into a clean, model-ready table of 14,817 delivery trips for ETA forecasting. I rebuilt each trip with a two-stage merge, engineered features from facility names, time and routes, capped outliers, and encoded and scaled the data into 67 features. Paired hypothesis tests show real trips take about 2.1 times as long as the routing engine plans. It ends with recommendations on ETAs, hub capacity and busy corridors.",
      tags: ["Feature engineering", "Python", "pandas", "scikit-learn", "SciPy", "Hypothesis testing"],
      caseStudy: "/scaler/delhivery",
      highlights: [
        { value: "2.1x", label: "Actual trip time vs routing engine's plan" },
        { value: "14,817", label: "Clean trips from 144,867 raw rows" },
        { value: "67", label: "Model-ready features" },
      ],
      links: [
        { label: "View on GitHub", href: "https://github.com/dot-hpg/delhivery-feature-engineering" },
        {
          label: "Read the report (PDF)",
          href: "https://github.com/dot-hpg/delhivery-feature-engineering/blob/main/reports/Delhivery_Feature_Engineering.pdf",
        },
      ],
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
  { label: "Scaler", href: "/scaler" },
  { label: "Contact", href: "/#contact" },
];
