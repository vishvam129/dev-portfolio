// Shared "neural core" state. The wireframe cores (hero + console) subscribe and
// visibly react to the on-device model: warming while it loads, spinning up while
// it retrieves, and firing an activation flash when it answers. Signature element.

export type CoreState = "loading" | "idle" | "thinking" | "fire";

let state: CoreState = "loading";
const subs = new Set<(s: CoreState) => void>();
let fireTimer: ReturnType<typeof setTimeout> | null = null;

export const coreBus = {
  get: () => state,
  set(s: CoreState) {
    state = s;
    subs.forEach((f) => f(s));
  },
  /** brief activation flash, then settle to idle */
  fire() {
    if (fireTimer) clearTimeout(fireTimer);
    this.set("fire");
    fireTimer = setTimeout(() => this.set("idle"), 750);
  },
  subscribe(f: (s: CoreState) => void) {
    subs.add(f);
    f(state);
    return () => { subs.delete(f); };
  },
};
