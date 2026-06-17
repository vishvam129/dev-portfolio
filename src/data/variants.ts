export type VariantId = "motion" | "loud" | "calm" | "play";

export const VARIANTS: { id: VariantId; name: string; tag: string; desc: string; accent: string; bg: string; fg: string }[] = [
  { id: "motion", name: "Motion", tag: "cinematic / dark", desc: "Living flow-field, custom cursor, big bold type. Immersive.", accent: "#ceff2e", bg: "#070709", fg: "#f3f4ef" },
  { id: "loud", name: "Loud", tag: "brutalist / electric", desc: "Huge type, hard edges, electric orange. In your face.", accent: "#ff4d00", bg: "#ece9e1", fg: "#15130f" },
  { id: "calm", name: "Calm", tag: "minimal / expensive", desc: "Light, airy, refined serif. Quiet and premium.", accent: "#b5613f", bg: "#f3efe7", fg: "#221f1a" },
  { id: "play", name: "Play", tag: "colorful / friendly", desc: "Rounded, warm, playful. Fun to touch.", accent: "#ff5d73", bg: "#fbf4e6", fg: "#211d16" },
];

export const VARIANT_MAP = Object.fromEntries(VARIANTS.map((v) => [v.id, v]));
