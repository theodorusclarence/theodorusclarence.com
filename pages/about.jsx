import Image from 'next/image';
import { NextSeo } from 'next-seo';
import CustomLink from '@/components/CustomLink';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import CopyableText from '@/components/CopyableText';
import { motion } from 'framer-motion';
import { fadeInAndUp, staggerFaster } from '@/utils/FramerAnimation';

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
            <Nav />

            {/* //* About */}
            <motion.div
                initial='initial'
                animate='animate'
                variants={staggerFaster}
                className='flex flex-col min-h-screen'
            >
                <section className='py-10'>
                    <main className='layout'>
                        <motion.h1 variants={fadeInAndUp}>About</motion.h1>
                        <motion.h1 variants={fadeInAndUp} className='mb-4'>
                            <span className='accent'>Theodorus Clarence</span>
                        </motion.h1>
                        <motion.div
                            variants={fadeInAndUp}
                            className='float-right ml-6 '
                        >
                            <Image
                                className='bg-gray-700'
                                width={210}
                                height={210}
                                objectFit='cover'
                                objectPosition='30%'
                                src={'/images/me.jpg'}
                                alt={'photo of me'}
                            />
                        </motion.div>
                        <motion.p
                            variants={fadeInAndUp}
                            className='mb-2 prose dark:text-light'
                        >
                            Hello! Thanks for coming to my personal website /
                            blog. This is my first biggest site that I made with
                            Next.js, Tailwindcss, MDX, and FaunaDB. I also have
                            a{' '}
                            <CustomLink href='https://github.com/theodorusclarence/nextjs-tailwind-starter'>
                                nextjs-tailwind-starter
                            </CustomLink>{' '}
                            as a template to bootstrap your work with my
                            opinionated style.
                        </motion.p>
                        <motion.p
                            variants={fadeInAndUp}
                            className='prose dark:text-light'
                        >
                            If you actually know me you might call me by Ce. I
                            went to Kolese Kanisius Highschool, and currently an
                            Undergraduate Informatics Student in Institut
                            Teknologi Sepuluh Nopember.
                        </motion.p>
                    </main>
                </section>

                {/* //* Contacts */}
                <section className='py-10'>
                    <main className='layout'>
                        <motion.h2 variants={fadeInAndUp} className=''>
                            Contact
                        </motion.h2>
                        <motion.p
                            variants={fadeInAndUp}
                            className='prose dark:text-light'
                        >
                            Do contact me if you need my opinion about web
                            development, especially frontend works. I’ll be
                            happy to help! (find my email in the footer)
                        </motion.p>
                    </main>
                </section>

                {/* //* Business Inquiries */}
                <section className='pt-10 pb-16'>
                    <main className='layout'>
                        <motion.h2 variants={fadeInAndUp} className=''>
                            Business Inquiries
                        </motion.h2>
                        <motion.p
                            variants={fadeInAndUp}
                            className='prose dark:text-light'
                        >
                            Contact me if you want to build a personal website.
                            If you need a more complex website contact me
                            through{' '}
                            <CopyableText>etzytech@gmail.com</CopyableText>{' '}
                            agency.
                        </motion.p>
                    </main>
                </section>
                <Footer />
            </motion.div>
        </>
    );
}
