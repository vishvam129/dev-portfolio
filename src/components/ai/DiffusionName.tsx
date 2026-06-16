"use client";

import { useEffect, useRef, useState } from "react";

/**
 * VISHVAM-1 denoises itself into existence — the literal reverse-diffusion
 * process. The name is a luminance target texture; structured fBM "latent"
 * noise resolves into glowing glyphs over ~2s, non-uniformly (different regions
 * denoise at different timesteps, like real DDPM). Cursor re-noises the latent.
 * Hand-rolled WebGL2, fullscreen triangle (no attributes). CSS fallback.
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
uniform sampler2D u_target;
uniform float u_time;
uniform float u_prog;      // 0..1 diffusion progress
uniform vec2  u_res;
uniform vec2  u_mouse;     // px
uniform vec3  u_bg;
uniform vec3  u_accent;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }
float vnoise(vec2 p){
  vec2 i=floor(p), f=fract(p);
  vec2 u=f*f*(3.0-2.0*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),u.x),
             mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x),u.y);
}
float fbm(vec2 p){ float v=0.,a=.5; for(int i=0;i<5;i++){v+=a*vnoise(p);p*=2.02;a*=.5;} return v; }

void main(){
  vec2 uv = v_uv;
  vec2 px = uv * u_res;
  float aspect = u_res.x/u_res.y;

  // sample the name mask (flip Y for canvas->GL)
  float target = texture(u_target, vec2(uv.x, 1.0 - uv.y)).r;

  // structured latent noise + a per-region timestep bias (non-uniform denoise)
  vec2 np = vec2(uv.x*aspect, uv.y);
  float grain = fbm(np*5.0 + u_time*0.15);
  float bias  = fbm(np*2.3 - u_time*0.05);          // which regions resolve first

  // cursor rewinds the local latent back toward noise
  float md = distance(px, u_mouse) / u_res.y;
  float renoise = smoothstep(0.18, 0.0, md) * 0.7;

  float prog = clamp(u_prog - renoise, 0.0, 1.0);
  // how "solved" this pixel is: needs progress to exceed its biased timestep
  float solved = smoothstep(0.0, 0.55, prog*1.25 - bias*0.6);

  // emissive denoise edge (bright ring where it's currently resolving)
  float edge = (1.0 - abs(solved*2.0 - 1.0));

  // name intensity once solved; flicker faintly while noisy
  float name = target * solved;
  // visible structured "latent" noise field that clears as it denoises
  float cells = fbm(np*9.0 - u_time*0.25);
  float haze = (0.25 + 0.75*cells) * (1.0 - solved);

  vec3 col = u_bg;
  col += u_accent * haze * 0.30;                              // latent noise (dominant early)
  col += u_accent * name * 1.20;                              // glowing glyphs
  col += u_accent * target * edge * 1.0;                      // hot resolving edge
  // faint scanline + grain texture
  col += (hash(px + u_time) - 0.5) * 0.025;
  col *= 1.0 - 0.35*pow(distance(uv, vec2(0.5))*1.25, 2.0);   // vignette

  frag = vec4(max(col, 0.0), 1.0);
}`;

function hexToVec3(hex: string): [number, number, number] {
  const m = (hex || "").replace("#", "").trim() || "000000";
  const n = parseInt(m.length === 3 ? m.split("").map((c) => c + c).join("") : m, 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

export function DiffusionName({ text = "VISHVAM-1", className }: { text?: string; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl2", { alpha: false, antialias: false });
    if (!gl) { setFailed(true); return; }

    const compile = (t: number, s: string) => {
      const sh = gl.createShader(t)!;
      gl.shaderSource(sh, s); gl.compileShader(sh);
      return gl.getShaderParameter(sh, gl.COMPILE_STATUS) ? sh : null;
    };
    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) { setFailed(true); return; }
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { setFailed(true); return; }
    gl.useProgram(prog);

    const cs = getComputedStyle(canvas);
    const bg = hexToVec3(cs.getPropertyValue("--bg") || "#07070d");
    const accent = hexToVec3(cs.getPropertyValue("--accent") || "#8b8bff");
    const fam = cs.getPropertyValue("--f-display") || "sans-serif";

    // ---- build the name target texture (white glyphs on black) ----
    const tex = gl.createTexture()!;
    function buildTarget() {
      const W = 1024, H = 512;
      const off = document.createElement("canvas");
      off.width = W; off.height = H;
      const o = off.getContext("2d")!;
      o.fillStyle = "#000"; o.fillRect(0, 0, W, H);
      o.fillStyle = "#fff"; o.textAlign = "center"; o.textBaseline = "middle";
      let fz = 360;
      o.font = `900 ${fz}px ${fam}`;
      while (o.measureText(text).width > W * 0.9 && fz > 8) { fz -= 4; o.font = `900 ${fz}px ${fam}`; }
      o.fillText(text, W / 2, H / 2 + fz * 0.02);
      gl!.bindTexture(gl!.TEXTURE_2D, tex);
      gl!.texImage2D(gl!.TEXTURE_2D, 0, gl!.RGBA, gl!.RGBA, gl!.UNSIGNED_BYTE, off);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MIN_FILTER, gl!.LINEAR);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MAG_FILTER, gl!.LINEAR);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_S, gl!.CLAMP_TO_EDGE);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_T, gl!.CLAMP_TO_EDGE);
    }
    buildTarget();

    const uTime = gl.getUniformLocation(prog, "u_time");
    const uProg = gl.getUniformLocation(prog, "u_prog");
    const uRes = gl.getUniformLocation(prog, "u_res");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");
    gl.uniform3fv(gl.getUniformLocation(prog, "u_bg"), bg);
    gl.uniform3fv(gl.getUniformLocation(prog, "u_accent"), accent);
    gl.uniform1i(gl.getUniformLocation(prog, "u_target"), 0);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(1.75, window.devicePixelRatio || 1);
    const mouse = { x: -9999, y: -9999 };

    function resize() {
      const parent = canvas!.parentElement!;
      canvas!.width = Math.floor(parent.clientWidth * dpr);
      canvas!.height = Math.floor(parent.clientHeight * dpr);
      canvas!.style.width = parent.clientWidth + "px";
      canvas!.style.height = parent.clientHeight + "px";
      gl!.viewport(0, 0, canvas!.width, canvas!.height);
    }
    function onMove(e: PointerEvent) {
      const r = canvas!.getBoundingClientRect();
      mouse.x = (e.clientX - r.left) * dpr;
      mouse.y = canvas!.height - (e.clientY - r.top) * dpr;
    }
    function onLeave() { mouse.x = -9999; mouse.y = -9999; }

    let raf = 0;
    const t0 = performance.now();
    const DUR = 2100;
    function frame(now: number) {
      const t = (now - t0) / 1000;
      const prog = reduce ? 1 : Math.min(1, (now - t0) / DUR);
      gl!.uniform1f(uTime, t);
      gl!.uniform1f(uProg, prog);
      gl!.uniform2f(uRes, canvas!.width, canvas!.height);
      gl!.uniform2f(uMouse, mouse.x, mouse.y);
      gl!.drawArrays(gl!.TRIANGLES, 0, 3);
      // keep a gentle idle shimmer alive after resolve (cheap)
      if (!reduce) raf = requestAnimationFrame(frame);
    }
    resize();
    frame(performance.now());
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [text]);

  if (failed) {
    return (
      <div className={className} aria-hidden style={{ display: "grid", placeItems: "center" }}>
        <span className="font-display font-bold" style={{ fontSize: "clamp(3rem,11vw,9rem)", color: "var(--accent)" }}>
          {text}
        </span>
      </div>
    );
  }
  return <canvas ref={ref} className={className} aria-hidden />;
}
