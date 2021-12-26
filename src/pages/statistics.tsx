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
        Footer: 'Total',
        accessor: 'slug',
        sortDescFirst: true,
      },
      {
        Header: 'Total Views',
        accessor: 'views',
        Cell: ({ value }) => value.toLocaleString(),
        Footer: ({ rows }) =>
          React.useMemo(
            () => rows.reduce((sum, row) => sum + row.original.views, 0),
            [rows]
          ).toLocaleString(),
        sortDescFirst: true,
      },
      {
        Header: 'Web Views',
        accessor: 'webViews',
        Cell: ({ value }) => value.toLocaleString(),
        Footer: ({ rows }) =>
          React.useMemo(
            () => rows.reduce((sum, row) => sum + row.original.webViews, 0),
            [rows]
          ).toLocaleString(),
        sortDescFirst: true,
      },
      {
        Header: 'Dev.to',
        accessor: 'devtoViews',
        Cell: ({ value }) => value?.toLocaleString() || '-',
        Footer: ({ rows }) =>
          React.useMemo(
            () =>
              rows.reduce(
                (sum, row) => sum + (row.original?.devtoViews ?? 0),
                0
              ),
            [rows]
          ).toLocaleString(),
        sortDescFirst: true,
      },
      {
        Header: 'Likes',
        accessor: 'likes',
        Cell: ({ value }) => value.toLocaleString(),
        Footer: ({ rows }) =>
          React.useMemo(
            () => rows.reduce((sum, row) => sum + row.original.likes, 0),
            [rows]
          ).toLocaleString(),
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
        Footer: 'Total',
        sortDescFirst: true,
      },
      {
        Header: 'Total Views',
        accessor: 'views',
        Cell: ({ value }) => value.toLocaleString(),
        Footer: ({ rows }) =>
          React.useMemo(
            () => rows.reduce((sum, row) => sum + row.original.views, 0),
            [rows]
          ).toLocaleString(),
        sortDescFirst: true,
      },
      {
        Header: 'Likes',
        accessor: 'likes',
        Cell: ({ value }) => value.toLocaleString(),
        Footer: ({ rows }) =>
          React.useMemo(
            () => rows.reduce((sum, row) => sum + row.original.likes, 0),
            [rows]
          ).toLocaleString(),
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
        Footer: 'Total',
        sortDescFirst: true,
      },
      {
        Header: 'Total Views',
        accessor: 'views',
        Cell: ({ value }) => value.toLocaleString(),
        Footer: ({ rows }) =>
          React.useMemo(
            () => rows.reduce((sum, row) => sum + row.original.views, 0),
            [rows]
          ).toLocaleString(),
        sortDescFirst: true,
      },
      {
        Header: 'Likes',
        accessor: 'likes',
        Cell: ({ value }) => value.toLocaleString(),
        Footer: ({ rows }) =>
          React.useMemo(
            () => rows.reduce((sum, row) => sum + row.original.likes, 0),
            [rows]
          ).toLocaleString(),
        sortDescFirst: true,
      },
    ],
    []
  );
  //#endregion  //*======== LibraryColumns ===========

  return (
    <Layout>
      <Seo
        templateTitle='Statistics'
        description='Metadata statistics of theodorusclarence.com blogs, projects and libraries.'
      />

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
                options={{
                  autoResetSortBy: false,
                  autoResetGlobalFilter: false,
                }}
              />
            )}

            <h2 className='h3 mt-8'>Projects</h2>
            {projects && (
              <ReactTable
                className='mt-4'
                data={projects}
                columns={projectColumns}
                options={{
                  autoResetSortBy: false,
                  autoResetGlobalFilter: false,
                }}
              />
            )}

            <h2 className='h3 mt-8'>Libraries</h2>
            {libraries && (
              <ReactTable
                className='mt-4'
                data={libraries}
                columns={libraryColumns}
                options={{
                  autoResetSortBy: false,
                  autoResetGlobalFilter: false,
                }}
              />
            )}
          </div>
        </section>
      </main>
    </Layout>
  );
}
