import Image from 'next/image';

import CloudinaryImg from '@/components/CloudinaryImg';
import CustomLink from '@/components/links/CustomLink';
import CustomCode, { Pre } from '@/components/mdx/CustomCode';

const MDXComponents = {
  a: CustomLink,
  Image,
  pre: Pre,
  code: CustomCode,
  CloudinaryImg,
};

export default MDXComponents;
