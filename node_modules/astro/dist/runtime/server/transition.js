import { fade, slide } from "../../transitions/index.js";
import { markHTMLString } from "./escape.js";
const transitionNameMap = /* @__PURE__ */ new WeakMap();
function incrementTransitionNumber(result) {
  let num = 1;
  if (transitionNameMap.has(result)) {
    num = transitionNameMap.get(result) + 1;
  }
  transitionNameMap.set(result, num);
  return num;
}
function createTransitionScope(result, hash) {
  const num = incrementTransitionNumber(result);
  return `astro-${hash}-${num}`;
}
function toValidIdent(name) {
  return name.replace(/[^a-zA-Z0-9\-\_]/g, "_").replace(/^\_+|\_+$/g, "");
}
const getAnimations = (name) => {
  if (name === "fade")
    return fade();
  if (name === "slide")
    return slide();
  if (typeof name === "object")
    return name;
};
function renderTransition(result, hash, animationName, transitionName) {
  if (!animationName)
    animationName = "fade";
  const scope = createTransitionScope(result, hash);
  const name = transitionName ? toValidIdent(transitionName) : scope;
  const sheet = new ViewTransitionStyleSheet(scope, name);
  const animations = getAnimations(animationName);
  if (animations) {
    for (const [direction, images] of Object.entries(animations)) {
      for (const [image, rules] of Object.entries(images)) {
        sheet.addAnimationPair(direction, image, rules);
      }
    }
  } else if (animationName === "none") {
    sheet.addFallback("old", "animation: none; mix-blend-mode: normal;");
    sheet.addModern("old", "animation: none; opacity: 0; mix-blend-mode: normal;");
    sheet.addAnimationRaw("new", "animation: none; mix-blend-mode: normal;");
  }
  result._metadata.extraHead.push(markHTMLString(`<style>${sheet.toString()}</style>`));
  return scope;
}
class ViewTransitionStyleSheet {
  constructor(scope, name) {
    this.scope = scope;
    this.name = name;
  }
  modern = [];
  fallback = [];
  toString() {
    const { scope, name } = this;
    const [modern, fallback] = [this.modern, this.fallback].map((rules) => rules.join(""));
    return [
      `[data-astro-transition-scope="${scope}"] { view-transition-name: ${name}; }`,
      this.layer(modern),
      fallback
    ].join("");
  }
  layer(cssText) {
    return cssText ? `@layer astro { ${cssText} }` : "";
  }
  addRule(target, cssText) {
    this[target].push(cssText);
  }
  addAnimationRaw(image, animation) {
    this.addModern(image, animation);
    this.addFallback(image, animation);
  }
  addModern(image, animation) {
    const { name } = this;
    this.addRule("modern", `::view-transition-${image}(${name}) { ${animation} }`);
  }
  addFallback(image, animation) {
    const { scope } = this;
    this.addRule(
      "fallback",
      // Two selectors here, the second in case there is an animation on the root.
      `[data-astro-transition-fallback="${image}"] [data-astro-transition-scope="${scope}"],
			[data-astro-transition-fallback="${image}"][data-astro-transition-scope="${scope}"] { ${animation} }`
    );
  }
  addAnimationPair(direction, image, rules) {
    const { scope, name } = this;
    const animation = stringifyAnimation(rules);
    const prefix = direction === "backwards" ? `[data-astro-transition=back]` : "";
    this.addRule("modern", `${prefix}::view-transition-${image}(${name}) { ${animation} }`);
    this.addRule(
      "fallback",
      `${prefix}[data-astro-transition-fallback="${image}"] [data-astro-transition-scope="${scope}"],
			${prefix}[data-astro-transition-fallback="${image}"][data-astro-transition-scope="${scope}"] { ${animation} }`
    );
  }
}
function addAnimationProperty(builder, prop, value) {
  let arr = builder[prop];
  if (Array.isArray(arr)) {
    arr.push(value.toString());
  } else {
    builder[prop] = [value.toString()];
  }
}
function animationBuilder() {
  return {
    toString() {
      let out = "";
      for (let k in this) {
        let value = this[k];
        if (Array.isArray(value)) {
          out += `
	${k}: ${value.join(", ")};`;
        }
      }
      return out;
    }
  };
}
function stringifyAnimation(anim) {
  if (Array.isArray(anim)) {
    return stringifyAnimations(anim);
  } else {
    return stringifyAnimations([anim]);
  }
}
function stringifyAnimations(anims) {
  const builder = animationBuilder();
  for (const anim of anims) {
    if (anim.duration) {
      addAnimationProperty(builder, "animation-duration", toTimeValue(anim.duration));
    }
    if (anim.easing) {
      addAnimationProperty(builder, "animation-timing-function", anim.easing);
    }
    if (anim.direction) {
      addAnimationProperty(builder, "animation-direction", anim.direction);
    }
    if (anim.delay) {
      addAnimationProperty(builder, "animation-delay", anim.delay);
    }
    if (anim.fillMode) {
      addAnimationProperty(builder, "animation-fill-mode", anim.fillMode);
    }
    addAnimationProperty(builder, "animation-name", anim.name);
  }
  return builder.toString();
}
function toTimeValue(num) {
  return typeof num === "number" ? num + "ms" : num;
}
export {
  createTransitionScope,
  renderTransition
};
