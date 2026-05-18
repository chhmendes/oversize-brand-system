'use client';

import React, { useState } from 'react';

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: boolean;
  icon?: React.ReactNode;
  helpText?: string;
}

export function Input({
  label,
  error,
  success = false,
  icon,
  helpText,
  type = 'text',
  className = '',
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const borderColor = error
    ? 'border-[#B51F3A]'
    : success
      ? 'border-[#2D7D46]'
      : isFocused
        ? 'border-[#B51F3A]'
        : 'border-[#D9D9D9]';

  const ringStyle = isFocused
    ? { boxShadow: '0 0 0 3px #F5E3E7' }
    : {};

  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--fg-3)]">
          {label}
          {props.required && <span className="text-[#B51F3A] ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--fg-3)] flex items-center">
            {icon}
          </div>
        )}

        <input
          type={type}
          className={[
            'w-full px-3.5 py-2.5 rounded-[4px] border transition-colors duration-[120ms]',
            'font-[var(--font-body)] text-sm text-[var(--fg-1)]',
            'placeholder:text-[var(--fg-3)]',
            'bg-[var(--bg-1)]',
            'focus:outline-none',
            'disabled:bg-[var(--bg-3)] disabled:cursor-not-allowed disabled:text-[var(--fg-3)]',
            borderColor,
            icon ? 'pl-10' : '',
            (error || success) ? 'pr-9' : '',
            className,
          ].join(' ')}
          style={ringStyle}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />

        {error && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#B51F3A] text-sm font-bold">
            ×
          </div>
        )}

        {success && !error && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#2D7D46] text-sm font-bold">
            ✓
          </div>
        )}
      </div>

      {error && (
        <p className="text-xs text-[#B51F3A]">{error}</p>
      )}

      {success && !error && (
        <p className="text-xs text-[#2D7D46]">ok</p>
      )}

      {helpText && !error && (
        <p className="text-xs text-[var(--fg-3)]">{helpText}</p>
      )}
    </div>
  );
}

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helpText?: string;
}

export function Textarea({
  label,
  error,
  helpText,
  className = '',
  ...props
}: TextareaProps) {
  const [isFocused, setIsFocused] = useState(false);

  const borderColor = error
    ? 'border-[#B51F3A]'
    : isFocused
      ? 'border-[#B51F3A]'
      : 'border-[#D9D9D9]';

  const ringStyle = isFocused ? { boxShadow: '0 0 0 3px #F5E3E7' } : {};

  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--fg-3)]">
          {label}
          {props.required && <span className="text-[#B51F3A] ml-1">*</span>}
        </label>
      )}

      <textarea
        className={[
          'w-full px-3.5 py-2.5 rounded-[4px] border transition-colors duration-[120ms]',
          'font-[var(--font-body)] text-sm text-[var(--fg-1)]',
          'placeholder:text-[var(--fg-3)]',
          'bg-[var(--bg-1)]',
          'focus:outline-none',
          'disabled:bg-[var(--bg-3)] disabled:cursor-not-allowed',
          'resize-vertical min-h-24',
          borderColor,
          className,
        ].join(' ')}
        style={ringStyle}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />

      {error && (
        <p className="text-xs text-[#B51F3A]">{error}</p>
      )}

      {helpText && !error && (
        <p className="text-xs text-[var(--fg-3)]">{helpText}</p>
      )}
    </div>
  );
}
