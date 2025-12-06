import ReactPlayer from 'react-player';

interface VideoEmbedProps {
  url: string;
  title?: string;
}

export const VideoEmbed = ({ url, title }: VideoEmbedProps) => {
  return (
    <div className="relative aspect-video rounded-xl overflow-hidden glass">
      <ReactPlayer
        url={url}
        width="100%"
        height="100%"
        controls
        light
        playing={false}
        config={{
          youtube: {
            playerVars: { showinfo: 1 },
          },
        }}
      />
      {title && (
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
          <h3 className="text-white font-semibold">{title}</h3>
        </div>
      )}
    </div>
  );
};
