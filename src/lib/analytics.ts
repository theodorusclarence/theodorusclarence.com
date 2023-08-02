const EVENT_TYPE = ['link', 'navigate', 'recommend'] as const;
type EventType = (typeof EVENT_TYPE)[number];

type TrackEvent = (
  event_name: string,
  event_data?: { type?: EventType } & { [key: string]: string | number }
) => void;

export const trackEvent: TrackEvent = (...args) => {
  if (window.umami && typeof window.umami.track === 'function') {
    window.umami.track(...args);
  }
};
