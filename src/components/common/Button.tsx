import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  href?: string;
  onClick?: () => void;
  className?: string;
}

export const Button = ({
  children,
  variant = 'primary',
  href,
  onClick,
  className = '',
}: ButtonProps) => {
  const baseStyles = 'inline-flex items-center justify-center px-6 py-3 font-semibold rounded-lg transition-all duration-200 ease-out active:scale-[0.98]';

  const variants = {
    primary: 'bg-gradient-to-r from-cyan-400 to-pink-500 text-white hover:shadow-lg hover:shadow-pink-500/25 hover:brightness-110',
    secondary: 'border-2 border-white/20 text-white hover:border-cyan-400 hover:text-cyan-400',
  };

  const styles = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={styles}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={styles}>
      {children}
    </button>
  );
};
