export const fadeInAndUp = {
  initial: { y: 40, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
};

export const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const staggerFaster = {
  animate: {
    transition: {
      staggerChildren: 0.07,
    },
  },
};
