import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const baseClasses = "py-3 px-8 text-sm font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 tracking-wide";
  
  const variants = {
    primary: "bg-sun-primary text-white hover:bg-black border border-transparent shadow-sm",
    outline: "bg-transparent text-sun-primary border border-sun-primary hover:bg-sun-primary hover:text-white",
    ghost: "bg-transparent text-sun-tertiary hover:text-sun-primary hover:bg-sun-border/30"
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};