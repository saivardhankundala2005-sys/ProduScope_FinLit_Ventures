import { CalculationResult, ReplayResult, Persona } from './types';

export function formatRupee(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatRupeeLakh(amount: number): string {
  if (amount >= 100000) {
    const lakhs = amount / 100000;
    return `₹${lakhs % 1 === 0 ? lakhs : lakhs.toFixed(1)} lakh`;
  }
  return formatRupee(amount);
}

export function formatPercent(val: number): string {
  return `${Math.round(val * 100)}%`;
}

export function getC1Narration(persona: Persona): string {
  return `Reviewing your ₹${persona.monthlySip.toLocaleString('en-IN')} monthly SIP towards ${persona.goalName}.`;
}

export function getC2Narration(reasonLabel: string, months: number): string {
  if (months > 0) {
    return `Reason selected: ${reasonLabel} for ${months} months.`;
  }
  return `Reason selected: ${reasonLabel}.`;
}

export function getC3Narration(replay: ReplayResult): string {
  if (replay.isGapNegligible) {
    return 'In this period, pausing made little difference.';
  }
  return `In the 2020 market drop, continuing the SIP produced a difference of ${formatRupee(replay.rupeeGap)} at the end of the 2-year window.`;
}

export function getC4Narration(calc: CalculationResult): string {
  const leadingOpt = calc.options[calc.leadingOption];
  return `With your current priority setting, the ${leadingOpt.title} option aligns closest with your criteria.`;
}

export function getC5Narration(calc: CalculationResult, selectedOption: string, months: number): string {
  const opt = calc.options[selectedOption as keyof typeof calc.options] || calc.options.pause;
  const prog = formatPercent(opt.goalProgressPct);

  if (selectedOption === 'pause') {
    return `Pausing for ${months} months sets your projected goal progress to ${prog} at the goal date.`;
  } else if (selectedOption === 'reduce') {
    return `Reducing your monthly contribution sets your projected goal progress to ${prog} at the goal date.`;
  } else if (selectedOption === 'stop') {
    return `Stopping your SIP leaves your goal progress at ${prog} at the goal date.`;
  }
  return `Continuing your current monthly contribution keeps projected goal progress at ${prog}.`;
}

export function getF1Narration(calc: CalculationResult, pauseMonths: number = 3): string {
  const contProg = formatPercent(calc.options.continue.goalProgressPct);
  const pauseProg = formatPercent(calc.options.pause.goalProgressPct);
  return `Pausing for ${pauseMonths} months lowers goal progress from ${contProg} to ${pauseProg}.`;
}
