import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  href?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export const Button = ({
  children,
  variant = 'primary',
  href,
  onClick,
  className = '',
  disabled = false,
  isLoading = false,
  type = 'button',
}: ButtonProps) => {
  const baseStyles = 'inline-flex items-center justify-center px-6 py-3 font-semibold rounded-lg transition-all duration-200 ease-out';

  const variants = {
    primary: 'bg-gradient-to-r from-cyan-400 to-pink-500 text-white hover:shadow-lg hover:shadow-pink-500/25 hover:brightness-110',
    secondary: 'border-2 border-white/20 text-white hover:border-cyan-400 hover:text-cyan-400',
  };

  const disabledStyles = disabled || isLoading
    ? 'opacity-50 cursor-not-allowed hover:shadow-none hover:brightness-100'
    : 'active:scale-[0.98]';

  const styles = `${baseStyles} ${variants[variant]} ${disabledStyles} ${className}`;

  const content = isLoading ? (
    <>
      <svg
        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      <span>Odesílám...</span>
      <span className="sr-only">Odesílám formulář, prosím čekejte.</span>
    </>
  ) : (
    children
  );

  if (href) {
    return (
      <a href={href} className={styles}>
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      className={styles}
    >
      {content}
    </button>
  );
};
