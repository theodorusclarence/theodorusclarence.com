import { ContentMeta, View } from '@prisma/client';
import { AreaChart, BarList } from '@tremor/react';
import { format, getDate, getHours, getMonth } from 'date-fns';
import * as React from 'react';
import useSWR from 'swr';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

type AnalyticsData = (View & {
  ContentMeta: ContentMeta | null;
})[];

const unitFunctions = {
  hour: [
    getHours,
    (hour: string) => `${hour.padStart(2, '0')}:00`,
    (date: Date) => format(date, 'dd MMM yyyy'),
  ],
  day: [
    getDate,
    (day: string) => day,
    (date: Date) => format(date, 'MMM yyyy'),
  ],
  month: [
    getMonth,
    (month: string) => `${month.padStart(2, '0')}`,
    (date: Date) => format(date, 'yyyy'),
  ],
} as const;

function getChartData({
  data,
  unit,
}: {
  data?: AnalyticsData;
  unit: 'hour' | 'day' | 'month';
}) {
  const chartData: { [key: string]: { views: number; date: string } } = {};
  const [get, formatIndex, formatDate] = unitFunctions[unit];

  // Loop through the data and parse the createdAt date to hourly format
  data?.forEach((item) => {
    const date = new Date(item.createdAt);
    const quantifier = get(date);

    // Increment the views count for the corresponding hour
    chartData[quantifier.toString()] = {
      views: (chartData[quantifier.toString()]?.views || 0) + 1,
      date: formatDate(date),
    };
  });

  return Object.entries(chartData).map(([hour, item]) => ({
    index: `${formatIndex(hour)} - ${item.date}`,
    Views: item.views,
  }));
}

function getBarlistData({ data }: { data?: AnalyticsData }) {
  const viewPerSlug: { [key: string]: number } = {};
  data?.forEach((item) => {
    const slug = item.ContentMeta?.slug || 'unknown';
    viewPerSlug[slug] = (viewPerSlug[slug] || 0) + 1;
  });

  return Object.entries(viewPerSlug)
    .map(([slug, views]) => ({
      name: slug,
      value: views,
    }))
    .sort((a, b) => b.value - a.value);
}

export default function AnalyticsPage() {
  const { data } = useSWR<AnalyticsData>(
    `/api/analytics?startDate=${new Date(
      '2023-06-25'
    ).toISOString()}&endDate=${new Date('2023-07-26').toISOString()}`
  );

  const chartData = getChartData({ data, unit: 'day' });
  const barData = getBarlistData({ data });

  return (
    <Layout>
      <Seo templateTitle='Analytics' />

      <main>
        <section className=''>
          <div className='layout'>
            <p>totalViews: {data?.length}</p>
            <AreaChart
              className='mt-10 h-80'
              data={chartData}
              index='index'
              categories={['Views']}
              colors={['blue']}
              showLegend={false}
              yAxisWidth={50}
            />
            <BarList
              data={barData}
              valueFormatter={(value) => value.toLocaleString()}
              className='mt-4 max-w-md'
            />
            <pre className='overflow-x-auto text-xs'></pre>
          </div>
        </section>
      </main>
    </Layout>
  );
}
