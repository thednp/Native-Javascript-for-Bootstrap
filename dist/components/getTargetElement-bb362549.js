import { a as e, Z as d, d as c, g } from "./base-component-215a274f.js";
const i = "data-bs-target", s = "data-bs-parent", u = "data-bs-container", p = (a) => {
  const n = [i, s, u, "href"], o = e(a);
  return n.map((t) => {
    const r = d(a, t);
    return r ? t === s ? c(a, r) : g(r, o) : null;
  }).filter((t) => t)[0];
};
export {
  i as d,
  p as g
};
//# sourceMappingURL=getTargetElement-bb362549.js.map
