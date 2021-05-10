import Link from 'next/link';

export default function UnstyledLink(props) {
  const href = props.href;
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'));

  if (isInternalLink) {
    return (
      <Link href={href}>
        <a {...props}>{props.children}</a>
      </Link>
    );
  }

  return (
    <a target='_blank' rel='noopener noreferrer' {...props}>
      {props.children}
    </a>
  );
}
