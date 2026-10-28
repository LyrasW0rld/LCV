import React, { useRef } from 'react';
import { SourceFile } from '../types';
import { Upload, Layers, FileCode, ChevronLeft, ChevronRight } from 'lucide-react';

interface MacFileTableProps {
  files: SourceFile[];
  filterFileId: string | null;
  collapsed: boolean;
  onToggleCollapse: () => void;
  onSelectFilterFile: (fileId: string | null) => void;
  onUploadArchive: (files: FileList) => void;
  isUploading: boolean;
}

export const MacFileTable: React.FC<MacFileTableProps> = ({
  files,
  filterFileId,
  collapsed,
  onToggleCollapse,
  onSelectFilterFile,
  onUploadArchive,
  isUploading,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (collapsed) {
    return (
      <aside className="w-9 shrink-0 h-full bg-[#0A0A0E] border-r border-zinc-800/90 flex flex-col items-center py-2.5 select-none">
        <button
          onClick={onToggleCollapse}
          className="p-1.5 rounded bg-zinc-900 hover:bg-[#231B0E] text-zinc-300 hover:text-[#F7D794] transition"
          title="Expand Classes / Files Sidebar"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
        <div className="mt-6 [writing-mode:vertical-rl] rotate-180 font-sans text-[11px] font-medium uppercase tracking-widest text-zinc-400">
          Classes / Files ({files.length})
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-[215px] shrink-0 h-full bg-[#0A0A0E] border-r border-zinc-800/90 flex flex-col select-none text-zinc-200">
      {/* Header */}
      <div className="px-3 py-2.5 border-b border-zinc-800/90 flex items-center justify-between">
        <span className="font-sans text-xs uppercase tracking-wider text-zinc-300 font-semibold">
          Classes / Files
        </span>
        <div className="flex items-center gap-1">
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".zip,.rar,.7z,.c,.cpp,.h,.hpp,.java,.py,.rs,.cs,.js,.ts"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                onUploadArchive(e.target.files);
              }
            }}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="px-2 py-0.5 rounded bg-[#231B0E] hover:bg-[#2F2412] border border-[#E5A93C]/60 text-[#F7D794] font-sans text-[11px] font-semibold flex items-center gap-1 transition"
            title="Upload .ZIP, .RAR, .7Z or Direct Source Code Files"
          >
            <Upload className="w-3 h-3 text-[#E5A93C]" />
            <span>{isUploading ? '...' : '7Z/ZIP'}</span>
          </button>
          <button
            onClick={onToggleCollapse}
            className="p-1 rounded text-zinc-400 hover:text-white hover:bg-zinc-800"
            title="Collapse Sidebar (Saved in Cookie)"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Global All-Classes Button — Soft Dark Gold Tint with Light Amber Text (No Eye Strain) */}
      <button
        onClick={() => onSelectFilterFile(null)}
        className={`w-full px-3 py-2.5 text-left font-sans text-xs flex items-center justify-between border-b border-zinc-800/80 transition ${
          filterFileId === null
            ? 'bg-[#231B0E] text-[#F7D794] font-semibold border-l-4 border-l-[#E5A93C]'
            : 'text-zinc-300 hover:bg-zinc-900'
        }`}
      >
        <span className="flex items-center gap-2 truncate">
          <Layers className="w-3.5 h-3.5 shrink-0 text-[#E5A93C]" />
          <span>All Project ({files.length})</span>
        </span>
      </button>

      {/* Class/File List */}
      <div className="flex-1 overflow-y-auto divide-y divide-zinc-900/80 font-sans text-xs">
        {files.map((file) => {
          const isSelected = filterFileId === file.id;
          const classNode = file.nodes[0];
          const fnCount = file.nodes.filter(
            (n) => n.kind === 'FUNCTION' || n.kind === 'RECURSION'
          ).length;

          return (
            <button
              key={file.id}
              onClick={() => onSelectFilterFile(isSelected ? null : file.id)}
              className={`w-full px-3 py-2.5 text-left transition flex flex-col gap-1 ${
                isSelected
                  ? 'bg-[#1D1811] border-l-4 border-[#E5A93C] text-[#F7D794]'
                  : 'hover:bg-zinc-900/70 text-zinc-300'
              }`}
            >
              <div className="flex items-center justify-between gap-1">
                <span className="font-semibold text-zinc-100 truncate">
                  {classNode?.symbolName || file.name}
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-zinc-900 text-[#E5A93C] border border-zinc-700/80">
                  {file.kindLabel}
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-zinc-400">
                <span className="truncate flex items-center gap-1">
                  <FileCode className="w-3 h-3 text-zinc-500" />
                  {file.name}
                </span>
                <span className="font-mono text-[10px] text-zinc-500">{fnCount} fn</span>
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
};
