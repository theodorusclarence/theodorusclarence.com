import Seo from '../components/Seo';
import Footer from '../components/Footer';
import Nav from '../components/Nav';
import { projects } from '../data/projects';
import ProjectCard from '../components/ProjectCard';

export default function ProjectsPage() {
    return (
        <>
            <Seo pageTitle='NextJS Tailwind Starter' />
            <Nav />
            <section className='py-6 mt-4'>
                <main className='space-y-2 layout'>
                    <h1 className=''>My Projects</h1>
                    <p className='prose'>Some projects that I have made.</p>
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
