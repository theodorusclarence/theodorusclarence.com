import UnstyledLink from '@/components/UnstyledLink';
import { NextSeo } from 'next-seo';
import { ReactFlashlight } from 'react-flashlight';

export default function Custom404() {
    const title = '404 Not Found - theodorusclarence.com';
    return (
        <div style={{ cursor: 'url("/images/cursor.png"), pointer' }}>
            <NextSeo title={title} />
            <ReactFlashlight darkness={0.8} size={200} showCursor={true}>
                <div className='flex flex-col items-center justify-center min-h-screen'>
                    <h1>Uh Oh! You lost?</h1>
                    <UnstyledLink
                        href='/'
                        className='p-8 mt-8 text-3xl font-bold hover:text-accent-300'
                    >
                        Back To Home
                    </UnstyledLink>
                </div>
            </ReactFlashlight>
        </div>
    );
}
