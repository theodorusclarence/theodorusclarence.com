import clsx from 'clsx';
import { CldVideoPlayer } from 'next-cloudinary';
import * as React from 'react';

import 'next-cloudinary/dist/cld-video-player.css';

type CloudinaryVideoPlayerProps = {
  publicId: string;
  mdx?: boolean;
} & Omit<React.ComponentProps<typeof CldVideoPlayer>, 'src'>;

export default function CloudinaryVideoPlayer({
  publicId,
  mdx = false,
  ...rest
}: CloudinaryVideoPlayerProps) {
  return (
    <div
      className='not-prose mx-auto'
      style={
        {
          maxWidth: `${rest.width}px`,
          '--width': rest.width,
          '--height': rest.height,
        } as React.CSSProperties
      }
    >
      <CldVideoPlayer
        id={publicId}
        className={clsx([
          '[&_.vjs-poster_img]:!object-contain !pt-[calc(var(--height)/var(--width)*100%)]',
          // remove white overlay
          '[&_.vjs-progress-control.vjs-control::before]:hidden',
        ])}
        logo={false}
        src={publicId}
        colors={{
          base: '#dc2626',
        }}
        {...(mdx
          ? {
              autoplay: 'on-scroll',
              loop: true,
            }
          : {})}
        {...rest}
      />
    </div>
  );
}
