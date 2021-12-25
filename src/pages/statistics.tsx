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

  const blogs = pickContentMeta(contentMeta, 'blog');
  const libraries = pickContentMeta(contentMeta, 'library');
  const projects = pickContentMeta(contentMeta, 'projects');

  //#region  //*=========== BlogColumns ===========
  const blogColumns: readonly Column<ContentMeta>[] = React.useMemo(
    () => [
      {
        Header: 'Blog Slug',
        accessor: 'slug' as const,
        sortDescFirst: true,
      },
      {
        Header: 'Total Views',
        accessor: (d) => d.views.toLocaleString(),
        sortDescFirst: true,
        sortType: 'number',
      },
      {
        Header: 'Web Views',
        accessor: (d) => (d.views - (d?.devtoViews || 0)).toLocaleString(),
        sortDescFirst: true,
        sortType: 'number',
      },
      {
        Header: 'Dev.to',
        accessor: (d) => d.devtoViews?.toLocaleString() || '-',
        sortDescFirst: true,
        sortType: 'number',
      },
      {
        Header: 'Likes',
        accessor: (d) => d.likes.toLocaleString(),
        sortDescFirst: true,
        sortType: 'number',
      },
    ],
    []
  );
  //#endregion  //*======== BlogColumns ===========

  //#region  //*=========== ProjectColumns ===========
  const projectColumns: readonly Column<ContentMeta>[] = React.useMemo(
    () => [
      {
        Header: 'Project Slug',
        accessor: 'slug' as const,
        sortDescFirst: true,
      },
      {
        Header: 'Total Views',
        accessor: (d) => d.views.toLocaleString(),
        sortDescFirst: true,
        sortType: 'number',
      },
      {
        Header: 'Likes',
        accessor: (d) => d.likes.toLocaleString(),
        sortDescFirst: true,
        sortType: 'number',
      },
    ],
    []
  );
  //#endregion  //*======== ProjectColumns ===========

  //#region  //*=========== LibraryColumns ===========
  const libraryColumns: readonly Column<ContentMeta>[] = React.useMemo(
    () => [
      {
        Header: 'Library Slug',
        accessor: 'slug' as const,
        sortDescFirst: true,
      },
      {
        Header: 'Total Views',
        accessor: (d) => d.views.toLocaleString(),
        sortDescFirst: true,
        sortType: 'number',
      },
      {
        Header: 'Likes',
        accessor: (d) => d.likes.toLocaleString(),
        sortDescFirst: true,
        sortType: 'number',
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
              <ReactTable className='mt-4' data={blogs} columns={blogColumns} />
            )}

            <h2 className='h3 mt-8'>Projects</h2>
            {projects && (
              <ReactTable
                className='mt-4'
                data={projects}
                columns={projectColumns}
              />
            )}

            <h2 className='h3 mt-8'>Libraries</h2>
            {libraries && (
              <ReactTable
                className='mt-4'
                data={libraries}
                columns={libraryColumns}
              />
            )}
          </div>
        </section>
      </main>
    </Layout>
  );
}
