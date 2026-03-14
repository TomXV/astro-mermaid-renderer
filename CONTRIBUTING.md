# Contributing

このリポジトリでは、Mermaid レンダラーの挙動互換性を重視します。小さくレビューしやすい変更を基本にし、挙動変更がある場合はドキュメントも一緒に更新してください。

## Read Order

変更前に次の順で確認してください。

1. `docs/reference.md`
2. `src/components/MermaidLoader.astro`
3. `src/components/Mermaid.astro`

## Invariants

以下は必ず維持してください。

- Mermaid script loading は singleton-like であること
- render pass は idempotent であること
- preview trigger binding は idempotent であること
- preview modal の操作が引き続き動作すること
- 既存の public class 名と DOM 契約を維持すること

Preview modal で維持する操作:

- open / close
- zoom in / zoom out
- actual size / reset
- pan / wheel zoom / touch pinch

壊してはいけない data 属性:

- `data-mermaid-upgraded`
- `data-mermaid-rendered`
- `data-mermaid-preview-bound`

## Scope

主な対象ファイル:

- `src/components/Mermaid.astro`
- `src/components/MermaidLoader.astro`
- `docs/reference.md`

## Validation

コミット前に次を実行してください。

```bash
bunx prettier ./src/components/Mermaid.astro ./src/components/MermaidLoader.astro ./src/pages/debug.astro --plugin prettier-plugin-astro --check
npx astro build --silent
```

または Bun CLI から次を実行できます。

```bash
bun run check
```

依存関係を変更した場合は、CI と Cloudflare 向けに lockfile も整合させてください。特に `pnpm-lock.yaml` を使う構成に広げる場合は更新漏れに注意してください。

## Commit Messages

コミットメッセージは日本語で、次の形式にしてください。

```text
<prefix>(<scope>): <summary>
```

利用できる prefix:

- `feat`
- `fix`
- `refactor`
- `docs`
- `style`
- `test`
- `perf`
- `build`
- `ci`
- `chore`
- `revert`

推奨 scope:

- `mermaid-renderer`
- `mermaid-loader`
- `mermaid-docs`

例:

```text
docs(mermaid-docs): 導入手順を更新
fix(mermaid-loader): プレビューの再バインドを防止
```

## Change Discipline

- パッチは小さく保つ
- 無関係なリファクタリングを同じコミットに混ぜない
- 挙動が変わる場合は関連ドキュメントも更新する
