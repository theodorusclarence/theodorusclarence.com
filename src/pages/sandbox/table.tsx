import { ColumnDef } from '@tanstack/react-table';
import * as React from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Table from '@/components/table/Table';

export default function TablePage() {
  const columns: ColumnDef<(typeof data)[number]>[] = [
    {
      accessorKey: 'name',
      header: 'Role',
      // To set size, add size in pixel
      size: 200,
    },
    {
      accessorKey: 'email',
      header: 'Email',
      footer: ({ table }) =>
        table.getFilteredRowModel().rows.reduce((sum) => sum + 1, 0),
      meta: {
        align: 'right',
      },
    },
    {
      accessorKey: 'country',
      header: 'Country',
    },
  ];
  //#endregion  //*======== Table Definition ===========

  return (
    <Layout>
      <Seo templateTitle='Table' />

      <main>
        <section className=''>
          <div className='layout'>
            <Table withFilter withFooter columns={columns} data={data} />
          </div>
        </section>
      </main>
    </Layout>
  );
}

const data = [
  {
    id: 1,
    name: 'User 1',
    email: 'user1@mail.com',
    country: 'Malaysia',
  },
  {
    id: 2,
    name: 'User 2',
    email: 'user2@mail.com',
    country: 'Singapore',
  },
  {
    id: 3,
    name: 'User 3',
    email: 'user3@mail.com',
    country: 'Malaysia',
  },
  {
    id: 4,
    name: 'User 4',
    email: 'user4@mail.com',
    country: 'Indonesia',
  },
  {
    id: 5,
    name: 'User 5',
    email: 'user5@mail.com',
    country: 'Malaysia',
  },
  {
    id: 6,
    name: 'User 6',
    email: 'user6@mail.com',
    country: 'Singapore',
  },
  {
    id: 7,
    name: 'User 7',
    email: 'user7@mail.com',
    country: 'Indonesia',
  },
  {
    id: 8,
    name: 'User 8',
    email: 'user8@mail.com',
    country: 'Malaysia',
  },
  {
    id: 9,
    name: 'User 9',
    email: 'user9@mail.com',
    country: 'Indonesia',
  },
  {
    id: 10,
    name: 'User 10',
    email: 'user10@mail.com',
    country: 'Malaysia',
  },
  {
    id: 11,
    name: 'User 11',
    email: 'user11@mail.com',
    country: 'Malaysia',
  },
  {
    id: 12,
    name: 'User 12',
    email: 'user12@mail.com',
    country: 'Malaysia',
  },
  {
    id: 13,
    name: 'User 13',
    email: 'user13@mail.com',
    country: 'Malaysia',
  },
  {
    id: 14,
    name: 'User 14',
    email: 'user14@mail.com',
    country: 'Indonesia',
  },
  {
    id: 15,
    name: 'User 15',
    email: 'user15@mail.com',
    country: 'Indonesia',
  },
  {
    id: 16,
    name: 'User 16',
    email: 'user16@mail.com',
    country: 'Malaysia',
  },
  {
    id: 17,
    name: 'User 17',
    email: 'user17@mail.com',
    country: 'Singapore',
  },
  {
    id: 18,
    name: 'User 18',
    email: 'user18@mail.com',
    country: 'Indonesia',
  },
  {
    id: 19,
    name: 'User 19',
    email: 'user19@mail.com',
    country: 'Singapore',
  },
  {
    id: 20,
    name: 'User 20',
    email: 'user20@mail.com',
    country: 'Malaysia',
  },
];
