// Full write-ups behind the /scaler/[slug] pages. Figures come from each project's GitHub README.

export type CaseStudy = {
  slug: string;
  number: number;
  caseName: string;
  titleLead: string;
  titleAccent: string;
  intro: string;
  metaDescription: string;
  repo: string;
  // Paths inside the repo, turned into GitHub links on the page.
  report: string;
  notebook: string;
  stats: { value: string; label: string }[];
  brief: [string, string];
  findings: { value: string; title: string; desc: string }[];
  table: { kicker: string; title: string; intro: string; headers: string[]; rows: string[][] };
  charts: { src: string; alt: string; width: number; height: number; caption: string }[];
  method: { title: string; desc: string }[];
  recommendations: { title: string; desc: string }[];
  note?: { title: string; desc: string };
  stack: { group: string; items: string[] }[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "netflix",
    number: 2,
    caseName: "Netflix business case",
    titleLead: "Netflix:",
    titleAccent: "what to produce next",
    intro:
      "What should Netflix produce next, and where should it grow? An end-to-end exploratory analysis that turns a raw catalogue of 8,807 titles into content and market recommendations for business leaders.",
    metaDescription:
      "Exploratory data analysis of 8,807 Netflix titles, built for a Scaler business case, with ten content and market recommendations.",
    repo: "https://github.com/dot-hpg/netflix-content-insights",
    report: "reports/Netflix_EDA_Case_Study.pdf",
    notebook: "notebooks/Netflix_EDA_Case_Study.ipynb",
    stats: [
      { value: "8,807", label: "Movies and TV shows analysed" },
      { value: "23", label: "Charts" },
      { value: "33", label: "Page PDF report" },
      { value: "10", label: "Recommendations" },
    ],
    brief: [
      "Every new show or movie is a large investment. Using the Netflix catalogue as of September 2021, the case asks whether Netflix is shifting from movies to TV, how content volume has changed over 30 years, and which genres, audiences and durations dominate.",
      "It also looks at what is available in each country, which markets are rising, who the key actors and directors are, and when is the best time to launch a title.",
    ],
    findings: [
      { value: "25% → 34%", title: "Netflix is pivoting to TV", desc: "TV's share of new additions rose from 2018 to 2021. Titles released in 2021: 315 TV shows vs 277 movies." },
      { value: "2,016", title: "Growth has plateaued", desc: "Additions peaked at 2,016 titles in 2019, then fell to 1,879 in 2020." },
      { value: "6.5%", title: "A family gap", desc: "46% of the library is adult-rated and only 6.5% is for little kids, yet kids and family genres grew 66% to 100% from 2018 to 2020." },
      { value: "59%", title: "Three markets dominate", desc: "The US (3,690), India (1,046) and the UK (806) account for 59% of titles." },
      { value: "1 → 42", title: "New frontiers", desc: "Nigeria grew from 1 to 42 titles a year and Egypt from 3 to 54 (2018 to 2020). Japan and Korea grew 70-80%." },
      { value: "67%", title: "Most shows end early", desc: "Two in three TV shows have exactly one season." },
      { value: "98 min", title: "The sweet-spot movie", desc: "The median movie runs 98 minutes, with the middle 50% between 87 and 114. Newer films are getting shorter." },
      { value: "35%", title: "Friday is launch day", desc: "35% of TV shows and 26% of movies are added on a Friday. July and December are the peak months for TV." },
    ],
    table: {
      kicker: "Country personalities",
      title: "Each market wants something different",
      intro: "This is why the recommendation is to go local, country by country, rather than run one global content plan.",
      headers: ["Market", "What stands out", "Where to invest"],
      rows: [
        ["India", "92% movies", "Movies with local stars, plus web-series"],
        ["South Korea", "74% TV", "K-dramas"],
        ["Japan", "63% TV", "Anime"],
        ["Mexico and Spain", "Over-index on crime and thrillers", "Spanish-language crime and thrillers"],
        ["Nigeria and Egypt", "Fast-growing from a small base", "Partnerships with local studios"],
      ],
    },
    charts: [
      { src: "/scaler/netflix/08_tv_vs_movie_trend.png", alt: "Chart of TV's share of additions rising since 2018", width: 1632, height: 525, caption: "TV's share of new additions has risen since 2018." },
      { src: "/scaler/netflix/10_country_type_mix.png", alt: "Chart of the movie and TV mix in each country", width: 1484, height: 555, caption: "The movie and TV mix differs sharply by country." },
      { src: "/scaler/netflix/11_country_genre_heatmap.png", alt: "Heatmap of genre mix by country", width: 1654, height: 675, caption: "Genre mix by country." },
      { src: "/scaler/netflix/19_best_launch_month.png", alt: "Chart of title additions by month", width: 1934, height: 554, caption: "The best months to launch." },
    ],
    method: [
      { title: "Cleaning", desc: "Fixed 3 rows where duration was typed into rating, trimmed text, parsed date_added and split duration into a number and a unit." },
      { title: "Feature engineering", desc: "Added year, month and weekday added, years to Netflix, release era, and an audience group that maps 14 ratings to 4 groups." },
      { title: "Missing values", desc: "Director is 29.9% missing (91% of TV shows), cast and country 9.4% each. Filled with \"Unknown\" and excluded from rankings, with no rows dropped." },
      { title: "Un-nesting", desc: "Exploded multi-valued fields to one row per value, giving 36,439 actors, 4,993 directors, 122 countries and 42 genres." },
      { title: "Data types", desc: "Converted key columns to ordered categories, cutting memory from 9.7 MB to 7.5 MB." },
      { title: "Outliers", desc: "Used IQR fences on movie duration (7.3% outliers), seasons, release year and years to Netflix. Kept them as genuine titles and reported medians." },
    ],
    recommendations: [
      { title: "Make more TV series", desc: "Especially international dramas, crime and kids' shows." },
      { title: "Renew good shows", desc: "Two in three stop after season 1, so set clear renewal rules for shows people finish." },
      { title: "Grow family and kids' content", desc: "Only 1 in 15 titles is for little kids, yet it is one of the fastest-growing areas." },
      { title: "Go local, country by country", desc: "Match each market's taste, and partner with studios in fast-growing Nigeria and Egypt." },
      { title: "Keep movies at 90-110 minutes", desc: "Kids' movies should run around an hour." },
      { title: "Launch big shows on a Friday in July or December", desc: "Avoid February for big launches." },
      { title: "Invest in growing genres", desc: "Reality, romance, action and kids. Be selective with stand-up and documentaries." },
      { title: "Co-produce to enter new markets", desc: "15% of titles already involve two or more countries." },
      { title: "Add well-known classic films selectively", desc: "They attract older audiences cheaply." },
      { title: "Pair this view with viewing data", desc: "Review these bets every quarter." },
    ],
    note: {
      title: "An honest limitation",
      desc: "The data shows what is available on Netflix, not what people watch. Without viewing hours or revenue, more titles signals Netflix's investment choices rather than proven demand. 2021 covers January to September only.",
    },
    stack: [
      { group: "Analysis", items: ["Python", "pandas", "Jupyter"] },
      { group: "Charts", items: ["Seaborn", "matplotlib"] },
      { group: "Techniques", items: ["EDA", "Feature engineering", "Un-nesting", "IQR outliers", "Data storytelling"] },
    ],
  },
  {
    slug: "aerofit",
    number: 3,
    caseName: "Aerofit business case",
    titleLead: "Aerofit:",
    titleAccent: "who buys which treadmill",
    intro:
      "Who buys which treadmill, and how should Aerofit recommend the right one? An exploratory analysis and probability study of 180 customers across three products.",
    metaDescription:
      "Customer profiling of 180 Aerofit treadmill buyers with descriptive statistics, conditional probability and chi-square tests, built in the Scaler program.",
    repo: "https://github.com/dot-hpg/aerofit-treadmill-customer-profiling",
    report: "reports/Aerofit_Case_Study.pdf",
    notebook: "notebooks/Aerofit_Case_Study.ipynb",
    stats: [
      { value: "180", label: "Customers analysed" },
      { value: "3", label: "Treadmill models" },
      { value: "100%", label: "Chance of KP781 above $80K income" },
      { value: "6", label: "Recommendations" },
    ],
    brief: [
      "Aerofit sells three treadmills: the entry-level KP281 ($1,500), the mid-level KP481 ($1,750) and the advanced KP781 ($2,500). Its market research team wants to identify the target audience for each one, so new customers get better recommendations.",
      "The analysis asks whether the products differ in customer characteristics, and what the marginal and conditional probabilities of buying each model are for different customer groups.",
    ],
    findings: [
      { value: "100% vs 0%", title: "Income is the strongest driver", desc: "Every buyer earning above $80K chose the KP781, and no buyer earning below $40K did." },
      { value: "80.8%", title: "Frequent runners buy the KP781", desc: "That's the share among people who run 5-7 days a week. It is 65.5% among those with fitness of 4-5." },
      { value: "31.7% vs 9.2%", title: "A gender gap at the premium end", desc: "Men are far more likely to buy the KP781, although female KP781 buyers are just as fit and affluent." },
      { value: "p > 0.05", title: "Age and marital status don't matter", desc: "Chi-square tests show neither one changes which model people choose." },
      { value: "$250", title: "The two cheaper models look alike", desc: "KP281 and KP481 buyers are nearly indistinguishable, so the price gap is the deciding factor." },
      { value: "30.8%", title: "Small share, big revenue", desc: "The KP781 has only 22.2% of buyers but brings in 30.8% of revenue." },
    ],
    table: {
      kicker: "Customer profiles",
      title: "The buyer behind each model",
      intro: "The KP781 buyer stands apart on income, usage, fitness and miles. The other two look very similar.",
      headers: ["", "KP281", "KP481", "KP781"],
      rows: [
        ["Share of buyers", "44.4%", "33.3%", "22.2%"],
        ["Share of revenue", "36.9%", "32.3%", "30.8%"],
        ["Median income", "$46.6K", "$49.5K", "$76.6K"],
        ["Usage (days a week)", "3", "3", "5"],
        ["Fitness (1-5)", "3", "3", "5"],
        ["Miles per week", "85", "85", "160"],
        ["Male share", "50%", "52%", "82.5%"],
      ],
    },
    charts: [
      { src: "/scaler/aerofit/11_p_kp781_by_attribute.png", alt: "Chart of the probability of buying the KP781 for different customer groups", width: 1478, height: 1028, caption: "The probability of buying the KP781 across customer groups." },
      { src: "/scaler/aerofit/06_numeric_by_product_boxplots.png", alt: "Box plots of age, income, usage, fitness and miles by product", width: 1932, height: 1028, caption: "Customer attributes by product." },
      { src: "/scaler/aerofit/05_product_mix_ordinal.png", alt: "Stacked bars showing product mix across customer groups", width: 2078, height: 641, caption: "Product mix across customer groups." },
    ],
    method: [
      { title: "Basic metrics", desc: "Shape, data types, conversion to category and a statistical summary." },
      { title: "Non-graphical analysis", desc: "Value counts, unique values, product-level means and medians, and the revenue mix." },
      { title: "Missing values and outliers", desc: "Null and duplicate checks, IQR fences, mean vs median, boxplots and clipping sensitivity." },
      { title: "Visual analysis", desc: "Histograms with KDE, countplots, stacked bars, boxplots by product and gender, scatterplots, a correlation heatmap and a pairplot." },
      { title: "Probability", desc: "Contingency tables with marginal, joint and conditional probabilities for 7 attributes, plus a Bayes check." },
      { title: "Chi-square tests", desc: "Tests of independence show which customer attributes really change the choice of model." },
    ],
    recommendations: [
      { title: "A three-question sales checklist", desc: "Days per week, fitness from 1 to 5, and budget map each customer to the right model." },
      { title: "Market the KP781 to women", desc: "Reach them through female athletes, running clubs and gyms." },
      { title: "Financing and trade-in offers", desc: "Bring fit, frequent runners earning $40K to $80K up to the KP781." },
      { title: "Reposition the KP481", desc: "Sell it as \"the treadmill you won't outgrow\" and bundle extras to justify the $250 step-up." },
      { title: "Keep the KP281 the easy starter", desc: "Aim it at students, first-job buyers and couples." },
      { title: "Household offers and upgrades", desc: "59% of buyers are partnered. Run upgrade campaigns for KP281 owners after 6 to 12 months." },
    ],
    stack: [
      { group: "Analysis", items: ["Python", "pandas", "SciPy", "Jupyter"] },
      { group: "Charts", items: ["Seaborn", "matplotlib"] },
      { group: "Statistics", items: ["Conditional probability", "Bayes' theorem", "Chi-square test", "IQR outliers"] },
    ],
  },
  {
    slug: "walmart",
    number: 4,
    caseName: "Walmart business case",
    titleLead: "Walmart Black Friday:",
    titleAccent: "do women spend more than men?",
    intro:
      "Confidence intervals and the Central Limit Theorem applied to 550,068 retail transactions, to generalise from a sample to 50 million male and 50 million female customers.",
    metaDescription:
      "Confidence intervals and the Central Limit Theorem on 550,068 Walmart Black Friday transactions, from the Scaler Data Science program.",
    repo: "https://github.com/dot-hpg/walmart-black-friday-clt-analysis",
    report: "reports/Walmart_CLT_Case_Study.pdf",
    notebook: "notebooks/Walmart_CLT_Case_Study.ipynb",
    stats: [
      { value: "550,068", label: "Transactions analysed" },
      { value: "1,000", label: "Bootstrap means per experiment" },
      { value: "90 / 95 / 99%", label: "Confidence levels" },
      { value: "10", label: "Recommendations" },
    ],
    brief: [
      "Walmart's management wants to know whether spending habits differ between male and female customers on Black Friday, and how marital status and age affect spend.",
      "I used bootstrapped sampling distributions and confidence intervals to move from a sample of transactions to conclusions about the wider customer population, then explained the result rather than stopping at the headline number.",
    ],
    findings: [
      { value: "8% more", title: "Men spend more per transaction", desc: "Men average 9,437.5 against 8,734.6 for women, a gap of about 703." },
      { value: "No overlap", title: "The gap is statistically clear", desc: "Gender confidence intervals don't overlap at 90%, 95% or 99%. They overlap only with tiny samples (n = 300)." },
      { value: "100%", title: "Product mix explains the whole gap", desc: "Within the same category women pay the same as men. Re-weighting women's prices by men's basket mix closes the entire gap." },
      { value: "p = 0.73", title: "Marital status makes no difference", desc: "9,261 vs 9,266, with overlapping intervals at every sample size and confidence level." },
      { value: "51+", title: "Spend rises with age", desc: "From 8,934 for ages 0-17 up to 9,464 for ages 51+." },
      { value: "~990K", title: "The most valuable customer is 26-35", desc: "Total Black Friday spend per customer is highest in this group. Across genders, men spend about 925K and women about 712K." },
    ],
    table: {
      kicker: "Results",
      title: "Average spend per transaction",
      intro: "Spend per transaction across each group, using the full data.",
      headers: ["Group", "Average spend", "Conclusion"],
      rows: [
        ["Men", "9,437.5 (95% CI 9,422 to 9,453)", "Higher than women"],
        ["Women", "8,734.6 (95% CI 8,709 to 8,760)", "Lower, due to product mix"],
        ["Married", "9,261", "No real difference"],
        ["Unmarried", "9,266", "No real difference"],
        ["Age 0-17", "8,934", "Lowest"],
        ["Age 18-25", "9,170", "Rising"],
        ["Age 26-35", "9,253", "About the same as 36-50"],
        ["Age 36-50", "9,295", "About the same as 26-35"],
        ["Age 51+", "9,464", "Highest"],
      ],
    },
    charts: [
      { src: "/scaler/walmart/10_clt_gender.png", alt: "Sampling distributions of mean spend for men and women at three sample sizes", width: 1943, height: 485, caption: "The CLT in action: sample means become normal and tighter as n grows, and male and female means separate from n = 3,000." },
      { src: "/scaler/walmart/12_ci_gender.png", alt: "Female and male confidence intervals at 90, 95 and 99 percent", width: 1931, height: 573, caption: "Female vs male confidence intervals at 90%, 95% and 99% for three sample sizes." },
      { src: "/scaler/walmart/17_ci_age.png", alt: "Confidence intervals of spend for each life stage", width: 1931, height: 1230, caption: "Confidence intervals by life stage, using the full data." },
    ],
    method: [
      { title: "Data checks", desc: "Data types converted to category, no missing values, and 0.49% IQR outliers, all genuine premium purchases." },
      { title: "Gender analysis", desc: "Means, a Welch t-test, effect size and a product-mix decomposition of the gap." },
      { title: "CLT experiments", desc: "1,000 bootstrap means at n = 300, 3,000 and 30,000, with Q-Q normality checks and CI width against sample size." },
      { title: "Confidence intervals", desc: "90%, 95% and 99% intervals, using bootstrap percentile and analytical z, with automated overlap checks." },
      { title: "Other segments", desc: "The same analysis for married vs unmarried and for five life-stage age bins, plus ANOVA." },
      { title: "Reproducible", desc: "All sampling uses a fixed random seed, and the notebook reruns in about a minute." },
    ],
    recommendations: [
      { title: "Win more women shoppers", desc: "Women are half the population but only about 28% of Black Friday customers." },
      { title: "Help women discover bigger-ticket products", desc: "Bundle Categories 5 and 8 with higher-value items." },
      { title: "Keep male shoppers loyal", desc: "They bring 77% of Black Friday revenue." },
      { title: "Don't price by marital status", desc: "Use it only to decide which products to show." },
      { title: "Focus the main campaign on ages 26-50", desc: "Treat 26-35 and 36-50 as one segment." },
      { title: "Premium offers for 51+", desc: "This group has the highest spend per item." },
      { title: "Reach teenagers through parents", desc: "Use family bundles." },
      { title: "Stock premium ranges in City C", desc: "It has the highest ticket size. Upsell in City A." },
      { title: "Never run out of Categories 1, 5 and 8", desc: "They make up about 74% of transactions." },
      { title: "Test on large samples", desc: "Use 95% confidence for big decisions." },
    ],
    stack: [
      { group: "Analysis", items: ["Python", "pandas", "SciPy", "Jupyter"] },
      { group: "Charts", items: ["Seaborn", "matplotlib"] },
      { group: "Statistics", items: ["Central Limit Theorem", "Bootstrapping", "Confidence intervals", "Welch t-test", "ANOVA"] },
    ],
  },
  {
    slug: "yulu",
    number: 5,
    caseName: "Yulu business case",
    titleLead: "Yulu:",
    titleAccent: "what drives e-cycle demand?",
    intro:
      "Yulu, a shared e-cycle provider in India, saw a dip in revenue. Using 10,886 hourly rental records and hypothesis testing, I found which factors really affect demand and how well they explain it.",
    metaDescription:
      "Hypothesis testing on 10,886 Yulu rental records with t-tests, ANOVA, chi-square and regression, from the Scaler Data Science program.",
    repo: "https://github.com/dot-hpg/yulu-hypothesis-testing",
    report: "reports/Yulu_Hypothesis_Testing.pdf",
    notebook: "notebooks/Yulu_Hypothesis_Testing.ipynb",
    stats: [
      { value: "10,886", label: "Hourly rental records" },
      { value: "4", label: "Hypotheses tested" },
      { value: "0.93", label: "R² explaining demand" },
      { value: "5", label: "Recommendations" },
    ],
    brief: [
      "Yulu's revenue had dipped, and the company wanted to understand what affects demand for its shared e-cycles. The case asks whether working days, weather and season change the number of rentals, and whether weather depends on season.",
      "I checked every parametric test against its assumptions and confirmed it with a non-parametric alternative, then built a regression to measure how well these drivers explain demand overall.",
    ],
    findings: [
      { value: "Hour of day", title: "The dominant driver", desc: "Weekday demand peaks at 8 AM and 5-6 PM, following the commute." },
      { value: "−42%", title: "Weather matters", desc: "Rentals fall in the order Clear, Mist, Light Rain, with light rain 42% below clear weather." },
      { value: "−50%", title: "So does season", desc: "Rentals run Fall, then Summer and Winter, then Spring, which is 50% below Fall." },
      { value: "p = 0.226", title: "Working days don't change volume", desc: "Total rentals stay the same, but working days reshape when people ride and who rides." },
      { value: "~81%", title: "Registered users drive rides", desc: "Casual riders are about 2.4x more active at weekends than on weekdays." },
      { value: "+65%", title: "Demand is growing", desc: "Demand rose 65% year on year, so the dip is seasonal or operational, not structural." },
    ],
    table: {
      kicker: "Test results",
      title: "Each question, its test and the verdict",
      intro: "Effect sizes (Cohen's d, η², Cramér's V) and Bonferroni-corrected post-hoc tests are included in the analysis.",
      headers: ["Question", "Test", "p-value", "Verdict"],
      rows: [
        ["Does working day change rentals?", "2-sample t-test, Mann-Whitney U", "0.226", "No effect on total volume"],
        ["Do rentals differ by weather?", "One-way ANOVA, Kruskal-Wallis", "5.0e-43", "Yes"],
        ["Do rentals differ by season?", "One-way ANOVA, Kruskal-Wallis", "6.2e-149", "Yes"],
        ["Is weather dependent on season?", "Chi-square independence", "2.8e-8", "Yes, but weak (Cramér's V = 0.05)"],
        ["How well do the drivers explain demand?", "OLS on log(count)", "n/a", "R² = 0.93"],
      ],
    },
    charts: [
      { src: "/scaler/yulu/05_hourly_profile_and_user_mix.png", alt: "Hourly rental profile for working days and weekends, with the mix of user types", width: 1425, height: 390, caption: "Commute and leisure demand follow different hourly patterns." },
      { src: "/scaler/yulu/04_count_vs_categories.png", alt: "Box plots of rentals by season, weather and working day", width: 1422, height: 390, caption: "Demand by season, weather and working day." },
      { src: "/scaler/yulu/07_correlation_and_temp_scatter.png", alt: "Correlation heatmap and a scatter plot of rentals against temperature", width: 1380, height: 435, caption: "Correlations between the variables, and rentals against temperature." },
    ],
    method: [
      { title: "Assumption checks", desc: "Shapiro-Wilk, Q-Q plots and Levene's test for every parametric test." },
      { title: "Non-parametric confirmation", desc: "Mann-Whitney U and Kruskal-Wallis back up the t-test and ANOVA results." },
      { title: "Effect sizes", desc: "Cohen's d, η² and Cramér's V show how big each effect is, not just whether it exists." },
      { title: "Post-hoc tests", desc: "Bonferroni-corrected comparisons show which groups really differ." },
      { title: "Regression", desc: "OLS on log(count) with hour × working day, season, weather, temperature and year." },
    ],
    recommendations: [
      { title: "Rebalance the fleet before peaks", desc: "Move cycles to metro, bus and office zones before the 8 AM and 5-6 PM weekday peaks." },
      { title: "Win over weekend riders", desc: "Place cycles at leisure spots and run offers to turn casual riders into registered members." },
      { title: "Plan around weather and season", desc: "They swing demand by 40-50%. Use forecasts for daily rebalancing, and schedule maintenance in Spring and on rainy days." },
      { title: "Protect the revenue base", desc: "Registered users generate about 81% of rides, so offer commuter passes and loyalty rewards." },
      { title: "Size the fleet with a forecast", desc: "A forecasting model built on these drivers (R² 0.93) can size the fleet." },
    ],
    stack: [
      { group: "Analysis", items: ["Python", "pandas", "SciPy", "statsmodels", "Jupyter"] },
      { group: "Statistics", items: ["t-test", "ANOVA", "Chi-square", "Mann-Whitney U", "Kruskal-Wallis", "OLS regression"] },
    ],
  },
  {
    slug: "delhivery",
    number: 6,
    caseName: "Delhivery business case",
    titleLead: "Delhivery:",
    titleAccent: "feature engineering on trip data",
    intro:
      "Turning 144,867 raw pipeline rows into a clean, model-ready table of 14,817 delivery trips, and showing that real trips take about 2.1 times as long as the routing engine plans.",
    metaDescription:
      "Feature engineering on 144,867 Delhivery logistics rows to build a model-ready table of 14,817 trips, from the Scaler Data Science & ML program.",
    repo: "https://github.com/dot-hpg/delhivery-feature-engineering",
    report: "reports/Delhivery_Feature_Engineering.pdf",
    notebook: "Delhivery_Feature_Engineering.ipynb",
    stats: [
      { value: "144,867", label: "Raw pipeline rows" },
      { value: "14,817", label: "Clean delivery trips" },
      { value: "67", label: "Model-ready features" },
      { value: "2.1x", label: "Actual time vs planned time" },
    ],
    brief: [
      "Delhivery is a large Indian logistics company. Its pipelines log every package movement as many rows: one trip is split into segments, and each segment into checkpoints with running-total time and distance columns. In this form, the data can't be used for forecasting.",
      "The task was to clean the data, rebuild each trip, engineer features for ETA forecasting, test whether planned times and distances match reality, and turn the results into a model-ready dataset and business recommendations.",
    ],
    findings: [
      { value: "2.1x", title: "Trips take twice the plan", desc: "The median trip takes 2.1 times the time planned by the OSRM routing engine, and 99% of trips run slower than plan." },
      { value: "26 vs 70", title: "Speed is overestimated", desc: "Real median speed is about 26 km/h, while OSRM assumes about 70 km/h." },
      { value: "~39%", title: "Hubs eat the time", desc: "About 39% of scan-to-scan time isn't spent driving. That's about 1.8 hours per trip." },
      { value: "44%", title: "Three states lead", desc: "Maharashtra (18%), Karnataka (15%) and Haryana (11%) are the top origin states." },
      { value: "707", title: "The busiest corridors", desc: "Bhiwandi ↔ Mumbai has 707 trips and Delhi ↔ Gurgaon has 513." },
      { value: "~674", title: "Trips per day", desc: "The data covers 22 days, from 12 Sep to 3 Oct 2018." },
    ],
    table: {
      kicker: "Hypothesis tests",
      title: "Do the plans match reality?",
      intro: "Paired tests at α = 0.05, with Wilcoxon signed-rank as the deciding test because the differences aren't normal. With this much data every test rejects H0, so the practical gap is what matters.",
      headers: ["Comparison", "Gap", "Practical meaning"],
      rows: [
        ["od_end − od_start vs start_scan_to_end_scan", "~0.2%", "Same quantity (rounding only)"],
        ["actual_time vs osrm_time", "2.1x", "Routing engine underestimates time"],
        ["actual_time vs segment_actual_time", "~1%", "Consistent"],
        ["osrm_distance vs segment_osrm_distance", "~1-5%", "Consistent (segments add small detours)"],
        ["osrm_time vs segment_osrm_time", "~2-8%", "Consistent"],
        ["FTL vs Carting delay ratio (Mann-Whitney)", "Significant", "Carting runs further over plan"],
      ],
    },
    charts: [
      { src: "/scaler/delhivery/07_actual_time_vs_osrm_time.png", alt: "Comparison of actual trip time and OSRM planned time", width: 2234, height: 501, caption: "Actual time against the routing engine's planned time." },
      { src: "/scaler/delhivery/13_busiest_corridors.png", alt: "Chart of the busiest delivery corridors", width: 2231, height: 712, caption: "The busiest corridors." },
      { src: "/scaler/delhivery/14_route_distance_delay.png", alt: "Charts of delay by route type and distance", width: 2234, height: 554, caption: "Delay by route type and distance." },
    ],
    method: [
      { title: "Two-stage merge", desc: "Rows become 26,368 segments, then 14,817 trips, with the right aggregation (first, last or sum) chosen for every column." },
      { title: "A built-in check", desc: "Confirms that the last running total equals the segment maximum in 100% of segments." },
      { title: "Feature engineering", desc: "City, place, code and state from facility names, plus calendar features, trip duration, corridor, delay ratio, speed and hub handling time." },
      { title: "Outliers capped, not dropped", desc: "About 14% of trips are IQR outliers, nearly all genuine long-haul FTL trips. Capping keeps them and cuts skewness from about 3.5 to 1.2." },
      { title: "Encoding", desc: "One-hot for route type, data, time of day, day of week and top 10 states. Frequency encoding for high-cardinality centres, cities and corridors." },
      { title: "Scaling", desc: "StandardScaler (saved) and MinMaxScaler (compared), producing 14,817 rows × 67 features." },
    ],
    recommendations: [
      { title: "Show customers realistic ETAs", desc: "About 2x the routing estimate overall and 2.5-3x inside Mumbai and Delhi NCR, updated weekly per lane." },
      { title: "Cut hub waiting time first", desc: "Add docks and staff at Gurgaon Bilaspur, Bhiwandi and Bengaluru Nelamangala during the 8 pm to midnight peak." },
      { title: "Run scheduled off-peak shuttles", desc: "On Bhiwandi ↔ Mumbai and Delhi ↔ Gurgaon/Noida." },
      { title: "Grow capacity where demand is", desc: "Start with Maharashtra, Karnataka and Haryana, which make up 44% of trips." },
      { title: "Review the weakest operations", desc: "Send operations reviews to Muzaffarpur, Kolkata and Mumbai, and copy what works in Bengaluru." },
    ],
    stack: [
      { group: "Data", items: ["Python", "pandas", "Jupyter"] },
      { group: "Statistics and ML", items: ["SciPy", "scikit-learn", "Wilcoxon signed-rank", "Mann-Whitney U"] },
      { group: "Techniques", items: ["Feature engineering", "IQR capping", "One-hot encoding", "Frequency encoding", "Scaling"] },
    ],
  },
];
