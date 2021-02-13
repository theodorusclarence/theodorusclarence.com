import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { NextSeo } from 'next-seo';
import readingTime from 'reading-time';
import { AnimatePresence, motion } from 'framer-motion';

import Nav from '@/components/Nav';
import CustomLink from '@/components/CustomLink';
import TechStack from '@/components/TechStack';
import ProjectCard from '@/components/ProjectCard';
import PostCard from '@/components/PostCard';
import Button from '@/components/Button';
import Footer from '@/components/Footer';

import { projects } from '@/data/projects';
import { featured, featuredProj } from '@/data/featured';
import { BLOGS_PATH, postFilePaths } from '@/utils/mdxUtils';
import { fadeInAndUp, stagger, staggerFaster } from '@/utils/FramerAnimation';
import InViewSection from '@/components/InViewSection';

const title = 'Home – theodorusclarence.com';

export default function Home({ featuredPosts, featuredProjects }) {
    console.log(`██   ██ ███████ ██      ██       ██████      ██████  ███████ ██    ██ ███████ ██       ██████  ██████  ███████ ██████  ██ 
██   ██ ██      ██      ██      ██    ██     ██   ██ ██      ██    ██ ██      ██      ██    ██ ██   ██ ██      ██   ██ ██ 
███████ █████   ██      ██      ██    ██     ██   ██ █████   ██    ██ █████   ██      ██    ██ ██████  █████   ██████  ██ 
██   ██ ██      ██      ██      ██    ██     ██   ██ ██       ██  ██  ██      ██      ██    ██ ██      ██      ██   ██    
██   ██ ███████ ███████ ███████  ██████      ██████  ███████   ████   ███████ ███████  ██████  ██      ███████ ██   ██ ██ `);
    console.log(
        'Welcome to my page! Also feel free to contact me via email at theodorusclarence@gmail.com 🙌'
    );
    return (
        <>
            <NextSeo title={title} />
            <Nav />

            <motion.div className='flex flex-col min-h-screen'>
                {/* //* Home and Tech Stack */}
                <motion.div
                    className='flex flex-col justify-center min-h-screen'
                    initial='initial'
                    animate='animate'
                    variants={stagger}
                >
                    <section className='pb-6 -mt-24'>
                        <main className='layout'>
                            <motion.h2
                                variants={fadeInAndUp}
                                className='md:mb-2'
                            >
                                Hi!
                            </motion.h2>
                            <motion.h1 variants={fadeInAndUp} className='mb-2'>
                                You can call me{' '}
                                <span className='accent'>Clarence</span>
                            </motion.h1>
                            <motion.p
                                variants={fadeInAndUp}
                                className='prose dark:text-light'
                            >
                                I'm a fast learner and hardworking Informatics
                                Student at Institut Teknologi Sepuluh Nopember.
                                I'm currently really interested in Frontend
                                Development.{' '}
                                <CustomLink href='/about'>
                                    Reach me out
                                </CustomLink>{' '}
                                to talk more about frontend works!
                            </motion.p>
                        </main>
                    </section>
                    <section className='py-6'>
                        <main className='layout'>
                            <motion.h2 className='mb-2' variants={fadeInAndUp}>
                                Current Favorite Tech Stack
                            </motion.h2>
                            <TechStack />
                        </main>
                    </section>
                </motion.div>

                {/* //* Featured Projects */}
                {/* padding top smaller to reduce gap */}
                <InViewSection className='pt-2 pb-16'>
                    <motion.main
                        className='layout'
                        // variants={staggerFaster}
                    >
                        <motion.h2
                            // variants={fadeInAndUp}
                            className='mb-4'
                        >
                            Featured Projects
                        </motion.h2>
                        {/* <div className='flex flex-col justify-between mb-4 space-y-4 md:space-y-0 md:flex-row'> */}
                        <motion.div
                            // variants={fadeInAndUp}
                            className='grid gap-4 mb-4 md:grid-cols-2'
                        >
                            {featuredProjects.map((project, index) => (
                                <ProjectCard key={index} data={project} />
                            ))}
                        </motion.div>
                        <Button href='/projects'>See More</Button>
                    </motion.main>
                </InViewSection>

                {/* //* Featured Posts */}
                <InViewSection className='py-16'>
                    <main className='layout'>
                        <h2>Featured Posts</h2>
                        <p className='mb-4 component'>
                            Kindly{' '}
                            <CustomLink href='https://buttondown.email/theodorusclarence'>
                                subscribe to my newsletter
                            </CustomLink>{' '}
                            if you want an update everytime I post.
                        </p>
                        <AnimatePresence>
                            <ul className='mb-4 space-y-4'>
                                {featuredPosts.map((post) => (
                                    <PostCard
                                        key={post.filePath}
                                        index
                                        post={post}
                                    />
                                ))}
                            </ul>
                        </AnimatePresence>
                        <Button href='/blog'>See More</Button>
                    </main>
                </InViewSection>

                {/* //* Code Library */}
                <InViewSection className='py-16'>
                    <main className='layout'>
                        <h2 className=''>Check out my code library</h2>
                        <p className='mb-4 component'>
                            List of code snippets that I store for easy access.
                        </p>
                        <Button href='/library'>Go to Code Library</Button>
                    </main>
                </InViewSection>
                <Footer />
            </motion.div>
        </>
    );
}

export function getStaticProps() {
    const featuredPosts = postFilePaths
        .filter((filePath) => {
            const slugPath = filePath.replace(/\.mdx?$/, '');
            return featured.find((feature) => feature === slugPath);
        })
        .map((filePath) => {
            const source = fs.readFileSync(path.join(BLOGS_PATH, filePath));
            const { content, data } = matter(source);
            const slug = filePath.replace(/\.mdx?$/, '');

            return {
                content,
                data,
                filePath,
                slug,
                readingTime: readingTime(content).text,
            };
        });

    const featuredProjects = projects.filter((project) =>
        featuredProj.find((pr) => pr === project.id)
    );

    return { props: { featuredPosts, featuredProjects } };
}
