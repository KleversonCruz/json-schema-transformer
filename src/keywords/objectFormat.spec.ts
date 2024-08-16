import objectFormat from "./objectFormat";

describe('objectFormat', () => {
  it('should truncate the object properties if it exceeds maxProperties', () => {
    const schema = { maxProperties: 2 };
    const result = objectFormat(schema, { a: 1, b: 2, c: 3 });
    expect(result).toEqual({ a: 1, b: 2 });
  });

  it('should return the input object if it has properties within the limit', () => {
    const schema = { maxProperties: 3 };
    const result = objectFormat(schema, { a: 1, b: 2 });
    expect(result).toEqual({ a: 1, b: 2 });
  });
});