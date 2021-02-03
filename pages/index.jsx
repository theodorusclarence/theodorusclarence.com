import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { NextSeo } from 'next-seo';
import readingTime from 'reading-time';

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

const title = 'Home – theodorusclarence.com';

export default function Home({ featuredPosts, featuredProjects }) {
    return (
        <>
            <NextSeo title={title} />
            <Nav />

            <div className='flex flex-col min-h-screen'>
                {/* //* Home and Tech Stack */}
                <div className='flex flex-col justify-center min-h-screen'>
                    <section className='pb-6 -mt-24'>
                        <main className='layout'>
                            <h2 className='md:mb-2'>Hi!</h2>
                            <h1 className='mb-2'>
                                You can call me{' '}
                                <span className='accent'>Clarence</span>
                            </h1>
                            <p className='prose dark:text-light'>
                                I'm a fast learner and hardworking Informatics
                                Student at Institut Teknologi Sepuluh Nopember.
                                I'm currently really interested in Frontend
                                Development.{' '}
                                <CustomLink href='/about'>
                                    Reach me out
                                </CustomLink>{' '}
                                to talk more about frontend works!
                            </p>
                        </main>
                    </section>
                    <section className='py-6'>
                        <main className='layout'>
                            <h2 className='mb-2'>
                                Current Favorite Tech Stack
                            </h2>
                            <TechStack />
                        </main>
                    </section>
                </div>

                {/* //* Featured Projects */}
                {/* padding top smaller to reduce gap */}
                <section className='pt-2 pb-16'>
                    <main className='layout'>
                        <h2 className='mb-4'>Featured Projects</h2>
                        {/* <div className='flex flex-col justify-between mb-4 space-y-4 md:space-y-0 md:flex-row'> */}
                        <div className='grid gap-4 mb-4 md:grid-cols-2'>
                            {featuredProjects.map((project, index) => (
                                <ProjectCard key={index} data={project} />
                            ))}
                        </div>
                        <Button href='/projects'>See More</Button>
                    </main>
                </section>

                {/* //* Featured Posts */}
                <section className='py-16'>
                    <main className='layout'>
                        <h2>Featured Posts</h2>
                        <p className='mb-4 component'>
                            Kindly{' '}
                            <CustomLink href='https://buttondown.email/theodorusclarence'>
                                subscribe to my newsletter
                            </CustomLink>{' '}
                            if you want an update everytime I post.
                        </p>
                        <div className='mb-4 space-y-4'>
                            {featuredPosts.map((post) => (
                                <PostCard key={post.filePath} post={post} />
                            ))}
                        </div>
                        <Button href='/blog'>See More</Button>
                    </main>
                </section>

                {/* //* Code Library */}
                <section className='py-16'>
                    <main className='layout'>
                        <h2 className=''>Check out my code library</h2>
                        <p className='mb-4 component'>
                            List of code snippets that I store for easy access.
                        </p>
                        <Button href='/library'>Go to Code Library</Button>
                    </main>
                </section>
                <Footer />
            </div>
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
