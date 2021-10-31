import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from 'next-themes';

const links = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
  { href: '/library', label: 'Library' },
  { href: '/about', label: 'About' },
];

export default function Nav() {
  const [onTop, setOnTop] = useState(true);
  // sets class dark to html
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const { route } = router;

  /** Ex: /projects/petrolida-2021 -> ['', 'projects', 'petrolida-2021'] */
  const arrOfRoute = route.split('/');
  const baseRoute = '/' + arrOfRoute[1];

  const handleScroll = () => {
    if (onTop !== (window.pageYOffset === 0)) {
      setOnTop(window.pageYOffset === 0);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  return (
    <header
      className={`${
        onTop ? '' : 'shadow-sm'
      } transition-shadow sticky top-0 z-50`}
    >
      <div className='h-2 bg-gradient-to-tr from-accent-100 via-accent-200 to-accent-300'></div>
      <nav className='transition-colors bg-white dark:bg-dark'>
        <ul className='flex items-center justify-between py-4 layout'>
          <ul className='flex items-center justify-between space-x-3 text-xs md:space-x-4 md:text-base'>
            {links.map(({ href, label }) => (
              <li key={`${href}${label}`}>
                <Link href={href}>
                  <a className='py-2 font-medium text-black rounded-sm dark:text-white ring-vis hover:text-accent-200 dark:hover:text-accent-200'>
                    <span className={`${href === baseRoute && 'accent'}`}>
                      {label}
                    </span>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
          <button
            className='p-2.5 focus:outline-none rounded-md border-thin hover:border-accent-200 dark:hover:border-accent-200 hover:text-accent-200 dark:hover:text-accent-200 focus:border-accent-200 dark:focus:border-accent-200 focus:text-accent-200 dark:focus:text-accent-200'
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'light' ? <FiMoon size={20} /> : <FiSun size={20} />}
          </button>
        </ul>
      </nav>
    </header>
  );
}
