# astro-mermaid-renderer

Astro で Mermaid 図を描画するための小さなコンポーネント集です。表示用の `Mermaid.astro` と、クライアント側の描画・プレビューを担う `MermaidLoader.astro` で構成されています。

## Files

- `src/components/Mermaid.astro`
  - Mermaid 記法の文字列を `.mermaid` 要素として出力します
- `src/components/MermaidLoader.astro`
  - Mermaid 本体を遅延読み込みし、未描画の `.mermaid` を SVG に変換します
  - 拡大プレビュー、パン、ホイールズーム、ピンチズームを提供します
- `docs/reference.md`
  - このモジュールの仕様書です

## Features

- Mermaid スクリプトの singleton-like な読み込み
- idempotent な描画処理
- idempotent なプレビューイベント登録
- Markdown 由来の Mermaid コードブロック自動変換
- SVG プレビューの open / close、zoom、reset、pan 操作

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

### 1. レイアウトに MermaidLoader を追加する

共通レイアウト（例: `src/layouts/BaseLayout.astro`）で `MermaidLoader` を **1 回だけ** 読み込みます。
`<body>` の末尾に置くのが推奨です。

```astro
---
import MermaidLoader from "astro-mermaid-renderer/MermaidLoader.astro";
---

<html lang="ja">
  <body>
    <slot />
    <MermaidLoader />
  </body>
</html>
```

### 2. Mermaid コンポーネントで図を表示する

`.astro` ファイル内で `Mermaid` コンポーネントを使います。

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

### 3. Markdown のコードフェンスを自動変換する（任意）

`remarkMermaid` プラグインを使うと、Markdown の ```` ```mermaid ```` コードブロックを自動的に変換できます。

`astro.config.mjs` に追加します。

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

その後、Markdown ファイルに通常どおりコードフェンスを書くだけです。

````md
```mermaid
graph TD
  A --> B
```
````

## Behavior Contracts

以下は互換性のため維持する前提です。

- public class 名と DOM 契約は維持する
- 次の data 属性は壊さない
  - `data-mermaid-upgraded`
  - `data-mermaid-rendered`
  - `data-mermaid-preview-bound`

## Notes

- Mermaid は jsDelivr CDN から読み込まれます
- 動的に追加された `.mermaid` 要素は自動再走査されません
- 非常に大きな図ではブラウザ描画負荷が高くなることがあります

## Development

実装や変更方針は `docs/reference.md` を参照してください。コントリビューション手順は [CONTRIBUTING.md](CONTRIBUTING.md) にまとめています。

### Bun CLI

Bun を入口にしたコマンドを用意しています。

```bash
bun install
bun run dev
bun run debug
bun run build
bun run check
```

`bun run dev` や `bun run debug` を使う前に、ローカル依存の `astro` と `prettier` を入れるため `bun install` を先に実行してください。

- `bun run dev`
  - Astro dev server を起動します
- `bun run debug`
  - dev server を起動し、デバッグページ `/debug` の確認用に使います
- `bun run build`
  - Astro build を実行します
- `bun run check`
  - Prettier check と Astro build を順番に実行します
