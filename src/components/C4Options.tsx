import React, { useState } from 'react';
import { CalculationResult, OptionType } from '../engine/types';
import { COPY } from '../copy';
import { formatRupee, formatRupeeLakh, formatPercent } from '../engine/narration';

interface C4OptionsProps {
  calculation: CalculationResult;
  selectedOption: OptionType;
  sliderLambda: number;
  pauseMonths: number;
  reducedSip: number;
  goalMonths: number;
  annualReturn: number;
  onSelectOption: (opt: OptionType) => void;
  onSliderChange: (lambda: number) => void;
  onChangePauseMonths: (m: number) => void;
  onChangeReducedSip: (amt: number) => void;
  onChangeGoalMonths: (m: number) => void;
  onOpenAssumptions: () => void;
  onOpenStopModal: () => void;
  onProceedToConfirm: () => void;
}

export const C4Options: React.FC<C4OptionsProps> = ({
  calculation,
  selectedOption,
  sliderLambda,
  pauseMonths,
  reducedSip,
  goalMonths,
  annualReturn,
  onSelectOption,
  onSliderChange,
  onChangePauseMonths,
  onChangeReducedSip,
  onChangeGoalMonths,
  onOpenAssumptions,
  onOpenStopModal,
  onProceedToConfirm,
}) => {
  const { options, flipPointContinueVsPause, flipPointPauseVsReduce, leadingOption, pauseReceipt } = calculation;

  const cardList: OptionType[] = ['continue', 'reduce', 'pause'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h2 style={{ fontSize: '18px', fontWeight: 600 }}>{COPY.c4Options.title}</h2>

      {/* Priority Slider Box */}
      <div className="priority-slider-box">
        <div style={{ fontWeight: 600, fontSize: '13px' }}>{COPY.c4Options.sliderTitle}</div>
        <div className="slider-labels">
          <span>{COPY.c4Options.sliderLeftLabel}</span>
          <span>{COPY.c4Options.sliderRightLabel}</span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={Math.round(sliderLambda * 100)}
          onChange={(e) => onSliderChange(parseInt(e.target.value, 10) / 100.0)}
          style={{ width: '100%', cursor: 'pointer' }}
        />

        {/* Regime Bar */}
        <div style={{ marginTop: '4px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--slate)', marginBottom: '2px' }}>
            <span>Goal Focus</span>
            <span>Balanced</span>
            <span>Surplus Focus</span>
          </div>
          <div className="regime-bar">
            {/* Continue segment: lambda >= flipContPause */}
            <div
              className="regime-segment continue"
              style={{ width: `${(1 - flipPointContinueVsPause) * 100}%` }}
              title={`Continue leads above ${Math.round(flipPointContinueVsPause * 100)}%`}
            />
            {/* Pause segment: flipPauseRed <= lambda < flipContPause */}
            <div
              className="regime-segment pause"
              style={{ width: `${(flipPointContinueVsPause - flipPointPauseVsReduce) * 100}%` }}
              title={`Pause leads between ${Math.round(flipPointPauseVsReduce * 100)}% and ${Math.round(flipPointContinueVsPause * 100)}%`}
            />
            {/* Reduce segment: lambda < flipPauseRed */}
            <div
              className="regime-segment reduce"
              style={{ width: `${flipPointPauseVsReduce * 100}%` }}
              title={`Reduce leads below ${Math.round(flipPointPauseVsReduce * 100)}%`}
            />
          </div>
          <div style={{ fontSize: '11px', color: 'var(--slate)', marginTop: '4px' }}>
            Boundaries: Continue &gt; {Math.round(flipPointContinueVsPause * 100)}% | Pause {Math.round(flipPointPauseVsReduce * 100)}%–{Math.round(flipPointContinueVsPause * 100)}% | Reduce &lt; {Math.round(flipPointPauseVsReduce * 100)}%
          </div>
        </div>
      </div>

      {/* 3 Option Cards */}
      <div className="option-cards-list">
        {cardList.map((optType) => {
          const opt = options[optType];
          const isSelected = selectedOption === optType;
          const isLead = leadingOption === optType;

          return (
            <div
              key={optType}
              className={`option-card card-${optType}`}
              style={{
                borderColor: isSelected ? 'var(--ink)' : 'var(--rule)',
                background: isSelected ? '#FAFBFD' : 'var(--paper)',
                cursor: 'pointer',
              }}
              onClick={() => onSelectOption(optType)}
            >
              <div className="option-card-header">
                <span className="option-title">
                  {optType === 'continue' && '1. Continue'}
                  {optType === 'reduce' && `2. Reduce to ${formatRupee(reducedSip)}`}
                  {optType === 'pause' && `3. Pause for ${pauseMonths} months`}
                </span>
                {isLead && <span className="lead-marker">{COPY.c4Options.leadsMarkerText}</span>}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '13px', marginTop: '8px' }}>
                <div>
                  <span style={{ color: 'var(--slate)' }}>Monthly amount: </span>
                  <span style={{ fontWeight: 600 }}>{formatRupee(opt.monthlyAmount)}</span>
                </div>
                <div>
                  <span style={{ color: 'var(--slate)' }}>Goal progress: </span>
                  <span style={{ fontWeight: 600 }}>
                    {formatPercent(opt.goalProgressPct)} ({formatPercent(opt.goalProgressPctLow)}–{formatPercent(opt.goalProgressPctHigh)})
                  </span>
                </div>
                <div>
                  <span style={{ color: 'var(--slate)' }}>Projected total: </span>
                  <span style={{ fontWeight: 600 }}>{formatRupeeLakh(opt.projectedCorpus)}</span>
                </div>
                <div>
                  <span style={{ color: 'var(--slate)' }}>Monthly strain: </span>
                  <span style={{ fontWeight: 600 }}>{Math.round(opt.strainPct)}%</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Perforated Pause Receipt Ticket */}
      {selectedOption === 'pause' && (
        <div className="pause-receipt">
          <div className="receipt-perforation" />
          <div className="receipt-header">{COPY.c4Options.receiptTitle}</div>

          <div className="receipt-row">
            <span>Duration</span>
            <span className="dots-leader" />
            <span>{pauseReceipt.pauseMonths} months</span>
          </div>

          <div className="receipt-row">
            <span>{COPY.c4Options.skippedRowLabel}</span>
            <span className="dots-leader" />
            <span>{formatRupee(pauseReceipt.skippedContributions)}</span>
          </div>

          <div className="receipt-row">
            <span>{COPY.c4Options.growthRowLabel}</span>
            <span className="dots-leader" />
            <span>
              {formatRupee(pauseReceipt.growthOnSkipped)} ({formatRupee(pauseReceipt.growthOnSkippedLow)}–{formatRupee(pauseReceipt.growthOnSkippedHigh)})
            </span>
          </div>

          <div className="receipt-row receipt-total">
            <span>{COPY.c4Options.differenceRowLabel}</span>
            <span className="dots-leader" />
            <span>
              {formatRupee(pauseReceipt.totalCostAtGoalDate)} ({formatRupee(pauseReceipt.totalCostAtGoalDateLow)}–{formatRupee(pauseReceipt.totalCostAtGoalDateHigh)})
            </span>
          </div>

          <div className="receipt-row" style={{ marginTop: '8px', fontSize: '13px', color: 'var(--slate)' }}>
            <span>{COPY.c4Options.progressBeforeLabel}: {formatPercent(pauseReceipt.goalProgressBeforePct)}</span>
            <span>{COPY.c4Options.progressAfterLabel}: {formatPercent(pauseReceipt.goalProgressAfterPct)}</span>
          </div>
        </div>
      )}

      {/* Secondary Controls & Modals links */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
        <button
          onClick={onOpenAssumptions}
          style={{ background: 'none', border: 'none', color: 'var(--signal)', textDecoration: 'underline', cursor: 'pointer', padding: 0 }}
        >
          {COPY.c4Options.assumptionsLink}
        </button>

        <button
          onClick={onOpenStopModal}
          style={{ background: 'none', border: 'none', color: 'var(--slate)', textDecoration: 'underline', cursor: 'pointer', padding: 0 }}
        >
          {COPY.c4Options.linkStop}
        </button>
      </div>

      <button className="btn-primary" onClick={onProceedToConfirm} style={{ marginTop: '8px' }}>
        {COPY.c4Options.btnConfirmChoice}
      </button>
    </div>
  );
};
