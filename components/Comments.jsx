import { Giscus } from '@giscus/react';

export default function Comments(props) {
  return (
    <Giscus
      repo='theodorusclarence/theodorusclarence.com'
      repoId='MDEwOlJlcG9zaXRvcnkzMzAyMTQyNDc='
      category='General'
      categoryId='DIC_kwDOE66rZ84B--B0'
      mapping='pathname'
      reactionsEnabled='0'
      emitMetadata='0'
      theme='dark'
    />
  );
}
