import { useEffect, useRef, useState } from 'react';

interface VideoBlobProps {
  videoSrc: string;
  color: 'cyan' | 'pink';
  position: 'top-left' | 'bottom-right';
  className?: string;
  posterSrc?: string;
}

export const VideoBlob = ({
  videoSrc,
  color,
  position,
  className = '',
  posterSrc
}: VideoBlobProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setShouldReduceMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setShouldReduceMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Check if mobile device (disable video on mobile for performance)
  useEffect(() => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
    if (isMobile) {
      setShouldReduceMotion(true);
    }
  }, []);

  // Load video immediately (removed delay for better UX)
  useEffect(() => {
    if (shouldReduceMotion) return;
    setShouldLoadVideo(true);
  }, [shouldReduceMotion]);

  // Intersection Observer to pause video when not visible
  useEffect(() => {
    if (!videoRef.current || shouldReduceMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (videoRef.current) {
          if (entry.isIntersecting) {
            videoRef.current.play().catch(() => {
              // Ignore autoplay errors
            });
          } else {
            videoRef.current.pause();
          }
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(videoRef.current);

    return () => observer.disconnect();
  }, [shouldReduceMotion, isLoaded]);

  // Handle video load
  const handleCanPlay = () => {
    setIsLoaded(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Ignore autoplay errors
      });
    }
  };

  // Handle video error
  const handleError = () => {
    setHasError(true);
    setIsLoaded(false);
  };

  // Position classes
  const positionClasses = {
    'top-left': 'top-0 left-1/4',
    'bottom-right': 'bottom-0 right-1/4',
  };

  // Color filter classes for CSS tinting
  const colorFilters = {
    cyan: 'hue-rotate-180 saturate-200',
    pink: 'hue-rotate-300 saturate-200',
  };

  // Static gradient fallback
  const gradientFallback = {
    cyan: 'bg-cyan-500/20',
    pink: 'bg-pink-500/20',
  };

  // Show static gradient if reduced motion, error, or video not loaded
  const showStaticFallback = shouldReduceMotion || hasError || !isLoaded;

  return (
    <div
      className={`absolute w-96 h-96 ${positionClasses[position]} ${className}`}
    >
      {/* Static gradient fallback - always rendered underneath */}
      <div
        className={`absolute inset-0 ${gradientFallback[color]} rounded-full blur-[128px]`}
        style={{ opacity: showStaticFallback ? 1 : 0 }}
      />

      {/* Video blob - only render if not reducing motion */}
      {!shouldReduceMotion && shouldLoadVideo && (
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover rounded-xl ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } transition-opacity duration-1000`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={posterSrc}
          onCanPlay={handleCanPlay}
          onError={handleError}
          aria-hidden="true"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}
    </div>
  );
};
