'use client';

import React from 'react';

interface TableProps {
  children: React.ReactNode;
}

interface TableCellProps {
  children: React.ReactNode;
  align?: 'left' | 'center' | 'right';
}

export function Table({ children }: TableProps) {
  return (
    <div className="
      overflow-x-auto my-6 rounded-lg border border-gray-300
    ">
      <table className="
        w-full text-sm border-collapse
      ">
        {children}
      </table>
    </div>
  );
}

export function TableHead({ children }: { children: React.ReactNode }) {
  return (
    <thead className="
      bg-gray-100 border-b-2 border-gray-300
    ">
      {children}
    </thead>
  );
}

export function TableBody({ children }: { children: React.ReactNode }) {
  return (
    <tbody>
      {children}
    </tbody>
  );
}

export function TableRow({ children, isHeader = false }: { children: React.ReactNode; isHeader?: boolean }) {
  return (
    <tr className={`
      border-b border-gray-200
      ${isHeader ? 'bg-gray-100' : 'hover:bg-gray-50 transition-colors'}
    `}>
      {children}
    </tr>
  );
}

export function TableCell({
  children,
  align = 'left',
  isHeader = false,
}: TableCellProps & { isHeader?: boolean }) {
  const CellComponent = isHeader ? 'th' : 'td';

  return (
    <CellComponent className={`
      px-4 py-3 text-${align}
      ${isHeader ? 'font-semibold text-gray-900' : 'text-gray-700'}
    `}>
      {children}
    </CellComponent>
  );
}

// Markdown table component wrapper
interface MarkdownTableProps {
  children: React.ReactNode;
}

export function MarkdownTable({ children }: MarkdownTableProps) {
  return (
    <div className="
      overflow-x-auto my-6 rounded-lg border border-gray-300
    ">
      <table className="
        w-full text-sm
      ">
        {children}
      </table>
    </div>
  );
}
