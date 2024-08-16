import stringFormat from './stringFormat';

describe('stringFormat', () => {
  it('should truncate the string if it exceeds the maxLength', () => {
    const schema = { maxLength: 10 };
    expect(stringFormat(schema, 'Hello World')).toBe('Hello Worl');
  });

  it('should pad the string with spaces if it is shorter than minLength', () => {
    const schema = { minLength: 5 };
    expect(stringFormat(schema, 'Hi')).toBe('Hi   ');
  });

  it('should trim the start of the string when "trimStart" is included in transform', () => {
    const schema = { transform: ['trimStart'] };
    expect(stringFormat(schema, '  Hello World  ')).toBe('Hello World  ');
  });

  it('should trim the end of the string when "trimEnd" is included in transform', () => {
    const schema = { transform: ['trimEnd'] };
    expect(stringFormat(schema, '  Hello World  ')).toBe('  Hello World');
  });

  it('should convert the string to lowercase when "toLowerCase" is included in transform', () => {
    const schema = { transform: ['toLowerCase'] };
    expect(stringFormat(schema, 'HELLO WORLD')).toBe('hello world');
  });

  it('should convert the string to uppercase when "toUpperCase" is included in transform', () => {
    const schema = { transform: ['toUpperCase'] };
    expect(stringFormat(schema, 'hello world')).toBe('HELLO WORLD');
  });

  it('should apply multiple transformations and clamping in the correct order', () => {
    const schema = {
      minLength: 5,
      maxLength: 10,
      transform: ['trim', 'toUpperCase'],
    };
    expect(stringFormat(schema, '  hello world  ')).toBe('HELLO WORL');
  });

  it('should return the original string if no transformations are applied', () => {
    const schema = {};
    expect(stringFormat(schema, 'Hello World')).toBe('Hello World');
  });

  it('should handle edge cases with empty input and apply minLength padding', () => {
    const schema = { minLength: 5 };
    expect(stringFormat(schema, '')).toBe('     ');
  });
});
