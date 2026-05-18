'use client';

import React, { useState } from 'react';

export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
}

interface TabsProps {
  tabs: TabItem[];
  defaultTabId?: string;
  onTabChange?: (tabId: string) => void;
}

export function Tabs({
  tabs,
  defaultTabId,
  onTabChange,
}: TabsProps) {
  const [activeTabId, setActiveTabId] = useState(
    defaultTabId || tabs[0]?.id
  );

  const handleTabChange = (tabId: string) => {
    setActiveTabId(tabId);
    onTabChange?.(tabId);
  };

  const activeTab = tabs.find(tab => tab.id === activeTabId);

  return (
    <div className="space-y-4">
      {/* Tab buttons */}
      <div className="
        flex gap-1 border-b border-gray-300
        overflow-x-auto
      ">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            disabled={tab.disabled}
            className={`
              px-4 py-3 text-sm font-medium
              border-b-2 transition-all whitespace-nowrap
              disabled:opacity-50 disabled:cursor-not-allowed
              ${
                activeTabId === tab.id
                  ? 'border-b-[#B51F3A] text-[#B51F3A]'
                  : 'border-b-transparent text-gray-600 hover:text-[#B51F3A]'
              }
            `}
            aria-selected={activeTabId === tab.id}
            role="tab"
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="py-4 animate-fadeIn">
        {activeTab && (
          <div role="tabpanel">
            {activeTab.content}
          </div>
        )}
      </div>
    </div>
  );
}

// Vertical tabs variant
interface VerticalTabsProps {
  tabs: TabItem[];
  defaultTabId?: string;
  onTabChange?: (tabId: string) => void;
}

export function VerticalTabs({
  tabs,
  defaultTabId,
  onTabChange,
}: VerticalTabsProps) {
  const [activeTabId, setActiveTabId] = useState(
    defaultTabId || tabs[0]?.id
  );

  const handleTabChange = (tabId: string) => {
    setActiveTabId(tabId);
    onTabChange?.(tabId);
  };

  const activeTab = tabs.find(tab => tab.id === activeTabId);

  return (
    <div className="flex gap-6 h-full">
      {/* Tab buttons */}
      <div className="
        flex flex-col gap-1 border-r border-gray-300
        min-w-48
      ">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            disabled={tab.disabled}
            className={`
              px-4 py-3 text-sm font-medium
              border-l-4 transition-all text-left
              disabled:opacity-50 disabled:cursor-not-allowed
              ${
                activeTabId === tab.id
                  ? 'border-l-[#B51F3A] bg-[#F5E3E7] text-[#B51F3A]'
                  : 'border-l-transparent text-gray-600 hover:text-[#B51F3A] hover:bg-gray-50'
              }
            `}
            aria-selected={activeTabId === tab.id}
            role="tab"
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 py-4 animate-fadeIn">
        {activeTab && (
          <div role="tabpanel">
            {activeTab.content}
          </div>
        )}
      </div>
    </div>
  );
}
