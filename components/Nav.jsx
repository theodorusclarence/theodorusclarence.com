import Link from 'next/link';
import { useEffect, useState } from 'react';

const links = [
    { href: '/', label: 'Home' },
    { href: '/blog', label: 'Blog' },
    { href: '/projects', label: 'Projects' },
    { href: '/about', label: 'About' },
];

export default function Nav() {
    const [onTop, setOnTop] = useState(true);

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
        <header className={`${onTop ? '' : 'shadow-sm'} transition-shadow sticky top-0 z-10`}>
            <div className='h-2 bg-gradient-to-tr from-accent-100 via-accent-200 to-accent-300'></div>
            <nav className='bg-white'>
                <ul className='flex items-center justify-between max-w-4xl p-4 px-4 mx-auto'>
                    <ul className='flex items-center justify-between space-x-4'>
                        {links.map(({ href, label }) => (
                            <li key={`${href}${label}`}>
                                <Link href={href}>
                                    <a className='text-black hover:text-green-400'>{label}</a>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <button>a</button>
                </ul>
            </nav>
        </header>
    );
}
