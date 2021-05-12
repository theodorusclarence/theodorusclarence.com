import Image from 'next/image';
import { buildUrl } from 'cloudinary-build-url';
import PropTypes from 'prop-types';

export default function CloudinaryImg({
  publicId,
  height,
  width,
  alt = 'Project Image',
  title,
  className,
}) {
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
    <div
      className={className}
      style={{
        position: 'relative',
        height: 0,
        paddingTop: `${(height / width) * 100}%`,
        backgroundImage: `url(${urlBlurred})`,
        backgroundPosition: 'center center',
        backgroundSize: `100%`,
      }}
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
  );
}

CloudinaryImg.propTypes = {
  publicId: PropTypes.string.isRequired,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  alt: PropTypes.string.isRequired,
  title: PropTypes.string,
  className: PropTypes.string,
};
