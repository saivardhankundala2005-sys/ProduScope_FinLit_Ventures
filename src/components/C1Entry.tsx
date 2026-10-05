import React from 'react';
import { COPY } from '../copy';

interface C1EntryProps {
  onShowChanges: () => void;
  onSkip: () => void;
}

export const C1Entry: React.FC<C1EntryProps> = ({ onShowChanges, onSkip }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h2 style={{ fontSize: '18px', fontWeight: 600 }}>{COPY.c1Entry.title}</h2>
      <p style={{ fontSize: '14px', color: 'var(--slate)' }}>{COPY.c1Entry.subtitle}</p>

      <div className="btn-group-equal" style={{ marginTop: '12px' }}>
        <button className="btn-primary" onClick={onShowChanges}>
          {COPY.c1Entry.btnShowChanges}
        </button>
        <button className="btn-secondary" onClick={onSkip}>
          {COPY.c1Entry.btnSkip}
        </button>
      </div>
    </div>
  );
};
