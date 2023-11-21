import { getHighlighter } from "shikiji";
const ASTRO_COLOR_REPLACEMENTS = {
  "#000001": "var(--astro-code-color-text)",
  "#000002": "var(--astro-code-color-background)",
  "#000004": "var(--astro-code-token-constant)",
  "#000005": "var(--astro-code-token-string)",
  "#000006": "var(--astro-code-token-comment)",
  "#000007": "var(--astro-code-token-keyword)",
  "#000008": "var(--astro-code-token-parameter)",
  "#000009": "var(--astro-code-token-function)",
  "#000010": "var(--astro-code-token-string-expression)",
  "#000011": "var(--astro-code-token-punctuation)",
  "#000012": "var(--astro-code-token-link)"
};
const COLOR_REPLACEMENT_REGEX = new RegExp(
  `(${Object.keys(ASTRO_COLOR_REPLACEMENTS).join("|")})`,
  "g"
);
const cachedHighlighters = /* @__PURE__ */ new Map();
function replaceCssVariables(str) {
  return str.replace(COLOR_REPLACEMENT_REGEX, (match) => ASTRO_COLOR_REPLACEMENTS[match] || match);
}
function getCachedHighlighter(opts) {
  const key = JSON.stringify(opts, Object.keys(opts).sort());
  if (cachedHighlighters.has(key)) {
    return cachedHighlighters.get(key);
  }
  const highlighter = getHighlighter(opts);
  cachedHighlighters.set(key, highlighter);
  return highlighter;
}
export {
  getCachedHighlighter,
  replaceCssVariables
};
