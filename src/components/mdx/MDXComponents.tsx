import Image from 'next/image';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';

import CloudinaryImg from '@/components/CloudinaryImg';
import CustomLink from '@/components/links/CustomLink';
import CustomCode, { Pre } from '@/components/mdx/CustomCode';
import SplitImage, { Split } from '@/components/mdx/SplitImage';
import TechIcons from '@/components/TechIcons';

const MDXComponents = {
  a: CustomLink,
  Image,
  pre: Pre,
  code: CustomCode,
  CloudinaryImg,
  LiteYouTubeEmbed,
  SplitImage,
  Split,
  TechIcons,
};

export default MDXComponents;
