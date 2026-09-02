/* eslint-disable */
// ============================================================
//  HERO RIG – 3D objektiv řízený scrollem (z dema Asperro)
//  Volá se z Home.tsx; vrací funkci pro úklid při odchodu.
// ============================================================
import * as THREE from 'three';

export function initHeroRig(){
let disposed = false;
const offs = [];
const on = (t, ev, fn, opt) => {
  t.addEventListener(ev, fn, opt);
  offs.push(() => t.removeEventListener(ev, fn, opt));
};
let _renderer = null;

const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;
const body = document.body;
const tcEl = document.getElementById("tc");
const tipEl = document.getElementById("tip");
const clipNameEl = document.getElementById("clipname");
const timelineEl = document.getElementById("timeline");
const lanesEl = document.getElementById("lanes");
const playheadEl = document.getElementById("playhead");
const rulerEl = document.getElementById("ruler");
const trackBoxEl = document.getElementById("tlTrack");
const acts = [...document.querySelectorAll(".act")].map(el => ({
  el,
  inner: el.querySelector(".inner"),
  from: parseFloat(el.dataset.from),
  to: parseFloat(el.dataset.to)
}));
const callouts = [...document.querySelectorAll(".callout")];

/* ---------- scroll progress ---------- */
const track = document.getElementById("track");
let raw = 0, smooth = 0;
function trackLength(){ return Math.max(1, track.offsetHeight - innerHeight); }
function readScroll(){ raw = Math.min(1, Math.max(0, scrollY / trackLength())); }
readScroll();
smooth = raw;
on(window, "scroll", readScroll, { passive:true });

/* ---------- overlay updates (run with or without WebGL) ---------- */
const clamp01 = v => v < 0 ? 0 : v > 1 ? 1 : v;
const smoothstep = t => t * t * (3 - 2 * t);
const band = (p, a, b, fade) => clamp01(Math.min((p - a) / fade, (b - p) / fade));

function pad(n, l = 2){ return String(Math.floor(n)).padStart(l, "0"); }

/* ---------- timeline ---------- */
const DUR = 12;                 // seconds the whole scroll maps to
const FPS = 25;

const CLIPS = [
  { from:0.00, to:0.18, name:"01 — Intro",     c:"var(--cyan)"   },
  { from:0.18, to:0.42, name:"02 — Kompozice", c:"var(--purple)" },
  { from:0.42, to:0.61, name:"03 — Optika",    c:"var(--cyan)"   },
  { from:0.61, to:0.86, name:"04 — Rozklad",   c:"var(--pink)"   },
  { from:0.86, to:1.00, name:"05 — Poptávka",  c:"var(--purple)" }
];

const laneEl = document.getElementById("laneV1");
for(const c of CLIPS){
  const el = document.createElement("button");
  el.type = "button";
  el.className = "clip";
  el.style.setProperty("--c", c.c);
  el.style.left = `${c.from * 100}%`;
  el.style.width = `calc(${(c.to - c.from) * 100}% - 3px)`;
  el.textContent = c.name;
  el.title = c.name;
  // pointer clicks scrub (handled on the lane); this is the keyboard path
  el.addEventListener("click", e => {
    if(e.detail !== 0) return;
    scrollTo({ top: (c.from + 0.015) * trackLength(), behavior: REDUCED ? "auto" : "smooth" });
  });
  laneEl.appendChild(el);
  c.el = el;
}

function buildRuler(){
  const every = innerWidth < 760 ? 4 : innerWidth < 1100 ? 3 : 2;
  rulerEl.innerHTML = "";
  for(let s = 0; s < DUR; s++){
    const major = s % every === 0;
    const t = document.createElement("div");
    t.className = "tick" + (major ? " major" : "");
    t.style.left = `${(s / DUR) * 100}%`;
    if(major && s > 0){
      const sp = document.createElement("span");
      sp.textContent = `00:${pad(s)}`;
      t.appendChild(sp);
    }
    rulerEl.appendChild(t);
  }
}
buildRuler();
on(window, "resize", buildRuler);

/* scrubbing: drag the lanes like a playhead */
let scrubbing = false;
function scrubFrom(e){
  const r = trackBoxEl.getBoundingClientRect();
  scrollTo(0, clamp01((e.clientX - r.left) / r.width) * trackLength());
}
lanesEl.addEventListener("pointerdown", e => {
  scrubbing = true;
  timelineEl.dataset.live = "1";
  lanesEl.setPointerCapture(e.pointerId);
  scrubFrom(e);
  e.preventDefault();
});
lanesEl.addEventListener("pointermove", e => { if(scrubbing) scrubFrom(e); });
const endScrub = () => { scrubbing = false; timelineEl.dataset.live = "0"; };
lanesEl.addEventListener("pointerup", endScrub);
lanesEl.addEventListener("pointercancel", endScrub);
lanesEl.addEventListener("keydown", e => {
  const step = e.shiftKey ? 0.1 : 1 / DUR;   // one second, or a bigger jump with Shift
  let p = raw;
  if(e.key === "ArrowRight") p += step;
  else if(e.key === "ArrowLeft") p -= step;
  else if(e.key === "Home") p = 0;
  else if(e.key === "End") p = 1;
  else return;
  e.preventDefault();
  scrollTo(0, clamp01(p) * trackLength());
});

function updateOverlay(p){
  for(const a of acts){
    const v = smoothstep(band(p, a.from - 0.045, a.to + 0.045, 0.055));
    a.inner.style.opacity = v.toFixed(3);
    a.inner.style.transform = `translate3d(0, ${((1 - v) * 26).toFixed(2)}px, 0)`;
  }
  const totalFrames = p * DUR * FPS;
  tcEl.innerHTML = `00:00:${pad(totalFrames / FPS)}:<b>${pad(totalFrames % FPS)}</b>`;
  tipEl.style.opacity = (1 - clamp01((p - 0.04) / 0.09)).toFixed(3);

  // playhead + clip states
  playheadEl.style.left = `${(p * 100).toFixed(3)}%`;
  lanesEl.setAttribute("aria-valuenow", Math.round(p * 100));
  for(const c of CLIPS){
    const on = p >= c.from && p < c.to;
    c.el.dataset.on = on ? "1" : "0";
    if(on) clipNameEl.textContent = c.name;
  }
  timelineEl.dataset.off = scrollY > trackLength() + innerHeight * 0.3 ? "1" : "0";
}
updateOverlay(raw);

/* ---------- WebGL ---------- */
if(THREE){
  const canvas = document.getElementById("stage");
  let renderer;
  try{
    renderer = new THREE.WebGLRenderer({ canvas, antialias:true, alpha:true, powerPreference:"high-performance" });
  }catch(err){
    console.warn("WebGL nedostupne:", err);
    body.dataset.gl = "off";
    canvas.style.display = "none";
  }

  if(renderer){
    _renderer = renderer;
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
    renderer.setSize(innerWidth, innerHeight, false);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, innerWidth / innerHeight, 0.1, 100);

    /* ----- studio environment (procedural, no external HDR) ----- */
    function buildEnv(){
      const pmrem = new THREE.PMREMGenerator(renderer);
      const env = new THREE.Scene();
      env.add(new THREE.Mesh(
        new THREE.BoxGeometry(24, 24, 24),
        new THREE.MeshBasicMaterial({ color:0x0b0d11, side:THREE.BackSide })
      ));
      const plane = new THREE.PlaneGeometry(1, 1);
      const lamp = (hex, gain, pos, scale) => {
        const mat = new THREE.MeshBasicMaterial({ color:hex, side:THREE.DoubleSide });
        mat.color.multiplyScalar(gain);
        const m = new THREE.Mesh(plane, mat);
        m.position.set(...pos);
        m.scale.set(scale[0], scale[1], 1);
        m.lookAt(0, 0, 0);
        env.add(m);
      };
      lamp(0xffffff, 3.4, [ 4,  5,  4], [7, 7]);   // key
      lamp(0x22d3ee, 2.6, [-6,  1, -3], [8, 8]);   // cyan rim
      lamp(0xf472b6, 2.0, [ 5, -1, -5], [7, 7]);   // pink kicker
      lamp(0xc084fc, 1.2, [-3, -4,  4], [7, 7]);   // purple bounce
      const tex = pmrem.fromScene(env, 0.035).texture;
      pmrem.dispose();
      return tex;
    }
    scene.environment = buildEnv();

    scene.add(new THREE.AmbientLight(0xffffff, 0.35));
    const key = new THREE.DirectionalLight(0xffffff, 2.1);
    key.position.set(4, 5.5, 4);
    scene.add(key);
    const rimA = new THREE.PointLight(0x22d3ee, 26, 22, 2);
    rimA.position.set(-3.4, 1.4, -2.6);
    scene.add(rimA);
    const rimB = new THREE.PointLight(0xf472b6, 20, 22, 2);
    rimB.position.set(3.2, -1.2, -2.4);
    scene.add(rimB);

    /* ----- geometry helpers ----- */
    function roundedBox(w, h, d, r){
      const s = new THREE.Shape();
      const x = -w / 2, y = -h / 2;
      s.moveTo(x + r, y);
      s.lineTo(x + w - r, y);      s.quadraticCurveTo(x + w, y, x + w, y + r);
      s.lineTo(x + w, y + h - r);  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      s.lineTo(x + r, y + h);      s.quadraticCurveTo(x, y + h, x, y + h - r);
      s.lineTo(x, y + r);          s.quadraticCurveTo(x, y, x + r, y);
      const bev = Math.min(0.035, d * 0.2);
      const g = new THREE.ExtrudeGeometry(s, {
        depth: d - bev * 2, bevelEnabled:true,
        bevelSize:bev, bevelThickness:bev, bevelSegments:3, curveSegments:12
      });
      g.translate(0, 0, -(d - bev * 2) / 2);
      g.computeVertexNormals();
      return g;
    }

    const matBody   = new THREE.MeshStandardMaterial({ color:0x1a1c20, roughness:0.42, metalness:0.85 });
    const matDark   = new THREE.MeshStandardMaterial({ color:0x0e1013, roughness:0.62, metalness:0.55 });
    const matMetal  = new THREE.MeshStandardMaterial({ color:0x8b929c, roughness:0.22, metalness:1.0 });
    const matRubber = new THREE.MeshStandardMaterial({ color:0x121417, roughness:0.9,  metalness:0.05 });
    const matGlass  = new THREE.MeshStandardMaterial({ color:0x0a1d24, roughness:0.05, metalness:0.35, envMapIntensity:2.4 });
    const matCoat   = new THREE.MeshStandardMaterial({ color:0x22d3ee, roughness:0.15, metalness:0.9,  emissive:0x0a4a57, emissiveIntensity:1.0 });
    const matRec    = new THREE.MeshStandardMaterial({ color:0xf472b6, emissive:0xf472b6, emissiveIntensity:2.6, roughness:0.4 });

    /* ----- flip-out monitor texture ----- */
    const uiCanvas = document.createElement("canvas");
    uiCanvas.width = 320; uiCanvas.height = 200;
    const ctx = uiCanvas.getContext("2d");
    const uiTex = new THREE.CanvasTexture(uiCanvas);
    uiTex.colorSpace = THREE.SRGBColorSpace;
    function drawUI(p){
      ctx.fillStyle = "#07090c"; ctx.fillRect(0, 0, 320, 200);
      ctx.strokeStyle = "rgba(34,211,238,.35)"; ctx.lineWidth = 2;
      ctx.strokeRect(26, 22, 268, 156);
      ctx.strokeStyle = "rgba(255,255,255,.10)";
      ctx.lineWidth = 1;
      for(let i = 1; i < 3; i++){
        ctx.beginPath(); ctx.moveTo(26 + 268 * i / 3, 22); ctx.lineTo(26 + 268 * i / 3, 178); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(26, 22 + 156 * i / 3); ctx.lineTo(294, 22 + 156 * i / 3); ctx.stroke();
      }
      const grad = ctx.createLinearGradient(26, 0, 294, 0);
      grad.addColorStop(0, "#22d3ee"); grad.addColorStop(.55, "#c084fc"); grad.addColorStop(1, "#f472b6");
      ctx.fillStyle = grad;
      ctx.fillRect(26, 178 - 0, 268 * p, 4);
      ctx.fillStyle = "#f472b6";
      ctx.beginPath(); ctx.arc(44, 40, 6, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#e5e7eb";
      ctx.font = "600 17px ui-monospace, monospace";
      ctx.fillText("REC", 58, 46);
      ctx.fillStyle = "#9ca3af";
      ctx.font = "500 15px ui-monospace, monospace";
      const f = p * 12 * 25;
      ctx.fillText(`00:00:${pad(f / 25)}:${pad(f % 25)}`, 176, 46);
      ctx.fillText("4K · 25p", 58, 166);
      uiTex.needsUpdate = true;
    }
    drawUI(0);
    const matScreen = new THREE.MeshStandardMaterial({
      map:uiTex, emissiveMap:uiTex, emissive:0xffffff, emissiveIntensity:1.35, roughness:0.35, metalness:0
    });

    /* ----- the rig ----- */
    const rig = new THREE.Group();
    scene.add(rig);

    const bodyMesh = new THREE.Mesh(roundedBox(1.85, 1.2, 1.15, 0.16), matBody);
    rig.add(bodyMesh);

    // side ridge / grip
    const grip = new THREE.Mesh(roundedBox(0.34, 1.05, 1.02, 0.14), matRubber);
    grip.position.set(-0.86, -0.03, 0);
    rig.add(grip);

    // top plate + handle
    const plate = new THREE.Mesh(roundedBox(1.5, 0.12, 0.85, 0.05), matDark);
    plate.position.set(0.05, 0.66, 0);
    rig.add(plate);
    const bar = new THREE.Mesh(roundedBox(1.05, 0.11, 0.16, 0.05), matMetal);
    bar.position.set(0.05, 1.02, 0);
    rig.add(bar);
    for(const x of [-0.4, 0.5]){
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.3, 16), matMetal);
      post.position.set(x, 0.86, 0);
      rig.add(post);
    }

    // rec tally
    const rec = new THREE.Mesh(new THREE.SphereGeometry(0.055, 20, 16), matRec);
    rec.position.set(0.72, 0.5, 0.5);
    rig.add(rec);

    // flip-out monitor
    const monitor = new THREE.Group();
    const shell = new THREE.Mesh(roundedBox(1.15, 0.78, 0.07, 0.06), matDark);
    monitor.add(shell);
    const screen = new THREE.Mesh(new THREE.PlaneGeometry(1.0, 0.63), matScreen);
    screen.position.z = 0.041;
    monitor.add(screen);
    monitor.position.set(-1.14, 0.02, 0.16);
    monitor.rotation.y = -0.62;
    rig.add(monitor);

    // vents on the back
    for(let i = 0; i < 5; i++){
      const vent = new THREE.Mesh(roundedBox(0.72, 0.045, 0.03, 0.02), matDark);
      vent.position.set(0.1, 0.34 - i * 0.15, -0.6);
      rig.add(vent);
    }

    // ----- lens assembly (parts explode along +Z) -----
    const lens = new THREE.Group();
    lens.position.z = 0.58;
    rig.add(lens);

    const mount = new THREE.Mesh(new THREE.CylinderGeometry(0.52, 0.52, 0.1, 48), matMetal);
    mount.rotation.x = Math.PI / 2;
    mount.position.z = 0.05;
    lens.add(mount);

    const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.44, 0.48, 0.42, 48), matBody);
    barrel.rotation.x = Math.PI / 2;
    barrel.position.z = 0.3;
    barrel.userData.explode = 0.30;
    lens.add(barrel);

    const focus = new THREE.Mesh(new THREE.CylinderGeometry(0.47, 0.47, 0.22, 64), matRubber);
    focus.rotation.x = Math.PI / 2;
    focus.position.z = 0.62;
    focus.userData.explode = 0.85;
    lens.add(focus);

    const aperture = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 0.08, 48), matMetal);
    aperture.rotation.x = Math.PI / 2;
    aperture.position.z = 0.78;
    aperture.userData.explode = 1.35;
    lens.add(aperture);

    const glass = new THREE.Mesh(new THREE.CircleGeometry(0.4, 56), matGlass);
    glass.position.z = 0.85;
    glass.userData.explode = 1.85;
    lens.add(glass);

    const coating = new THREE.Mesh(new THREE.TorusGeometry(0.4, 0.018, 12, 64), matCoat);
    coating.position.z = 0.85;
    coating.userData.explode = 1.85;
    lens.add(coating);

    const hood = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.5, 0.34, 48, 1, true), matDark);
    hood.rotation.x = Math.PI / 2;
    hood.position.z = 1.02;
    hood.userData.explode = 2.55;
    hood.material = new THREE.MeshStandardMaterial({ color:0x0e1013, roughness:0.7, metalness:0.4, side:THREE.DoubleSide });
    lens.add(hood);

    // anchors for the HTML callouts
    const anchors = {
      hood:  new THREE.Object3D(),
      focus: new THREE.Object3D(),
      glass: new THREE.Object3D()
    };
    anchors.hood.position.set(0, 0.78, 1.02);
    anchors.focus.position.set(0.74, 0.04, 0.62);
    anchors.glass.position.set(0, -0.72, 0.85);
    hood.userData.anchor = anchors.hood;
    focus.userData.anchor = anchors.focus;
    glass.userData.anchor = anchors.glass;
    lens.add(anchors.hood, anchors.focus, anchors.glass);

    const explodable = lens.children.filter(c => c.userData.explode !== undefined);
    for(const part of explodable) part.userData.baseZ = part.position.z;
    anchors.hood.userData  = { explode:2.55, baseZ:1.02 };
    anchors.focus.userData = { explode:0.85, baseZ:0.62 };
    anchors.glass.userData = { explode:1.85, baseZ:0.85 };
    const anchorList = [anchors.hood, anchors.focus, anchors.glass];

    /* =========================================================
       BACKGROUND — liquid light box, practicals, drone flyby
       ========================================================= */
    const bg = new THREE.Group();
    scene.add(bg);

    /* ----- 1. liquid light box (flow-field shader on an inverted sphere) ----- */
    const liquidMat = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      depthWrite: false,
      uniforms: {
        uTime:{ value:0 }, uProg:{ value:0 },
        uCyan:{ value:new THREE.Color(0x149fc4) },
        uPurple:{ value:new THREE.Color(0x9d63d8) },
        uPink:{ value:new THREE.Color(0xd6558f) },
        uBase:{ value:new THREE.Color(0x080909) }
      },
      vertexShader:`
        varying vec3 vW;
        void main(){
          vec4 wp = modelMatrix * vec4(position, 1.0);
          vW = wp.xyz;
          gl_Position = projectionMatrix * viewMatrix * wp;
        }`,
      fragmentShader:`
        uniform float uTime, uProg;
        uniform vec3 uCyan, uPurple, uPink, uBase;
        varying vec3 vW;

        // cheap flowing caustic — iterative domain distortion, no noise texture
        float flow(vec2 p, float t){
          float a = 0.0;
          vec2 q = p;
          for(int i = 0; i < 4; i++){
            q += vec2(sin(q.y * 1.6 + t * 0.29), cos(q.x * 1.4 - t * 0.23)) * 0.55;
            a += sin(q.x * 0.9 + q.y * 1.1 + t * 0.19) * 0.25;
          }
          return a * 0.5 + 0.5;
        }

        void main(){
          vec2 p = vW.xy * 0.085 + vec2(vW.z * 0.03, vW.z * 0.016);
          float t = uTime * 0.55 + uProg * 3.0;
          float f = flow(p, t);
          float g = flow(p * 1.85 + 4.3, t * 0.71);

          vec3 col = mix(uCyan, uPurple, smoothstep(0.22, 0.74, f));
          col = mix(col, uPink, smoothstep(0.46, 0.96, g));

          float body = pow(smoothstep(0.18, 1.0, f * 0.62 + g * 0.48), 3.2);
          float band = smoothstep(30.0, 3.0, abs(vW.y));       // fade floor + ceiling
          // hold the area straight behind the subject dark so the rig keeps its edge
          vec3 dir = normalize(vW);
          float off = 0.16 + 0.84 * smoothstep(0.10, 0.80, length(dir.xy));
          gl_FragColor = vec4(uBase + col * body * 0.42 * band * off, 1.0);
        }`
    });
    const liquid = new THREE.Mesh(new THREE.SphereGeometry(46, 40, 28), liquidMat);
    liquid.renderOrder = -2;
    bg.add(liquid);

    /* ----- 2. bokeh practicals ----- */
    function discTexture(){
      const cv = document.createElement("canvas");
      cv.width = cv.height = 128;
      const c = cv.getContext("2d");
      const g = c.createRadialGradient(64, 64, 0, 64, 64, 64);
      g.addColorStop(0, "rgba(255,255,255,1)");
      g.addColorStop(0.28, "rgba(255,255,255,.5)");
      g.addColorStop(0.62, "rgba(255,255,255,.12)");
      g.addColorStop(1, "rgba(255,255,255,0)");
      c.fillStyle = g;
      c.fillRect(0, 0, 128, 128);
      const t = new THREE.CanvasTexture(cv);
      t.colorSpace = THREE.SRGBColorSpace;
      return t;
    }
    const disc = discTexture();

    const N = innerWidth < 700 ? 64 : 130;
    const bPos = new Float32Array(N * 3);
    const bCol = new Float32Array(N * 3);
    const bSize = new Float32Array(N);
    const bSeed = new Float32Array(N);
    const palette = [new THREE.Color(0x22d3ee), new THREE.Color(0xc084fc), new THREE.Color(0xf472b6), new THREE.Color(0xdfe7f0)];
    for(let i = 0; i < N; i++){
      bPos[i * 3]     = (Math.random() - 0.5) * 52;
      bPos[i * 3 + 1] = (Math.random() - 0.5) * 30;
      bPos[i * 3 + 2] = -5 - Math.random() * 30;
      const c = palette[(Math.random() * palette.length) | 0];
      const w = 0.30 + Math.random() * 0.75;
      bCol[i * 3] = c.r * w; bCol[i * 3 + 1] = c.g * w; bCol[i * 3 + 2] = c.b * w;
      bSize[i] = 0.45 + Math.random() * 2.6;
      bSeed[i] = Math.random();
    }
    const bGeo = new THREE.BufferGeometry();
    bGeo.setAttribute("position", new THREE.BufferAttribute(bPos, 3));
    bGeo.setAttribute("aColor", new THREE.BufferAttribute(bCol, 3));
    bGeo.setAttribute("aSize", new THREE.BufferAttribute(bSize, 1));
    bGeo.setAttribute("aSeed", new THREE.BufferAttribute(bSeed, 1));

    const bokehMat = new THREE.ShaderMaterial({
      transparent:true,
      depthWrite:false,
      blending:THREE.AdditiveBlending,
      uniforms:{ uTime:{ value:0 }, uMap:{ value:disc } },
      vertexShader:`
        attribute vec3 aColor;
        attribute float aSize;
        attribute float aSeed;
        uniform float uTime;
        varying vec3 vCol;
        varying float vDim;
        void main(){
          vCol = aColor;
          vec3 p = position;
          p.x += sin(uTime * 0.13 + aSeed * 6.283) * 1.5;
          p.y += cos(uTime * 0.11 + aSeed * 4.11) * 1.1;
          vDim = 0.55 + 0.45 * sin(uTime * 0.5 + aSeed * 12.0);   // slow twinkle
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_PointSize = aSize * 260.0 / max(1.0, -mv.z);
          gl_Position = projectionMatrix * mv;
        }`,
      fragmentShader:`
        uniform sampler2D uMap;
        varying vec3 vCol;
        varying float vDim;
        void main(){
          float a = texture2D(uMap, gl_PointCoord).a;
          if(a < 0.01) discard;
          gl_FragColor = vec4(vCol * a * vDim, a * vDim);
        }`
    });
    const bokeh = new THREE.Points(bGeo, bokehMat);
    bokeh.renderOrder = -1;
    bg.add(bokeh);

    /* ----- 3. two big soft sources + anamorphic streaks ----- */
    function streakTexture(){
      const cv = document.createElement("canvas");
      cv.width = 512; cv.height = 64;
      const c = cv.getContext("2d");
      const g = c.createLinearGradient(0, 0, 512, 0);
      g.addColorStop(0, "rgba(255,255,255,0)");
      g.addColorStop(0.5, "rgba(255,255,255,1)");
      g.addColorStop(1, "rgba(255,255,255,0)");
      c.fillStyle = g;
      c.globalAlpha = 0.16; c.fillRect(0, 18, 512, 28);   // bloom
      c.globalAlpha = 0.45; c.fillRect(0, 28, 512, 8);    // halo
      c.globalAlpha = 1.0;  c.fillRect(0, 31, 512, 2);    // core
      const t = new THREE.CanvasTexture(cv);
      t.colorSpace = THREE.SRGBColorSpace;
      return t;
    }
    const streakTex = streakTexture();

    const softLights = [], streaks = [];
    for(const [hex, x, y, z, s] of [[0x22d3ee, -13, 3.5, -22, 17], [0xf472b6, 12, -3.5, -26, 21]]){
      const m = new THREE.Mesh(
        new THREE.PlaneGeometry(1, 1),
        new THREE.MeshBasicMaterial({
          map:disc, color:hex, transparent:true, opacity:0.16,
          blending:THREE.AdditiveBlending, depthWrite:false
        })
      );
      m.position.set(x, y, z);
      m.scale.setScalar(s);
      m.renderOrder = -1;
      softLights.push(m);
      bg.add(m);

      const fl = new THREE.Mesh(
        new THREE.PlaneGeometry(1, 1),
        new THREE.MeshBasicMaterial({
          map:streakTex, color:hex, transparent:true, opacity:0.30,
          blending:THREE.AdditiveBlending, depthWrite:false
        })
      );
      fl.position.set(x, y, z + 1);
      fl.scale.set(34, 2.6, 1);
      fl.renderOrder = -1;
      streaks.push(fl);
      bg.add(fl);
    }

    /* ----- 4. drone flyby, driven by the same scroll progress ----- */
    const drone = new THREE.Group();
    drone.scale.setScalar(1.55);
    bg.add(drone);

    const shellMat = new THREE.MeshStandardMaterial({ color:0x0c0e12, roughness:0.55, metalness:0.5, emissive:0x081418, emissiveIntensity:1.0 });
    const dBody = new THREE.Mesh(roundedBox(0.46, 0.16, 0.66, 0.07), shellMat);
    drone.add(dBody);
    const dCam = new THREE.Mesh(new THREE.SphereGeometry(0.1, 14, 10), new THREE.MeshStandardMaterial({ color:0x05070a, roughness:0.15, metalness:0.9 }));
    dCam.position.set(0, -0.1, -0.3);   // lookAt points local -Z forward
    drone.add(dCam);

    const bladeMat = new THREE.MeshBasicMaterial({ color:0xb8ccdd, transparent:true, opacity:0.34, side:THREE.DoubleSide, depthWrite:false });
    const blurMat  = new THREE.MeshBasicMaterial({ color:0x93aabf, transparent:true, opacity:0.13, side:THREE.DoubleSide, depthWrite:false });
    const blades = [];
    for(let i = 0; i < 4; i++){
      const ang = Math.PI / 4 + i * Math.PI / 2;
      const armG = new THREE.Group();
      armG.rotation.y = ang;
      const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.56, 8), shellMat);
      arm.rotation.z = Math.PI / 2;
      arm.position.x = 0.28;
      armG.add(arm);

      const hub = new THREE.Group();
      hub.position.set(0.56, 0.07, 0);
      const blur = new THREE.Mesh(new THREE.CircleGeometry(0.3, 20), blurMat);
      blur.rotation.x = -Math.PI / 2;
      hub.add(blur);
      const blade = new THREE.Mesh(new THREE.RingGeometry(0.09, 0.3, 14, 1, 0, Math.PI * 0.8), bladeMat);
      blade.rotation.x = -Math.PI / 2;
      hub.add(blade);
      blades.push(blade);
      armG.add(hub);
      drone.add(armG);
    }
    // nav lights: green starboard, red port — as on a real airframe
    const navMats = [];
    for(const [hex, x, z] of [[0x35ff7a, 0.4, -0.3], [0xff3b52, -0.4, -0.3], [0xffffff, 0, 0.34]]){
      const mat = new THREE.MeshStandardMaterial({ color:hex, emissive:hex, emissiveIntensity:3.0, roughness:0.4 });
      const led = new THREE.Mesh(new THREE.SphereGeometry(0.038, 12, 10), mat);
      led.position.set(x, -0.02, z);
      drone.add(led);
      navMats.push(mat);
    }

    // a flare so the airframe registers against the dark backdrop
    const droneGlow = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1),
      new THREE.MeshBasicMaterial({ map:streakTex, color:0xbfe9ff, transparent:true, opacity:0.28,
        blending:THREE.AdditiveBlending, depthWrite:false })
    );
    droneGlow.scale.set(4.6, 0.45, 1);
    droneGlow.position.z = 0.1;
    drone.add(droneGlow);

    // crosses the low band under the rig — the one strip that stays clear in every act
    const dronePath = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-20, -2.6, -20),
      new THREE.Vector3(-9,  -3.4, -14),
      new THREE.Vector3( 1,  -2.9, -12),
      new THREE.Vector3(11,  -3.6, -15),
      new THREE.Vector3(21,  -2.8, -22)
    ]);
    const DRONE_IN = 0.14, DRONE_OUT = 0.50;
    const dPos = new THREE.Vector3(), dNext = new THREE.Vector3();

    /* ----- keyframed choreography ----- */
    const KEYS = [
      { p:0.00, rx: 0.06, ry:-0.55, ox: 1.05, oy:-0.05, cz:7.1, cy: 0.10, ex:0 },
      { p:0.22, rx: 0.12, ry: 0.60, ox:-0.85, oy:-0.05, cz:5.4, cy: 0.00, ex:0 },
      { p:0.50, rx: 0.02, ry: 1.62, ox: 0.55, oy: 0.02, cz:3.6, cy: 0.02, ex:0 },
      { p:0.74, rx: 0.20, ry: 2.42, ox:-1.55, oy: 0.05, cz:5.6, cy: 0.28, ex:1 },
      { p:1.00, rx: 0.10, ry: 4.15, ox: 0.00, oy:-2.15, cz:12.5, cy: 0.35, ex:0 }
    ];
    const FIELDS = ["rx","ry","ox","oy","cz","cy","ex"];
    const pose = {};
    function poseAt(p){
      let i = 0;
      while(i < KEYS.length - 2 && p > KEYS[i + 1].p) i++;
      const a = KEYS[i], b = KEYS[i + 1];
      const t = smoothstep(clamp01((p - a.p) / (b.p - a.p)));
      for(const f of FIELDS) pose[f] = a[f] + (b[f] - a[f]) * t;
      return pose;
    }

    /* ----- pointer parallax ----- */
    let px = 0, py = 0, tpx = 0, tpy = 0;
    if(!REDUCED && matchMedia("(pointer:fine)").matches){
      addEventListener("pointermove", e => {
        tpx = (e.clientX / innerWidth - 0.5) * 2;
        tpy = (e.clientY / innerHeight - 0.5) * 2;
      }, { passive:true });
    }

    /* ----- resize ----- */
    let fit = 1, portrait = false, tlH = 0;
    const HALF_FOV_TAN = Math.tan(THREE.MathUtils.degToRad(36) / 2);
    function resize(){
      const w = innerWidth, h = innerHeight;
      tlH = timelineEl.offsetHeight;
      renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      portrait = camera.aspect < 0.85;
      fit = Math.min(1, Math.max(0.7, camera.aspect / 1.5));
      rig.scale.setScalar(fit);
    }
    resize();
    on(window, "resize", resize);

    /* ----- callout projection ----- */
    const v = new THREE.Vector3();
    function placeCallouts(ex){
      for(let i = 0; i < callouts.length; i++){
        const el = callouts[i];
        const o = anchorList[i];
        if(ex < 0.04){ el.style.opacity = "0"; continue; }
        o.getWorldPosition(v).project(camera);
        if(v.z > 1){ el.style.opacity = "0"; continue; }
        const x = (v.x * 0.5 + 0.5) * innerWidth;
        const y = (-v.y * 0.5 + 0.5) * innerHeight;
        // on portrait the copy owns the top half — drop any label that would land in it
        if(portrait && y < innerHeight * 0.52){ el.style.opacity = "0"; continue; }
        // keep the label on the side away from the copy column
        const flip = x > innerWidth * 0.46;
        el.classList.toggle("flip", flip);
        el.style.left = `${flip ? x - 14 : x + 14}px`;
        el.style.top = `${y}px`;
        el.style.opacity = (smoothstep(clamp01((ex - 0.15) / 0.4)) * 0.95).toFixed(3);
      }
    }

    /* ----- render loop ----- */
    const clock = new THREE.Clock();
    let uiTick = 0;
    let lastDrawn = -1;

    function frame(){
      if(disposed) return;
      requestAnimationFrame(frame);

      smooth += (raw - smooth) * (REDUCED ? 1 : 0.13);
      if(Math.abs(raw - smooth) < 0.00012) smooth = raw;

      // skip GPU work once the epilogue covers the canvas
      if(scrollY > trackLength() + innerHeight * 0.4) return;

      const t = clock.getElapsedTime();
      const k = poseAt(smooth);

      px += (tpx - px) * 0.06;
      py += (tpy - py) * 0.06;

      const float = REDUCED ? 0 : Math.sin(t * 0.55) * 0.035;
      rig.rotation.x = k.rx + (REDUCED ? 0 : Math.sin(t * 0.4) * 0.018) - py * 0.05;
      rig.rotation.y = k.ry + px * 0.09;
      // lift the rig by half the timeline's height so the lane strip never crops it
      // portrait needs more distance on the close shots, almost none on the wides
      const czEff = k.cz * (portrait ? 1.42 - 0.30 * clamp01((k.cz - 6) / 6) : 1);
      const lift = (tlH * 0.5) * (2 * czEff * HALF_FOV_TAN) / innerHeight;

      // on portrait the copy sits at the top, so the rig drops into the lower half
      rig.position.set(
        k.ox * (portrait ? 0.3 : 1),
        k.oy + float + lift + (portrait ? -0.75 : 0),
        0
      );

      for(const part of explodable) part.position.z = part.userData.baseZ + part.userData.explode * k.ex * 0.95;
      for(const a of anchorList) a.position.z = a.userData.baseZ + a.userData.explode * k.ex * 0.95;

      matRec.emissiveIntensity = REDUCED ? 2.2 : 1.6 + Math.abs(Math.sin(t * 1.6)) * 2.2;
      matCoat.emissiveIntensity = 0.7 + k.ex * 1.4;

      /* --- background --- */
      liquidMat.uniforms.uTime.value = t;
      liquidMat.uniforms.uProg.value = smooth;
      bokehMat.uniforms.uTime.value = t;

      // the light field drifts against the rig, so the two read as one move
      bg.rotation.y = -rig.rotation.y * 0.07 + px * 0.02;
      bg.position.set(-px * 0.9, -py * 0.5, 0);
      softLights[0].position.y = 3.5 + Math.sin(t * 0.21) * 1.6;
      softLights[1].position.y = -3.5 + Math.cos(t * 0.17) * 1.9;
      for(let i = 0; i < streaks.length; i++){
        streaks[i].position.y = softLights[i].position.y;
        streaks[i].position.x = softLights[i].position.x + Math.sin(t * 0.13 + i * 2.1) * 2.4;
        streaks[i].material.opacity = 0.20 + 0.16 * Math.abs(Math.sin(t * 0.29 + i * 1.7));
      }

      // drone flies its path across the middle acts
      const dt = (smooth - DRONE_IN) / (DRONE_OUT - DRONE_IN);
      if(dt <= 0 || dt >= 1){
        drone.visible = false;
      }else{
        drone.visible = true;
        dronePath.getPointAt(dt, dPos);
        dronePath.getPointAt(Math.min(0.999, dt + 0.02), dNext);
        drone.position.copy(dPos);
        drone.lookAt(dNext);
        drone.rotateX(0.42);                                   // nose-down in forward flight, tilts the rotor plane into view
        drone.rotateZ((dNext.x - dPos.x) * -0.28);             // bank into the turn
        const fade = smoothstep(clamp01(dt / 0.09)) * smoothstep(clamp01((1 - dt) / 0.09));
        drone.scale.setScalar(1.55 * fade);
        if(!REDUCED) for(const b of blades) b.rotation.z += 0.85;
        const blink = Math.sin(t * 5.2) > 0.35 ? 3.6 : 0.35;
        navMats[0].emissiveIntensity = blink;
        navMats[1].emissiveIntensity = 3.9 - blink;
        navMats[2].emissiveIntensity = Math.sin(t * 2.1) > 0.8 ? 4.0 : 0.2;
      }

      camera.position.set(px * 0.22, k.cy - py * 0.12, czEff);
      camera.lookAt(0, k.oy * 0.15, 0);

      if(++uiTick % 5 === 0) drawUI(smooth);
      placeCallouts(k.ex);

      if(Math.abs(smooth - lastDrawn) > 0.00005 || !REDUCED){
        updateOverlay(smooth);
        lastDrawn = smooth;
      }
      renderer.render(scene, camera);
    }
    frame();
  }
}

/* overlay keeps working even if the GL branch bailed out */
if(body.dataset.gl === "off"){
  const tick = () => { if(disposed) return; updateOverlay(raw); requestAnimationFrame(tick); };
  tick();
}

return () => {
  disposed = true;
  for(const off of offs) off();
  try{ if(_renderer) _renderer.dispose(); }catch(e){ /* ignore */ }
  delete document.body.dataset.gl;
};
}
