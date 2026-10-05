import { describe, it, expect } from 'vitest';
import { calculateEngine, PERSONA_ROHAN } from './calculator';

describe('Engine Acceptance Tests for Persona Rohan', () => {
  const result = calculateEngine({
    persona: PERSONA_ROHAN,
    chosenOption: 'continue',
    annualReturn: 0.08,
    pauseMonths: 3,
    reducedSipAmount: 2500,
  });

  it('Continue goal progress at 8% should be about 90%', () => {
    const prog = result.options.continue.goalProgressPct * 100;
    expect(prog).toBeGreaterThanOrEqual(89);
    expect(prog).toBeLessThanOrEqual(91);
  });

  it('Pause 3 months goal progress at 8% should be about 87%', () => {
    const prog = result.options.pause.goalProgressPct * 100;
    expect(prog).toBeGreaterThanOrEqual(86);
    expect(prog).toBeLessThanOrEqual(88);
  });

  it('Pause 3 months cost at goal date should be about ₹21,800', () => {
    const cost = result.pauseReceipt.totalCostAtGoalDate;
    expect(cost).toBeGreaterThanOrEqual(20800);
    expect(cost).toBeLessThanOrEqual(22800);
  });

  it('Reduce to ₹2,500 goal progress should be about 60%', () => {
    const prog = result.options.reduce.goalProgressPct * 100;
    expect(prog).toBeGreaterThanOrEqual(59);
    expect(prog).toBeLessThanOrEqual(61);
  });

  it('Stop goal progress should be about 29%', () => {
    const prog = result.options.stop.goalProgressPct * 100;
    expect(prog).toBeGreaterThanOrEqual(28);
    expect(prog).toBeLessThanOrEqual(30);
  });

  it('Rohan SIP strain for Continue should be about 23%', () => {
    const strain = result.options.continue.strainPct;
    expect(strain).toBeGreaterThanOrEqual(22);
    expect(strain).toBeLessThanOrEqual(24);
  });

  it('Flip point Continue vs Pause should be about 0.68 (±0.02)', () => {
    const flip = result.flipPointContinueVsPause;
    expect(flip).toBeGreaterThanOrEqual(0.66);
    expect(flip).toBeLessThanOrEqual(0.70);
  });

  it('Flip point Pause vs Reduce should be about 0.22 (±0.02)', () => {
    const flip = result.flipPointPauseVsReduce;
    expect(flip).toBeGreaterThanOrEqual(0.20);
    expect(flip).toBeLessThanOrEqual(0.24);
  });
});
