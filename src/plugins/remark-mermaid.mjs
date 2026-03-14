import { visit } from "unist-util-visit";

/**
 * Mermaidコードフェンスを <div class="mermaid"> へ変換する remarkプラグイン。
 * Shikiによるシンタックスハイライトの前に実行され、MermaidLoader が検出できる形式に変換する。
 */
export function remarkMermaid() {
  return (tree) => {
    visit(tree, "code", (node, index, parent) => {
      if (node.lang !== "mermaid" || !parent || index == null) return;

      parent.children.splice(index, 1, {
        type: "html",
        value: `<div class="mermaid">${node.value}</div>`,
      });
    });
  };
}
