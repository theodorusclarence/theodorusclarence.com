import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export const useUtterances = (commentNodeId) => {
  const { theme } = useTheme();

  useEffect(() => {
    const scriptParentNode = document.getElementById(commentNodeId);
    if (!scriptParentNode) return;
    // docs - https://utteranc.es/
    const script = document.createElement('script');
    script.src = 'https://utteranc.es/client.js';
    script.async = true;
    script.setAttribute('repo', 'theodorusclarence/theodorusclarence.com');
    script.setAttribute('issue-term', 'pathname');
    script.setAttribute('label', '💬 Comment');
    script.setAttribute(
      'theme',
      theme === 'dark' ? 'github-dark' : 'github-light'
    );
    script.setAttribute('crossorigin', 'anonymous');

    scriptParentNode.appendChild(script);

    return () => {
      // cleanup - remove the older script with previous theme
      scriptParentNode.removeChild(scriptParentNode.firstChild);
    };
  }, [commentNodeId, theme]);
};
