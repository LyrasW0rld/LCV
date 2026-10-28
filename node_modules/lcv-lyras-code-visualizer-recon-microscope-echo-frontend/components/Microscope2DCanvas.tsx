import React, { useState, useRef, useMemo, useEffect } from 'react';
import {
  CodeNode,
  CommentBox,
  GraphEdge,
  GraphFocusMode,
  NodeCustomization,
  NodeKind,
  ProjectRepository,
  Render3DStyle,
  get3DStyleLabel,
} from '../types';
import { NodeSearchBox } from './NodeSearchBox';
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  Move,
  Camera,
  MessageSquarePlus,
  Trash2,
  RotateCcw,
  Download,
  Upload,
  Expand,
  Box,
} from 'lucide-react';

interface Microscope2DCanvasProps {
  repository: ProjectRepository;
  graphFocusMode: GraphFocusMode;
  selectedNode: CodeNode | null;
  hoveredNode: CodeNode | null;
  filterFileId: string | null;
  pan: { x: number; y: number };
  zoom: number;
  nodeOffsets: Record<string, { x: number; y: number }>;
  nodeCustomizations: Record<string, NodeCustomization>;
  commentBoxes: CommentBox[];
  onToggle2D3D?: () => void;
  active3DStyle?: Render3DStyle;
  onChangePanZoom: (pan: { x: number; y: number }, zoom: number) => void;
  onChangeNodeOffsets: (offsets: Record<string, { x: number; y: number }>) => void;
  onChangeNodeCustomizations: (customs: Record<string, NodeCustomization>) => void;
  onChangeCommentBoxes: (boxes: CommentBox[]) => void;
  onExportJsonLayout: () => void;
  onImportJsonLayout: (file: File) => void;
  onSelectNode: (node: CodeNode) => void;
  onHoverNode: (node: CodeNode | null) => void;
  onHoverEdge: (edge: GraphEdge | null) => void;
  onSearchFocusNode: (node: CodeNode) => void;
}

interface PinSocket {
  edgeId: string;
  edge?: GraphEdge;
  label: string;
  pinType: 'IN' | 'TRUE' | 'FALSE' | 'OUT';
  line: number;
}

interface Positioned2DNode {
  node: CodeNode;
  displayLabel: string;
  x: number;
  y: number;
  width: number;
  height: number;
  inPins: PinSocket[];
  outPins: PinSocket[];
  hasSelfLoop: boolean;
}

interface NetworkBox {
  id: string;
  title: string;
  lang: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Point2D {
  x: number;
  y: number;
}

interface Segment2D {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

const HEADER_HEIGHT = 24;
const PIN_ROW_HEIGHT = 18;
const PIN_TOP_PAD = 10;

function polylineLength(pts: Point2D[]): number {
  let len = 0;
  for (let i = 0; i < pts.length - 1; i++) {
    len += Math.hypot(pts[i + 1].x - pts[i].x, pts[i + 1].y - pts[i].y);
  }
  return len;
}

function segmentsIntersect(a: Segment2D, b: Segment2D): boolean {
  if (
    (Math.abs(a.x1 - b.x1) < 2 && Math.abs(a.y1 - b.y1) < 2) ||
    (Math.abs(a.x2 - b.x2) < 2 && Math.abs(a.y2 - b.y2) < 2) ||
    (Math.abs(a.x1 - b.x2) < 2 && Math.abs(a.y1 - b.y2) < 2) ||
    (Math.abs(a.x2 - b.x1) < 2 && Math.abs(a.y2 - b.y1) < 2)
  ) {
    return false;
  }

  const ccw = (p1x: number, p1y: number, p2x: number, p2y: number, p3x: number, p3y: number) =>
    (p3y - p1y) * (p2x - p1x) > (p2y - p1y) * (p3x - p1x);

  return (
    ccw(a.x1, a.y1, b.x1, b.y1, b.x2, b.y2) !== ccw(a.x2, a.y2, b.x1, b.y1, b.x2, b.y2) &&
    ccw(a.x1, a.y1, a.x2, a.y2, b.x1, b.y1) !== ccw(a.x1, a.y1, a.x2, a.y2, b.x2, b.y2)
  );
}

function buildSmartElectronicRoute(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  existingSegments: Segment2D[]
): Point2D[] {
  const buildCandidate = (laneOffset: number, yDetour: number): Point2D[] => {
    const stub = 18;
    const pStart = { x: x1, y: y1 };
    const pStub1 = { x: x1 + stub, y: y1 };
    const pStub2 = { x: x2 - stub, y: y2 };
    const pEnd = { x: x2, y: y2 };

    const dx = pStub2.x - pStub1.x;
    const dy = pStub2.y - pStub1.y;
    const absDy = Math.abs(dy);

    if (dx >= absDy && yDetour === 0) {
      const diagX = absDy;
      const baseFlat = (dx - diagX) / 2;
      const shiftedFlat = Math.max(4, Math.min(dx - diagX - 4, baseFlat + laneOffset));
      return [
        pStart,
        pStub1,
        { x: pStub1.x + shiftedFlat, y: y1 },
        { x: pStub1.x + shiftedFlat + diagX, y: y2 },
        pStub2,
        pEnd,
      ];
    }

    if (dx >= absDy && yDetour !== 0) {
      const midY = (y1 + y2) / 2 + yDetour;
      const c1 = Math.min(24, Math.abs(midY - y1));
      const c2 = Math.min(24, Math.abs(y2 - midY));
      const midX = (pStub1.x + pStub2.x) / 2 + laneOffset;
      return [
        pStart,
        pStub1,
        { x: pStub1.x + c1, y: midY },
        { x: midX - c2, y: midY },
        { x: midX, y: y2 },
        pStub2,
        pEnd,
      ];
    }

    const midY = (y1 + y2) / 2 + yDetour;
    const chamfer = Math.min(20, Math.abs(y2 - y1) / 4);
    const signY = y2 >= y1 ? 1 : -1;
    return [
      pStart,
      pStub1,
      { x: pStub1.x + chamfer, y: y1 + signY * chamfer },
      { x: pStub1.x + chamfer, y: midY },
      { x: pStub2.x - chamfer, y: midY },
      { x: pStub2.x - chamfer, y: y2 - signY * chamfer },
      pStub2,
      pEnd,
    ];
  };

  const baseRoute = buildCandidate(0, 0);
  const baseLen = Math.max(1, polylineLength(baseRoute));
  const maxAllowedLen = baseLen * 1.08;

  const candidateParams = [
    { lane: 0, detour: 0 },
    { lane: -22, detour: 0 },
    { lane: 22, detour: 0 },
    { lane: -42, detour: 0 },
    { lane: 42, detour: 0 },
    { lane: -16, detour: -18 },
    { lane: 16, detour: 18 },
    { lane: -28, detour: 26 },
    { lane: 28, detour: -26 },
  ];

  let bestPts = baseRoute;
  let bestCrossings = Infinity;

  for (const param of candidateParams) {
    const cand = buildCandidate(param.lane, param.detour);
    const candLen = polylineLength(cand);
    if (candLen > maxAllowedLen) continue;

    let crossings = 0;
    for (let i = 0; i < cand.length - 1; i++) {
      const seg: Segment2D = {
        x1: cand[i].x,
        y1: cand[i].y,
        x2: cand[i + 1].x,
        y2: cand[i + 1].y,
      };
      for (let j = 0; j < existingSegments.length; j++) {
        if (segmentsIntersect(seg, existingSegments[j])) {
          crossings++;
        }
      }
    }

    if (crossings < bestCrossings) {
      bestCrossings = crossings;
      bestPts = cand;
      if (crossings === 0) break;
    }
  }

  for (let i = 0; i < bestPts.length - 1; i++) {
    existingSegments.push({
      x1: bestPts[i].x,
      y1: bestPts[i].y,
      x2: bestPts[i + 1].x,
      y2: bestPts[i + 1].y,
    });
  }

  return bestPts;
}

function sampleArrowsOnPolyline(points: Point2D[], stepDist = 115): { x: number; y: number; angleDeg: number }[] {
  const arrows: { x: number; y: number; angleDeg: number }[] = [];
  let accumulated = 0;
  let nextTarget = stepDist * 0.55;

  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i];
    const b = points[i + 1];
    const segLen = Math.hypot(b.x - a.x, b.y - a.y);
    if (segLen < 1) continue;

    const angleDeg = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
    while (accumulated + segLen >= nextTarget) {
      const ratio = (nextTarget - accumulated) / segLen;
      arrows.push({
        x: a.x + (b.x - a.x) * ratio,
        y: a.y + (b.y - a.y) * ratio,
        angleDeg,
      });
      nextTarget += stepDist;
    }
    accumulated += segLen;
  }

  return arrows;
}

type ResizeDirection = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';

export const Microscope2DCanvas: React.FC<Microscope2DCanvasProps> = ({
  repository,
  graphFocusMode,
  selectedNode,
  hoveredNode,
  filterFileId,
  pan,
  zoom,
  nodeOffsets,
  nodeCustomizations,
  commentBoxes,
  onToggle2D3D,
  active3DStyle,
  onChangePanZoom,
  onChangeNodeOffsets,
  onChangeNodeCustomizations,
  onChangeCommentBoxes,
  onExportJsonLayout,
  onImportJsonLayout,
  onSelectNode,
  onHoverNode,
  onHoverEdge,
  onSearchFocusNode,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const jsonInputRef = useRef<HTMLInputElement | null>(null);
  const [isPanning, setIsPanning] = useState<boolean>(false);
  const panStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);
  const nodeDragStartRef = useRef<{
    mouseX: number;
    mouseY: number;
    initX: number;
    initY: number;
  }>({ mouseX: 0, mouseY: 0, initX: 0, initY: 0 });

  const [resizingNode, setResizingNode] = useState<{
    id: string;
    mouseX: number;
    mouseY: number;
    initW: number;
    initH: number;
  } | null>(null);

  const [editingNodeId, setEditingNodeId] = useState<string | null>(null);
  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(null);

  const [draggingCommentId, setDraggingCommentId] = useState<string | null>(null);
  const commentDragStartRef = useRef<{
    mouseX: number;
    mouseY: number;
    initX: number;
    initY: number;
  }>({ mouseX: 0, mouseY: 0, initX: 0, initY: 0 });

  const [resizingComment, setResizingComment] = useState<{
    id: string;
    dir: ResizeDirection;
    mouseX: number;
    mouseY: number;
    initX: number;
    initY: number;
    initW: number;
    initH: number;
  } | null>(null);

  const [contextMenu, setContextMenu] = useState<{
    screenX: number;
    screenY: number;
    worldX: number;
    worldY: number;
    targetCommentId?: string | null;
  } | null>(null);

  const [hoveredEdgeId, setHoveredEdgeId] = useState<string | null>(null);

  const panZoomRef = useRef({ pan, zoom, onChangePanZoom });
  panZoomRef.current = { pan, zoom, onChangePanZoom };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedCommentId) return;
      const activeTag = document.activeElement?.tagName.toLowerCase();
      if (activeTag === 'input' || activeTag === 'textarea') return;

      if (e.key === 'Delete' || e.key === 'Backspace') {
        e.preventDefault();
        onChangeCommentBoxes(commentBoxes.filter((c) => c.id !== selectedCommentId));
        setSelectedCommentId(null);
        setContextMenu(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCommentId, commentBoxes, onChangeCommentBoxes]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleNativeWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const delta = e.deltaY < 0 ? 0.08 : -0.08;
      const nextZoom = Math.min(
        2.2,
        Math.max(0.25, Number((panZoomRef.current.zoom + delta).toFixed(2)))
      );
      panZoomRef.current.onChangePanZoom(panZoomRef.current.pan, nextZoom);
    };

    el.addEventListener('wheel', handleNativeWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleNativeWheel);
  }, []);

  // Build Per-Node Line-Numbered IN and OUT / True lXX / False lXX Pin Lists
  // AND shift the generated layout so its bounding-box center is placed right at the user's current viewport center!
  const { baseNodes, networkBoxes, activeEdges } = useMemo(() => {
    const map = new Map<string, Positioned2DNode>();
    const boxes: NetworkBox[] = [];

    const activeFiles = filterFileId
      ? repository.files.filter((f) => f.id === filterFileId)
      : repository.files;

    const visibleNodeIds = new Set<string>();
    activeFiles.forEach((f) => {
      f.nodes.forEach((n) => {
        if (graphFocusMode === GraphFocusMode.CLASSES && n.kind !== NodeKind.CLASS) return;
        visibleNodeIds.add(n.id);
      });
    });

    const filteredEdges = repository.edges.filter((edge) => {
      if (edge.kind === 'RECURSION') return false;
      if (graphFocusMode === GraphFocusMode.CLASSES && edge.kind !== 'CLASS_DEPENDENCY') {
        return false;
      }
      if (graphFocusMode === GraphFocusMode.FUNCTIONS && edge.kind === 'CLASS_DEPENDENCY') {
        return false;
      }
      return visibleNodeIds.has(edge.sourceId) && visibleNodeIds.has(edge.targetId);
    });

    const inPinsByNode = new Map<string, PinSocket[]>();
    const outPinsByNode = new Map<string, PinSocket[]>();

    filteredEdges.forEach((edge) => {
      const targetNode = repository.allNodes.find((n) => n.id === edge.targetId);
      const isReturnTarget = targetNode?.kind === NodeKind.RETURN;
      const returnExpr = targetNode?.returnExpression;

      const inList = inPinsByNode.get(edge.targetId) || [];
      inList.push({
        edgeId: edge.id,
        edge,
        label: isReturnTarget
          ? (returnExpr ? `${returnExpr} l${edge.callLine}` : `void l${edge.callLine}`)
          : `in l${edge.callLine}`,
        pinType: 'IN',
        line: edge.callLine,
      });
      inPinsByNode.set(edge.targetId, inList);

      const sourceNode = repository.allNodes.find((n) => n.id === edge.sourceId);
      if (sourceNode?.kind === NodeKind.RETURN) {
        return;
      }

      const outList = outPinsByNode.get(edge.sourceId) || [];
      const isTrue = edge.branchOutcome === 'TRUE';
      const isFalse = edge.branchOutcome === 'FALSE';

      outList.push({
        edgeId: edge.id,
        edge,
        label: isTrue
          ? `True l${edge.callLine}`
          : isFalse
          ? `False l${edge.callLine}`
          : `out l${edge.callLine}`,
        pinType: isTrue ? 'TRUE' : isFalse ? 'FALSE' : 'OUT',
        line: edge.callLine,
      });
      outPinsByNode.set(edge.sourceId, outList);
    });

    outPinsByNode.forEach((list, nodeId) => {
      list.sort((a, b) => {
        const order = { TRUE: 0, OUT: 1, FALSE: 2, IN: 3 };
        if (order[a.pinType] !== order[b.pinType]) {
          return order[a.pinType] - order[b.pinType];
        }
        return a.line - b.line;
      });
      outPinsByNode.set(nodeId, list);
    });

    const computeNodeHeight = (nodeId: string, baseLine: number, isReturn = false) => {
      const ins = inPinsByNode.get(nodeId) || [];
      const outs = outPinsByNode.get(nodeId) || [];
      if (ins.length === 0) {
        const targetNode = repository.allNodes.find((n) => n.id === nodeId);
        const expr = targetNode?.returnExpression;
        ins.push({
          edgeId: `default_in_${nodeId}`,
          label: isReturn
            ? (expr ? `${expr} l${baseLine}` : `void l${baseLine}`)
            : `in l${baseLine}`,
          pinType: 'IN',
          line: baseLine,
        });
        inPinsByNode.set(nodeId, ins);
      }
      if (outs.length === 0 && !isReturn) {
        outs.push({ edgeId: `default_out_${nodeId}`, label: `out l${baseLine}`, pinType: 'OUT', line: baseLine });
        outPinsByNode.set(nodeId, outs);
      }
      if (isReturn) {
        outPinsByNode.set(nodeId, []);
      }
      const maxPins = Math.max(ins.length, isReturn ? 0 : outs.length, 1);
      return HEADER_HEIGHT + PIN_TOP_PAD + maxPins * PIN_ROW_HEIGHT + 8;
    };

    if (graphFocusMode === GraphFocusMode.CLASSES) {
      const COL_W = 420;
      const ROW_H = 220;
      activeFiles.forEach((file, idx) => {
        const clsNode = file.nodes.find((n) => n.kind === NodeKind.CLASS) || file.nodes[0];
        if (!clsNode) return;
        const col = idx % 3;
        const row = Math.floor(idx / 3);
        const x = 80 + col * COL_W;
        const y = 70 + row * ROW_H;
        const h = computeNodeHeight(clsNode.id, clsNode.lineStart);

        map.set(clsNode.id, {
          node: clsNode,
          displayLabel: clsNode.label,
          x,
          y,
          width: 255,
          height: h,
          inPins: inPinsByNode.get(clsNode.id) || [],
          outPins: outPinsByNode.get(clsNode.id) || [],
          hasSelfLoop: Boolean(clsNode.isRecursive),
        });
      });
    } else {
      const BOX_COLS = filterFileId ? 1 : 2;
      const BOX_WIDTH = 1240;
      const BOX_GAP_X = 105;
      const BOX_GAP_Y = 85;

      let currentRowY = 60;
      let rowMaxHeight = 0;

      activeFiles.forEach((file, fIdx) => {
        const col = fIdx % BOX_COLS;
        if (col === 0 && fIdx > 0) {
          currentRowY += rowMaxHeight + BOX_GAP_Y;
          rowMaxHeight = 0;
        }

        const boxX = 50 + col * (BOX_WIDTH + BOX_GAP_X);
        const boxY = currentRowY;

        const classNode = file.nodes.find((n) => n.kind === NodeKind.CLASS) || file.nodes[0];
        if (!classNode) return;

        const functions = file.nodes.filter(
          (n) => n.kind === NodeKind.FUNCTION || n.kind === NodeKind.RECURSION
        );

        let fnCursorY = boxY + 58;
        functions.forEach((fn) => {
          const fnBranches = file.nodes.filter(
            (b) =>
              (b.kind === NodeKind.CONDITION || b.kind === NodeKind.LOOP) &&
              b.lineStart >= fn.lineStart &&
              b.lineEnd <= fn.lineEnd
          );
          const fnDirectReturns = file.nodes.filter(
            (r) => r.kind === NodeKind.RETURN && r.parentId === fn.id
          );
          const fnHeight = computeNodeHeight(fn.id, fn.lineStart);

          map.set(fn.id, {
            node: fn,
            displayLabel: fn.label,
            x: boxX + 285,
            y: fnCursorY,
            width: 245,
            height: fnHeight,
            inPins: inPinsByNode.get(fn.id) || [],
            outPins: outPinsByNode.get(fn.id) || [],
            hasSelfLoop: Boolean(fn.isRecursive),
          });

          let branchCursorY = fnCursorY;
          fnBranches.forEach((br) => {
            const brHeight = computeNodeHeight(br.id, br.lineStart);
            map.set(br.id, {
              node: br,
              displayLabel: br.label,
              x: boxX + 610,
              y: branchCursorY,
              width: 250,
              height: brHeight,
              inPins: inPinsByNode.get(br.id) || [],
              outPins: outPinsByNode.get(br.id) || [],
              hasSelfLoop: br.kind === NodeKind.LOOP || Boolean(br.isRecursive),
            });

            // Position child return nodes for this branch in Column 3 (x: boxX + 940)
            const branchReturns = file.nodes.filter(
              (r) => r.kind === NodeKind.RETURN && r.parentId === br.id
            );
            let childReturnCursorY = branchCursorY;
            branchReturns.forEach((retNode) => {
              const retHeight = computeNodeHeight(retNode.id, retNode.lineStart, true);
              map.set(retNode.id, {
                node: retNode,
                displayLabel: 'return',
                x: boxX + 940,
                y: childReturnCursorY,
                width: 250,
                height: retHeight,
                inPins: inPinsByNode.get(retNode.id) || [],
                outPins: [],
                hasSelfLoop: false,
              });
              childReturnCursorY += retHeight + 16;
            });

            const branchUsedHeight = Math.max(brHeight + 22, childReturnCursorY - branchCursorY + 6);
            branchCursorY += branchUsedHeight;
          });

          // Position direct return nodes of function fn at Column 2 (x: boxX + 610) below branches
          fnDirectReturns.forEach((retNode) => {
            const retHeight = computeNodeHeight(retNode.id, retNode.lineStart, true);
            map.set(retNode.id, {
              node: retNode,
              displayLabel: 'return',
              x: boxX + 610,
              y: branchCursorY,
              width: 250,
              height: retHeight,
              inPins: inPinsByNode.get(retNode.id) || [],
              outPins: [],
              hasSelfLoop: false,
            });
            branchCursorY += retHeight + 22;
          });

          fnCursorY += Math.max(fnHeight + 28, branchCursorY - fnCursorY + 18);
        });

        const clsHeight = computeNodeHeight(classNode.id, classNode.lineStart);
        const boxHeight = Math.max(180, fnCursorY - boxY + 28);
        rowMaxHeight = Math.max(rowMaxHeight, boxHeight);

        map.set(classNode.id, {
          node: classNode,
          displayLabel: classNode.label,
          x: boxX + 24,
          y: boxY + boxHeight / 2 - clsHeight / 2,
          width: 210,
          height: clsHeight,
          inPins: inPinsByNode.get(classNode.id) || [],
          outPins: outPinsByNode.get(classNode.id) || [],
          hasSelfLoop: false,
        });

        boxes.push({
          id: `box_${file.id}`,
          title: `${classNode.symbolName} (${file.name})`,
          lang: file.language,
          x: boxX,
          y: boxY,
          width: BOX_WIDTH,
          height: boxHeight,
        });
      });
    }

    // Spawn nodes around the current viewport center where the user is currently looking!
    if (map.size > 0 && containerRef.current) {
      const vw = containerRef.current.clientWidth || window.innerWidth || 1200;
      const vh = containerRef.current.clientHeight || window.innerHeight || 800;
      const currentPan = panZoomRef.current.pan;
      const currentZoom = panZoomRef.current.zoom || 0.75;

      // World coordinates of the center of the user's current screen
      const viewCenterWorldX = (vw / 2 - currentPan.x) / currentZoom;
      const viewCenterWorldY = (vh / 2 - currentPan.y) / currentZoom;

      let minX = Infinity;
      let minY = Infinity;
      let maxX = -Infinity;
      let maxY = -Infinity;

      map.forEach((n) => {
        minX = Math.min(minX, n.x);
        minY = Math.min(minY, n.y);
        maxX = Math.max(maxX, n.x + n.width);
        maxY = Math.max(maxY, n.y + n.height);
      });

      const layoutCenterX = (minX + maxX) / 2;
      const layoutCenterY = (minY + maxY) / 2;

      const shiftX = Math.round(viewCenterWorldX - layoutCenterX);
      const shiftY = Math.round(viewCenterWorldY - layoutCenterY);

      map.forEach((n, k) => {
        map.set(k, {
          ...n,
          x: n.x + shiftX,
          y: n.y + shiftY,
        });
      });

      for (let i = 0; i < boxes.length; i++) {
        boxes[i] = {
          ...boxes[i],
          x: boxes[i].x + shiftX,
          y: boxes[i].y + shiftY,
        };
      }
    }

    return { baseNodes: map, networkBoxes: boxes, activeEdges: filteredEdges };
  }, [repository, filterFileId, graphFocusMode]);

  const finalNodesMap = useMemo(() => {
    const result = new Map<string, Positioned2DNode>();
    baseNodes.forEach((val, key) => {
      const off = nodeOffsets[key] || { x: 0, y: 0 };
      const cust = nodeCustomizations[key];
      result.set(key, {
        ...val,
        displayLabel: cust?.customLabel !== undefined ? cust.customLabel : val.displayLabel,
        x: val.x + off.x,
        y: val.y + off.y,
        width: cust?.width || val.width,
        height: cust?.height || val.height,
      });
    });
    return result;
  }, [baseNodes, nodeOffsets, nodeCustomizations]);

  const handleSelectAndCenter2DNode = (node: CodeNode) => {
    onSearchFocusNode(node);

    window.setTimeout(() => {
      const pos = finalNodesMap.get(node.id);
      const container = containerRef.current;
      if (pos && container) {
        const vw = container.clientWidth || 900;
        const vh = container.clientHeight || 700;
        const targetZoom = Math.max(zoom, 0.95);
        const nextPanX = Math.round(vw / 2 - (pos.x + pos.width / 2) * targetZoom);
        const nextPanY = Math.round(vh / 2 - (pos.y + pos.height / 2) * targetZoom);
        onChangePanZoom({ x: nextPanX, y: nextPanY }, targetZoom);
      }
    }, 50);
  };

  const circuitEdges = useMemo(() => {
    const list: {
      id: string;
      rawEdge: GraphEdge;
      pointsStr: string;
      points: Point2D[];
      arrows: { x: number; y: number; angleDeg: number }[];
      kind: string;
      branchType: 'TRUE' | 'FALSE' | 'NORMAL';
      isHighlighted: boolean;
      label?: string;
    }[] = [];

    const activeNodeId = hoveredNode?.id || selectedNode?.id;
    const occupiedSegments: Segment2D[] = [];

    activeEdges.forEach((edge) => {
      const src = finalNodesMap.get(edge.sourceId);
      const tgt = finalNodesMap.get(edge.targetId);
      if (!src || !tgt) return;

      const outIdx = Math.max(
        0,
        src.outPins.findIndex((p) => p.edgeId === edge.id)
      );
      const inIdx = Math.max(
        0,
        tgt.inPins.findIndex((p) => p.edgeId === edge.id)
      );

      const x1 = src.x + src.width;
      const y1 =
        src.y + HEADER_HEIGHT + PIN_TOP_PAD + outIdx * PIN_ROW_HEIGHT + PIN_ROW_HEIGHT / 2;

      const x2 = tgt.x;
      const y2 =
        tgt.y + HEADER_HEIGHT + PIN_TOP_PAD + inIdx * PIN_ROW_HEIGHT + PIN_ROW_HEIGHT / 2;

      let branchType: 'TRUE' | 'FALSE' | 'NORMAL' = 'NORMAL';
      if (edge.branchOutcome === 'FALSE') {
        branchType = 'FALSE';
      } else if (edge.branchOutcome === 'TRUE') {
        branchType = 'TRUE';
      }

      const pts = buildSmartElectronicRoute(x1, y1, x2, y2, occupiedSegments);
      const pointsStr = pts.map((p) => `${p.x},${p.y}`).join(' ');
      const arrows = sampleArrowsOnPolyline(pts, 120);

      const isHighlighted =
        hoveredEdgeId === edge.id ||
        activeNodeId === edge.sourceId ||
        activeNodeId === edge.targetId;

      list.push({
        id: edge.id,
        rawEdge: edge,
        pointsStr,
        points: pts,
        arrows,
        kind: edge.kind,
        branchType,
        isHighlighted,
        label: edge.label,
      });
    });

    return list;
  }, [activeEdges, finalNodesMap, hoveredNode?.id, selectedNode?.id, hoveredEdgeId]);

  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!containerRef.current) return;

    const commentEl = (e.target as HTMLElement).closest('[data-comment-id]') as HTMLElement | null;
    const hitCommentId = commentEl ? commentEl.getAttribute('data-comment-id') : null;
    if (hitCommentId) {
      setSelectedCommentId(hitCommentId);
    }

    const rect = containerRef.current.getBoundingClientRect();
    const screenX = e.clientX - rect.left;
    const screenY = e.clientY - rect.top;
    const worldX = Math.round((screenX - pan.x) / zoom);
    const worldY = Math.round((screenY - pan.y) / zoom);
    setContextMenu({
      screenX,
      screenY,
      worldX,
      worldY,
      targetCommentId: hitCommentId,
    });
  };

  const handleCreateCommentBox = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!contextMenu) return;
    const newId = `comment_${Date.now()}`;
    const newBox: CommentBox = {
      id: newId,
      title: 'Comment // Click & press DEL (Entf) or right-click to delete',
      x: contextMenu.worldX,
      y: contextMenu.worldY,
      width: 360,
      height: 190,
    };
    onChangeCommentBoxes([...commentBoxes, newBox]);
    setSelectedCommentId(newId);
    setContextMenu(null);
  };

  const handleDeleteCommentBox = (id: string) => {
    onChangeCommentBoxes(commentBoxes.filter((c) => c.id !== id));
    if (selectedCommentId === id) {
      setSelectedCommentId(null);
    }
    setContextMenu(null);
  };

  const handleUpdateCommentTitle = (id: string, title: string) => {
    onChangeCommentBoxes(
      commentBoxes.map((c) => (c.id === id ? { ...c, title } : c))
    );
  };

  const handleUpdateNodeCustomLabel = (nodeId: string, customLabel: string) => {
    onChangeNodeCustomizations({
      ...nodeCustomizations,
      [nodeId]: {
        ...(nodeCustomizations[nodeId] || {}),
        customLabel,
      },
    });
  };

  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button === 2) return;
    if ((e.target as HTMLElement).closest('[data-context-menu="true"]')) return;
    setContextMenu(null);
    setEditingNodeId(null);
    if (!(e.target as HTMLElement).closest('[data-comment-control="true"]')) {
      setSelectedCommentId(null);
    }
    if (
      (e.target as HTMLElement).closest('[data-node-card="true"]') ||
      (e.target as HTMLElement).closest('[data-comment-control="true"]')
    ) {
      return;
    }
    setIsPanning(true);
    panStartRef.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
  };

  const handleNodeMouseDown = (e: React.MouseEvent<HTMLDivElement>, nodeId: string) => {
    if (e.button === 2) return;
    e.stopPropagation();
    setContextMenu(null);
    setSelectedCommentId(null);
    const currentOffset = nodeOffsets[nodeId] || { x: 0, y: 0 };
    setDraggingNodeId(nodeId);
    nodeDragStartRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      initX: currentOffset.x,
      initY: currentOffset.y,
    };
  };

  const handleStartResizeNode = (
    e: React.MouseEvent<HTMLDivElement>,
    nodeId: string,
    currentW: number,
    currentH: number
  ) => {
    e.stopPropagation();
    setContextMenu(null);
    setResizingNode({
      id: nodeId,
      mouseX: e.clientX,
      mouseY: e.clientY,
      initW: currentW,
      initH: currentH,
    });
  };

  const handleCommentMouseDown = (e: React.MouseEvent<HTMLDivElement>, box: CommentBox) => {
    if (e.button === 2) return;
    e.stopPropagation();
    setContextMenu(null);
    setSelectedCommentId(box.id);
    setDraggingCommentId(box.id);
    commentDragStartRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      initX: box.x,
      initY: box.y,
    };
  };

  const handleStartResizeComment = (
    e: React.MouseEvent<HTMLDivElement>,
    box: CommentBox,
    dir: ResizeDirection
  ) => {
    e.stopPropagation();
    setContextMenu(null);
    setSelectedCommentId(box.id);
    setResizingComment({
      id: box.id,
      dir,
      mouseX: e.clientX,
      mouseY: e.clientY,
      initX: box.x,
      initY: box.y,
      initW: box.width,
      initH: box.height,
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (resizingNode) {
      const dx = (e.clientX - resizingNode.mouseX) / zoom;
      const dy = (e.clientY - resizingNode.mouseY) / zoom;
      const nextW = Math.max(170, Math.round(resizingNode.initW + dx));
      const nextH = Math.max(48, Math.round(resizingNode.initH + dy));
      onChangeNodeCustomizations({
        ...nodeCustomizations,
        [resizingNode.id]: {
          ...(nodeCustomizations[resizingNode.id] || {}),
          width: nextW,
          height: nextH,
        },
      });
      return;
    }

    if (resizingComment) {
      const dx = (e.clientX - resizingComment.mouseX) / zoom;
      const dy = (e.clientY - resizingComment.mouseY) / zoom;
      const MIN_W = 140;
      const MIN_H = 80;

      onChangeCommentBoxes(
        commentBoxes.map((box) => {
          if (box.id !== resizingComment.id) return box;
          let { initX: x, initY: y, initW: w, initH: h } = resizingComment;
          const d = resizingComment.dir;

          if (d.includes('e')) w = Math.max(MIN_W, Math.round(resizingComment.initW + dx));
          if (d.includes('s')) h = Math.max(MIN_H, Math.round(resizingComment.initH + dy));
          if (d.includes('w')) {
            const possibleW = Math.round(resizingComment.initW - dx);
            if (possibleW >= MIN_W) {
              w = possibleW;
              x = Math.round(resizingComment.initX + dx);
            }
          }
          if (d.includes('n')) {
            const possibleH = Math.round(resizingComment.initH - dy);
            if (possibleH >= MIN_H) {
              h = possibleH;
              y = Math.round(resizingComment.initY + dy);
            }
          }
          return { ...box, x, y, width: w, height: h };
        })
      );
      return;
    }

    if (draggingCommentId) {
      const dx = (e.clientX - commentDragStartRef.current.mouseX) / zoom;
      const dy = (e.clientY - commentDragStartRef.current.mouseY) / zoom;
      onChangeCommentBoxes(
        commentBoxes.map((c) =>
          c.id === draggingCommentId
            ? {
                ...c,
                x: Math.round(commentDragStartRef.current.initX + dx),
                y: Math.round(commentDragStartRef.current.initY + dy),
              }
            : c
        )
      );
      return;
    }

    if (draggingNodeId) {
      const dx = (e.clientX - nodeDragStartRef.current.mouseX) / zoom;
      const dy = (e.clientY - nodeDragStartRef.current.mouseY) / zoom;
      onChangeNodeOffsets({
        ...nodeOffsets,
        [draggingNodeId]: {
          x: Math.round(nodeDragStartRef.current.initX + dx),
          y: Math.round(nodeDragStartRef.current.initY + dy),
        },
      });
      return;
    }

    if (isPanning) {
      onChangePanZoom(
        {
          x: e.clientX - panStartRef.current.x,
          y: e.clientY - panStartRef.current.y,
        },
        zoom
      );
    }
  };

  const handleMouseUp = () => {
    setIsPanning(false);
    setDraggingNodeId(null);
    setResizingNode(null);
    setDraggingCommentId(null);
    setResizingComment(null);
  };

  const renderGraphToPng = (scaleMultiplier = 1, filePrefix = 'LCV-2D-Graph') => {
    const nodesArr = Array.from(finalNodesMap.values());
    if (nodesArr.length === 0) return;

    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    nodesArr.forEach((n) => {
      minX = Math.min(minX, n.x - 80);
      minY = Math.min(minY, n.y - 80);
      maxX = Math.max(maxX, n.x + n.width + 80);
      maxY = Math.max(maxY, n.y + n.height + 80);
    });

    networkBoxes.forEach((b) => {
      minX = Math.min(minX, b.x - 60);
      minY = Math.min(minY, b.y - 60);
      maxX = Math.max(maxX, b.x + b.width + 60);
      maxY = Math.max(maxY, b.y + b.height + 60);
    });

    commentBoxes.forEach((c) => {
      minX = Math.min(minX, c.x - 60);
      minY = Math.min(minY, c.y - 60);
      maxX = Math.max(maxX, c.x + c.width + 60);
      maxY = Math.max(maxY, c.y + c.height + 60);
    });

    const logicalWidth = Math.max(1400, maxX - minX + 120);
    const logicalHeight = Math.max(900, maxY - minY + 120);

    const canvas = document.createElement('canvas');
    canvas.width = Math.min(8192, Math.round(logicalWidth * scaleMultiplier));
    canvas.height = Math.min(8192, Math.round(logicalHeight * scaleMultiplier));
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const effScale = Math.min(
      canvas.width / logicalWidth,
      canvas.height / logicalHeight
    );
    ctx.scale(effScale, effScale);

    ctx.fillStyle = '#070709';
    ctx.fillRect(0, 0, logicalWidth, logicalHeight);

    ctx.strokeStyle = '#141418';
    ctx.lineWidth = 1;
    for (let gx = 0; gx < logicalWidth; gx += 28) {
      ctx.beginPath();
      ctx.moveTo(gx, 0);
      ctx.lineTo(gx, logicalHeight);
      ctx.stroke();
    }
    for (let gy = 0; gy < logicalHeight; gy += 28) {
      ctx.beginPath();
      ctx.moveTo(0, gy);
      ctx.lineTo(logicalWidth, gy);
      ctx.stroke();
    }

    const offsetX = -minX + 60;
    const offsetY = -minY + 60;

    [...networkBoxes, ...commentBoxes.map((c) => ({ ...c, lang: 'COMMENT' }))].forEach((box) => {
      ctx.fillStyle = 'rgba(20, 20, 26, 0.84)';
      ctx.strokeStyle = box.lang === 'COMMENT' ? '#E5A93C' : '#3F3F46';
      ctx.lineWidth = box.lang === 'COMMENT' ? 2 : 1.5;
      ctx.fillRect(box.x + offsetX, box.y + offsetY, box.width, box.height);
      ctx.strokeRect(box.x + offsetX, box.y + offsetY, box.width, box.height);

      ctx.fillStyle = '#F7D794';
      ctx.font = 'bold 13px sans-serif';
      ctx.fillText(box.title, box.x + offsetX + 12, box.y + offsetY + 22);
    });

    circuitEdges.forEach((edge) => {
      if (edge.points.length < 2) return;
      ctx.strokeStyle =
        edge.branchType === 'TRUE'
          ? '#22C55E'
          : edge.branchType === 'FALSE'
          ? '#EF4444'
          : edge.kind === 'CROSS_FILE_CALL' || edge.kind === 'CLASS_DEPENDENCY'
          ? '#E5A93C'
          : '#A1A1AA';
      ctx.lineWidth = 2.4;

      ctx.beginPath();
      ctx.moveTo(edge.points[0].x + offsetX, edge.points[0].y + offsetY);
      for (let i = 1; i < edge.points.length; i++) {
        ctx.lineTo(edge.points[i].x + offsetX, edge.points[i].y + offsetY);
      }
      ctx.stroke();

      edge.arrows.forEach((arr) => {
        ctx.save();
        ctx.translate(arr.x + offsetX, arr.y + offsetY);
        ctx.rotate((arr.angleDeg * Math.PI) / 180);
        ctx.fillStyle =
          edge.branchType === 'TRUE'
            ? '#22C55E'
            : edge.branchType === 'FALSE'
            ? '#EF4444'
            : '#E5A93C';
        ctx.beginPath();
        ctx.moveTo(5.5, 0);
        ctx.lineTo(-4.5, -3.8);
        ctx.lineTo(-4.5, 3.8);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      });
    });

    nodesArr.forEach(({ node, displayLabel, x, y, width: nw, height: nh, inPins, outPins, hasSelfLoop }) => {
      const rx = x + offsetX;
      const ry = y + offsetY;
      ctx.fillStyle = '#0D0D12';
      ctx.strokeStyle = node.kind === NodeKind.CLASS ? '#E5A93C' : '#52525B';
      ctx.lineWidth = 2;
      ctx.fillRect(rx, ry, nw, nh);
      ctx.strokeRect(rx, ry, nw, nh);

      ctx.fillStyle =
        node.kind === NodeKind.CLASS ? '#261D10' : '#18181F';
      ctx.fillRect(rx, ry, nw, HEADER_HEIGHT);

      ctx.fillStyle = node.kind === NodeKind.CLASS ? '#F7D794' : '#F4F4F5';
      ctx.font = 'bold 11px monospace';
      ctx.fillText(displayLabel.slice(0, 28), rx + 8, ry + 16);

      inPins.forEach((pin, pIdx) => {
        const py = ry + HEADER_HEIGHT + PIN_TOP_PAD + pIdx * PIN_ROW_HEIGHT;
        ctx.fillStyle = '#E5A93C';
        ctx.fillRect(rx + 6, py + 4, 6, 6);
        ctx.fillStyle = '#D4D4D8';
        ctx.font = '9px monospace';
        ctx.fillText(pin.label, rx + 16, py + 11);
      });

      outPins.forEach((pin, pIdx) => {
        const py = ry + HEADER_HEIGHT + PIN_TOP_PAD + pIdx * PIN_ROW_HEIGHT;
        ctx.fillStyle =
          pin.pinType === 'TRUE' ? '#22C55E' : pin.pinType === 'FALSE' ? '#EF4444' : '#E5A93C';
        ctx.fillRect(rx + nw - 12, py + 4, 6, 6);
        ctx.font = 'bold 9px monospace';
        ctx.fillText(pin.label, rx + nw - 16 - pin.label.length * 5.6, py + 11);
      });

      if (hasSelfLoop) {
        ctx.strokeStyle = '#38BDF8';
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        ctx.moveTo(rx + nw, ry + HEADER_HEIGHT + 10);
        ctx.lineTo(rx + nw + 22, ry + HEADER_HEIGHT + 10);
        ctx.lineTo(rx + nw + 22, ry - 18);
        ctx.lineTo(rx - 18, ry - 18);
        ctx.lineTo(rx - 18, ry + HEADER_HEIGHT + 10);
        ctx.lineTo(rx, ry + HEADER_HEIGHT + 10);
        ctx.stroke();

        const sqX = rx + nw / 2 - 22;
        const sqY = ry - 30;
        ctx.fillStyle = '#0284C7';
        ctx.strokeStyle = '#7DD3FC';
        ctx.lineWidth = 1.5;
        ctx.fillRect(sqX, sqY, 44, 18);
        ctx.strokeRect(sqX, sqY, 44, 18);

        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 10px monospace';
        ctx.fillText('LOOP', sqX + 9, sqY + 13);
      }
    });

    const dataUrl = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `${filePrefix}-${graphFocusMode}-${Date.now()}.png`;
    a.click();
  };

  return (
    <div
      ref={containerRef}
      onContextMenu={handleContextMenu}
      onMouseDown={handleCanvasMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className={`relative w-full h-full bg-[#070709] overflow-hidden select-none ${
        isPanning ? 'cursor-grabbing' : 'cursor-grab'
      }`}
      style={{
        backgroundImage:
          'linear-gradient(to right, #121217 1px, transparent 1px), linear-gradient(to bottom, #121217 1px, transparent 1px)',
        backgroundSize: `${28 * zoom}px ${28 * zoom}px`,
        backgroundPosition: `${pan.x}px ${pan.y}px`,
      }}
    >
      {/* Top-Left View Switcher & Legend */}
      <div className="absolute top-3 left-3 z-20 flex flex-wrap items-center gap-2">
        {onToggle2D3D && (
          <button
            type="button"
            onClick={onToggle2D3D}
            className="px-3 py-1.5 rounded bg-[#231B0E] hover:bg-[#2F2412] border border-[#E5A93C]/80 text-[#F7D794] font-sans text-xs font-semibold flex items-center gap-1.5 transition shadow-xl"
            title={`Switch directly to 3D View (${get3DStyleLabel(active3DStyle)})`}
          >
            <Box className="w-3.5 h-3.5 text-[#E5A93C]" />
            <span>Switch to 3D ({get3DStyleLabel(active3DStyle)})</span>
          </button>
        )}

        <div className="pointer-events-none flex flex-wrap items-center gap-4 bg-[#0D0D12]/95 border border-zinc-800 px-3 py-1.5 rounded text-xs font-sans">
          <span className="flex items-center gap-1.5 text-[#F7D794] font-semibold">
            <span className="w-2.5 h-2.5 rounded-xs bg-[#E5A93C] inline-block" />
            Line-Numbered Pins (in lXX / out lXX)
          </span>
          <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
            <span className="w-2.5 h-2.5 rounded-xs bg-[#22C55E] inline-block" />
            True lXX Pin (Green)
          </span>
          <span className="flex items-center gap-1.5 text-red-400 font-semibold">
            <span className="w-2.5 h-2.5 rounded-xs bg-[#EF4444] inline-block" />
            False lXX Pin (Red)
          </span>
          <span className="flex items-center gap-1.5 text-rose-400 font-semibold">
            <span className="w-2.5 h-2.5 rounded-xs bg-[#F43F5E] inline-block" />
            Return Node (Pink / Rose)
          </span>
          <span className="flex items-center gap-1.5 text-sky-300 font-semibold">
            <span className="px-1.5 py-0.2 bg-[#0284C7] border border-sky-300 text-white font-mono text-[9.5px] font-bold">
              LOOP
            </span>
            Blue Loop Square
          </span>
        </div>
      </div>

      {/* Right-Click Context Menu */}
      {contextMenu && (
        <div
          data-context-menu="true"
          onMouseDown={(e) => e.stopPropagation()}
          style={{ left: contextMenu.screenX, top: contextMenu.screenY }}
          className="absolute z-50 bg-[#0E0E13] border border-[#E5A93C]/80 rounded shadow-2xl py-1 w-64 font-sans text-xs"
        >
          <button
            type="button"
            onClick={handleCreateCommentBox}
            className="w-full px-3 py-2 text-left text-zinc-100 hover:bg-[#231B0E] hover:text-[#F7D794] font-semibold flex items-center gap-2 transition"
          >
            <MessageSquarePlus className="w-4 h-4 text-[#E5A93C]" />
            <span>Create Comment Box Here</span>
          </button>

          {(contextMenu.targetCommentId || selectedCommentId) && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                const idToRemove = contextMenu.targetCommentId || selectedCommentId;
                if (idToRemove) {
                  handleDeleteCommentBox(idToRemove);
                }
              }}
              className="w-full px-3 py-2 text-left text-red-400 hover:bg-red-950/70 hover:text-red-200 font-semibold flex items-center gap-2 border-t border-zinc-800 transition"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete Comment Box (Entf)</span>
            </button>
          )}

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onChangeNodeOffsets({});
              onChangeNodeCustomizations({});
              setContextMenu(null);
            }}
            className="w-full px-3 py-2 text-left text-zinc-300 hover:bg-zinc-800 flex items-center gap-2 border-t border-zinc-800 transition"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#E5A93C]" />
            <span>Reset Node Positions & Sizes</span>
          </button>
        </div>
      )}

      {/* Pan & Zoom Surface */}
      <div
        className="origin-top-left"
        style={{
          transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoom})`,
        }}
      >
        <div className="relative w-[3800px] h-[3000px]">
          {networkBoxes.map((box) => (
            <div
              key={box.id}
              style={{
                left: box.x,
                top: box.y,
                width: box.width,
                height: box.height,
              }}
              className="pointer-events-none absolute bg-[#0D0D12]/80 border border-zinc-800/90 z-0"
            >
              <div className="px-3 py-1.5 bg-[#14141B] border-b border-zinc-800 flex items-center justify-between font-sans text-xs">
                <span className="text-[#F7D794] font-semibold tracking-wide">
                  {box.title}
                </span>
                <span className="text-zinc-400 font-mono text-[11px]">{box.lang}</span>
              </div>
            </div>
          ))}

          {commentBoxes.map((cBox) => {
            const isCommentSelected = selectedCommentId === cBox.id;
            return (
              <div
                key={cBox.id}
                data-comment-control="true"
                data-comment-id={cBox.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedCommentId(cBox.id);
                }}
                style={{
                  left: cBox.x,
                  top: cBox.y,
                  width: cBox.width,
                  height: cBox.height,
                }}
                className={`absolute bg-[#16161E]/90 border ${
                  isCommentSelected
                    ? 'border-[#F7D794] ring-2 ring-[#E5A93C]/50'
                    : 'border-[#E5A93C]/60'
                } shadow-[0_0_25px_rgba(0,0,0,0.85)] z-10 flex flex-col`}
              >
                <div
                  onMouseDown={(e) => handleCommentMouseDown(e, cBox)}
                  className="px-3 py-1.5 bg-[#201E1A] border-b border-[#E5A93C]/40 flex items-center justify-between gap-2 cursor-move"
                >
                  <input
                    type="text"
                    value={cBox.title}
                    onChange={(e) => handleUpdateCommentTitle(cBox.id, e.target.value)}
                    onFocus={() => setSelectedCommentId(cBox.id)}
                    onMouseDown={(e) => e.stopPropagation()}
                    className="bg-transparent font-sans text-xs font-semibold text-[#F7D794] focus:outline-none w-full"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteCommentBox(cBox.id);
                    }}
                    onMouseDown={(e) => e.stopPropagation()}
                    className="text-zinc-300 hover:text-red-400 p-0.5 shrink-0"
                    title="Delete Comment Box (or press DEL / Entf)"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex-1 p-2 pointer-events-none flex items-end justify-between">
                  <span className="font-sans text-[10px] text-zinc-400">
                    {isCommentSelected ? 'Press DEL (Entf) or Right-Click to delete' : ''}
                  </span>
                  <span className="font-mono text-[10px] text-zinc-400">
                    {cBox.width}×{cBox.height}px
                  </span>
                </div>

                <div
                  onMouseDown={(e) => handleStartResizeComment(e, cBox, 'w')}
                  className="absolute top-0 bottom-0 -left-2 w-4 cursor-ew-resize"
                />
                <div
                  onMouseDown={(e) => handleStartResizeComment(e, cBox, 'e')}
                  className="absolute top-0 bottom-0 -right-2 w-4 cursor-ew-resize"
                />
                <div
                  onMouseDown={(e) => handleStartResizeComment(e, cBox, 'n')}
                  className="absolute -top-2 left-0 right-0 h-4 cursor-ns-resize"
                />
                <div
                  onMouseDown={(e) => handleStartResizeComment(e, cBox, 's')}
                  className="absolute -bottom-2 left-0 right-0 h-4 cursor-ns-resize"
                />
                <div
                  onMouseDown={(e) => handleStartResizeComment(e, cBox, 'se')}
                  className="absolute -bottom-2 -right-2 w-3.5 h-3.5 bg-[#E5A93C] cursor-nwse-resize"
                  title="Drag to resize Comment Box"
                />
                <div
                  onMouseDown={(e) => handleStartResizeComment(e, cBox, 'sw')}
                  className="absolute -bottom-2 -left-2 w-3.5 h-3.5 bg-[#E5A93C]/60 cursor-nesw-resize"
                />
                <div
                  onMouseDown={(e) => handleStartResizeComment(e, cBox, 'ne')}
                  className="absolute -top-2 -right-2 w-3.5 h-3.5 bg-[#E5A93C]/60 cursor-nesw-resize"
                />
                <div
                  onMouseDown={(e) => handleStartResizeComment(e, cBox, 'nw')}
                  className="absolute -top-2 -left-2 w-3.5 h-3.5 bg-[#E5A93C]/60 cursor-nwse-resize"
                />
              </div>
            );
          })}

          <svg className="overflow-visible absolute top-0 left-0 w-[3800px] h-[3000px] pointer-events-none z-20">
            {/* 45-Degree Electronic Circuit Wires */}
            {circuitEdges.map((edge) => {
              const isHiddenByHover = hoveredEdgeId !== null && hoveredEdgeId !== edge.id;
              if (isHiddenByHover) {
                return null;
              }

              const isCross =
                edge.kind === 'CROSS_FILE_CALL' || edge.kind === 'CLASS_DEPENDENCY';

              let strokeColor = '#71717A';
              if (edge.isHighlighted || hoveredEdgeId === edge.id) {
                strokeColor = '#E5A93C';
              } else if (edge.branchType === 'TRUE') {
                strokeColor = '#22C55E';
              } else if (edge.branchType === 'FALSE') {
                strokeColor = '#EF4444';
              } else if (isCross) {
                strokeColor = '#D99B38';
              }

              const strokeWidth =
                hoveredEdgeId === edge.id || edge.isHighlighted ? 3.4 : isCross ? 2.2 : 1.8;
              const arrowFill =
                hoveredEdgeId === edge.id || edge.isHighlighted
                  ? '#F7D794'
                  : edge.branchType === 'TRUE'
                  ? '#22C55E'
                  : edge.branchType === 'FALSE'
                  ? '#EF4444'
                  : '#E5A93C';

              return (
                <g key={edge.id} className="pointer-events-auto">
                  <polyline
                    points={edge.pointsStr}
                    fill="none"
                    stroke="transparent"
                    strokeWidth={16}
                    className="cursor-pointer"
                    onMouseEnter={() => {
                      setHoveredEdgeId(edge.id);
                      onHoverEdge(edge.rawEdge);
                    }}
                    onMouseLeave={() => {
                      setHoveredEdgeId(null);
                      onHoverEdge(null);
                    }}
                  />
                  <polyline
                    points={edge.pointsStr}
                    fill="none"
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    strokeLinejoin="bevel"
                    className="pointer-events-none"
                  />
                  {edge.arrows.map((arr, idx) => (
                    <polygon
                      key={idx}
                      points="-4,-3.5 5,0 -4,3.5"
                      fill={arrowFill}
                      transform={`translate(${arr.x}, ${arr.y}) rotate(${arr.angleDeg})`}
                      className="pointer-events-none"
                    />
                  ))}
                </g>
              );
            })}

            {/* Angular Blue Self-Loop Wires ("eckiger blauer Wire") with Filled Blue Square containing "LOOP" */}
            {Array.from(finalNodesMap.values()).map(({ node, x, y, width, hasSelfLoop }) => {
              if (!hasSelfLoop) return null;
              const loopEdgeId = `self_loop_${node.id}`;
              if (hoveredEdgeId !== null && hoveredEdgeId !== loopEdgeId) return null;

              const outY = y + HEADER_HEIGHT + 12;
              const inY = y + HEADER_HEIGHT + 12;
              const topY = y - 22;
              const rightX = x + width + 22;
              const leftX = x - 20;
              const midX = x + width / 2;

              const loopPts = `${x + width},${outY} ${rightX},${outY} ${rightX},${topY} ${leftX},${topY} ${leftX},${inY} ${x},${inY}`;

              const syntheticLoopEdge: GraphEdge = {
                id: loopEdgeId,
                sourceId: node.id,
                targetId: node.id,
                kind: 'RECURSION',
                sourceFile: node.fileName,
                targetFile: node.fileName,
                callLine: node.lineStart,
                label: 'LOOP',
                branchOutcome: 'LOOP',
              };

              return (
                <g key={loopEdgeId} className="pointer-events-auto">
                  <polyline
                    points={loopPts}
                    fill="none"
                    stroke="transparent"
                    strokeWidth={14}
                    className="cursor-pointer"
                    onMouseEnter={() => {
                      setHoveredEdgeId(loopEdgeId);
                      onHoverEdge(syntheticLoopEdge);
                    }}
                    onMouseLeave={() => {
                      setHoveredEdgeId(null);
                      onHoverEdge(null);
                    }}
                  />
                  <polyline
                    points={loopPts}
                    fill="none"
                    stroke="#38BDF8"
                    strokeWidth={hoveredEdgeId === loopEdgeId ? 3.5 : 2.3}
                    strokeLinejoin="miter"
                    className="pointer-events-none"
                  />
                  <polygon
                    points="4,-3.5 -5,0 4,3.5"
                    fill="#38BDF8"
                    transform={`translate(${midX - 34}, ${topY})`}
                    className="pointer-events-none"
                  />
                  {/* Blue Square Box with the word "LOOP" centered inside it */}
                  <rect
                    x={midX - 24}
                    y={topY - 10}
                    width={48}
                    height={20}
                    fill="#0284C7"
                    stroke="#E0F2FE"
                    strokeWidth={1.5}
                    className="cursor-pointer"
                    onMouseEnter={() => {
                      setHoveredEdgeId(loopEdgeId);
                      onHoverEdge(syntheticLoopEdge);
                    }}
                    onMouseLeave={() => {
                      setHoveredEdgeId(null);
                      onHoverEdge(null);
                    }}
                  />
                  <text
                    x={midX}
                    y={topY + 3.5}
                    textAnchor="middle"
                    fill="#FFFFFF"
                    fontSize="10.5"
                    fontFamily="monospace"
                    fontWeight="bold"
                    className="pointer-events-none"
                  >
                    LOOP
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Nodes with Multi-Row Line-Numbered IN (in lXX) and OUT / True lXX / False lXX Pins */}
          {Array.from(finalNodesMap.values()).map(
            ({ node, displayLabel, x, y, width, height, inPins, outPins, hasSelfLoop }) => {
              const isSelected = selectedNode?.id === node.id;
              const isHovered = hoveredNode?.id === node.id;

              let headerBg = 'bg-[#202027] text-zinc-100 border-b border-zinc-700';
              let borderClass = 'border-zinc-700';

              if (node.kind === NodeKind.CLASS) {
                headerBg =
                  'bg-[#281E10] text-[#F7D794] font-semibold border-b border-[#E5A93C]/60';
                borderClass = 'border-[#E5A93C]/80';
              } else if (hasSelfLoop) {
                headerBg = 'bg-[#0F2238] text-sky-200 font-semibold border-b border-sky-500/60';
                borderClass = 'border-sky-500/80';
              } else if (node.kind === NodeKind.RETURN) {
                headerBg = 'bg-[#351424] text-rose-200 font-semibold border-b border-rose-500/60';
                borderClass = 'border-rose-500/80 shadow-[0_0_15px_rgba(244,63,94,0.22)]';
              } else if (node.kind === NodeKind.FUNCTION) {
                headerBg =
                  'bg-[#191920] text-[#F3C66F] font-semibold border-b border-[#E5A93C]/40';
                borderClass = 'border-zinc-600';
              } else if (node.kind === NodeKind.CONDITION) {
                const isElse = node.label.toLowerCase().startsWith('else');
                headerBg = isElse
                  ? 'bg-[#2D1418] text-red-200 font-semibold border-b border-red-500/40'
                  : 'bg-[#12291D] text-emerald-200 font-semibold border-b border-emerald-500/40';
                borderClass = isElse ? 'border-red-500/60' : 'border-emerald-500/60';
              }

              const rowCount = Math.max(inPins.length, outPins.length, 1);

              return (
                <div
                  key={node.id}
                  data-node-card="true"
                  onMouseDown={(e) => handleNodeMouseDown(e, node.id)}
                  onMouseEnter={() => onHoverNode(node)}
                  onClick={() => onSelectNode(node)}
                  onDoubleClick={(e) => {
                    e.stopPropagation();
                    setEditingNodeId(node.id);
                  }}
                  style={{ left: x, top: y, width, height }}
                  className={`absolute bg-[#0C0C11] border ${borderClass} flex flex-col cursor-move select-none shadow-lg ${
                    isSelected || isHovered
                      ? node.kind === NodeKind.RETURN
                        ? 'ring-2 ring-rose-400 z-30'
                        : 'ring-2 ring-[#E5A93C] z-30'
                      : 'z-20'
                  }`}
                >
                  {/* Node Header (24px) with Blue Square [LOOP] badge when self-looping or [RET] for return nodes */}
                  <div
                    className={`h-[24px] shrink-0 px-2 text-[11px] font-mono flex items-center justify-between gap-1 truncate ${headerBg}`}
                  >
                    <div className="flex items-center gap-1.5 truncate">
                      {hasSelfLoop && (
                        <span className="px-1.5 py-0.2 bg-[#0284C7] border border-sky-200 text-white font-mono text-[9px] font-bold shrink-0">
                          LOOP
                        </span>
                      )}
                      {node.kind === NodeKind.RETURN && (
                        <span className="px-1.5 py-0.2 bg-rose-950/90 border border-rose-400 text-rose-300 font-mono text-[9px] font-bold shrink-0">
                          RET
                        </span>
                      )}
                      {editingNodeId === node.id ? (
                        <input
                          type="text"
                          autoFocus
                          value={displayLabel}
                          onChange={(e) => handleUpdateNodeCustomLabel(node.id, e.target.value)}
                          onBlur={() => setEditingNodeId(null)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') setEditingNodeId(null);
                          }}
                          onMouseDown={(e) => e.stopPropagation()}
                          className="bg-black text-[#F7D794] px-1 w-full text-[11px] font-mono focus:outline-none"
                        />
                      ) : (
                        <span className="truncate" title={node.kind === NodeKind.RETURN ? 'Return Statement' : 'Double-click to rename node'}>
                          {displayLabel}
                        </span>
                      )}
                    </div>
                    <span className="text-[9.5px] text-zinc-400 ml-1 shrink-0">
                      L{node.lineStart}
                    </span>
                  </div>

                  {/* Multi-Row Pin Sockets with Line Numbers (Hovering any pin highlights that exact line in the function code!) */}
                  <div className="pt-[10px] pb-1.5 px-2 flex flex-col">
                    {Array.from({ length: rowCount }).map((_, rIdx) => {
                      const inPin = inPins[rIdx];
                      const outPin = outPins[rIdx];

                      return (
                        <div
                          key={rIdx}
                          className="h-[18px] flex items-center justify-between font-mono text-[9.5px]"
                        >
                          {inPin ? (
                            <span
                              onMouseEnter={(e) => {
                                e.stopPropagation();
                                if (inPin.edge) {
                                   setHoveredEdgeId(inPin.edgeId);
                                  onHoverEdge(inPin.edge);
                                }
                              }}
                              onMouseLeave={() => {
                                setHoveredEdgeId(null);
                                onHoverEdge(null);
                              }}
                              className="flex items-center gap-1.5 text-zinc-300 hover:text-white cursor-pointer"
                            >
                              <span className={`w-2 h-2 inline-block shrink-0 ${node.kind === NodeKind.RETURN ? 'bg-[#F43F5E]' : 'bg-[#E5A93C]'}`} />
                              <span>{inPin.label}</span>
                            </span>
                          ) : (
                            <span />
                          )}

                          {outPin && node.kind !== NodeKind.RETURN ? (
                            <span
                              onMouseEnter={(e) => {
                                e.stopPropagation();
                                if (outPin.edge) {
                                  setHoveredEdgeId(outPin.edgeId);
                                  onHoverEdge(outPin.edge);
                                }
                              }}
                              onMouseLeave={() => {
                                setHoveredEdgeId(null);
                                onHoverEdge(null);
                              }}
                              className={`flex items-center gap-1.5 font-semibold cursor-pointer ${
                                outPin.pinType === 'TRUE'
                                  ? 'text-emerald-400 hover:text-emerald-200'
                                  : outPin.pinType === 'FALSE'
                                  ? 'text-red-400 hover:text-red-200'
                                  : 'text-[#F7D794] hover:text-white'
                              }`}
                            >
                              <span>{outPin.label}</span>
                              <span
                                className={`w-2 h-2 inline-block shrink-0 ${
                                  outPin.pinType === 'TRUE'
                                    ? 'bg-[#22C55E]'
                                    : outPin.pinType === 'FALSE'
                                    ? 'bg-[#EF4444]'
                                    : 'border border-[#E5A93C] bg-[#E5A93C]/30'
                                }`}
                              />
                            </span>
                          ) : (
                            <span />
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div
                    onMouseDown={(e) => handleStartResizeNode(e, node.id, width, height)}
                    className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-zinc-600 hover:bg-[#E5A93C] cursor-nwse-resize"
                    title="Drag to resize node"
                  />
                </div>
              );
            }
          )}
        </div>
      </div>

      {/* Bottom-Left Bar: Search Function/Class Autocomplete + 2D Controls */}
      <div className="absolute bottom-3 left-3 z-30 flex flex-wrap items-center gap-1.5 bg-[#0E0E13]/95 border border-zinc-800 rounded p-1.5 shadow-2xl">
        <NodeSearchBox
          allNodes={repository.allNodes}
          onSelectFocusNode={handleSelectAndCenter2DNode}
        />

        <button
          type="button"
          onClick={() =>
            onChangePanZoom(pan, Math.min(2.2, Number((zoom + 0.15).toFixed(2))))
          }
          className="p-1.5 rounded text-zinc-300 hover:text-[#F7D794] hover:bg-[#231B0E] transition"
          title="Zoom In"
        >
          <ZoomIn className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() =>
            onChangePanZoom(pan, Math.max(0.25, Number((zoom - 0.15).toFixed(2))))
          }
          className="p-1.5 rounded text-zinc-300 hover:text-[#F7D794] hover:bg-[#231B0E] transition"
          title="Zoom Out"
        >
          <ZoomOut className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => {
            onChangePanZoom({ x: 40, y: 40 }, 0.75);
            onChangeNodeOffsets({});
            onChangeNodeCustomizations({});
          }}
          className="p-1.5 rounded text-zinc-300 hover:text-[#F7D794] hover:bg-[#231B0E] transition"
          title="Reset Layout & View"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>
        <span className="px-2 text-[11px] font-sans text-zinc-400 border-l border-zinc-800 flex items-center gap-1">
          <Move className="w-3 h-3 text-[#E5A93C]" />
          <span>{Math.round(zoom * 100)}%</span>
        </span>
        <button
          type="button"
          onClick={() => {
            const newId = `comment_${Date.now()}`;
            const newBox: CommentBox = {
              id: newId,
              title: 'Comment // Click & press DEL (Entf) or right-click to delete',
              x: Math.round((260 - pan.x) / zoom),
              y: Math.round((160 - pan.y) / zoom),
              width: 360,
              height: 190,
            };
            onChangeCommentBoxes([...commentBoxes, newBox]);
            setSelectedCommentId(newId);
          }}
          className="px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-[#F7D794] font-sans text-xs font-medium flex items-center gap-1 transition"
          title="Add Resizable Comment Box (or Right-Click anywhere)"
        >
          <MessageSquarePlus className="w-3.5 h-3.5 text-[#E5A93C]" />
          <span>+ Comment</span>
        </button>

        {selectedCommentId && (
          <button
            type="button"
            onClick={() => handleDeleteCommentBox(selectedCommentId)}
            className="px-2.5 py-1 rounded bg-red-950/90 hover:bg-red-800 text-red-200 border border-red-700 font-sans text-xs font-medium flex items-center gap-1 transition"
            title="Delete Selected Comment Box (Shortcut: DEL / Entf)"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete Comment</span>
          </button>
        )}

        <button
          type="button"
          onClick={onExportJsonLayout}
          className="px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 font-sans text-xs font-medium flex items-center gap-1 transition"
          title="Export Nodes, Positions, Sizes & Comments as JSON"
        >
          <Download className="w-3.5 h-3.5 text-[#E5A93C]" />
          <span>Export JSON</span>
        </button>

        <input
          ref={jsonInputRef}
          type="file"
          accept=".json,application/json"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              onImportJsonLayout(file);
              e.target.value = '';
            }
          }}
        />
        <button
          type="button"
          onClick={() => jsonInputRef.current?.click()}
          className="px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 font-sans text-xs font-medium flex items-center gap-1 transition"
          title="Import Layout JSON to restore exact nodes, sizes, and comments"
        >
          <Upload className="w-3.5 h-3.5 text-[#E5A93C]" />
          <span>Import JSON</span>
        </button>

        <button
          type="button"
          onClick={() => renderGraphToPng(1, 'LCV-2D-Graph')}
          className="px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 font-sans text-xs font-medium flex items-center gap-1 transition"
          title="Export 2D Graph as Standard PNG"
        >
          <Camera className="w-3.5 h-3.5 text-[#E5A93C]" />
          <span>Export 2D PNG</span>
        </button>

        <button
          type="button"
          onClick={() => renderGraphToPng(2.4, 'LCV-FULL-GIANT-GRAPH')}
          className="px-3 py-1 rounded bg-[#231B0E] hover:bg-[#2F2412] border border-[#E5A93C]/80 text-[#F7D794] font-sans text-xs font-semibold flex items-center gap-1.5 transition"
          title="Export Entire Full Graph as Ultra-High-Resolution Giant PNG"
        >
          <Expand className="w-3.5 h-3.5 text-[#E5A93C]" />
          <span>Full Graph Giant PNG</span>
        </button>
      </div>
    </div>
  );
};
