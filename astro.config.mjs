import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import { remarkMermaid } from "./src/plugins/remark-mermaid.mjs";

export default defineConfig({
  integrations: [mdx()],
  markdown: {
    remarkPlugins: [remarkMermaid],
  },
});
