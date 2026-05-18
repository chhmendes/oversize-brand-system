'use client';

import React from 'react';

export interface TimelineItem {
  title: string;
  description: string;
  step?: number;
  status?: 'completed' | 'current' | 'pending';
}

interface TimelineProps {
  items: TimelineItem[];
  type?: 'vertical' | 'horizontal';
}

export function Timeline({
  items,
  type = 'vertical',
}: TimelineProps) {
  if (type === 'horizontal') {
    return (
      <div className="my-8 overflow-x-auto">
        <div className="flex gap-4 min-w-max">
          {items.map((item, index) => (
            <TimelineItemHorizontal
              key={index}
              item={item}
              index={index}
              total={items.length}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="my-8 space-y-6">
      {items.map((item, index) => (
        <TimelineItemVertical
          key={index}
          item={item}
          index={index}
          total={items.length}
        />
      ))}
    </div>
  );
}

interface TimelineItemProps {
  item: TimelineItem;
  index: number;
  total: number;
}

function TimelineItemVertical({
  item,
  index,
  total,
}: TimelineItemProps) {
  const status = item.status || (index === 0 ? 'current' : 'pending');
  const isLast = index === total - 1;

  const statusConfig = {
    completed: {
      bgColor: 'bg-green-600',
      textColor: 'text-green-600',
      icon: '✓',
    },
    current: {
      bgColor: 'bg-[#B51F3A]',
      textColor: 'text-[#B51F3A]',
      icon: '●',
    },
    pending: {
      bgColor: 'bg-gray-400',
      textColor: 'text-gray-400',
      icon: '○',
    },
  };

  const config = statusConfig[status];

  return (
    <div className="flex gap-4">
      {/* Left side - Timeline marker */}
      <div className="flex flex-col items-center">
        <div className={`
          w-8 h-8 rounded-full flex items-center justify-center
          ${config.bgColor} text-white text-sm font-bold
        `}>
          {item.step !== undefined ? item.step : config.icon}
        </div>
        {!isLast && (
          <div className={`
            w-1 h-16 ${config.textColor}
          `} />
        )}
      </div>

      {/* Right side - Content */}
      <div className="pb-8">
        <h3 className="
          text-lg font-semibold text-gray-900
        ">
          {item.title}
        </h3>
        <p className="
          text-sm text-gray-600 mt-2
        ">
          {item.description}
        </p>
      </div>
    </div>
  );
}

function TimelineItemHorizontal({
  item,
  index,
  total,
}: TimelineItemProps) {
  const status = item.status || (index === 0 ? 'current' : 'pending');

  const statusConfig = {
    completed: {
      bgColor: 'bg-green-600',
      textColor: 'text-green-600',
      icon: '✓',
    },
    current: {
      bgColor: 'bg-[#B51F3A]',
      textColor: 'text-[#B51F3A]',
      icon: '●',
    },
    pending: {
      bgColor: 'bg-gray-400',
      textColor: 'text-gray-400',
      icon: '○',
    },
  };

  const config = statusConfig[status];

  return (
    <div className="flex flex-col items-center min-w-max">
      <div className="flex items-center gap-2 mb-4">
        <div className={`
          w-8 h-8 rounded-full flex items-center justify-center
          ${config.bgColor} text-white text-sm font-bold
        `}>
          {item.step !== undefined ? item.step : config.icon}
        </div>
        {index < total - 1 && (
          <div className={`
            w-12 h-1 ${config.textColor}
          `} />
        )}
      </div>

      <div className="text-center">
        <h3 className="
          text-sm font-semibold text-gray-900
        ">
          {item.title}
        </h3>
        <p className="
          text-xs text-gray-600 mt-1 max-w-xs
        ">
          {item.description}
        </p>
      </div>
    </div>
  );
}
