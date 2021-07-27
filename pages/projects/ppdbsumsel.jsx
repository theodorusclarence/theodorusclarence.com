import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

import { projects } from '@/data/projects';
import { ogGenerate } from '@/utils/helper';

import Seo from '@/components/Seo';
import PickTech from '@/components/PickTech';
import CloudinaryImg from '@/components/CloudinaryImg';
import ProjectLayout from '@/components/ProjectLayout';
import CustomLink from '@/components/CustomLink';

export default function SxceosleaguePage({ data }) {
  const title = data.name + ' - theodorusclarence.com';
  const description =
    "This specific project was developed to facilitate over 200 thousand students from Sumatera Selatan to register to their local high school. This is quite a large project for me and it succeeded to break the common look for a 'governmental site' by using React and Tailwindcss.";
  const imageOg = ogGenerate('PPDB Sumatera Selatan', 'Project');

  return (
    <>
      <Seo title={title} description={description} image={imageOg} />
      <ProjectLayout data={data}>
        <blockquote>
          <h2>Short Explanation</h2>
        </blockquote>
        <p>{description}</p>
        <br />
        <blockquote>
          <h2>Project Goals</h2>
        </blockquote>
        <p>
          This project objective is to give information about PPDB (Penerimaan
          Peserta Didik Baru) for local high school in Sumatera Utara. This
          website should facilitate registration, generating registration proof,
          and giving announcements about acceptance. This website can also print
          a test card number for students that are registering by test and their
          grades. There is also another entry which is using geolocation by
          calculating the radius from their house to the school location.
        </p>
        <br />
        <blockquote>
          <h2>Tech Stack Used</h2>
          <PickTech techs={data.techStack} />
        </blockquote>
        <p>
          This project was developed using Create React App for a snappier
          website and delivering a quick and easy-to-use interface. We decided
          to use Tailwindcss for this site for a better look and
          maintainability.
        </p>
        <p>For the library we use numerous libraries such as:</p>
        <ul>
          <li>
            <strong>React Hook Form</strong> for form management and form
            validation
          </li>
          <li>
            <strong>React Leaflet</strong> for maps, also using Google Maps API
          </li>
          <li>
            <strong>React Dropzone</strong> for drag-and-drop file upload
          </li>
          <li>
            <strong>React Datepicker</strong> for accessible date input
          </li>
          <li>
            <strong>React Toastify</strong> for giving toast about success and
            error
          </li>
          <li>
            <strong>Cypress</strong> for end to end testing, integrated with
            Github CI and Vercel continuous deployment
          </li>
        </ul>
        <div className='grid items-start grid-cols-2 gap-4'>
          <div className='flex flex-col space-y-4'>
            <figure className='!mb-0 overflow-hidden rounded-sm shadow-md dark:shadow-none'>
              <CloudinaryImg
                className='bg-gray-500'
                publicId='theodorusclarence/projects/ppdbsumsel/prestasi-tesmandiri_zjaaer'
                alt='prestasi-tesmandiri'
                width={1440}
                height={2899}
              />
            </figure>
            <figure className='overflow-hidden rounded-sm shadow-md dark:shadow-none'>
              <CloudinaryImg
                className='bg-gray-500'
                publicId='theodorusclarence/projects/ppdbsumsel/acceptance_tvjpmi'
                alt='acceptance'
                width={1280}
                height={908}
              />
            </figure>
          </div>
          <div className='flex flex-col space-y-4'>
            <figure className='!mb-0 overflow-hidden rounded-sm shadow-md dark:shadow-none'>
              <CloudinaryImg
                className='bg-gray-500'
                publicId='theodorusclarence/projects/ppdbsumsel/zonasi_djqq65'
                alt='zonasi'
                width={1440}
                height={2537}
              />
            </figure>
            <figure className='overflow-hidden rounded-sm shadow-md dark:shadow-none'>
              <CloudinaryImg
                className='bg-gray-500'
                publicId='theodorusclarence/projects/ppdbsumsel/not-accepted_gxl5qm'
                alt='not-accepted'
                width={1280}
                height={826}
              />
            </figure>
          </div>
        </div>
        <br />
        <blockquote>
          <h2>Spotlight</h2>
        </blockquote>
        <h3>Form Validation</h3>
        <p>
          Validation is a big thing in the registering process, so we try to
          make it strict so the data that is entered is valid.
        </p>
        <h3>Map API</h3>
        <p>
          Using a map is quite challenging as we need to calculate the radius,
          we try to be as accessible and easy to understand as possible, which
          is why we decided to make the radius reactive to the map movement. For
          accessibility the user can also search their location or use the GPS.
        </p>
        <LiteYouTubeEmbed
          id='ns5CZpU3yII'
          poster='maxresdefault'
          noCookie={true}
        />
        <h3>End to End Testing</h3>
        <p>
          We use Cypress for an end to end testing, which is integrated with
          Github CI and Vercel continuous deployment. Cypress is a test runner
          that allows you to write tests in a human-readable language. This
          eliminates the tedious workflow of testing for every change and gives
          us the confidentiality that our code didn't break. This also works
          well to check if there is a missed logic in the backend.
        </p>
        <LiteYouTubeEmbed
          id='FX4XHrvWST8'
          poster='maxresdefault'
          noCookie={true}
        />
        <h3>Conventional Commit</h3>
        <p>
          In this project, My team and I decided to use conventional commit so
          the commit message is cleaner and easier to read. I've been using it
          since, I think it is awesome. Also using Vercel, we can practically
          backtrack to any deployment of the commit.
        </p>
        <p>
          We also configured it with husky so the commit message is checked
          before committing. You can check the setup on my library about{' '}
          <CustomLink href='https://theodorusclarence.com/library/husky-commitlint-prettier'>
            how to configure husky
          </CustomLink>
        </p>
        <figure className='overflow-hidden rounded-sm shadow-md dark:shadow-none'>
          <CloudinaryImg
            className='bg-gray-500'
            publicId='theodorusclarence/projects/ppdbsumsel/conventional-commit_e8z1qa'
            alt='conventional-commit'
            width={1272}
            height={525}
          />
        </figure>
        <br />
        <blockquote>
          <h2>The Problems and How I Deal With It</h2>
        </blockquote>
        <p>
          This is my biggest project with a lot of new technologies for me. It
          is my first time using React Hook Form, doing testing with cypress,
          setting up all of the CI/CD, using Google Maps API, also the first
          time using a convention for the commit message.
        </p>
        <p>
          But it definitely has been a great learning experience for me. This
          project strengthens my knowledge about how to build a functional
          application.
        </p>
        <p>
          Managing the frontend also has been a great experience, I managed 2 of
          my team and delegate some issues and features that need to be
          implemented using Github Issues and Pull Requests
        </p>
        <br />
        <blockquote>
          <h2>Lessons Learned</h2>
        </blockquote>
        <p>
          I learn a lot from this project, a lot of great libraries that I use,
          and now I quite understood how reading documentation and actually
          understanding it is really important.
        </p>
        <p>
          I am now quite comfortable if I have to learn a new library or stack
          because I know how to efficiently read documentation now.
        </p>
      </ProjectLayout>
    </>
  );
}

export async function getStaticProps(context) {
  const data = projects.find((project) => project.id === 'ppdbsumsel');
  return {
    props: { data },
  };
}
