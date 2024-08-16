import { Schema } from '../types';

const RE_NUMERIC = /^-?\d+(\.\d+)?$/;

function isNumeric(value: any) {
  return typeof value === 'string' && RE_NUMERIC.test(value);
}

export default function typecast(schema: Schema, data: any) {
  switch (schema.type) {
    case 'string':
      return String(data);
    case 'number':
      return isNumeric(data) ? parseFloat(data) : data;
    case 'integer':
      return isNumeric(data) ? parseInt(data, 10) : data;
    case 'boolean':
      return !!data;
    case 'object':
    case 'array':
      return data;
    default:
      return data;
  }
}
