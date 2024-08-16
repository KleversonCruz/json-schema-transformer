import numberFormat from "./numberFormat";

describe('numberFormat', () => {
  it('should return the minimum value if input is less than minimum', () => {
    const schema = { minimum: 10, maximum: 20 };
    const result = numberFormat(schema, 5);
    expect(result).toBe(10);
  });

  it('should return the maximum value if input is greater than maximum', () => {
    const schema = { minimum: 10, maximum: 20 };
    const result = numberFormat(schema, 25);
    expect(result).toBe(20);
  });

  it('should return the input value if it is within the range', () => {
    const schema = { minimum: 10, maximum: 20 };
    const result = numberFormat(schema, 15);
    expect(result).toBe(15);
  });

  describe('enums', () => {
    it('should return the corresponding enum value for a valid input', () => {
      const schema = { enum: ['red', 'green', 'blue'] };
      const result = numberFormat(schema, 1);
      expect(result).toBe('green');
    });
  
    it('should return the input if it is not a valid enum value', () => {
      const schema = { enum: ['red', 'green', 'blue'] };
      const result = numberFormat(schema, 5);
      expect(result).toBe(5);
    });
  
    it('should return the input if the schema has no enum', () => {
      const schema = {};
      const result = numberFormat(schema, -1);
      expect(result).toBe(-1);
    });
  });
});