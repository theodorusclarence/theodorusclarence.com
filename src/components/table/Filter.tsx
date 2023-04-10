import { RowData, Table } from '@tanstack/react-table';
import clsx from 'clsx';
import * as React from 'react';
import { FiSearch, FiXCircle } from 'react-icons/fi';

import clsxm from '@/lib/clsxm';

type FilterProps<T extends RowData> = {
  table: Table<T>;
} & React.ComponentPropsWithoutRef<'div'>;

const DEBOUNCE_MS = 300;

export default function Filter<T extends RowData>({
  className,
  table,
  ...rest
}: FilterProps<T>) {
  const [filter, setFilter] = React.useState('');

  const handleClearFilter = () => {
    table.setGlobalFilter('');
    setFilter('');
  };

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      table.setGlobalFilter(filter);
    }, DEBOUNCE_MS);
    return () => clearTimeout(timeout);
  }, [filter, table]);

  return (
    <div className={clsxm('relative mt-1 self-start', className)} {...rest}>
      <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
        <FiSearch className='text-typo text-xl' />
      </div>
      <input
        type='text'
        value={filter ?? ''}
        onChange={(e) => {
          setFilter(String(e.target.value));
        }}
        className={clsx(
          'w-full rounded-md dark:bg-dark sm:max-w-xs',
          'px-4 py-2 pl-9',
          'placeholder-gray-400',
          'text-sm md:text-base',
          'border border-gray-300 dark:border-gray-600',
          'focus:border-primary-300 focus:outline-none dark:focus:border-primary-300',
          'focus:ring-0'
        )}
        placeholder='Search...'
      />
      {table.getState().globalFilter !== '' && (
        <div className='absolute inset-y-0 right-0 flex items-center pr-2'>
          <button type='button' onClick={handleClearFilter} className='p-1'>
            <FiXCircle className='text-typo-icons text-xl' />
          </button>
        </div>
      )}
    </div>
  );
}
