import clsx from 'clsx';
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
        align: 'right',
        Cell: ({ value }) => (
          <p className='text-right'>{value.toLocaleString()}</p>
        ),
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
        align: 'right',
        Cell: ({ value }) => (
          <p className='text-right'>{value.toLocaleString()}</p>
        ),
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
        align: 'right',
        Cell: ({ value }) => (
          <p className='text-right'>{value?.toLocaleString() || '-'}</p>
        ),
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
        align: 'right',
        Cell: ({ value }) => (
          <p className='text-right'>{value.toLocaleString()}</p>
        ),
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
        align: 'right',
        Cell: ({ value }) => (
          <p className='text-right'>{value.toLocaleString()}</p>
        ),
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
        align: 'right',
        Cell: ({ value }) => (
          <p className='text-right'>{value.toLocaleString()}</p>
        ),
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
        align: 'right',
        Cell: ({ value }) => (
          <p className='text-right'>{value.toLocaleString()}</p>
        ),
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
        align: 'right',
        Cell: ({ value }) => (
          <p className='text-right'>{value.toLocaleString()}</p>
        ),
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

  //#region  //*=========== Statistic Cards ===========
  const statCards = [
    {
      title: 'Blog',
      count: blogs.length,
      views: blogs.reduce((sum, blog) => sum + blog.views, 0).toLocaleString(),
      likes: blogs.reduce((sum, blog) => sum + blog.likes, 0).toLocaleString(),
    },
    {
      title: 'Projects',
      count: projects.length,
      views: projects
        .reduce((sum, project) => sum + project.views, 0)
        .toLocaleString(),
      likes: projects
        .reduce((sum, project) => sum + project.likes, 0)
        .toLocaleString(),
    },
    {
      title: 'Library',
      count: libraries.length,
      views: libraries
        .reduce((sum, library) => sum + library.views, 0)
        .toLocaleString(),
      likes: libraries
        .reduce((sum, library) => sum + library.likes, 0)
        .toLocaleString(),
    },
  ];
  //#endregion  //*======== Statistic Cards ===========

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

            <div className='mt-4 grid gap-6 sm:grid-cols-2 md:grid-cols-3'>
              {statCards.map((stat) => (
                <div
                  key={stat.title}
                  className={clsx(
                    'space-y-2 text-center',
                    'rounded-md bg-gray-50 p-6 shadow-sm dark:bg-gray-800',
                    'border border-gray-300 dark:border-gray-600'
                  )}
                >
                  <h3>{stat.title}</h3>
                  <div className='space-y-1'>
                    <p className='text-gray-800 dark:text-gray-200'>
                      <span className='h4 font-semibold'>
                        {stat.count ?? 0}
                      </span>{' '}
                      <span className='text-xs font-medium uppercase tracking-wider'>
                        posts
                      </span>
                    </p>
                    <p className='text-gray-800 dark:text-gray-200'>
                      <span className='h4 font-semibold'>{stat.views}</span>{' '}
                      <span className='text-xs font-medium uppercase tracking-wider'>
                        views
                      </span>
                    </p>
                    <p className='text-gray-800 dark:text-gray-200'>
                      <span className='h4 font-semibold'>{stat.likes}</span>{' '}
                      <span className='text-xs font-medium uppercase tracking-wider'>
                        likes
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>

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
