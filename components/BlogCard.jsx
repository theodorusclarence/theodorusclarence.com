import useSWR from 'swr';
import Link from 'next/link';

export default function BlogCard({ slug }) {
    const fetcher = () => fetch(`/api/${slug}`).then((res) => res.json());
    const { data } = useSWR(`/api/${slug}`, fetcher);

    return (
        <div>
            <Link href={`/blog/${slug}`}>
                <a>
                    <h3>{slug}</h3>
                </a>
            </Link>

            <p>{data?.count || '0'}</p>
        </div>
    );
}
