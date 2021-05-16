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

## Image Guide on MDX

### Small Image
```jsx
<figure className='mx-auto' style={{ maxWidth: 400 }}>
  <CloudinaryImg
    className='bg-gray-500'
    publicId='theodorusclarence/blogs/btb-ui-fundamental/6_woi3j8.jpg'
    alt='Comic Sans'
    width={400}
    height={400}
  />
</figure>
```

### Full Image
```jsx
<CloudinaryImg
  className='bg-gray-500'
  publicId='theodorusclarence/blogs/btb-ui-fundamental/1_tm864u.jpg'
  alt='Ilustrasi Whitespace'
  width={953}
  height={545}
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

## Commit Message Convention

This website follows [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)

Commit message will be checked using [husky and commit lint](https://theodorusclarence.com/library/husky-commitlint-prettier), you can't commit if not using the proper convention below.

### Format

`<type>(optional scope): <description>`
Example: `feat(pre-event): add speakers section`

### 1. Type

Available types are:

- feat → Changes about addition or removal of a feature. Ex: `feat: add table on landing page`, `feat: remove table from landing page`
- fix → Bug fixing, followed by the bug. Ex: `fix: illustration overflows in mobile view`
- BREAKING CHANGE → Significant changes. Ex: `BREAKING CHANGE: change login flow to not save token in localStorage`
- docs → Update documentation (README.md)
- style → Updating style, and not changing any logic in the code (reorder imports, fix whitespace, remove comments)
- chore → Installing new dependencies, or bumping deps
- refactor → Changes in code, same output, but different approach
- ci → Update github workflows, husky
- test → Update testing suite, cypress files
- perf → Fixing something regarding performance (deriving state, using memo, callback)
- vercel → Blank commit to trigger vercel deployment. Ex: `vercel: trigger deployment`

### 2. Optional Scope

Labels per page Ex: `feat(pre-event): add date label`

\*If there is no scope needed, you don't need to write it

Usable scope:
**TODO: Change this to your scope, don't forget to change in the commitlint.config.js**

- pre-event
- conference
- ibl-case

### 3. Description

Description must fully explain what is being done.

**If there are multiple changes, then commit one by one**

- After colon, there are a single space Ex: `feat: add something`
- When using `fix` type, state the issue Ex: `fix: file size limiter not working`
- Use imperative, dan present tense: "change" not "changed" or "changes"
- Don't use capitals in front of the sentence
- Don't add full stop (.) at the end of the sentence

