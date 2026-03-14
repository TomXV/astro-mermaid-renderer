# astro-mermaid-renderer

A small collection of Astro components for rendering Mermaid diagrams. It consists of `Mermaid.astro` for displaying diagrams and `MermaidLoader.astro` for client-side rendering and interactive preview.

## Files

- `src/components/Mermaid.astro`
  - Renders a Mermaid diagram string as a `.mermaid` element
- `src/components/MermaidLoader.astro`
  - Lazily loads Mermaid and converts unrendered `.mermaid` elements to SVG
  - Provides a zoom/pan preview modal with wheel zoom and pinch zoom support
- `docs/reference.md`
  - Module specification (Japanese)

## Features

- Singleton-like Mermaid script loading
- Idempotent rendering
- Idempotent preview event registration
- Automatic conversion of Mermaid code blocks from Markdown
- SVG preview with open/close, zoom in/out, reset, and pan

## Installation

```bash
npm install astro-mermaid-renderer
# or
pnpm add astro-mermaid-renderer
# or
yarn add astro-mermaid-renderer
# or
bun add astro-mermaid-renderer
```

## Usage

### 1. Add MermaidLoader to your layout

Load `MermaidLoader` **once** in a shared layout (e.g. `src/layouts/BaseLayout.astro`).
Place it at the end of `<body>`.

```astro
---
import MermaidLoader from "astro-mermaid-renderer/MermaidLoader.astro";
---

<html lang="en">
  <body>
    <slot />
    <MermaidLoader />
  </body>
</html>
```

### 2. Display a diagram with the Mermaid component

Use the `Mermaid` component in any `.astro` file.

```astro
---
import Mermaid from "astro-mermaid-renderer/Mermaid.astro";
---

<Mermaid chart={`graph TD
  A[Start] --> B{Decision}
  B -->|Yes| C[Done]
  B -->|No| D[Retry]
`} />
```

### 3. Auto-convert Markdown code fences (optional)

The `remarkMermaid` plugin converts ```` ```mermaid ```` code blocks in Markdown automatically.

Add it to `astro.config.mjs`:

```js
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import { remarkMermaid } from "astro-mermaid-renderer/remark-mermaid";

export default defineConfig({
  integrations: [mdx()],
  markdown: {
    remarkPlugins: [remarkMermaid],
  },
});
```

Then write code fences in Markdown as usual:

````md
```mermaid
graph TD
  A --> B
```
````

## Behavior Contracts

The following are guaranteed for compatibility:

- Public class names and DOM contracts are preserved
- The following data attributes are never broken:
  - `data-mermaid-upgraded`
  - `data-mermaid-rendered`
  - `data-mermaid-preview-bound`

## Notes

- Mermaid is loaded from the jsDelivr CDN
- Dynamically added `.mermaid` elements are not automatically re-scanned
- Very large diagrams may cause high browser rendering load

## Development

See `docs/reference.md` for implementation details. Contribution guidelines are in [CONTRIBUTING.md](CONTRIBUTING.md).

### Bun CLI

Run `bun install` first to install local dependencies (`astro` and `prettier`) before using `bun run dev` or `bun run debug`.

```bash
bun install
bun run dev
bun run debug
bun run build
bun run check
```

- `bun run dev` — Start the Astro dev server
- `bun run debug` — Start the dev server with the debug page at `/debug`
- `bun run build` — Run Astro build
- `bun run check` — Run Prettier check followed by Astro build
