import { buildEventPrompt } from '../index';
import { describe, it, expect } from 'vitest';

describe('buildEventPrompt', () => {
  it('is a function', () => {
    expect(typeof buildEventPrompt).toBe('function');
  });
});
