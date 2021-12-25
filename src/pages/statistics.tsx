import * as React from 'react';
import { Column } from 'react-table';
import useSWR from 'swr';

import { pickContentMeta } from '@/lib/contentMeta';

import Layout from '@/components/layout/Layout';
import ReactTable from '@/components/ReactTable';
import Seo from '@/components/Seo';

import { contentMetaFlag } from '@/constants/env';

import { ContentMeta } from '@/types/fauna';

export default function StatisticsPage() {
  const { data: contentMeta } = useSWR<Array<ContentMeta>>(
    contentMetaFlag ? '/api/content' : null
  );

  //#region  //*=========== BlogColumns ===========
  const rawBlogs = pickContentMeta(contentMeta, 'blog');
  const blogs = rawBlogs.map((blog) => ({
    ...blog,
    webViews: blog.views - (blog?.devtoViews || 0),
  }));
  const blogColumns = React.useMemo<Column<typeof blogs[number]>[]>(
    () => [
      {
        Header: 'Blog Slug',
        accessor: 'slug',
        sortDescFirst: true,
      },
      {
        Header: 'Total Views',
        accessor: 'views',
        Cell: ({ value }) => value.toLocaleString(),
        sortDescFirst: true,
      },
      {
        Header: 'Web Views',
        accessor: 'webViews',
        Cell: ({ value }) => value.toLocaleString(),
        sortDescFirst: true,
      },
      {
        Header: 'Dev.to',
        accessor: 'devtoViews',
        Cell: ({ value }) => value?.toLocaleString() || '-',
        sortDescFirst: true,
      },
      {
        Header: 'Likes',
        accessor: 'likes',
        Cell: ({ value }) => value.toLocaleString(),
        sortDescFirst: true,
      },
    ],
    []
  );
  //#endregion  //*======== BlogColumns ===========

  //#region  //*=========== ProjectColumns ===========
  const projects = pickContentMeta(contentMeta, 'projects');
  const projectColumns = React.useMemo<Column<ContentMeta>[]>(
    () => [
      {
        Header: 'Project Slug',
        accessor: 'slug',
        sortDescFirst: true,
      },
      {
        Header: 'Total Views',
        accessor: 'views',
        Cell: ({ value }) => value.toLocaleString(),
        sortDescFirst: true,
      },
      {
        Header: 'Likes',
        accessor: 'likes',
        Cell: ({ value }) => value.toLocaleString(),
        sortDescFirst: true,
      },
    ],
    []
  );
  //#endregion  //*======== ProjectColumns ===========

  //#region  //*=========== LibraryColumns ===========
  const libraries = pickContentMeta(contentMeta, 'library');
  const libraryColumns = React.useMemo<Column<ContentMeta>[]>(
    () => [
      {
        Header: 'Library Slug',
        accessor: 'slug',
        sortDescFirst: true,
      },
      {
        Header: 'Total Views',
        accessor: 'views',
        Cell: ({ value }) => value.toLocaleString(),
        sortDescFirst: true,
      },
      {
        Header: 'Likes',
        accessor: 'likes',
        Cell: ({ value }) => value.toLocaleString(),
        sortDescFirst: true,
      },
    ],
    []
  );
  //#endregion  //*======== LibraryColumns ===========

  return (
    <Layout>
      <Seo templateTitle='Statistics' />

      <main>
        <section className=''>
          <div className='layout py-12'>
            <h1>Statistics</h1>

            <h2 className='h3 mt-8'>Blog</h2>
            {blogs && (
              <ReactTable
                className='mt-4'
                data={blogs}
                columns={blogColumns}
                options={{ autoResetSortBy: false }}
              />
            )}

            <h2 className='h3 mt-8'>Projects</h2>
            {projects && (
              <ReactTable
                className='mt-4'
                data={projects}
                columns={projectColumns}
                options={{ autoResetSortBy: false }}
              />
            )}

            <h2 className='h3 mt-8'>Libraries</h2>
            {libraries && (
              <ReactTable
                className='mt-4'
                data={libraries}
                columns={libraryColumns}
                options={{ autoResetSortBy: false }}
              />
            )}
          </div>
        </section>
      </main>
    </Layout>
  );
}
