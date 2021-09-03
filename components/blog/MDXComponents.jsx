import Image from 'next/image';
import CustomCode, { Pre } from '../CustomCode';
import CustomLink from '../CustomLink';
import CloudinaryImg from '../CloudinaryImg';

const MDXComponents = {
  a: CustomLink,
  Image,
  CloudinaryImg,
  code: CustomCode,
  pre: Pre,
};

export default MDXComponents;
