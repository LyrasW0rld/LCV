import React, { useState, useEffect, useRef } from 'react';
import {
  CodeNode,
  CommentBox,
  GraphEdge,
  GraphFocusMode,
  LayoutExportPayload,
  NodeCustomization,
  ProjectRepository,
  Render3DStyle,
  SavedSessionState,
  VisualizerMode,
  get3DStyleLabel,
} from './types';
import { DEFAULT_PROJECT_URL, DEFAULT_REPOSITORY } from './constants';
import {
  fetchRepositoryFromRemoteUrl,
  parseUploadedArchiveOrFiles,
} from './services/codeParser';
import {
  clearGraphSessionCookie,
  getPreferenceCookie,
  getSavedRemoteUrlCookie,
  loadGraphSessionFromCookie,
  saveGraphSessionToCookie,
  setPreferenceCookie,
  setSavedRemoteUrlCookie,
} from './services/cookieService';
import { Recon3DCanvas } from './components/Recon3DCanvas';
import { Microscope2DCanvas } from './components/Microscope2DCanvas';
import { MacFileTable } from './components/MacFileTable';
import { NodeCodeInspector } from './components/NodeCodeInspector';
import { WalkingFoxLogo } from './components/WalkingFoxLogo';
import { InteractiveGuideModal } from './components/InteractiveGuideModal';
import {
  Box,
  Globe,
  Upload,
  FileText,
  Layers,
  GitBranch,
  Link2,
  History,
  Download,
  Heart,
  ExternalLink,
  HelpCircle,
} from 'lucide-react';

function detectInitialUrlViewConfig(): {
  mode: VisualizerMode;
  style3D: Render3DStyle;
} {
  const rawQuery = `${window.location.search}&${window.location.hash.replace(/^#\/?\??/, '')}`;
  const lowerQuery = rawQuery.toLowerCase();
  const searchParams = new URLSearchParams(window.location.search);
  const hashParams = new URLSearchParams(window.location.hash.replace(/^#\/?\??/, ''));
  const vParam = (
    searchParams.get('V') ||
    searchParams.get('v') ||
    hashParams.get('V') ||
    hashParams.get('v') ||
    ''
  ).toLowerCase();

  let savedStyle = getPreferenceCookie('lcv_3d_style', Render3DStyle.CODE_CITY) as Render3DStyle;
  if (
    savedStyle !== Render3DStyle.CODE_CITY &&
    savedStyle !== Render3DStyle.FORCE_GRAPH &&
    savedStyle !== Render3DStyle.VIRTUAL_CODE
  ) {
    savedStyle = Render3DStyle.CODE_CITY;
  }

  if (
    lowerQuery.includes('code-city') ||
    lowerQuery.includes('code_city') ||
    vParam === 'code-city'
  ) {
    setPreferenceCookie('lcv_view_dimension', VisualizerMode.MODE_3D);
    setPreferenceCookie('lcv_3d_style', Render3DStyle.CODE_CITY);
    return { mode: VisualizerMode.MODE_3D, style3D: Render3DStyle.CODE_CITY };
  }

  if (
    lowerQuery.includes('3dforce-graph') ||
    lowerQuery.includes('force-graph') ||
    lowerQuery.includes('3dforce_graph') ||
    vParam === '3dforce-graph' ||
    vParam === 'force-graph'
  ) {
    setPreferenceCookie('lcv_view_dimension', VisualizerMode.MODE_3D);
    setPreferenceCookie('lcv_3d_style', Render3DStyle.FORCE_GRAPH);
    return { mode: VisualizerMode.MODE_3D, style3D: Render3DStyle.FORCE_GRAPH };
  }

  if (
    lowerQuery.includes('virtual-code-3d') ||
    lowerQuery.includes('virtual-code') ||
    lowerQuery.includes('virtual_code') ||
    vParam === 'virtual-code-3d'
  ) {
    setPreferenceCookie('lcv_view_dimension', VisualizerMode.MODE_3D);
    setPreferenceCookie('lcv_3d_style', Render3DStyle.VIRTUAL_CODE);
    return { mode: VisualizerMode.MODE_3D, style3D: Render3DStyle.VIRTUAL_CODE };
  }

  if (vParam === '3d' || lowerQuery.includes('?3d')) {
    setPreferenceCookie('lcv_view_dimension', VisualizerMode.MODE_3D);
    return { mode: VisualizerMode.MODE_3D, style3D: savedStyle };
  }

  if (vParam === '2d' || lowerQuery.includes('?2d')) {
    setPreferenceCookie('lcv_view_dimension', VisualizerMode.MODE_2D);
    return { mode: VisualizerMode.MODE_2D, style3D: savedStyle };
  }

  const savedMode = getPreferenceCookie('lcv_view_dimension', VisualizerMode.MODE_2D);
  return {
    mode: savedMode === VisualizerMode.MODE_3D ? VisualizerMode.MODE_3D : VisualizerMode.MODE_2D,
    style3D: savedStyle,
  };
}

export function App() {
  const initialConfig = useRef(detectInitialUrlViewConfig());

  const [repository, setRepository] = useState<ProjectRepository>(DEFAULT_REPOSITORY);
  const [filterFileId, setFilterFileId] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<CodeNode | null>(
    DEFAULT_REPOSITORY.allNodes[1] || DEFAULT_REPOSITORY.allNodes[0]
  );
  const [hoveredNode, setHoveredNode] = useState<CodeNode | null>(null);
  const [hoveredEdge, setHoveredEdge] = useState<GraphEdge | null>(null);

  const [mode, setMode] = useState<VisualizerMode>(initialConfig.current.mode);
  const [render3DStyle, setRender3DStyle] = useState<Render3DStyle>(initialConfig.current.style3D);

  const [graphFocusMode, setGraphFocusMode] = useState<GraphFocusMode>(() => {
    const saved = getPreferenceCookie('lcv_graph_focus', GraphFocusMode.FUNCTIONS);
    return saved === GraphFocusMode.CLASSES ? GraphFocusMode.CLASSES : GraphFocusMode.FUNCTIONS;
  });

  // Both Left (Classes / Files) and Right (Function Code) sidebars default to collapsed ('true')
  const [leftCollapsed, setLeftCollapsed] = useState<boolean>(() => {
    return getPreferenceCookie('lcv_left_collapsed_v2', 'true') === 'true';
  });

  const [rightCollapsed, setRightCollapsed] = useState<boolean>(() => {
    return getPreferenceCookie('lcv_right_collapsed_v2', 'true') === 'true';
  });

  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 40, y: 40 });
  const [zoom, setZoom] = useState<number>(0.75);
  const [nodeOffsets, setNodeOffsets] = useState<Record<string, { x: number; y: number }>>({});
  const [nodeCustomizations, setNodeCustomizations] = useState<Record<string, NodeCustomization>>(
    {}
  );
  const [commentBoxes, setCommentBoxes] = useState<CommentBox[]>([]);

  const [pendingSession, setPendingSession] = useState<SavedSessionState | null>(null);

  const [remoteUrlInput, setRemoteUrlInput] = useState<string>(
    () => getSavedRemoteUrlCookie() || DEFAULT_PROJECT_URL
  );
  const [isLoadingRemote, setIsLoadingRemote] = useState<boolean>(false);
  const [remoteError, setRemoteError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [seoModalOpen, setSeoModalOpen] = useState<boolean>(false);
  const [foxSupportModalOpen, setFoxSupportModalOpen] = useState<boolean>(false);

  const [guideModalOpen, setGuideModalOpen] = useState<boolean>(() => {
    const alreadyShown = getPreferenceCookie('lcv_guide_shown_once', 'false') === 'true';
    if (!alreadyShown) {
      setPreferenceCookie('lcv_guide_shown_once', 'true');
      return true;
    }
    return false;
  });

  const handleCloseGuide = () => {
    setGuideModalOpen(false);
    setPreferenceCookie('lcv_guide_shown_once', 'true');
  };

  const headerJsonInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const hashParams = new URLSearchParams(window.location.hash.replace(/^#\/?\??/, ''));
    const loadTarget = searchParams.get('load') || hashParams.get('load');

    const savedSession = loadGraphSessionFromCookie();
    const savedUrl = getSavedRemoteUrlCookie();

    if (loadTarget) {
      setRemoteUrlInput(loadTarget);
      handleLoadRemoteUrl(loadTarget, true);
      return;
    }

    const hasCustomSession =
      savedSession &&
      (Object.keys(savedSession.nodeOffsets || {}).length > 0 ||
        Object.keys(savedSession.nodeCustomizations || {}).length > 0 ||
        (savedSession.commentBoxes || []).length > 0 ||
        Boolean(savedSession.remoteUrl) ||
        savedSession.pan?.x !== 40 ||
        savedSession.pan?.y !== 40);

    if (hasCustomSession && savedSession) {
      setPendingSession(savedSession);
      const urlToLoad = savedSession.remoteUrl || savedUrl || DEFAULT_PROJECT_URL;
      setRemoteUrlInput(urlToLoad);
      handleLoadRemoteUrl(urlToLoad, false);
      if (savedSession.pan) setPan(savedSession.pan);
      if (savedSession.zoom) setZoom(savedSession.zoom);
    } else {
      const initialUrl = savedUrl || DEFAULT_PROJECT_URL;
      setRemoteUrlInput(initialUrl);
      handleLoadRemoteUrl(initialUrl, false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const persistCurrentSession = (
    nextPan: { x: number; y: number },
    nextZoom: number,
    nextOffsets: Record<string, { x: number; y: number }>,
    nextCustoms: Record<string, NodeCustomization>,
    nextComments: CommentBox[],
    nextUrl?: string
  ) => {
    saveGraphSessionToCookie({
      remoteUrl: nextUrl !== undefined ? nextUrl : remoteUrlInput,
      pan: nextPan,
      zoom: nextZoom,
      nodeOffsets: nextOffsets,
      nodeCustomizations: nextCustoms,
      commentBoxes: nextComments,
      timestamp: Date.now(),
    });
  };

  const handleConfirmRecoverSession = () => {
    if (!pendingSession) return;
    if (pendingSession.pan) setPan(pendingSession.pan);
    if (pendingSession.zoom) setZoom(pendingSession.zoom);
    if (pendingSession.nodeOffsets) setNodeOffsets(pendingSession.nodeOffsets);
    if (pendingSession.nodeCustomizations) {
      setNodeCustomizations(pendingSession.nodeCustomizations);
    }
    if (pendingSession.commentBoxes) setCommentBoxes(pendingSession.commentBoxes);
    if (pendingSession.remoteUrl && pendingSession.remoteUrl !== remoteUrlInput) {
      setRemoteUrlInput(pendingSession.remoteUrl);
      handleLoadRemoteUrl(pendingSession.remoteUrl, false);
    }
    setPendingSession(null);
  };

  const handleDeclineRecoverSession = () => {
    clearGraphSessionCookie();
    setNodeOffsets({});
    setNodeCustomizations({});
    setCommentBoxes([]);
    setPan({ x: 40, y: 40 });
    setZoom(0.75);
    setRemoteUrlInput(DEFAULT_PROJECT_URL);
    setPendingSession(null);
  };

  const handleLoadRemoteUrl = async (urlToFetch?: string, persistToCookie = true) => {
    const target = (urlToFetch ?? remoteUrlInput).trim();
    if (!target) return;
    setIsLoadingRemote(true);
    setRemoteError(null);
    try {
      const repo = await fetchRepositoryFromRemoteUrl(target, DEFAULT_REPOSITORY);
      setRepository(repo);
      setFilterFileId(null);
      setSelectedNode(repo.allNodes[1] || repo.allNodes[0] || null);
      if (persistToCookie) {
        setSavedRemoteUrlCookie(target);
        persistCurrentSession(pan, zoom, nodeOffsets, nodeCustomizations, commentBoxes, target);
      }
    } catch (err: any) {
      setRepository(DEFAULT_REPOSITORY);
      setSelectedNode(DEFAULT_REPOSITORY.allNodes[1] || DEFAULT_REPOSITORY.allNodes[0] || null);
      setRemoteError(err?.message || 'Failed to load remote repository (loaded default sample project)');
    } finally {
      setIsLoadingRemote(false);
    }
  };

  const handleUploadArchive = async (fileList: FileList) => {
    setIsUploading(true);
    setRemoteError(null);
    try {
      const parsedRepo = await parseUploadedArchiveOrFiles(fileList);
      if (parsedRepo.files.length > 0) {
        setRepository(parsedRepo);
        setFilterFileId(null);
        setSelectedNode(parsedRepo.allNodes[1] || parsedRepo.allNodes[0]);
      }
    } finally {
      setIsUploading(false);
    }
  };

  const handleExportJsonLayout = () => {
    const payload: LayoutExportPayload = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      repositoryName: repository.name,
      remoteUrl: remoteUrlInput || undefined,
      mode,
      graphFocusMode,
      pan,
      zoom,
      nodeOffsets,
      nodeCustomizations,
      commentBoxes,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `LCV-Layout-${repository.name.replace(/\W+/g, '_')}-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJsonLayout = async (file: File) => {
    try {
      const text = await file.text();
      const parsed = JSON.parse(text) as Partial<LayoutExportPayload>;
      const nextPan = parsed.pan || { x: 40, y: 40 };
      const nextZoom = typeof parsed.zoom === 'number' ? parsed.zoom : 0.75;
      const nextOffsets = parsed.nodeOffsets || {};
      const nextCustoms = parsed.nodeCustomizations || {};
      const nextComments = Array.isArray(parsed.commentBoxes) ? parsed.commentBoxes : [];

      setPan(nextPan);
      setZoom(nextZoom);
      setNodeOffsets(nextOffsets);
      setNodeCustomizations(nextCustoms);
      setCommentBoxes(nextComments);

      if (parsed.mode === VisualizerMode.MODE_2D || parsed.mode === VisualizerMode.MODE_3D) {
        setMode(parsed.mode);
      }
      if (
        parsed.graphFocusMode === GraphFocusMode.CLASSES ||
        parsed.graphFocusMode === GraphFocusMode.FUNCTIONS
      ) {
        setGraphFocusMode(parsed.graphFocusMode);
      }
      if (parsed.remoteUrl && parsed.remoteUrl !== remoteUrlInput) {
        setRemoteUrlInput(parsed.remoteUrl);
        handleLoadRemoteUrl(parsed.remoteUrl, false);
      }

      persistCurrentSession(
        nextPan,
        nextZoom,
        nextOffsets,
        nextCustoms,
        nextComments,
        parsed.remoteUrl
      );
      setPendingSession(null);
    } catch {
      setRemoteError('Invalid LCV JSON layout file.');
    }
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const firstFile = e.dataTransfer.files[0];
      if (firstFile.name.toLowerCase().endsWith('.json')) {
        await handleImportJsonLayout(firstFile);
      } else {
        await handleUploadArchive(e.dataTransfer.files);
      }
    }
  };

  const toggle2D3D = () => {
    setMode((prev) => {
      const next = prev === VisualizerMode.MODE_2D ? VisualizerMode.MODE_3D : VisualizerMode.MODE_2D;
      setPreferenceCookie('lcv_view_dimension', next);
      return next;
    });
  };

  const handleChangeRender3DStyle = (nextStyle: Render3DStyle) => {
    setRender3DStyle(nextStyle);
    setPreferenceCookie('lcv_3d_style', nextStyle);
  };

  const toggleGraphFocusMode = () => {
    setGraphFocusMode((prev) => {
      const next =
        prev === GraphFocusMode.FUNCTIONS ? GraphFocusMode.CLASSES : GraphFocusMode.FUNCTIONS;
      setPreferenceCookie('lcv_graph_focus', next);
      return next;
    });
  };

  const toggleLeftSidebar = () => {
    setLeftCollapsed((prev) => {
      const next = !prev;
      setPreferenceCookie('lcv_left_collapsed_v2', String(next));
      return next;
    });
  };

  const toggleRightSidebar = () => {
    setRightCollapsed((prev) => {
      const next = !prev;
      setPreferenceCookie('lcv_right_collapsed_v2', String(next));
      return next;
    });
  };

  const handleChangePanZoom = (nextPan: { x: number; y: number }, nextZoom: number) => {
    setPan(nextPan);
    setZoom(nextZoom);
    persistCurrentSession(nextPan, nextZoom, nodeOffsets, nodeCustomizations, commentBoxes);
  };

  const handleChangeNodeOffsets = (nextOffsets: Record<string, { x: number; y: number }>) => {
    setNodeOffsets(nextOffsets);
    persistCurrentSession(pan, zoom, nextOffsets, nodeCustomizations, commentBoxes);
  };

  const handleChangeNodeCustomizations = (nextCustoms: Record<string, NodeCustomization>) => {
    setNodeCustomizations(nextCustoms);
    persistCurrentSession(pan, zoom, nodeOffsets, nextCustoms, commentBoxes);
  };

  const handleChangeCommentBoxes = (nextComments: CommentBox[]) => {
    setCommentBoxes(nextComments);
    persistCurrentSession(pan, zoom, nodeOffsets, nodeCustomizations, nextComments);
  };

  const handleSearchFocusNode = (node: CodeNode) => {
    if (filterFileId && filterFileId !== node.fileId) {
      setFilterFileId(null);
    }
    if (graphFocusMode === GraphFocusMode.CLASSES && node.kind !== 'CLASS') {
      setGraphFocusMode(GraphFocusMode.FUNCTIONS);
      setPreferenceCookie('lcv_graph_focus', GraphFocusMode.FUNCTIONS);
    }
    setSelectedNode(node);
    setHoveredNode(node);
    setHoveredEdge(null);
  };

  const inspectedNode = hoveredNode || selectedNode;

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      className="h-screen w-screen overflow-hidden flex flex-col bg-[#070709] text-zinc-100"
    >
      {/* Top Bar with Walking Fox Logo on the TOP LEFT & Eye-Friendly Warm Amber Styling */}
      <header className="h-12 shrink-0 bg-[#0A0A0E] border-b border-zinc-800/90 px-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 shrink-0">
          <WalkingFoxLogo className="w-9 h-6 shrink-0" />
          <span className="font-sans font-bold text-sm tracking-wider uppercase text-zinc-100">
            LCV
          </span>
          <span className="hidden xl:inline-block text-xs font-sans text-zinc-400 border-l border-zinc-800 pl-2.5 truncate max-w-[260px]">
            {repository.name}
          </span>
        </div>

        {/* Center-Left: Mode Switch Buttons + Guide Button */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={toggle2D3D}
            className="px-3 py-1.5 rounded bg-[#231B0E] hover:bg-[#2F2412] border border-[#E5A93C]/70 text-[#F7D794] font-sans text-xs font-semibold flex items-center gap-1.5 transition shadow-xs"
            title={
              mode === VisualizerMode.MODE_2D
                ? `Switch directly to 3D View (${get3DStyleLabel(render3DStyle)})`
                : 'Switch directly to 2D Nodes Graph'
            }
          >
            {mode === VisualizerMode.MODE_2D ? (
              <>
                <Box className="w-3.5 h-3.5 text-[#E5A93C]" />
                <span>Switch to 3D ({get3DStyleLabel(render3DStyle)})</span>
              </>
            ) : (
              <>
                <Layers className="w-3.5 h-3.5 text-[#E5A93C]" />
                <span>Switch to 2D Nodes</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={toggleGraphFocusMode}
            className="px-3 py-1.5 rounded bg-zinc-900 hover:bg-zinc-800/90 border border-zinc-700 hover:border-[#E5A93C]/60 text-zinc-200 font-sans text-xs font-medium flex items-center gap-1.5 transition"
            title="Switch between Classes Architecture Viewer and Functions Call Viewer (Saved in Cookie)"
          >
            <GitBranch className="w-3.5 h-3.5 text-[#E5A93C]" />
            <span>Viewer: {graphFocusMode}</span>
          </button>

          <button
            type="button"
            onClick={() => setGuideModalOpen(true)}
            className="px-2.5 py-1.5 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 font-sans text-xs font-medium flex items-center gap-1.5 transition"
            title="Open Interactive Step-by-Step Guide & URL Parameter Reference"
          >
            <HelpCircle className="w-3.5 h-3.5 text-[#E5A93C]" />
            <span>Guide</span>
          </button>
        </div>

        {/* Center-Right: GitHub / Google Drive URL Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLoadRemoteUrl(remoteUrlInput, true);
          }}
          className="hidden md:flex items-center gap-1.5 flex-1 max-w-md"
        >
          <div className="flex items-center flex-1 rounded bg-[#101015] border border-zinc-700/90 focus-within:border-[#E5A93C] px-2.5 py-1">
            <Link2 className="w-3.5 h-3.5 text-[#E5A93C] shrink-0 mr-1.5" />
            <input
              type="text"
              value={remoteUrlInput}
              onChange={(e) => setRemoteUrlInput(e.target.value)}
              placeholder="GitHub / Google Drive (e.g. https://github.com/boykopovar/AnyPS5)"
              className="w-full bg-transparent text-xs font-sans text-zinc-100 placeholder-zinc-500 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={isLoadingRemote}
            className="px-3 py-1 rounded bg-[#231B0E] hover:bg-[#2F2412] border border-[#E5A93C]/60 text-[#F7D794] font-sans text-xs font-semibold transition shrink-0"
          >
            {isLoadingRemote ? 'Loading...' : 'Analyze URL'}
          </button>
        </form>

        {/* Right: JSON Export/Import + ZIP/RAR/7Z + Fox Rescue Support + Sitemap */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() => setFoxSupportModalOpen(true)}
            className="px-2.5 py-1 rounded bg-[#231B0E] hover:bg-[#2F2412] text-[#F7D794] border border-[#E5A93C]/60 font-sans text-xs font-semibold flex items-center gap-1.5 transition"
            title="Support Wild Foxes — Fuchshilfe Berlin"
          >
            <Heart className="w-3.5 h-3.5 text-[#E5A93C] fill-[#E5A93C]" />
            <span className="hidden lg:inline">Support Foxes</span>
          </button>

          <button
            type="button"
            onClick={handleExportJsonLayout}
            className="px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 font-sans text-xs font-medium flex items-center gap-1 transition"
            title="Export Layout JSON"
          >
            <Download className="w-3.5 h-3.5 text-[#E5A93C]" />
            <span className="hidden xl:inline">JSON</span>
          </button>

          <input
            ref={headerJsonInputRef}
            type="file"
            accept=".json,application/json"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                handleImportJsonLayout(file);
                e.target.value = '';
              }
            }}
          />
          <button
            type="button"
            onClick={() => headerJsonInputRef.current?.click()}
            className="px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 font-sans text-xs font-medium flex items-center gap-1 transition"
            title="Import Layout JSON"
          >
            <Upload className="w-3.5 h-3.5 text-[#E5A93C]" />
            <span className="hidden xl:inline">Load JSON</span>
          </button>

          <label className="cursor-pointer flex items-center gap-1 px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 font-sans text-xs font-medium transition">
            <Upload className="w-3.5 h-3.5 text-[#E5A93C]" />
            <span className="hidden sm:inline">ZIP/RAR/7Z</span>
            <input
              type="file"
              multiple
              accept=".zip,.rar,.7z,.c,.cpp,.h,.hpp,.java,.py,.rs,.cs,.js,.ts"
              className="hidden"
              onChange={(e) => e.target.files && handleUploadArchive(e.target.files)}
            />
          </label>

          <button
            type="button"
            onClick={() => setSeoModalOpen(true)}
            className="p-1.5 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-[#F7D794]"
            title="robots.txt & sitemap.xml"
          >
            <Globe className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* "Recover last Session? Yes / No" Prompt Banner */}
      {pendingSession && (
        <div className="bg-[#121217] border-b border-[#E5A93C]/60 px-4 py-2 flex items-center justify-between z-40 font-sans text-xs">
          <div className="flex items-center gap-2 text-zinc-100">
            <History className="w-4 h-4 text-[#E5A93C]" />
            <span className="font-semibold text-[#F7D794]">Recover last Session?</span>
            <span className="text-zinc-400 hidden sm:inline">
              (Saved node names, positions, sizes, comments & camera found in cookies)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleConfirmRecoverSession}
              className="px-3 py-1 rounded bg-[#231B0E] hover:bg-[#2F2412] border border-[#E5A93C] text-[#F7D794] font-semibold transition"
            >
              Yes
            </button>
            <button
              type="button"
              onClick={handleDeclineRecoverSession}
              className="px-3 py-1 rounded bg-zinc-800 hover:bg-red-900/70 border border-zinc-700 text-zinc-200 font-semibold transition"
            >
              No
            </button>
          </div>
        </div>
      )}

      {/* Optional Error Banner */}
      {remoteError && (
        <div className="bg-red-950/90 border-b border-red-700 px-4 py-1.5 text-xs font-sans text-red-200 flex items-center justify-between">
          <span>{remoteError}</span>
          <button onClick={() => setRemoteError(null)} className="underline ml-4">
            Dismiss
          </button>
        </div>
      )}

      {/* Main Workspace */}
      <main className="flex-1 flex overflow-hidden">
        <MacFileTable
          files={repository.files}
          filterFileId={filterFileId}
          collapsed={leftCollapsed}
          onToggleCollapse={toggleLeftSidebar}
          onSelectFilterFile={setFilterFileId}
          onUploadArchive={handleUploadArchive}
          isUploading={isUploading}
        />

        <div className="flex-1 h-full relative overflow-hidden">
          {mode === VisualizerMode.MODE_2D ? (
            <Microscope2DCanvas
              repository={repository}
              graphFocusMode={graphFocusMode}
              selectedNode={selectedNode}
              hoveredNode={hoveredNode}
              filterFileId={filterFileId}
              pan={pan}
              zoom={zoom}
              nodeOffsets={nodeOffsets}
              nodeCustomizations={nodeCustomizations}
              commentBoxes={commentBoxes}
              onToggle2D3D={toggle2D3D}
              active3DStyle={render3DStyle}
              onChangePanZoom={handleChangePanZoom}
              onChangeNodeOffsets={handleChangeNodeOffsets}
              onChangeNodeCustomizations={handleChangeNodeCustomizations}
              onChangeCommentBoxes={handleChangeCommentBoxes}
              onExportJsonLayout={handleExportJsonLayout}
              onImportJsonLayout={handleImportJsonLayout}
              onSelectNode={(n) => {
                setSelectedNode(n);
                setHoveredEdge(null);
              }}
              onHoverNode={(n) => {
                setHoveredNode(n);
                if (n) setHoveredEdge(null);
              }}
              onHoverEdge={setHoveredEdge}
              onSearchFocusNode={handleSearchFocusNode}
            />
          ) : (
            <Recon3DCanvas
              repository={repository}
              graphFocusMode={graphFocusMode}
              render3DStyle={render3DStyle}
              onChangeRender3DStyle={handleChangeRender3DStyle}
              onToggle2D3D={toggle2D3D}
              selectedNode={selectedNode}
              hoveredNode={hoveredNode}
              filterFileId={filterFileId}
              onSelectNode={(n) => {
                setSelectedNode(n);
                setHoveredEdge(null);
              }}
              onHoverNode={(n) => {
                setHoveredNode(n);
                if (n) setHoveredEdge(null);
              }}
              onHoverEdge={setHoveredEdge}
              onSearchFocusNode={handleSearchFocusNode}
            />
          )}
        </div>

        <NodeCodeInspector
          activeNode={inspectedNode}
          hoveredEdge={hoveredEdge}
          repository={repository}
          collapsed={rightCollapsed}
          onToggleCollapse={toggleRightSidebar}
          onSelectNode={(n) => {
            setSelectedNode(n);
            setHoveredEdge(null);
          }}
        />
      </main>

      {/* Interactive Guide Modal */}
      <InteractiveGuideModal isOpen={guideModalOpen} onClose={handleCloseGuide} />

      {/* Fuchshilfe Berlin Support Modal */}
      {foxSupportModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#0E0E13] border border-[#E5A93C]/70 rounded-lg max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2.5">
                <WalkingFoxLogo className="w-9 h-6" />
                <h3 className="font-sans font-bold text-base text-[#F7D794]">
                  Support Wild Foxes — Fuchshilfe Berlin
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setFoxSupportModalOpen(false)}
                className="px-3 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-sans text-xs font-semibold"
              >
                Close
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-5">
              <a
                href="https://fuchshilfe-berlin.de/IHR-WOLLT-UNS-UNTERSTUeTZEN"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-2 rounded border border-[#E5A93C] shrink-0"
              >
                <img
                  src="https://fuchshilfe-berlin.de/.cm4all/uproc.php/0/.qrcode_www.amazon.de.png/picture-1600?_=1993dea75cf"
                  alt="Fuchshilfe Berlin Amazon QR Code"
                  className="w-36 h-36 object-contain"
                />
              </a>

              <div className="space-y-3 text-xs font-sans text-zinc-200 leading-relaxed">
                <p>
                  This tool is free. Instead of donating to the developer, please consider supporting{' '}
                  <strong className="text-[#F7D794]">Fuchshilfe Berlin</strong>!
                </p>
                <p className="text-zinc-300">
                  Your support helps ensure that wild foxes can live a safe, good life and that sick or injured foxes receive medical care to recover and get healthy again.
                </p>
                <a
                  href="https://fuchshilfe-berlin.de/IHR-WOLLT-UNS-UNTERSTUeTZEN"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded bg-[#231B0E] hover:bg-[#2F2412] border border-[#E5A93C] text-[#F7D794] font-sans text-xs font-semibold transition"
                >
                  <span>Donate Goods on Amazon Wishlist</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sitemap.xml & Robots.txt Modal */}
      {seoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#0E0E13] border border-[#E5A93C]/70 rounded-lg max-w-xl w-full p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#E5A93C]" />
                <h3 className="font-sans font-bold text-xs uppercase tracking-wider text-zinc-100">
                  robots.txt & sitemap.xml (All AI Models Permitted)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSeoModalOpen(false)}
                className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-sans text-xs font-semibold"
              >
                Close
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-[11px]">
              <div>
                <div className="text-[#F7D794] font-semibold mb-1">/public/robots.txt</div>
                <pre className="p-2.5 rounded bg-[#070709] border border-zinc-800 text-zinc-300 overflow-x-auto">
{`User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: ClaudeBot
Allow: /

Sitemap: https://lyrasw0rld.github.io/Lyras-Code-Visualizer/sitemap.xml`}
                </pre>
              </div>
              <div>
                <div className="text-[#F7D794] font-semibold mb-1">/public/sitemap.xml</div>
                <pre className="p-2.5 rounded bg-[#070709] border border-zinc-800 text-zinc-300 overflow-x-auto">
{`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://lyrasw0rld.github.io/Lyras-Code-Visualizer/</loc>
    <priority>1.0</priority>
  </url>
</urlset>`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
