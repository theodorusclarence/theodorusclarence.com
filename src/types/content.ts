import { ReadTimeResults } from 'reading-time';

export type FrontMatterType = {
  wordCount: number;
  readingTime: ReadTimeResults;
  slug: string;
  englishOnly?: boolean;
  title: string;
  description: string;
  banner: string;
  publishedAt: string;
  lastUpdated?: string;
};

export type Content = {
  code: string;
  frontMatter: FrontMatterType;
};
