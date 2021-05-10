import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import { fadeInAndUp } from '@/utils/FramerAnimation';

export default function InViewSection(props) {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.4,
  });

  useEffect(() => {
    if (inView) {
      controls.start('animate');
    }
  }, [controls, inView]);

  return (
    <motion.section
      {...props}
      ref={ref}
      initial='initial'
      animate={controls}
      variants={fadeInAndUp}
    >
      {props.children}
    </motion.section>
  );
}
