import CloudinaryImg from '@/components/CloudinaryImg';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import { NextSeo } from 'next-seo';
import Image from 'next/image';
import { useState } from 'react';

export default function TransferPage() {
    const title = 'Rekening Clarence - theodorusclarence.com';
    const description =
        'Buka untuk melihat QR Code dan Nomor Rekening Clarence';
    const url = 'https://theodorusclarence.com/trf';

    const [copyStatus, setCopyStatus] = useState('Copy Nomor Rekening');

    const clickToCopy = (e) => {
        e.preventDefault();
        navigator.clipboard.writeText('7630055037');
        setCopyStatus('Copied to clipboard 🥳');
        setTimeout(() => setCopyStatus('Copy Nomor Rekening'), 1500);
    };

    return (
        <>
            <NextSeo
                title={title}
                description={description}
                canonical={url}
                noindex={true}
                openGraph={{
                    url,
                    title,
                    description,
                }}
            />
            <div className='min-h-screen'>
                <Nav />
                <section className='py-6 mt-4'>
                    <article className='text-center layout'>
                        <h1>Rekening BCA</h1>
                        <p className='mt-2'>Atas Nama Clarence</p>
                        <figure className='max-w-sm mx-auto mt-4 overflow-hidden bg-gray-500 rounded shadow-sm dark:shadow-none'>
                            <CloudinaryImg
                                publicId='theodorusclarence/qr-bca_rcbkew.jpg'
                                width={992}
                                height={886}
                                altImg='QR BCA'
                            />
                        </figure>
                        <div className='flex flex-col items-center mt-8 space-y-4'>
                            <code className='px-4 py-2 font-bold'>
                                <span className='accent'>7630055037</span>
                            </code>
                            <button
                                onClick={clickToCopy}
                                className='block px-4 py-2 font-medium rounded-md ring-vis-0 btn border-thin'
                            >
                                {copyStatus}
                            </button>
                        </div>
                    </article>
                </section>
                <Footer />
            </div>
        </>
    );
}
