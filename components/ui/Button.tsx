import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'destructive' | 'secondary' | 'gradient-left' | 'gradient-right';
  size?: 'sm' | 'default' | 'lg' | 'icon';
}

export const Button: React.FC<ButtonProps> = ({ 
  className = '', 
  variant = 'default', 
  size = 'default', 
  children, 
  ...props 
}) => {
  
  const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-arcade uppercase font-bold tracking-wider transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 active:scale-95 shadow-[0_0_15px_rgba(0,0,0,0.5)]";
  
  const variants = {
    default: "bg-primary text-black hover:bg-primary/90 hover:shadow-[0_0_20px_hsl(var(--primary))]",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    outline: "border-2 border-white/20 bg-transparent hover:bg-white/10 text-white",
    secondary: "bg-white/10 backdrop-blur-md text-white border border-white/10 hover:bg-white/20",
    ghost: "hover:bg-accent/20 hover:text-accent-foreground",
    "gradient-left": "bg-gradient-to-r from-[#8600F0] to-[#F900CE] text-white hover:brightness-110 border border-white/20",
    "gradient-right": "bg-gradient-to-r from-[#5497F7] to-[#2C6AEC] text-white hover:brightness-110 border border-white/20"
  };

  const sizes = {
    sm: "h-8 px-4 text-xs",
    default: "h-12 px-6",
    lg: "h-14 px-8 text-base",
    icon: "h-10 w-10 p-2"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};