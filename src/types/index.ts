export interface Schema {
  [x: string]: any;
}

export type FormatFunction = (input: any) => any;

export interface FormatDefinition {
  type?: string;
  format: FormatFunction;
}

export interface FormatCollection {
  [Name: string]: FormatDefinition;
}
