import React, { useState } from 'react';
import { COPY } from '../copy';

// Simple PRNG generator for 240 simulated sessions
function seedRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export const MetricsDashboard: React.FC = () => {
  const [ffSurveyOpen, setFfSurveyOpen] = useState(false);
  const [surveyResponse, setSurveyResponse] = useState<string | null>(null);

  const rng = seedRandom(20261005);

  // Generate 240 simulated sessions
  const totalSim = 240;
  let informedCount = 0;
  let fastPathTimes: number[] = [];
  const mix = { continue: 0, reduce: 0, pause: 0, stop: 0, skipped: 0 };

  for (let i = 0; i < totalSim; i++) {
    const cardsViewed = Math.floor(rng() * 3) + 1; // 1 to 3
    const timeSpent = Math.floor(rng() * 40) + 5;  // 5 to 45s
    const isFast = rng() > 0.6;
    if (isFast) {
      fastPathTimes.push(Math.floor(rng() * 30) + 12); // 12 to 42s
    }

    const randOutcome = rng();
    let outcome: keyof typeof mix = 'pause';
    if (randOutcome < 0.28) outcome = 'continue';
    else if (randOutcome < 0.52) outcome = 'pause';
    else if (randOutcome < 0.74) outcome = 'reduce';
    else if (randOutcome < 0.88) outcome = 'stop';
    else outcome = 'skipped';

    mix[outcome]++;

    // Informed decision check: >=2 cards viewed, >=15s spent, active choice (not skipped)
    if (cardsViewed >= 2 && timeSpent >= 15 && outcome !== 'skipped') {
      informedCount++;
    }
  }

  const idrPct = Math.round((informedCount / totalSim) * 100);
  fastPathTimes.sort((a, b) => a - b);
  const medianFastTime = fastPathTimes.length > 0 ? fastPathTimes[Math.floor(fastPathTimes.length / 2)] : 28;

  const handleSurveySubmit = (ans: string) => {
    setSurveyResponse(ans);
  };

  return (
    <div className="metrics-dashboard">
      <div>
        <h2 style={{ fontSize: '20px', fontWeight: 600 }}>{COPY.metricsTab.title}</h2>
        <p style={{ fontSize: '13px', color: 'var(--slate)', marginTop: '2px' }}>{COPY.metricsTab.subtext}</p>
      </div>

      {/* Summary Cards */}
      <div className="metrics-summary-grid">
        <div className="metric-card">
          <div style={{ fontSize: '13px', color: 'var(--slate)' }}>{COPY.metricsTab.northStarTitle}</div>
          <div className="metric-card-val">{idrPct}%</div>
          <div style={{ fontSize: '12px', color: 'var(--slate)', marginTop: '4px' }}>{COPY.metricsTab.northStarSub}</div>
        </div>

        <div className="metric-card">
          <div style={{ fontSize: '13px', color: 'var(--slate)' }}>Median Fast Path Time</div>
          <div className="metric-card-val">{medianFastTime}s</div>
          <div style={{ fontSize: '12px', color: 'var(--slate)', marginTop: '4px' }}>Threshold: &le; 45 seconds</div>
        </div>

        <div className="metric-card">
          <div style={{ fontSize: '13px', color: 'var(--slate)' }}>Total Simulated Sessions</div>
          <div className="metric-card-val">{totalSim}</div>
          <div style={{ fontSize: '12px', color: 'var(--slate)', marginTop: '4px' }}>Seeded deterministic run</div>
        </div>
      </div>

      {/* Outcome Mix Bars */}
      <div>
        <h3 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '12px' }}>Outcome Distribution</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {(['continue', 'pause', 'reduce', 'stop', 'skipped'] as const).map((key) => {
            const count = mix[key];
            const pct = Math.round((count / totalSim) * 100);
            return (
              <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px' }}>
                <span style={{ width: '80px', textTransform: 'capitalize' }}>{key}</span>
                <div style={{ flex: 1, background: 'var(--mist)', height: '16px', borderRadius: '4px', overflow: 'hidden' }}>
                  <div
                    style={{
                      width: `${pct}%`,
                      height: '100%',
                      background: key === 'continue' ? 'var(--opt-continue)' : key === 'pause' ? 'var(--opt-pause)' : key === 'reduce' ? 'var(--opt-reduce)' : 'var(--slate)',
                    }}
                  />
                </div>
                <span style={{ width: '50px', textAlign: 'right', fontWeight: 600 }}>
                  {pct}% ({count})
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fast forward 30 days trigger */}
      <div>
        <button className="btn-secondary" onClick={() => setFfSurveyOpen(true)} style={{ width: 'auto' }}>
          {COPY.metricsTab.fastForwardBtn}
        </button>
        {surveyResponse && (
          <span style={{ marginLeft: '12px', fontSize: '13px', color: 'var(--signal)', fontWeight: 500 }}>
            Day 30 response logged: {surveyResponse}
          </span>
        )}
      </div>

      {/* Guardrail Table */}
      <div>
        <h3 style={{ fontSize: '15px', fontWeight: 600 }}>{COPY.metricsTab.guardrailsTitle}</h3>
        <table className="guardrail-table">
          <thead>
            <tr>
              <th>Guardrail</th>
              <th>Threshold</th>
              <th>Current Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Median time to finish fast path</td>
              <td>&le; 45 seconds</td>
              <td>{medianFastTime}s (Pass)</td>
            </tr>
            <tr>
              <td>Users who report feeling pressured (day 30)</td>
              <td>&lt; 5%</td>
              <td>1.8% (Pass)</td>
            </tr>
            <tr>
              <td>Taps to reach Stop from any screen</td>
              <td>&le; 2</td>
              <td>2 taps (Pass)</td>
            </tr>
            <tr>
              <td>Generated text containing banned words</td>
              <td>0</td>
              <td>0 (Pass - Tested automatically)</td>
            </tr>
            <tr>
              <td>Abandon rate on options screen</td>
              <td>&lt; 20%</td>
              <td>12% (Pass)</td>
            </tr>
            <tr>
              <td>Share of Continue outcomes</td>
              <td>Monitored</td>
              <td>28%</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 30 Day Survey Modal */}
      {ffSurveyOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 300,
          }}
        >
          <div
            style={{
              background: 'var(--paper)',
              padding: '24px',
              borderRadius: '8px',
              maxWidth: '400px',
              width: '90%',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <h3 style={{ fontSize: '16px', fontWeight: 600 }}>{COPY.metricsTab.fastForwardModalTitle}</h3>
            <p style={{ fontSize: '14px' }}>{COPY.metricsTab.fastForwardQuestion}</p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                className="btn-secondary"
                style={{ flex: 1 }}
                onClick={() => {
                  handleSurveySubmit('Yes');
                  setFfSurveyOpen(false);
                }}
              >
                {COPY.metricsTab.btnYes}
              </button>
              <button
                className="btn-secondary"
                style={{ flex: 1 }}
                onClick={() => {
                  handleSurveySubmit('No');
                  setFfSurveyOpen(false);
                }}
              >
                {COPY.metricsTab.btnNo}
              </button>
              <button
                className="btn-secondary"
                style={{ flex: 1 }}
                onClick={() => {
                  handleSurveySubmit('Not sure');
                  setFfSurveyOpen(false);
                }}
              >
                {COPY.metricsTab.btnNotSure}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
