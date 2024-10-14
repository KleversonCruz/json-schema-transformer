import applyDefaults from './applyDefaults';

describe('assignDefaultValues', () => {
  it('should return an object with default values for properties', () => {
    const schema = {
      type: 'object',
      properties: {
        name: { type: 'string', default: 'John Doe' },
        age: { type: 'number', default: 30 },
      },
    };

    expect(applyDefaults(schema, {})).toEqual({
      name: 'John Doe',
      age: 30,
    });
  });

  it('should return an empty object if no properties have default values', () => {
    const schema = {
      type: 'object',
      properties: {
        name: { type: 'string' },
        age: { type: 'number' },
      },
    };

    expect(applyDefaults(schema, {})).toEqual({});
  });

  it('should handle nested object schemas and assign default values recursively', () => {
    const schema = {
      type: 'object',
      properties: {
        user: {
          type: 'object',
          properties: {
            name: { type: 'string', default: 'John Doe' },
            address: {
              type: 'object',
              properties: {
                city: { type: 'string', default: 'New York' },
              },
            },
          },
        },
      },
    };

    expect(
      applyDefaults(schema, {
        user: {
          name: undefined
        },
      })
    ).toEqual({
      user: {
        name: 'John Doe',
        address: {
          city: 'New York',
        },
      },
    });
  });

  it('should return undefined if no default value is provided and type is not "object"', () => {
    const schema = {
      type: 'string',
    };

    expect(applyDefaults(schema, {})).toStrictEqual({});
  });

  it('should handle schema without type and properties', () => {
    const schema = {
      default: 'No Type',
    };

    expect(applyDefaults(schema, {})).toStrictEqual({});
  });

  it('should handle an object schema with some properties missing default values', () => {
    const schema = {
      type: 'object',
      properties: {
        name: { type: 'string', default: 'John Doe' },
        age: { type: 'number' },
      },
    };

    expect(applyDefaults(schema, {})).toEqual({
      name: 'John Doe',
    });
  });
});
