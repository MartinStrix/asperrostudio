import { useInView } from 'react-intersection-observer';

// Check for reduced motion preference
const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const useScrollAnimation = (threshold = 0.2) => {
  const [ref, inView] = useInView({
    threshold,
    triggerOnce: true,
  });

  // Return animation state directly - no need for deprecated useAnimation hook
  // If user prefers reduced motion, always show content immediately
  const shouldAnimate = prefersReducedMotion ? true : inView;

  return {
    ref,
    inView,
    // For components using the old controls API, provide animate string
    animate: shouldAnimate ? 'visible' : 'hidden',
    // For backwards compatibility with existing components using controls.start()
    controls: {
      start: () => Promise.resolve(),
    },
  };
};
