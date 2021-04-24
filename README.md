This is a NextJs and Tailwind project bootstrapped using nextjs-tailwind-starter created by [Theodorus Clarence](https://github.com/theodorusclarence/nextjs-tailwind-starter).

## Getting Started

To use this starter, you can use create-next-app to do it by:
```bash
npx create-next-app -e https://github.com/theodorusclarence/nextjs-tailwind-starter project-name
```

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## What's Inside

This starter file has a opinionated styling for heading with responsive size and Montserrat font imported from the google fonts.

There is also Seo Component to customize page title and opengraph meta tags.

## Image Guide on MDX

### Small Image
```jsx
<figure class='flex justify-center'>
  <Image
    className='bg-gray-500'
    src='/images/blogs/my-addons/ff-4.png'
    alt='Eye dropper'
    width={321}
    height={382}
  />
</figure>
```

### Full Image
```jsx
<Image
  className='bg-gray-500'
  layout='responsive'
  src='/images/blogs/my-addons/ff-3.png'
  alt='Mobile View'
  width={1440}
  height={880}
/>
```

### GIF
```jsx
<img
  className='mx-auto w-full'
  src='/images/blogs/my-addons/visbug.gif'
  alt='Visbug'
/>
```

