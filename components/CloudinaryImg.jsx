import Image from 'next/image';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Lightbox from 'react-image-lightbox';
import { buildUrl } from 'cloudinary-build-url';

import 'react-image-lightbox/style.css';
import { classNames } from '@/utils/helper';

export default function CloudinaryImg({
  publicId,
  height,
  width,
  alt = 'Project Image',
  title,
  className,
  preview = true,
}) {
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
    },
  });
  const url = buildUrl(publicId, {
    cloud: {
      cloudName: 'theodorusclarence',
    },
  });

  return (
    <>
      <div
        className={classNames(className)}
        style={{
          position: 'relative',
          height: 0,
          paddingTop: `${(height / width) * 100}%`,
          backgroundImage: `url(${urlBlurred})`,
          backgroundPosition: 'center center',
          backgroundSize: `100%`,
          cursor: preview ? 'zoom-in' : 'default',
        }}
        onClick={preview ? () => setIsOpen(true) : undefined}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        >
          <Image
            width={width}
            height={height}
            src={url}
            alt={alt}
            unoptimized={true}
            title={title || alt}
          />
        </div>
      </div>
      {isOpen && (
        <Lightbox mainSrc={url} onCloseRequest={() => setIsOpen(false)} />
      )}
    </>
  );
}

CloudinaryImg.propTypes = {
  publicId: PropTypes.string.isRequired,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  alt: PropTypes.string.isRequired,
  title: PropTypes.string,
  className: PropTypes.string,
  preview: PropTypes.bool,
};
