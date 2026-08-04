import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  getConsent,
  setConsent,
  CONSENT_CHANGED_EVENT,
} from '../../utils/cookieConsent';
// Import only YouTube player to reduce bundle size (~35KB savings)
import ReactPlayer from 'react-player/youtube';

interface VideoEmbedProps {
  url: string;
  title?: string;
}

// Extract YouTube video ID from various URL formats
const getYouTubeVideoId = (url: string): string | null => {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&?/]+)/,
    /youtube\.com\/v\/([^&?/]+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
};

// Get direct YouTube thumbnail URL (bypasses noembed.com)
const getYouTubeThumbnail = (url: string): string | boolean => {
  const videoId = getYouTubeVideoId(url);
  if (videoId) {
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  }
  return true; // Fallback to react-player's default behavior
};

export const VideoEmbed = ({ url, title }: VideoEmbedProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  // Souhlas s cookies třetích stran (YouTube)
  const [hasConsent, setHasConsent] = useState(() => getConsent() === 'all');
  const [showConsentPrompt, setShowConsentPrompt] = useState(false);

  useEffect(() => {
    const update = () => setHasConsent(getConsent() === 'all');
    window.addEventListener(CONSENT_CHANGED_EVENT, update);
    return () => window.removeEventListener(CONSENT_CHANGED_EVENT, update);
  }, []);

  const handlePreviewClick = () => {
    if (hasConsent) {
      setIsPlaying(true);
    } else {
      setShowConsentPrompt(true);
    }
  };

  const allowAndPlay = () => {
    setConsent('all');
    setShowConsentPrompt(false);
    setIsPlaying(true);
  };

  return (
    <div className="relative aspect-video rounded-xl overflow-hidden glass">
      <ReactPlayer
        url={url}
        width="100%"
        height="100%"
        controls
        light={getYouTubeThumbnail(url)}
        playing={isPlaying}
        onClickPreview={handlePreviewClick}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onError={(error) => {
          console.error('Video playback error:', error);
          setHasError(true);
        }}
        onReady={() => console.log('Video ready:', url)}
        config={{
          playerVars: {
            modestbranding: 1,
            rel: 0,
          },
        }}
      />
      {title && !isPlaying && !hasError && (
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent pointer-events-none">
          <h3 className="text-white font-semibold">{title}</h3>
        </div>
      )}
      {showConsentPrompt && !isPlaying && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-dark/90 backdrop-blur-sm p-4">
          <div className="text-center max-w-sm">
            <p className="text-white font-semibold mb-1">Video ze služby YouTube</p>
            <p className="text-gray-300 text-sm mb-4">
              Přehráním se načte obsah od společnosti Google, která může
              ukládat cookies.{' '}
              <Link to="/cookies" className="underline hover:text-white">
                Zásady cookies
              </Link>
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5">
              <button
                type="button"
                onClick={() => setShowConsentPrompt(false)}
                className="px-4 py-2 rounded-lg text-sm font-medium border border-white/25 text-white hover:border-white/60 transition-colors"
              >
                Zrušit
              </button>
              <button
                type="button"
                onClick={allowAndPlay}
                className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-cyan-400 to-pink-500 hover:brightness-110 transition-all"
              >
                Povolit a přehrát
              </button>
            </div>
          </div>
        </div>
      )}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-dark/80 rounded-xl">
          <div className="text-center p-6">
            <p className="text-gray-400 mb-2">Video nelze načíst</p>
            <p className="text-gray-500 text-sm">Zkontrolujte konzoli pro více informací</p>
          </div>
        </div>
      )}
    </div>
  );
};
