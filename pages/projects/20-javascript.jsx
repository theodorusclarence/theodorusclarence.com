import { SiGithub } from 'react-icons/si';

import { ogGenerate } from '@/utils/helper';
import useContentMeta from '@/hooks/useContentMeta';

import CustomLink from '@/components/CustomLink';
import UnstyledLink from '@/components/UnstyledLink';
import Footer from '@/components/Footer';
import Seo from '@/components/Seo';
import Nav from '@/components/Nav';
import ResponsiveIframe from '@/components/ResponsiveIframe';
import LikeButton from '@/components/LikeButton';

export default function JavascriptPage({ videos }) {
  // Increment Views and Initialize Like
  useContentMeta('p_20-javascript', {
    runEffect: true,
  });

  const imageOg = ogGenerate('20 Javascript Mini Project', 'Project');

  return (
    <>
      <Seo
        title='20 JavaScript Mini Project – theodorusclarence.com'
        description='An attempt to study Vanilla JavaScript faster.'
        image={imageOg}
      />
      <div className='flex flex-col min-h-screen'>
        <Nav />
        <section className='py-6 mt-4'>
          <main className='space-y-4 layout'>
            <header>
              <h1>20 Javascript Mini Projects</h1>
              <p className='text-dark dark:text-light'>
                An attempt to study Vanilla JavaScript faster, done in a month.
              </p>
            </header>
            <ul className='grid gap-4 md:grid-cols-2'>
              {videos.map((video, index) => (
                <li
                  key={index}
                  className='p-4 space-y-2 rounded-md border-thin'
                >
                  <div className='flex justify-between space-x-2'>
                    <h4>{video[0]}</h4>
                    <CustomLink href={video[2]}>
                      <SiGithub className='w-5 h-5 align-middle text-dark dark:text-light hover:text-accent-200 dark:hover:text-accent-200' />
                    </CustomLink>
                  </div>
                  <ResponsiveIframe ratio={5 / 4} video={video} />
                </li>
              ))}
            </ul>
            <div className='flex items-center justify-center py-8'>
              <LikeButton slug='p_20-javascript' />
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

export async function getStaticProps(context) {
  const videos = [
    [
      '1 - Quote Generator',
      'https://www.youtube.com/embed/KX5ZMPVEdqY',
      'https://github.com/theodorusclarence/quote-generator',
    ],
    [
      '2 - Infinite Scrolling',
      'https://www.youtube.com/embed/hM2PYnzCtgY',
      'https://github.com/theodorusclarence/infinite-scrolling',
    ],
    [
      '3 - Picture In Picture',
      'https://www.youtube.com/embed/q1q8ENcfoaU',
      'https://github.com/theodorusclarence/picture-in-picture',
    ],
    [
      '4 - Joke Teller',
      'https://www.youtube.com/embed/DmrVTIDrQKE',
      'https://github.com/theodorusclarence/joke-teller',
    ],
    [
      '5 - Dark Light Mode',
      'https://www.youtube.com/embed/kxhg8skgnKg',
      'https://github.com/theodorusclarence/dark-light-mode',
    ],
    [
      '6 - Password Validation',
      'https://www.youtube.com/embed/PxB4s3kJ4ms',
      'https://github.com/theodorusclarence/password-validation',
    ],
    [
      '7 - Animated Navigation',
      'https://www.youtube.com/embed/04FpGPtjjgQ',
      'https://github.com/theodorusclarence/animated-navigation',
    ],
    [
      '8 - Music Player',
      'https://www.youtube.com/embed/IQHb-9No_88',
      'https://github.com/theodorusclarence/music-player',
    ],
    [
      '9 - Custom Countdown',
      'https://www.youtube.com/embed/TC6piG0ClNE',
      'https://github.com/theodorusclarence/custom-countdown',
    ],
    [
      '10 - Bookmark App',
      'https://www.youtube.com/embed/6y-tY7TPCs4',
      'https://github.com/theodorusclarence/bookmark-app',
    ],
    [
      '11 - Video Player',
      'https://www.youtube.com/embed/AiAIBpzbOIk',
      'https://github.com/theodorusclarence/video-player',
    ],
    [
      '12 - Form Validation',
      'https://www.youtube.com/embed/vj_B5AFXbdI',
      'https://github.com/theodorusclarence/form-validation',
    ],
    [
      '13 - Rock Paper Scissor',
      'https://www.youtube.com/embed/tfCx_H1uSOY',
      'https://github.com/theodorusclarence/rock-paper-game',
    ],
    [
      '14 - NASA Pictures',
      'https://www.youtube.com/embed/i0rlj4nyl4A',
      'https://github.com/theodorusclarence/nasa-pictures',
    ],
    [
      '15 - Math Sprint Game',
      'https://www.youtube.com/embed/75hbfg1Z5T0',
      'https://github.com/theodorusclarence/math-sprint-game',
    ],
    [
      '16 - Kanban Board',
      'https://www.youtube.com/embed/1aMxuVDGLKM',
      'https://github.com/theodorusclarence/trello-board',
    ],
    [
      '17 - Calculator',
      'https://www.youtube.com/embed/my2nDjAHOm8',
      'https://github.com/theodorusclarence/calculator',
    ],
    [
      '18 - Typing Animation',
      'https://www.youtube.com/embed/OZ-4Xpg2-M0',
      'https://github.com/theodorusclarence/typewriter',
    ],
    [
      '19 - Paint Clone',
      'https://www.youtube.com/embed/lZAlTuZaa5w',
      'https://github.com/theodorusclarence/paint-clone',
    ],
    [
      '20 - Typing Game',
      'https://www.youtube.com/embed/psEMYsbpmtA',
      'https://github.com/theodorusclarence/typing-game',
    ],
  ];
  return {
    props: { videos },
  };
}
