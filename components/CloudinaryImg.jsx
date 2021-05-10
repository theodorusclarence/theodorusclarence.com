import Image from 'next/image';
import { buildUrl } from 'cloudinary-build-url';

export default function CloudinaryImg({
    publicId,
    height,
    width,
    altImg = 'Project Image',
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
                    alt={altImg}
                    unoptimized={true}
                />
            </div>
        </div>
    );
}
