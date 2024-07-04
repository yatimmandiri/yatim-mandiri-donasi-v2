import classNames from 'classnames';
import Image from 'next/image';

export const LogoComponent = ({ width = 70, height = 70, className = '' }) => {
  return (
    <Image
      src={'/assets/images/logo_color.png'}
      alt={'Logo'}
      width={width}
      height={height}
      className={classNames(className)}
      style={{ height: 'auto' }}
      priority
    />
  );
};
