import { Persona, OptionType, EngineInputs, OptionProjection, CalculationResult } from './types';

export const PERSONA_ROHAN: Persona = {
  id: 'rohan',
  name: 'Rohan',
  monthlySip: 5000,
  goalAmount: 600000,
  goalMonths: 60,
  goalName: 'Down payment',
  currentCorpus: 120000,
  takeHomePay: 42000,
  fixedObligations: 20300,
  emergencyBufferCategory: '1-3_months',
};

export const PERSONA_PRIYA: Persona = {
  id: 'priya',
  name: 'Priya',
  monthlySip: 3000,
  goalAmount: 250000,
  goalMonths: 36,
  goalName: 'Emergency fund',
  currentCorpus: 40000,
  takeHomePay: 28000,
  fixedObligations: 22500,
  emergencyBufferCategory: '<1_month',
};

export function getBufferFactor(category: Persona['emergencyBufferCategory']): number {
  switch (category) {
    case '>=3_months':
      return 1.0;
    case '1-3_months':
      return 1.3;
    case '<1_month':
      return 1.6;
    default:
      return 1.3;
  }
}

export function calculateCorpus(
  currentCorpus: number,
  monthlySip: number,
  totalMonths: number,
  pauseMonths: number,
  option: OptionType,
  annualReturn: number,
  reducedSipAmount: number
): number {
  const i = Math.pow(1 + annualReturn, 1 / 12) - 1;
  const baseCorpusFv = currentCorpus * Math.pow(1 + annualReturn, totalMonths / 12);

  let sipFv = 0;
  if (option === 'continue') {
    sipFv = monthlySip * ((Math.pow(1 + i, totalMonths) - 1) / i);
  } else if (option === 'pause') {
    const activeMonths = Math.max(0, totalMonths - pauseMonths);
    sipFv = monthlySip * ((Math.pow(1 + i, activeMonths) - 1) / i);
  } else if (option === 'reduce') {
    const activeSip = reducedSipAmount > 0 ? reducedSipAmount : monthlySip / 2;
    sipFv = activeSip * ((Math.pow(1 + i, totalMonths) - 1) / i);
  } else if (option === 'stop') {
    sipFv = 0;
  }

  return baseCorpusFv + sipFv;
}

export function calculateEngine(inputs: EngineInputs, sliderLambda: number = 0.5): CalculationResult {
  const { persona, annualReturn } = inputs;
  const goalMonths = inputs.goalMonthsOverride || persona.goalMonths;
  const pauseMonths = inputs.pauseMonths ?? 3;
  const reducedSip = inputs.reducedSipAmount ?? (persona.monthlySip / 2);

  const surplus = Math.max(1, persona.takeHomePay - persona.fixedObligations);
  const k = getBufferFactor(persona.emergencyBufferCategory);

  const optionsList: OptionType[] = ['continue', 'reduce', 'pause', 'stop'];
  const projections: Record<OptionType, OptionProjection> = {} as any;

  for (const opt of optionsList) {
    const corpBase = calculateCorpus(persona.currentCorpus, persona.monthlySip, goalMonths, pauseMonths, opt, annualReturn, reducedSip);
    const corpLow = calculateCorpus(persona.currentCorpus, persona.monthlySip, goalMonths, pauseMonths, opt, 0.06, reducedSip);
    const corpHigh = calculateCorpus(persona.currentCorpus, persona.monthlySip, goalMonths, pauseMonths, opt, 0.10, reducedSip);

    const progBase = Math.min(1.0, corpBase / persona.goalAmount);
    const progLow = Math.min(1.0, corpLow / persona.goalAmount);
    const progHigh = Math.min(1.0, corpHigh / persona.goalAmount);

    let avgMonthlySip = persona.monthlySip;
    if (opt === 'continue') {
      avgMonthlySip = persona.monthlySip;
    } else if (opt === 'reduce') {
      avgMonthlySip = reducedSip;
    } else if (opt === 'pause') {
      avgMonthlySip = (Math.max(0, 12 - pauseMonths) * persona.monthlySip) / 12;
    } else if (opt === 'stop') {
      avgMonthlySip = 0;
    }

    const strain = avgMonthlySip / surplus;
    const comfort = 1 - Math.min(1, strain * k);
    const fit = 100 * (sliderLambda * progBase + (1 - sliderLambda) * comfort);

    let monthlyAmt = persona.monthlySip;
    let title = 'Continue';
    if (opt === 'reduce') {
      monthlyAmt = reducedSip;
      title = 'Reduce';
    } else if (opt === 'pause') {
      monthlyAmt = 0;
      title = `Pause ${pauseMonths}m`;
    } else if (opt === 'stop') {
      monthlyAmt = 0;
      title = 'Stop';
    }

    projections[opt] = {
      type: opt,
      title,
      monthlyAmount: monthlyAmt,
      projectedCorpus: Math.round(corpBase),
      projectedCorpusLow: Math.round(corpLow),
      projectedCorpusHigh: Math.round(corpHigh),
      goalProgressPct: progBase,
      goalProgressPctLow: progLow,
      goalProgressPctHigh: progHigh,
      strainPct: strain * 100,
      comfortScore: comfort,
      fitScore: fit,
    };
  }

  // Calculate closed-form flip points for slider lambda
  const gCont = projections.continue.goalProgressPct;
  const cCont = projections.continue.comfortScore;

  const gPause = projections.pause.goalProgressPct;
  const cPause = projections.pause.comfortScore;

  const gRed = projections.reduce.goalProgressPct;
  const cRed = projections.reduce.comfortScore;

  // Continue vs Pause flip point:
  // lambda * gCont + (1-lambda) * cCont = lambda * gPause + (1-lambda) * cPause
  // lambda * (gCont - gPause + cPause - cCont) = cPause - cCont
  const denomContPause = (gCont - gPause) + (cPause - cCont);
  const flipContPause = denomContPause !== 0 ? (cPause - cCont) / denomContPause : 0.5;

  // Pause vs Reduce flip point:
  const denomPauseRed = (gPause - gRed) + (cRed - cPause);
  const flipPauseRed = denomPauseRed !== 0 ? (cRed - cPause) / denomPauseRed : 0.5;

  // Determine leading option based on fit scores among Continue, Reduce, Pause
  let leading: OptionType = 'continue';
  const mainOpts: OptionType[] = ['continue', 'pause', 'reduce'];
  let maxFit = -1;
  for (const opt of mainOpts) {
    if (projections[opt].fitScore > maxFit) {
      maxFit = projections[opt].fitScore;
      leading = opt;
    }
  }

  // Pause receipt calculations
  const skippedContributions = pauseMonths * persona.monthlySip;
  const costAtGoalDate = projections.continue.projectedCorpus - projections.pause.projectedCorpus;
  const costAtGoalDateLow = projections.continue.projectedCorpusLow - projections.pause.projectedCorpusLow;
  const costAtGoalDateHigh = projections.continue.projectedCorpusHigh - projections.pause.projectedCorpusHigh;

  const growthOnSkipped = costAtGoalDate - skippedContributions;
  const growthOnSkippedLow = costAtGoalDateLow - skippedContributions;
  const growthOnSkippedHigh = costAtGoalDateHigh - skippedContributions;

  return {
    options: projections,
    flipPointContinueVsPause: Math.max(0, Math.min(1, flipContPause)),
    flipPointPauseVsReduce: Math.max(0, Math.min(1, flipPauseRed)),
    sliderLambda,
    leadingOption: leading,
    pauseReceipt: {
      pauseMonths,
      monthlySip: persona.monthlySip,
      skippedContributions,
      growthOnSkipped,
      growthOnSkippedLow,
      growthOnSkippedHigh,
      totalCostAtGoalDate: costAtGoalDate,
      totalCostAtGoalDateLow: costAtGoalDateLow,
      totalCostAtGoalDateHigh: costAtGoalDateHigh,
      goalProgressBeforePct: projections.continue.goalProgressPct,
      goalProgressAfterPct: projections.pause.goalProgressPct,
    },
    stopConsequence: {
      projectedCorpus: projections.stop.projectedCorpus,
      goalProgressPct: projections.stop.goalProgressPct,
    },
  };
}
