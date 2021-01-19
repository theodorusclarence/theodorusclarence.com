import Seo from '../components/Seo';
import Footer from '../components/Footer';
import Nav from '../components/Nav';
import { projects } from '../data/projects';
import ProjectCard from '../components/ProjectCard';
import { NextSeo } from 'next-seo';

const url = 'https://theodorusclarence.com/projects';
const title = 'Projects – theodorusclarence.com';
const description = 'Showcase of my works on frontend development.';

export default function ProjectsPage() {
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
            <Nav />
            <section className='py-6 mt-4'>
                <main className='space-y-2 layout'>
                    <header className='mb-8 space-y-2'>
                        <h1 className=''>My Projects</h1>
                        <p className='prose dark:text-light'>Some projects that I have made.</p>
                    </header>
                    <div className='grid gap-4 md:grid-cols-2'>
                        {projects.map((project, index) => (
                            <ProjectCard key={index} data={project} />
                        ))}
                    </div>
                </main>
            </section>
            <Footer />
        </>
    );
}
