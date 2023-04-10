import { flexRender, RowData, Table } from '@tanstack/react-table';
import * as React from 'react';

import clsxm from '@/lib/clsxm';

type TFootProps<T extends RowData> = {
  table: Table<T>;
} & React.ComponentPropsWithoutRef<'div'>;

export default function TFoot<T extends RowData>({
  className,
  table,
  ...rest
}: TFootProps<T>) {
  return (
    <thead
      className={clsxm([
        'border-b border-gray-200 dark:border-gray-800',
        'bg-gray-50 dark:bg-gray-700',
        className,
      ])}
      {...rest}
    >
      {table.getFooterGroups().map((footerGroup) => (
        <tr key={footerGroup.id}>
          {footerGroup.headers.map((footer) => (
            <td
              key={footer.id}
              scope='col'
              className={clsxm([
                'group px-6 py-3 text-left text-sm font-medium uppercase tracking-wider text-gray-500 dark:text-gray-200',
                'pl-[30px]',
              ])}
            >
              {footer.isPlaceholder ? null : (
                <div
                  className={clsxm('relative flex items-center gap-2 py-1', {
                    'justify-start':
                      footer.column.columnDef.meta?.align === 'left',
                    'justify-center':
                      footer.column.columnDef.meta?.align === 'center',
                    'justify-end':
                      footer.column.columnDef.meta?.align === 'right',
                  })}
                >
                  {flexRender(
                    footer.column.columnDef.footer,
                    footer.getContext()
                  )}
                </div>
              )}
            </td>
          ))}
        </tr>
      ))}
    </thead>
  );
}
