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
    return `${months[dateObj.getMonth()]} ${dateObj.getDate()}, ${dateObj.getFullYear()}`;
};
