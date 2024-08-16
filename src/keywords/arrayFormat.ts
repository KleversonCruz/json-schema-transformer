import { Schema } from '../types';

export default function arrayFormat(schema: Schema, input: Array<any>) {
  const { maxItems, uniqueItems } = schema;

  let newArray = [...input];

  if (uniqueItems) {
    newArray = [...new Set(newArray)];
  }
  if (newArray.length > maxItems) {
    newArray = newArray.slice(0, maxItems);
  }

  return newArray;
}
