import { Giscus, Theme } from '@giscus/react';
import { useTheme } from 'next-themes';

export default function Comment() {
  const { theme } = useTheme();

  return (
    <Giscus
      key={theme}
      repo='theodorusclarence/theodorusclarence.com'
      repoId='MDEwOlJlcG9zaXRvcnkzMzAyMTQyNDc='
      category='General'
      categoryId='DIC_kwDOE66rZ84B--B0'
      mapping='pathname'
      reactionsEnabled='0'
      emitMetadata='0'
      theme={theme as Theme}
    />
  );
}
