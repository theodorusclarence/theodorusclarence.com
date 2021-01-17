import BlogCard from '../../components/BlogCard';
import SpotifyPlaying from '../../components/SpotifyPlaying';

export default function BlogPage() {
    return (
        <div className='container mx-auto'>
            <h1 className='inline-block text-transparent bg-gradient-to-tr from-green-400 to-cyan-400 bg-clip-text'>
                My Blog
            </h1>
            {['first-blog', 'second-blog', 'makan-bibi', 'air-tawar'].map((slug) => (
                <BlogCard key={slug} slug={slug} />
            ))}
            <SpotifyPlaying />
        </div>
    );
}
