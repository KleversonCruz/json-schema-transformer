# schema-json-formatter

## Overview

`schema-json-formatter` is a library for enforcing schema-based transformations and on JSON data. It ensures data consistency by applying type conversions, custom formats, and default values according to the defined schema, making your JSON data compliant and well-structured.

## Getting Started

## Installation

To install schema-json-formatter:

```sh
npm install schema-json-formatter
```

### Basic Usage

```js
const schema = {
  type: 'object',
  properties: {
    invoiceNumber: { type: 'number' },
    invoiceDate: { type: 'string', format: 'datetime' },
    issuer: {
      type: 'object',
      properties: {
        name: { type: 'string', transform: ['toLowerCase'] },
        country: { type: 'string', default: 'USA' },
      },
    },
  },
};

const data = {
  invoiceNumber: '123',
  invoiceDate: '2024-08-15',
  issuer: { name: 'Tech Innovators' },
};

const output = {
  invoiceNumber: 123,
  invoiceDate: '2024-08-15T03:00:00.000Z',
  issuer: { name: 'tech innovators', country: 'USA' },
};

const jsonFormatter = new JsonFormatter();
jsonFormatter.execute(schema, data); // => output
```

### Custom Formats

You can add and replace any default formats using addFormat method:

```js
const schema = {
  type: 'object',
  properties: {
    code: { type: 'string', format: 'customFormat' },
  },
};

const data = {
  code: 'foo',
};

const output = {
  code: 'G-FOO',
};

const formatter = new JsonFormatter();

formatter.addFormat('customFormat', {
  type: 'string',
  format: (value) => `G-${value}`,
});

jsonFormatter.execute(schema, data); // => output
```
