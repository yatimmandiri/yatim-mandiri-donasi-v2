'use client';

import { AccordionComponent } from '@/components/partials/DisclosureComponent';
import { useEffect, useState } from 'react';

export const FaqComponent = ({ data = [] }) => {
  const [isActive, setIsActive] = useState(null);

  useEffect(() => {}, [isActive]);

  return (
    <section className='flex flex-col space-y-4'>
      <span className='text-center font-semibold text-sm'>FAQ</span>
      <div className='grid grid-cols-1 gap-2'>
        {data.map((item, i) => (
          <AccordionComponent
            key={i}
            onClick={() => setIsActive(isActive == i ? null : i)}
            isActive={isActive === i ? true : false}
            title={item.name}
          >
            {item.content}
          </AccordionComponent>
        ))}
      </div>
    </section>
  );
};
