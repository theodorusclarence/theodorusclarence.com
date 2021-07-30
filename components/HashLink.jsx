import { classNames } from '@/utils/helper';
import UnstyledLink from './UnstyledLink';

export default function HashLink({ className, children, ...rest }) {
  return (
    <UnstyledLink
      {...rest}
      className={classNames(
        'inline-flex items-center rounded-sm ring-vis font-bold view hash-anchor-non-mdx',
        className
      )}
    >
      {children}
    </UnstyledLink>
  );
}
