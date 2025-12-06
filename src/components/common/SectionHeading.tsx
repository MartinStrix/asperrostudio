import { GradientText } from './GradientText';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  gradient?: boolean;
  centered?: boolean;
}

export const SectionHeading = ({
  title,
  subtitle,
  gradient = true,
  centered = true,
}: SectionHeadingProps) => {
  return (
    <div className={`mb-12 md:mb-16 ${centered ? 'text-center' : ''}`}>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display mb-4">
        {gradient ? <GradientText>{title}</GradientText> : title}
      </h2>
      {subtitle && (
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
};
