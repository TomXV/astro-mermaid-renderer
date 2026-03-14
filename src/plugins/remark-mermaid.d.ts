/**
 * Mermaidコードフェンスを <div class="mermaid"> へ変換する remarkプラグイン。
 * Shikiによるシンタックスハイライトの前に実行され、MermaidLoader が検出できる形式に変換する。
 */
export declare function remarkMermaid(): (tree: object) => void;
