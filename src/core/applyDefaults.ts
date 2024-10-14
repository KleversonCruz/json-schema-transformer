import { Schema } from '../types';
import { hasOwnProp } from '../utils';

export default function applyDefaults(schema: Schema, data: any) {
  if (schema.type === 'object' && schema.properties) {
    for (const key in schema.properties) {
      if (hasOwnProp(schema.properties, key)) {
        const propertySchema = schema.properties[key];

        if (!propertySchema) return data;

        if (!hasOwnProp(data, key) || !data[key]) {
          if (propertySchema.default) {
            data[key] = propertySchema.default;
          } else if (propertySchema.type === 'object') {
            data[key] = {};
          }
        }

        if (propertySchema.type === 'object' && data[key]) {
          applyDefaults(propertySchema, data[key]);
        }

        if (propertySchema.type === 'array' && Array.isArray(data[key])) {
          data[key].forEach((item) => {
            if (propertySchema.items.type === 'object') {
              applyDefaults(propertySchema.items, item);
            }
          });
        }
      }
    }
  }
  return data;
}
