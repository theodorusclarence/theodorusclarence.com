import { projects } from '@/data/projects';
import { classNames } from '@/utils/helper';
import useLoadingWithPreload from '@/hooks/useLoadingWithPreload';

import Seo from '@/components/Seo';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ProjectCard from '@/components/ProjectCard';

export default function ProjectsPage() {
  const { isLoaded } = useLoadingWithPreload();

  return (
    <>
      <Seo
        title='Projects – theodorusclarence.com'
        description='Showcase of my works on frontend development.'
      />
      <Nav />
      <main
        className={classNames('py-6 mt-4', isLoaded && 'animate-fade-in-start')}
      >
        <article className='space-y-2 layout'>
          <header className='mb-8 space-y-2'>
            <h1 className='animate-fade-in-initial fade-in-1'>
              <span className='accent no-under'>My Projects</span>
            </h1>
            <p className='prose dark:text-light animate-fade-in-initial fade-in-2'>
              Some projects that I have made.
            </p>
          </header>
          <ul className='grid gap-4 md:grid-cols-2 animate-fade-in-initial fade-in-3'>
            {projects.map((project, index) => (
              <ProjectCard key={index} data={project} />
            ))}
          </ul>
        </article>
      </main>
      <Footer />
    </>
  );
}
