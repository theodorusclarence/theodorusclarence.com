import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { HiCheck, HiSelector } from 'react-icons/hi';
import { classNames } from '@/utils/helper';

export default function SortListbox({ selected, setSelected, options }) {
  return (
    <div className='max-w-[200px] w-full'>
      <Listbox value={selected} onChange={setSelected}>
        <div className='relative'>
          <Listbox.Button className='w-full py-2 pl-3 pr-10 font-medium text-left bg-white rounded-md dark:bg-dark focus:outline-none ring-vis-0 border-thin sm:text-sm'>
            <span className='block truncate'>{selected.name}</span>
            <span className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
              <HiSelector
                className='w-5 h-5 text-gray-400'
                aria-hidden='true'
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Listbox.Options className='absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg dark:shadow-none border-thin dark:bg-dark max-h-60 focus:outline-none sm:text-sm'>
              {options.map((opt) => (
                <Listbox.Option
                  key={opt.id}
                  className={({ active }) =>
                    classNames(
                      'select-none relative py-2 pl-10 pr-4',
                      active
                        ? 'dark:bg-accent-200/25 bg-accent-400/10'
                        : 'text-gray-700 dark:text-gray-300'
                    )
                  }
                  value={opt}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`${
                          selected ? 'font-medium' : 'font-normal'
                        } block truncate`}
                      >
                        {opt.name}
                      </span>
                      {selected ? (
                        <span
                          className={classNames(
                            'absolute inset-y-0 left-0 flex items-center pl-3 text-accent-400 dark:text-accent-200'
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
