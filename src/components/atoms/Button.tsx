import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  isLoading?: boolean;
}

const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  isLoading = false,
  disabled,
  className = '',
  ...props 
}: ButtonProps) => {
  const baseClasses = 'font-medium rounded-md focus:outline-none focus:ring-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'text-white bg-blue-600 border border-transparent hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'text-gray-600 bg-gray-100 border border-gray-300 hover:bg-gray-200 focus:ring-gray-500',
    success: 'text-white bg-green-600 border border-transparent hover:bg-green-700 focus:ring-green-500',
    danger: 'text-white bg-red-600 border border-transparent hover:bg-red-700 focus:ring-red-500',
    ghost: 'text-gray-500 bg-transparent border border-gray-300 hover:bg-gray-50 focus:ring-blue-500'
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  return (
    <button
      className={classes}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
          Loading...
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
