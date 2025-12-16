import { vi } from 'vitest';

/**
 * Returns a mock factory function for luxon DateTime.now()
 * This must be used with vi.mock() at the top level of the test file
 * 
 * @example
 * vi.mock('luxon', mockDate('2025-12-11T12:00:00.000Z'));
 */
export const mockDate = (date: string) => {
  return async () => {
    const actual = await vi.importActual<typeof import('luxon')>('luxon');
    const fakeDateTime = actual.DateTime.fromJSDate(new Date(date));

    return {
      ...actual,
      DateTime: Object.assign(actual.DateTime, {
        now: () => fakeDateTime,
      }),
    };
  };
};