import Image from 'next/image';

import CustomLink from '@/components/links/CustomLink';
import CustomCode, { Pre } from '@/components/mdx/CustomCode';

const MDXComponents = {
  a: CustomLink,
  Image,
  pre: Pre,
  code: CustomCode,
};

export default MDXComponents;
