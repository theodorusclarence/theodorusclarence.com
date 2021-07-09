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

export const ogGenerate = (title, type = 'Blog') => {
  const ogTitle = encodeURIComponent(title.trim());
  const ogType = encodeURIComponent(type.trim());

  return `https://og-image.vercel.app/%3Cdiv%20style%3D'position%3A%20absolute%3B%20inset%3A%200%3B%20background%3A%20%23333%3B%20color%3A%20white%3B%20display%3A%20flex%3B%20align-items%3Acenter%3B%20justify-content%3Acenter%3B%20flex-direction%3A%20column%3B'%3E%20%3Cdiv%20style%3D'display%3A%20flex%3B%20align-items%3A%20center%3B'%3E%20%3Cimg%20src%3D%22https%3A%2F%2Ftheodorusclarence.com%2Ffavicon%2Flarge-og.jpg%22%20alt%3D%22Favicon%22%20style%3D'max-width%3A%20180px'%3E%20%3Cp%20style%3D'margin%3A%200%3B%20font-size%3A%204rem%3B%20margin-left%3A%202rem%3B%20text-align%3A%20left%3B%20line-height%3A%201.5%3B'%3E${ogType}%20by%3Cbr%20%2F%3E%20%3Cspan%20style%3D%22font-weight%3A%20bold%3Bcolor%3A%20%23333%3Bpadding%3A.5rem%201rem%3Bbackground-image%3A%20linear-gradient(to%20top%20right%2C%20%2300e887%2C%20%2300E0F3)%3B%22%3ETheodorus%20Clarence%3C%2Fspan%3E%20%3C%2Fp%3E%20%3C%2Fdiv%3E%20%3Ch3%20style%3D'margin%3A%202rem%200%3B%20max-width%3A%2080%25'%3E${ogTitle}%3C%2Fh3%3E%20%3Cp%20style%3D'position%3A%20absolute%3B%20right%3A%202rem%3B%20bottom%3A%200%3B%20font-size%3A%202rem'%3Ehttps%3A%2F%2Ftheodorusclarence.com%3C%2Fp%3E%20%3C%2Fdiv%3E.png?theme=dark&md=1&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fvercel-triangle-white.svg`;
};

export function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
