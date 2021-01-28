import Link from 'next/link';

export default function CustomLink(props) {
    const href = props.href;
    const isInternalLink =
        href && (href.startsWith('/') || href.startsWith('#'));
    const style = 'inline-block font-medium accent align-middle';

    if (isInternalLink) {
        return (
            <Link href={href}>
                <a {...props} className='inline-flex items-center rounded-sm ring-vis'>
                    <span className={style}>{props.children}</span>
                </a>
            </Link>
        );
    }

    return (
        <a
            className='inline-flex items-center rounded-sm ring-vis'
            target='_blank'
            rel='noopener noreferrer'
            {...props}
        >
            <span className={style}>{props.children}</span>
        </a>
    );
}
