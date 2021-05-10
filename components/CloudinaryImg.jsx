import Image from 'next/image';
import { buildUrl } from 'cloudinary-build-url';
import { IoTimeOutline } from 'react-icons/io5';

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
                quality: 1,
            },
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
