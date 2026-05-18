'use client';

import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  fullWidth?: boolean;
  hardShadow?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-[#B51F3A] text-white border-2 border-[#B51F3A] hover:bg-[#D42848] hover:border-[#D42848] active:bg-[#8E1A2E] active:border-[#8E1A2E] active:scale-[0.97]',
  secondary:
    'bg-[#3C3C3C] text-white border-2 border-[#3C3C3C] hover:bg-[#4D4D4D] hover:border-[#4D4D4D] active:bg-[#222222] active:scale-[0.97]',
  ghost:
    'bg-transparent text-[#222222] border-2 border-[#222222] hover:border-[#B51F3A] hover:text-[#B51F3A] active:scale-[0.97]',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-8 py-3 text-base',
};

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  hardShadow = false,
  disabled,
  className = '',
  children,
  style,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || isLoading;

  const shadowStyle = hardShadow && !isDisabled
    ? { boxShadow: variant === 'primary' ? '6px 6px 0 0 #222222' : '6px 6px 0 0 #B51F3A' }
    : {};

  return (
    <button
      className={[
        'inline-flex items-center justify-center gap-2',
        'rounded-[2px] font-bold lowercase',
        'tracking-[0.02em] leading-none',
        'transition-all duration-[120ms]',
        'focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#B51F3A]',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none',
        variantStyles[variant],
        sizeStyles[size],
        fullWidth ? 'w-full' : '',
        className,
      ].join(' ')}
      style={{ ...shadowStyle, ...style }}
      disabled={isDisabled}
      {...props}
    >
      {isLoading && (
        <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {children}
    </button>
  );
}

export function PrimaryButton(props: ButtonProps) {
  return <Button variant="primary" {...props} />;
}

export function SecondaryButton(props: ButtonProps) {
  return <Button variant="secondary" {...props} />;
}

export function GhostButton(props: ButtonProps) {
  return <Button variant="ghost" {...props} />;
}
