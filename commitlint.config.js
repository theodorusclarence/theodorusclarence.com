module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [2, 'always', ['projects', 'blog', 'library', 'package']],
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'BREAKING CHANGE',
        'docs',
        'chore',
        'style',
        'refactor',
        'ci',
        'test',
        'perf',
        'vercel',
        'revert',
      ],
    ],
  },
};
