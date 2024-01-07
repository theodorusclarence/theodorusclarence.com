import '@tanstack/react-table';

declare module '@tanstack/react-table' {
  // eslint-disable-next-line unused-imports/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    align: 'left' | 'center' | 'right';
  }
}
