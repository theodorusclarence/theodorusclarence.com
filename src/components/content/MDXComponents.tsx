import Image from 'next/image';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';

import CustomCode, { Pre } from '@/components/content/CustomCode';
import SplitImage, { Split } from '@/components/content/SplitImage';
import CloudinaryImg from '@/components/images/CloudinaryImg';
import CustomLink from '@/components/links/CustomLink';
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
