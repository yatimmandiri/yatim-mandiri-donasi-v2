import Image from 'next/image';
import Link from 'next/link';

export const CardStackedComponent = ({
  title = '',
  link = '#',
  excerpt = '',
  image = false,
  priority = false,
}) => {
  return (
    <Link
      target='_blank'
      href={link}
      className='flex flex-col space-y-3 p-2.5 rounded border shadow-lg border-gray-300'
    >
      {image && (
        <figure className='relative rounded w-full h-60 overflow-hidden'>
          <Image
            src={image}
            alt={title}
            fill={true}
            priority={priority}
            className='object-cover'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          />
        </figure>
      )}
      <div className='flex flex-col space-y-3'>
        <span className='text-sm font-semibold'>{title}</span>
        <span className='line-clamp-3 text-xs'>{excerpt}</span>
      </div>
    </Link>
  );
};

export const CardHorizontalComponent = ({
  title = '',
  link = '#',
  image = false,
  excerpt = false,
  priority = false,
}) => {
  return (
    <Link
      href={link}
      className='flex flex-row space-x-3 items-center border border-gray-300 shadow-lg rounded p-2.5'
    >
      {image && (
        <figure className='relative rounded w-36 h-28 overflow-hidden'>
          <Image
            src={image}
            alt={title}
            fill={true}
            priority={priority}
            className='object-cover object-center'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          />
        </figure>
      )}
      <div className='flex flex-col space-y-3 flex-1'>
        <span className='text-sm font-semibold'>{title}</span>
        {excerpt && <span className='line-clamp-3 text-xs'>{excerpt}</span>}
      </div>
    </Link>
  );
};
