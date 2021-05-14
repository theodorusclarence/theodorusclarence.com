import { projects } from '@/data/projects';
import { ogGenerate } from '@/utils/helper';

import CustomLink from '@/components/CustomLink';
import UnstyledLink from '@/components/UnstyledLink';
import Seo from '@/components/Seo';
import Nav from '@/components/Nav';
import ProjectHeader from '@/components/ProjectHeader';
import PickTech from '@/components/PickTech';
import CloudinaryImg from '@/components/CloudinaryImg';
import Footer from '@/components/Footer';

export default function PetrolidaPage({ data }) {
  const description =
    'Petrolida 2021 website was made to promote Petroleum Integrated Days 2021 at Sepuluh Nopember Institute of Technology. I developed this website using Next.js to implement easy route management with Static Side Generation then can be exported statically to Cpanel.';
  const imageOg = ogGenerate('Petrolida 2021', 'Project');

  return (
    <>
      <Seo
        title={data.name + ' - theodorusclarence.com'}
        description={description}
        image={imageOg}
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
              This project objective is to give information and guide the user
              to register for the competitions and the other pre-event through
              google forms. There are four kinds that are developed in the
              website which are Landing Page to give the user general knowledge
              about the event. Then, there are 7 competitions that were made
              into different routes each one. Lastly is the pre-event such as
              the talk show.
            </p>

            <br />

            <blockquote>
              <h2>Tech Stack Used</h2>
              <PickTech techs={data.techStack} />
            </blockquote>
            <p>
              This project was made using Next.js and Tailwindcss. Although this
              is fairly only a static website that didn't really need much
              complexity, using Next.js really simplifies the routing of the
              website and help me make reusable components. I usually use
              tailwindcss when using the Next.js framework to increase
              productivity.
            </p>

            <div className='grid items-start grid-cols-2 gap-4'>
              <figure className='w-full overflow-hidden rounded-sm shadow-md dark:shadow-none'>
                <CloudinaryImg
                  publicId='theodorusclarence/petrolida-2021/ss1_pvyttb.png'
                  className='bg-gray-500 rounded-sm'
                  width={800}
                  height={2366}
                  alt='Web Screenshot'
                />
              </figure>
              <figure className='w-full overflow-hidden rounded-sm shadow-md dark:shadow-none'>
                <CloudinaryImg
                  publicId='theodorusclarence/petrolida-2021/ss2_fpine4.png'
                  className='bg-gray-500 rounded-sm'
                  width={800}
                  height={2782}
                  alt='Web Screenshot'
                />
              </figure>
            </div>

            <br />

            <blockquote>
              <h2>Spotlight</h2>
            </blockquote>
            <h3>Open Graph & SEO Optimization</h3>
            <p>
              The spotlight on this project that I spend some time on SEO and I
              got into opengraph where you can get a link preview with a custom
              description and opengraph image.
            </p>
            <figure className='mx-auto w-[315px] shadow-md dark:shadow-none rounded-sm overflow-hidden'>
              <CloudinaryImg
                publicId='theodorusclarence/petrolida-2021/opengraph_prie5d.jpg'
                className='bg-gray-500 rounded-sm'
                width={315}
                height={227}
                alt='Open Graph Tag'
              />
            </figure>
            <h3>Animation</h3>
            <p>
              I also implemented some animation on this website using the GSAP
              library. It was my first time using GSAP on React projects.
            </p>

            <br />

            <blockquote>
              <h2>The Problems and How I Deal With It</h2>
            </blockquote>
            <p>
              In this project, the problem that I found was that the domain that
              was given and needed to use its old and kind of hard to configure.
              Eventually, I only host the static files and ditch out the Image
              Optimization feature from Next.js. It was not ideal, because I
              need to optimize images that are being used to increase loading
              speed.
            </p>
            <p>
              I also struggled with implementing ScrollTrigger with GSAP because
              there are not many blogs or tutorials on Google, so I take the
              chance on reading the documentation to make it work.
            </p>

            <br />

            <blockquote>
              <h2>Lessons Learned</h2>
            </blockquote>
            <p>
              This is my first website for an event so I really consider a lot
              how to do a great practice on SEO, I discovered a library called{' '}
              <CustomLink href='https://github.com/garmeeh/next-seo'>
                next-seo
              </CustomLink>{' '}
              that helped a lot on configuring SEO using Next.js.
            </p>
            <p>
              In this project, I anticipated that there will be many revisions
              because that is what usually happens, so I try to reduce writing
              HTML and make everything based on the data, so I store the data in
              a javascript file and just map it out to the layout. This makes
              revising much quicker and easier.
            </p>
            <p>
              This project really taught me a lot about making a cleaner code
              and make the development process more effective by using some
              library that helps.
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
  const data = projects.find((project) => project.id === 'petrolida-2021');
  return {
    props: { data },
  };
}
