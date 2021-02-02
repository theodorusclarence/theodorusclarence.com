import Image from 'next/image';
import { NextSeo } from 'next-seo';
import CustomLink from '@/components/CustomLink';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import CopyableText from '@/components/CopyableText';

const url = 'https://theodorusclarence.com/about';
const title = 'About – theodorusclarence.com';
const description = 'Know more about me.';

export default function About() {
    return (
        <>
            <NextSeo
                title={title}
                description={description}
                canonical={url}
                openGraph={{
                    url,
                    title,
                    description,
                }}
            />
            <div className='flex flex-col min-h-screen'>
                <Nav />
                <section className='flex flex-col justify-center min-h-screen pb-6 -mt-16'>
                    <main className='layout'>
                        <h1 className='mb-4'>
                            About
                            <br />
                            <span className='accent'>Theodorus Clarence</span>
                        </h1>
                        <div className='float-right ml-6 '>
                            <Image
                                className='bg-gray-700'
                                width={210}
                                height={210}
                                objectFit='cover'
                                objectPosition='30%'
                                src={'/images/me.jpg'}
                                alt={'photo of me'}
                            />
                        </div>
                        <p className='mb-2 prose dark:text-light'>
                            Hello! Thanks for coming to my personal website /
                            blog. This is my first biggest site that I made with
                            Next.js, Tailwindcss, MDX, and FaunaDB. I also have
                            a{' '}
                            <CustomLink href='https://github.com/theodorusclarence/nextjs-tailwind-starter'>
                                nextjs-tailwind-starter
                            </CustomLink>{' '}
                            as a template to bootstrap your work with my
                            opinionated style.
                        </p>
                        <p className='prose dark:text-light'>
                            If you actually know me you might call me by Ce. I
                            went to Kolese Kanisius Highschool, and currently an
                            Undergraduate Informatics Student in Institut
                            Teknologi Sepuluh Nopember.
                        </p>
                    </main>
                </section>

                <section className='py-6'>
                    <main className='layout'>
                        <h2 className=''>Contact</h2>
                        <p className='prose dark:text-light'>
                            Do contact me if you need my opinion about web
                            development, especially frontend works. I’ll be
                            happy to help! (find my email in the footer)
                        </p>
                    </main>
                </section>

                <section className='pt-6 pb-16'>
                    <main className='layout'>
                        <h2 className=''>Business Inquiries</h2>
                        <p className='prose dark:text-light'>
                            Contact me if you want to build a personal website.
                            If you need a more complex website contact me
                            through{' '}
                            <CopyableText>etzytech@gmail.com</CopyableText>{' '}
                            agency.
                        </p>
                    </main>
                </section>
                <Footer />
            </div>
        </>
    );
}
