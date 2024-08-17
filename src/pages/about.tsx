import clsx from 'clsx';
// import path from 'path';
import * as React from 'react';

import useLoaded from '@/hooks/useLoaded';

import Accent from '@/components/Accent';
import Timeline from '@/components/content/Timeline';
import Img from '@/components/images/Img';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import TechStack from '@/components/TechStack';
// import CustomLink from '@/components/links/CustomLink';
// import Tooltip from '@/components/Tooltip';

// import getConfig from 'next/config'

// const serverPath = (staticFilePath: string) => {
//   return path.resolve('./public', staticFilePath);
// };

export default function AboutPage() {
  const isLoaded = useLoaded();
  const today = new Date();
  const birthday = new Date('1990/10/03');
  const todayMonth = today.getMonth();
  const birthdayMonth = birthday.getMonth();
  const todayDate = today.getDate();
  const birthdayDate = birthday.getDate();
  let age = today.getFullYear() - birthday.getFullYear();
  if (birthdayMonth > todayMonth) age--;
  else {
    if (birthdayMonth == todayMonth) {
      if (birthdayDate > todayDate) age--;
    }
  }

  return (
    <Layout>
      <Seo
        templateTitle='About'
        description='Elliot is a full stack developer that started his career in 2020.'
      />

      <main style={{ width: '100%' }}>
        <section className={clsx(isLoaded && 'fade-in-start')}>
          <div className='layout pt-20'>
            <h1 className='mt-1' data-fade='1'>
              <Accent>Elliot Mackinnon</Accent>
            </h1>
            <h2 data-fade='0'>Who am I?</h2>
            <div className='mt-4' data-fade='2'>
              <Img
                className='float-right ml-6 w-40 md:w-72'
                publicId='https://folio-v2-images.s3.us-west-2.amazonaws.com/images/portrait.jpg'
                width='1700'
                height='1300'
                alt='Portrait under greenhouse grow lights.'
                preview={false}
                aspect={{ width: 1.5, height: 1 }}
                title=' '
              />
              <article className='prose dark:prose-invert'>
                <p data-fade='3'>
                  Like most people my age, I am {age}. (That was a joke).
                </p>
                {/* <p data-fade='4'>
                  But seriously, how do you sum yourself up? How are you
                  supposed to enumerate the set of all qualities and facets, all
                  surfaces, themselves initiates of functions of situation and
                  circumstance, every infinite layer upon infinite layer of time
                  and being and experience that make you, you? How do you
                  describe yourself with finite, restrictive, meer words? Hell
                  if I know, but here’s my best shot:
                </p>
                <p data-date='4'>
                  I am chiefly in wonder. The universe is eternally wide and
                  enthralling. There are too many things to learn, people to
                  meet, philosophies to mull, natural beauties to behold,
                  experiences to relish, books to read and information to
                  gather, and phenomena of the world to enrapture with their
                  sheer, utter elegance. There is not enough time in the day to
                  learn all I want to know and see all I want to see; senescence
                  has relegated me to a life unfulfilled in that regard. I know
                  that, were I to live to 1000 years old, I would remain
                  desiccated, a husk. Not from the parched and dried bones that
                  come with a body in its twilight, but from the hole I cannot
                  patch, the void I cannot fill...{' '}
                  <Accent>the things I’ll never know.</Accent> It is truly
                  invigorating to take notice of the world and the mysteries in
                  it!
                </p> */}
                <p data-fade='4'>
                  The series of events leading up to this point in my life have
                  been meandering.
                </p>
                <p data-fade='4'>
                  I am from Atlanta, GA and lived there until my late twenties
                  (with a brief stint in the gorgeous deserts of west Texas). I
                  went to college at Georgia State University, where I studied
                  what you might call "neuropsych" these days (a mix of
                  psychology and neuroscience curriculum). I worked aimlessly at
                  a few sales jobs afterwards but, tired of the life I knew, I
                  packed my bags and moved to Munich, Germany where I was
                  stumbling distance from the festival grounds of Oktoberfest
                  for a few years. I taught English to kindergarten-aged
                  children over there, realizing that I am no different from
                  them: I too hate my vegetables and refuse to wear socks and
                  shoes indoors.
                </p>
                <p data-fade='4'>
                  While being a shepherd to a roving herd of small humans and in
                  between solo online German lessons before and after work, I
                  taught myself how to code. Wanting to learn faster, I came
                  back to the States and did a frontend program at Turing School
                  in Denver, CO and got a job soon after doing full stack work.
                  Since then, I have been fiddling with firmware, puttering
                  around with raspberry pi's and getting my hands into
                  everything software-related. Tinkering and building has become
                  a career and a hobby.
                </p>
              </article>
              {/* <h3 className='h4 mt-4' data-fade='6'>
                What I'm up to?
              </h3>
              <article className='prose mt-2 dark:prose-invert' data-fade='7'>
                <ul>
                  <li>
                    I'm a full-stack engineer at{' '}
                    <CustomLink
                      onClick={() =>
                        trackEvent('Now: Dimension', { type: 'link' })
                      }
                      href='https://dimension.dev?ref=theodorusclarence.com'
                    >
                      Dimension
                    </CustomLink>{' '}
                    while working remotely from Jakarta, Indonesia
                  </li>
                  <li>
                    I'm a technical writer for{' '}
                    <CustomLink
                      onClick={() =>
                        trackEvent('Now: LogRocket', { type: 'link' })
                      }
                      href='https://blog.logrocket.com/author/theodorusclarence/'
                    >
                      LogRocket
                    </CustomLink>
                  </li>
                  <li>
                    I'm a mentor! I do revision-style mentorship (
                    <Tooltip
                      tipChildren={
                        <p className='italic'>
                          *Try translating them to english
                        </p>
                      }
                    >
                      <CustomLink
                        onClick={() =>
                          trackEvent('Now: Mentor Thread', { type: 'link' })
                        }
                        href='https://x.com/th_clarence/status/1713454750090534948?s=20'
                      >
                        thread
                      </CustomLink>
                    </Tooltip>
                    )
                  </li>
                </ul>
              </article> */}

              <h3 className='mt-12' data-fade='8'>
                Tech Stack
              </h3>
              <figure className='mt-2' data-fade='9'>
                <TechStack />
              </figure>
            </div>
          </div>
        </section>
        <section>
          <Timeline />
        </section>

        <section>
          <div className='layout mt-16'>
            <h2>What I am working on these days:</h2>
            <article className='prose mt-4 dark:prose-invert'>
              <p>
                Currently I am learning firmware and working on mastering
                microcontrollers in C++!
              </p>
            </article>
          </div>
        </section>
      </main>
    </Layout>
  );
}
