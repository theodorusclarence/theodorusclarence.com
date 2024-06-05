import clsx from 'clsx';
import Image from 'next/image';
import * as React from 'react';
import Lightbox from 'react-image-lightbox';

import 'react-image-lightbox/style.css';

type ImgType = {
  publicId: string;
  height: string | number;
  width: string | number;
  alt: string;
  title?: string;
  className?: string;
  preview?: boolean;
  noStyle?: boolean;
  aspect?: {
    width: number;
    height: number;
  };
  mdx?: boolean;
} & React.ComponentPropsWithoutRef<'figure'>;

export default function Img({
  publicId,
  height,
  width,
  alt,
  title,
  className,
  preview = true,
  noStyle = false,
  mdx = false,
  style,
  aspect,
  ...rest
}: ImgType) {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const aspectRatio = aspect ? aspect.height / aspect.width : undefined;

  const RESIZE_MAX_WIDTH = 1000;
  const resizedToMaxWidth = mdx && +width >= RESIZE_MAX_WIDTH;
  const path = publicId;

  return (
    <figure
      className={clsx(className, {
        'overflow-hidden rounded shadow dark:shadow-none': !noStyle,
        'mx-auto w-full': mdx && +width <= 800,
      })}
      style={{
        ...(mdx && +width <= 800 ? { maxWidth: width } : {}),
        ...style,
      }}
      {...rest}
    >
      <div
        style={{
          position: 'relative',
          height: 0,
          paddingTop: aspectRatio
            ? `${aspectRatio * 100}%`
            : `${(+height / +width) * 100}%`,
          cursor: preview ? 'zoom-in' : 'default',
        }}
        className='img-blur'
        onClick={preview ? () => setIsOpen(true) : undefined}
      >
        <div className='absolute left-0 top-0'>
          <Image
            width={
              resizedToMaxWidth ? Math.min(+width, RESIZE_MAX_WIDTH) : width
            }
            height={
              resizedToMaxWidth ? (RESIZE_MAX_WIDTH * +height) / +width : height
            }
            unoptimized
            src={path}
            alt={alt}
            title={title || alt}
          />
        </div>
      </div>
      {isOpen && (
        <Lightbox mainSrc={path} onCloseRequest={() => setIsOpen(false)} />
      )}
    </figure>
  );
}
