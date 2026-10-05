import React, { useState, useRef, useEffect } from 'react';
import { COPY } from '../copy';

interface Message {
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

const PRESET_QUESTIONS = [
  'What is a Pause receipt?',
  'How is Goal progress calculated?',
  'What does the Priority slider do?',
  'Why is pausing a SIP different from a loan EMI?',
  'What is SIP strain and Comfort score?',
  'How does the Replay chart work?',
  'What return rate is assumed?',
  'What is the Fast path?',
];

export const AiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'assistant',
      text: COPY.aiAssistant.initialMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const generateAnswer = (query: string): string => {
    const q = query.toLowerCase();

    if (q.includes('receipt')) {
      return 'The Pause receipt shows the exact financial breakdown of pausing your SIP: skipped monthly contributions, growth they would have earned to your goal date at the assumed return rate, and total cost at the goal date with range (6% to 10%).';
    }
    if (q.includes('progress') || q.includes('goal')) {
      return 'Goal progress is the ratio of your projected investment corpus at the target date divided by your required goal amount. Projected corpus combines compounding on your existing corpus plus future monthly SIP contributions.';
    }
    if (q.includes('slider') || q.includes('priority') || q.includes('weight')) {
      return 'The priority slider lets you set your personal weighting between reaching your goal (left) and monthly cash breathing room (right). Closed-form mathematical flip points calculate which option scores highest at your chosen weighting without reordering cards.';
    }
    if (q.includes('loan') || q.includes('emi') || q.includes('different') || q.includes('invisible')) {
      return 'Unlike a loan EMI or purchase where the cost is immediate and visible, pausing a SIP has an invisible future cost: skipped compounding and lost rupee-cost averaging during market dips.';
    }
    if (q.includes('strain') || q.includes('comfort') || q.includes('buffer')) {
      return 'SIP strain measures what fraction of your disposable monthly surplus (take-home pay minus fixed obligations) goes toward your SIP. Comfort score penalizes high strain and thin emergency cash buffers.';
    }
    if (q.includes('replay') || q.includes('chart') || q.includes('2020') || q.includes('past')) {
      return 'The Replay chart runs your monthly SIP amount through real past NAV data (such as the March 2020 market crash). It compares continuing your SIP versus pausing for 3 months. This demonstrates historical impact in one past period; it is not a forecast.';
    }
    if (q.includes('return') || q.includes('rate') || q.includes('annual') || q.includes('8%')) {
      return 'Based on your inputs and an assumed return of 8% a year (range 6% to 10%). You can adjust the assumed return rate anytime in the Assumptions panel.';
    }
    if (q.includes('fast') || q.includes('path') || q.includes('tight')) {
      return 'The fast path is a 45-second direct consequence view for investors facing immediate cash tightness. It shows goal progress impact across options without forcing replay or slider steps.';
    }
    if (q.includes('reduce') || q.includes('stop') || q.includes('cancel') || q.includes('pause')) {
      return 'Continuing keeps full monthly contributions; Reduce lowers your monthly SIP amount; Pause skips contributions for a set duration; Stop halts contributions completely. Each option updates your projected goal progress and monthly strain.';
    }
    if (q.includes('sampada') || q.includes('recommend') || q.includes('advice') || q.includes('broker')) {
      return 'This co-pilot is an independent decision check, not part of Sampada. It earns nothing whichever option you choose and provides objective projections with zero recommendations.';
    }

    return 'This check displays the goal consequences of changing your SIP. You can inspect your options using the priority slider, view historical performance in the Replay chart, or adjust assumptions in the panel.';
  };

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const userMsg: Message = { sender: 'user', text: query, timestamp: timeStr };
    const answerText = generateAnswer(query);
    const botMsg: Message = { sender: 'assistant', text: answerText, timestamp: timeStr };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    if (!textToSend) setInput('');
  };

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            background: 'var(--ink)',
            color: 'var(--paper)',
            border: 'none',
            borderRadius: '24px',
            padding: '12px 18px',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(0,0,0,0.25)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span>💬</span>
          <span>{COPY.aiAssistant.title}</span>
        </button>
      )}

      {/* Chatbot Window */}
      {isOpen && (
        <div
          style={{
            width: '360px',
            height: '480px',
            background: 'var(--paper)',
            border: '1px solid var(--rule)',
            borderRadius: '10px',
            boxShadow: '0 8px 28px rgba(0,0,0,0.2)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <div
            style={{
              background: 'var(--ink)',
              color: 'var(--paper)',
              padding: '12px 16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <div style={{ fontSize: '15px', fontWeight: 600 }}>{COPY.aiAssistant.title}</div>
              <div style={{ fontSize: '11px', color: '#CBD5E0', marginTop: '2px' }}>
                {COPY.aiAssistant.disclosure}
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--paper)',
                fontSize: '18px',
                cursor: 'pointer',
                padding: '4px',
              }}
            >
              ✕
            </button>
          </div>

          {/* Preset Questions Bar */}
          <div
            style={{
              padding: '8px 12px',
              background: 'var(--mist)',
              borderBottom: '1px solid var(--rule)',
              display: 'flex',
              gap: '6px',
              overflowX: 'auto',
              whiteSpace: 'nowrap',
            }}
          >
            {PRESET_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                style={{
                  background: 'var(--paper)',
                  border: '1px solid var(--rule)',
                  borderRadius: '12px',
                  padding: '4px 10px',
                  fontSize: '12px',
                  color: 'var(--slate)',
                  cursor: 'pointer',
                  flexShrink: 0,
                }}
              >
                {q}
              </button>
            ))}
          </div>

          {/* Messages Body */}
          <div
            style={{
              flex: 1,
              padding: '12px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              background: '#FAFAFB',
            }}
          >
            {messages.map((m, idx) => (
              <div
                key={idx}
                style={{
                  alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                  background: m.sender === 'user' ? 'var(--signal)' : 'var(--paper)',
                  color: m.sender === 'user' ? 'var(--paper)' : 'var(--ink)',
                  border: m.sender === 'assistant' ? '1px solid var(--rule)' : 'none',
                  borderRadius: '8px',
                  padding: '10px 12px',
                  fontSize: '13px',
                  lineHeight: '1.4',
                }}
              >
                <div>{m.text}</div>
                <div
                  style={{
                    fontSize: '10px',
                    color: m.sender === 'user' ? '#DCE7F5' : 'var(--slate)',
                    marginTop: '4px',
                    textAlign: 'right',
                  }}
                >
                  {m.timestamp}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <div
            style={{
              padding: '10px 12px',
              borderTop: '1px solid var(--rule)',
              background: 'var(--paper)',
              display: 'flex',
              gap: '8px',
            }}
          >
            <input
              type="text"
              placeholder={COPY.aiAssistant.placeholder}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSend();
              }}
              style={{
                flex: 1,
                padding: '8px 12px',
                border: '1px solid var(--rule)',
                borderRadius: '4px',
                fontSize: '13px',
              }}
            />
            <button
              onClick={() => handleSend()}
              style={{
                background: 'var(--signal)',
                color: 'var(--paper)',
                border: 'none',
                borderRadius: '4px',
                padding: '8px 14px',
                fontSize: '13px',
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              {COPY.aiAssistant.btnSend}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
