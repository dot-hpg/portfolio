// Query outputs from the Target Brazil SQL case study
// (github.com/dot-hpg/target-brazil-sql-case-study, outputs/results/*.csv).

const REPO_RESULTS = "https://github.com/dot-hpg/target-brazil-sql-case-study/blob/main/outputs/results";

// 2_2_monthly_trend.csv, Jan 2017 to Aug 2018 (the months with complete data).
export const monthlyOrders: { month: string; value: number }[] = [
  { month: "2017-01", value: 800 },
  { month: "2017-02", value: 1780 },
  { month: "2017-03", value: 2682 },
  { month: "2017-04", value: 2404 },
  { month: "2017-05", value: 3700 },
  { month: "2017-06", value: 3245 },
  { month: "2017-07", value: 4026 },
  { month: "2017-08", value: 4331 },
  { month: "2017-09", value: 4285 },
  { month: "2017-10", value: 4631 },
  { month: "2017-11", value: 7544 },
  { month: "2017-12", value: 5673 },
  { month: "2018-01", value: 7269 },
  { month: "2018-02", value: 6728 },
  { month: "2018-03", value: 7211 },
  { month: "2018-04", value: 6939 },
  { month: "2018-05", value: 6873 },
  { month: "2018-06", value: 6167 },
  { month: "2018-07", value: 6292 },
  { month: "2018-08", value: 6512 },
];

// 7_6_monthly_late_delivery_rate.csv, % of delivered orders that arrived after the estimate.
export const lateRate: { month: string; value: number }[] = [
  { month: "2017-01", value: 2.93 },
  { month: "2017-02", value: 2.96 },
  { month: "2017-03", value: 4.56 },
  { month: "2017-04", value: 6.56 },
  { month: "2017-05", value: 2.99 },
  { month: "2017-06", value: 3.03 },
  { month: "2017-07", value: 2.79 },
  { month: "2017-08", value: 2.91 },
  { month: "2017-09", value: 4.39 },
  { month: "2017-10", value: 4.18 },
  { month: "2017-11", value: 12.4 },
  { month: "2017-12", value: 7.46 },
  { month: "2018-01", value: 5.7 },
  { month: "2018-02", value: 14.13 },
  { month: "2018-03", value: 18.96 },
  { month: "2018-04", value: 4.5 },
  { month: "2018-05", value: 6.56 },
  { month: "2018-06", value: 1.16 },
  { month: "2018-07", value: 3.38 },
  { month: "2018-08", value: 6.19 },
];

// 7_1_late_delivery_vs_review_score.csv
export const reviewByDelivery: { bucket: string; late: boolean; orders: number; score: number; oneStar: number }[] = [
  { bucket: "15+ days early", late: false, orders: 29453, score: 4.32, oneStar: 6.66 },
  { bucket: "8-14 days early", late: false, orders: 36676, score: 4.32, oneStar: 6.18 },
  { bucket: "0-7 days early", late: false, orders: 23314, score: 4.2, oneStar: 7.11 },
  { bucket: "1-3 days late", late: true, orders: 1852, score: 3.29, oneStar: 25.11 },
  { bucket: "4-7 days late", late: true, orders: 1748, score: 2.11, oneStar: 58.47 },
  { bucket: "8+ days late", late: true, orders: 2781, score: 1.7, oneStar: 69.72 },
];

export const sources = {
  monthlyOrders: `${REPO_RESULTS}/2_2_monthly_trend.csv`,
  lateRate: `${REPO_RESULTS}/7_6_monthly_late_delivery_rate.csv`,
  reviewByDelivery: `${REPO_RESULTS}/7_1_late_delivery_vs_review_score.csv`,
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export function monthLabel(m: string, withYear = true) {
  const [y, mm] = m.split("-");
  return withYear ? `${MONTHS[Number(mm) - 1]} ${y}` : MONTHS[Number(mm) - 1];
}
