import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

export default function ResponsiveIframe({ id, poster, ratio = 16 / 9 }) {
  return (
    <>
      <LiteYouTubeEmbed id={id} poster='hqdefault' noCookie={true} />
      <style global jsx>{`
        .yt-lite::after {
          padding-bottom: ${(1 / ratio) * 100}% !important;
        }
        .yt-lite::before {
          content: none !important;
        }
      `}</style>
    </>
  );
}
