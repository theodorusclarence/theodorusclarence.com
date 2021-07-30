import { useEffect } from 'react';

import { classNames, ogGenerate } from '@/utils/helper';
import useContentMeta from '@/hooks/useContentMeta';

import CustomLink from '@/components/CustomLink';
import UnstyledLink from '@/components/UnstyledLink';
import Footer from '@/components/Footer';
import Seo from '@/components/Seo';
import Nav from '@/components/Nav';
import LikeButton from '@/components/LikeButton';
import CloudinaryImg from '@/components/CloudinaryImg';
import PickTech from '@/components/PickTech';
import HashLink from '@/components/HashLink';

export default function SideProjects() {
  // Increment Views and Initialize Like
  useContentMeta('p_side-projects', {
    runEffect: true,
  });

  useEffect(() => {
    document.documentElement.classList.add('smooth');

    return () => {
      document.documentElement.classList.remove('smooth');
    };
  }, []);

  const imageOg = ogGenerate('Side Projects', 'Project');

  return (
    <>
      <Seo
        title='Side Projects – theodorusclarence.com'
        description='An attempt to study Vanilla JavaScript faster.'
        image={imageOg}
      />
      <div className='flex flex-col min-h-screen'>
        <Nav />
        <section className='py-6 mt-4'>
          <main className='space-y-4 layout'>
            <header>
              <h1>Side Projects</h1>
              <p className='mt-2 text-dark dark:text-light'>
                Simple projects that I build to fix small problems I found
                everyday.
              </p>
            </header>
            {/* content */}
            <article className='!mt-8 divide-y'>
              {sideProjects.map(
                (
                  {
                    id,
                    title,
                    techs,
                    thumb,
                    description,
                    background,
                    live,
                    github,
                  },
                  index
                ) => (
                  <div
                    key={id}
                    className={classNames(
                      'border-gray-300 dark:border-gray-600',
                      index === 0 ? 'md:pb-24 pb-8' : 'md:py-24 py-8'
                    )}
                  >
                    <h2 className='text-xl md:text-3xl scroll-margin' id={id}>
                      <HashLink href={`#${id}`}>{title}</HashLink>
                    </h2>
                    <div className='grid mt-2 md:grid-cols-[1fr,1fr] gap-6 items-start'>
                      <div className='w-full'>
                        <figure className='w-full mt-1 overflow-hidden rounded-sm shadow-md dark:shadow-none dark:border dark:border-gray-600'>
                          <CloudinaryImg
                            publicId={thumb}
                            width='1440'
                            height='792'
                            alt={title}
                          />
                        </figure>
                        <div className='flex items-center mt-3 space-x-2'>
                          <p className='font-medium'>Built with</p>
                          <PickTech customMargin='mt-0' techs={techs} />
                        </div>
                      </div>
                      <div className='w-full'>
                        <h3 className='text-lg md:text-xl '>
                          Project Description
                        </h3>
                        <p className='mt-1'>{description}</p>
                        <h3 className='mt-4 text-lg md:text-xl'>Background</h3>
                        <p className='mt-1'>{background}</p>
                        <div className='flex items-start gap-2 mt-2'>
                          {live && (
                            <CustomLink href={live}>Visit Live</CustomLink>
                          )}

                          {github && (
                            <>
                              •
                              <CustomLink href={github}>
                                Visit Repository
                              </CustomLink>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}
            </article>
            <div className='flex items-center justify-center py-8'>
              <LikeButton slug='p_side-projects' />
            </div>
            <UnstyledLink
              href='/projects'
              className='inline-block rounded-sm view ring-vis'
            >
              ← Back to projects
            </UnstyledLink>
          </main>
        </section>
        <Footer />
      </div>
    </>
  );
}

const sideProjects = [
  {
    id: 'clarence-link',
    title: 'clarence.link',
    techs: ['nextjs', 'notion'],
    thumb: 'theodorusclarence/projects/side-projects/clarence-link_z4lham',
    description:
      'A link shortener that I use to organize my links, and make sharing links easier and much cooler.',
    background:
      'Getting tired of remembering all drive, zoom links. Wanted a cooler way to share link with others.',
    live: 'https://clarence.link',
  },
  {
    id: 'wa-helper',
    title: 'WhatsApp Helper',
    techs: ['nextjs'],
    thumb: 'theodorusclarence/projects/side-projects/whatsapp-helper_uqrys3',
    description:
      'A WhatsApp helper to directly chat without saving number to your contacts, also clean the number. Ex: 085-123-4532 will still works.',
    background:
      'My phone is full with contacts that I only need to chat once like customer service, etc.',
    live: 'https://wa.theodorusclarence.com',
    github: 'https://github.com/theodorusclarence/wa-helper',
  },
  {
    id: 'nrp-finder',
    title: 'Enigmatics Finder',
    techs: ['nextjs'],
    thumb: 'theodorusclarence/projects/side-projects/enigmatics-finder_zqnmar',
    description:
      'A site to find university student number batch 19, provided with copy button for a better UX.',
    background:
      "I keep forgetting my friend's student number when submitting group assignment.",
    live: 'https://nrp.theodorusclarence.com',
    github: 'https://github.com/theodorusclarence/nrp-finder-informatics19',
  },
  {
    id: 'cloudinary-helper',
    title: 'Cloudinary Helper',
    techs: ['nextjs'],
    thumb: 'theodorusclarence/projects/side-projects/cloudinary-helper_qbit2j',
    description:
      'Helper to show my images that I host with Cloudinary, and provide copy button, mdx code that I usually use to make blogs.',
    background:
      'It is really tedious to check the public_id each time I want to add it into my blog or library.',
    live: 'https://cloudinary.clarence.link/',
  },
];
