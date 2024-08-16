import { MouseEventHandler } from 'react';

export default function YearButton({
  year,
  currentYear,
  onClick,
}: {
  year: number;
  currentYear: number | undefined;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg text-center px-4 py-2 border border-transparent dark:hover:border-zinc-700 hover:border-zinc-200 duration-100 text-sm font-medium ${
        year === currentYear
          ? 'bg-secondary-color bg-primary-300 dark:hover:border-transparent dark:text-black text-zinc-50 hover:border-transparent dark:bg-primary-300'
          : 'text-zinc-900 dark:text-zinc-50'
      }`}
      title={`View Graph for the year ${year}`}
    >
      {year}
    </button>
  );
}
