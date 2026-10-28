import React, { useState } from 'react';
import { WalkingFoxLogo } from './WalkingFoxLogo';
import {
  X,
  ChevronRight,
  ChevronLeft,
  FileArchive,
  Code2,
  Sliders,
  MousePointerClick,
  CheckCircle2,
  Link2,
} from 'lucide-react';

interface InteractiveGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface GuideStep {
  badge: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  bullets: { title: string; desc: string }[];
}

const GUIDE_STEPS: GuideStep[] = [
  {
    badge: 'STEP 1 OF 5 • ARCHIVES & DIRECT CODE',
    title: 'Supports .ZIP, .RAR, .7Z (7-Zip) & Direct Source Code',
    subtitle:
      'Analyze entire multi-file projects from compressed archives, local source files, or remote GitHub / Google Drive URLs.',
    icon: <FileArchive className="w-6 h-6 text-[#E5A93C]" />,
    bullets: [
      {
        title: '.ZIP, .RAR & .7Z (7-Zip) Archives',
        desc: 'Drag and drop any .zip, .rar, or .7z archive onto the window or click the "ZIP/RAR/7Z" upload button.',
      },
      {
        title: 'Direct Source Code Files',
        desc: 'Select individual or multiple source code files directly from your computer without zipping them first.',
      },
      {
        title: 'GitHub & Google Drive URLs (?load=)',
        desc: 'Paste any GitHub repo or archive link (default: https://github.com/boykopovar/AnyPS5) or pass ?load=<URL> in the browser address bar.',
      },
    ],
  },
  {
    badge: 'STEP 2 OF 5 • SUPPORTED LANGUAGES',
    title: 'Language-Independent 3-Tier AST & Call Graph Engine',
    subtitle:
      'Translates OOP, procedural, and functional codebases into a unified model: Container → File → Structure Block → Logic Unit.',
    icon: <Code2 className="w-6 h-6 text-[#E5A93C]" />,
    bullets: [
      {
        title: 'C & C++ (.c, .cpp, .h, .hpp)',
        desc: 'Full support for structs, classes, pointers, and low-level system call hierarchies.',
      },
      {
        title: 'C# & Java (.cs, .java)',
        desc: 'Visualizes MonoBehaviour scripts, namespaces, packages, and object-oriented method dependencies.',
      },
      {
        title: 'Python, Rust & JavaScript / TypeScript (.py, .rs, .js, .ts)',
        desc: 'Parses def/fn/function blocks, async routines, and cross-module imports with color-coded IDE syntax highlighting on the right panel.',
      },
    ],
  },
  {
    badge: 'STEP 3 OF 5 • 2D & THREE 3D VISUALIZATION MODES',
    title: 'Code City 3D, 3D Force-Graph & Virtual Code 3D',
    subtitle:
      'Switch between 2D and 3D anytime, and pick from three specialized 3D engines in the top-left 3D bar.',
    icon: <Sliders className="w-6 h-6 text-[#E5A93C]" />,
    bullets: [
      {
        title: 'Code City 3D (Structure, Size & Complexity)',
        desc: 'Each File is a colored land parcel. Classes & functions rise as skyscrapers where footprint = method count, height = Lines of Code, facade glow = complexity, and sky arcs = calls.',
      },
      {
        title: '3D Force-Graph (Solar System & True Coupling)',
        desc: 'Weightless 3D physics network: Files form glowing Suns (same color as their City parcel) while functions orbit as Moons scaled by incoming call importance, with flowing light pulses.',
      },
      {
        title: 'Virtual Code 3D (Vertical File Spines & 2D Disks)',
        desc: 'Each file sits on a floor document plate with a vertical spine and branching 2D node disks rising upward.',
      },
    ],
  },
  {
    badge: 'STEP 4 OF 5 • SEARCH, GRAB GRID & COMMENTS',
    title: 'Autocomplete Search, 3D Grid Grabbing & Comment Boxes',
    subtitle:
      'Find any Function or Class in seconds and navigate smoothly in both 2D and 3D.',
    icon: <MousePointerClick className="w-6 h-6 text-[#E5A93C]" />,
    bullets: [
      {
        title: 'Bottom-Left Function & Class Autocomplete Search',
        desc: 'Type in the bottom-left search bar to get live suggestions for all Functions and Classes. Selecting one immediately flies the 2D or 3D camera to focus it.',
      },
      {
        title: '3D Grab Grid (Pan Left / Right / Up / Down)',
        desc: 'In 3D mode, "Grab Grid (L/R/U/D)" lets you drag the grid with the left mouse button to pan Left, Right, Up, and Down (and Right-Click drag to rotate).',
      },
      {
        title: 'Right-Click Comment Boxes & DEL (Entf) Key',
        desc: 'Right-click in 2D to create resizable comment boxes, and press DEL (Entf) or right-click to delete them.',
      },
    ],
  },
  {
    badge: 'STEP 5 OF 5 • ALL URL PARAMETERS REFERENCE',
    title: 'Direct Deep-Linking via URL Parameters',
    subtitle:
      'Append any of these parameters to your URL to launch directly into a specific 2D/3D view or repository:',
    icon: <Link2 className="w-6 h-6 text-[#E5A93C]" />,
    bullets: [
      {
        title: '?Code-City  |  ?3DForce-Graph  |  ?Virtual-Code-3D',
        desc: 'Immediately opens the 3D visualizer in Code City 3D (?Code-City), 3D Force-Directed Solar Graph (?3DForce-Graph), or Virtual Code 3D (?Virtual-Code-3D).',
      },
      {
        title: '?V=2D  |  ?V=3D',
        desc: 'Launches the application directly in the 2D Electronic Circuit Graph (?V=2D) or 3D mode (?V=3D).',
      },
      {
        title: '?load=<GitHub-or-Drive-URL>',
        desc: 'Automatically fetches and visualizes an external repository or .7z/.zip/.rar archive (e.g. ?Code-City&load=https://github.com/boykopovar/AnyPS5).',
      },
    ],
  },
];

export const InteractiveGuideModal: React.FC<InteractiveGuideModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [stepIdx, setStepIdx] = useState<number>(0);

  if (!isOpen) return null;

  const current = GUIDE_STEPS[stepIdx];
  const isLastStep = stepIdx === GUIDE_STEPS.length - 1;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 select-none">
      <div className="bg-[#0E0E13] border border-[#E5A93C]/70 rounded-lg max-w-xl w-full shadow-[0_0_50px_rgba(0,0,0,0.95)] flex flex-col overflow-hidden">
        {/* Top Bar with Fox Logo & Instant Close Button */}
        <div className="px-5 py-3.5 bg-[#14141B] border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <WalkingFoxLogo className="w-8 h-5" />
            <span className="font-sans text-xs font-bold uppercase tracking-wider text-[#F7D794]">
              LCV Interactive Guide
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-sans text-xs font-semibold flex items-center gap-1 transition"
            title="Close Guide Anytime"
          >
            <span>Close Guide</span>
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Step Body */}
        <div className="p-6 space-y-5">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="font-sans text-[11px] font-semibold uppercase tracking-wider text-[#E5A93C]">
                {current.badge}
              </div>
              <h2 className="font-sans font-bold text-xl text-zinc-100">
                {current.title}
              </h2>
              <p className="text-xs font-sans text-zinc-400 leading-relaxed">
                {current.subtitle}
              </p>
            </div>
            <div className="p-3 rounded bg-[#16161F] border border-[#E5A93C]/40 shrink-0">
              {current.icon}
            </div>
          </div>

          <div className="space-y-2.5">
            {current.bullets.map((b, i) => (
              <div
                key={i}
                className="p-3 rounded bg-[#13131A] border-l-4 border-[#E5A93C] border-t border-r border-b border-zinc-800/90 space-y-1"
              >
                <div className="font-sans text-xs font-semibold text-zinc-100 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#E5A93C] shrink-0" />
                  <span>{b.title}</span>
                </div>
                <p className="text-xs font-sans text-zinc-300 pl-5 leading-relaxed">
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Navigation with Step Dots, Previous, Next & Finish */}
        <div className="px-5 py-3.5 bg-[#14141B] border-t border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {GUIDE_STEPS.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setStepIdx(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === stepIdx ? 'w-6 bg-[#E5A93C]' : 'w-2 bg-zinc-700 hover:bg-zinc-500'
                }`}
                title={`Go to Step ${idx + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            {stepIdx > 0 && (
              <button
                type="button"
                onClick={() => setStepIdx((s) => s - 1)}
                className="px-3 py-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-sans text-xs font-semibold flex items-center gap-1 transition"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            )}

            {!isLastStep ? (
              <button
                type="button"
                onClick={() => setStepIdx((s) => s + 1)}
                className="px-4 py-1.5 rounded bg-[#231B0E] hover:bg-[#2F2412] border border-[#E5A93C] text-[#F7D794] font-sans text-xs font-semibold flex items-center gap-1 transition"
              >
                <span>Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-1.5 rounded bg-[#231B0E] hover:bg-[#2F2412] border border-[#E5A93C] text-[#F7D794] font-sans text-xs font-semibold transition"
              >
                Start Visualizing
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
