import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import * as React from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';

import UnstyledLink from '@/components/links/UnstyledLink';

type HeaderProps = {
  large?: boolean;
};

export default function Header({ large = false }: HeaderProps) {
  const { theme, setTheme } = useTheme();

  //#region  //*=========== Route Functionality ===========
  const router = useRouter();
  /** Ex: /projects/petrolida-2021 -> ['', 'projects', 'petrolida-2021'] */
  const arrOfRoute = router.route.split('/');
  const baseRoute = '/' + arrOfRoute[1];
  //#endregion  //*======== Route Functionality ===========

  //#region  //*=========== Scroll Shadow ===========
  const [onTop, setOnTop] = React.useState(true);
  React.useEffect(() => {
    const handleScroll = () => {
      setOnTop(window.pageYOffset === 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  //#endregion  //*======== Scroll Shadow ===========

  return (
    <header
      className={clsx(
        'transition-shadow sticky top-0 z-50',
        !onTop && 'shadow-sm'
      )}
    >
      {/* Gradient List */}
      <div className='h-2 bg-gradient-to-tr from-primary-200 via-primary-300 to-primary-400' />

      <div className='transition-colors bg-white dark:bg-dark dark:text-white'>
        <nav
          className={clsx(
            'flex items-center justify-between py-4 layout',
            large && 'lg:max-w-[68rem]'
          )}
        >
          <ul className='flex items-center justify-between space-x-3 text-xs md:space-x-4 md:text-base'>
            {links.map(({ href, label }) => (
              <li key={`${href}${label}`}>
                <UnstyledLink
                  href={href}
                  className={clsx(
                    'py-2 rounded-sm transition-colors',
                    'font-medium text-black dark:text-white',
                    'dark:hover:text-primary-300 group'
                  )}
                >
                  <span
                    className={clsx(
                      'transition-colors',
                      'bg-primary-300/0 group-hover:bg-primary-300/20 dark:group-hover:bg-primary-300/0',
                      href === baseRoute &&
                        'bg-primary-300/50 dark:text-transparent dark:bg-gradient-to-tr dark:from-primary-300 dark:to-primary-400 dark:bg-clip-text'
                    )}
                  >
                    {label}
                  </span>
                </UnstyledLink>
              </li>
            ))}
          </ul>
          <button
            className={clsx(
              'p-2.5 focus:outline-none rounded-md',
              'border dark:border-gray-600',
              'hover:border-primary-300 dark:hover:border-primary-300 hover:text-primary-300 dark:hover:text-primary-300',
              'focus-visible:border-primary-300 dark:focus-visible:border-primary-300 focus-visible:text-primary-300 dark:focus-visible:text-primary-300'
            )}
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'light' ? <FiMoon size={20} /> : <FiSun size={20} />}
          </button>
        </nav>
      </div>
    </header>
  );
}

const links = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
  { href: '/library', label: 'Library' },
  { href: '/about', label: 'About' },
];
