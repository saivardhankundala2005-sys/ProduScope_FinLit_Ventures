import { ReplayResult, ReplayDataPoint } from './types';

export interface MonthlyNavRecord {
  date: string;
  nav: number;
}

export function computeHistoricalReplay(
  navSeries: MonthlyNavRecord[],
  monthlySip: number = 5000,
  pauseMonths: number = 3,
  fundName: string = 'HDFC Mid-Cap Opportunities Fund'
): ReplayResult {
  if (!navSeries || navSeries.length === 0) {
    return {
      dataPoints: [],
      rupeeGap: 0,
      percentageGap: 0,
      finalKeptValue: 0,
      finalPausedValue: 0,
      fundName,
      episodeName: 'March 2020 episode',
      isGapNegligible: false,
    };
  }

  // Find peak and drawdown in 2020 episode (around Feb - April 2020)
  let peakNav = 0;
  let pauseStartIndex = -1;

  for (let i = 0; i < navSeries.length; i++) {
    const rec = navSeries[i];
    if (rec.nav > peakNav) {
      peakNav = rec.nav;
    }
    const drawdownPct = ((peakNav - rec.nav) / peakNav) * 100;
    if (drawdownPct >= 10.0 && rec.date.startsWith('2020-03')) {
      pauseStartIndex = i;
      break;
    }
  }

  // Fallback if not found exactly on 2020-03
  if (pauseStartIndex === -1) {
    pauseStartIndex = navSeries.findIndex((r) => r.date >= '2020-03-01');
  }
  if (pauseStartIndex === -1) {
    pauseStartIndex = Math.floor(navSeries.length / 2);
  }

  // Window: 6 months before pause start through 24 months after
  const startWindowIndex = Math.max(0, pauseStartIndex - 6);
  const endWindowIndex = Math.min(navSeries.length - 1, pauseStartIndex + 24);

  const windowSeries = navSeries.slice(startWindowIndex, endWindowIndex + 1);

  let unitsKept = 0;
  let unitsPaused = 0;
  const dataPoints: ReplayDataPoint[] = [];

  windowSeries.forEach((rec, idx) => {
    // Kept investing: buys units every month
    const unitsBoughtKept = monthlySip / rec.nav;
    unitsKept += unitsBoughtKept;

    // Paused: skips pauseMonths starting from pauseStartIndex relative position
    const relativeIdx = idx - (pauseStartIndex - startWindowIndex);
    const isPausedMonth = relativeIdx >= 0 && relativeIdx < pauseMonths;

    if (!isPausedMonth) {
      const unitsBoughtPaused = monthlySip / rec.nav;
      unitsPaused += unitsBoughtPaused;
    }

    const valKept = unitsKept * rec.nav;
    const valPaused = unitsPaused * rec.nav;

    dataPoints.push({
      date: rec.date,
      nav: rec.nav,
      keptInvestingValue: Math.round(valKept),
      pausedValue: Math.round(valPaused),
    });
  });

  const finalPt = dataPoints[dataPoints.length - 1];
  const finalKeptValue = finalPt ? finalPt.keptInvestingValue : 0;
  const finalPausedValue = finalPt ? finalPt.pausedValue : 0;
  const rupeeGap = finalKeptValue - finalPausedValue;
  const percentageGap = finalKeptValue > 0 ? (rupeeGap / finalKeptValue) * 100 : 0;
  const isGapNegligible = rupeeGap <= 0 || percentageGap < 1.0;

  return {
    dataPoints,
    rupeeGap,
    percentageGap,
    finalKeptValue,
    finalPausedValue,
    fundName,
    episodeName: 'March 2020 COVID episode',
    isGapNegligible,
  };
}
