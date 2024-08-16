import { Schema } from '../types';

function getEnumValue(enumArray: any, input: number) {
  if (enumArray && Array.isArray(enumArray)) {
    return enumArray[input] || input;
  }
  return input;
}

export default function numberFormat(schema: Schema, input: number) {
  const { minimum, maximum, enum: enumArray } = schema;
  if (input < minimum) {
    return minimum;
  } else if (input > maximum) {
    return maximum;
  }

  return getEnumValue(enumArray, input);
}
