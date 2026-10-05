import { describe, it, expect } from 'vitest';
import { COPY, BANNED_WORDS } from './copy';

function extractAllStrings(obj: any): string[] {
  let strings: string[] = [];
  if (typeof obj === 'string') {
    strings.push(obj);
  } else if (typeof obj === 'object' && obj !== null) {
    for (const key of Object.keys(obj)) {
      strings = strings.concat(extractAllStrings(obj[key]));
    }
  }
  return strings;
}

describe('Automated Copy Rules & Banned Words Test', () => {
  const allStrings = extractAllStrings(COPY);

  it('No user-facing string should contain an exclamation mark (!)', () => {
    allStrings.forEach((str) => {
      expect(str, `String contains exclamation mark: "${str}"`).not.toContain('!');
    });
  });

  it('No user-facing string should contain an emoji', () => {
    const emojiRegex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
    allStrings.forEach((str) => {
      expect(emojiRegex.test(str), `String contains emoji: "${str}"`).toBe(false);
    });
  });

  it('No user-facing string should contain any banned word (whole word match)', () => {
    allStrings.forEach((str) => {
      const lowerStr = str.toLowerCase();
      BANNED_WORDS.forEach((banned) => {
        // Use word boundary regex for whole-word matching per section 5
        const escaped = banned.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`\\b${escaped}\\b`, 'i');
        const hasMatch = regex.test(lowerStr);
        expect(hasMatch, `String "${str}" contains banned word "${banned}"`).toBe(false);
      });
    });
  });

  it('Projection basis string must be exact', () => {
    expect(COPY.assumptions.projectionBasis).toBe(
      'Based on your inputs and an assumed return of 8% a year (range 6% to 10%).'
    );
  });

  it('Replay caption string must be exact', () => {
    expect(COPY.c3Replay.caption).toBe(
      'This is what happened in one past period. It is not a forecast.'
    );
  });
});
