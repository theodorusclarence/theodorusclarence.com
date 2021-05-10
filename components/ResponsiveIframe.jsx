export default function ResponsiveIframe({ video, ratio = 16 / 9 }) {
  return (
    <div
      style={{
        position: 'relative',
        height: 0,
        overflow: 'hidden',
        maxWidth: '100%',
        paddingBottom: `${100 / ratio}%`,
      }}
    >
      <iframe
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
        src={video[1]}
        srcdoc={`<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:110%;left:-5%;top:0%;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style><div style="position:relative;height:0;overflow:hidden;max-width:100%;padding-bottom:${
          100 / ratio
        }%;"><a href=${video[1]}?autoplay=1><img src=${
          video[1]
            .replace('https', 'http')
            .replace('www.youtube', 'i3.ytimg')
            .replace('/embed', '')
            .replace('.com', '.com/vi') + '/hqdefault.jpg'
        } alt=${video[0]}><span>▶</span></a></div>`}
        frameBorder='0'
        allowFullScreen
      ></iframe>
    </div>
  );
}
