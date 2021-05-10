import Link from 'next/link';

export default function Button({ href, children, className }) {
  return (
    <Link href={href}>
      <a
        className={`btn ${className} ring-vis-0 inline-block px-6 py-2 font-medium rounded-md  border-thin`}
      >
        <span>{children}</span>
      </a>
    </Link>
  );
}
