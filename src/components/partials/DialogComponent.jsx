import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { ArrowLeftIcon, XMarkIcon } from '@heroicons/react/24/outline';

export const ModalComponent = ({
  modalTitle = false,
  isOpen = false,
  withHeader = false,
  handleOnChange = () => {},
  children,
}) => {
  return (
    <Transition
      as={Dialog}
      show={isOpen}
      enter='duration-200 ease-out'
      enterFrom='opacity-0'
      enterTo='opacity-100'
      leave='duration-300 ease-out'
      leaveFrom='opacity-100'
      leaveTo='opacity-0'
      onClose={handleOnChange}
      className='relative z-30'
    >
      <TransitionChild
        as='div'
        enter='ease-out duration-300'
        enterFrom='opacity-0'
        enterTo='opacity-100'
        leave='ease-in duration-200'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
        className='fixed inset-0 bg-gray-200 bg-opacity-50'
      />
      <div className='fixed inset-0 min-h-full overflow-auto scrollbar-hide'>
        <div className='flex items-start justify-center min-h-full text-center'>
          <TransitionChild
            as={DialogPanel}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
            className='w-full md:max-w-md mx-auto min-h-screen rounded-t-lg scrollbar-hide align-middle transition-all transform bg-white'
          >
            {withHeader && (
              <DialogTitle className='sticky w-full top-0 z-30 border-b font-semibold flex items-center space-x-3 text-sm p-4 bg-white'>
                <ArrowLeftIcon
                  className='w-5 h-5 cursor-pointer'
                  onClick={handleOnChange}
                />
                <span className='text-sm'>{modalTitle}</span>
              </DialogTitle>
            )}
            {children}
          </TransitionChild>
        </div>
      </div>
    </Transition>
  );
};

export const AlertComponent = ({
  modalTitle = false,
  isOpen = false,
  withHeader = false,
  handleOnChange = () => {},
  children,
}) => {
  return (
    <Transition
      as={Dialog}
      show={isOpen}
      enter='duration-200 ease-out'
      enterFrom='opacity-0'
      enterTo='opacity-100'
      leave='duration-300 ease-out'
      leaveFrom='opacity-100'
      leaveTo='opacity-0'
      onClose={handleOnChange}
      className='relative z-30'
    >
      <TransitionChild
        as='div'
        enter='ease-out duration-300'
        enterFrom='opacity-0'
        enterTo='opacity-100'
        leave='ease-in duration-200'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
        className='fixed inset-0 bg-gray-200 bg-opacity-50'
      />
      <div className='fixed inset-0 min-h-full overflow-auto scrollbar-hide'>
        <div className='flex items-center justify-center min-h-full text-center'>
          <TransitionChild
            as={DialogPanel}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
            className='w-72 md:w-96 mx-auto p-2 rounded-lg scrollbar-hide align-middle transition-all transform bg-white'
          >
            {withHeader && (
              <DialogTitle className='sticky w-full rounded-t-2xl top-0 z-30 rounded-lg font-semibold flex items-center justify-between space-x-3 text-sm p-2 bg-white'>
                <span className='text-sm'>{modalTitle}</span>
                <XMarkIcon
                  className='w-5 h-5 cursor-pointer'
                  onClick={handleOnChange}
                />
              </DialogTitle>
            )}
            {children}
          </TransitionChild>
        </div>
      </div>
    </Transition>
  );
};

export const ActionSheetComponent = ({
  modalTitle = false,
  isOpen = false,
  handleOnChange,
  withHeader = false,
  children,
}) => {
  return (
    <Transition
      as={Dialog}
      show={isOpen}
      enter='duration-200 ease-out'
      enterFrom='opacity-0'
      enterTo='opacity-100'
      leave='duration-300 ease-out'
      leaveFrom='opacity-100'
      leaveTo='opacity-0'
      onClose={handleOnChange}
      className='relative z-30'
    >
      <TransitionChild
        as='div'
        enter='ease-out duration-300'
        enterFrom='opacity-0'
        enterTo='opacity-100'
        leave='ease-in duration-200'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
        className='fixed inset-0 bg-gray-200 bg-opacity-50'
      />
      <div className='fixed inset-0 min-h-full overflow-auto scrollbar-hide'>
        <div className='flex items-end justify-center min-h-full text-center'>
          <TransitionChild
            as={DialogPanel}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
            className='w-full md:max-w-md mx-auto h-[30%] rounded-t-lg scrollbar-hide align-middle transition-all transform bg-white'
          >
            {withHeader && (
              <DialogTitle className='sticky w-full rounded-t-2xl top-0 z-30 rounded-lg font-semibold flex items-center justify-between space-x-3 text-sm p-4 bg-white'>
                <span className='text-sm'>{modalTitle}</span>
                <XMarkIcon
                  className='w-5 h-5 cursor-pointer'
                  onClick={handleOnChange}
                />
              </DialogTitle>
            )}
            {children}
          </TransitionChild>
        </div>
      </div>
    </Transition>
  );
};
