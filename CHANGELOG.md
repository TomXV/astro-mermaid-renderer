# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.2] - 2026-03-15

### Changed
- Upgraded CI to Node 24.x and setup-node v5
- Switched to npmjs Trusted Publisher (OIDC) for publishing — no npm token required

### Added
- MIT License file

## [0.1.1] - 2026-03-15

### Added
- Type declarations for `remark-mermaid` — TypeScript users now get full type support when importing `astro-mermaid-renderer/remark-mermaid`
- English README (`README.md`)
- Installation instructions for npm / pnpm / yarn / bun
- Step-by-step setup guide for `MermaidLoader`, `Mermaid` component, and `remarkMermaid` plugin

### Changed
- Moved Japanese README to `README.ja.md`

### Fixed
- Package name and registry configuration for npmjs publishing

## [0.1.0] - 2026-03-15

### Added
- `Mermaid.astro` — SVG rendering component for Mermaid diagrams
- `MermaidLoader.astro` — component with zoom/pan preview modal
- `remarkMermaid` plugin — converts Mermaid fenced code blocks in Markdown/MDX to inline SVG
