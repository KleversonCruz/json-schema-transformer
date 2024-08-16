import { formats as defaultFormats } from '../formats';
import {
  FormatDefinition ,
  FormatCollection,
  Schema,
} from '../types';
import applyDefaults from './applyDefaults';
import SchemaApplier from './schemaApplier';

export default class JsonFormatter {
  private readonly formats: FormatCollection = {};

  constructor() {
    this.addDefaultFormats();
  }

  public addFormat(name: string, addedFormat: FormatDefinition ): JsonFormatter {
    const { type = 'string', format } = addedFormat;
    this.formats[name] = { type, format };
    return this;
  }

  public execute(schema: Schema, data: any): any {
    const schemaApplier = new SchemaApplier(this.formats);

    applyDefaults(schema, data);
    return schemaApplier.applySchema(schema, data);
  }

  private addDefaultFormats(): void {
    for (const format of defaultFormats) {
      this.addFormat(format.name, format.function);
    }
  }
}
