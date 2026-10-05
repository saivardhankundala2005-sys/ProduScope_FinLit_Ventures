import React, { useState, useEffect } from 'react';
import { Persona, OptionType, EngineInputs, CalculationResult, ReplayResult } from './engine/types';
import { calculateEngine, PERSONA_ROHAN, PERSONA_PRIYA } from './engine/calculator';
import { computeHistoricalReplay } from './engine/replay';
import { track } from './tracker';
import { COPY } from './copy';

import { SampadaHost, SipInvestment } from './components/SampadaHost';
import { C1Entry } from './components/C1Entry';
import { C2Reason } from './components/C2Reason';
import { C3Replay } from './components/C3Replay';
import { C4Options } from './components/C4Options';
import { C5Confirm } from './components/C5Confirm';
import { F1FastPath } from './components/F1FastPath';
import { StopModal } from './components/StopModal';
import { AssumptionsModal } from './components/AssumptionsModal';
import { JudgePanel } from './components/JudgePanel';
import { MetricsDashboard } from './components/MetricsDashboard';
import { AiAssistant } from './components/AiAssistant';

export type ScreenState = 'closed' | 'C1' | 'C2' | 'C3' | 'C4' | 'C5' | 'F1';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'demo' | 'metrics'>('demo');
  const [viewMode, setViewMode] = useState<'frame' | 'fullscreen'>('frame');
  const [screen, setScreen] = useState<ScreenState>('closed');
  const [entryPoint, setEntryPoint] = useState<'alert' | 'request'>('alert');

  // Configuration & State
  const [persona, setPersona] = useState<Persona>(PERSONA_ROHAN);
  const [currentFundCode, setCurrentFundCode] = useState<number>(118989);
  const [asOfDate, setAsOfDate] = useState<string>('2025-02-24');
  const [annualReturn, setAnnualReturn] = useState<number>(0.08);
  const [pauseMonths, setPauseMonths] = useState<number>(3);
  const [reducedSip, setReducedSip] = useState<number>(2500);
  const [goalMonths, setGoalMonths] = useState<number>(60);
  const [sliderLambda, setSliderLambda] = useState<number>(0.5);

  const [selectedOption, setSelectedOption] = useState<OptionType>('pause');

  // Multiple SIP Investments State
  const [investments, setInvestments] = useState<SipInvestment[]>([
    {
      fundCode: 118989,
      fundName: 'HDFC Mid-Cap Opportunities Fund - Direct - Growth',
      shortName: 'HDFC Mid-Cap Opportunities',
      category: 'Mid-Cap',
      monthlySip: 5000,
      goalName: 'Down payment',
      goalAmount: 600000,
      status: 'Active',
      drawdownPct: 14.03,
    },
    {
      fundCode: 119063,
      fundName: 'HDFC Flexi Cap Fund - Direct - Growth',
      shortName: 'HDFC Flexi Cap',
      category: 'Flexi-Cap',
      monthlySip: 4000,
      goalName: 'Child education',
      goalAmount: 1200000,
      status: 'Active',
      drawdownPct: 14.04,
    },
    {
      fundCode: 120716,
      fundName: 'UTI Nifty 50 Index Fund - Direct - Growth',
      shortName: 'UTI Nifty 50 Index',
      category: 'Nifty 50 Index',
      monthlySip: 6000,
      goalName: 'Retirement',
      goalAmount: 2500000,
      status: 'Active',
      drawdownPct: 0.0,
    },
  ]);

  // Modals
  const [stopModalOpen, setStopModalOpen] = useState<boolean>(false);
  const [assumptionsModalOpen, setAssumptionsModalOpen] = useState<boolean>(false);

  // Loaded Data
  const [fundsData, setFundsData] = useState<any[]>([]);
  const [navMonthlyData, setNavMonthlyData] = useState<Record<string, any[]>>({});

  useEffect(() => {
    fetch('/data/funds.json')
      .then((res) => res.json())
      .then((data) => {
        setFundsData(data);
        if (data && data.length > 0) {
          setInvestments((prev) =>
            prev.map((inv) => {
              const matched = data.find((f: any) => f.code === inv.fundCode);
              return matched ? { ...inv, drawdownPct: matched.drawdownPct } : inv;
            })
          );
        }
      })
      .catch(() => {});

    fetch('/data/nav_monthly.json')
      .then((res) => res.json())
      .then((data) => setNavMonthlyData(data))
      .catch(() => {});
  }, []);

  const activeInvestment = investments.find((inv) => inv.fundCode === currentFundCode) || investments[0];

  const currentFund = fundsData.find((f) => f.code === currentFundCode) || {
    code: activeInvestment.fundCode,
    name: activeInvestment.fundName,
    shortName: activeInvestment.shortName,
    category: activeInvestment.category,
    drawdownPct: activeInvestment.drawdownPct,
  };

  const currentPersonaWithSip: Persona = {
    ...persona,
    monthlySip: activeInvestment.monthlySip,
    goalAmount: activeInvestment.goalAmount,
    goalName: activeInvestment.goalName,
  };

  const engineInputs: EngineInputs = {
    persona: currentPersonaWithSip,
    chosenOption: selectedOption,
    annualReturn,
    goalMonthsOverride: goalMonths,
    pauseMonths,
    reducedSipAmount: reducedSip,
  };

  const calculation: CalculationResult = calculateEngine(engineInputs, sliderLambda);

  const navSeries = navMonthlyData[String(currentFundCode)] || [];
  const replayResult: ReplayResult = computeHistoricalReplay(
    navSeries,
    activeInvestment.monthlySip,
    pauseMonths,
    currentFund.shortName
  );

  const handleOpenCopilotForFund = (fundCode: number, ePoint: 'alert' | 'request', action?: string) => {
    setCurrentFundCode(fundCode);
    setEntryPoint(ePoint);
    setScreen('C1');
    track('sheet_opened', { fundCode, entry: ePoint, action });
  };

  const handleSkip = () => {
    track('skipped', { screen, fundCode: currentFundCode });
    setScreen('closed');
  };

  const handleShowChanges = () => {
    setScreen('C2');
  };

  const handleSelectReason = (reasonId: string, durationMonths: number, isFastPath: boolean) => {
    if (durationMonths > 0) {
      setPauseMonths(durationMonths);
    }
    track('reason_selected', { reasonId, durationMonths, isFastPath, fundCode: currentFundCode });

    if (isFastPath) {
      setScreen('F1');
    } else {
      setScreen('C3');
      track('replay_viewed', { fundCode: currentFundCode });
    }
  };

  const handleReplayNext = () => {
    setScreen('C4');
    track('options_enter');
  };

  const handleSelectOption = (opt: OptionType) => {
    setSelectedOption(opt);
    track('option_selected', { option: opt, fundCode: currentFundCode });
  };

  const handleConfirmSubmit = (reminderSet: boolean) => {
    track('confirm_completed', { selectedOption, reminderSet, fundCode: currentFundCode });

    let newStatus = 'Active';
    if (selectedOption === 'pause') {
      newStatus = `Paused until June 2025`;
    } else if (selectedOption === 'reduce') {
      newStatus = `Reduced to ₹${reducedSip.toLocaleString('en-IN')}/mo`;
    } else if (selectedOption === 'stop') {
      newStatus = 'Stopped';
    }

    setInvestments((prev) =>
      prev.map((inv) => (inv.fundCode === currentFundCode ? { ...inv, status: newStatus } : inv))
    );

    setScreen('closed');
  };

  const handleResetJudge = () => {
    setPersona(PERSONA_ROHAN);
    setCurrentFundCode(118989);
    setAsOfDate('2025-02-24');
    setAnnualReturn(0.08);
    setPauseMonths(3);
    setReducedSip(2500);
    setGoalMonths(60);
    setSliderLambda(0.5);
    setSelectedOption('pause');
    setInvestments([
      {
        fundCode: 118989,
        fundName: 'HDFC Mid-Cap Opportunities Fund - Direct - Growth',
        shortName: 'HDFC Mid-Cap Opportunities',
        category: 'Mid-Cap',
        monthlySip: 5000,
        goalName: 'Down payment',
        goalAmount: 600000,
        status: 'Active',
        drawdownPct: 14.03,
      },
      {
        fundCode: 119063,
        fundName: 'HDFC Flexi Cap Fund - Direct - Growth',
        shortName: 'HDFC Flexi Cap',
        category: 'Flexi-Cap',
        monthlySip: 4000,
        goalName: 'Child education',
        goalAmount: 1200000,
        status: 'Active',
        drawdownPct: 14.04,
      },
      {
        fundCode: 120716,
        fundName: 'UTI Nifty 50 Index Fund - Direct - Growth',
        shortName: 'UTI Nifty 50 Index',
        category: 'Nifty 50 Index',
        monthlySip: 6000,
        goalName: 'Retirement',
        goalAmount: 2500000,
        status: 'Active',
        drawdownPct: 0.0,
      },
    ]);
  };

  return (
    <div className="app-container">
      <header className="top-bar">
        <div className="top-bar-left">
          <h1>SIP Pause Co-pilot</h1>
          {activeTab === 'demo' && (
            <div className="mode-toggle-group">
              <button
                className={`mode-toggle-btn ${viewMode === 'frame' ? 'active' : ''}`}
                onClick={() => setViewMode('frame')}
                title="Phone Frame View (390px)"
              >
                📱 Phone View
              </button>
              <button
                className={`mode-toggle-btn ${viewMode === 'fullscreen' ? 'active' : ''}`}
                onClick={() => setViewMode('fullscreen')}
                title="Full Desktop View (Expanded)"
              >
                💻 Full Desktop View
              </button>
            </div>
          )}
        </div>

        <div className="tab-group">
          <button
            className={`tab-btn ${activeTab === 'demo' ? 'active' : ''}`}
            onClick={() => setActiveTab('demo')}
          >
            Prototype Demo
          </button>
          <button
            className={`tab-btn ${activeTab === 'metrics' ? 'active' : ''}`}
            onClick={() => setActiveTab('metrics')}
          >
            Metrics &amp; Guardrails
          </button>
        </div>
      </header>

      {activeTab === 'demo' ? (
        <div className={`main-stage ${viewMode === 'fullscreen' ? 'fullscreen-mode' : ''}`}>
          {/* Phone Frame / Fullscreen Host View */}
          <div className={`phone-frame-wrapper ${viewMode === 'fullscreen' ? 'fullscreen-mode' : ''}`}>
            <div className={`phone-frame ${viewMode === 'fullscreen' ? 'fullscreen-mode' : ''}`}>
              <SampadaHost
                investments={investments}
                activeFundCode={currentFundCode}
                isFullscreenMode={viewMode === 'fullscreen'}
                onOpenCopilot={handleOpenCopilotForFund}
              />

              {/* Co-pilot Bottom Sheet Drawer / Modal */}
              {screen !== 'closed' && (
                <div className={`sheet-overlay ${viewMode === 'fullscreen' ? 'fullscreen-mode' : ''}`}>
                  <div className={`bottom-sheet ${viewMode === 'fullscreen' ? 'fullscreen-mode' : ''}`}>
                    <div className="sheet-header">
                      <div className="sheet-header-top">
                        <span className="sheet-title">{COPY.header.title}</span>
                        <span className="entry-badge">
                          {entryPoint === 'alert' ? COPY.header.openedFromAlert : COPY.header.openedFromRequest}
                        </span>
                      </div>
                      <div className="sheet-disclosure">{COPY.header.disclosure}</div>
                    </div>

                    <div className="sheet-body">
                      {screen === 'C1' && (
                        <C1Entry onShowChanges={handleShowChanges} onSkip={handleSkip} />
                      )}

                      {screen === 'C2' && (
                        <C2Reason onSelectReason={handleSelectReason} />
                      )}

                      {screen === 'C3' && (
                        <C3Replay replay={replayResult} onNext={handleReplayNext} />
                      )}

                      {screen === 'C4' && (
                        <C4Options
                          calculation={calculation}
                          selectedOption={selectedOption}
                          sliderLambda={sliderLambda}
                          pauseMonths={pauseMonths}
                          reducedSip={reducedSip}
                          goalMonths={goalMonths}
                          annualReturn={annualReturn}
                          onSelectOption={handleSelectOption}
                          onSliderChange={setSliderLambda}
                          onChangePauseMonths={setPauseMonths}
                          onChangeReducedSip={setReducedSip}
                          onChangeGoalMonths={setGoalMonths}
                          onOpenAssumptions={() => setAssumptionsModalOpen(true)}
                          onOpenStopModal={() => setStopModalOpen(true)}
                          onProceedToConfirm={() => setScreen('C5')}
                        />
                      )}

                      {screen === 'C5' && (
                        <C5Confirm
                          calculation={calculation}
                          selectedOption={selectedOption}
                          pauseMonths={pauseMonths}
                          onConfirmSubmit={handleConfirmSubmit}
                        />
                      )}

                      {screen === 'F1' && (
                        <F1FastPath
                          calculation={calculation}
                          pauseMonths={pauseMonths}
                          onSelectOptionFast={(opt) => {
                            handleSelectOption(opt);
                            setScreen('C5');
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Modals */}
              {stopModalOpen && (
                <StopModal
                  calculation={calculation}
                  onGoBack={() => setStopModalOpen(false)}
                  onProceedStop={() => {
                    setStopModalOpen(false);
                    handleSelectOption('stop');
                    setScreen('C5');
                  }}
                />
              )}

              {assumptionsModalOpen && (
                <AssumptionsModal
                  annualReturn={annualReturn}
                  goalMonths={goalMonths}
                  pauseMonths={pauseMonths}
                  onChangeAnnualReturn={setAnnualReturn}
                  onChangeGoalMonths={setGoalMonths}
                  onChangePauseMonths={setPauseMonths}
                  onClose={() => setAssumptionsModalOpen(false)}
                />
              )}
            </div>
          </div>

          {/* Desktop Judge Panel */}
          <JudgePanel
            currentPersona={persona}
            currentFundCode={currentFundCode}
            asOfDate={asOfDate}
            annualReturn={annualReturn}
            pauseMonths={pauseMonths}
            availableFunds={fundsData}
            onSelectPersona={(pId) => setPersona(pId === 'rohan' ? PERSONA_ROHAN : PERSONA_PRIYA)}
            onSelectBufferCategory={(cat) =>
              setPersona((prev) => ({ ...prev, emergencyBufferCategory: cat }))
            }
            onSelectFund={setCurrentFundCode}
            onChangeAsOfDate={setAsOfDate}
            onChangeReturn={setAnnualReturn}
            onChangePauseMonths={setPauseMonths}
            onReset={handleResetJudge}
          />
        </div>
      ) : (
        <MetricsDashboard />
      )}

      {/* Floating AI Decision Assistant */}
      <AiAssistant />
    </div>
  );
};
