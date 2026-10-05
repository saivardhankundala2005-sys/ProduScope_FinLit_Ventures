import React, { useState, useRef } from 'react';
import { ReplayResult } from '../engine/types';
import { COPY } from '../copy';

interface C3ReplayProps {
  replay: ReplayResult;
  onNext: () => void;
}

export const C3Replay: React.FC<C3ReplayProps> = ({ replay, onNext }) => {
  const [scrubIndex, setScrubIndex] = useState<number>(
    replay.dataPoints.length > 0 ? replay.dataPoints.length - 1 : 0
  );

  const containerRef = useRef<HTMLDivElement>(null);

  if (!replay.dataPoints || replay.dataPoints.length === 0) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 600 }}>{COPY.c3Replay.title}</h2>
        <p style={{ fontSize: '14px', color: 'var(--slate)' }}>Loading replay data...</p>
        <button className="btn-primary" onClick={onNext}>
          {COPY.c3Replay.btnNext}
        </button>
      </div>
    );
  }

  const currentPt = replay.dataPoints[scrubIndex] || replay.dataPoints[replay.dataPoints.length - 1];
  const currentGap = currentPt.keptInvestingValue - currentPt.pausedValue;

  // SVG Chart Dimensions
  const svgWidth = 320;
  const svgHeight = 160;
  const padding = 20;

  const maxVal = Math.max(...replay.dataPoints.map((d) => Math.max(d.keptInvestingValue, d.pausedValue, 1000)));

  const getX = (idx: number) => {
    if (replay.dataPoints.length <= 1) return padding;
    return padding + (idx / (replay.dataPoints.length - 1)) * (svgWidth - 2 * padding);
  };

  const getY = (val: number) => {
    return svgHeight - padding - (val / maxVal) * (svgHeight - 2 * padding);
  };

  // Track cursor movement across chart container
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const relativeX = Math.max(0, Math.min(1, mouseX / rect.width));
    const newIdx = Math.round(relativeX * (replay.dataPoints.length - 1));
    setScrubIndex(newIdx);
  };

  // Build SVG path strings
  const pathKept = replay.dataPoints
    .map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i).toFixed(1)} ${getY(d.keptInvestingValue).toFixed(1)}`)
    .join(' ');

  const pathPaused = replay.dataPoints
    .map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i).toFixed(1)} ${getY(d.pausedValue).toFixed(1)}`)
    .join(' ');

  // Shaded area path between kept and paused
  const pathShadedArea =
    pathKept +
    ' ' +
    replay.dataPoints
      .slice()
      .reverse()
      .map((d, i) => {
        const revIdx = replay.dataPoints.length - 1 - i;
        return `L ${getX(revIdx).toFixed(1)} ${getY(d.pausedValue).toFixed(1)}`;
      })
      .join(' ') +
    ' Z';

  const scrubX = getX(scrubIndex);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <h2 style={{ fontSize: '18px', fontWeight: 600 }}>{COPY.c3Replay.title}</h2>
      <p style={{ fontSize: '13px', color: 'var(--slate)' }}>{COPY.c3Replay.subtitle}</p>

      {/* SVG Chart with cursor move response */}
      <div
        ref={containerRef}
        className="replay-chart-container"
        onMouseMove={handleMouseMove}
      >
        <svg className="chart-svg" viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
          {/* Shaded gap */}
          <path d={pathShadedArea} fill="rgba(46, 125, 119, 0.15)" stroke="none" />

          {/* Kept investing line */}
          <path d={pathKept} fill="none" stroke="var(--opt-continue)" strokeWidth="2" />

          {/* Paused line */}
          <path
            d={pathPaused}
            fill="none"
            stroke="var(--opt-pause)"
            strokeWidth="2"
            strokeDasharray="4,4"
          />

          {/* Scrubber vertical line */}
          <line
            x1={scrubX}
            y1={padding}
            x2={scrubX}
            y2={svgHeight - padding}
            stroke="var(--ink)"
            strokeWidth="1.5"
            strokeDasharray="2,2"
          />

          {/* Current point markers */}
          <circle cx={scrubX} cy={getY(currentPt.keptInvestingValue)} r="4" fill="var(--opt-continue)" />
          <circle cx={scrubX} cy={getY(currentPt.pausedValue)} r="4" fill="var(--opt-pause)" />
        </svg>

        {/* Legend & values */}
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginTop: '8px' }}>
          <div>
            <span style={{ color: 'var(--opt-continue)', fontWeight: 600 }}>— </span>
            {COPY.c3Replay.keptInvestingLegend}: ₹{currentPt.keptInvestingValue.toLocaleString('en-IN')}
          </div>
          <div>
            <span style={{ color: 'var(--opt-pause)', fontWeight: 600 }}>- - </span>
            {COPY.c3Replay.pausedLegend}: ₹{currentPt.pausedValue.toLocaleString('en-IN')}
          </div>
        </div>

        {/* Scrubber control */}
        <input
          type="range"
          min={0}
          max={replay.dataPoints.length - 1}
          value={scrubIndex}
          onChange={(e) => setScrubIndex(parseInt(e.target.value, 10))}
          className="scrubber-slider"
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--slate)', marginTop: '4px' }}>
          <span>{replay.dataPoints[0].date}</span>
          <span style={{ fontWeight: 600, color: 'var(--ink)' }}>
            Date: {currentPt.date} | Difference: ₹{currentGap.toLocaleString('en-IN')}
          </span>
          <span>{replay.dataPoints[replay.dataPoints.length - 1].date}</span>
        </div>
      </div>

      {/* Caption */}
      <div
        style={{
          fontSize: '12px',
          color: 'var(--slate)',
          background: 'var(--mist)',
          padding: '8px 12px',
          borderRadius: '4px',
          borderLeft: '3px solid var(--rule)',
        }}
      >
        {replay.isGapNegligible ? COPY.c3Replay.negligibleGapText : COPY.c3Replay.caption}
      </div>

      <button className="btn-primary" onClick={onNext} style={{ marginTop: '4px' }}>
        {COPY.c3Replay.btnNext}
      </button>
    </div>
  );
};
