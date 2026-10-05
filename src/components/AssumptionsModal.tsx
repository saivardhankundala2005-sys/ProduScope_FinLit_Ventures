import React from 'react';
import { COPY } from '../copy';

interface AssumptionsModalProps {
  annualReturn: number;
  goalMonths: number;
  pauseMonths: number;
  onChangeAnnualReturn: (r: number) => void;
  onChangeGoalMonths: (m: number) => void;
  onChangePauseMonths: (m: number) => void;
  onClose: () => void;
}

export const AssumptionsModal: React.FC<AssumptionsModalProps> = ({
  annualReturn,
  goalMonths,
  pauseMonths,
  onChangeAnnualReturn,
  onChangeGoalMonths,
  onChangePauseMonths,
  onClose,
}) => {
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
        <h3 style={{ fontSize: '16px', fontWeight: 600 }}>{COPY.assumptions.title}</h3>

        <div style={{ fontSize: '13px', color: 'var(--slate)', background: 'var(--mist)', padding: '10px', borderRadius: '4px' }}>
          <p>{COPY.assumptions.projectionBasis}</p>
          <p style={{ marginTop: '4px' }}>{COPY.assumptions.skippedMoneyNote}</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ fontSize: '13px', fontWeight: 500, color: 'var(--slate)' }}>
              {COPY.assumptions.annualReturnLabel} {Math.round(annualReturn * 100)}%
            </label>
            <input
              type="range"
              min={6}
              max={12}
              value={Math.round(annualReturn * 100)}
              onChange={(e) => onChangeAnnualReturn(parseInt(e.target.value, 10) / 100.0)}
              style={{ width: '100%', marginTop: '4px' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '13px', fontWeight: 500, color: 'var(--slate)' }}>
              {COPY.assumptions.goalMonthsLabel} {goalMonths} months
            </label>
            <input
              type="range"
              min={12}
              max={120}
              step={6}
              value={goalMonths}
              onChange={(e) => onChangeGoalMonths(parseInt(e.target.value, 10))}
              style={{ width: '100%', marginTop: '4px' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '13px', fontWeight: 500, color: 'var(--slate)' }}>
              Pause duration: {pauseMonths} months
            </label>
            <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
              {[1, 3, 6].map((m) => (
                <button
                  key={m}
                  className={`btn-secondary ${pauseMonths === m ? 'selected' : ''}`}
                  style={{
                    flex: 1,
                    fontSize: '13px',
                    padding: '6px',
                    borderColor: pauseMonths === m ? 'var(--signal)' : 'var(--rule)',
                  }}
                  onClick={() => onChangePauseMonths(m)}
                >
                  {m}m
                </button>
              ))}
            </div>
          </div>
        </div>

        <button className="btn-primary" onClick={onClose} style={{ marginTop: '8px' }}>
          {COPY.assumptions.btnClose}
        </button>
      </div>
    </div>
  );
};
