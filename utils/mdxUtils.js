import fs from 'fs';
import path from 'path';

// BLOGS_PATH is useful when you want to get the path to a specific file
export const BLOGS_PATH = path.join(process.cwd(), 'data', 'blog');

// postFilePaths is the list of all mdx files inside the POSTS_PATH directory
export const postFilePaths = fs
    .readdirSync(BLOGS_PATH)
    // Only include md(x) files
    .filter((path) => /\.mdx?$/.test(path));

// This functionality is for snippets
export const LIBRARY_PATH = path.join(process.cwd(), 'data', 'library');

// postFilePaths is the list of all mdx files inside the POSTS_PATH directory
export const postLibraryPaths = fs
    .readdirSync(LIBRARY_PATH)
    // Only include md(x) files
    .filter((path) => /\.mdx?$/.test(path));
