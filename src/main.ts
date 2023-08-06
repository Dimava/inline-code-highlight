import { Plugin } from "obsidian";

export default class InlineCodeHighlight extends Plugin {
  async onload() {
    this.registerMarkdownPostProcessor((element, context) => {
      const codeBlocks = element.querySelectorAll("code");
      for (const cb of codeBlocks) {
        if ((cb.parentNode as Element).tagName === "pre") continue;

        const text = cb.innerText;
        if (!text.startsWith("'")) continue;

        const match = text.match(/^'(\w+) (.*)$/);
        if (!match) continue;
        const [, lang, code] = match;

        cb.classList.add(`lang-${lang}`, 'plugin-inline-code-highlight');
        cb.innerText = code;
        window.Prism?.highlightElement(cb);
      }
    });
  }
}
