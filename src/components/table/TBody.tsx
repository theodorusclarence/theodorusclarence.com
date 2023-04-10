import { flexRender, RowData, Table } from '@tanstack/react-table';
import clsx from 'clsx';
import * as React from 'react';

import clsxm from '@/lib/clsxm';

type TBodyProps<T extends RowData> = {
  isLoading?: boolean;
  table: Table<T>;
} & React.ComponentPropsWithoutRef<'div'>;

export default function TBody<T extends RowData>({
  className,
  isLoading = false,
  table,
  ...rest
}: TBodyProps<T>) {
  const rows = table.getRowModel().rows;

  return (
    <tbody
      className={clsxm(
        'divide-y divide-gray-200 bg-white dark:divide-gray-800',
        className
      )}
      {...rest}
    >
      {isLoading && (
        <tr className='animate-pulse bg-gray-50 dark:bg-gray-800'>
          <td
            colSpan={table.getAllColumns().length}
            className='whitespace-nowrap px-6 py-4 text-center text-sm text-gray-700 dark:text-gray-100'
          >
            <span>Memuat data...</span>
          </td>
        </tr>
      )}
      {rows.length === 0 && !isLoading ? (
        <tr className='bg-gray-50 dark:bg-gray-800'>
          <td
            colSpan={table.getAllColumns().length}
            className='whitespace-nowrap px-6 py-4 text-center text-sm text-gray-700 dark:text-gray-100'
          >
            <span>Data tidak ditemukan</span>
          </td>
        </tr>
      ) : (
        rows.map((row, index) => (
          <tr
            key={row.id}
            className={clsxm(
              index % 2 === 0
                ? 'bg-white dark:bg-dark'
                : 'bg-gray-50 dark:bg-gray-800'
            )}
          >
            {row.getVisibleCells().map((cell) => (
              <td
                key={cell.id}
                color='secondary'
                className={clsx([
                  'whitespace-nowrap',
                  'truncate',
                  'px-6 py-4 pl-[34px]',
                  'text-sm text-gray-600 dark:text-gray-200',
                  {
                    'text-left': cell.column.columnDef.meta?.align === 'left',
                    'text-center':
                      cell.column.columnDef.meta?.align === 'center',
                    'text-right': cell.column.columnDef.meta?.align === 'right',
                  },
                ])}
                title={cell.getValue() as string}
                style={{
                  width:
                    cell.column.getSize() !== 0
                      ? cell.column.getSize()
                      : undefined,
                  maxWidth:
                    cell.column.getSize() !== 0
                      ? cell.column.getSize()
                      : undefined,
                }}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))
      )}
    </tbody>
  );
}
