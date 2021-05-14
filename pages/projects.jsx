import { motion } from 'framer-motion';

import { projects } from '@/data/projects';
import { fadeInAndUp, staggerFaster } from '@/utils/FramerAnimation';

import Seo from '@/components/Seo';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ProjectCard from '@/components/ProjectCard';

export default function ProjectsPage() {
  return (
    <>
      <Seo
        title='Projects – theodorusclarence.com'
        description='Showcase of my works on frontend development.'
      />
      <Nav />
      <motion.main initial='initial' animate='animate' className='py-6 mt-4'>
        <motion.article variants={staggerFaster} className='space-y-2 layout'>
          <header className='mb-8 space-y-2'>
            <motion.h1 variants={fadeInAndUp} className=''>
              <span className='accent'>My Projects</span>
            </motion.h1>
            <motion.p variants={fadeInAndUp} className='prose dark:text-light'>
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
