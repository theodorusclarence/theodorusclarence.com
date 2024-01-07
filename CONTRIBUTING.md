# Contributing 👨‍💻

Thank you for your interest to contribute!

I would love your help to improve this project. Here are some tips and guidelines to help you along the way.

## Issues 🐞

If you come across a bug or something that can be improved, please [open an issue](https://github.com/theodorusclarence/theodorusclarence.com/issues). It would be helpful if you provide some description or screen recording!

For improvements, before you start working on it, please discuss it first so I can ensure to merge your beautiful work into the project. I'll do my best to answer quickly and discuss the upcoming ideas 🙌

## Pull Requests 🔃

You can directly open a pull request for a bug fix or content typos.

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

Major features are feature flagged in [constants/env.ts](https://github.com/theodorusclarence/theodorusclarence.com/blob/main/src/constants/env.ts)

For example:

```ts
/**
 * Show command service on contents
 * @see Comment.tsx
 */
export const commentFlag = isProd;
```

you can change the `isProd` into `true` to turn the feature on, but expect some error because you don't have any access to the environment variable. I'm not planning to mock them for any time soon, so you can simply leave an issue for these specific features.

## Format 💅

When writing your code, please try to follow the existing code style.

Your code will be automatically linted and formatted before each commit. However, if you want to manually lint and format, use the provided pnpm scripts.

```sh
pnpm lint:fix
pnpm format
```

You also have to follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for the commit message.
