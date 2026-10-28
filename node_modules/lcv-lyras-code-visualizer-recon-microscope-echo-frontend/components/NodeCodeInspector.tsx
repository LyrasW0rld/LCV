import React, { useState, useEffect, useMemo, useRef } from 'react';
import { CodeNode, GraphEdge, NodeKind, ProjectRepository } from '../types';
import { getPreferenceCookie, setPreferenceCookie } from '../services/cookieService';
import {
  ArrowRightLeft,
  Code2,
  AlertTriangle,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Heart,
  ExternalLink,
  Crosshair,
} from 'lucide-react';

interface NodeCodeInspectorProps {
  activeNode: CodeNode | null;
  hoveredEdge: GraphEdge | null;
  repository: ProjectRepository;
  collapsed: boolean;
  onToggleCollapse: () => void;
  onSelectNode: (node: CodeNode) => void;
}

const IDE_KEYWORDS = new Set([
  'public', 'private', 'protected', 'static', 'virtual', 'inline', 'async', 'await',
  'class', 'struct', 'interface', 'impl', 'fn', 'def', 'function', 'return',
  'if', 'else', 'for', 'while', 'switch', 'case', 'break', 'continue', 'match',
  'using', 'import', 'from', 'package', 'include', 'new', 'null', 'NULL', 'None',
  'true', 'false', 'True', 'False', 'void', 'int', 'float', 'double', 'bool',
  'string', 'char', 'let', 'const', 'var', 'pub', 'usize', 'uint32_t', 'size_t', 'self', 'this'
]);

function renderSyntaxHighlightedLine(line: string): React.ReactNode {
  const trimmed = line.trim();
  if (trimmed.startsWith('//') || trimmed.startsWith('#') || trimmed.startsWith('/*') || trimmed.startsWith('*')) {
    return <span className="text-zinc-500 italic">{line}</span>;
  }

  const tokenRegex = /(".*?"|'.*?'|\b[a-zA-Z_][a-zA-Z0-9_]*\b|\b\d+(?:\.\d+)?f?\b)/g;
  const parts = line.split(tokenRegex);

  return parts.map((part, idx) => {
    if (!part) return null;
    if ((part.startsWith('"') && part.endsWith('"')) || (part.startsWith("'") && part.endsWith("'"))) {
      return (
        <span key={idx} className="text-amber-200">
          {part}
        </span>
      );
    }
    if (/^\d+(?:\.\d+)?f?$/.test(part)) {
      return (
        <span key={idx} className="text-orange-300">
          {part}
        </span>
      );
    }
    if (IDE_KEYWORDS.has(part)) {
      return (
        <span key={idx} className="text-[#F3C66F] font-semibold">
          {part}
        </span>
      );
    }
    const nextPart = parts[idx + 1] || '';
    if (/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(part) && nextPart.trimStart().startsWith('(')) {
      return (
        <span key={idx} className="text-sky-300 font-medium">
          {part}
        </span>
      );
    }
    return <span key={idx} className="text-zinc-200">{part}</span>;
  });
}

/**
 * 15% Larger & Collapsible Fuchshilfe Support Banner — Automatically collapses after 30 seconds
 */
const FoxRescueSupportCard: React.FC = () => {
  const [bannerCollapsed, setBannerCollapsed] = useState<boolean>(() => {
    return getPreferenceCookie('lcv_fox_banner_collapsed', 'false') === 'true';
  });

  useEffect(() => {
    if (bannerCollapsed) return;
    const timer = window.setTimeout(() => {
      setBannerCollapsed(true);
      setPreferenceCookie('lcv_fox_banner_collapsed', 'true');
    }, 30000);
    return () => window.clearTimeout(timer);
  }, [bannerCollapsed]);

  const toggleBanner = () => {
    setBannerCollapsed((prev) => {
      const next = !prev;
      setPreferenceCookie('lcv_fox_banner_collapsed', String(next));
      return next;
    });
  };

  return (
    <div className="bg-[#0C0C10] border-t border-[#E5A93C]/50 shrink-0 select-none">
      <button
        type="button"
        onClick={toggleBanner}
        className="w-full px-3.5 py-2.5 bg-[#14141A] hover:bg-[#1B1B22] flex items-center justify-between transition"
        title={bannerCollapsed ? 'Expand Fox Support Banner' : 'Collapse Fox Support Banner (Auto-minimizes after 30s)'}
      >
        <span className="font-sans text-xs uppercase tracking-wider text-[#F7D794] font-semibold flex items-center gap-1.5">
          <Heart className="w-3.5 h-3.5 fill-[#E5A93C] text-[#E5A93C]" />
          <span>Support Wild Foxes — Fuchshilfe</span>
        </span>
        {bannerCollapsed ? (
          <ChevronUp className="w-4 h-4 text-[#E5A93C]" />
        ) : (
          <ChevronDown className="w-4 h-4 text-[#E5A93C]" />
        )}
      </button>

      {!bannerCollapsed && (
        <div className="p-3.5 flex items-start gap-3">
          <a
            href="https://fuchshilfe-berlin.de/IHR-WOLLT-UNS-UNTERSTUeTZEN"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 bg-white p-1.5 rounded border border-[#E5A93C]"
            title="Scan or click to support Fuchshilfe Berlin on Amazon"
          >
            <img
              src="https://fuchshilfe-berlin.de/.cm4all/uproc.php/0/.qrcode_www.amazon.de.png/picture-1600?_=1993dea75cf"
              alt="Fuchshilfe Berlin Amazon QR Code"
              className="w-20 h-20 object-contain"
            />
          </a>
          <div className="space-y-2 text-xs font-sans text-zinc-200 leading-relaxed">
            <p>
              Instead of donating to the developer, please support{' '}
              <strong className="text-[#F7D794]">Fuchshilfe</strong> so wild foxes can live a good
              life and sick or injured foxes can recover and get healthy again.
            </p>
            <a
              href="https://fuchshilfe-berlin.de/IHR-WOLLT-UNS-UNTERSTUeTZEN"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#231B0E] hover:bg-[#2F2412] border border-[#E5A93C]/70 text-[#F7D794] font-sans font-semibold text-xs transition"
            >
              <span>Donate via Amazon Wishlist</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export const NodeCodeInspector: React.FC<NodeCodeInspectorProps> = ({
  activeNode,
  hoveredEdge,
  repository,
  collapsed,
  onToggleCollapse,
  onSelectNode,
}) => {
  const codeContainerRef = useRef<HTMLDivElement | null>(null);

  // Resolve the enclosing Function (or Class) node so the right panel ALWAYS displays the full function code,
  // while highlighting the exact sub-branch (`if` True / `else` False / `loop`) or wire `callLine` (e.g. file line 230) inside it!
  const { displayContainerNode, highlightSpec } = useMemo(() => {
    const findEnclosingFunctionOrClass = (node: CodeNode): CodeNode => {
      if (
        node.kind === NodeKind.FUNCTION ||
        node.kind === NodeKind.RECURSION ||
        node.kind === NodeKind.CLASS
      ) {
        return node;
      }
      // Walk up parentId chain to find the enclosing FUNCTION
      let curr: CodeNode | undefined = node;
      while (curr && curr.parentId) {
        const parent = repository.allNodes.find((n) => n.id === curr!.parentId);
        if (!parent) break;
        if (parent.kind === NodeKind.FUNCTION || parent.kind === NodeKind.RECURSION) {
          return parent;
        }
        curr = parent;
      }
      // Fallback: find any function in the same file whose line range encloses `node.lineStart`
      const enclosingFn = repository.allNodes.find(
        (n) =>
          n.fileId === node.fileId &&
          (n.kind === NodeKind.FUNCTION || n.kind === NodeKind.RECURSION) &&
          node.lineStart >= n.lineStart &&
          node.lineStart <= n.lineEnd
      );
      return enclosingFn || node;
    };

    // Priority 1: If the user is hovering a wire / connection (`hoveredEdge`), show the caller's full function code
    // and highlight the exact `hoveredEdge.callLine` (plus its True / False / Loop branch context)!
    if (hoveredEdge) {
      const srcNode = repository.allNodes.find((n) => n.id === hoveredEdge.sourceId);
      const tgtNode = repository.allNodes.find((n) => n.id === hoveredEdge.targetId);
      if (srcNode) {
        const containerFn = findEnclosingFunctionOrClass(srcNode);
        const isBranch =
          srcNode.kind === NodeKind.CONDITION || srcNode.kind === NodeKind.LOOP;
        return {
          displayContainerNode: containerFn,
          highlightSpec: {
            exactLine: hoveredEdge.callLine,
            rangeStart: isBranch ? srcNode.lineStart : hoveredEdge.callLine,
            rangeEnd: isBranch ? srcNode.lineEnd : hoveredEdge.callLine,
            outcome: hoveredEdge.branchOutcome || 'TRUE',
            badgeText: tgtNode
              ? `CALLS ${tgtNode.symbolName}() AT FILE LINE ${hoveredEdge.callLine}`
              : `ACTIVE LINE ${hoveredEdge.callLine}`,
          },
        };
      }
    }

    // Priority 2: If the user is hovering/selecting a Node (e.g., an `if` True branch, `else` False branch, `loop`, or `statement`)
    if (activeNode) {
      const containerFn = findEnclosingFunctionOrClass(activeNode);
      const isSubElement = containerFn.id !== activeNode.id;

      let outcome: 'TRUE' | 'FALSE' | 'LOOP' | 'NORMAL' = 'NORMAL';
      if (activeNode.kind === NodeKind.LOOP || activeNode.isRecursive) {
        outcome = 'LOOP';
      } else if (activeNode.kind === NodeKind.CONDITION) {
        outcome = activeNode.label.toLowerCase().startsWith('else') ? 'FALSE' : 'TRUE';
      }

      return {
        displayContainerNode: containerFn,
        highlightSpec: {
          exactLine: activeNode.lineStart,
          rangeStart: activeNode.lineStart,
          rangeEnd: isSubElement ? activeNode.lineEnd : activeNode.lineStart,
          outcome,
          badgeText: isSubElement
            ? `${activeNode.kind}: ${activeNode.label} (File Lines ${activeNode.lineStart}–${activeNode.lineEnd})`
            : `FUNCTION ENTRY (File Line ${activeNode.lineStart})`,
        },
      };
    }

    return { displayContainerNode: null, highlightSpec: null };
  }, [activeNode, hoveredEdge, repository.allNodes]);

  // Auto-scroll the highlighted line into the center of the code view whenever the hovered node or wire changes
  useEffect(() => {
    if (!codeContainerRef.current || !highlightSpec) return;
    const targetEl = codeContainerRef.current.querySelector(
      '[data-highlighted-anchor="true"]'
    ) as HTMLElement | null;
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [highlightSpec?.exactLine, highlightSpec?.rangeStart, displayContainerNode?.id]);

  if (collapsed) {
    return (
      <aside className="w-9 shrink-0 h-full bg-[#0A0A0E] border-l border-zinc-800/90 flex flex-col items-center py-2.5 select-none">
        <button
          onClick={onToggleCollapse}
          className="p-1.5 rounded bg-zinc-900 hover:bg-[#231B0E] text-zinc-300 hover:text-[#F7D794] transition"
          title="Show Complete Function & Fuchshilfe Support Panel"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="mt-6 [writing-mode:vertical-rl] font-sans text-[11px] font-medium uppercase tracking-widest text-zinc-400">
          Function Code & Fox Support
        </div>
      </aside>
    );
  }

  const primaryNode = activeNode || displayContainerNode;

  if (!primaryNode || !displayContainerNode) {
    return (
      <aside className="w-[350px] shrink-0 h-full bg-[#0A0A0E] border-l border-zinc-800/90 flex flex-col justify-between text-zinc-400 font-sans text-xs">
        <div className="p-3 flex justify-end">
          <button
            onClick={onToggleCollapse}
            className="p-1 rounded text-zinc-400 hover:text-white"
            title="Hide Inspector"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="border-l-2 border-[#E5A93C] pl-3 mx-4 space-y-1.5 my-auto">
          <div className="text-zinc-100 font-semibold">Hover or Click Any Node or Wire</div>
          <p className="text-xs leading-relaxed text-zinc-400">
            Hover over any branch, wire, or node in the graph to inspect its enclosing function and see the exact active line highlighted.
          </p>
        </div>
        <FoxRescueSupportCard />
      </aside>
    );
  }

  const codeLines = displayContainerNode.codeSnippet.split('\n');

  const outgoingNodes = primaryNode.callsIds
    .map((id) => repository.allNodes.find((n) => n.id === id))
    .filter((n): n is CodeNode => Boolean(n));

  const incomingNodes = primaryNode.calledByIds
    .map((id) => repository.allNodes.find((n) => n.id === id))
    .filter((n): n is CodeNode => Boolean(n));

  return (
    <aside className="w-[355px] shrink-0 h-full bg-[#0A0A0E] border-l border-zinc-800/90 flex flex-col text-zinc-200 overflow-hidden select-text">
      {/* Header with Collapse Toggle */}
      <div className="p-3 bg-[#101016] border-b border-zinc-800/90 border-l-4 border-l-[#E5A93C]">
        <div className="flex items-center justify-between gap-1">
          <span className="font-sans text-[11px] uppercase tracking-wider px-2 py-0.5 rounded bg-[#231B0E] border border-[#E5A93C]/50 text-[#F7D794] font-semibold">
            {primaryNode.language} • {primaryNode.kind}
          </span>
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-[11px] text-zinc-400">
              File L{displayContainerNode.lineStart}–L{displayContainerNode.lineEnd}
            </span>
            <button
              onClick={onToggleCollapse}
              className="p-1 rounded text-zinc-400 hover:text-white hover:bg-zinc-800"
              title="Hide Function Panel (Saved in Cookie)"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <h3 className="font-mono font-semibold text-xs text-zinc-100 mt-2 break-all">
          {displayContainerNode.className} :: {displayContainerNode.label}
        </h3>
        <div className="font-sans text-[11px] text-zinc-400 mt-0.5 flex items-center justify-between">
          <span>{displayContainerNode.fileName}</span>
          <span className="font-mono text-[10px] text-[#F7D794]">
            {codeLines.length} lines in function
          </span>
        </div>
      </div>

      {/* Active Line / Branch Position Indicator Banner */}
      {highlightSpec && (
        <div
          className={`px-3 py-2 border-b flex items-center justify-between gap-2 text-xs font-mono ${
            highlightSpec.outcome === 'TRUE'
              ? 'bg-emerald-950/50 border-emerald-700/60 text-emerald-300'
              : highlightSpec.outcome === 'FALSE'
              ? 'bg-red-950/50 border-red-700/60 text-red-300'
              : highlightSpec.outcome === 'LOOP'
              ? 'bg-sky-950/50 border-sky-700/60 text-sky-300'
              : 'bg-[#231B0E]/80 border-[#E5A93C]/50 text-[#F7D794]'
          }`}
        >
          <div className="flex items-center gap-1.5 truncate">
            <Crosshair className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate font-semibold">{highlightSpec.badgeText}</span>
          </div>
          <span className="shrink-0 px-1.5 py-0.5 rounded bg-black/50 text-[10px]">
            Fn Line #{Math.max(1, highlightSpec.exactLine - displayContainerNode.lineStart + 1)}
          </span>
        </div>
      )}

      {/* Hover Branch / Function Explanation */}
      <div className="p-3 bg-[#121218] border-b border-zinc-800/90 space-y-1.5">
        <div className="text-[11px] font-sans uppercase tracking-wider text-[#F7D794] font-semibold">
          Branch / Function Explanation
        </div>
        <p className="text-xs text-zinc-200 leading-relaxed font-sans">
          {primaryNode.explanation}
        </p>
        {(primaryNode.isRecursive || primaryNode.kind === NodeKind.LOOP) && (
          <div className="flex items-center gap-2 text-xs font-sans text-sky-200 bg-sky-950/50 border border-sky-600/70 px-2.5 py-1 rounded">
            <span className="px-1.5 py-0.5 bg-[#0284C7] text-white font-mono font-bold text-[10px] border border-sky-300">
              LOOP
            </span>
            <span>Self-connected blue LOOP wire active</span>
          </div>
        )}
      </div>

      {/* Connected Callers & Callees */}
      {(outgoingNodes.length > 0 || incomingNodes.length > 0) && (
        <div className="p-2.5 bg-[#0E0E13] border-b border-zinc-800/90 space-y-1.5 max-h-28 overflow-y-auto">
          <div className="flex items-center gap-1.5 text-[10.5px] font-sans uppercase tracking-wider text-zinc-400 font-medium">
            <ArrowRightLeft className="w-3 h-3 text-[#E5A93C]" />
            <span>Call Links ({outgoingNodes.length + incomingNodes.length})</span>
          </div>
          <div className="space-y-1">
            {outgoingNodes.map((target) => (
              <button
                key={`out_${target.id}`}
                onClick={() => onSelectNode(target)}
                className="w-full text-left px-2 py-1 rounded bg-zinc-900/90 hover:bg-zinc-800 border-l-2 border-[#E5A93C] font-mono text-[11px] flex items-center justify-between"
              >
                <span className="truncate text-zinc-200">
                  → {target.className}.{target.symbolName}()
                </span>
                <span className="text-zinc-500 font-sans text-[10px] shrink-0 ml-1">{target.fileName}</span>
              </button>
            ))}
            {incomingNodes.map((caller) => (
              <button
                key={`in_${caller.id}`}
                onClick={() => onSelectNode(caller)}
                className="w-full text-left px-2 py-1 rounded bg-zinc-900/90 hover:bg-zinc-800 border-l-2 border-zinc-500 font-mono text-[11px] flex items-center justify-between"
              >
                <span className="truncate text-zinc-300">
                  ← {caller.className}.{caller.symbolName}()
                </span>
                <span className="text-zinc-500 font-sans text-[10px] shrink-0 ml-1">{caller.fileName}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Complete Function Implementation with Exact Line & True/False/Loop Block Highlighting */}
      <div
        ref={codeContainerRef}
        className="flex-1 overflow-y-auto p-2.5 font-mono text-[11.5px] leading-relaxed bg-[#070709]"
      >
        <div className="flex items-center justify-between text-[10.5px] font-sans text-zinc-400 mb-2 pb-1.5 border-b border-zinc-900">
          <span className="flex items-center gap-1.5 text-zinc-200 font-semibold">
            <Code2 className="w-3.5 h-3.5 text-[#E5A93C]" />
            <span>Complete Function Code</span>
          </span>
          <span className="font-mono text-[10px] text-zinc-500">
            File Line | Fn #
          </span>
        </div>

        <div className="space-y-0.5">
          {codeLines.map((line, idx) => {
            const fileLineNum = displayContainerNode.lineStart + idx;
            const fnRelativeLineNum = idx + 1;

            const isExactTargetLine = highlightSpec?.exactLine === fileLineNum;
            const isInBranchRange =
              highlightSpec &&
              fileLineNum >= highlightSpec.rangeStart &&
              fileLineNum <= highlightSpec.rangeEnd;

            // Choose highlighter style based on whether this is the exact call/branch line or inside the active True/False/Loop block
            let rowHighlightClass = '';
            if (isExactTargetLine) {
              if (highlightSpec?.outcome === 'TRUE') {
                rowHighlightClass =
                  'bg-emerald-500/25 border-l-4 border-emerald-400 ring-1 ring-emerald-500/50';
              } else if (highlightSpec?.outcome === 'FALSE') {
                rowHighlightClass =
                  'bg-red-500/25 border-l-4 border-red-400 ring-1 ring-red-500/50';
              } else if (highlightSpec?.outcome === 'LOOP') {
                rowHighlightClass =
                  'bg-sky-500/25 border-l-4 border-sky-400 ring-1 ring-sky-500/50';
              } else {
                rowHighlightClass =
                  'bg-[#E5A93C]/25 border-l-4 border-[#E5A93C] ring-1 ring-[#E5A93C]/50';
              }
            } else if (isInBranchRange) {
              if (highlightSpec?.outcome === 'TRUE') {
                rowHighlightClass = 'bg-emerald-950/40 border-l-2 border-emerald-500/70';
              } else if (highlightSpec?.outcome === 'FALSE') {
                rowHighlightClass = 'bg-red-950/40 border-l-2 border-red-500/70';
              } else if (highlightSpec?.outcome === 'LOOP') {
                rowHighlightClass = 'bg-sky-950/40 border-l-2 border-sky-500/70';
              } else {
                rowHighlightClass = 'bg-[#231B0E]/70 border-l-2 border-[#E5A93C]/70';
              }
            }

            return (
              <div
                key={idx}
                data-highlighted-anchor={isExactTargetLine ? 'true' : undefined}
                className={`flex items-start px-1.5 py-0.5 rounded transition-colors ${rowHighlightClass}`}
              >
                {/* Dual Line Gutter: Real File Line Number (e.g. 230) + Function Relative Line (#16) */}
                <div className="w-14 shrink-0 flex items-center justify-end gap-1 pr-2 select-none font-mono text-[10px]">
                  <span
                    className={
                      isExactTargetLine
                        ? 'text-[#F7D794] font-bold'
                        : isInBranchRange
                        ? 'text-zinc-300 font-semibold'
                        : 'text-zinc-500'
                    }
                    title={`Actual Line ${fileLineNum} in ${displayContainerNode.fileName}`}
                  >
                    {fileLineNum}
                  </span>
                  <span
                    className="text-[9px] text-zinc-600"
                    title={`Line #${fnRelativeLineNum} inside ${displayContainerNode.label}`}
                  >
                    #{fnRelativeLineNum}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <pre className="whitespace-pre-wrap break-all">
                    {renderSyntaxHighlightedLine(line || ' ')}
                  </pre>
                  {isExactTargetLine && highlightSpec && (
                    <div className="mt-0.5 flex items-center gap-1.5 text-[9.5px] font-sans font-semibold">
                      <span
                        className={`px-1.5 py-0.2 rounded ${
                          highlightSpec.outcome === 'TRUE'
                            ? 'bg-emerald-500/30 text-emerald-200 border border-emerald-400/50'
                            : highlightSpec.outcome === 'FALSE'
                            ? 'bg-red-500/30 text-red-200 border border-red-400/50'
                            : highlightSpec.outcome === 'LOOP'
                            ? 'bg-sky-500/30 text-sky-200 border border-sky-400/50'
                            : 'bg-[#E5A93C]/30 text-[#F7D794] border border-[#E5A93C]/50'
                        }`}
                      >
                        ▲ Active Here (File Line {fileLineNum} • Fn Line #{fnRelativeLineNum})
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 15% Larger & Collapsible Fuchshilfe Berlin Support Banner (Auto-minimizes after 30s) */}
      <FoxRescueSupportCard />
    </aside>
  );
};
