// All the text on the site lives here. Edit this file to update the portfolio.
// Every number comes from the README, report or query output of the linked GitHub project.

export type Skill = "SQL" | "Python & EDA" | "Statistics" | "Dashboards & BI" | "Forecasting" | "Machine learning";

export type Work = {
  slug: string;
  title: string;
  company: string;
  // The business question the project answers, in one line.
  question: string;
  summary: string;
  skills: Skill[];
  tools: string[];
  // Rows or records analysed. Used for the "records analysed" total on the home page.
  records?: number;
  recordsLabel: string;
  metric: { value: string; label: string };
  highlights: { value: string; label: string }[];
  // Internal case study page, if there is one.
  caseStudy?: string;
  links: { label: string; href: string }[];
  // The first recommendation, shown on featured projects.
  recommendation?: string;
  // Chart shown on featured projects.
  cover?: { src: string; alt: string; width: number; height: number };
  featured?: boolean;
};

export type Insight = { stat: string; text: string; href: string };

export const site = {
  name: "Guntuku Hariprasad",
  shortName: "Hariprasad",
  initials: "GH",
  role: "Data Analyst",
  url: "https://portfolio-guntuku.vercel.app",
  availability: "Open to Data Analyst roles",
  tagline:
    "I work with SQL, Python and statistics to answer the questions a business actually has, then turn the answers into recommendations people can act on.",
  about: [
    "I'm Hariprasad, a data analyst. I like starting from a real business question, such as why customers leave bad reviews or who buys the premium product, and working through the data until the answer is clear enough to act on.",
    "I trained through the Data Science and Machine Learning programme at Scaler Academy, where I worked through business cases for companies like Target, Netflix, Walmart, Yulu and Delhivery. Each project on this site goes end to end: cleaning messy data, writing the SQL or Python, testing whether a pattern is real, and finishing with ranked recommendations and a written report.",
    "I care about getting the definitions right, checking the assumptions behind every statistical test, and making results reproducible, so anyone can rerun my work and get the same numbers.",
  ],
  // Replace with the email address you want visitors to use. Leave it empty to hide the email button.
  email: "",
  socials: [
    { label: "GitHub", href: "https://github.com/dot-hpg" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/dot-hpg" },
    { label: "Medium", href: "https://medium.com/@connect.hpg" },
  ],
};

export const toolkit: { group: string; blurb: string; items: string[] }[] = [
  {
    group: "Query & wrangle",
    blurb: "Pull, join and reshape data where it lives.",
    items: ["SQL", "BigQuery", "DuckDB", "MySQL", "PostgreSQL", "CTEs & window functions", "pandas", "NumPy"],
  },
  {
    group: "Analyse & test",
    blurb: "Check whether a pattern is real before anyone acts on it.",
    items: ["Hypothesis testing", "A/B testing", "Confidence intervals", "Central Limit Theorem", "ANOVA & chi-square", "Regression", "SciPy", "statsmodels"],
  },
  {
    group: "Visualise & report",
    blurb: "Make the answer obvious to someone who hasn't seen the data.",
    items: ["Tableau", "Power BI", "matplotlib", "Seaborn", "Executive reports", "Data storytelling"],
  },
  {
    group: "Model & forecast",
    blurb: "When the question needs a prediction, not just a description.",
    items: ["scikit-learn", "LightGBM / XGBoost", "Time-series forecasting", "Feature engineering", "RFM & cohort analysis"],
  },
];

export const approach = [
  {
    step: "01",
    title: "Frame the question",
    desc: "Start from the decision someone has to make, not from the dataset. Every case study opens with the business question it answers.",
    proof: "Target: \"Where is delivery hurting customer satisfaction?\"",
  },
  {
    step: "02",
    title: "Clean and define",
    desc: "Fix encodings, de-duplicate, and pin down definitions so every number means exactly one thing.",
    proof: "Delhivery: 144,867 raw rows rebuilt into 14,817 clean trips",
  },
  {
    step: "03",
    title: "Analyse",
    desc: "SQL for the heavy lifting, Python for exploration. Segment, compare and look for what moves the metric.",
    proof: "Target: 30 BigQuery queries, all reproducible locally",
  },
  {
    step: "04",
    title: "Test it's real",
    desc: "Check assumptions, run the right test, confirm with a non-parametric one, and report effect sizes, not just p-values.",
    proof: "Walmart: bootstrapped 90/95/99% intervals on 550,068 transactions",
  },
  {
    step: "05",
    title: "Recommend",
    desc: "End with ranked, specific actions and a written report a non-technical leader can read in ten minutes.",
    proof: "Netflix: ten recommendations in a 33-page report",
  },
];

// Headline findings shown in the scrolling ticker on the home page.
export const insights: Insight[] = [
  { stat: "4.32 → 1.70", text: "average review score when a Target order arrives early vs 8+ days late", href: "/scaler/target-brazil" },
  { stat: "2×", text: "faster delivery when the seller is in the customer's own state", href: "/scaler/target-brazil" },
  { stat: "25% → 34%", text: "TV's share of new Netflix additions, 2018 to 2021", href: "/scaler/netflix" },
  { stat: "100%", text: "of Walmart's Black Friday gender spending gap explained by product mix", href: "/scaler/walmart" },
  { stat: "−42%", text: "Yulu rentals in light rain vs clear weather", href: "/scaler/yulu" },
  { stat: "2.1×", text: "how long real Delhivery trips take vs the routing engine's plan", href: "/scaler/delhivery" },
  { stat: "100%", text: "of Aerofit customers earning over $80K bought the premium KP781", href: "/scaler/aerofit" },
  { stat: "96.9%", text: "of Target Brazil customers ordered only once", href: "/scaler/target-brazil" },
];

export const work: Work[] = [
  {
    slug: "target-brazil",
    title: "Target Brazil: e-commerce operations",
    company: "Target",
    question: "Where is delivery hurting customer satisfaction, and what should operations fix first?",
    summary:
      "An end-to-end SQL analysis of 99,441 orders placed with Target in Brazil from 2016 to 2018. 30 BigQuery queries cover growth, regional demand, freight, delivery and payments, then six deep-dives link lateness to reviews and compare local and cross-state fulfilment. It ends with eight ranked recommendations, and one script rebuilds every result from the raw data.",
    skills: ["SQL", "Python & EDA"],
    tools: ["BigQuery", "DuckDB", "SQL window functions", "pandas", "matplotlib"],
    records: 99441,
    recordsLabel: "99,441 orders",
    metric: { value: "4.32 → 1.70", label: "Review score, early vs 8+ days late" },
    highlights: [
      { value: "+137%", label: "Order value, Jan-Aug 2018 vs 2017" },
      { value: "2× faster", label: "Same-state delivery, with 43% lower freight" },
      { value: "30", label: "Reproducible BigQuery queries" },
    ],
    caseStudy: "/scaler/target-brazil",
    links: [
      { label: "GitHub", href: "https://github.com/dot-hpg/target-brazil-sql-case-study" },
      {
        label: "Report (PDF)",
        href: "https://github.com/dot-hpg/target-brazil-sql-case-study/blob/main/report/Target_SQL_Case_Study_Guntuku_Hariprasad.pdf",
      },
    ],
    recommendation: "Make on-time % the headline logistics KPI, starting with Rio de Janeiro, where 13.5% of orders arrive late.",
    cover: {
      src: "/scaler/target-brazil/10_review_score_vs_delivery_delay.png",
      alt: "Chart of average review score falling sharply as deliveries get later",
      width: 1870,
      height: 748,
    },
    featured: true,
  },
  {
    slug: "netflix",
    title: "Netflix: content strategy",
    company: "Netflix",
    question: "What should Netflix produce next, and which markets should it grow in?",
    summary:
      "Exploratory analysis of 8,807 movies and TV shows. I cleaned the catalogue, un-nested cast, directors, countries and genres, and analysed trends, markets and launch timing across 23 charts. It shows a pivot to TV, a family-content gap and a distinct content personality for each country, and ends with ten recommendations.",
    skills: ["Python & EDA"],
    tools: ["pandas", "Seaborn", "matplotlib", "Feature engineering"],
    records: 8807,
    recordsLabel: "8,807 titles",
    metric: { value: "25% → 34%", label: "TV's share of new additions, 2018-2021" },
    highlights: [
      { value: "67%", label: "TV shows with exactly one season" },
      { value: "59%", label: "Titles from the US, India and the UK" },
      { value: "10", label: "Content and market recommendations" },
    ],
    caseStudy: "/scaler/netflix",
    links: [
      { label: "GitHub", href: "https://github.com/dot-hpg/netflix-content-insights" },
      { label: "Report (PDF)", href: "https://github.com/dot-hpg/netflix-content-insights/blob/main/reports/Netflix_EDA_Case_Study.pdf" },
    ],
    recommendation: "Make more TV series, especially international dramas, crime and kids' shows, and set clear renewal rules for shows people finish.",
    cover: {
      src: "/scaler/netflix/08_tv_vs_movie_trend.png",
      alt: "Chart of TV's share of new Netflix additions rising since 2018",
      width: 1632,
      height: 525,
    },
    featured: true,
  },
  {
    slug: "walmart",
    title: "Walmart: Black Friday spending",
    company: "Walmart",
    question: "Do women spend more than men on Black Friday, and does it matter for marketing?",
    summary:
      "Confidence intervals and the Central Limit Theorem applied to 550,068 transactions. Bootstrap experiments at three sample sizes give 90%, 95% and 99% intervals for gender, marital status and age. Men spend about 8% more per transaction, but product mix explains the whole gap. I also built a Tableau dashboard of the customer segments.",
    skills: ["Statistics", "Dashboards & BI", "Python & EDA"],
    tools: ["SciPy", "pandas", "Bootstrapping", "Tableau"],
    records: 550068,
    recordsLabel: "550,068 transactions",
    metric: { value: "100%", label: "Of the gender gap explained by product mix" },
    highlights: [
      { value: "8%", label: "More spent per transaction by men" },
      { value: "3", label: "Confidence levels: 90%, 95%, 99%" },
      { value: "10", label: "Recommendations for Walmart" },
    ],
    caseStudy: "/scaler/walmart",
    links: [
      { label: "GitHub", href: "https://github.com/dot-hpg/walmart-black-friday-clt-analysis" },
      {
        label: "Tableau dashboard",
        href: "https://public.tableau.com/views/WalmartAnalysis_17822994672750/Customer_Insights_Dashboard",
      },
    ],
    recommendation: "Win more women shoppers: women are about half the population but only around 28% of Black Friday customers.",
    cover: {
      src: "/scaler/walmart/10_clt_gender.png",
      alt: "Distributions of the sample mean for women and men pulling apart as the sample size grows",
      width: 1943,
      height: 485,
    },
    featured: true,
  },
  {
    slug: "yulu",
    title: "Yulu: what drives e-cycle demand",
    company: "Yulu",
    question: "Revenue dipped. Which factors really move rental demand?",
    summary:
      "t-tests, ANOVA, chi-square and regression on 10,886 hourly rental records, with every parametric test's assumptions checked and confirmed by a non-parametric test. Weather and season swing demand by 40-50%, and hour of day is the dominant driver.",
    skills: ["Statistics", "Python & EDA"],
    tools: ["SciPy", "statsmodels", "ANOVA", "Regression"],
    records: 10886,
    recordsLabel: "10,886 hourly records",
    metric: { value: "−42%", label: "Rentals in light rain vs clear weather" },
    highlights: [
      { value: "R² 0.93", label: "Demand explained by the drivers" },
      { value: "~81%", label: "Rides from registered users" },
      { value: "5", label: "Operational recommendations" },
    ],
    caseStudy: "/scaler/yulu",
    links: [
      { label: "GitHub", href: "https://github.com/dot-hpg/yulu-hypothesis-testing" },
      { label: "Report (PDF)", href: "https://github.com/dot-hpg/yulu-hypothesis-testing/blob/main/reports/Yulu_Hypothesis_Testing.pdf" },
    ],
  },
  {
    slug: "aerofit",
    title: "Aerofit: treadmill customer profiling",
    company: "Aerofit",
    question: "Who buys which treadmill, and how should sales recommend the right one?",
    summary:
      "Contingency tables, marginal and conditional probabilities, a Bayes check and chi-square tests on 180 customers across three products. Income, usage and fitness decide who buys the premium KP781, while age and marital status don't. It ends with a simple sales checklist.",
    skills: ["Statistics", "Python & EDA"],
    tools: ["pandas", "SciPy", "Chi-square", "Seaborn"],
    records: 180,
    recordsLabel: "180 customers",
    metric: { value: "100%", label: "Bought the KP781 when income was above $80K" },
    highlights: [
      { value: "80.8%", label: "Bought the KP781 when running 5-7 days a week" },
      { value: "31.7% vs 9.2%", label: "Men vs women buying the KP781" },
      { value: "6", label: "Recommendations" },
    ],
    caseStudy: "/scaler/aerofit",
    links: [
      { label: "GitHub", href: "https://github.com/dot-hpg/aerofit-treadmill-customer-profiling" },
      { label: "Report (PDF)", href: "https://github.com/dot-hpg/aerofit-treadmill-customer-profiling/blob/main/reports/Aerofit_Case_Study.pdf" },
    ],
  },
  {
    slug: "delhivery",
    title: "Delhivery: trip data engineering",
    company: "Delhivery",
    question: "How far off are planned delivery times, and is the data ready to model ETAs?",
    summary:
      "Turns 144,867 raw logistics rows into 14,817 clean, model-ready delivery trips. A two-stage merge rebuilds each trip, features come from facility names, time and routes, and paired hypothesis tests compare real trip times with the routing engine's plan.",
    skills: ["Python & EDA", "Statistics"],
    tools: ["pandas", "scikit-learn", "SciPy", "Feature engineering"],
    records: 144867,
    recordsLabel: "144,867 raw rows",
    metric: { value: "2.1×", label: "Actual trip time vs the routing engine's plan" },
    highlights: [
      { value: "14,817", label: "Clean trips" },
      { value: "67", label: "Model-ready features" },
      { value: "Paired", label: "Hypothesis tests, plan vs actual" },
    ],
    caseStudy: "/scaler/delhivery",
    links: [
      { label: "GitHub", href: "https://github.com/dot-hpg/delhivery-feature-engineering" },
      {
        label: "Report (PDF)",
        href: "https://github.com/dot-hpg/delhivery-feature-engineering/blob/main/reports/Delhivery_Feature_Engineering.pdf",
      },
    ],
  },
  {
    slug: "crm-analytics",
    title: "E-commerce customer analytics",
    company: "Online retail",
    question: "Which customers drive revenue, and when do new customers stop coming back?",
    summary:
      "RFM segmentation, cohort retention and customer lifetime value on an online retail transaction log. Loyal customers bring in most of the revenue, and retention drops sharply after the second cohort month, which points to where re-engagement campaigns should start.",
    skills: ["Python & EDA"],
    tools: ["pandas", "RFM analysis", "Cohort analysis", "CLV (lifetimes)", "Seaborn"],
    recordsLabel: "Transaction log",
    metric: { value: "75%+", label: "Of revenue from loyal customers" },
    highlights: [
      { value: "1,306", label: "Loyal customers identified" },
      { value: "Month 2", label: "Where retention drops sharply" },
      { value: "4", label: "Recommendation areas" },
    ],
    links: [{ label: "GitHub", href: "https://github.com/dot-hpg/crm-analytics-python" }],
  },
  {
    slug: "sales-forecasting",
    title: "Retail sales forecasting",
    company: "365 retail stores",
    question: "What will each store sell over the next two months, and what actually moves sales?",
    summary:
      "Daily sales forecasts for 365 stores, 61 days ahead, to plan inventory, staffing and promotions. 8 hypotheses tested with effect sizes, 10 models compared with leakage-free features and rolling-origin validation. Discount days lift sales by about a third.",
    skills: ["Forecasting", "Statistics", "Machine learning"],
    tools: ["LightGBM", "XGBoost", "SHAP", "Streamlit"],
    recordsLabel: "365 stores",
    metric: { value: "+33%", label: "Sales lift from discounts, measured" },
    highlights: [
      { value: "~90%", label: "Accurate for store-month planning" },
      { value: "16.8%", label: "Daily WAPE on a 61-day hold-out" },
      { value: "10", label: "Models compared" },
    ],
    links: [
      { label: "GitHub", href: "https://github.com/dot-hpg/sales-forecasting" },
      { label: "Blog post", href: "https://github.com/dot-hpg/sales-forecasting/blob/main/docs/blog.md" },
    ],
  },
  {
    slug: "loantap",
    title: "LoanTap: credit line assessment",
    company: "LoanTap",
    question: "Should LoanTap extend a credit line to this applicant?",
    summary:
      "Logistic regression on 396,030 loan records. Interest rate, debt-to-income ratio and income are the strongest signals. Accuracy is 81%, but recall on defaulters is only 7%, and the write-up explains why that matters more than accuracy and what to do next.",
    skills: ["Machine learning", "Statistics"],
    tools: ["scikit-learn", "SMOTE", "ROC AUC", "pandas"],
    records: 396030,
    recordsLabel: "396,030 loans",
    metric: { value: "0.70", label: "ROC AUC on the test set" },
    highlights: [
      { value: "19%", label: "Loans charged off" },
      { value: "81%", label: "Accuracy (with recall caveat)" },
      { value: "7%", label: "Recall on defaulters, explained" },
    ],
    caseStudy: "/scaler/loantap",
    links: [{ label: "Report (PDF)", href: "/scaler/reports/loantap-report.pdf" }],
  },
  {
    slug: "jamboree",
    title: "Jamboree: graduate admission drivers",
    company: "Jamboree Education",
    question: "What decides an applicant's chance of getting into a top college abroad?",
    summary:
      "Linear regression on 500 applicant profiles, with OLS coefficients and p-values and every regression assumption tested, including multicollinearity with VIF. CGPA, GRE and TOEFL matter most, while SOP and university rating add little once the others are known.",
    skills: ["Statistics", "Machine learning"],
    tools: ["statsmodels", "scikit-learn", "VIF", "Seaborn"],
    records: 500,
    recordsLabel: "500 applicants",
    metric: { value: "0.82", label: "R² on the test set" },
    highlights: [
      { value: "0.043", label: "Test MAE (about 4 points)" },
      { value: "0.88", label: "Correlation of CGPA with admission" },
      { value: "VIF", label: "Multicollinearity checked" },
    ],
    caseStudy: "/scaler/jamboree",
    links: [{ label: "Report (PDF)", href: "/scaler/reports/jamboree-report.pdf" }],
  },
];

export const skillFilters: Skill[] = ["SQL", "Python & EDA", "Statistics", "Dashboards & BI", "Forecasting", "Machine learning"];

// Machine learning and AI work, shown in a smaller section below the analytics projects.
export const beyond = [
  {
    title: "FitCheck: resume and job match",
    desc: "A private resume checker that runs a sentence-embedding model in the browser to match each job requirement with the resume line that means the same thing.",
    tags: ["Embeddings", "Transformers.js", "TypeScript"],
    href: "/projects/fitcheck",
  },
  {
    title: "Twitter named entity recognition",
    desc: "A fine-tuned BERT model compared with a BiLSTM-CRF across 17 controlled experiments, served through a FastAPI service.",
    tags: ["NLP", "BERT", "TensorFlow"],
    href: "https://github.com/dot-hpg/twitter-ner",
  },
  {
    title: "FlipItNews: news classification",
    desc: "Six scikit-learn models on TF-IDF and bag-of-words features, 98% test accuracy, with a confidence rule that sends unsure articles to an editor.",
    tags: ["NLP", "scikit-learn", "FastAPI"],
    href: "https://github.com/dot-hpg/flipitnews-news-classification",
  },
];

export const navLinks = [
  { label: "Work", href: "/work" },
  { label: "Approach", href: "/#approach" },
  { label: "Toolkit", href: "/#toolkit" },
  { label: "About", href: "/about" },
];

export const totals = {
  caseStudies: work.length,
  records: work.reduce((sum, w) => sum + (w.records ?? 0), 0),
};
