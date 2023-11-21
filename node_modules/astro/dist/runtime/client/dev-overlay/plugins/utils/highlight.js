function createHighlight(rect, icon) {
  const highlight = document.createElement("astro-dev-overlay-highlight");
  if (icon)
    highlight.icon = icon;
  highlight.tabIndex = 0;
  if (rect.width === 0 || rect.height === 0) {
    highlight.style.display = "none";
  } else {
    positionHighlight(highlight, rect);
  }
  return highlight;
}
function positionHighlight(highlight, rect) {
  highlight.style.display = "block";
  highlight.style.top = `${Math.max(rect.top + window.scrollY - 10, 0)}px`;
  highlight.style.left = `${Math.max(rect.left + window.scrollX - 10, 0)}px`;
  highlight.style.width = `${rect.width + 15}px`;
  highlight.style.height = `${rect.height + 15}px`;
}
function attachTooltipToHighlight(highlight, tooltip, originalElement) {
  highlight.shadowRoot.append(tooltip);
  ["mouseover", "focus"].forEach((event) => {
    highlight.addEventListener(event, () => {
      tooltip.dataset.show = "true";
      const originalRect = originalElement.getBoundingClientRect();
      const dialogRect = tooltip.getBoundingClientRect();
      if (originalRect.top < dialogRect.height) {
        tooltip.style.top = `${originalRect.height + 15}px`;
      } else {
        tooltip.style.top = `-${tooltip.offsetHeight}px`;
      }
    });
  });
  ["mouseout", "blur"].forEach((event) => {
    highlight.addEventListener(event, () => {
      tooltip.dataset.show = "false";
    });
  });
}
export {
  attachTooltipToHighlight,
  createHighlight,
  positionHighlight
};
