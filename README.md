<div align="center">
  <h1>folio-v2</h1>
  <p>💠 Personal website and blog made using Next.js, TypeScript, Tailwind CSS, MDX Bundler, Prisma, and SWR.</p>
</div>

## Project Setup 🔧

If you want to set up the project locally, feel free to follow these steps:

First, fork the repo, then:

```sh
git clone <your-fork>
cd ./theodorusclarence.com

# Copy the .env.example to .env.local
#   most features are turned off by default
#   so you won't need to add any envs
cp .env.example .env.local

# Install the dependencies
pnpm

# Run the development server
pnpm dev
```

You can now open up `http://localhost:3000` and start writing code!

## Feature Flag

Major features are feature flagged in [constants/env.ts](https://github.com/emackinnon1/folio-v2/blob/main/src/constants/env.ts)

For example:

```ts
/**
 * Show command service on contents
 * @see Comment.tsx
 */
export const commentFlag = isProd;
```

## Format 💅

When writing your code, please try to follow the existing code style.

Your code will be automatically linted and formatted before each commit. However, if you want to manually lint and format, use the provided pnpm scripts.

```sh
pnpm lint:fix
pnpm format
```

You also have to follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for the commit message.

## Notable Features

This website was first initialized in January 2021, went through numerous changes and refactors, resulted to some notable features

### Dedicated Project Page

Each project is descriptively explained provided with my learnings.

![image](https://user-images.githubusercontent.com/55318172/132983591-63e495f1-fc5a-48d0-9e0a-ef3dddba6cad.png)

### Lazy Blur Loader

Images are hosted on Cloudinary

https://user-images.githubusercontent.com/55318172/132983757-135138db-6907-4951-a98f-e2a75c16fa01.mov

### Love Button Interaction

https://user-images.githubusercontent.com/55318172/132983796-9187857f-bbf2-4bb0-80ac-59cc1c4f3e87.mov

### Spotify Now Playing

![image](https://user-images.githubusercontent.com/55318172/132983710-000cc6c8-a466-4314-ad3f-656d9dc1a1e4.png)
