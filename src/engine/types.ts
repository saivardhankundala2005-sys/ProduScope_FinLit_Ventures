export interface Persona {
  id: 'rohan' | 'priya';
  name: string;
  monthlySip: number;
  goalAmount: number;
  goalMonths: number;
  goalName: string;
  currentCorpus: number;
  takeHomePay: number;
  fixedObligations: number;
  emergencyBufferCategory: '>=3_months' | '1-3_months' | '<1_month';
}

export type OptionType = 'continue' | 'reduce' | 'pause' | 'stop';

export interface EngineInputs {
  persona: Persona;
  chosenOption: OptionType;
  annualReturn: number; // e.g. 0.08 for 8%
  goalMonthsOverride?: number;
  pauseMonths?: number; // default 3
  reducedSipAmount?: number; // default e.g. 2500
}

export interface OptionProjection {
  type: OptionType;
  title: string;
  monthlyAmount: number;
  projectedCorpus: number;
  projectedCorpusLow: number;  // at r=6%
  projectedCorpusHigh: number; // at r=10%
  goalProgressPct: number;
  goalProgressPctLow: number;
  goalProgressPctHigh: number;
  strainPct: number; // 0 to 100
  comfortScore: number; // 0 to 1
  fitScore: number; // 0 to 100 for current lambda
}

export interface CalculationResult {
  options: Record<OptionType, OptionProjection>;
  flipPointContinueVsPause: number; // lambda value
  flipPointPauseVsReduce: number;   // lambda value
  sliderLambda: number;             // current slider position [0, 1]
  leadingOption: OptionType;
  pauseReceipt: {
    pauseMonths: number;
    monthlySip: number;
    skippedContributions: number;
    growthOnSkipped: number;
    growthOnSkippedLow: number;
    growthOnSkippedHigh: number;
    totalCostAtGoalDate: number;
    totalCostAtGoalDateLow: number;
    totalCostAtGoalDateHigh: number;
    goalProgressBeforePct: number;
    goalProgressAfterPct: number;
  };
  stopConsequence: {
    projectedCorpus: number;
    goalProgressPct: number;
  };
}

export interface ReplayDataPoint {
  date: string;
  nav: number;
  keptInvestingValue: number;
  pausedValue: number;
}

export interface ReplayResult {
  dataPoints: ReplayDataPoint[];
  rupeeGap: number;
  percentageGap: number;
  finalKeptValue: number;
  finalPausedValue: number;
  fundName: string;
  episodeName: string;
  isGapNegligible: boolean;
}
