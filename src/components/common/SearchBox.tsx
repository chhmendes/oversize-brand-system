'use client';

import React, { useState, useCallback } from 'react';

export interface SearchResult {
  id: string;
  title: string;
  description?: string;
  href: string;
  category?: string;
}

interface SearchBoxProps {
  placeholder?: string;
  results?: SearchResult[];
  onSearch?: (query: string) => void;
  onSelectResult?: (result: SearchResult) => void;
  minChars?: number;
}

export function SearchBox({
  placeholder = 'Search...',
  results = [],
  onSearch,
  onSelectResult,
  minChars = 2,
}: SearchBoxProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [filteredResults, setFilteredResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleSearch = useCallback(
    (value: string) => {
      setQuery(value);
      setSelectedIndex(-1);

      if (value.length >= minChars) {
        onSearch?.(value);

        // Filter results based on query
        const filtered = results.filter(
          result =>
            result.title.toLowerCase().includes(value.toLowerCase()) ||
            result.description?.toLowerCase().includes(value.toLowerCase())
        );

        setFilteredResults(filtered);
        setIsOpen(filtered.length > 0);
      } else {
        setFilteredResults([]);
        setIsOpen(false);
      }
    },
    [minChars, onSearch, results]
  );

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev =>
          prev < filteredResults.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && filteredResults[selectedIndex]) {
          const result = filteredResults[selectedIndex];
          onSelectResult?.(result);
          setQuery('');
          setIsOpen(false);
          setSelectedIndex(-1);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  return (
    <div className="relative">
      <div className="relative">
        <div className="
          absolute left-3 top-1/2 -translate-y-1/2
          text-gray-400
        ">
          🔍
        </div>

        <input
          type="text"
          value={query}
          onChange={e => handleSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query.length >= minChars && setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          placeholder={placeholder}
          className="
            w-full pl-10 pr-4 py-2.5 rounded-md
            border border-gray-300
            focus:outline-none focus:ring-2 focus:ring-[#B51F3A]
            focus:border-transparent
          "
        />
      </div>

      {/* Results dropdown */}
      {isOpen && filteredResults.length > 0 && (
        <div className="
          absolute top-full left-0 right-0 mt-2
          bg-white border border-gray-300 rounded-md
          shadow-lg z-50 max-h-96 overflow-y-auto
        ">
          {filteredResults.map((result, index) => (
            <button
              key={result.id}
              onClick={() => {
                onSelectResult?.(result);
                setQuery('');
                setIsOpen(false);
              }}
              className={`
                w-full text-left px-4 py-3 transition-colors
                ${
                  index === selectedIndex
                    ? 'bg-[#F5E3E7] text-[#3A0E12]'
                    : 'hover:bg-gray-50 text-gray-900'
                }
                ${index < filteredResults.length - 1 ? 'border-b border-gray-200' : ''}
              `}
            >
              <div className="font-medium text-sm">
                {result.title}
              </div>
              {result.description && (
                <div className="text-xs text-gray-500 mt-1">
                  {result.description}
                </div>
              )}
              {result.category && (
                <div className="text-xs text-[#B51F3A] mt-1">
                  {result.category}
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* No results message */}
      {isOpen && query.length >= minChars && filteredResults.length === 0 && (
        <div className="
          absolute top-full left-0 right-0 mt-2
          bg-white border border-gray-300 rounded-md
          shadow-lg z-50 px-4 py-6 text-center
        ">
          <p className="text-sm text-gray-500">
            No results found for "{query}"
          </p>
        </div>
      )}
    </div>
  );
}

// Advanced search with Fuse.js integration
interface FuseSearchBoxProps {
  placeholder?: string;
  data: SearchResult[];
  threshold?: number;
  onSelectResult?: (result: SearchResult) => void;
}

export function FuseSearchBox({
  placeholder = 'Search...',
  data,
  threshold: _threshold = 0.3,
  onSelectResult,
}: FuseSearchBoxProps) {
  const [results, setResults] = useState<SearchResult[]>([]);

  const handleSearch = useCallback(
    (searchQuery: string) => {

      if (searchQuery.length < 2) {
        setResults([]);
        return;
      }

      // Simple fuzzy search implementation
      // In production, use Fuse.js
      const filtered = data.filter(item => {
        const queryLower = searchQuery.toLowerCase();
        return (
          item.title.toLowerCase().includes(queryLower) ||
          item.description?.toLowerCase().includes(queryLower)
        );
      });

      setResults(filtered);
    },
    [data]
  );

  return (
    <SearchBox
      placeholder={placeholder}
      results={results}
      onSearch={handleSearch}
      onSelectResult={onSelectResult}
      minChars={2}
    />
  );
}
