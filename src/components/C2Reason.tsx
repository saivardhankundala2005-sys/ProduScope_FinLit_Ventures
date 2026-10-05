import React, { useState } from 'react';
import { COPY } from '../copy';

interface C2ReasonProps {
  onSelectReason: (reasonId: string, durationMonths: number, isFastPath: boolean) => void;
}

export const C2Reason: React.FC<C2ReasonProps> = ({ onSelectReason }) => {
  const [selectedId, setSelectedId] = useState<string>('');
  const [selectedMonths, setSelectedMonths] = useState<number>(3);

  const handleChipClick = (id: string) => {
    setSelectedId(id);
  };

  const handleContinue = () => {
    if (!selectedId) return;
    const reasonObj = COPY.c2Reason.reasons.find((r) => r.id === selectedId);
    const isFast = reasonObj ? reasonObj.fastPath : false;
    onSelectReason(selectedId, selectedMonths, isFast);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h2 style={{ fontSize: '18px', fontWeight: 600 }}>{COPY.c2Reason.title}</h2>
      <p style={{ fontSize: '14px', color: 'var(--slate)' }}>{COPY.c2Reason.subtitle}</p>

      <div className="chip-grid">
        {COPY.c2Reason.reasons.map((r) => (
          <button
            key={r.id}
            className={`chip-btn ${selectedId === r.id ? 'selected' : ''}`}
            onClick={() => handleChipClick(r.id)}
          >
            <span>{r.label}</span>
            {selectedId === r.id && <span style={{ fontSize: '12px', fontWeight: 600 }}>Selected</span>}
          </button>
        ))}
      </div>

      <div style={{ marginTop: '8px' }}>
        <label style={{ fontSize: '13px', fontWeight: 500, color: 'var(--slate)', display: 'block', marginBottom: '6px' }}>
          {COPY.c2Reason.durationLabel}
        </label>
        <div style={{ display: 'flex', gap: '8px' }}>
          {COPY.c2Reason.durations.map((d) => (
            <button
              key={d.months}
              className={`btn-secondary ${selectedMonths === d.months ? 'selected' : ''}`}
              style={{
                flex: 1,
                fontSize: '13px',
                padding: '8px',
                borderColor: selectedMonths === d.months ? 'var(--signal)' : 'var(--rule)',
                background: selectedMonths === d.months ? '#F0F4F9' : 'var(--paper)',
              }}
              onClick={() => setSelectedMonths(d.months)}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      <button
        className="btn-primary"
        style={{ marginTop: '12px', opacity: selectedId ? 1 : 0.5 }}
        disabled={!selectedId}
        onClick={handleContinue}
      >
        {COPY.c2Reason.btnContinue}
      </button>
    </div>
  );
};
