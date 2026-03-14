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

## Usage

共通レイアウトなどで `MermaidLoader.astro` を 1 回だけ読み込みます。

```astro
---
import MermaidLoader from "../components/MermaidLoader.astro";
---

<html lang="ja">
  <body>
    <slot />
    <MermaidLoader />
  </body>
</html>
```

Mermaid 図を表示したい場所で `Mermaid.astro` を使います。

```astro
---
import Mermaid from "../components/Mermaid.astro";
---

<Mermaid chart={`graph TD
  A[Start] --> B{Decision}
  B -->|Yes| C[Done]
  B -->|No| D[Retry]
`} />
```

Markdown のコードブロックも対象です。

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

実装や変更方針は `AGENTS.md` と `docs/reference.md` を参照してください。コントリビューション手順は [CONTRIBUTING.md](CONTRIBUTING.md) にまとめています。
