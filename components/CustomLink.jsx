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
      <span className='inline-block no-under align-middle !border-b-2 border-dotted  !border-gray-400 accent dark:!border-b-0 hover:!border-transparent transition-colors'>
        {children}
      </span>
    </UnstyledLink>
  );
}
