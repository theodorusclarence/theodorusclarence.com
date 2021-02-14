import { NextSeo } from 'next-seo';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ProjectCard from '@/components/ProjectCard';
import { projects } from '@/data/projects';
import { motion } from 'framer-motion';
import { fadeInAndUp, staggerFaster } from '@/utils/FramerAnimation';

const url = 'https://theodorusclarence.com/projects';
const title = 'Projects – theodorusclarence.com';
const description = 'Showcase of my works on frontend development.';

export default function ProjectsPage() {
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
            <motion.main
                initial='initial'
                animate='animate'
                className='py-6 mt-4'
            >
                <motion.article
                    variants={staggerFaster}
                    className='space-y-2 layout'
                >
                    <header className='mb-8 space-y-2'>
                        <motion.h1 variants={fadeInAndUp} className=''>
                            My Projects
                        </motion.h1>
                        <motion.p
                            variants={fadeInAndUp}
                            className='prose dark:text-light'
                        >
                            Some projects that I have made.
                        </motion.p>
                    </header>
                    <motion.ul
                        variants={fadeInAndUp}
                        className='grid gap-4 md:grid-cols-2'
                    >
                        {projects.map((project, index) => (
                            <ProjectCard key={index} data={project} />
                        ))}
                    </motion.ul>
                </motion.article>
            </motion.main>
            <Footer />
        </>
    );
}
