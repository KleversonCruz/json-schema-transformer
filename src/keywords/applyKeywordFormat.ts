import { Schema } from '../types';
import arrayFormat from './arrayFormat';
import numberFormat from './numberFormat';
import objectFormat from './objectFormat';
import stringFormat from './stringFormat';
import typecast from './typecast';

export default function applyKeywordFormat(schema: Schema, input: any) {
  input = typecast(schema, input);

  switch (typeof input) {
    case 'string':
      return stringFormat(schema, input);
    case 'number':
      return numberFormat(schema, input);
    case 'object':
      return Array.isArray(input)
        ? arrayFormat(schema, input)
        : objectFormat(schema, input);
    default:
      return input;
  }
}
