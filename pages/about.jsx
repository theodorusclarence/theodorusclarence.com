import { classNames } from '@/utils/helper';
import useLoadingWithPreload from '@/hooks/useLoadingWithPreload';

import Nav from '@/components/Nav';
import CustomLink from '@/components/CustomLink';
import CloudinaryImg from '@/components/CloudinaryImg';
import CopyableText from '@/components/CopyableText';
import Footer from '@/components/Footer';
import Seo from '@/components/Seo';

export default function About() {
  const { isLoaded } = useLoadingWithPreload();

  return (
    <>
      <Seo title='About – theodorusclarence.com' />
      <Nav />

      {/* //* About */}
      <main
        className={classNames(
          'flex flex-col min-h-screen',
          isLoaded && 'animate-fade-in-start'
        )}
      >
        <section className='py-10'>
          <article className='layout'>
            <h1 className='animate-fade-in-initial fade-in-1'>About</h1>
            <h1 className='mb-4 animate-fade-in-initial fade-in-2'>
              <span className='accent'>Theodorus Clarence</span>
            </h1>
            <figure className='float-right ml-6 w-36 md:w-52 animate-fade-in-initial fade-in-3'>
              <CloudinaryImg
                publicId='theodorusclarence/tc-me_dpzlvc.png'
                width='596'
                height='882'
                alt='Photo of me'
                preview={false}
              />
            </figure>
            <p className='mb-4 prose dark:text-light animate-fade-in-initial fade-in-4'>
              Hello! I'm Clarence. I started learning web development in May
              2020, which is the start of the pandemic. I have nothing much to
              do so I decided to learn web development from a udemy course, then
              started watching a bunch of{' '}
              <CustomLink href='/blog/youtube-list'>youtube videos</CustomLink>{' '}
              to explore more about web development especially frontend
              development.
            </p>
            <p className='mb-4 prose dark:text-light animate-fade-in-initial fade-in-5'>
              There are a lot of things and technologies to learn in frontend
              development and I am motivated to learn as much as possible. I
              enjoy learning something new and getting feedback to make myself
              better and improve.
            </p>
            <p className='prose dark:text-light animate-fade-in-initial fade-in-6'>
              In this website I will be writing some blogs and showcase my
              projects. I believe that writing what I have learned is the best
              way to remember things, and I can share my knowledge along the
              way. So do contact me and I will be very happy to help!
            </p>
          </article>
        </section>

        {/* //* Contacts */}
        <section className='py-10'>
          <article className='layout'>
            <h2 className='mb-2 animate-fade-in-initial fade-in-7'>Contact</h2>
            <p className='prose dark:text-light animate-fade-in-initial fade-in-8'>
              Do contact me if you need my opinion about web development,
              especially frontend works. I’ll be happy to help! (find my email
              in the footer)
            </p>
          </article>
        </section>

        {/* //* Business Inquiries */}
        <section className='pt-10 pb-16'>
          <article className='layout'>
            <h2 className='mb-2 animate-fade-in-initial fade-in-9'>
              Business Inquiries
            </h2>
            <p className='prose dark:text-light animate-fade-in-initial fade-in-10'>
              Contact me if you want to build a personal website. If you need a
              more complex website contact me through{' '}
              <CopyableText>etzytech@gmail.com</CopyableText> agency.
            </p>
          </article>
        </section>
        <Footer />
      </main>
    </>
  );
}
