import {
  Button,
  Description,
  Field,
  Input,
  Label,
  Select,
} from '@headlessui/react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { createElement } from 'react';

export const InputTextComponent = ({
  className = '',
  center = false,
  addonLeft = false,
  addonRight = false,
  pill = false,
  label = false,
  errors = false,
  helperText = false,
  register = false,
  addonLeftHandler = () => {},
  addonRightHandler = () => {},
  ...props
}) => {
  return (
    <Field className='flex flex-col space-y-2.5'>
      {label && <Label className='text-sm font-medium'>{label}</Label>}
      <div className='relative'>
        {addonLeft && (
          <Button
            type='button'
            onClick={addonLeftHandler}
            className='absolute inset-y-0 left-0 flex items-center px-2'
          >
            {createElement(addonLeft, { className: 'w-4 h-4' })}
          </Button>
        )}
        <Input
          className={classNames(
            'w-full shadow appearance-none text-xs border p-2.5 leading-tight ',
            'focus:outline-none focus:shadow-outline',
            'placeholder:text-xs',
            'disabled:cursor-not-allowed',
            'read-only:cursor-pointer',
            'border-gray-300 bg-gray-50 text-gray-700',
            center && 'text-center',
            addonLeft ? 'pl-8' : '',
            addonRight ? 'pr-8' : '',
            pill ? 'rounded-full' : 'rounded-lg',
            errors
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
              : 'focus:ring-blue-500 focus:border-blue-500',
            className
          )}
          {...register}
          {...props}
        />
        {addonRight && (
          <Button
            type='button'
            onClick={addonRightHandler}
            className='absolute inset-y-0 right-0 flex items-center px-2'
          >
            {createElement(addonRight, {
              className: 'w-4 h-4',
            })}
          </Button>
        )}
      </div>
      {helperText && (
        <Description
          className={classNames(
            'flex items-center space-x-2 text-xs',
            errors && 'text-red-500'
          )}
        >
          <InformationCircleIcon
            className={classNames(
              'w-4 h-4',
              errors ? 'text-red-500' : 'text-yellow-500'
            )}
          />
          <span>{helperText}</span>
        </Description>
      )}
    </Field>
  );
};

export const InputSelectComponent = ({
  data = [
    { id: 1, name: 'Active' },
    { id: 2, name: 'Paused' },
  ],
  dataSelected = '',
  className = '',
  center = false,
  addonLeft = false,
  addonRight = false,
  pill = false,
  label = false,
  errors = false,
  helperText = false,
  register = false,
  ...props
}) => {
  return (
    <Field className='flex flex-col space-y-2.5'>
      {label && <Label className='text-sm font-medium'>{label}</Label>}
      <Select
        className={classNames(
          'w-full shadow appearance-none text-xs border px-2.5 leading-tight pr-6',
          'focus:outline-none focus:shadow-outline',
          'placeholder:text-xs',
          'disabled:cursor-not-allowed',
          'read-only:cursor-pointer',
          'border-gray-300 bg-gray-50 text-gray-700',
          pill ? 'rounded-full' : 'rounded-lg',
          errors
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
            : 'focus:ring-blue-500 focus:border-blue-500',
          className
        )}
        {...register}
        {...props}
      >
        {data.map((item) => (
          <option key={item.id} value={item.name}>
            {item.name}
          </option>
        ))}
      </Select>
      {helperText && (
        <Description
          className={classNames(
            'flex items-center space-x-2 text-xs',
            errors && 'text-red-500'
          )}
        >
          <InformationCircleIcon
            className={classNames(
              'w-4 h-4',
              errors ? 'text-red-500' : 'text-yellow-500'
            )}
          />
          <span>{helperText}</span>
        </Description>
      )}
    </Field>
  );
};
