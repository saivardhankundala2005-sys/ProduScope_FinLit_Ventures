import { describe, it, expect } from 'vitest';
import {
  getC1Narration,
  getC2Narration,
  getC3Narration,
  getC4Narration,
  getC5Narration,
  getF1Narration,
} from './narration';
import { calculateEngine, PERSONA_ROHAN } from './calculator';

const BANNED_WORDS = [
  'should',
  'recommend',
  'best',
  'optimal',
  'ideal',
  'smart',
  'ai',
  'unlock',
  'insights',
  'journey',
  'seamless',
  'empower',
  'personalised',
  'personalized',
  'nudge',
  'stay invested',
  'dont miss',
  "don't miss",
  'mistake',
  'regret',
  'panic',
  'guilt',
];

describe('Narration Banned Words Test', () => {
  const calc = calculateEngine({
    persona: PERSONA_ROHAN,
    chosenOption: 'pause',
    annualReturn: 0.08,
  });

  const dummyReplay = {
    dataPoints: [],
    rupeeGap: 18500,
    percentageGap: 5.2,
    finalKeptValue: 180000,
    finalPausedValue: 161500,
    fundName: 'HDFC Mid-Cap Opportunities Fund',
    episodeName: 'March 2020 COVID episode',
    isGapNegligible: false,
  };

  const sentences = [
    getC1Narration(PERSONA_ROHAN),
    getC2Narration('The market looks scary', 3),
    getC3Narration(dummyReplay),
    getC4Narration(calc),
    getC5Narration(calc, 'pause', 3),
    getC5Narration(calc, 'reduce', 3),
    getC5Narration(calc, 'continue', 3),
    getC5Narration(calc, 'stop', 3),
    getF1Narration(calc, 3),
  ];

  it('No generated narration sentence should contain any banned word', () => {
    sentences.forEach((sentence) => {
      const lower = sentence.toLowerCase();
      BANNED_WORDS.forEach((banned) => {
        const escaped = banned.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`\\b${escaped}\\b`, 'i');
        expect(regex.test(lower), `Sentence "${sentence}" contains banned word "${banned}"`).toBe(false);
      });
      expect(sentence, `Sentence "${sentence}" contains exclamation mark`).not.toContain('!');
    });
  });
});
