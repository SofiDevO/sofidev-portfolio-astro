/**
 * This file is prebuilt from packages/astro/src/runtime/client/visible.ts
 * Do not edit this directly, but instead edit that file and rerun the prebuild
 * to generate this file.
 */
declare const _default: "(()=>{var r=(i,c,s)=>{let n=async()=>{await(await i())()},t=new IntersectionObserver(e=>{for(let o of e)if(o.isIntersecting){t.disconnect(),n();break}});for(let e of s.children)t.observe(e)};(self.Astro||(self.Astro={})).visible=r;window.dispatchEvent(new Event(\"astro:visible\"));})();";
export default _default;
