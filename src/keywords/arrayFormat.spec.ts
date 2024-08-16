import arrayFormat from "./arrayFormat";

describe('arrayFormat', () => {
  it('should truncate the array if it exceeds maxItems', () => {
    const schema = { maxItems: 3, uniqueItems: false };
    const result = arrayFormat(schema, [1, 2, 3, 4, 5]);
    expect(result).toEqual([1, 2, 3]);
  });

  it('should remove duplicates if uniqueItems is true', () => {
    const schema = { maxItems: 10, uniqueItems: true };
    const result = arrayFormat(schema, [1, 2, 2, 3, 4, 4, 5]);
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  it('should return the input array if it is within the constraints', () => {
    const schema = { maxItems: 10, uniqueItems: false };
    const result = arrayFormat(schema, [1, 2, 3]);
    expect(result).toEqual([1, 2, 3]);
  });
});