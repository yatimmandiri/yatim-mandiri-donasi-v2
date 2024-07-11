'use client';

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Transition,
} from '@headlessui/react';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { useEffect, useState } from 'react';

export const FaqComponent = ({ data = [] }) => {
  const [isActive, setIsActive] = useState(null);

  useEffect(() => {}, [isActive]);

  return (
    <section className='flex flex-col space-y-4'>
      <span className='text-center font-semibold text-sm'>FAQ</span>
      <div className='grid grid-cols-1 gap-2'>
        {data.map((item, i) => (
          <FaqItemComponent
            key={i}
            onClick={() => setIsActive(isActive == i ? null : i)}
            isActive={isActive === i ? true : false}
            title={item.name}
          >
            {item.content}
          </FaqItemComponent>
        ))}
      </div>
    </section>
  );
};

export const FaqItemComponent = ({ isActive, title, children, ...props }) => {
  return (
    <Disclosure as={'div'} className='rounded-lg block px-4 py-2 bg-gray-100'>
      {({ open }) => (
        <>
          <DisclosureButton
            className={classNames(
              'group flex flex-row items-center justify-between w-full',
              open ? 'rounded-t-lg' : 'rounded-lg'
            )}
            {...props}
          >
            <span className='font-semibold'>{title}</span>
            {!isActive ? (
              <PlusIcon className={classNames('h-3 w-3 text-black')} />
            ) : (
              <MinusIcon className={classNames('h-3 w-3 text-black')} />
            )}
          </DisclosureButton>
          <Transition
            show={isActive}
            as={DisclosurePanel}
            enter='transition duration-100 ease-out'
            enterFrom='transform scale-95 opacity-0'
            enterTo='transform scale-100 opacity-100'
            leave='transition duration-75 ease-out'
            leaveFrom='transform scale-100 opacity-100'
            leaveTo='transform scale-95 opacity-0'
            className={classNames('text-xs py-3')}
          >
            {children}
          </Transition>
        </>
      )}
    </Disclosure>
    // <Disclosure as={'div'} className='rounded-lg block px-4 py-2 bg-gray-100'>
    //   {({ open }) => (
    //     <>
    //       <DisclosureButton className='group flex flex-row items-center justify-between w-full'>
    //         <span className='font-semibold'>{title}</span>
    //         {!open ? (
    //           <PlusIcon className={classNames('h-3 w-3 text-black')} />
    //         ) : (
    //           <MinusIcon className={classNames('h-3 w-3 text-black')} />
    //         )}
    //       </DisclosureButton>
    //       {open && (
    //         <Transition
    //           show={isActive}
    //           enter='transition duration-100 ease-out'
    //           enterFrom='transform scale-95 opacity-0'
    //           enterTo='transform scale-100 opacity-100'
    //           leave='transition duration-75 ease-out'
    //           leaveFrom='transform scale-100 opacity-100'
    //           leaveTo='transform scale-95 opacity-0'
    //         >
    //           <DisclosurePanel static={true} className='text-xs py-2'>
    //             {children}
    //           </DisclosurePanel>
    //         </Transition>
    //       )}
    //     </>
    //   )}
    // </Disclosure>
  );
};
