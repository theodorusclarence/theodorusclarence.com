import clsx from 'clsx';
import debounce from 'lodash/debounce';
import * as React from 'react';
import { GoTriangleDown, GoTriangleUp } from 'react-icons/go';
import { HiSearch } from 'react-icons/hi';
import {
  Column,
  PluginHook,
  TableOptions,
  useGlobalFilter,
  useSortBy,
  useTable,
} from 'react-table';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props<T extends object = {}> = {
  data: readonly T[];
  columns: readonly Column<T>[];
  options?: Omit<TableOptions<T>, 'data' | 'columns'>;
  plugins?: PluginHook<T>[];
  className?: string;
  withFooter?: boolean;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export default function ReactTable<T extends object>({
  data,
  columns,
  options,
  plugins = [],
  className,
  withFooter = true,
}: Props<T>) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
    footerGroups,
  } = useTable<T>(
    { ...options, data, columns },
    useGlobalFilter,
    useSortBy,
    ...plugins
  );

  //#region  //*=========== Global Filter ===========
  const [value, setValue] = React.useState(state.globalFilter);
  const onChange = debounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);
  //#endregion  //*======== Global Filter ===========

  return (
    <div className={clsx('flex flex-col w-full', className)}>
      <div>
        <label className='text-gray-500 sr-only'>Filter</label>
        <div className='relative'>
          <input
            placeholder='Find...'
            value={value || ''}
            onChange={(e) => {
              setValue(e.target.value);
              onChange(e.target.value);
            }}
            className={clsx(
              'w-full rounded-md sm:max-w-xs dark:bg-dark',
              'px-4 py-2 pl-9',
              'placeholder-gray-400',
              'text-sm md:text-base',
              'border border-gray-300 dark:border-gray-600',
              'dark:focus:border-primary-300 focus:border-primary-300 focus:outline-none'
            )}
          />
          <div className='flex absolute inset-y-0 left-0 items-center pl-2 pointer-events-none'>
            <HiSearch className='text-xl text-gray-400' />
          </div>
        </div>
      </div>

      <div className='overflow-x-auto -my-2 mt-2'>
        <div className='inline-block py-2 min-w-full align-middle'>
          <div className='overflow-hidden border-b border-gray-200 shadow-sm sm:rounded-lg dark:border-gray-800'>
            <table
              {...getTableProps()}
              className='min-w-full divide-y divide-gray-200 dark:divide-gray-800'
            >
              <thead className='bg-gray-50 dark:bg-gray-700'>
                {headerGroups.map((headerGroup, index) => (
                  <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                    {headerGroup.headers.map((column) => (
                      <th
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                        key={column.id}
                        scope='col'
                        className='group px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-200'
                      >
                        <div className='flex relative gap-4 items-center py-1'>
                          <p>{column.render('Header')}</p>
                          <span className='flex flex-col justify-center items-center'>
                            <GoTriangleUp
                              className={clsx(
                                'transition-opacity',
                                column.isSorted
                                  ? column.isSortedDesc
                                    ? // sorted desc
                                      'text-gray-400 dark:text-gray-500'
                                    : // sorted asc
                                      'text-gray-700 dark:text-gray-200'
                                  : // not sorted
                                    'group-hover:text-gray-400 text-transparent'
                              )}
                            />
                            <GoTriangleDown
                              className={clsx(
                                '-mt-1 transition-opacity',
                                column.isSorted
                                  ? column.isSortedDesc
                                    ? // sorted desc
                                      'text-gray-700 dark:text-gray-200'
                                    : // sorted asc
                                      'text-gray-400 dark:text-gray-500'
                                  : // not sorted
                                    'group-hover:text-gray-400 text-transparent'
                              )}
                            />
                          </span>
                        </div>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows?.map((row, index) => {
                  prepareRow(row);
                  return (
                    <tr
                      {...row.getRowProps()}
                      key={index}
                      className={clsx(
                        index % 2 === 0
                          ? 'bg-white dark:bg-dark'
                          : 'bg-gray-50 dark:bg-gray-800'
                      )}
                    >
                      {row?.cells?.map((cell, i) => {
                        return (
                          <td
                            {...cell.getCellProps()}
                            className={clsx(
                              'px-6 py-4 text-sm text-gray-700 whitespace-nowrap',
                              i === 0
                                ? 'font-medium text-gray-900 dark:text-gray-50'
                                : 'text-gray-500  dark:text-gray-200'
                            )}
                            key={i}
                          >
                            {cell.render('Cell')}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
              {withFooter && (
                <tfoot className='bg-gray-50 dark:bg-gray-700'>
                  {footerGroups.map((footerGroup, index) => (
                    <tr
                      {...footerGroup.getFooterGroupProps()}
                      key={index}
                      className='group px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-200'
                    >
                      {footerGroup.headers.map((column) => (
                        <td
                          {...column.getFooterProps()}
                          className={clsx(
                            'px-6 py-3 text-sm font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-200'
                          )}
                          key={column.id}
                        >
                          {column.render('Footer')}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tfoot>
              )}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
