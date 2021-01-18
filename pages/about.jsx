import CustomLink from '../components/CustomLink';
import Seo from '../components/Seo';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import CopyableText from '../components/CopyableText';
import Image from 'next/image';

export default function about() {
    return (
        <>
            <Seo pageTitle='NextJS Tailwind Starter' />
            <div className='flex flex-col min-h-screen'>
                <Nav />
                <section className='py-6 mt-4'>
                    <main className='layout'>
                        <h1 className='mb-4'>
                            About
                            <br />
                            <span className='accent'>Theodorus Clarence</span>
                        </h1>
                        <div className='float-right ml-6'>
                            <Image
                                width={210}
                                height={210}
                                objectFit='cover'
                                objectPosition='30%'
                                src={'/images/me.jpg'}
                                alt={'photo of me'}
                            />
                        </div>
                        <p className='mb-2 prose'>
                            Hello! Thank’s for coming to my personal website / blog. This is my
                            first biggest site that I made with Next.js, Tailwindcss, MDX, and
                            FaunaDB. I also have a{' '}
                            <CustomLink href='https://github.com/theodorusclarence/nextjs-tailwind-starter'>
                                nextjs-tailwind-starter
                            </CustomLink>{' '}
                            as a template to bootstrap your work with my opinionated style.
                        </p>
                        <p className='prose'>
                            If you actually know me you might call me by Ce. I went to Kolese
                            Kanisius Highschool, and currently a Undergraduate Informatics Student
                            in Institut Teknologi Sepuluh Nopember.
                        </p>
                    </main>
                </section>

                <section className='py-6'>
                    <main className='layout'>
                        <h2 className=''>Contact</h2>
                        <p className='prose'>
                            Do contact me if you need my opinion about web development, especially
                            frontend works. I’ll be happy to help! (find my email in the footer)
                        </p>
                    </main>
                </section>

                <section className='py-6'>
                    <main className='layout'>
                        <h2 className=''>Business Inquiries</h2>
                        <p className='prose'>
                            Contact me if you want to build a personal website. If you need a more
                            complex website contact me through{' '}
                            <CopyableText>etzytech@gmail.com</CopyableText> agency.
                        </p>
                    </main>
                </section>
                <Footer />
            </div>
        </>
    );
}
