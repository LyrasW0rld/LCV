import React, { useState, useMemo, useRef, useEffect } from 'react';
import { CodeNode, NodeKind } from '../types';
import { Search, X, Crosshair } from 'lucide-react';

interface NodeSearchBoxProps {
  allNodes: CodeNode[];
  onSelectFocusNode: (node: CodeNode) => void;
}

export const NodeSearchBox: React.FC<NodeSearchBoxProps> = ({
  allNodes,
  onSelectFocusNode,
}) => {
  const [query, setQuery] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [highlightIndex, setHighlightIndex] = useState<number>(0);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  // Filter Functions and Classes matching the typed query
  const suggestions = useMemo(() => {
    const searchable = allNodes.filter(
      (n) =>
        n.kind === NodeKind.CLASS ||
        n.kind === NodeKind.FUNCTION ||
        n.kind === NodeKind.RECURSION
    );
    const q = query.trim().toLowerCase();
    if (!q) {
      return searchable.slice(0, 8);
    }
    return searchable
      .filter(
        (n) =>
          n.symbolName.toLowerCase().includes(q) ||
          n.label.toLowerCase().includes(q) ||
          n.className.toLowerCase().includes(q) ||
          n.fileName.toLowerCase().includes(q)
      )
      .slice(0, 10);
  }, [allNodes, query]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    window.addEventListener('mousedown', handleClickOutside);
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChoose = (node: CodeNode) => {
    setQuery(node.symbolName);
    setIsOpen(false);
    onSelectFocusNode(node);
  };

  return (
    <div
      ref={wrapperRef}
      onMouseDown={(e) => e.stopPropagation()}
      className="relative flex items-center"
    >
      {/* Autocomplete Suggestions Dropdown above the search bar */}
      {isOpen && suggestions.length > 0 && (
        <div className="absolute bottom-full left-0 mb-1.5 w-72 bg-[#0D0D13] border border-[#E5A93C]/80 rounded shadow-2xl overflow-hidden z-50">
          <div className="px-2.5 py-1 bg-[#16161F] border-b border-zinc-800 text-[10px] font-sans uppercase tracking-wider text-[#F7D794] font-semibold flex items-center justify-between">
            <span>Matching Functions & Classes</span>
            <span className="text-zinc-500">{suggestions.length} hits</span>
          </div>
          <div className="max-h-56 overflow-y-auto divide-y divide-zinc-800/70">
            {suggestions.map((item, idx) => {
              const isHighlighted = idx === highlightIndex;
              const isClass = item.kind === NodeKind.CLASS;
              return (
                <button
                  key={item.id}
                  type="button"
                  onMouseEnter={() => setHighlightIndex(idx)}
                  onClick={() => handleChoose(item)}
                  className={`w-full px-2.5 py-1.5 text-left flex items-center justify-between gap-2 transition ${
                    isHighlighted ? 'bg-[#231B0E] text-[#F7D794]' : 'hover:bg-zinc-900 text-zinc-200'
                  }`}
                >
                  <div className="min-w-0">
                    <div className="font-mono text-xs font-semibold truncate flex items-center gap-1.5">
                      <Crosshair className="w-3 h-3 text-[#E5A93C] shrink-0" />
                      <span className="truncate">
                        {isClass ? item.symbolName : `${item.symbolName}()`}
                      </span>
                    </div>
                    <div className="font-sans text-[10px] text-zinc-400 truncate pl-4">
                      {item.fileName} • L{item.lineStart}
                    </div>
                  </div>
                  <span
                    className={`shrink-0 text-[9.5px] font-mono px-1.5 py-0.5 rounded border ${
                      isClass
                        ? 'bg-[#281E10] text-[#F7D794] border-[#E5A93C]/60'
                        : 'bg-zinc-900 text-sky-300 border-zinc-700'
                    }`}
                  >
                    {isClass ? 'CLASS' : 'FN'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Search Input Box */}
      <div className="flex items-center bg-[#14141C] border border-zinc-700 focus-within:border-[#E5A93C] rounded px-2 py-1 w-52 sm:w-60">
        <Search className="w-3.5 h-3.5 text-[#E5A93C] shrink-0 mr-1.5" />
        <input
          type="text"
          value={query}
          onFocus={() => {
            setIsOpen(true);
            setHighlightIndex(0);
          }}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setHighlightIndex(0);
          }}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') {
              e.preventDefault();
              setHighlightIndex((i) => Math.min(suggestions.length - 1, i + 1));
            } else if (e.key === 'ArrowUp') {
              e.preventDefault();
              setHighlightIndex((i) => Math.max(0, i - 1));
            } else if (e.key === 'Enter' && suggestions[highlightIndex]) {
              e.preventDefault();
              handleChoose(suggestions[highlightIndex]);
            } else if (e.key === 'Escape') {
              setIsOpen(false);
            }
          }}
          placeholder="Search Function / Class..."
          className="bg-transparent text-xs font-sans text-zinc-100 placeholder-zinc-500 focus:outline-none w-full"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setIsOpen(true);
            }}
            className="text-zinc-400 hover:text-zinc-200 ml-1"
            title="Clear search"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </div>
    </div>
  );
};
