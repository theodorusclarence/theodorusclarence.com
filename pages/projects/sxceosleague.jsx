import { projects } from '@/data/projects';
import { ogGenerate } from '@/utils/helper';

import UnstyledLink from '@/components/UnstyledLink';
import Nav from '@/components/Nav';
import ProjectHeader from '@/components/ProjectHeader';
import PickTech from '@/components/PickTech';
import CloudinaryImg from '@/components/CloudinaryImg';
import Footer from '@/components/Footer';
import Seo from '@/components/Seo';

export default function SxceosleaguePage({ data }) {
  const title = data.name + ' - theodorusclarence.com';
  const description =
    'StudentsxCEOs League website was made to promote the event and provide registration solutions using Typeform. We developed this website using Next.js and Tailwindcss';
  const imageOg = ogGenerate('StudentsxCEOs League', 'Project');

  return (
    <>
      <Seo title={title} description={description} image={imageOg} />
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
              This project objective is to give information and guide the user
              to register for the pre-event, challenges, and conference through
              Typeform. This website is used to attract as much visitor as
              possible and give them information and knowledge about this event.
            </p>

            <br />

            <blockquote>
              <h2>Tech Stack Used</h2>
              <PickTech techs={data.techStack} />
            </blockquote>
            <p>
              This project was made using Next.js and Tailwindcss. For a static
              site, I tend to use Next.js and Tailwindcss for a better Developer
              Experience and faster loading speed. Using Next.js also makes data
              management easier by storing all of the data in the js file, then
              map it out on the page. With this structure, it is very easy to
              add or change something because we only need to change the data
              the markup will follow.
            </p>

            <div className='grid items-start grid-cols-2 gap-4'>
              <figure className='w-full overflow-hidden rounded-sm shadow-md dark:shadow-none'>
                <CloudinaryImg
                  publicId='theodorusclarence/sxceosleague/ss1_wgdcwp.png'
                  className='bg-gray-500 rounded-sm'
                  width={800}
                  height={1271}
                  alt='Web Screenshot'
                />
              </figure>
              <div className='flex flex-col space-y-4'>
                <figure className='w-full overflow-hidden rounded-sm shadow-md dark:shadow-none'>
                  <CloudinaryImg
                    publicId='theodorusclarence/sxceosleague/ss2_lrhcjn.png'
                    className='bg-gray-500 rounded-sm'
                    width={800}
                    height={1023}
                    alt='Web Screenshot'
                  />
                </figure>
                <figure className='w-full overflow-hidden rounded-sm shadow-md dark:shadow-none'>
                  <CloudinaryImg
                    publicId='theodorusclarence/sxceosleague/ss3_orb5oe.png'
                    className='bg-gray-500 rounded-sm'
                    width={800}
                    height={440}
                    alt='Web Screenshot'
                  />
                </figure>
              </div>
            </div>

            <br />

            <blockquote>
              <h2>Spotlight</h2>
            </blockquote>
            <h3>‘Linktree-like‘ page</h3>
            <p>
              In this website, we implement a page for linktree-like buttons so
              the user that is get redirected from the Instagram can get easier
              access to the page and socials
            </p>
            <figure
              className='mx-auto overflow-hidden rounded-sm shadow-md dark:shadow-none'
              style={{ maxWidth: 450 }}
            >
              <CloudinaryImg
                publicId='theodorusclarence/sxceosleague/ss4_hqmquo.png'
                className='bg-gray-500 rounded-sm'
                width={450}
                height={792}
                alt='Links Page'
              />
            </figure>

            <br />

            <blockquote>
              <h2>The Problems and How I Deal With It</h2>
            </blockquote>
            <p>
              There is a lot of complex layout in this project, especially
              because in this design there is a lot of objects that are
              absolutely-positioned, and we need to think of a strategy to make
              it work both on mobile and desktop.
            </p>
            <p>
              I also lead this project and helped on designing and developing
              the overall site, designing this was challenging because we want
              to achieve a design that represents the Graphic Standard Model
            </p>

            <br />

            <blockquote>
              <h2>Lessons Learned</h2>
            </blockquote>
            <p>
              This is the first project that I had with some team members in
              their own expertise such as UI Designers and Developer. I keep
              track of everything in notion app and assign the task on that app.
              It is really fun working with a lot of people and try bunch of new
              ideas and communicate our differences
            </p>
            <p>
              I also learned a lot about developing a website with a bunch of
              floating illustrations and absolutely-positioned elements. I
              usually avoid making designs with illustrations that are
              absolutely-positioned, but this project has been a lot of fun to
              develop.
            </p>

            <UnstyledLink href='/projects' className='inline-block mt-4 view'>
              ← Back to projects
            </UnstyledLink>

            <style jsx>{`
              blockquote h2 {
                font-style: normal;
                margin-bottom: 0.5em;
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
  const data = projects.find((project) => project.id === 'sxceosleague');
  return {
    props: { data },
  };
}
