import CustomLink from '@/components/CustomLink';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import PickTech from '@/components/PickTech';
import ProjectHeader from '@/components/ProjectHeader';
import { projects } from '@/data/projects';
import { NextSeo } from 'next-seo';
import Image from 'next/image';

export default function PetrolidaPage({ data }) {
    const title = data.name + ' - theodorusclarence.com';
    const description = `This app was created as a team for uOttaHack, Canada
                            in 36 hours. When thinking about how we could make a
                            difference within local communities impacted by
                            Covid-19, what came to mind are our frontline
                            workers. Our doctors, nurses, grocery store workers,
                            and Covid-19 testing volunteers, who have tirelessly
                            been putting themselves and their families on the
                            line. They are the backbone and heartbeat of our
                            society during these past 10 months and counting. We
                            want them to feel the appreciation and gratitude
                            they deserve. With this app, we hope to bring
                            moments of positivity and joy to those difficult and
                            trying moments of our frontline workers.`;
    const url = 'https://theodorusclarence.com/projects/love4heroes';
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
                            This project was made so the user is able to create
                            a card and can save the card as a link, then the
                            user can send the link to their loved frontline
                            workers. The frontline workers can also see all of
                            the cards on the "Warm Messages" Board.
                        </p>

                        <br />

                        <blockquote>
                            <h2>Tech Stack Used</h2>
                            <PickTech techs={data.techStack} />
                        </blockquote>
                        <p>
                            This project was built using Next.js, Tailwindcss,
                            SWR, and Firebase. Personally, I think using these
                            stacks is a great choice due to the lack of time and
                            for simplicity. We only use the firebase for the
                            firestore because it is simple to configure. Next.js
                            is also a great choice because we can mix and match
                            the rendering type that we are using. For the
                            dynamic content such as rendering the card's data
                            from firestore, we use client-side rendering and
                            utilizing SWR to cache the data.
                        </p>

                        <div className='grid items-start grid-cols-2 gap-4'>
                            <figure className='w-full shadow-md dark:shadow-none'>
                                <Image
                                    className='bg-gray-500 rounded-sm'
                                    width={1425}
                                    height={2772}
                                    layout='responsive'
                                    src={`/images/projects/love4heroes/ss1.png`}
                                    title='Landing Page'
                                    alt='Web Screenshot'
                                />
                            </figure>
                            <div>
                                <figure className='w-full shadow-md dark:shadow-none'>
                                    <Image
                                        className='bg-gray-500 rounded-sm'
                                        width={1440}
                                        height={767}
                                        layout='responsive'
                                        src={`/images/projects/love4heroes/ss2.png`}
                                        title='Filling Out Form For Cards Page'
                                        alt='Web Screenshot Form'
                                    />
                                </figure>
                                <figure className='w-full shadow-md dark:shadow-none'>
                                    <Image
                                        className='bg-gray-500 rounded-sm'
                                        width={1440}
                                        height={767}
                                        layout='responsive'
                                        src={`/images/projects/love4heroes/ss4.png`}
                                        title='Page after you fill the form'
                                        alt='Web Screenshot'
                                    />
                                </figure>
                                <figure className='w-full shadow-md dark:shadow-none'>
                                    <Image
                                        className='bg-gray-500 rounded-sm'
                                        width={1440}
                                        height={767}
                                        layout='responsive'
                                        src={`/images/projects/love4heroes/ss3.png`}
                                        title='Card when sended to the frontline workers'
                                        alt='Web Screenshot '
                                    />
                                </figure>
                            </div>
                        </div>

                        <br />

                        <blockquote>
                            <h2>Spotlight</h2>
                        </blockquote>
                        <h3>
                            First Hackathon With 12 Hour Time-Zone Difference &
                            Tight Time
                        </h3>
                        <p>
                            In this project, I collaborated with 3 other teams
                            that live in America. It's quite a challenge for me
                            to fit in into their timezone so we can still work
                            together. Also, there are only 36 hours to finish a
                            functioning full-stack application.
                        </p>

                        <h3>Consideration for UX</h3>
                        <p>
                            We incorporated a library to simulate flipping
                            cards, but sometimes the user didn't open it while
                            editing. So we decided to make a UX improvement by
                            opening it when user starts filling out the form.
                        </p>
                        <img
                            className='mx-auto'
                            src='/images/projects/love4heroes/love4heroesux.gif'
                            alt='UX Consideration'
                        />

                        <br />

                        <blockquote>
                            <h2>The Problems and How I Deal With It</h2>
                        </blockquote>
                        <p>
                            During this project the largest problem is time
                            management because we need to map out everything we
                            need on the website, then develop it in just a short
                            time. So during the creation of the application, we
                            divide the project into little parts so it is still
                            manageable.
                        </p>
                        <p>
                            There is also a tricky part when I was building a
                            like button. I need to get the latest data on the
                            likes from the database, then increment it. Also, I
                            need to make a condition where each person can only
                            like once. In the end, it was successful by
                            utilizing local storage to store the state.
                        </p>
                        <figure className='flex justify-center shadow-md dark:shadow-none'>
                            <Image
                                className='bg-gray-500 rounded-sm'
                                width={210}
                                height={149}
                                src={`/images/projects/love4heroes/likebutton.png`}
                                alt='Open Graph Tag'
                            />
                        </figure>

                        <br />

                        <blockquote>
                            <h2>Lessons Learned</h2>
                        </blockquote>
                        <p>
                            After this project, I felt more comfortable working
                            with firebase. Before, it seems jarring to set up
                            firebase and firestore connection. But turns out it
                            was not that hard, also Next.js has a built-in API
                            route so I can implement SWR caching without the use
                            of another library.
                        </p>
                        <p>
                            Because the rest of my team is American, I actually
                            get to practice my English in this project. It was
                            definitely harder explaining a code with another
                            language 😁.
                        </p>

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
    const data = projects.find((project) => project.id === 'love4heroes');
    return {
        props: { data },
    };
}
