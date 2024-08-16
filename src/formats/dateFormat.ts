import { format, parseISO, isValid } from 'date-fns';

export function dateTimeFormat(value: string) {
  const date = parseISO(value);
  return isValid(date) ? date.toISOString() : value;
}

export function timeFormat(value: string) {
  const date = parseISO(value);
  return isValid(date) ? format(date, 'HH:mm:ss') : value;
}

export function dateFormat(value: string): string {
  const date = parseISO(value);
  return isValid(date) ? format(date, 'yyyy-MM-dd') : value;
}