/* eslint-disable */
const axios = require('axios');
const { readFile, writeFile, mkdir, createWriteStream } = require('fs');
const glob = require('glob');
const matter = require('gray-matter');
const { join } = require('path');

//#region  //*=========== Regex Constants ===========
const dotAll = '(?:[^<]+?)';
const quote = '["\']';
const select = '(.*)';

/**
 * @argument $1 publicId e.g. theodorusclarence/blogs/one-stop-starter/seo-component_xpzsab
 * @argument $2 alt e.g. seo-component
 */
const CLOUDINARY_REGEXP = new RegExp(
  `<CloudinaryImg${dotAll}publicId=${quote}${select}${quote}${dotAll}alt=${quote}${select}${quote}${dotAll}/>`,
  'g'
);

/**
 * @argument $1 user/reponame e.g. theodorusclarence/ts-nextjs-tailwind-starter
 */
const GITHUB_REGEXP = new RegExp(
  `<GithubCard${dotAll}repo=${quote}${select}${quote}${dotAll}/>`,
  'g'
);

/**
 * @argument $1 id e.g. xawHHhqIVVo
 */
const YOUTUBE_REGEXP = new RegExp(
  `<LiteYouTubeEmbed${dotAll}id=${quote}${select}${quote}${dotAll}/>`,
  'g'
);

/**
 * @argument $1 id e.g. 1475685363003768836
 */
const TWEET_REGEXP = new RegExp(
  `<TweetCard${dotAll}tweetIdd=${quote}${select}${quote}${dotAll}/>`,
  'g'
);
//#endregion  //*======== Regex Constants ===========

//#region  //*=========== Footers ===========
const devtoFooter = `
---

> Originally posted on [my personal site](https://theodorusclarence.com/?ref=devto), find more [blog posts](https://theodorusclarence.com/blog?ref=devto) and [code snippets library](https://theodorusclarence.com/library?ref=devto) I put up for easy access on my site 🚀

Like this post? [Subscribe to my newsletter](https://theodorusclarence.com/subscribe?ref=devto) to get notified every time a new post is out!`;

const hashnodeFooter = `
---

> Originally posted on [my personal site](https://theodorusclarence.com/?ref=hashnode), find more [blog posts](https://theodorusclarence.com/blog?ref=hashnode) and [code snippets library](https://theodorusclarence.com/library?ref=hashnode) I put up for easy access on my site 🚀

Like this post? [Subscribe to my newsletter](https://theodorusclarence.com/subscribe?ref=hashnode) to get notified every time a new post is out!`;
//#endregion  //*======== Footers ===========

const slug = process.argv[2];
const fileName = [
  ...glob.sync(join(process.cwd(), 'src', 'contents', 'blog', `${slug}.mdx`)),
][0];

if (!fileName) {
  throw new Error('File not found');
}

const outPath = join(process.cwd(), 'scripts', 'out', slug);
mkdir(outPath, { recursive: true }, (err) => {
  if (err) {
    throw new Error(err);
  }
});

//#region  //*=========== Dev.to ===========
const devto = () => {
  let parsedContent = '';
  const outputFolder = join(outPath, 'devto.mdx');

  readFile(fileName, 'utf8', (err, content) => {
    if (err) reject(err);

    parsedContent = content;
    parsedContent = parsedContent.replace(
      CLOUDINARY_REGEXP,
      '![$2](https://res.cloudinary.com/theodorusclarence/image/upload/q_auto,f_auto/$1)'
    );
    parsedContent = parsedContent.replace(
      GITHUB_REGEXP,
      '{% github $1 no-readme %}'
    );
    parsedContent = parsedContent.replace(YOUTUBE_REGEXP, '{% youtube $1 %}');
    parsedContent = parsedContent.replace(TWEET_REGEXP, '{% twitter $1 %}');

    // append footer
    parsedContent += devtoFooter;

    writeFile(outputFolder, parsedContent, (err) => {
      if (err) {
        throw new Error('Error while generating content', err);
      } else {
        console.log('✓ dev.to markdown is successfully generated');
      }
    });
  });
};
//#endregion  //*======== Dev.to ===========

//#region  //*=========== Hashnode ===========
const hashnode = () => {
  let parsedContent = '';
  const outputFolder = join(outPath, 'hashnode.mdx');

  readFile(fileName, 'utf8', (err, content) => {
    if (err) reject(err);

    parsedContent = content;

    parsedContent = parsedContent.replace(
      CLOUDINARY_REGEXP,
      '![$2](https://res.cloudinary.com/theodorusclarence/image/upload/q_auto,f_auto/$1)'
    );
    parsedContent = parsedContent.replace(
      GITHUB_REGEXP,
      '%[https://github.com/$1]'
    );
    parsedContent = parsedContent.replace(
      YOUTUBE_REGEXP,
      '%[https://www.youtube.com/watch?v=$1]'
    );
    parsedContent = parsedContent.replace(
      TWEET_REGEXP,
      '%[https://twitter.com/1475685363003768836]'
    );
    // Change tsx to ts
    parsedContent = parsedContent.replace(/```tsx/g, '```ts');

    // append footer
    parsedContent += hashnodeFooter;

    writeFile(outputFolder, parsedContent, (err) => {
      if (err) {
        throw new Error('Error while generating content', err);
      } else {
        console.log('✓ Hashnode markdown is successfully generated');
      }
    });
  });
};
//#endregion  //*======== Hashnode ===========

devto();
hashnode();

//#region  //*=========== Download OG Image ===========
const getOgImage = () => {
  readFile(fileName, 'utf8', (err, content) => {
    if (err) reject(err);

    const { data: frontmatter } = matter(content);
    const bannerLink = `https://res.cloudinary.com/theodorusclarence/image/upload/f_auto,c_fill,ar_4:5,w_1200/theodorusclarence/banner/${frontmatter.banner}`;
    const ogLink = `https://og.clarence.link/api/blog?templateTitle=${encodeURIComponent(
      frontmatter.title
    )}&banner=${encodeURIComponent(bannerLink)}`;
    const image_path = join(outPath, 'og_image.png');
    axios({
      url: ogLink,
      responseType: 'stream',
    }).then(
      (response) =>
        new Promise((resolve, reject) => {
          response.data
            .pipe(createWriteStream(image_path))
            .on('finish', () => {
              console.log('✓ OG Image is successfully downloaded');
              resolve();
            })
            .on('error', (e) => reject(e));
        })
    );
  });
};
getOgImage();
//#endregion  //*======== Download OG Image ===========
