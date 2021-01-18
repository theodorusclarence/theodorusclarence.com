import Link from 'next/link';

export default function PostCard() {
    return (
        <Link href='/blog/first-blog'>
            <a
                className='block w-full p-5 transition-shadow duration-100 rounded-md active:shadow-none hover:shadow-md border-thin'
            >
                <header className='flex justify-between'>
                    <h4>Journey of Learning Frontend Development</h4>
                    <p className='self-center flex-shrink-0 component text-dark'>100 views</p>
                </header>
                <p className='component text-dark'>January 18, 2021</p>
                <p className='component'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium minus quos,
                    fugiat odit voluptatum esse incidunt sed quasi assumenda tempore.
                </p>
            </a>
        </Link>
    );
}
