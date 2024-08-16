'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import GitHubCalendar from 'react-github-calendar';

import EmptyState from './shared/EmptyState';
import YearButton from './shared/YearButton';

const github: any = {
  light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
  dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
};

/*
  This function generates an array of years from the iniital year a user joins GitHub to the current year.
  if joinYear = 2020, result = [2020, 2021, 2022, 2023, 2024] 
*/

function getGitHubYears(joinYear: number | undefined): number[] {
  if (!joinYear) return [];

  const currentYear = new Date().getFullYear();
  const duration = currentYear - joinYear + 1;
  const years = Array.from({ length: duration }, (_year, i) => currentYear - i);
  return years;
}

export default function ContributionGraph() {
  const [calendarYear, setCalendarYear] = useState<number | undefined>(
    undefined
  );
  const { theme, systemTheme } = useTheme();
  const [serverTheme, setServerTheme] = useState<'light' | 'dark' | undefined>(
    undefined
  );
  const scheme = theme === 'light' ? 'light' : 'dark';
  // theme === "dark" ? "dark" : systemTheme;

  // Set theme only after rendering to avoid mismatch between client and server
  // https://github.com/vercel/next.js/issues/10608#issuecomment-589073831
  useEffect(() => {
    setServerTheme(scheme);
  }, [scheme]);

  const today = new Date().getFullYear();
  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME;
  const joinYear = Number(process.env.NEXT_PUBLIC_GITHUB_JOIN_YEAR);
  const years = getGitHubYears(joinYear);

  if (!username || !joinYear)
    return (
      <EmptyState
        title='Unable to load Contribution Graph'
        message='We could not find any GitHub credentials added to the .env file. To display the graph, provide your username and the year you joined GitHub'
      />
    );

  return (
    <div className='flex xl:flex-row flex-col gap-4'>
      <div className='dark:bg-primary-bg bg-secondary-bg border dark:border-zinc-800 border-zinc-200 p-8 rounded-lg max-w-fit max-h-fit'>
        <GitHubCalendar
          username={username}
          theme={github}
          colorScheme={serverTheme || systemTheme}
          blockSize={13}
          year={calendarYear}
        />
      </div>
      <div className='flex justify-start xl:flex-col flex-row flex-wrap gap-2'>
        {/* Display only the last five years */}
        {years.slice(0, 5).map((year) => (
          <YearButton
            key={year}
            year={year}
            currentYear={calendarYear ?? today}
            onClick={() =>
              setCalendarYear(year === calendarYear ? undefined : year)
            }
          />
        ))}
      </div>
    </div>
  );
}
