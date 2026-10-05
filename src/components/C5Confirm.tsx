import React, { useState } from 'react';
import { CalculationResult, OptionType } from '../engine/types';
import { COPY } from '../copy';
import { getC5Narration } from '../engine/narration';

interface C5ConfirmProps {
  calculation: CalculationResult;
  selectedOption: OptionType;
  pauseMonths: number;
  onConfirmSubmit: (reminderSet: boolean) => void;
}

export const C5Confirm: React.FC<C5ConfirmProps> = ({
  calculation,
  selectedOption,
  pauseMonths,
  onConfirmSubmit,
}) => {
  const [reminderSet, setReminderSet] = useState<boolean>(true);

  const narrationSentence = getC5Narration(calculation, selectedOption, pauseMonths);
  const selectedObj = calculation.options[selectedOption];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h2 style={{ fontSize: '18px', fontWeight: 600 }}>{COPY.c5Confirm.title}</h2>

      <div
        style={{
          border: '1px solid var(--rule)',
          borderRadius: '4px',
          padding: '16px',
          background: 'var(--mist)',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        <div style={{ fontSize: '13px', color: 'var(--slate)' }}>{COPY.c5Confirm.chosenPrefix}</div>
        <div style={{ fontSize: '16px', fontWeight: 600 }}>{selectedObj.title}</div>
        <p style={{ fontSize: '14px', color: 'var(--ink)', marginTop: '4px' }}>{narrationSentence}</p>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '12px',
          border: '1px solid var(--rule)',
          borderRadius: '4px',
          background: 'var(--paper)',
        }}
      >
        <input
          type="checkbox"
          id="reminder-check"
          checked={reminderSet}
          onChange={(e) => setReminderSet(e.target.checked)}
          style={{ width: '18px', height: '18px', cursor: 'pointer' }}
        />
        <label htmlFor="reminder-check" style={{ fontSize: '14px', cursor: 'pointer' }}>
          {COPY.c5Confirm.reminderLabel}
        </label>
      </div>

      <button className="btn-primary" onClick={() => onConfirmSubmit(reminderSet)} style={{ marginTop: '8px' }}>
        {COPY.c5Confirm.btnSubmit}
      </button>
    </div>
  );
};
