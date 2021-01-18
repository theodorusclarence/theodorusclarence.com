import Link from 'next/link';

export default function CustomLink(props) {
    const href = props.href;
    const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'));
    const style = props.seemore
        ? 'inline-block font-medium hover:text-accent-300 border-thin px-4 py-2'
        : 'inline-block font-medium accent';

    if (isInternalLink) {
        return (
            <Link href={href}>
                <a className='group' {...props}>
                    <span className={style}>{props.children}</span>
                </a>
            </Link>
        );
    }

    return <a className={style} target='_blank' rel='noopener noreferrer' {...props} />;
}
