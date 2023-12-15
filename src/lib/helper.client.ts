export function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ');
}

type OpenGraphType = {
  siteName: string;
  description: string;
  templateTitle?: string;
  logo?: string;
  banner?: string;
  isBlog?: boolean;
  tags?: string;
};
export function openGraph({
  siteName,
  templateTitle,
  description,
  banner,
  logo = 'https://og.clarence.link/images/logo.jpg',
  isBlog = false,
  tags,
}: OpenGraphType): string {
  const ogLogo = encodeURIComponent(logo);
  const ogSiteName = encodeURIComponent(siteName.trim());
  const ogTemplateTitle = templateTitle
    ? encodeURIComponent(templateTitle.trim())
    : undefined;
  const ogDesc = encodeURIComponent(description.trim());

  if (isBlog) {
    const ogTags = tags ? encodeURIComponent(tags.trim()) : undefined;
    const ogBanner = banner ? encodeURIComponent(banner.trim()) : undefined;

    return `https://og.clarence.link/api/blog?templateTitle=${ogTemplateTitle}&banner=${ogBanner}&tags=${ogTags}`;
  }

  return `https://og.clarence.link/api/gradient?siteName=${ogSiteName}&description=${ogDesc}&logo=${ogLogo}${
    ogTemplateTitle ? `&templateTitle=${ogTemplateTitle}` : ''
  }`;
}

/**
 * Remove `id-` prefix
 */
export const cleanBlogPrefix = (slug: string) => {
  if (slug.slice(0, 3) === 'id-') {
    return slug.slice(3);
  } else {
    return slug;
  }
};

/**
 * Access session storage on browser
 */
export function getFromSessionStorage(key: string) {
  if (typeof sessionStorage !== 'undefined') {
    return sessionStorage.getItem(key);
  }
  return null;
}

export function getFromLocalStorage(key: string) {
  if (typeof localStorage !== 'undefined') {
    return localStorage.getItem(key);
  }
  return null;
}
