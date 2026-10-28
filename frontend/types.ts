export enum VisualizerMode {
  MODE_2D = '2D',
  MODE_3D = '3D',
}

export enum GraphFocusMode {
  FUNCTIONS = 'FUNCTIONS',
  CLASSES = 'CLASSES',
}

export enum Render3DStyle {
  VIRTUAL_CODE = 'VIRTUAL_CODE',
  CODE_CITY = 'CODE_CITY',
  FORCE_GRAPH = 'FORCE_GRAPH',
}

export enum NodeKind {
  CLASS = 'CLASS',
  FUNCTION = 'FUNCTION',
  CONDITION = 'CONDITION',
  LOOP = 'LOOP',
  STATEMENT = 'STATEMENT',
  RECURSION = 'RECURSION'
}

export type SupportedLanguage = 'C' | 'C++' | 'Java' | 'Python' | 'Rust' | 'C#' | 'JavaScript' | 'Unknown';

export interface CodeNode {
  id: string;
  symbolName: string;
  label: string;
  kind: NodeKind;
  fileId: string;
  fileName: string;
  className: string;
  language: SupportedLanguage;
  lineStart: number;
  lineEnd: number;
  codeSnippet: string; // Full function or class block
  explanation: string;
  parentId?: string;
  childrenIds: string[];
  callsIds: string[]; // Outgoing calls
  calledByIds: string[]; // Incoming callers
  isRecursive?: boolean;
  complexity: number;
  memoryBytes: number;
  color: string;
  x?: number;
  y?: number;
  z?: number;
}

export interface GraphEdge {
  id: string;
  sourceId: string;
  targetId: string;
  kind: 'AST_CHILD' | 'CROSS_FILE_CALL' | 'INTERNAL_CALL' | 'RECURSION' | 'CLASS_DEPENDENCY';
  sourceFile: string;
  targetFile: string;
  callLine: number;
  label?: string;
  branchOutcome?: 'TRUE' | 'FALSE' | 'LOOP';
}

export interface SourceFile {
  id: string;
  name: string;
  path: string;
  folder: string;
  dateModified: string;
  sizeBytes: number;
  kindLabel: string;
  language: SupportedLanguage;
  content: string;
  color: string;
  nodes: CodeNode[];
}

export interface ProjectRepository {
  name: string;
  description: string;
  files: SourceFile[];
  allNodes: CodeNode[];
  edges: GraphEdge[];
  stats: {
    totalFiles: number;
    totalClasses: number;
    totalFunctions: number;
    crossFileLinks: number;
    recursionCount: number;
  };
}

export interface CommentBox {
  id: string;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface NodeCustomization {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  customLabel?: string;
}

export interface SavedSessionState {
  remoteUrl?: string;
  pan: { x: number; y: number };
  zoom: number;
  nodeOffsets: Record<string, { x: number; y: number }>;
  nodeCustomizations?: Record<string, NodeCustomization>;
  commentBoxes: CommentBox[];
  timestamp: number;
}

export interface LayoutExportPayload {
  version: string;
  exportedAt: string;
  repositoryName: string;
  remoteUrl?: string;
  mode: VisualizerMode;
  graphFocusMode: GraphFocusMode;
  pan: { x: number; y: number };
  zoom: number;
  nodeOffsets: Record<string, { x: number; y: number }>;
  nodeCustomizations: Record<string, NodeCustomization>;
  commentBoxes: CommentBox[];
}
