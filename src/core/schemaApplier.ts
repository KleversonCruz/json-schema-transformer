import { FormatCollection, Schema } from '../types';
import { applyKeywordFormat, schemaKeywords } from '../keywords';
import { hasOwnProp } from '../utils';

export default class SchemaApplier {
  readonly formats: FormatCollection;

  constructor(formats: FormatCollection) {
    this.formats = formats;
  }

  public applySchema(schema: Schema, data: any): any {
    if (!schema) return data;

    if (schema.type === 'object' && schema.properties) {
      this.processObject(schema, data);
    }

    if (schema.type === 'array' && Array.isArray(data)) {
      this.processArray(schema, data);
    }

    return this.applyFormat(schema, data);
  }

  private processObject(schema: Schema, data: any): void {
    for (const key in data) {
      if (hasOwnProp(data, key)) {
        if (schema.properties?.[key]) {
          const propertySchema = schema.properties[key];
          const processedValue = this.applySchema(propertySchema, data[key]);

          if (processedValue !== undefined && processedValue !== null) {
            data[key] = processedValue;
          }
        }
      }
    }
  }

  private processArray(schema: Schema, data: any[]): void {
    data.forEach((item, index) => {
      const itemSchema = Array.isArray(schema.items)
        ? schema.items[index]
        : schema.items;

      const processedValue = this.applySchema(itemSchema, item);
      if (processedValue !== undefined && processedValue !== null) {
        data[index] = processedValue;
      }
    });
  }

  private applyFormat(schema: Schema, input: any): any {
    if (schema && schemaKeywords.some((keyword) => keyword in schema)) {
      input = applyKeywordFormat(schema, input);

      const formatFunction = this.formats[schema.format];
      if (formatFunction && typeof input === formatFunction.type) {
        return formatFunction.format(input);
      }
      return input;
    }

    return input;
  }
}
