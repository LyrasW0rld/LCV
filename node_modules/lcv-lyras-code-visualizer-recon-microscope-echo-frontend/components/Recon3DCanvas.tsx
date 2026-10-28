import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {
  CodeNode,
  GraphEdge,
  GraphFocusMode,
  NodeKind,
  ProjectRepository,
  Render3DStyle,
} from '../types';
import { NodeSearchBox } from './NodeSearchBox';
import {
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Compass,
  Camera,
  Cpu,
  Building2,
  Network,
  Tag,
  Hand,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';

interface Recon3DCanvasProps {
  repository: ProjectRepository;
  graphFocusMode: GraphFocusMode;
  render3DStyle: Render3DStyle;
  onChangeRender3DStyle: (style: Render3DStyle) => void;
  selectedNode: CodeNode | null;
  hoveredNode: CodeNode | null;
  filterFileId: string | null;
  onSelectNode: (node: CodeNode) => void;
  onHoverNode: (node: CodeNode | null) => void;
  onHoverEdge: (edge: GraphEdge | null) => void;
  onSearchFocusNode: (node: CodeNode) => void;
}

function createLabelSprite(
  title: string,
  subtitle: string,
  borderColorHex: string,
  scaleWidth = 14,
  scaleHeight = 3.6
): THREE.Sprite {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = 'rgba(12, 12, 18, 0.92)';
    ctx.fillRect(8, 8, 496, 112);
    ctx.strokeStyle = borderColorHex;
    ctx.lineWidth = 4;
    ctx.strokeRect(8, 8, 496, 112);

    ctx.fillStyle = '#F7D794';
    ctx.font = 'bold 34px sans-serif';
    ctx.fillText(title.slice(0, 26), 26, 56);

    ctx.fillStyle = '#D4D4D8';
    ctx.font = '23px monospace';
    ctx.fillText(subtitle.slice(0, 34), 26, 96);
  }
  const texture = new THREE.CanvasTexture(canvas);
  const material = new THREE.SpriteMaterial({ map: texture, transparent: true });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(scaleWidth, scaleHeight, 1);
  return sprite;
}

function createBlueLoopSquareSprite(scaleSize = 4.6): THREE.Sprite {
  const canvas = document.createElement('canvas');
  canvas.width = 160;
  canvas.height = 160;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#0284C7';
    ctx.fillRect(10, 34, 140, 92);
    ctx.strokeStyle = '#E0F2FE';
    ctx.lineWidth = 8;
    ctx.strokeRect(10, 34, 140, 92);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 42px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('LOOP', 80, 82);
  }
  const texture = new THREE.CanvasTexture(canvas);
  const material = new THREE.SpriteMaterial({ map: texture, transparent: true });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(scaleSize, scaleSize, 1);
  return sprite;
}

function createVirtualDiskTexture(
  label: string,
  fillHex: string,
  ringHex: string
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.clearRect(0, 0, 256, 256);
    ctx.beginPath();
    ctx.arc(128, 128, 116, 0, Math.PI * 2);
    ctx.fillStyle = fillHex;
    ctx.fill();
    ctx.lineWidth = 8;
    ctx.strokeStyle = ringHex;
    ctx.stroke();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 26px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label.slice(0, 16), 128, 128);
  }
  return new THREE.CanvasTexture(canvas);
}

function createBuildingFacadeTexture(complexityColorHex: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#0D1017';
    ctx.fillRect(0, 0, 128, 256);

    ctx.strokeStyle = '#1E2430';
    ctx.lineWidth = 2;
    ctx.strokeRect(2, 2, 124, 252);

    for (let row = 12; row < 244; row += 18) {
      for (let col = 12; col < 116; col += 20) {
        const isLit = ((row * 7 + col * 13) % 5) !== 0;
        ctx.fillStyle = isLit ? complexityColorHex : '#151922';
        ctx.globalAlpha = isLit ? 0.72 : 0.4;
        ctx.fillRect(col, row, 12, 10);
      }
    }
    ctx.globalAlpha = 1.0;
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

function getComplexityFacadeHex(complexity: number, isRecursive?: boolean): {
  hexNum: number;
  hexStr: string;
} {
  if (isRecursive || complexity >= 7) {
    return { hexNum: 0xef4444, hexStr: '#EF4444' };
  }
  if (complexity >= 4) {
    return { hexNum: 0xf59e0b, hexStr: '#F59E0B' };
  }
  return { hexNum: 0x38bdf8, hexStr: '#38BDF8' };
}

export const Recon3DCanvas: React.FC<Recon3DCanvasProps> = ({
  repository,
  graphFocusMode,
  render3DStyle,
  onChangeRender3DStyle,
  filterFileId,
  onSelectNode,
  onHoverNode,
  onHoverEdge,
  onSearchFocusNode,
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const controlsRef = useRef<any>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const nodePositionsRef = useRef<Map<string, THREE.Vector3>>(new Map());
  const focusRingMeshRef = useRef<THREE.Mesh | null>(null);

  const savedCameraStatRef = useRef<{ pos: THREE.Vector3; target: THREE.Vector3 } | null>(null);

  const [grabGridMode, setGrabGridMode] = useState<boolean>(true);
  const [showLabels, setShowLabels] = useState<boolean>(true);
  const [nodeDistanceScale, setNodeDistanceScale] = useState<number>(1.0);

  const [cursorTip, setCursorTip] = useState<{
    title: string;
    subtitle: string;
    x: number;
    y: number;
  } | null>(null);
  const [autoRotate, setAutoRotate] = useState<boolean>(false);

  const callbacksRef = useRef({ onSelectNode, onHoverNode, onHoverEdge });
  callbacksRef.current = { onSelectNode, onHoverNode, onHoverEdge };

  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls) return;
    controls.screenSpacePanning = true;
    if (grabGridMode) {
      controls.mouseButtons = {
        LEFT: THREE.MOUSE.PAN,
        MIDDLE: THREE.MOUSE.DOLLY,
        RIGHT: THREE.MOUSE.ROTATE,
      };
    } else {
      controls.mouseButtons = {
        LEFT: THREE.MOUSE.ROTATE,
        MIDDLE: THREE.MOUSE.DOLLY,
        RIGHT: THREE.MOUSE.PAN,
      };
    }
  }, [grabGridMode]);

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = autoRotate;
    }
  }, [autoRotate]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 960;
    const height = container.clientHeight || 720;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#070709');
    scene.fog = new THREE.FogExp2('#070709', 0.0015);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 2400);
    if (savedCameraStatRef.current) {
      camera.position.copy(savedCameraStatRef.current.pos);
    } else {
      camera.position.set(0, 76, 152);
    }
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      preserveDrawingBuffer: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.screenSpacePanning = true;
    controls.panSpeed = 1.15;
    controls.maxPolarAngle =
      render3DStyle === Render3DStyle.FORCE_GRAPH ? Math.PI : Math.PI / 2 - 0.015;
    controls.minDistance = 8;
    controls.maxDistance = 580;
    if (savedCameraStatRef.current) {
      controls.target.copy(savedCameraStatRef.current.target);
    } else {
      controls.target.set(0, 18, 0);
    }
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 0.65;
    if (grabGridMode) {
      controls.mouseButtons = {
        LEFT: THREE.MOUSE.PAN,
        MIDDLE: THREE.MOUSE.DOLLY,
        RIGHT: THREE.MOUSE.ROTATE,
      };
    } else {
      controls.mouseButtons = {
        LEFT: THREE.MOUSE.ROTATE,
        MIDDLE: THREE.MOUSE.DOLLY,
        RIGHT: THREE.MOUSE.PAN,
      };
    }
    controlsRef.current = controls;

    const preventWheelScroll = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };
    renderer.domElement.addEventListener('wheel', preventWheelScroll, { passive: false });

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.05);
    scene.add(ambientLight);
    const keyLight = new THREE.DirectionalLight(0xffe6a3, 1.45);
    keyLight.position.set(65, 140, 90);
    scene.add(keyLight);
    const fillLight = new THREE.DirectionalLight(0x9ca3af, 0.65);
    fillLight.position.set(-65, 70, -70);
    scene.add(fillLight);

    const beaconGeo = new THREE.RingGeometry(4.2, 5.2, 36);
    beaconGeo.rotateX(-Math.PI / 2);
    const beaconMat = new THREE.MeshBasicMaterial({
      color: 0xe5a93c,
      side: THREE.DoubleSide,
    });
    const beaconMesh = new THREE.Mesh(beaconGeo, beaconMat);
    beaconMesh.visible = false;
    scene.add(beaconMesh);
    focusRingMeshRef.current = beaconMesh;

    const disposableTextures: THREE.Texture[] = [];
    const pickableNodes: THREE.Object3D[] = [];
    const meshToNodeMap = new Map<THREE.Object3D, CodeNode>();
    const nodePositions = new Map<string, THREE.Vector3>();
    const fnTrueTipPositions = new Map<string, THREE.Vector3>();
    const fnFalseTipPositions = new Map<string, THREE.Vector3>();

    const animatedPulses: {
      mesh: THREE.Mesh;
      curve: THREE.Curve<THREE.Vector3>;
      speed: number;
      offset: number;
      edgeId: string;
    }[] = [];

    const activeFiles = filterFileId
      ? repository.files.filter((f) => f.id === filterFileId)
      : repository.files;

    // =========================================================================
    // MODE 1: VIRTUAL CODE 3D VIEW (Platforms widened by +30%)
    // =========================================================================
    if (render3DStyle === Render3DStyle.VIRTUAL_CODE) {
      const gridHelper = new THREE.GridHelper(480, 80, 0x24242c, 0x131318);
      gridHelper.position.y = -0.1;
      scene.add(gridHelper);

      // Root Folder Trapezoid Platform (+30% wider: 26 units wide instead of 20)
      const folderShape = new THREE.Shape();
      folderShape.moveTo(-13, -4);
      folderShape.lineTo(13, -4);
      folderShape.lineTo(10.4, 4);
      folderShape.lineTo(-10.4, 4);
      folderShape.closePath();

      const folderGeo = new THREE.ShapeGeometry(folderShape);
      folderGeo.rotateX(-Math.PI / 2);
      const folderMesh = new THREE.Mesh(
        folderGeo,
        new THREE.MeshBasicMaterial({
          color: 0x161920,
          transparent: true,
          opacity: 0.9,
          side: THREE.DoubleSide,
        })
      );
      folderMesh.position.set(0, 0.05, 56);
      scene.add(folderMesh);

      folderMesh.add(
        new THREE.LineSegments(
          new THREE.EdgesGeometry(folderGeo),
          new THREE.LineBasicMaterial({ color: 0xd4d4d8 })
        )
      );

      if (showLabels) {
        const rootLabel = createLabelSprite(
          'Project Root',
          `${activeFiles.length} Files`,
          '#E5A93C',
          13,
          3.2
        );
        rootLabel.position.set(0, 2.2, 58);
        scene.add(rootLabel);
      }

      // Avenue horizontal spacing scaled by +30% to accommodate the 30% wider platforms cleanly
      const AVENUE_SPACING_X = 31.2 * nodeDistanceScale;
      const AVENUE_SPACING_Z = 20 * nodeDistanceScale;

      activeFiles.forEach((file, fIdx) => {
        const clsNode = file.nodes.find((n) => n.kind === NodeKind.CLASS) || file.nodes[0];
        if (!clsNode) return;

        const lane = fIdx % 2 === 0 ? -1 : 1;
        const step = Math.floor(fIdx / 2);
        const xBase =
          activeFiles.length <= 5
            ? (fIdx - (activeFiles.length - 1) / 2) * AVENUE_SPACING_X
            : lane * (20.8 + step * 4.5) * nodeDistanceScale;
        const zBase =
          activeFiles.length <= 5
            ? (fIdx - (activeFiles.length - 1) / 2) * -14 * nodeDistanceScale
            : 34 - step * AVENUE_SPACING_Z;

        const filePos = new THREE.Vector3(xBase, 0.15, zBase);
        nodePositions.set(clsNode.id, new THREE.Vector3(xBase, 2.0, zBase));

        const stripGeo = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(0, 0.02, 52),
          new THREE.Vector3(xBase, 0.02, zBase),
        ]);
        scene.add(
          new THREE.Line(
            stripGeo,
            new THREE.LineBasicMaterial({ color: 0x3f3f46, transparent: true, opacity: 0.75 })
          )
        );

        // File Document Platform widened by +30% (14.3 width instead of 11.0)
        const docW = 14.3;
        const docH = 8.5;
        const fold = 2.2;
        const docShape = new THREE.Shape();
        docShape.moveTo(-docW / 2, -docH / 2);
        docShape.lineTo(docW / 2, -docH / 2);
        docShape.lineTo(docW / 2, docH / 2 - fold);
        docShape.lineTo(docW / 2 - fold, docH / 2);
        docShape.lineTo(-docW / 2, docH / 2);
        docShape.closePath();

        const docGeo = new THREE.ShapeGeometry(docShape);
        docGeo.rotateX(-Math.PI / 2);

        const docMesh = new THREE.Mesh(
          docGeo,
          new THREE.MeshBasicMaterial({
            color: 0x0d1017,
            transparent: true,
            opacity: 0.92,
            side: THREE.DoubleSide,
          })
        );
        docMesh.position.copy(filePos);
        scene.add(docMesh);

        docMesh.add(
          new THREE.LineSegments(
            new THREE.EdgesGeometry(docGeo),
            new THREE.LineBasicMaterial({ color: new THREE.Color(file.color) })
          )
        );

        pickableNodes.push(docMesh);
        meshToNodeMap.set(docMesh, clsNode);

        if (showLabels) {
          const fileTag = createLabelSprite(
            file.name,
            `${file.language} • ${file.nodes.length} nodes`,
            file.color,
            11.5,
            2.8
          );
          fileTag.position.set(xBase, 1.4, zBase + docH / 2 + 1.2);
          scene.add(fileTag);
        }

        const memberFunctions = file.nodes.filter(
          (n) => n.kind === NodeKind.FUNCTION || n.kind === NodeKind.RECURSION
        );

        const maxSpineHeight = 10 + memberFunctions.length * 14 * nodeDistanceScale;
        const spineGeo = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(xBase, 0.2, zBase),
          new THREE.Vector3(xBase, maxSpineHeight, zBase),
        ]);
        scene.add(
          new THREE.Line(
            spineGeo,
            new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.9 })
          )
        );

        memberFunctions.forEach((fnNode, fnIdx) => {
          const fnY = 7 + fnIdx * 13.5 * nodeDistanceScale;
          const fnAngle = fnIdx * 1.15 + fIdx * 0.5;
          const fnOffsetRadius = fnIdx === 0 ? 0 : 2.6 * nodeDistanceScale;
          const fnPos = new THREE.Vector3(
            xBase + Math.cos(fnAngle) * fnOffsetRadius,
            fnY,
            zBase + Math.sin(fnAngle) * fnOffsetRadius
          );
          const spineAnchor = new THREE.Vector3(xBase, fnY - 2.2, zBase);

          nodePositions.set(fnNode.id, fnPos);

          scene.add(
            new THREE.Line(
              new THREE.BufferGeometry().setFromPoints([spineAnchor, fnPos]),
              new THREE.LineBasicMaterial({ color: 0x38bdf8 })
            )
          );

          const diskRadius = Math.min(3.2, 1.55 + fnNode.childrenIds.length * 0.22);
          const diskTex = createVirtualDiskTexture(
            fnNode.symbolName,
            fnNode.isRecursive ? 'rgba(14, 116, 144, 0.85)' : 'rgba(20, 140, 160, 0.78)',
            fnNode.isRecursive ? '#38BDF8' : '#2DD4BF'
          );
          disposableTextures.push(diskTex);

          const fnDiskMesh = new THREE.Mesh(
            new THREE.CylinderGeometry(diskRadius, diskRadius, 0.16, 28),
            new THREE.MeshBasicMaterial({
              map: diskTex,
              transparent: true,
              opacity: 0.95,
            })
          );
          fnDiskMesh.position.copy(fnPos);
          scene.add(fnDiskMesh);

          pickableNodes.push(fnDiskMesh);
          meshToNodeMap.set(fnDiskMesh, fnNode);

          const childBranches = file.nodes.filter((b) => b.parentId === fnNode.id);
          fnTrueTipPositions.set(fnNode.id, fnPos.clone().add(new THREE.Vector3(-1.5, 2.5, 0)));
          fnFalseTipPositions.set(fnNode.id, fnPos.clone().add(new THREE.Vector3(1.5, 2.5, 0)));

          childBranches.forEach((brNode, bIdx) => {
            const isFalse = brNode.label.toLowerCase().startsWith('else');
            const isLoop = brNode.kind === NodeKind.LOOP;

            const brSpreadAngle =
              fnAngle + (isFalse ? 0.65 : -0.65) + (bIdx - (childBranches.length - 1) / 2) * 0.55;
            const brHorizDist = (3.4 + (bIdx % 2) * 1.4) * nodeDistanceScale;
            const brY = fnPos.y + (4.5 + bIdx * 3.2) * nodeDistanceScale;

            const brPos = new THREE.Vector3(
              fnPos.x + Math.cos(brSpreadAngle) * brHorizDist,
              brY,
              fnPos.z + Math.sin(brSpreadAngle) * brHorizDist
            );
            nodePositions.set(brNode.id, brPos);

            if (isFalse) {
              fnFalseTipPositions.set(fnNode.id, brPos);
              fnFalseTipPositions.set(brNode.id, brPos);
            } else {
              fnTrueTipPositions.set(fnNode.id, brPos);
              fnTrueTipPositions.set(brNode.id, brPos);
            }

            const brColorHex = isLoop ? 0x38bdf8 : isFalse ? 0xef4444 : 0x22c55e;
            scene.add(
              new THREE.Line(
                new THREE.BufferGeometry().setFromPoints([
                  fnPos,
                  new THREE.Vector3(brPos.x, fnPos.y + 1.2, brPos.z),
                  brPos,
                ]),
                new THREE.LineBasicMaterial({ color: brColorHex })
              )
            );

            const brDiskMesh = new THREE.Mesh(
              new THREE.CylinderGeometry(0.95, 0.95, 0.14, 22),
              new THREE.MeshBasicMaterial({
                color: brColorHex,
                transparent: true,
                opacity: 0.88,
              })
            );
            brDiskMesh.position.copy(brPos);
            scene.add(brDiskMesh);

            pickableNodes.push(brDiskMesh);
            meshToNodeMap.set(brDiskMesh, brNode);

            const subStatements = file.nodes.filter((s) => s.parentId === brNode.id);
            subStatements.forEach((stNode, sIdx) => {
              const stAngle = brSpreadAngle + (sIdx - (subStatements.length - 1) / 2) * 0.48;
              const stDist = 2.2 * nodeDistanceScale;
              const stY = brPos.y + (3.6 + sIdx * 2.8) * nodeDistanceScale;

              const stPos = new THREE.Vector3(
                brPos.x + Math.cos(stAngle) * stDist,
                stY,
                brPos.z + Math.sin(stAngle) * stDist
              );
              nodePositions.set(stNode.id, stPos);

              if (isFalse) {
                fnFalseTipPositions.set(stNode.id, stPos);
              } else {
                fnTrueTipPositions.set(stNode.id, stPos);
              }

              scene.add(
                new THREE.Line(
                  new THREE.BufferGeometry().setFromPoints([
                    brPos,
                    new THREE.Vector3(stPos.x, brPos.y + 0.8, stPos.z),
                    stPos,
                  ]),
                  new THREE.LineBasicMaterial({ color: isFalse ? 0xf87171 : 0xa855f7 })
                )
              );

              const stDiskMesh = new THREE.Mesh(
                new THREE.CylinderGeometry(0.62, 0.62, 0.12, 18),
                new THREE.MeshBasicMaterial({
                  color: isFalse ? 0xef4444 : 0xc084fc,
                  transparent: true,
                  opacity: 0.92,
                })
              );
              stDiskMesh.position.copy(stPos);
              scene.add(stDiskMesh);

              pickableNodes.push(stDiskMesh);
              meshToNodeMap.set(stDiskMesh, stNode);
            });
          });

          const hasLoop =
            fnNode.isRecursive || childBranches.some((b) => b.kind === NodeKind.LOOP);
          if (hasLoop) {
            const lp0 = fnPos.clone();
            const lp1 = fnPos.clone().add(new THREE.Vector3(0, 3.2, 0));
            const lp2 = fnPos.clone().add(new THREE.Vector3(3.6, 3.2, 0));
            const lp3 = fnPos.clone().add(new THREE.Vector3(3.6, 0, 0));

            const loopPath = new THREE.CurvePath<THREE.Vector3>();
            loopPath.add(new THREE.LineCurve3(lp0, lp1));
            loopPath.add(new THREE.LineCurve3(lp1, lp2));
            loopPath.add(new THREE.LineCurve3(lp2, lp3));
            loopPath.add(new THREE.LineCurve3(lp3, lp0));

            const loopMesh = new THREE.Mesh(
              new THREE.TubeGeometry(loopPath, 16, 0.12, 8, false),
              new THREE.MeshBasicMaterial({ color: 0x38bdf8 })
            );
            scene.add(loopMesh);

            const loopSq = createBlueLoopSquareSprite(4.2);
            loopSq.position.set(fnPos.x + 1.8, fnPos.y + 3.6, fnPos.z);
            scene.add(loopSq);
          }
        });
      });
    }

    // =========================================================================
    // MODE 2: DIE CODE CITY 3D
    // =========================================================================
    if (render3DStyle === Render3DStyle.CODE_CITY) {
      const gridHelper = new THREE.GridHelper(520, 80, 0x202028, 0x111116);
      gridHelper.position.y = -0.3;
      scene.add(gridHelper);

      const cols = Math.max(1, Math.ceil(Math.sqrt(activeFiles.length)));
      const rows = Math.max(1, Math.ceil(activeFiles.length / cols));

      const parcelData = activeFiles.map((file, idx) => {
        const functions = file.nodes.filter(
          (n) => n.kind === NodeKind.FUNCTION || n.kind === NodeKind.RECURSION
        );
        const bldgCount = Math.max(1, functions.length + 1);
        const bldgCols = Math.ceil(Math.sqrt(bldgCount));
        const parcelWidth = Math.max(22, bldgCols * 11 + 8);
        const parcelDepth = Math.max(20, bldgCols * 11 + 8);
        const col = idx % cols;
        const row = Math.floor(idx / cols);
        return {
          file,
          functions,
          bldgCols,
          parcelWidth,
          parcelDepth,
          col,
          row,
        };
      });

      const CITY_BLOCK_STEP = 44 * nodeDistanceScale;

      const districtWidth = cols * CITY_BLOCK_STEP + 20;
      const districtDepth = rows * CITY_BLOCK_STEP + 20;
      const districtGeo = new THREE.BoxGeometry(districtWidth, 0.7, districtDepth);
      const districtMat = new THREE.MeshStandardMaterial({
        color: 0x0d0f14,
        roughness: 0.9,
        metalness: 0.1,
      });
      const districtMesh = new THREE.Mesh(districtGeo, districtMat);
      districtMesh.position.set(0, -0.35, 0);
      scene.add(districtMesh);

      districtMesh.add(
        new THREE.LineSegments(
          new THREE.EdgesGeometry(districtGeo),
          new THREE.LineBasicMaterial({ color: 0x272730 })
        )
      );

      parcelData.forEach(({ file, functions, bldgCols, parcelWidth, parcelDepth, col, row }) => {
        const clsNode = file.nodes.find((n) => n.kind === NodeKind.CLASS) || file.nodes[0];
        if (!clsNode) return;

        const parcelCenterX = (col - (cols - 1) / 2) * CITY_BLOCK_STEP;
        const parcelCenterZ = (row - (rows - 1) / 2) * CITY_BLOCK_STEP;
        const fileThreeColor = new THREE.Color(file.color);

        const lotGeo = new THREE.BoxGeometry(parcelWidth, 0.65, parcelDepth);
        const lotMat = new THREE.MeshStandardMaterial({
          color: fileThreeColor,
          roughness: 0.65,
          metalness: 0.15,
          transparent: true,
          opacity: 0.34,
        });
        const lotMesh = new THREE.Mesh(lotGeo, lotMat);
        lotMesh.position.set(parcelCenterX, 0.35, parcelCenterZ);
        scene.add(lotMesh);

        const lotBorder = new THREE.LineSegments(
          new THREE.EdgesGeometry(lotGeo),
          new THREE.LineBasicMaterial({ color: fileThreeColor })
        );
        lotMesh.add(lotBorder);

        pickableNodes.push(lotMesh);
        meshToNodeMap.set(lotMesh, clsNode);

        if (showLabels) {
          const parcelSign = createLabelSprite(
            file.name,
            `${file.folder} • ${functions.length} Buildings`,
            file.color,
            14,
            3.5
          );
          parcelSign.position.set(parcelCenterX, 2.4, parcelCenterZ + parcelDepth / 2 + 2.2);
          scene.add(parcelSign);
        }

        const allBuildings = [clsNode, ...functions];

        allBuildings.forEach((bNode, bIdx) => {
          const bCol = bIdx % bldgCols;
          const bRow = Math.floor(bIdx / bldgCols);

          const localSpacing = 9.0;
          const bx =
            parcelCenterX + (bCol - (bldgCols - 1) / 2) * localSpacing;
          const bz =
            parcelCenterZ + (bRow - (Math.ceil(allBuildings.length / bldgCols) - 1) / 2) * localSpacing;

          const childBranches = file.nodes.filter((c) => c.parentId === bNode.id);
          const footprint =
            bNode.kind === NodeKind.CLASS
              ? Math.min(6.4, 3.6 + functions.length * 0.45)
              : Math.min(5.6, 2.6 + childBranches.length * 0.55 + bNode.callsIds.length * 0.3);

          const loc = Math.max(4, bNode.lineEnd - bNode.lineStart + 1);
          const towerHeight =
            bNode.kind === NodeKind.CLASS
              ? Math.min(36, 9 + loc * 0.25)
              : Math.min(44, 6 + loc * 0.85 + bNode.complexity * 1.4);

          const { hexNum: compHexNum, hexStr: compHexStr } = getComplexityFacadeHex(
            bNode.complexity,
            bNode.isRecursive
          );

          const facadeTex = createBuildingFacadeTexture(compHexStr);
          disposableTextures.push(facadeTex);

          const towerGeo = new THREE.BoxGeometry(footprint, towerHeight, footprint);
          const towerMat = new THREE.MeshStandardMaterial({
            map: facadeTex,
            roughness: 0.35,
            metalness: 0.3,
          });
          const towerMesh = new THREE.Mesh(towerGeo, towerMat);
          towerMesh.position.set(bx, 0.7 + towerHeight / 2, bz);
          scene.add(towerMesh);

          const towerWire = new THREE.LineSegments(
            new THREE.EdgesGeometry(towerGeo),
            new THREE.LineBasicMaterial({
              color: bNode.kind === NodeKind.CLASS ? fileThreeColor : compHexNum,
              transparent: true,
              opacity: 0.75,
            })
          );
          towerMesh.add(towerWire);

          pickableNodes.push(towerMesh);
          meshToNodeMap.set(towerMesh, bNode);

          const roofCenter = new THREE.Vector3(bx, 0.7 + towerHeight + 0.4, bz);
          nodePositions.set(bNode.id, roofCenter);

          const trueRoofPad = new THREE.Vector3(bx - footprint * 0.25, 0.7 + towerHeight + 0.4, bz);
          const falseRoofPad = new THREE.Vector3(bx + footprint * 0.25, 0.7 + towerHeight + 0.4, bz);
          fnTrueTipPositions.set(bNode.id, trueRoofPad);
          fnFalseTipPositions.set(bNode.id, falseRoofPad);

          childBranches.forEach((cb) => {
            const isFalse = cb.label.toLowerCase().startsWith('else');
            const padPos = isFalse ? falseRoofPad : trueRoofPad;
            nodePositions.set(cb.id, padPos);
            fnTrueTipPositions.set(cb.id, trueRoofPad);
            fnFalseTipPositions.set(cb.id, falseRoofPad);

            const subStmts = file.nodes.filter((s) => s.parentId === cb.id);
            subStmts.forEach((st) => {
              nodePositions.set(st.id, padPos);
              fnTrueTipPositions.set(st.id, trueRoofPad);
              fnFalseTipPositions.set(st.id, falseRoofPad);
            });
          });

          if (showLabels && bNode.kind !== NodeKind.CLASS) {
            const bldgLabel = createLabelSprite(
              bNode.symbolName,
              `${loc} LOC • Cplx ${bNode.complexity}`,
              compHexStr,
              9.5,
              2.3
            );
            bldgLabel.position.set(bx, 0.7 + towerHeight + 2.4, bz);
            scene.add(bldgLabel);
          }

          const hasLoop =
            bNode.isRecursive || childBranches.some((b) => b.kind === NodeKind.LOOP);
          if (hasLoop) {
            const lp0 = roofCenter.clone();
            const lp1 = roofCenter.clone().add(new THREE.Vector3(0, 3.4, 0));
            const lp2 = roofCenter.clone().add(new THREE.Vector3(3.4, 3.4, 0));
            const lp3 = roofCenter.clone().add(new THREE.Vector3(3.4, 0, 0));

            const loopPath = new THREE.CurvePath<THREE.Vector3>();
            loopPath.add(new THREE.LineCurve3(lp0, lp1));
            loopPath.add(new THREE.LineCurve3(lp1, lp2));
            loopPath.add(new THREE.LineCurve3(lp2, lp3));
            loopPath.add(new THREE.LineCurve3(lp3, lp0));

            const loopMesh = new THREE.Mesh(
              new THREE.TubeGeometry(loopPath, 16, 0.14, 8, false),
              new THREE.MeshBasicMaterial({ color: 0x38bdf8 })
            );
            scene.add(loopMesh);

            const loopSq = createBlueLoopSquareSprite(4.2);
            loopSq.position.set(roofCenter.x + 1.7, roofCenter.y + 3.8, roofCenter.z);
            scene.add(loopSq);
          }
        });
      });
    }

    // =========================================================================
    // MODE 3: 3D FORCE-DIRECTED GRAPH
    // =========================================================================
    if (render3DStyle === Render3DStyle.FORCE_GRAPH) {
      const ringGeo = new THREE.RingGeometry(68, 68.4, 64);
      ringGeo.rotateX(Math.PI / 2);
      const ringMesh = new THREE.Mesh(
        ringGeo,
        new THREE.MeshBasicMaterial({
          color: 0x1e2029,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.6,
        })
      );
      scene.add(ringMesh);

      const corePositions = new Map<string, THREE.Vector3>();
      const coreVelocities = new Map<string, THREE.Vector3>();

      activeFiles.forEach((file, idx) => {
        const phi = Math.acos(1 - (2 * (idx + 0.5)) / Math.max(1, activeFiles.length));
        const theta = Math.PI * (1 + Math.sqrt(5)) * idx;
        const r = 38 * nodeDistanceScale;
        corePositions.set(
          file.id,
          new THREE.Vector3(
            r * Math.sin(phi) * Math.cos(theta),
            r * Math.cos(phi) * 0.65 + 18,
            r * Math.sin(phi) * Math.sin(theta)
          )
        );
        coreVelocities.set(file.id, new THREE.Vector3());
      });

      const fileCouplingWeights = new Map<string, number>();
      repository.edges.forEach((edge) => {
        if (edge.kind === 'CROSS_FILE_CALL' || edge.kind === 'CLASS_DEPENDENCY') {
          const srcNode = repository.allNodes.find((n) => n.id === edge.sourceId);
          const tgtNode = repository.allNodes.find((n) => n.id === edge.targetId);
          if (srcNode && tgtNode && srcNode.fileId !== tgtNode.fileId) {
            const key = [srcNode.fileId, tgtNode.fileId].sort().join('::');
            fileCouplingWeights.set(key, (fileCouplingWeights.get(key) || 0) + 1);
          }
        }
      });

      for (let iter = 0; iter < 90; iter++) {
        for (let i = 0; i < activeFiles.length; i++) {
          for (let j = i + 1; j < activeFiles.length; j++) {
            const idA = activeFiles[i].id;
            const idB = activeFiles[j].id;
            const pA = corePositions.get(idA)!;
            const pB = corePositions.get(idB)!;
            const delta = new THREE.Vector3().subVectors(pA, pB);
            const dist = Math.max(4.0, delta.length());
            const repulseForce = (420 * nodeDistanceScale) / (dist * dist);
            delta.normalize().multiplyScalar(repulseForce);
            coreVelocities.get(idA)!.add(delta);
            coreVelocities.get(idB)!.sub(delta);
          }
        }

        fileCouplingWeights.forEach((weight, pairKey) => {
          const [idA, idB] = pairKey.split('::');
          const pA = corePositions.get(idA);
          const pB = corePositions.get(idB);
          if (!pA || !pB) return;
          const delta = new THREE.Vector3().subVectors(pB, pA);
          const dist = delta.length();
          const idealDist = 24 * nodeDistanceScale;
          const attractStrength = (dist - idealDist) * 0.035 * Math.min(4, weight);
          delta.normalize().multiplyScalar(attractStrength);
          coreVelocities.get(idA)!.add(delta);
          coreVelocities.get(idB)!.sub(delta);
        });

        const centerTarget = new THREE.Vector3(0, 20, 0);
        activeFiles.forEach((file) => {
          const pos = corePositions.get(file.id)!;
          const vel = coreVelocities.get(file.id)!;
          const toCenter = new THREE.Vector3().subVectors(centerTarget, pos).multiplyScalar(0.02);
          vel.add(toCenter);
          vel.multiplyScalar(0.65);
          pos.add(vel);
        });
      }

      activeFiles.forEach((file) => {
        const clsNode = file.nodes.find((n) => n.kind === NodeKind.CLASS) || file.nodes[0];
        if (!clsNode) return;

        const corePos = corePositions.get(file.id) || new THREE.Vector3(0, 20, 0);
        const fileColor = new THREE.Color(file.color);

        const functions = file.nodes.filter(
          (n) => n.kind === NodeKind.FUNCTION || n.kind === NodeKind.RECURSION
        );

        const totalIncomingToFile = file.nodes.reduce(
          (acc, n) => acc + n.calledByIds.length,
          0
        );
        const sunRadius = Math.min(
          5.2,
          2.2 + Math.sqrt(totalIncomingToFile) * 0.55 + functions.length * 0.18
        );

        const haloGeo = new THREE.SphereGeometry(sunRadius * 2.1, 24, 24);
        const haloMat = new THREE.MeshBasicMaterial({
          color: fileColor,
          transparent: true,
          opacity: 0.14,
          depthWrite: false,
        });
        const haloMesh = new THREE.Mesh(haloGeo, haloMat);
        haloMesh.position.copy(corePos);
        scene.add(haloMesh);

        const sunGeo = new THREE.SphereGeometry(sunRadius, 28, 28);
        const sunMat = new THREE.MeshStandardMaterial({
          color: fileColor,
          emissive: fileColor,
          emissiveIntensity: 0.55,
          roughness: 0.25,
        });
        const sunMesh = new THREE.Mesh(sunGeo, sunMat);
        sunMesh.position.copy(corePos);
        scene.add(sunMesh);

        pickableNodes.push(sunMesh);
        meshToNodeMap.set(sunMesh, clsNode);
        nodePositions.set(clsNode.id, corePos);
        fnTrueTipPositions.set(clsNode.id, corePos);
        fnFalseTipPositions.set(clsNode.id, corePos);

        if (showLabels) {
          const sunLabel = createLabelSprite(
            clsNode.symbolName,
            `${file.name} (${totalIncomingToFile} incoming links)`,
            file.color,
            13.5,
            3.3
          );
          sunLabel.position.set(corePos.x, corePos.y + sunRadius + 2.8, corePos.z);
          scene.add(sunLabel);
        }

        functions.forEach((fnNode, fnIdx) => {
          const childBranches = file.nodes.filter((b) => b.parentId === fnNode.id);

          const goldenPhi = Math.acos(1 - (2 * (fnIdx + 0.5)) / Math.max(1, functions.length));
          const goldenTheta = Math.PI * (1 + Math.sqrt(5)) * fnIdx;
          const orbitRadius = (sunRadius + 6.5 + (fnIdx % 2) * 2.5) * nodeDistanceScale;

          const moonPos = new THREE.Vector3(
            corePos.x + orbitRadius * Math.sin(goldenPhi) * Math.cos(goldenTheta),
            corePos.y + orbitRadius * Math.cos(goldenPhi),
            corePos.z + orbitRadius * Math.sin(goldenPhi) * Math.sin(goldenTheta)
          );

          const inDegree = fnNode.calledByIds.length + fnNode.callsIds.length * 0.4;
          const moonRadius = Math.min(2.4, 0.85 + Math.sqrt(inDegree) * 0.45);

          const springGeo = new THREE.BufferGeometry().setFromPoints([corePos, moonPos]);
          const springLine = new THREE.Line(
            springGeo,
            new THREE.LineBasicMaterial({
              color: fileColor,
              transparent: true,
              opacity: 0.35,
            })
          );
          scene.add(springLine);

          const moonGeo = new THREE.SphereGeometry(moonRadius, 20, 20);
          const moonMat = new THREE.MeshStandardMaterial({
            color: fileColor,
            emissive: fileColor,
            emissiveIntensity: 0.35 + Math.min(0.5, fnNode.calledByIds.length * 0.12),
            roughness: 0.3,
          });
          const moonMesh = new THREE.Mesh(moonGeo, moonMat);
          moonMesh.position.copy(moonPos);
          scene.add(moonMesh);

          pickableNodes.push(moonMesh);
          meshToNodeMap.set(moonMesh, fnNode);

          nodePositions.set(fnNode.id, moonPos);
          fnTrueTipPositions.set(fnNode.id, moonPos);
          fnFalseTipPositions.set(fnNode.id, moonPos);

          const hasLoop =
            fnNode.isRecursive || childBranches.some((b) => b.kind === NodeKind.LOOP);
          if (hasLoop) {
            const lp0 = moonPos.clone();
            const lp1 = moonPos.clone().add(new THREE.Vector3(0, 3.0, 0));
            const lp2 = moonPos.clone().add(new THREE.Vector3(3.0, 3.0, 0));
            const lp3 = moonPos.clone().add(new THREE.Vector3(3.0, 0, 0));

            const loopPath = new THREE.CurvePath<THREE.Vector3>();
            loopPath.add(new THREE.LineCurve3(lp0, lp1));
            loopPath.add(new THREE.LineCurve3(lp1, lp2));
            loopPath.add(new THREE.LineCurve3(lp2, lp3));
            loopPath.add(new THREE.LineCurve3(lp3, lp0));

            const loopMesh = new THREE.Mesh(
              new THREE.TubeGeometry(loopPath, 14, 0.11, 8, false),
              new THREE.MeshBasicMaterial({ color: 0x38bdf8 })
            );
            scene.add(loopMesh);

            const loopSq = createBlueLoopSquareSprite(3.6);
            loopSq.position.set(moonPos.x + 1.5, moonPos.y + 3.4, moonPos.z);
            scene.add(loopSq);
          }

          childBranches.forEach((cb, cbIdx) => {
            const subAngle = goldenTheta + (cbIdx - 0.5) * 0.9;
            const isFalse = cb.label.toLowerCase().startsWith('else');
            const subPos = new THREE.Vector3(
              moonPos.x + Math.cos(subAngle) * 3.0,
              moonPos.y + (isFalse ? -1.8 : 1.8),
              moonPos.z + Math.sin(subAngle) * 3.0
            );

            nodePositions.set(cb.id, subPos);
            if (isFalse) {
              fnFalseTipPositions.set(fnNode.id, subPos);
              fnFalseTipPositions.set(cb.id, subPos);
            } else {
              fnTrueTipPositions.set(fnNode.id, subPos);
              fnTrueTipPositions.set(cb.id, subPos);
            }

            scene.add(
              new THREE.Line(
                new THREE.BufferGeometry().setFromPoints([moonPos, subPos]),
                new THREE.LineBasicMaterial({
                  color: isFalse ? 0xef4444 : 0x22c55e,
                  transparent: true,
                  opacity: 0.55,
                })
              )
            );

            const subMoonMesh = new THREE.Mesh(
              new THREE.SphereGeometry(0.45, 14, 14),
              new THREE.MeshBasicMaterial({
                color: isFalse ? 0xef4444 : 0x22c55e,
              })
            );
            subMoonMesh.position.copy(subPos);
            scene.add(subMoonMesh);
            pickableNodes.push(subMoonMesh);
            meshToNodeMap.set(subMoonMesh, cb);

            const subStmts = file.nodes.filter((s) => s.parentId === cb.id);
            subStmts.forEach((st) => {
              nodePositions.set(st.id, subPos);
              fnTrueTipPositions.set(st.id, subPos);
              fnFalseTipPositions.set(st.id, subPos);
            });
          });

          if (showLabels) {
            const moonTag = createLabelSprite(
              fnNode.symbolName,
              `${fnNode.calledByIds.length} in • ${fnNode.callsIds.length} out`,
              file.color,
              8.8,
              2.1
            );
            moonTag.position.set(moonPos.x, moonPos.y + moonRadius + 1.5, moonPos.z);
            scene.add(moonTag);
          }
        });
      });
    }

    nodePositionsRef.current = nodePositions;

    // =========================================================================
    // INTER-FILE & INTRA-FILE 3D CALL CONNECTIONS + FLOWING LIGHT PULSES
    // =========================================================================
    interface InteractiveEdgeGroup {
      id: string;
      rawEdge: GraphEdge;
      label: string;
      hitTube: THREE.Mesh;
      normalTube: THREE.Mesh;
      highlightTube: THREE.Mesh;
      arrowCones: THREE.Mesh[];
      pulseMeshes: THREE.Mesh[];
      defaultColor: number;
      sourceNode?: CodeNode;
      targetNode?: CodeNode;
    }

    const edgeGroups: InteractiveEdgeGroup[] = [];
    const pickableEdgeTubes: THREE.Object3D[] = [];
    const tubeToEdgeGroup = new Map<THREE.Object3D, InteractiveEdgeGroup>();

    const relevantEdges = repository.edges.filter((edge) => {
      if (graphFocusMode === GraphFocusMode.CLASSES) {
        return edge.kind === 'CLASS_DEPENDENCY';
      }
      return edge.kind === 'CROSS_FILE_CALL' || edge.kind === 'INTERNAL_CALL';
    });

    relevantEdges.forEach((edge, eIdx) => {
      const isFalseCall = edge.branchOutcome === 'FALSE';

      const p1 =
        (isFalseCall
          ? fnFalseTipPositions.get(edge.sourceId)
          : fnTrueTipPositions.get(edge.sourceId)) || nodePositions.get(edge.sourceId);
      const p2 = nodePositions.get(edge.targetId);
      if (!p1 || !p2) return;

      const dist = p1.distanceTo(p2);
      if (dist < 0.1) return;

      const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
      if (render3DStyle === Render3DStyle.FORCE_GRAPH) {
        mid.y += (isFalseCall ? -3.5 : 3.5) + (eIdx % 3) * 1.2;
      } else {
        mid.y +=
          (edge.kind === 'CROSS_FILE_CALL' || edge.kind === 'CLASS_DEPENDENCY'
            ? 12 + dist * 0.16
            : 5.5) +
          (isFalseCall ? -2.0 : 2.0) +
          (eIdx % 3) * 0.6;
      }

      const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2);
      const defaultColor = isFalseCall ? 0xef4444 : 0x22c55e;

      const normalGeo = new THREE.TubeGeometry(curve, 32, 0.13, 8, false);
      const normalMat = new THREE.MeshBasicMaterial({
        color: defaultColor,
        transparent: true,
        opacity: render3DStyle === Render3DStyle.FORCE_GRAPH ? 0.65 : 0.85,
      });
      const normalTube = new THREE.Mesh(normalGeo, normalMat);
      scene.add(normalTube);

      const highlightGeo = new THREE.TubeGeometry(curve, 32, 0.4, 10, false);
      const highlightMat = new THREE.MeshBasicMaterial({
        color: defaultColor,
      });
      const highlightTube = new THREE.Mesh(highlightGeo, highlightMat);
      highlightTube.visible = false;
      scene.add(highlightTube);

      const hitGeo = new THREE.TubeGeometry(curve, 18, 1.5, 6, false);
      const hitMat = new THREE.MeshBasicMaterial({ visible: false });
      const hitTube = new THREE.Mesh(hitGeo, hitMat);
      scene.add(hitTube);

      const arrowCount = Math.max(2, Math.min(6, Math.floor(dist / 12)));
      const arrowCones: THREE.Mesh[] = [];

      for (let i = 1; i <= arrowCount; i++) {
        const t = i / (arrowCount + 1);
        const pos = curve.getPointAt(t);
        const tangent = curve.getTangentAt(t).normalize();

        const coneGeo = new THREE.ConeGeometry(0.42, 1.25, 8);
        coneGeo.rotateX(Math.PI / 2);
        const coneMat = new THREE.MeshBasicMaterial({ color: defaultColor });
        const coneMesh = new THREE.Mesh(coneGeo, coneMat);
        coneMesh.position.copy(pos);
        coneMesh.lookAt(pos.clone().add(tangent));
        scene.add(coneMesh);
        arrowCones.push(coneMesh);
      }

      const pulseMeshes: THREE.Mesh[] = [];
      const pulseCount = render3DStyle === Render3DStyle.FORCE_GRAPH ? 2 : 1;
      for (let pIdx = 0; pIdx < pulseCount; pIdx++) {
        const pulseGeo = new THREE.SphereGeometry(0.42, 10, 10);
        const pulseMat = new THREE.MeshBasicMaterial({
          color: isFalseCall ? 0xfca5a5 : 0xfef08a,
        });
        const pulseMesh = new THREE.Mesh(pulseGeo, pulseMat);
        scene.add(pulseMesh);
        pulseMeshes.push(pulseMesh);

        animatedPulses.push({
          mesh: pulseMesh,
          curve,
          speed: 0.0045 + (eIdx % 4) * 0.0008,
          offset: pIdx * 0.5 + (eIdx * 0.13) % 1,
          edgeId: edge.id,
        });
      }

      const srcNode = repository.allNodes.find((n) => n.id === edge.sourceId);
      const tgtNode = repository.allNodes.find((n) => n.id === edge.targetId);
      const outcomeTag = isFalseCall ? `FALSE l${edge.callLine}` : `TRUE l${edge.callLine}`;

      const groupObj: InteractiveEdgeGroup = {
        id: edge.id,
        rawEdge: edge,
        label: `${srcNode?.symbolName || 'Caller'} [${outcomeTag}] → ${tgtNode?.symbolName || 'Callee'}`,
        hitTube,
        normalTube,
        highlightTube,
        arrowCones,
        pulseMeshes,
        defaultColor,
        sourceNode: srcNode,
        targetNode: tgtNode,
      };

      edgeGroups.push(groupObj);
      pickableEdgeTubes.push(hitTube);
      tubeToEdgeGroup.set(hitTube, groupObj);
    });

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let downPos = { x: 0, y: 0 };
    let currentlyHoveredEdge: InteractiveEdgeGroup | null = null;

    const restoreAllEdgesVisibility = () => {
      if (!currentlyHoveredEdge) return;
      edgeGroups.forEach((grp) => {
        grp.normalTube.visible = true;
        grp.highlightTube.visible = false;
        grp.arrowCones.forEach((cone) => {
          cone.visible = true;
          (cone.material as THREE.MeshBasicMaterial).color.setHex(grp.defaultColor);
          cone.scale.set(1, 1, 1);
        });
        grp.pulseMeshes.forEach((pm) => {
          pm.visible = true;
        });
      });
      currentlyHoveredEdge = null;
      callbacksRef.current.onHoverEdge(null);
    };

    const isolateHoveredEdge = (activeGroup: InteractiveEdgeGroup) => {
      currentlyHoveredEdge = activeGroup;
      callbacksRef.current.onHoverEdge(activeGroup.rawEdge);
      edgeGroups.forEach((grp) => {
        if (grp.id === activeGroup.id) {
          grp.normalTube.visible = false;
          grp.highlightTube.visible = true;
          grp.arrowCones.forEach((cone) => {
            cone.visible = true;
            (cone.material as THREE.MeshBasicMaterial).color.setHex(0xffffff);
            cone.scale.set(1.4, 1.4, 1.4);
          });
          grp.pulseMeshes.forEach((pm) => {
            pm.visible = true;
          });
        } else {
          grp.normalTube.visible = false;
          grp.highlightTube.visible = false;
          grp.arrowCones.forEach((cone) => {
            cone.visible = false;
          });
          grp.pulseMeshes.forEach((pm) => {
            pm.visible = false;
          });
        }
      });
    };

    const handleMouseDown = (e: MouseEvent) => {
      downPos = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(pointer, camera);

      const edgeHits = raycaster.intersectObjects(pickableEdgeTubes, false);
      if (edgeHits.length > 0) {
        const hitGroup = tubeToEdgeGroup.get(edgeHits[0].object);
        if (hitGroup) {
          if (currentlyHoveredEdge !== hitGroup) {
            isolateHoveredEdge(hitGroup);
          }
          renderer.domElement.style.cursor = 'pointer';
          setCursorTip({
            title: hitGroup.label,
            subtitle: `${hitGroup.sourceNode?.fileName || ''} (Line ${hitGroup.rawEdge.callLine}) → ${
              hitGroup.targetNode?.fileName || ''
            }`,
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
          });
          return;
        }
      }

      const nodeHits = raycaster.intersectObjects(pickableNodes, false);
      if (nodeHits.length > 0) {
        restoreAllEdgesVisibility();
        const hitNode = meshToNodeMap.get(nodeHits[0].object);
        if (hitNode) {
          renderer.domElement.style.cursor = 'pointer';
          callbacksRef.current.onHoverNode(hitNode);
          const loc = Math.max(1, hitNode.lineEnd - hitNode.lineStart + 1);
          setCursorTip({
            title: `${hitNode.className} :: ${hitNode.label}`,
            subtitle: `${hitNode.fileName} (File Line ${hitNode.lineStart} • ${loc} LOC • Cplx ${hitNode.complexity})`,
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
          });
          return;
        }
      }

      restoreAllEdgesVisibility();
      renderer.domElement.style.cursor = 'grab';
      setCursorTip(null);
    };

    const handleMouseUp = (e: MouseEvent) => {
      savedCameraStatRef.current = {
        pos: camera.position.clone(),
        target: controls.target.clone(),
      };

      if (Math.hypot(e.clientX - downPos.x, e.clientY - downPos.y) > 6) return;
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(pickableNodes, false);
      if (hits.length > 0) {
        const hitNode = meshToNodeMap.get(hits[0].object);
        if (hitNode) {
          callbacksRef.current.onSelectNode(hitNode);
        }
      }
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', handleMouseDown);
    domElement.addEventListener('mousemove', handleMouseMove);
    domElement.addEventListener('mouseup', handleMouseUp);

    let frameId: number;
    let tick = 0;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      tick += 1;

      for (let i = 0; i < animatedPulses.length; i++) {
        const p = animatedPulses[i];
        if (!p.mesh.visible) continue;
        const t = (p.offset + tick * p.speed) % 1;
        const pt = p.curve.getPointAt(t);
        p.mesh.position.copy(pt);
      }

      if (focusRingMeshRef.current && focusRingMeshRef.current.visible) {
        const s = 1 + Math.sin(tick * 0.08) * 0.18;
        focusRingMeshRef.current.scale.set(s, s, s);
      }

      if (controlsRef.current) {
        controlsRef.current.update();
      }
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w > 0 && h > 0) {
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
    };
    window.addEventListener('resize', handleResize);

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        handleResize();
      });
      resizeObserver.observe(container);
    }

    return () => {
      savedCameraStatRef.current = {
        pos: camera.position.clone(),
        target: controls.target.clone(),
      };
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      domElement.removeEventListener('wheel', preventWheelScroll);
      domElement.removeEventListener('mousedown', handleMouseDown);
      domElement.removeEventListener('mousemove', handleMouseMove);
      domElement.removeEventListener('mouseup', handleMouseUp);
      disposableTextures.forEach((t) => t.dispose());
      renderer.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [repository, graphFocusMode, filterFileId, render3DStyle, showLabels, nodeDistanceScale]);

  const handleReset = () => {
    if (cameraRef.current && controlsRef.current) {
      cameraRef.current.position.set(0, 76, 152);
      controlsRef.current.target.set(0, 18, 0);
      controlsRef.current.update();
      savedCameraStatRef.current = {
        pos: cameraRef.current.position.clone(),
        target: controlsRef.current.target.clone(),
      };
    }
  };

  const handleZoom = (delta: number) => {
    if (cameraRef.current && controlsRef.current) {
      const dir = new THREE.Vector3();
      cameraRef.current.getWorldDirection(dir);
      cameraRef.current.position.addScaledVector(dir, delta);
      controlsRef.current.update();
    }
  };

  const handleScreenSpacePan = (dx: number, dy: number) => {
    const cam = cameraRef.current;
    const ctrl = controlsRef.current;
    if (!cam || !ctrl) return;

    const right = new THREE.Vector3();
    const up = new THREE.Vector3();
    cam.matrix.extractBasis(right, up, new THREE.Vector3());

    const offset = new THREE.Vector3()
      .addScaledVector(right, dx)
      .addScaledVector(up, dy);

    cam.position.add(offset);
    ctrl.target.add(offset);
    ctrl.update();
    savedCameraStatRef.current = {
      pos: cam.position.clone(),
      target: ctrl.target.clone(),
    };
  };

  const handleSelectAndFocus3DNode = (node: CodeNode) => {
    onSearchFocusNode(node);

    window.setTimeout(() => {
      const pos = nodePositionsRef.current.get(node.id);
      const cam = cameraRef.current;
      const ctrl = controlsRef.current;
      if (pos && cam && ctrl) {
        ctrl.target.copy(pos);
        cam.position.set(pos.x, pos.y + 22, pos.z + 42);
        ctrl.update();
        savedCameraStatRef.current = {
          pos: cam.position.clone(),
          target: ctrl.target.clone(),
        };
        if (focusRingMeshRef.current) {
          focusRingMeshRef.current.position.set(pos.x, pos.y + 0.5, pos.z);
          focusRingMeshRef.current.visible = true;
        }
      }
    }, 60);
  };

  const handleExport3DScreenshot = () => {
    if (!rendererRef.current || !sceneRef.current || !cameraRef.current) return;
    rendererRef.current.render(sceneRef.current, cameraRef.current);
    const dataUrl = rendererRef.current.domElement.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `LCV-3D-${render3DStyle}-${graphFocusMode}-${Date.now()}.png`;
    a.click();
  };

  return (
    <div className="relative w-full h-full bg-[#070709] overflow-hidden">
      <div ref={mountRef} className="w-full h-full" />

      {/* Top-Left 3D Mode Switcher: Code City 3D | 3D Force-Graph | Virtual Code 3D */}
      <div className="absolute top-3 left-3 z-20 flex flex-wrap items-center gap-2 bg-[#0D0D12]/95 border border-zinc-800 p-1.5 rounded text-xs font-sans shadow-xl">
        <button
          type="button"
          onClick={() => onChangeRender3DStyle(Render3DStyle.CODE_CITY)}
          className={`px-3 py-1 rounded flex items-center gap-1.5 font-semibold transition ${
            render3DStyle === Render3DStyle.CODE_CITY
              ? 'bg-[#231B0E] border border-[#E5A93C] text-[#F7D794]'
              : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200'
          }`}
          title="URL Parameter: ?Code-City"
        >
          <Building2 className="w-3.5 h-3.5 text-[#E5A93C]" />
          <span>Code City 3D</span>
        </button>

        <button
          type="button"
          onClick={() => onChangeRender3DStyle(Render3DStyle.FORCE_GRAPH)}
          className={`px-3 py-1 rounded flex items-center gap-1.5 font-semibold transition ${
            render3DStyle === Render3DStyle.FORCE_GRAPH
              ? 'bg-[#231B0E] border border-[#E5A93C] text-[#F7D794]'
              : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200'
          }`}
          title="URL Parameter: ?3DForce-Graph"
        >
          <Network className="w-3.5 h-3.5 text-[#2DD4BF]" />
          <span>3D Force-Graph</span>
        </button>

        <button
          type="button"
          onClick={() => onChangeRender3DStyle(Render3DStyle.VIRTUAL_CODE)}
          className={`px-3 py-1 rounded flex items-center gap-1.5 font-semibold transition ${
            render3DStyle === Render3DStyle.VIRTUAL_CODE
              ? 'bg-[#231B0E] border border-[#E5A93C] text-[#F7D794]'
              : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200'
          }`}
          title="URL Parameter: ?Virtual-Code-3D"
        >
          <Cpu className="w-3.5 h-3.5 text-[#38BDF8]" />
          <span>Virtual Code 3D</span>
        </button>

        {/* Contextual Legend per 3D Mode */}
        <div className="hidden xl:flex items-center gap-3 pl-2 border-l border-zinc-800 text-[11px] pr-2">
          {render3DStyle === Render3DStyle.CODE_CITY && (
            <span className="text-zinc-300">
              <strong className="text-[#F7D794]">Colored Lot:</strong> File Parcel •{' '}
              <strong className="text-sky-300">Tower Height:</strong> LOC •{' '}
              <strong className="text-amber-400">Facade:</strong> Complexity
            </span>
          )}
          {render3DStyle === Render3DStyle.FORCE_GRAPH && (
            <span className="text-zinc-300">
              <strong className="text-[#F7D794]">Glowing Sun:</strong> File Core •{' '}
              <strong className="text-sky-300">Moons:</strong> Functions •{' '}
              <strong className="text-emerald-400">Pulses:</strong> Data Flow
            </span>
          )}
          {render3DStyle === Render3DStyle.VIRTUAL_CODE && (
            <span className="text-zinc-300">
              <strong className="text-[#F7D794]">Vertical Spine:</strong> File (+30% Wide Plate) •{' '}
              <strong className="text-sky-300">2D Disks:</strong> Functions
            </span>
          )}
          <span className="flex items-center gap-1 text-sky-300 font-semibold">
            <span className="px-1.5 py-0.2 bg-[#0284C7] border border-sky-300 text-white font-mono text-[9.5px] font-bold">
              LOOP
            </span>
          </span>
        </div>
      </div>

      {/* Top-Right Compact 3D Node Display Controls */}
      <div className="absolute top-3 right-3 z-20 flex items-center gap-2 bg-[#0D0D12]/95 border border-zinc-800 px-3 py-1.5 rounded text-xs font-sans shadow-xl">
        <button
          type="button"
          onClick={() => setShowLabels(!showLabels)}
          className={`px-2 py-0.5 rounded flex items-center gap-1 text-[11px] font-medium transition ${
            showLabels
              ? 'bg-[#231B0E] border border-[#E5A93C]/60 text-[#F7D794]'
              : 'bg-zinc-900 text-zinc-400'
          }`}
        >
          <Tag className="w-3 h-3 text-[#E5A93C]" />
          <span>Labels: {showLabels ? 'Show' : 'Hide'}</span>
        </button>

        <div className="flex items-center gap-1.5 border-l border-zinc-800 pl-2 text-[11px] text-zinc-400">
          <span>Spacing:</span>
          <input
            type="range"
            min={0.6}
            max={1.8}
            step={0.1}
            value={nodeDistanceScale}
            onChange={(e) => setNodeDistanceScale(Number(e.target.value))}
            className="w-20 accent-[#E5A93C] cursor-pointer"
          />
        </div>
      </div>

      {/* Bottom-Left Bar: Search Function/Class Autocomplete + Grab Grid (Pan L/R/U/D) + 3D Controls */}
      <div className="absolute bottom-3 left-3 z-30 flex flex-wrap items-center gap-1.5 bg-[#0E0E13]/95 border border-zinc-800 rounded p-1.5 shadow-2xl">
        <NodeSearchBox
          allNodes={repository.allNodes}
          onSelectFocusNode={handleSelectAndFocus3DNode}
        />

        <button
          type="button"
          onClick={() => setGrabGridMode(!grabGridMode)}
          className={`px-2.5 py-1 rounded text-xs font-sans font-semibold flex items-center gap-1.5 transition border ${
            grabGridMode
              ? 'bg-[#231B0E] border-[#E5A93C] text-[#F7D794]'
              : 'bg-zinc-900 border-zinc-700 text-zinc-300 hover:bg-zinc-800'
          }`}
          title={
            grabGridMode
              ? 'Grab Grid Active: Left-Click Drag pans Left/Right/Up/Down (Right-Click Drag rotates)'
              : 'Orbit Active: Left-Click Drag rotates (Right-Click Drag pans)'
          }
        >
          <Hand className="w-3.5 h-3.5 text-[#E5A93C]" />
          <span>{grabGridMode ? 'Grab Grid (L/R/U/D)' : 'Rotate Mode'}</span>
        </button>

        <div className="flex items-center gap-0.5 border-l border-r border-zinc-800 px-1">
          <button
            type="button"
            onClick={() => handleScreenSpacePan(-14, 0)}
            className="p-1 rounded text-zinc-300 hover:text-[#F7D794] hover:bg-[#231B0E] transition"
            title="Pan Scene Left"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => handleScreenSpacePan(0, 14)}
            className="p-1 rounded text-zinc-300 hover:text-[#F7D794] hover:bg-[#231B0E] transition"
            title="Pan Scene Up"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => handleScreenSpacePan(0, -14)}
            className="p-1 rounded text-zinc-300 hover:text-[#F7D794] hover:bg-[#231B0E] transition"
            title="Pan Scene Down"
          >
            <ArrowDown className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => handleScreenSpacePan(14, 0)}
            className="p-1 rounded text-zinc-300 hover:text-[#F7D794] hover:bg-[#231B0E] transition"
            title="Pan Scene Right"
          >
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <button
          type="button"
          onClick={() => handleZoom(16)}
          className="p-1.5 rounded text-zinc-300 hover:text-[#F7D794] hover:bg-[#231B0E] transition"
          title="Zoom In"
        >
          <ZoomIn className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => handleZoom(-16)}
          className="p-1.5 rounded text-zinc-300 hover:text-[#F7D794] hover:bg-[#231B0E] transition"
          title="Zoom Out"
        >
          <ZoomOut className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => setAutoRotate(!autoRotate)}
          className={`px-2 py-1 rounded text-xs font-sans font-medium flex items-center gap-1 transition ${
            autoRotate
              ? 'bg-[#231B0E] border border-[#E5A93C] text-[#F7D794] font-semibold'
              : 'text-zinc-300 hover:bg-zinc-800'
          }`}
        >
          <Compass className="w-3.5 h-3.5 text-[#E5A93C]" />
          <span>Auto-Orbit</span>
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="p-1.5 rounded text-zinc-300 hover:text-[#F7D794] hover:bg-[#231B0E] transition"
          title="Reset Camera"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={handleExport3DScreenshot}
          className="px-2.5 py-1 rounded bg-[#231B0E] hover:bg-[#2F2412] border border-[#E5A93C]/80 text-[#F7D794] font-sans text-xs font-semibold flex items-center gap-1.5 transition"
          title="Export 3D Graph as PNG Screenshot"
        >
          <Camera className="w-3.5 h-3.5 text-[#E5A93C]" />
          <span>Export 3D PNG</span>
        </button>
      </div>

      {/* Floating Cursor Tooltip */}
      {cursorTip && (
        <div
          className="pointer-events-none absolute z-30 bg-[#0D0D12] border-l-4 border-[#E5A93C] border-t border-r border-b border-zinc-800 px-3 py-1.5 rounded shadow-2xl transform -translate-x-1/2 -translate-y-full -mt-3"
          style={{ left: cursorTip.x, top: cursorTip.y }}
        >
          <div className="font-mono text-xs font-semibold text-[#F7D794]">{cursorTip.title}</div>
          <div className="font-sans text-[11px] text-zinc-400">{cursorTip.subtitle}</div>
        </div>
      )}
    </div>
  );
};
