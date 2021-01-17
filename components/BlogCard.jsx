import useSWR from 'swr';
import Link from 'next/link';
import fetcher from '../utils/fetcher';

export default function BlogCard({ slug }) {
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
