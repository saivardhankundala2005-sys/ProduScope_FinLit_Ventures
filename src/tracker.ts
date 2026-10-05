export type EventName =
  | 'sheet_opened'
  | 'skipped'
  | 'reason_selected'
  | 'replay_viewed'
  | 'option_card_viewed'
  | 'options_enter'
  | 'options_exit'
  | 'option_selected'
  | 'stop_selected'
  | 'abandoned'
  | 'confirm_completed'
  | 'reminder_set'
  | 'day30_response';

export interface EventLog {
  timestamp: string;
  event: EventName;
  props?: Record<string, any>;
}

const STORAGE_KEY = 'sip_copilot_events';

export function track(event: EventName, props?: Record<string, any>): void {
  const logItem: EventLog = {
    timestamp: new Date().toISOString(),
    event,
    props,
  };

  try {
    const existingStr = localStorage.getItem(STORAGE_KEY);
    const logs: EventLog[] = existingStr ? JSON.parse(existingStr) : [];
    logs.push(logItem);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
  } catch (err) {
    // LocalStorage error fallback
  }
}

export function getLoggedEvents(): EventLog[] {
  try {
    const existingStr = localStorage.getItem(STORAGE_KEY);
    return existingStr ? JSON.parse(existingStr) : [];
  } catch (err) {
    return [];
  }
}

export function clearLoggedEvents(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    // Ignore
  }
}
