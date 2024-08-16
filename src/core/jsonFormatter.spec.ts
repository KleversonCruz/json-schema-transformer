import { Schema } from '../types';
import JsonFormatter from './jsonFormatter';
import exampleInput from '../../__mocks__/exampleInput.json';
import exampleSchema from '../../__mocks__/exampleSchema.json';
import exampleOutput from '../../__mocks__/exampleOutput.json';

describe('JsonFormatter', () => {
  let jsonFormatter: JsonFormatter;

  beforeEach(() => {
    jsonFormatter = new JsonFormatter();
  });

  describe('addFormat', () => {
    it('should return the instance of JsonFormatter when adding a format', () => {
      const result = jsonFormatter.addFormat('testFormat', {
        type: 'string',
        format: (value) => value,
      });
      expect(result).toBeInstanceOf(JsonFormatter);
    });
  });

  describe('execute', () => {
    it('should apply the schema in data gracefully', () => {
      jsonFormatter.addFormat('customCodeFormat', {
        format: (value) => `GTIN=${value}`,
      });

      const result = jsonFormatter.execute(exampleSchema, exampleInput);

      expect(result).toEqual(exampleOutput);
    });

    it('should handle empty data and default values gracefully', () => {
      const schema: Schema = {
        type: 'object',
        properties: {
          name: { type: 'string', default: 'John Doe' },
        },
      };

      const result = jsonFormatter.execute(schema, {});

      expect(result).toEqual({
        name: 'John Doe',
      });
    });
  });
});
