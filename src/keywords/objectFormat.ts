import { Schema } from '../types';

export default function objectFormat(schema: Schema, input: any) {
  const { maxProperties } = schema;
  const keys = Object.keys(input);

  if (keys.length <= maxProperties) {
    return input;
  }

  return Object.fromEntries(Object.entries(input).slice(0, maxProperties));
}
