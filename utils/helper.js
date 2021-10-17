const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

/**
 * @description format date to full text
 * @example '2020-1-18' to 'January 1, 2020'
 */
export const formatDate = (dateString) => {
  const dateObj = new Date(dateString);
  return `${
    months[dateObj.getMonth()]
  } ${dateObj.getDate()}, ${dateObj.getFullYear()}`;
};

export const checkBlogPrefix = (slug) => {
  if (slug.slice(0, 3) === 'id-') {
    return slug.slice(3);
  } else {
    return slug;
  }
};

export const ogGenerate = (title, type, description) => {
  const ogTitle = encodeURIComponent(title.trim());
  const ogType = encodeURIComponent(type.trim());
  const ogDesc = description
    ? encodeURIComponent(description.trim())
    : undefined;

  return `https://og.thcl.dev/api/personal?type=${ogType}&title=${ogTitle}${
    ogDesc ? `&description=${ogDesc}` : ''
  }`;
};

export function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// `wait` milliseconds.
export const debounce = (func, wait) => {
  let timeout;

  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export function sortByDate(contents) {
  return contents.sort(
    (contentA, contentB) =>
      new Date(contentB.publishedAt) - new Date(contentA.publishedAt)
  );
}

export function sortByTitle(contents) {
  return contents.sort((a, b) =>
    a.title > b.title ? 1 : b.title > a.title ? -1 : 0
  );
}

export function getFromLocalStorage(key) {
  if (typeof localStorage !== 'undefined') {
    return localStorage.getItem(key);
  }
  return null;
}

export function getFromSessionStorage(key) {
  if (typeof sessionStorage !== 'undefined') {
    return sessionStorage.getItem(key);
  }
  return null;
}
