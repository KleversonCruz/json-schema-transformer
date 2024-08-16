import { dateFormat, dateTimeFormat, timeFormat } from './dateFormat';

describe('dateTimeFormat', () => {
  it('should return ISO string when valid date string is provided', () => {
    const value = '2023-08-15T12:34:56Z';
    const result = dateTimeFormat(value);
    expect(result).toBe('2023-08-15T12:34:56.000Z');
  });

  it('should return input string when invalid date string is provided', () => {
    const value = 'invalid-date';
    const result = dateTimeFormat(value);
    expect(result).toBe(value);
  });
});

describe('timeFormat', () => {
  it('should return time in HH:mm:ss format when valid date string is provided', () => {
    const value = '2023-08-15T15:34:56Z';
    const result = timeFormat(value);
    expect(result).toBe('12:34:56');
  });

  it('should return input string when invalid date string is provided', () => {
    const value = 'invalid-date';
    const result = timeFormat(value);
    expect(result).toBe(value);
  });
});

describe('dateFormat', () => {
  it('should return date in yyyy-MM-dd format when valid date string is provided', () => {
    const value = '2023-08-15T12:34:56Z';
    const result = dateFormat(value);
    expect(result).toBe('2023-08-15');
  });

  it('should return input string when invalid date string is provided', () => {
    const value = 'invalid-date';
    const result = dateFormat(value);
    expect(result).toBe(value);
  });
});
