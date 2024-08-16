import { dateFormat, dateTimeFormat, timeFormat } from './dateFormat';

export const formats = [
  {
    name: 'date',
    function: { type: 'string', format: dateFormat },
  },
  {
    name: 'time',
    function: { type: 'string', format: timeFormat },
  },
  {
    name: 'datetime',
    function: { type: 'string', format: dateTimeFormat },
  },
];
