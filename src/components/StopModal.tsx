import React from 'react';
import { CalculationResult } from '../engine/types';
import { COPY } from '../copy';
import { formatPercent } from '../engine/narration';

interface StopModalProps {
  calculation: CalculationResult;
  onGoBack: () => void;
  onProceedStop: () => void;
}

export const StopModal: React.FC<StopModalProps> = ({ calculation, onGoBack, onProceedStop }) => {
  const stopProg = formatPercent(calculation.stopConsequence.goalProgressPct);

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(22, 32, 42, 0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        zIndex: 200,
      }}
    >
      <div
        style={{
          background: 'var(--paper)',
          borderRadius: '8px',
          border: '1px solid var(--rule)',
          padding: '20px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
        }}
      >
        <h3 style={{ fontSize: '16px', fontWeight: 600 }}>{COPY.stopConsequence.title}</h3>
        <p style={{ fontSize: '14px', color: 'var(--slate)' }}>
          Stopping contributions will leave your goal at {stopProg} progress at your goal date.
        </p>

        <div className="btn-group-equal">
          <button className="btn-secondary" onClick={onGoBack}>
            {COPY.stopConsequence.btnGoBack}
          </button>
          <button className="btn-primary" onClick={onProceedStop}>
            {COPY.stopConsequence.btnProceedStop}
          </button>
        </div>
      </div>
    </div>
  );
};
