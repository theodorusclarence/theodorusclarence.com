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
            <motion.main
                initial='initial'
                animate='animate'
                variants={staggerFaster}
                className='flex flex-col min-h-screen'
            >
                <section className='py-10'>
                    <article className='layout'>
                        <motion.h1 variants={fadeInAndUp}>About</motion.h1>
                        <motion.h1 variants={fadeInAndUp} className='mb-4'>
                            <span className='accent'>Theodorus Clarence</span>
                        </motion.h1>
                        <motion.figure
                            variants={fadeInAndUp}
                            className='float-right ml-6 w-36 md:w-52'
                        >
                            <Image
                                className='bg-gray-700'
                                width={210}
                                height={210}
                                layout='responsive'
                                objectFit='cover'
                                objectPosition='30%'
                                src={'/images/me.jpg'}
                                alt={'photo of me'}
                            />
                        </motion.figure>
                        <motion.p
                            variants={fadeInAndUp}
                            className='mb-4 prose dark:text-light'
                        >
                            Hello! I'm Clarence. I started learning web
                            development in May 2020, which is the start of the
                            pandemic. I have nothing much to do so I decided to
                            learn web development from a udemy course, then
                            started watching a bunch of{' '}
                            <CustomLink href='/blog/youtube-list'>
                                youtube videos
                            </CustomLink>{' '}
                            to explore more about web development especially
                            frontend development.
                        </motion.p>
                        <motion.p
                            variants={fadeInAndUp}
                            className='mb-4 prose dark:text-light'
                        >
                            There are a lot of things and technologies to learn
                            in frontend development and I am motivated to learn
                            as much as possible. I enjoy learning something new
                            and getting feedback to make myself better and
                            improve.
                        </motion.p>
                        <motion.p
                            variants={fadeInAndUp}
                            className='prose dark:text-light'
                        >
                            In this website I will be writing some blogs and
                            showcase my projects. I believe that writing what I
                            have learned is the best way to remember things, and
                            I can share my knowledge along the way. So do
                            contact me and I will be very happy to help!
                        </motion.p>
                    </article>
                </section>

                {/* //* Contacts */}
                <section className='py-10'>
                    <article className='layout'>
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
                    </article>
                </section>

                {/* //* Business Inquiries */}
                <section className='pt-10 pb-16'>
                    <article className='layout'>
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
                    </article>
                </section>
                <Footer />
            </motion.main>
        </>
    );
}
