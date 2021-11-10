import clsx from 'clsx';
import * as React from 'react';
import LiteYoutubeEmbed from 'react-lite-youtube-embed';

type imgResolution =
  | 'default'
  | 'mqdefault'
  | 'hqdefault'
  | 'sddefault'
  | 'maxresdefault';

type YoutubeEmbedProps = {
  className?: string;
  announce?: string;
  id: string;
  title: string;
  activatedClass?: string;
  adNetwork?: boolean;
  aspectHeight?: number;
  aspectWidth?: number;
  iframeClass?: string;
  noCookie?: boolean;
  cookie?: boolean;
  params?: string;
  playerClass?: string;
  playlist?: boolean;
  playlistCoverId?: string;
  poster?: imgResolution;
  webp?: boolean;
  wrapperClass?: string;
  onIframeAdded?: () => void;
  autoplay?: boolean;
  muted?: boolean;
};

export default function YoutubeEmbed({
  className,
  ...rest
}: YoutubeEmbedProps) {
  return (
    <figure className={clsx('rounded shadow-lg', className)}>
      <LiteYoutubeEmbed {...rest} noCookie={true} />
    </figure>
  );
}
