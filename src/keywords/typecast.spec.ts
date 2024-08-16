import typecast from './typecast';

describe('typecast', () => {
  it('should cast a valid numeric string to a number for "number" type', () => {
    const schema = { type: 'number' };
    expect(typecast(schema, '123')).toBe(123);
    expect(typecast(schema, '-123')).toBe(-123);
    expect(typecast(schema, '123.45')).toBe(123.45);
  });

  it('should cast a valid numeric string to an integer for "integer" type', () => {
    const schema = { type: 'integer' };
    expect(typecast(schema, '123')).toBe(123);
    expect(typecast(schema, '-123')).toBe(-123);
    expect(typecast(schema, '123.45')).toBe(123);
  });

  it('should cast any value to a boolean for "boolean" type', () => {
    const schema = { type: 'boolean' };
    expect(typecast(schema, 'true')).toBe(true);
    expect(typecast(schema, '')).toBe(false);
    expect(typecast(schema, 'false')).toBe(true);
    expect(typecast(schema, 0)).toBe(false);
    expect(typecast(schema, 1)).toBe(true);
    expect(typecast(schema, null)).toBe(false);
  });

  it('should return the data unchanged for "object" and "array" types', () => {
    const objectSchema = { type: 'object' };
    const arraySchema = { type: 'array' };
    const obj = { key: 'value' };
    const arr = [1, 2, 3];

    expect(typecast(objectSchema, obj)).toBe(obj);
    expect(typecast(arraySchema, arr)).toBe(arr);
  });

  it('should cast any value to a string for any other type', () => {
    const schema = { type: 'string' };
    expect(typecast(schema, 123)).toBe('123');
    expect(typecast(schema, true)).toBe('true');
    expect(typecast(schema, null)).toBe('null');
    expect(typecast(schema, undefined)).toBe('undefined');
  });

  it('should return the original value if data is not a valid numeric string and type is number or integer', () => {
    const schemaNumber = { type: 'number' };
    const schemaInteger = { type: 'integer' };
    expect(typecast(schemaNumber, 'abc')).toBe('abc');
    expect(typecast(schemaInteger, '123abc')).toBe('123abc');
  });
});
