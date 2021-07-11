import Nav from './Nav';
import ProjectHeader from './ProjectHeader';
import UnstyledLink from './UnstyledLink';
import Footer from './Footer';
import useContentMeta from '@/hooks/useContentMeta';
import LikeButton from './LikeButton';

export default function ProjectLayout({ data, children }) {
  // Increment Views and Initialize Like
  useContentMeta(`p_${data.id}`, {
    runEffect: true,
  });

  return (
    <main className='flex flex-col min-h-screen project-wrapper'>
      <Nav />
      <section className='py-6 mt-4'>
        <article className='layout'>
          <ProjectHeader data={data} />
        </article>
      </section>

      <section className='py-6 mt-4'>
        <article className='space-y-4 prose dark:prose-dark layout'>
          {children}

          <div className='flex items-center justify-center py-8'>
            <LikeButton slug={`p_${data.id}`} />
          </div>

          <UnstyledLink
            href='/projects'
            className='inline-block mt-4 rounded-sm view ring-vis'
          >
            ← Back to projects
          </UnstyledLink>

          <style global jsx>{`
            .project-wrapper blockquote h2 {
              font-style: normal;
              margin-bottom: 0.5em;
            }
          `}</style>
        </article>
      </section>
      <Footer />
    </main>
  );
}
