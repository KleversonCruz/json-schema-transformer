import applyKeywordFormat from './applyKeywordFormat';

describe('applySchemaFormats', () => {
  it('should not apply any formats when schema type is not valid', () => {
    const schema = { type: 'unknow' };
    const result = applyKeywordFormat(schema, undefined);
    expect(result).toBe(undefined);
  });

  it('should apply string formats when schema type is string', () => {
    const schema = { type: 'string', maxLength: 5 };
    const result = applyKeywordFormat(schema, 'tooLongString');
    expect(result).toBe('tooLo');
  });

  it('should apply number formats when schema type is number', () => {
    const schema = { type: 'number', minimum: 10, maximum: 20 };
    const result = applyKeywordFormat(schema, 25);
    expect(result).toBe(20);
  });

  it('should apply array formats when schema type is array', () => {
    const schema = { type: 'array', maxItems: 3, uniqueItems: true };
    const result = applyKeywordFormat(schema, [1, 2, 2, 3, 4]);
    expect(result).toEqual([1, 2, 3]);
  });

  it('should apply object formats when schema type is object', () => {
    const schema = { type: 'object', maxProperties: 2 };
    const result = applyKeywordFormat(schema, { a: 1, b: 2, c: 3 });
    expect(result).toEqual({ a: 1, b: 2 });
  });

  it('should return input unchanged if schema type is not recognized', () => {
    const schema = { type: 'unknown' };
    const result = applyKeywordFormat(schema, 'anyValue');
    expect(result).toBe('anyValue');
  });
});
