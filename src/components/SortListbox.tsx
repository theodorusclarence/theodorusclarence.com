import { Listbox, Transition } from '@headlessui/react';
import clsx from 'clsx';
import * as React from 'react';
import { HiCheck, HiSelector } from 'react-icons/hi';
import { IconType } from 'react-icons/lib';

export type SortOption = {
  id: string;
  name: string;
  icon: IconType;
};

type SortListboxProps = {
  selected: SortOption;
  setSelected: React.Dispatch<React.SetStateAction<SortOption>>;
  options: SortOption[];
};

export default function SortListbox({
  selected,
  setSelected,
  options,
}: SortListboxProps) {
  return (
    <div className='max-w-[200px] w-full'>
      <Listbox value={selected} onChange={setSelected}>
        <div className='relative'>
          <Listbox.Button
            className={clsx(
              'py-2 pr-10 pl-3 w-full font-medium text-left bg-white rounded-md sm:text-sm dark:bg-dark',
              'focus:outline-none focus-visible:ring focus-visible:ring-primary-300',
              'border border-gray-300 dark:border-gray-600',
              'transform-gpu scale-100 hover:scale-[1.03] active:scale-[0.97]',
              'transition duration-100',
              'animate-shadow'
            )}
          >
            <span className='block truncate'>
              <span className='inline-flex gap-2 items-center'>
                <selected.icon />
                {selected.name}
              </span>
            </span>
            <span className='flex absolute inset-y-0 right-0 items-center pr-2 pointer-events-none'>
              <HiSelector
                className='w-5 h-5 text-gray-400'
                aria-hidden='true'
              />
            </span>
          </Listbox.Button>
          <Transition
            as={React.Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Listbox.Options className='overflow-auto absolute py-1 mt-1 w-full max-h-60 text-base bg-white rounded-md border border-gray-300 shadow-lg sm:text-sm dark:bg-dark dark:border-gray-600 dark:shadow-none focus:outline-none'>
              {options.map((opt) => (
                <Listbox.Option
                  key={opt.id}
                  className={({ active }) =>
                    clsx(
                      'relative py-2 pr-4 pl-10 select-none',
                      active
                        ? 'dark:bg-primary-300/25 bg-primary-300/10'
                        : 'text-gray-700 dark:text-gray-300'
                    )
                  }
                  value={opt}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={clsx(
                          selected ? 'font-medium' : 'font-normal',
                          'block truncate'
                        )}
                      >
                        {opt.name}
                      </span>
                      {selected ? (
                        <span
                          className={clsx(
                            'flex absolute inset-y-0 left-0 items-center pl-3 text-primary-500 dark:text-primary-300'
                          )}
                        >
                          <HiCheck className='w-5 h-5' aria-hidden='true' />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
