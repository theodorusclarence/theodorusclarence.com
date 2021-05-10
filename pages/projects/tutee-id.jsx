import { NextSeo } from 'next-seo';

import { projects } from '@/data/projects';

import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import PickTech from '@/components/PickTech';
import UnstyledLink from '@/components/UnstyledLink';
import ProjectHeader from '@/components/ProjectHeader';
import CloudinaryImg from '@/components/CloudinaryImg';

export default function PetrolidaPage({ data }) {
  const title = data.name + ' - theodorusclarence.com';
  const description =
    'Tutee.id (Now Aksel.co.id) is a startup that meets tutors and its customer. This app was created to facilitate booking orders. On this site, there are pages to look at the available tutors, book them, and see the booking status.';
  const url = 'https://theodorusclarence.com/projects/petrolida-2021';
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
      <main className='flex flex-col min-h-screen'>
        <Nav />
        <section className='py-6 mt-4'>
          <article className='layout'>
            <ProjectHeader data={data} />
          </article>
        </section>

        <section className='py-6 mt-4'>
          <article className='space-y-4 prose dark:prose-dark layout'>
            <blockquote>
              <h2>Short Explanation</h2>
            </blockquote>
            <p>{description}</p>

            <br />

            <blockquote>
              <h2>Project Goals</h2>
            </blockquote>
            <p>
              This project objective is to support the main business of the
              startup which is to facilitate transactions and provide
              information about tutors.
            </p>

            <br />

            <blockquote>
              <h2>Tech Stack Used</h2>
              <PickTech techs={data.techStack} />
            </blockquote>
            <p>
              This project was made using React, Redux, and Firebase. This
              project was needed rapidly so building a backend application will
              take too much time. So we use firebase for the backend using
              Firestore and Firebase Storage to store profile pictures. I am
              responsible for making the landing page, search tutor page, and
              session page.
            </p>

            <div className='grid items-start grid-cols-2 gap-4'>
              <figure className='w-full m-0 overflow-hidden rounded-sm shadow-md dark:shadow-none'>
                <CloudinaryImg
                  publicId='theodorusclarence/tutee-id/tutee-1_jhx3st.png'
                  width={800}
                  height={2709}
                  alt='Web Screenshot'
                />
              </figure>
              <div className='flex flex-col justify-between w-full h-full'>
                <figure className='w-full m-0 overflow-hidden rounded-sm shadow-md dark:shadow-none'>
                  <CloudinaryImg
                    publicId='theodorusclarence/tutee-id/tutee-2_dvybsa.png'
                    width={800}
                    height={1001}
                    alt='Web Screenshot'
                  />
                </figure>
                <figure className='w-full m-0 overflow-hidden rounded-sm shadow-md dark:shadow-none'>
                  <CloudinaryImg
                    publicId='theodorusclarence/tutee-id/tutee-3_ikgyzz.png'
                    width={800}
                    height={1067}
                    alt='Web Screenshot'
                  />
                </figure>
                <figure className='w-full m-0 overflow-hidden rounded-sm shadow-md dark:shadow-none'>
                  <CloudinaryImg
                    publicId='theodorusclarence/tutee-id/tutee-4_wxgcnh.png'
                    width={800}
                    height={442}
                    alt='Web Screenshot'
                  />
                </figure>
              </div>
            </div>

            <img
              className='mx-auto mt-8 shadow-md dark:shadow-none'
              src='/images/projects/tutee-id/gif1.gif'
              alt='Gif 1'
            />
            <img
              className='mx-auto mt-8 shadow-md dark:shadow-none'
              src='/images/projects/tutee-id/gif2.gif'
              alt='Gif 2'
            />

            <br />

            <blockquote>
              <h2>Spotlight</h2>
            </blockquote>
            <h3>First Collaborative Project</h3>
            <p>
              This is my very first collaborative project with 3 other people
              and I really enjoyed it. I learned a lot about git workflow to
              merge code and other stuff for contributing. I actually learned
              how to close vim in this project 😂. I enjoyed working in a group
              because I get a lot of knowledge and get a chance to share mine
              too.
            </p>
            <h3>Complex Project</h3>
            <p>
              This is quite a complex project with a lot of entities and
              database optimization because we are using firebase and trying to
              minimize hit as much as possible.
            </p>

            <br />

            <blockquote>
              <h2>The Problems and How I Deal With It</h2>
            </blockquote>
            <p>
              In this project, there are a lot of problems that I found. This is
              my first time working with a complex data flow using Redux. I have
              a significant time googling on the internet on how to do things. I
              also make use of useEffect hooks to preprocess the data that was
              fetched.
            </p>
            <p>
              Also, folder management and CSS reusability are really hard for me
              in doing this collaborative project because we didn't use any CSS
              framework or prepared utility classes. I think there is a lot of
              redundancy in the CSS and can be fixed
            </p>

            <br />

            <blockquote>
              <h2>Lessons Learned</h2>
            </blockquote>
            <p>
              I learned a lot from this project. I solidified my knowledge in
              using useEffect, and get a chance to put my CSS skills to
              practice. I work mostly on the more complex page to build
              CSS-wise, and I finally put a lot of CSS properties like absolute,
              sticky, overflow in this project. Creating the navbar is also
              challenging because I want to use position: sticky, and it doesn't
              allow it to have overflow property.
            </p>
            <p>
              I learned great practice on managing version control with gitlab,
              by using staging and production branches. This is a great and fun
              first project, that really strengthen my skill
            </p>
            <UnstyledLink href='/projects' className='inline-block mt-4 view'>
              ← Back to projects
            </UnstyledLink>

            <style jsx>{`
              blockquote h2 {
                font-style: normal;
                margin-bottom: 0.5em;
              }

              .prose .grid figure {
                margin: 0;
              }
            `}</style>
          </article>
        </section>
        <Footer />
      </main>
    </>
  );
}

export async function getStaticProps(context) {
  const data = projects.find((project) => project.id === 'tutee-id');
  return {
    props: { data },
  };
}
