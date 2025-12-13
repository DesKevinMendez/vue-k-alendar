import { vi } from 'vitest';

export const mockDate = (date: string) => {
  vi.mock('luxon', async () => {
    const actual = await vi.importActual<typeof import('luxon')>('luxon');
    const fakeDateTime = actual.DateTime.fromJSDate(new Date(date));

    return {
      ...actual,
      DateTime: Object.assign(actual.DateTime, {
        now: () => fakeDateTime,
      }),
    };
  });
};