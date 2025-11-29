import React from 'react';
import { CalculatorButton } from '../types';

interface ButtonProps {
  button: CalculatorButton;
  onClick: (value: string) => void;
}

const Button: React.FC<ButtonProps> = ({ button, onClick }) => {
  const baseClasses = "relative overflow-hidden rounded-2xl text-2xl font-medium transition-all duration-100 active:scale-95 flex items-center justify-center select-none outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#17171C]";
  
  const variants = {
    default: "bg-calc-btn hover:bg-calc-btnHover text-white",
    accent: "bg-calc-accent hover:bg-calc-accentHover text-white text-3xl",
    function: "bg-calc-function hover:bg-calc-functionHover text-white",
    danger: "bg-red-500/10 text-red-400 hover:bg-red-500/20"
  };

  const spanClass = button.span ? `col-span-${button.span}` : '';
  const heightClass = "h-[72px] sm:h-20"; // Responsive height

  return (
    <button
      onClick={() => onClick(button.value)}
      className={`${baseClasses} ${variants[button.variant || 'default']} ${spanClass} ${heightClass}`}
      aria-label={button.label}
    >
      {button.icon ? button.icon : button.label}
    </button>
  );
};

export default Button;
