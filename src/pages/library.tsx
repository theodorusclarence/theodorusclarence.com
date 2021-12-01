import clsx from 'clsx';
import { InferGetStaticPropsType } from 'next';
import * as React from 'react';
import { GiTechnoHeart } from 'react-icons/gi';
import { HiSortAscending } from 'react-icons/hi';

import { getAllFilesFrontmatter } from '@/lib/mdx';
import { getTags, sortByTitle, sortTitleFn } from '@/lib/mdx-client';
import useInjectContentMeta from '@/hooks/useInjectContentMeta';
import useLoaded from '@/hooks/useLoaded';

import Accent from '@/components/Accent';
import ContentPlaceholder from '@/components/content/ContentPlaceholder';
import LibraryCard from '@/components/content/library/LibraryCard';
import Tag from '@/components/content/Tag';
import StyledInput from '@/components/form/StyledInput';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import SortListbox, { SortOption } from '@/components/SortListbox';

import { LibraryFrontmatter } from '@/types/frontmatters';

const sortOptions: Array<SortOption> = [
  {
    id: 'name',
    name: 'Sort by name',
    icon: HiSortAscending,
  },
  { id: 'popular', name: 'Sort by popularity', icon: GiTechnoHeart },
];

export default function LibraryPage({
  snippets,
  tags,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [sortOrder, setSortOrder] = React.useState<SortOption>(sortOptions[0]);
  const isLoaded = useLoaded();

  const populatedPosts = useInjectContentMeta('library', snippets);

  //#region  //*=========== Search ===========
  const [search, setSearch] = React.useState<string>('');
  const [filtered, setFiltered] = React.useState<Array<LibraryFrontmatter>>(
    () => [...snippets]
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  React.useEffect(() => {
    const results = populatedPosts.filter(
      (snippet) =>
        snippet.title.toLowerCase().includes(search.toLowerCase()) ||
        snippet.description.toLowerCase().includes(search.toLowerCase()) ||
        // Check if splitted search contained in tag
        search
          .toLowerCase()
          .split(' ')
          .every((tag) => snippet.tags.includes(tag))
    );

    if (sortOrder.id === 'date') {
      results.sort(sortTitleFn);
    } else if (sortOrder.id === 'popular') {
      results.sort((a, b) => (b?.likes ?? 0) - (a?.likes ?? 0));
    }

    setFiltered(results);
  }, [populatedPosts, search, sortOrder.id]);
  //#endregion  //*======== Search ===========

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

  /** Currently available tags based on filtered library */
  const filteredTags = getTags(filtered);

  /** Show accent if not disabled and selected  */
  const checkTagged = (tag: string) => {
    return (
      filteredTags.includes(tag) &&
      search.toLowerCase().split(' ').includes(tag)
    );
  };
  //#endregion  //*======== Tag ===========

  return (
    <Layout>
      <Seo
        templateTitle='Library'
        description='Some collection of code snippets that I put for easy access, feel free to reuse!'
      />

      <main>
        <section className={clsx(isLoaded && 'fade-in-start')}>
          <div className='layout py-12'>
            <h1 className='text-3xl md:text-5xl' data-fade='0'>
              <Accent>Library</Accent>
            </h1>
            <p className='mt-2 text-gray-600 dark:text-gray-300' data-fade='1'>
              Some collection of code snippets that I put for easy access, feel
              free to reuse!
            </p>
            <StyledInput
              data-fade='2'
              className='mt-4'
              placeholder='Search...'
              onChange={handleSearch}
              value={search}
              type='text'
            />
            <div
              className='flex flex-wrap gap-2 justify-start items-baseline mt-2 text-sm text-gray-600 dark:text-gray-300'
              data-fade='3'
            >
              <span className='font-medium'>Choose topic:</span>
              {tags.map((tag) => (
                <Tag
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  disabled={!filteredTags.includes(tag)}
                >
                  {checkTagged(tag) ? <Accent>{tag}</Accent> : tag}
                </Tag>
              ))}
            </div>
            <div
              className='flex relative z-10 flex-col gap-4 items-end mt-4 text-gray-600 md:mt-8 dark:text-gray-300'
              data-fade='4'
            >
              <SortListbox
                selected={sortOrder}
                setSelected={setSortOrder}
                options={sortOptions}
              />
            </div>

            <ul
              className='grid gap-4 mt-4 sm:grid-cols-2 xl:grid-cols-3'
              data-fade='5'
            >
              {filtered.length > 0 ? (
                filtered.map((snippet) => (
                  <LibraryCard key={snippet.slug} snippet={snippet} />
                ))
              ) : (
                <ContentPlaceholder />
              )}
            </ul>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export async function getStaticProps() {
  const files = await getAllFilesFrontmatter('library');
  const snippets = sortByTitle(files);

  // Accumulate tags and remove duplicate
  const tags = getTags(snippets);

  return { props: { snippets, tags } };
}
