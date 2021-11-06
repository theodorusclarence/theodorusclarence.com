import { InferGetStaticPropsType } from 'next';
import * as React from 'react';

import { getAllFilesFrontMatter } from '@/lib/mdx';
import { getTags, sortByDate, sortDateFn } from '@/lib/mdx-client';
import useInjectContentMeta from '@/hooks/useInjectContentMeta';

import Accent from '@/components/Accent';
import BlogCard from '@/components/blog/BlogCard';
import SubscribeCard from '@/components/blog/SubscribeCard';
import Button from '@/components/buttons/Button';
import StyledInput from '@/components/form/StyledInput';
import Layout from '@/components/layout/Layout';
import ContentPlaceholder from '@/components/mdx/ContentPlaceholder';
import Tag from '@/components/mdx/Tag';
import Seo from '@/components/Seo';
import SortListbox, { SortOption } from '@/components/SortListbox';

import { BlogFrontmatter, InjectedMeta } from '@/types/content';

const sortOptions: Array<SortOption> = [
  {
    id: 'date',
    name: 'Sort by date',
  },
  { id: 'views', name: 'Sort by views' },
];

export default function IndexPage({
  posts,
  tags,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [sortOrder, setSortOrder] = React.useState<SortOption>(sortOptions[0]);
  const [isEnglish, setIsEnglish] = React.useState<boolean>(true);

  const populatedPosts = useInjectContentMeta('blog', posts);

  //#region  //*=========== Search ===========
  const [search, setSearch] = React.useState<string>('');
  const [filteredPosts, setFilteredPosts] = React.useState<
    Array<BlogFrontmatter & InjectedMeta>
  >(() => [...posts]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const clearSearch = () => setSearch('');

  React.useEffect(() => {
    const timer = setTimeout(() => {
      const results = populatedPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(search.toLowerCase()) ||
          post.description.toLowerCase().includes(search.toLowerCase()) ||
          // Check if splitted search contained in tag
          search
            .toLowerCase()
            .split(' ')
            .every((tag) => post.tags.includes(tag))
      );

      if (sortOrder.id === 'date') {
        results.sort(sortDateFn);
      } else if (sortOrder.id === 'views') {
        results.sort((a, b) => (b?.views ?? 0) - (a?.views ?? 0));
      }

      setFilteredPosts(results);
    }, 200);

    return () => clearTimeout(timer);
  }, [search, sortOrder.id, populatedPosts]);
  //#endregion  //*======== Search ===========

  //#region  //*=========== Post Language Splitter ===========
  const englishPosts = filteredPosts.filter((p) => !p.slug.startsWith('id-'));
  const bahasaPosts = filteredPosts.filter((p) => p.slug.startsWith('id-'));
  const currentPosts = isEnglish ? englishPosts : bahasaPosts;
  //#endregion  //*======== Post Language Splitter ===========

  //#region  //*=========== Tag ===========
  const toggleTag = (tag: string) => {
    // If tag is already there, then remove
    if (search.includes(tag)) {
      setSearch((s) =>
        s
          .split(' ')
          .filter((t) => t !== tag)
          ?.join(' ')
      );
    } else {
      // append tag
      setSearch((s) => (s !== '' ? `${s.trim()} ${tag}` : tag));
    }
  };

  // Currently available tags based on filtered posts
  const filteredTags = getTags(currentPosts);
  //#endregion  //*======== Tag ===========

  return (
    <Layout>
      <Seo templateTitle='Blog' />

      <main>
        <section>
          <div className='py-12 layout'>
            <h1>
              <Accent>Blog {!isEnglish && 'Bahasa Indonesia'}</Accent>
            </h1>
            <p className='mt-2 text-sm text-gray-600 dark:text-gray-300'>
              Thoughts and tutorials about Front-end Development
            </p>
            <StyledInput
              className='mt-4'
              placeholder='Search...'
              onChange={handleSearch}
              value={search}
              type='text'
            />
            <p className='text-sm leading-loose text-gray-600 dark:text-gray-300'>
              Try something like{' '}
              {tags.map((tag, i) => (
                <React.Fragment key={tag}>
                  <Tag
                    className='mt-2'
                    onClick={() => toggleTag(tag)}
                    disabled={!filteredTags.includes(tag)}
                  >
                    {/* Show accent if not disabled, and selected */}
                    {filteredTags.includes(tag) &&
                    search.toLowerCase().split(' ').includes(tag) ? (
                      <Accent>{tag}</Accent>
                    ) : (
                      tag
                    )}
                  </Tag>
                  <span className='inline-block w-3'>
                    {tags.length - 1 !== i ? ' , ' : ' '}
                  </span>
                </React.Fragment>
              ))}
            </p>
            <div className='relative z-10 flex flex-col items-end gap-4 mt-4 text-gray-600 md:items-center dark:text-gray-300 md:flex-row md:justify-between'>
              <Button
                onClick={() => {
                  setIsEnglish((b) => !b);
                  clearSearch();
                }}
                className='text-sm !font-medium'
              >
                Read in {isEnglish ? 'Bahasa Indonesia' : 'English'}
              </Button>
              <SortListbox
                selected={sortOrder}
                setSelected={setSortOrder}
                options={sortOptions}
              />
            </div>
            <ul className='grid gap-4 mt-4 sm:grid-cols-2 xl:grid-cols-3'>
              {currentPosts.length > 0 ? (
                currentPosts.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))
              ) : (
                <ContentPlaceholder />
              )}
            </ul>
            <SubscribeCard className='mt-8' />
          </div>
        </section>
      </main>
    </Layout>
  );
}

export async function getStaticProps() {
  const files = await getAllFilesFrontMatter('blog');
  const posts = sortByDate(files);

  // Accumulate tags and remove duplicate
  const tags = getTags(posts);

  return { props: { posts, tags } };
}
