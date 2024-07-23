import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Transition,
} from '@headlessui/react';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';

export const AccordionComponent = ({
  isActive = false,
  title = false,
  children,
  ...props
}) => {
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
            {title && <span className='font-semibold'>{title}</span>}
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
  );
};
