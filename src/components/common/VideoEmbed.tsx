import { useState } from 'react';
// Import only YouTube player to reduce bundle size (~35KB savings)
import ReactPlayer from 'react-player/youtube';

interface VideoEmbedProps {
  url: string;
  title?: string;
}

export const VideoEmbed = ({ url, title }: VideoEmbedProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative aspect-video rounded-xl overflow-hidden glass">
      <ReactPlayer
        url={url}
        width="100%"
        height="100%"
        controls
        light
        playing={isPlaying}
        onClickPreview={() => setIsPlaying(true)}
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
