/* eslint-disable @typescript-eslint/ban-types */
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import * as React from 'react';

import clsxm from '@/lib/clsxm';

import Filter from '@/components/table/Filter';
import TBody from '@/components/table/TBody';
import TFoot from '@/components/table/TFoot';
import THead from '@/components/table/THead';

type TableProps<T extends object> = {
  data: T[];
  columns: ColumnDef<T>[];
  omitSort?: boolean;
  withFilter?: boolean;
  withFooter?: boolean;
} & React.ComponentPropsWithoutRef<'div'>;

export default function Table<T extends object>({
  className,
  columns,
  data,
  omitSort = false,
  withFilter = false,
  withFooter = false,
  ...rest
}: TableProps<T>) {
  const [globalFilter, setGlobalFilter] = React.useState('');
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      sorting,
    },
    defaultColumn: {
      minSize: 0,
      size: 0,
    },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className={clsxm('flex flex-col', className)} {...rest}>
      {withFilter && <Filter table={table} />}
      <div className='-mx-4 -my-2 mt-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
        <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
          <div className='overflow-hidden ring-1 ring-black ring-opacity-5 dark:ring-gray-800 md:rounded-lg'>
            <table className='min-w-full divide-y divide-gray-200 dark:divide-gray-800'>
              <THead table={table} omitSort={omitSort} />
              <TBody table={table} />
              {withFooter && <TFoot table={table} />}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
