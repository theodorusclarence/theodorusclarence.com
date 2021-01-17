import Link from 'next/link';

export default function CustomLink(props) {
    const href = props.href;
    const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'));

    if (isInternalLink) {
        return (
            <Link href={href}>
                <a {...props} />
            </Link>
        );
    }

    return <a target='_blank' rel='noopener noreferrer' {...props} />;
}
