import { ReactNode } from 'react';

interface GradientTextProps {
  children: ReactNode;
  className?: string;
}

export const GradientText = ({ children, className = '' }: GradientTextProps) => {
  return (
    <span className={`bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent ${className}`}>
      {children}
    </span>
  );
};
