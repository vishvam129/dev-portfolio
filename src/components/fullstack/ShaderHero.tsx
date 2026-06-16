"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Hand-rolled WebGL2 flowing-gradient hero (fbm noise + cursor warp).
 * Fullscreen triangle via gl_VertexID — no vertex attributes, no binding pitfalls.
 * Falls back to a CSS gradient if WebGL2 is unavailable.
 */
const VERT = `#version 300 es
out vec2 v_uv;
void main(){
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  v_uv = p;
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`;

const FRAG = `#version 300 es
precision highp float;
in vec2 v_uv;
out vec4 frag;
uniform float u_time;
uniform vec2 u_res;
uniform vec2 u_mouse;
uniform vec3 u_c1;
uniform vec3 u_c2;
uniform vec3 u_accent;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  vec2 u = f*f*(3.0-2.0*f);
  return mix(mix(hash(i), hash(i+vec2(1,0)), u.x),
             mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), u.x), u.y);
}
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  for(int i=0;i<5;i++){ v += a*noise(p); p *= 2.0; a *= 0.5; }
  return v;
}
void main(){
  vec2 uv = v_uv;
  vec2 asp = vec2(u_res.x/u_res.y, 1.0);
  vec2 p = uv * asp * 1.6;
  vec2 m = u_mouse * asp * 1.6;
  float t = u_time * 0.06;
  float q = fbm(p*1.4 - t*0.6);
  float warp = fbm(p*2.0 + t + vec2(q*1.2, q));
  float d = distance(p, m);
  warp += smoothstep(0.9, 0.0, d) * 0.45;          // cursor lights the field
  // base warm gradient, brighter toward the warp ridges
  vec3 col = mix(u_c1, u_c2, smoothstep(0.05, 0.9, warp));
  // molten accent band
  col = mix(col, u_accent, smoothstep(0.5, 0.82, warp));
  // hot highlight core for glow
  vec3 hi = u_accent * 1.5 + vec3(0.25, 0.12, 0.04);
  col += hi * pow(smoothstep(0.72, 0.98, warp), 2.0) * 0.9;
  // vignette so text stays readable
  col *= 1.0 - 0.5 * pow(distance(uv, vec2(0.5)) * 1.25, 2.0);
  // grain
  float g = hash(uv * u_res + u_time) * 0.05;
  col += g - 0.025;
  frag = vec4(max(col, 0.0), 1.0);
}`;

function hexToVec3(hex: string): [number, number, number] {
  const m = hex.replace("#", "").trim();
  const n = parseInt(m.length === 3 ? m.split("").map((c) => c + c).join("") : m, 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

export function ShaderHero({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl2", { antialias: false, alpha: false });
    if (!gl) { setFailed(true); return; }

    function compile(type: number, src: string) {
      const s = gl!.createShader(type)!;
      gl!.shaderSource(s, src);
      gl!.compileShader(s);
      if (!gl!.getShaderParameter(s, gl!.COMPILE_STATUS)) {
        return null; // fall back to CSS gradient
      }
      return s;
    }
    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) { setFailed(true); return; }
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { setFailed(true); return; }
    gl.useProgram(prog);

    // designed warm palette (richer than the near-black theme bg/panel)
    const c1 = hexToVec3("#0a0706"); // deep ember shadow
    const c2 = hexToVec3("#3a1408"); // warm molten brown
    const accent = hexToVec3("#ff6a3d");

    const uTime = gl.getUniformLocation(prog, "u_time");
    const uRes = gl.getUniformLocation(prog, "u_res");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");
    gl.uniform3fv(gl.getUniformLocation(prog, "u_c1"), c1);
    gl.uniform3fv(gl.getUniformLocation(prog, "u_c2"), c2);
    gl.uniform3fv(gl.getUniformLocation(prog, "u_accent"), accent);

    const mouse = { x: 0.5, y: 0.5 };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let dpr = Math.min(1.5, window.devicePixelRatio || 1);

    function resize() {
      const parent = canvas!.parentElement!;
      canvas!.width = Math.floor(parent.clientWidth * dpr);
      canvas!.height = Math.floor(parent.clientHeight * dpr);
      gl!.viewport(0, 0, canvas!.width, canvas!.height);
    }
    function onMove(e: PointerEvent) {
      const r = canvas!.getBoundingClientRect();
      mouse.x = (e.clientX - r.left) / r.width;
      mouse.y = 1 - (e.clientY - r.top) / r.height;
    }

    let raf = 0;
    const t0 = performance.now();
    function frame(now: number) {
      gl!.uniform1f(uTime, (now - t0) / 1000);
      gl!.uniform2f(uRes, canvas!.width, canvas!.height);
      gl!.uniform2f(uMouse, mouse.x, mouse.y);
      gl!.drawArrays(gl!.TRIANGLES, 0, 3);
      if (!reduce) raf = requestAnimationFrame(frame);
    }
    resize();
    frame(performance.now());
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  if (failed) {
    return (
      <div
        className={className}
        aria-hidden
        style={{ background: "radial-gradient(120% 120% at 30% 20%, var(--panel), var(--bg) 70%)" }}
      />
    );
  }
  return <canvas ref={ref} className={className} aria-hidden />;
}
