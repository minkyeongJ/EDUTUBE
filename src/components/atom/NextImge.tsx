'use client';

import Image from 'next/image';
import Skeleton from './Skeleton';
import { IMAGE_ROUTE } from '@/helper/constants/commons';
import { useEffect, useState } from 'react';

interface Props {
  src: string;
  alt?: string;
  className?: string;
}

const regex = /https:\/\//;

const NextImage = ({
  src,
  alt = '',
  className = 'w-full h-32 object-cover mb-4 rounded-md',
}: Props) => {
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    setIsShow(!regex.test(src));
  }, [src]);

  return isShow ? (
    <Image
      src={IMAGE_ROUTE + src}
      alt={alt}
      width={80}
      height={80}
      unoptimized={true}
      className={className}
    />
  ) : (
    <Skeleton width={'100%'} height={'150px'} round={10} />
  );
};
export default NextImage;
