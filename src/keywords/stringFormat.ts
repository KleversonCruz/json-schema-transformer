import { Schema } from '../types';

function clampString(input: string, minLength: number, maxLength: number) {
  if (input.length > maxLength) {
    input = input.slice(0, maxLength);
  }

  if (input.length < minLength) {
    input = input.padEnd(minLength, ' ');
  }

  return input;
}

function transformString(input: string, transformations: Array<string>) {
  if (transformations.includes('trim')) {
    input = input.trim();
  } else if (
    transformations.includes('trimStart') ||
    transformations.includes('trimLeft')
  ) {
    input = input.trimStart();
  } else if (
    transformations.includes('trimEnd') ||
    transformations.includes('trimRight')
  ) {
    input = input.trimEnd();
  }

  if (transformations.includes('toLowerCase')) {
    input = input.toLowerCase();
  } else if (transformations.includes('toUpperCase')) {
    input = input.toUpperCase();
  }

  return input;
}

export default function stringFormat(schema: Schema, input: string) {
  const { maxLength, minLength, transform } = schema;

  let newString = input;

  if (transform && Array.isArray(transform)) {
    newString = transformString(input, transform);
  }

  if (maxLength || minLength) {
    newString = clampString(newString, minLength, maxLength);
  }

  return newString;
}
