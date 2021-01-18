import Link from 'next/link';

export default function CustomLink(props) {
    const href = props.href;
    const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'));
    const style = 'inline-block font-medium accent';

    if (isInternalLink) {
        return (
            <Link href={href}>
                <a {...props}>
                    <span className={style}>{props.children}</span>
                </a>
            </Link>
        );
    }

    return (
        <a target='_blank' rel='noopener noreferrer' {...props}>
            <span className={style}>{props.children}</span>
        </a>
    );
}
