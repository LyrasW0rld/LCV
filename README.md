# LCV (Lyra's Code Visualizer)

LCV (Lyra's Code Visualizer) is a pure client-side web application for interactive code exploration and architecture visualization. It provides 2D dependency graphs and 3D WebGL spatial topology representations (via Three.js), complexity analysis, and AST parsing directly within the browser.

The application is completely serverless and requires zero external cloud or AI backend services. It runs as a self-contained static HTML5/JavaScript application suitable for deployment on GitHub Pages or any static web server.

## Features

- **In-Browser Code Parsing**: Real-time static AST parsing and complexity analysis supporting C, C++, Java, Python, Rust, C#, JavaScript, and TypeScript.
- **Interactive 2D Microscope**: Canvas-based interactive call graphs, structural dependency diagrams, and execution flow visualizations.
- **3D Recon Visualizer**: Three.js-powered WebGL spatial topology viewer for exploring complex multi-module code structures.
- **100% Offline & Client-Side**: No backend servers, zero telemetry, and no external AI or cloud API dependencies.
- **Static Deployment**: Readily deployable to static hosting platforms such as GitHub Pages.

## Prerequisites

- **Node.js**: Node.js 18.x, 19.x, 20.x, 21.x, or 22.x
- **npm**: Package manager (included with Node.js)

## Project Structure

```
├── frontend/             # React + TypeScript + Vite client application
│   ├── components/       # UI components and 2D/3D visualizers
│   ├── services/         # Client-side code parsing and analysis
│   ├── types.ts          # Core TypeScript type definitions
│   └── vite.config.ts    # Vite build configuration
└── package.json          # Root workspace configuration
```

## Getting Started

### Installation

Clone the repository and install dependencies:

```bash
npm install
```

### Development

To start the local development server:

```bash
npm run dev
```

Open your browser at the local URL displayed in the terminal (typically `http://localhost:5173`).

### Production Build

To build the static application bundle:

```bash
npm run build
```

The resulting static production files are generated ready for deployment to GitHub Pages or any static web host.

### Preview Build

To preview the production build locally:

```bash
npm run preview
```
