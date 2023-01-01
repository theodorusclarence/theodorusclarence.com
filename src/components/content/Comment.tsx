import Giscus, { Repo, Theme } from '@giscus/react';
import { useTheme } from 'next-themes';

import { commentFlag } from '@/constants/env';

export default function Comment() {
  const { theme } = useTheme();

  return commentFlag ? (
    <Giscus
      key={theme}
      repo={(process.env.NEXT_PUBLIC_GISCUS_REPO as Repo) || ''}
      repoId={process.env.NEXT_PUBLIC_GISCUS_REPO_ID || ''}
      category='General'
      categoryId='DIC_kwDOE66rZ84B--B0'
      mapping='pathname'
      reactionsEnabled='0'
      emitMetadata='0'
      theme={theme as Theme}
    />
  ) : null;
}
