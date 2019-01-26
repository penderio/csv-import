# CSVImport

[![Greenkeeper badge](https://badges.greenkeeper.io/entercosmos/csv-import.svg)](https://greenkeeper.io/)

[![npm package][npm-badge]][npm]

Used for mapping and importing records from csv.

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

### Prop Types

| Property | Type | Required? | Description |
|:---|:---|:---:|:---|
| tableId | String | ✓ | The table the records will be imported to. Used for displaying previews of the record. |
| onTableIdChange | Function |  | Callback invoked whenever a table get's selected: `({value: string}): void` |
| firstRowHeaders | Boolean | | Whether the first row in the csv represents the name of each column |
| onFirstRowHeadersChange | Function | | Callback invoked whenever the firstRowHeaders value changes  `({value: string}): void` |
### More information

This component is designed and developed as part of [Cosmos Design System][cmds]. 

[cmds]: https://github.com/entercosmos/cosmos
[npm-badge]: https://img.shields.io/npm/v/@cmds/single-select-field.svg
[npm]: https://www.npmjs.org/package/@cmds/single-select-field
