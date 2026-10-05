import React from 'react';
import { CalculationResult, OptionType } from '../engine/types';
import { COPY } from '../copy';
import { formatPercent, getF1Narration } from '../engine/narration';

interface F1FastPathProps {
  calculation: CalculationResult;
  pauseMonths: number;
  onSelectOptionFast: (opt: OptionType) => void;
}

export const F1FastPath: React.FC<F1FastPathProps> = ({ calculation, pauseMonths, onSelectOptionFast }) => {
  const narration = getF1Narration(calculation, pauseMonths);
  const options = calculation.options;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h2 style={{ fontSize: '18px', fontWeight: 600 }}>{COPY.f1FastPath.title}</h2>
      <p style={{ fontSize: '14px', color: 'var(--slate)' }}>{COPY.f1FastPath.subtitle}</p>

      <div
        style={{
          border: '1px solid var(--rule)',
          borderRadius: '4px',
          padding: '16px',
          background: 'var(--mist)',
          fontSize: '14px',
          fontWeight: 500,
        }}
      >
        {narration}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <button className="btn-secondary" onClick={() => onSelectOptionFast('continue')}>
          Keep SIP at ₹{options.continue.monthlyAmount.toLocaleString('en-IN')}/mo ({formatPercent(options.continue.goalProgressPct)} goal progress)
        </button>
        <button className="btn-secondary" onClick={() => onSelectOptionFast('pause')}>
          Pause {pauseMonths} months ({formatPercent(options.pause.goalProgressPct)} goal progress)
        </button>
        <button className="btn-secondary" onClick={() => onSelectOptionFast('reduce')}>
          Reduce to ₹{options.reduce.monthlyAmount.toLocaleString('en-IN')}/mo ({formatPercent(options.reduce.goalProgressPct)} goal progress)
        </button>
        <button className="btn-secondary" onClick={() => onSelectOptionFast('stop')}>
          Stop SIP ({formatPercent(options.stop.goalProgressPct)} goal progress)
        </button>
      </div>
    </div>
  );
};
