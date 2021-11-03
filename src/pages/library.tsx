import { InferGetStaticPropsType } from 'next';
import * as React from 'react';

import { getAllFilesFrontMatter } from '@/lib/mdx';
import { getTags, sortByTitle, sortTitleFn } from '@/lib/mdx-client';

import Accent from '@/components/Accent';
import StyledInput from '@/components/form/StyledInput';
import Layout from '@/components/layout/Layout';
import LibraryCard from '@/components/library/LibraryCard';
import ContentPlaceholder from '@/components/mdx/ContentPlaceholder';
import Tag from '@/components/mdx/Tag';
import Seo from '@/components/Seo';
import SortListbox, { SortOption } from '@/components/SortListbox';

import { LibraryFrontmatter } from '@/types/content';

const sortOptions: Array<SortOption> = [
  {
    id: 'name',
    name: 'Sort by name',
  },
  { id: 'popular', name: 'Sort by popularity' },
];

export default function LibraryPage({
  snippets,
  tags,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [sortOrder, setSortOrder] = React.useState<SortOption>(sortOptions[0]);

  //#region  //*=========== Search ===========
  const [search, setSearch] = React.useState<string>('');
  const [filtered, setFiltered] = React.useState<Array<LibraryFrontmatter>>(
    () => [...snippets]
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  React.useEffect(() => {
    const timer = setTimeout(() => {
      const results = snippets.filter(
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
      }
      // } else if (sortOrder.id === 'views') {
      //   results.sort((a, b) => a?.views < b?.views);
      // }

      setFiltered(results);
    }, 100);

    return () => clearTimeout(timer);
  }, [search, snippets, sortOrder.id]);
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

  // Currently available tags based on filtered posts
  const filteredTags = getTags(filtered);
  //#endregion  //*======== Tag ===========

  return (
    <Layout>
      <Seo templateTitle='Library' />

      <main>
        <section className=''>
          <div className='py-12 layout'>
            <h1>
              <Accent>Library</Accent>
            </h1>
            <p className='mt-2 text-sm text-gray-600 dark:text-gray-300'>
              Some collection of code snippets that I put for easy access, feel
              free to reuse!
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
            <div className='relative z-10 flex flex-col items-end gap-4 mt-4 text-gray-600 md:mt-8 dark:text-gray-300'>
              <SortListbox
                selected={sortOrder}
                setSelected={setSortOrder}
                options={sortOptions}
              />
            </div>

            <ul className='grid gap-4 mt-4 sm:grid-cols-2 xl:grid-cols-3'>
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
  const files = await getAllFilesFrontMatter('library');
  const snippets = sortByTitle(files);

  // Accumulate tags and remove duplicate
  const tags = getTags(snippets);

  return { props: { snippets, tags } };
}
