# astro-mermaid-renderer 開発プラン

## 背景

Astro 5.5 で `excludeLangs` + `rehype-mermaid` による公式 Mermaid サポートが追加された。  
しかし公式方式は **静的な図の描画のみ** で、インタラクティブ機能は提供しない。

## このライブラリの差別化ポイント（公式にない強み）

- **ズーム**（ホイール / ピンチ / ボタン）
- **パン**（ドラッグで図を移動）
- **プレビューモーダル**（図をクリックで拡大表示）
- **Actual Size / Fit to View** リセット機能
- **タッチ対応**（モバイルでのピンチズーム・ドラッグ）
- **Astro コンポーネントとして import できる**（MDXでもMarkdownでも使える）

→ 公式 = 「図が出る」、このライブラリ = 「図を操作できる」

## 開発方針

### 1. Astro Integration として公開

- `npm install astro-mermaid-renderer` で導入可能にする
- Astro の Integration API に準拠

### 2. 公式方式との共存

- `rehype-mermaid` を使っているプロジェクトでも、特定の図だけインタラクティブにできる設計
- `<Mermaid>` コンポーネントで囲んだものだけがインタラクティブになる

### 3. 最小構成

- `Mermaid.astro` — 個別の図コンポーネント
- `MermaidLoader.astro` — Mermaid CDN読み込み + レンダリングエンジン（シングルトン）
- 外部依存は Mermaid CDN のみ

### 4. 品質基準

- キーボードアクセシビリティ対応（矢印キーでパン、+/-でズーム）
- イベントリスナーのクリーンアップ（Astro hydration対応）
- 不正な Mermaid 構文時のエラー表示
- レスポンシブ対応

## リポジトリ情報

- GitHub: `TomXV/astro-mermaid-renderer`
- パッケージマネージャ: bun
- コミットメッセージ: 日本語
