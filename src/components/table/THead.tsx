import { flexRender, RowData, Table } from '@tanstack/react-table';
import clsx from 'clsx';
import * as React from 'react';
import { VscTriangleDown } from 'react-icons/vsc';

import clsxm from '@/lib/clsxm';

type THeadProps<T extends RowData> = {
  omitSort: boolean;
  table: Table<T>;
} & React.ComponentPropsWithoutRef<'div'>;

export default function THead<T extends RowData>({
  className,
  omitSort,
  table,
  ...rest
}: THeadProps<T>) {
  return (
    <thead
      className={clsxm([
        'border-b border-gray-200 dark:border-gray-800',
        'bg-gray-50 dark:bg-gray-700',
        className,
      ])}
      {...rest}
    >
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <th
              key={header.id}
              scope='col'
              className={clsxm([
                'group px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-200',
                !omitSort && header.column.getCanSort() ? 'pl-4' : 'pl-[30px]',
              ])}
            >
              {header.isPlaceholder ? null : (
                <div
                  className={clsxm([
                    'relative flex items-center gap-2 py-1',
                    !omitSort && header.column.getCanSort()
                      ? 'cursor-pointer select-none'
                      : '',
                    {
                      'justify-start':
                        header.column.columnDef.meta?.align === 'left',
                      'justify-center':
                        header.column.columnDef.meta?.align === 'center',
                      'justify-end':
                        header.column.columnDef.meta?.align === 'right',
                    },
                  ])}
                  onClick={
                    omitSort
                      ? () => null
                      : header.column.getToggleSortingHandler()
                  }
                >
                  {!omitSort &&
                  header.column.getCanSort() &&
                  !header.column.getIsSorted() ? (
                    <VscTriangleDown
                      className={clsx(
                        'w-3 rotate-180 fill-transparent group-hover:fill-gray-400'
                      )}
                    />
                  ) : (
                    {
                      asc: (
                        <VscTriangleDown className='w-3 rotate-180 fill-gray-700 dark:fill-gray-200' />
                      ),
                      desc: (
                        <VscTriangleDown className='w-3 fill-gray-700 dark:fill-gray-200' />
                      ),
                    }[header.column.getIsSorted() as string] ?? null
                  )}
                  <p>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </p>
                </div>
              )}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
}
