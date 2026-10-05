import React from 'react';
import { Persona } from '../engine/types';
import { COPY } from '../copy';

interface JudgePanelProps {
  currentPersona: Persona;
  currentFundCode: number;
  asOfDate: string;
  annualReturn: number;
  pauseMonths: number;
  availableFunds: Array<{ code: number; shortName: string; category: string; asOfDate: string; drawdownPct: number }>;
  onSelectPersona: (pId: 'rohan' | 'priya') => void;
  onSelectBufferCategory: (cat: Persona['emergencyBufferCategory']) => void;
  onSelectFund: (code: number) => void;
  onChangeAsOfDate: (d: string) => void;
  onChangeReturn: (r: number) => void;
  onChangePauseMonths: (m: number) => void;
  onReset: () => void;
}

export const JudgePanel: React.FC<JudgePanelProps> = ({
  currentPersona,
  currentFundCode,
  asOfDate,
  annualReturn,
  pauseMonths,
  availableFunds,
  onSelectPersona,
  onSelectBufferCategory,
  onSelectFund,
  onChangeAsOfDate,
  onChangeReturn,
  onChangePauseMonths,
  onReset,
}) => {
  return (
    <div className="side-panel">
      <div className="panel-title">{COPY.judgePanel.title}</div>

      {/* Persona Selection */}
      <div className="panel-field">
        <label>{COPY.judgePanel.personaLabel}</label>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            className={`btn-secondary ${currentPersona.id === 'rohan' ? 'selected' : ''}`}
            style={{
              flex: 1,
              borderColor: currentPersona.id === 'rohan' ? 'var(--signal)' : 'var(--rule)',
              background: currentPersona.id === 'rohan' ? '#F0F4F9' : 'var(--paper)',
            }}
            onClick={() => onSelectPersona('rohan')}
          >
            Rohan (₹5k SIP)
          </button>
          <button
            className={`btn-secondary ${currentPersona.id === 'priya' ? 'selected' : ''}`}
            style={{
              flex: 1,
              borderColor: currentPersona.id === 'priya' ? 'var(--signal)' : 'var(--rule)',
              background: currentPersona.id === 'priya' ? '#F0F4F9' : 'var(--paper)',
            }}
            onClick={() => onSelectPersona('priya')}
          >
            Priya (₹3k SIP)
          </button>
        </div>
      </div>

      {/* Emergency Buffer Category */}
      <div className="panel-field">
        <label>Emergency Buffer Band</label>
        <select
          className="panel-select"
          value={currentPersona.emergencyBufferCategory}
          onChange={(e) => onSelectBufferCategory(e.target.value as Persona['emergencyBufferCategory'])}
        >
          <option value=">=3_months">&ge; 3 months buffer (k = 1.0)</option>
          <option value="1-3_months">1 to 3 months buffer (k = 1.3)</option>
          <option value="<1_month">&lt; 1 month buffer (k = 1.6)</option>
        </select>
      </div>

      {/* Fund Selection */}
      <div className="panel-field">
        <label>{COPY.judgePanel.fundLabel}</label>
        <select
          className="panel-select"
          value={currentFundCode}
          onChange={(e) => onSelectFund(parseInt(e.target.value, 10))}
        >
          {availableFunds.map((f) => (
            <option key={f.code} value={f.code}>
              {f.shortName} ({f.category}) - {f.drawdownPct.toFixed(1)}% dip
            </option>
          ))}
        </select>
      </div>

      {/* As Of Date */}
      <div className="panel-field">
        <label>{COPY.judgePanel.asOfDateLabel}</label>
        <select
          className="panel-select"
          value={asOfDate}
          onChange={(e) => onChangeAsOfDate(e.target.value)}
        >
          <option value="2025-02-24">2025-02-24 (14.0% dip - Default)</option>
          <option value="2020-03-11">2020-03-11 (12.2% COVID dip)</option>
          <option value="2025-03-06">2025-03-06 (14.0% dip)</option>
        </select>
      </div>

      {/* Return Assumption */}
      <div className="panel-field">
        <label>{COPY.judgePanel.returnLabel}: {Math.round(annualReturn * 100)}%</label>
        <input
          type="range"
          min={6}
          max={12}
          value={Math.round(annualReturn * 100)}
          onChange={(e) => onChangeReturn(parseInt(e.target.value, 10) / 100.0)}
        />
      </div>

      {/* Pause Duration */}
      <div className="panel-field">
        <label>{COPY.judgePanel.pauseLengthLabel}: {pauseMonths} months</label>
        <div style={{ display: 'flex', gap: '8px' }}>
          {[1, 3, 6].map((m) => (
            <button
              key={m}
              className={`btn-secondary ${pauseMonths === m ? 'selected' : ''}`}
              style={{
                flex: 1,
                borderColor: pauseMonths === m ? 'var(--signal)' : 'var(--rule)',
                background: pauseMonths === m ? '#F0F4F9' : 'var(--paper)',
              }}
              onClick={() => onChangePauseMonths(m)}
            >
              {m}m
            </button>
          ))}
        </div>
      </div>

      <button className="btn-secondary" onClick={onReset} style={{ marginTop: 'auto' }}>
        {COPY.judgePanel.btnReset}
      </button>
    </div>
  );
};
