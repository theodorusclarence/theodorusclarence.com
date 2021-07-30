import { classNames } from '@/utils/helper';
import UnstyledLink from './UnstyledLink';

export default function CustomLink({ children, className = '', ...rest }) {
  return (
    <UnstyledLink
      {...rest}
      className={classNames(
        'inline-flex items-center font-medium rounded-sm ring-vis view',
        className
      )}
    >
      <span className='inline-block align-middle accent'>{children}</span>
    </UnstyledLink>
  );
}
