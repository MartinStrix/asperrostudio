import { useState } from 'react';
// Import only YouTube player to reduce bundle size (~35KB savings)
import ReactPlayer from 'react-player/youtube';

interface VideoEmbedProps {
  url: string;
  title?: string;
}

export const VideoEmbed = ({ url, title }: VideoEmbedProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="relative aspect-video rounded-xl overflow-hidden glass">
      <ReactPlayer
        url={url}
        width="100%"
        height="100%"
        controls
        light
        playing={isPlaying}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        config={{
          playerVars: {
            modestbranding: 1,
            rel: 0,
          },
        }}
      />
      {title && !isPlaying && (
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent pointer-events-none">
          <h3 className="text-white font-semibold">{title}</h3>
        </div>
      )}
    </div>
  );
};
