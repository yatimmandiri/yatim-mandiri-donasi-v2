'use client';

import { BlogProvider } from '@/hooks/useBlog';
import { NewsProvider } from '@/hooks/useNews';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import classNames from 'classnames';
import { useState } from 'react';
import { BlogComponent } from './BlogComponent';
import { NewsComponent } from './NewsComponent';

export const PilihanLiterasiComponent = ({ news = [], blogs = [] }) => {
  const tabsList = ['News', 'Blog'];

  const [tabActive, setTabActive] = useState(0);

  return (
    <TabGroup
      className='flex flex-col space-y-4'
      defaultIndex={tabActive}
      onChange={(index) => {
        setTabActive(index);
      }}
    >
      <TabList
        className={classNames(
          'flex space-x-2 w-36 p-1 items-center justify-center rounded-full mx-auto bg-baseColor-500'
        )}
      >
        {tabsList.map((tab, i) => (
          <Tab
            key={i}
            className={classNames(
              'outline-none p-1 inline-flex justify-center items-center w-full text-sm hover:rounded-full hover:bg-baseColor-400 text-white',
              tabActive == i && 'bg-baseColor-400 rounded-full'
            )}
          >
            {tab}
          </Tab>
        ))}
      </TabList>
      <TabPanels>
        {tabsList.map((tab, i) => (
          <TabPanel key={i}>
            {i == 0 ? (
              <NewsProvider data={news?.data} dataTotal={news?.total}>
                <NewsComponent />
              </NewsProvider>
            ) : (
              <BlogProvider data={blogs?.data} dataTotal={blogs?.total}>
                <BlogComponent />
              </BlogProvider>
            )}
          </TabPanel>
        ))}
      </TabPanels>
    </TabGroup>
  );
};
