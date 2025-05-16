import React from 'react';
import './Button.scss';

interface ButtonProps {
  text: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  variant = 'primary',
  fullWidth = false,
  disabled = false,
}) => {
  return (
    <button
      className={`button button__${variant} ${fullWidth ? 'button__full-width' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
