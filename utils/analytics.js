/**
 * @param {string} event_value - The value of the event.
 * @param {'link'|'navigate'} event_type - The type of the event.
 * @param {string} [url] - The url of the event.
 * @param {string} [website_id] - The website id of the event.
 * @returns {void}
 */
export const trackEvent = (event_value, event_type, url, website_id) => {
  if (window.umami && typeof window.umami.trackEvent === 'function') {
    window.umami.trackEvent(event_value, event_type, url, website_id);
  }
};
