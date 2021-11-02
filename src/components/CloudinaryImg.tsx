import { buildUrl } from 'cloudinary-build-url';
import clsx from 'clsx';
import Image from 'next/image';
import { useState } from 'react';
import Lightbox from 'react-image-lightbox';

import 'react-image-lightbox/style.css';

type CloudinaryImgType = {
  publicId: string;
  height: string | number;
  width: string | number;
  alt: string;
  title?: string;
  className?: string;
  preview?: boolean;
  aspect?: {
    width: number;
    height: number;
  };
} & React.ComponentPropsWithoutRef<'figure'>;

export default function CloudinaryImg({
  publicId,
  height,
  width,
  alt,
  title,
  className,
  preview = true,
  aspect,
  ...rest
}: CloudinaryImgType) {
  const [isOpen, setIsOpen] = useState(false);

  const urlBlurred = buildUrl(publicId, {
    cloud: {
      cloudName: 'theodorusclarence',
    },
    transformations: {
      effect: {
        name: 'blur:1000',
      },
      quality: 1,
      rawTransformation: aspect
        ? `c_fill,ar_${aspect.width}:${aspect.height},w_${width}`
        : undefined,
    },
  });
  const url = buildUrl(publicId, {
    cloud: {
      cloudName: 'theodorusclarence',
    },
    transformations: {
      rawTransformation: aspect
        ? `c_fill,ar_${aspect.width}:${aspect.height},w_${width}`
        : undefined,
    },
  });

  const aspectRatio = aspect ? aspect.height / aspect.width : undefined;

  return (
    <figure className={clsx(className)} {...rest}>
      <div
        style={{
          position: 'relative',
          height: 0,
          paddingTop: aspectRatio
            ? `${aspectRatio * 100}%`
            : `${(+height / +width) * 100}%`,
          backgroundImage: `url(${urlBlurred})`,
          backgroundPosition: 'center center',
          backgroundSize: `100%`,
          cursor: preview ? 'zoom-in' : 'default',
        }}
        onClick={preview ? () => setIsOpen(true) : undefined}
      >
        <div className='absolute top-0 left-0'>
          <Image
            width={width}
            height={height}
            src={url}
            alt={alt}
            title={title || alt}
          />
        </div>
      </div>
      {isOpen && (
        <Lightbox mainSrc={url} onCloseRequest={() => setIsOpen(false)} />
      )}
    </figure>
  );
}
