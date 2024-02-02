import { useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import clsx from 'clsx';
import * as React from 'react';

import { pickContentMeta } from '@/lib/contentMeta';
import { getContentMeta } from '@/lib/requests/content-meta';

import Layout from '@/components/layout/Layout';
import UnstyledLink from '@/components/links/UnstyledLink';
import Seo from '@/components/Seo';
import Table from '@/components/table/Table';

import { contentMetaFlag } from '@/constants/env';

export default function StatisticsPage() {
  const { data: contentMeta } = useQuery({
    queryKey: ['contents'],
    queryFn: getContentMeta,
    enabled: contentMetaFlag,
  });

  //#region  //*=========== BlogColumns ===========
  const rawBlogs = pickContentMeta(contentMeta, 'blog');
  const blogs = rawBlogs.map((blog) => ({
    ...blog,
    webViews: blog.views - (blog?.devtoViews || 0),
  }));
  const blogColumns: ColumnDef<(typeof blogs)[number]>[] = [
    {
      accessorKey: 'slug',
      header: 'Slug',
      cell: ({ row }) => (
        <UnstyledLink
          className='font-medium'
          openNewTab
          href={`/blog/${row.original.slug}?ref=statistics`}
        >
          {row.original.slug}
        </UnstyledLink>
      ),
      footer: 'Total',
      sortDescFirst: true,
    },
    {
      accessorKey: 'views',
      header: 'Total Views',
      cell: ({ row }) => row.original.views.toLocaleString(),
      footer: ({ table }) =>
        table
          .getFilteredRowModel()
          .rows.reduce((sum, row) => sum + row.original.views, 0)
          .toLocaleString(),
      meta: {
        align: 'right',
      },
    },
    {
      accessorKey: 'webViews',
      header: 'Web Views',
      cell: ({ row }) => row.original.webViews.toLocaleString(),
      footer: ({ table }) =>
        table
          .getFilteredRowModel()
          .rows.reduce((sum, row) => sum + row.original.webViews, 0)
          .toLocaleString(),
      meta: {
        align: 'right',
      },
    },
    {
      accessorKey: 'devtoViews',
      header: 'dev.to',
      cell: ({ row }) =>
        row.original.devtoViews
          ? row.original.devtoViews.toLocaleString()
          : '-',
      footer: ({ table }) =>
        table
          .getFilteredRowModel()
          .rows.reduce((sum, row) => sum + (row.original.devtoViews ?? 0), 0)
          .toLocaleString(),
      meta: {
        align: 'right',
      },
    },
    {
      accessorKey: 'likes',
      header: 'Likes',
      cell: ({ row }) => row.original.likes.toLocaleString(),
      footer: ({ table }) =>
        table
          .getFilteredRowModel()
          .rows.reduce((sum, row) => sum + row.original.likes, 0)
          .toLocaleString(),
      meta: {
        align: 'right',
      },
    },
  ];
  //#endregion  //*======== BlogColumns ===========

  //#region  //*=========== ProjectColumns ===========
  const projects = pickContentMeta(contentMeta, 'projects');
  const projectColumns: ColumnDef<(typeof projects)[number]>[] = [
    {
      accessorKey: 'slug',
      header: 'Slug',
      cell: ({ row }) => (
        <UnstyledLink
          className='font-medium'
          openNewTab
          href={`/projects/${row.original.slug}?ref=statistics`}
        >
          {row.original.slug}
        </UnstyledLink>
      ),
      footer: 'Total',
      sortDescFirst: true,
    },
    {
      accessorKey: 'views',
      header: 'Total Views',
      cell: ({ row }) => row.original.views.toLocaleString(),
      footer: ({ table }) =>
        table
          .getFilteredRowModel()
          .rows.reduce((sum, row) => sum + row.original.views, 0)
          .toLocaleString(),
      meta: {
        align: 'right',
      },
    },
    {
      accessorKey: 'likes',
      header: 'Likes',
      cell: ({ row }) => row.original.likes.toLocaleString(),
      footer: ({ table }) =>
        table
          .getFilteredRowModel()
          .rows.reduce((sum, row) => sum + row.original.likes, 0)
          .toLocaleString(),
      meta: {
        align: 'right',
      },
    },
  ];
  //#endregion  //*======== ProjectColumns ===========

  //#region  //*=========== LibraryColumns ===========
  const shorts = pickContentMeta(contentMeta, 'library');
  const shortsColumns: ColumnDef<(typeof shorts)[number]>[] = [
    {
      accessorKey: 'slug',
      header: 'Slug',
      cell: ({ row }) => (
        <UnstyledLink
          className='font-medium'
          openNewTab
          href={`/shorts/${row.original.slug}?ref=statistics`}
        >
          {row.original.slug}
        </UnstyledLink>
      ),
      footer: 'Total',
      sortDescFirst: true,
    },
    {
      accessorKey: 'views',
      header: 'Total Views',
      cell: ({ row }) => row.original.views.toLocaleString(),
      footer: ({ table }) =>
        table
          .getFilteredRowModel()
          .rows.reduce((sum, row) => sum + row.original.views, 0)
          .toLocaleString(),
      meta: {
        align: 'right',
      },
    },
    {
      accessorKey: 'likes',
      header: 'Likes',
      cell: ({ row }) => row.original.likes.toLocaleString(),
      footer: ({ table }) =>
        table
          .getFilteredRowModel()
          .rows.reduce((sum, row) => sum + row.original.likes, 0)
          .toLocaleString(),
      meta: {
        align: 'right',
      },
    },
  ];
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
      title: 'Shorts',
      count: shorts.length,
      views: shorts
        .reduce((sum, short) => sum + short.views, 0)
        .toLocaleString(),
      likes: shorts
        .reduce((sum, short) => sum + short.likes, 0)
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
              <Table
                withFilter
                withFooter
                className='mt-4'
                data={blogs}
                columns={blogColumns}
              />
            )}

            <h2 className='h3 mt-8'>Projects</h2>
            {projects && (
              <Table
                withFilter
                withFooter
                className='mt-4'
                data={projects}
                columns={projectColumns}
              />
            )}

            <h2 className='h3 mt-8'>Shorts</h2>
            {shorts && (
              <Table
                withFilter
                withFooter
                className='mt-4'
                data={shorts}
                columns={shortsColumns}
              />
            )}
          </div>
        </section>
      </main>
    </Layout>
  );
}
