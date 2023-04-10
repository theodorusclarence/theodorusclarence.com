import '@tanstack/react-table';

declare module '@tanstack/table-core' {
  // eslint-disable-next-line unused-imports/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    align: 'left' | 'center' | 'right';
  }
}
