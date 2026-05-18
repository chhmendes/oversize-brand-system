'use client';

import React from 'react';

export type CalloutType = 'info' | 'warning' | 'success' | 'error';

interface CalloutProps {
  type: CalloutType;
  title?: string;
  children: React.ReactNode;
  icon?: string;
}

const calloutConfig = {
  info: {
    bgColor: 'bg-[#F5E3E7]',
    borderColor: 'border-blue-300',
    textColor: 'text-[#3A0E12]',
    titleColor: 'text-[#3A0E12]',
    icon: 'ℹ️',
  },
  warning: {
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-300',
    textColor: 'text-amber-900',
    titleColor: 'text-amber-900',
    icon: '⚠️',
  },
  success: {
    bgColor: 'bg-green-50',
    borderColor: 'border-green-300',
    textColor: 'text-green-900',
    titleColor: 'text-green-900',
    icon: '✓',
  },
  error: {
    bgColor: 'bg-red-50',
    borderColor: 'border-red-300',
    textColor: 'text-red-900',
    titleColor: 'text-red-900',
    icon: '✕',
  },
};

export function Callout({
  type = 'info',
  title,
  children,
  icon,
}: CalloutProps) {
  const config = calloutConfig[type];
  const displayIcon = icon || config.icon;

  return (
    <div className={`
      my-6 px-4 py-4 rounded-lg
      border-l-4
      ${config.bgColor} ${config.borderColor} ${config.textColor}
    `}>
      {(title || displayIcon) && (
        <div className="flex items-center gap-3 mb-2">
          {displayIcon && (
            <span className="text-lg flex-shrink-0">{displayIcon}</span>
          )}
          {title && (
            <h3 className={`
              font-semibold text-sm
              ${config.titleColor}
            `}>
              {title}
            </h3>
          )}
        </div>
      )}

      <div className="text-sm leading-relaxed">
        {children}
      </div>
    </div>
  );
}

// Specialized callout variants
export function InfoCallout({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <Callout type="info" title={title}>
      {children}
    </Callout>
  );
}

export function WarningCallout({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <Callout type="warning" title={title}>
      {children}
    </Callout>
  );
}

export function SuccessCallout({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <Callout type="success" title={title}>
      {children}
    </Callout>
  );
}

export function ErrorCallout({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <Callout type="error" title={title}>
      {children}
    </Callout>
  );
}
