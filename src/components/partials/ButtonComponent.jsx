import { colors } from '@/utils/colors';
import { Button } from '@headlessui/react';
import classNames from 'classnames';
import { createElement } from 'react';

export const ButtonComponent = ({
  type = 'button',
  className = '',
  text = '',
  color = 'default',
  variant = 'solid',
  block = false,
  fullWidth = false,
  pill = false,
  isLoading = false,
  leftIcon = false,
  rightIcon = false,
  ...props
}) => {
  return (
    <Button
      type={type}
      disabled={isLoading}
      className={classNames(
        'inline-flex space-x-2 items-center p-2 border',
        'disabled:cursor-not-allowed',
        pill ? 'rounded-full' : 'rounded-lg',
        fullWidth ? 'w-full' : 'w-fit',
        block ? 'justify-between' : 'justify-center',
        colors[variant][color],
        className
      )}
      {...props}
    >
      {leftIcon && createElement(leftIcon, { className: 'w-4 h-4' })}
      <span className='text-xs font-semibold'>
        {isLoading ? 'Loading...' : text}
      </span>
      {rightIcon && createElement(rightIcon, { className: 'w-4 h-4' })}
    </Button>
  );
};
