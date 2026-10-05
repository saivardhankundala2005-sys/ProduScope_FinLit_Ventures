import React, { useState } from 'react';
import { COPY } from '../copy';

export interface SipInvestment {
  fundCode: number;
  fundName: string;
  shortName: string;
  category: string;
  monthlySip: number;
  goalName: string;
  goalAmount: number;
  status: string;
  drawdownPct: number;
}

interface SampadaHostProps {
  investments: SipInvestment[];
  activeFundCode: number;
  isFullscreenMode?: boolean;
  onOpenCopilot: (fundCode: number, entryPoint: 'alert' | 'request', action?: string) => void;
}

export const SampadaHost: React.FC<SampadaHostProps> = ({
  investments,
  activeFundCode,
  isFullscreenMode = false,
  onOpenCopilot,
}) => {
  const [openMenuCode, setOpenMenuCode] = useState<number | null>(null);

  const totalPortfolioValue = 485000;
  const totalMonthlySip = investments.reduce((sum, item) => sum + item.monthlySip, 0);

  // Identify funds with active drawdown alert (>10%)
  const drawdownAlertFunds = investments.filter((item) => item.drawdownPct >= 10.0);

  return (
    <div className={`host-app ${isFullscreenMode ? 'fullscreen-mode' : ''}`}>
      <header className="host-header">
        <div>
          <span className="host-brand">{COPY.hostApp.brand}</span>
          <div style={{ fontSize: '12px', color: 'var(--slate)' }}>{COPY.hostApp.subtitle}</div>
        </div>
        {isFullscreenMode && (
          <div style={{ fontSize: '13px', color: 'var(--slate)', fontWeight: 500 }}>
            Client Account &bull; #8849-2026
          </div>
        )}
      </header>

      <div className="host-content">
        {/* Portfolio Summary */}
        <div className="portfolio-card">
          <div className="portfolio-label">{COPY.hostApp.portfolioTitle}</div>
          <div className="portfolio-val">₹{totalPortfolioValue.toLocaleString('en-IN')}</div>
          <div style={{ fontSize: '12px', color: 'var(--slate)', marginTop: '4px' }}>
            {investments.length} Active SIPs &bull; Total ₹{totalMonthlySip.toLocaleString('en-IN')} / month
          </div>
        </div>

        {/* Drawdown Banners */}
        {drawdownAlertFunds.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {drawdownAlertFunds.map((fund) => (
              <div key={fund.fundCode} className="drawdown-banner">
                <p>
                  {fund.shortName} is {fund.drawdownPct.toFixed(1)}% below its 12-month peak.
                </p>
                <button
                  className="btn-banner"
                  onClick={() => onOpenCopilot(fund.fundCode, 'alert')}
                >
                  Review your {fund.shortName} SIP
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Multiple SIP Investments Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '4px' }}>
          <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--ink)' }}>
            Your Mutual Fund SIPs ({investments.length})
          </div>

          <div
            style={{
              display: isFullscreenMode ? 'grid' : 'flex',
              gridTemplateColumns: isFullscreenMode ? 'repeat(auto-fit, minmax(320px, 1fr))' : undefined,
              flexDirection: isFullscreenMode ? undefined : 'column',
              gap: '12px',
            }}
          >
            {investments.map((inv) => (
              <div
                key={inv.fundCode}
                className="sip-card"
                style={{
                  border: inv.fundCode === activeFundCode ? '2px solid var(--signal)' : '1px solid var(--rule)',
                }}
              >
                <div className="sip-card-header">
                  <div>
                    <div className="sip-fund-name">{inv.shortName}</div>
                    <div style={{ fontSize: '12px', color: 'var(--slate)', marginTop: '2px' }}>
                      Goal: {inv.goalName}, ₹{(inv.goalAmount / 100000).toFixed(1)} lakh
                    </div>
                  </div>
                  <span className="sip-status">{inv.status}</span>
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '12px',
                    position: 'relative',
                  }}
                >
                  <div style={{ fontWeight: 600, fontSize: '16px' }}>
                    ₹{inv.monthlySip.toLocaleString('en-IN')} / month
                  </div>

                  <button
                    className="menu-trigger"
                    onClick={() => setOpenMenuCode(openMenuCode === inv.fundCode ? null : inv.fundCode)}
                    aria-label={`Menu for ${inv.shortName}`}
                  >
                    •••
                  </button>

                  {openMenuCode === inv.fundCode && (
                    <div
                      className="menu-dropdown"
                      style={{
                        position: 'absolute',
                        right: 0,
                        top: '100%',
                        zIndex: 50,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                        width: '140px',
                      }}
                    >
                      <button
                        className="menu-item"
                        onClick={() => {
                          setOpenMenuCode(null);
                          onOpenCopilot(inv.fundCode, 'request', 'pause');
                        }}
                      >
                        {COPY.hostApp.menuPause}
                      </button>
                      <button
                        className="menu-item"
                        onClick={() => {
                          setOpenMenuCode(null);
                          onOpenCopilot(inv.fundCode, 'request', 'reduce');
                        }}
                      >
                        {COPY.hostApp.menuReduce}
                      </button>
                      <button
                        className="menu-item"
                        onClick={() => {
                          setOpenMenuCode(null);
                          onOpenCopilot(inv.fundCode, 'request', 'cancel');
                        }}
                      >
                        {COPY.hostApp.menuCancel}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
