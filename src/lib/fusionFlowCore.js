/* eslint-disable */
// ============================================================
//  FUSION FLOW – průchod node stromem řízený scrollem
//  (z dema Asperro Node Flow). Volá se z Home.tsx,
//  vrací funkci pro úklid při odchodu ze stránky.
// ============================================================
import * as THREE from 'three';

export function initFusionFlow(){
let disposed = false;
const offs = [];
const on = (t, ev, fn, opt) => {
  t.addEventListener(ev, fn, opt);
  offs.push(() => t.removeEventListener(ev, fn, opt));
};
let _renderer = null;

const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;
const body = document.body;

const acts = [...document.querySelectorAll(".act")].map(el => ({
  el, inner: el.querySelector(".inner"),
  from: parseFloat(el.dataset.from), to: parseFloat(el.dataset.to)
}));
const tipEl = document.getElementById("tip");
const stripEl = document.getElementById("strip");
const graphEl = document.getElementById("graph");
const gwrapEl = document.getElementById("gwrap");
const playheadEl = document.getElementById("playhead");
const nowNodeEl = document.getElementById("nowNode");
const nowRoleEl = document.getElementById("nowRole");
const vwNodeEl = document.getElementById("vwNode");
const vwStateEl = document.getElementById("vwState");
const insEl = document.getElementById("inspector");
const insStepEl = document.getElementById("insStep");
const insNodeEl = document.getElementById("insNode");
const insTitleEl = document.getElementById("insTitle");
const insDescEl = document.getElementById("insDesc");
const insFactEl = document.getElementById("insFact");
let insShown = -1;
function fillInspector(i){
  if(insShown === i) return;
  insShown = i;
  const n = NODES[i];
  insEl.style.setProperty("--ic", n.c);
  insStepEl.textContent = `Krok ${String(i + 1).padStart(2, "0")}/08`;
  insNodeEl.textContent = n.name;
  insTitleEl.textContent = n.title;
  insDescEl.textContent = n.desc;
  insFactEl.textContent = n.fact;
}

const clamp01 = v => v < 0 ? 0 : v > 1 ? 1 : v;
const smoothstep = t => t * t * (3 - 2 * t);
const ramp = (p, a, b) => smoothstep(clamp01((p - a) / (b - a)));
const band = (p, a, b, fade) => clamp01(Math.min((p - a) / fade, (b - p) / fade));

/* ---------- the graph ---------- */
const NODES = [
  {
    name:"MediaIn1", role:"Zdrojový plát", c:"var(--cyan)", short:"MediaIn",
    title:"Příprava materiálu",
    desc:"Import záběrů, kontrola barevného prostoru a gama křivky, stavba proxy pro offline střih.",
    fact:"Špatně otagovaná gama se na waveformu nepozná. Projeví se až v kompozitu — merge počítá s hodnotami, ne s tím, jak obraz vypadá."
  },
  {
    name:"ColorCorrector1", role:"Balance a sytost", c:"var(--purple)", short:"ColorCor",
    title:"Primární korekce",
    desc:"Expozice, vyvážení bílé a kontrast se srovnají dřív než cokoliv dalšího. Look přijde až nad tím.",
    fact:"Klíčovač i merge počítají s hodnotami pixelů. Posun barvy až za nimi posune i všechno, co se z nich vypočítalo."
  },
  {
    name:"DeltaKeyer1", role:"Klíč a matte", c:"var(--cyan)", short:"DeltaKey",
    title:"Klíčování a matte",
    desc:"Delta Keyer vytáhne masku ze zeleného pozadí, despill zbaví okraje zeleného nádechu.",
    fact:"Formát 4:2:0 nese barvu ve čtvrtinovém rozlišení oproti jasu. Proto se rozpadají vlasy a proto se klíčuje z co nejméně komprimovaného zdroje."
  },
  {
    name:"Background1", role:"Generovaný plát", c:"var(--purple)", short:"Backgrnd",
    title:"Plát pozadí",
    desc:"Nové pozadí — natočené i generované. Perspektiva, ohnisko a zrno musí sedět se záběrem.",
    fact:"Kompozit obvykle neprozradí klíč, ale světlo. Jiná barevná teplota plátu než na subjektu se čte jako koláž."
  },
  {
    name:"Merge1", role:"Složení vrstev", c:"var(--pink)", short:"Merge",
    title:"Kompozice vrstev",
    desc:"Foreground nad background, pořadí vrstev a operace nad alfa kanálem. Tady se strom sbíhá.",
    fact:"Fusion pracuje s premultiplikovanou alfou. Obraz, který premultiplikovaný není, si přinese tmavý lem po obvodu masky."
  },
  {
    name:"Glow1", role:"Světlo nad kompem", c:"var(--cyan)", short:"Glow",
    title:"Světlo a atmosféra",
    desc:"Glow, halace a difuze se počítají nad složeným obrazem, ne uvnitř vrstev.",
    fact:"Glow pod merge svítí jen uvnitř masky. Nad merge přeteče přes okraje do pozadí — přesně jako světlo v objektivu."
  },
  {
    name:"Text+1", role:"Titulek ve scéně", c:"var(--purple)", short:"Text+",
    title:"Titulky a grafika",
    desc:"Text vzniká v kompozitu, ne až ve střihu. Sedí ve stejném prostoru jako záběr.",
    fact:"Ostrý titulek nad zrnitým záběrem vypadá jako nálepka. Proto dostane stejné rozostření i zrno jako materiál pod ním."
  },
  {
    name:"MediaOut1", role:"Výstup", c:"var(--pink)", short:"MediaOut",
    title:"Výstup a delivery",
    desc:"Render podle cíle — jiný soubor pro web, jiný pro archiv, jiný pro předání dál.",
    fact:"H.264 počítá s tím, že se do obrazu už nebude sahat. Pro další práci slouží ProRes nebo DNxHR, které opakovaný zápis unesou."
  }
];
// where each node sits in the scroll — matched to the acts, not evenly spread
const NP = [0, 0.20, 0.31, 0.40, 0.52, 0.60, 0.80, 1.0];

// p -> position in the graph, as a node index plus the fraction to the next one
function graphPos(p){
  let i = 0;
  while(i < NP.length - 2 && p > NP[i + 1]) i++;
  return { i, t: clamp01((p - NP[i]) / (NP[i + 1] - NP[i])) };
}

/* ---------- scroll ---------- */
const track = document.getElementById("track");
let raw = 0, smooth = 0;
const trackLength = () => Math.max(1, track.offsetHeight - innerHeight);
function readScroll(){ raw = clamp01(scrollY / trackLength()); }
readScroll();
smooth = raw;
on(window, "scroll", readScroll, { passive:true });

/* ---------- node strip ---------- */
const GAP = 1.6;   // % of strip width between node chips
const NW = (100 - GAP * (NODES.length - 1)) / NODES.length;
NODES.forEach((n, i) => {
  const left = i * (NW + GAP);
  if(i > 0){
    const w = document.createElement("div");
    w.className = "wire";
    w.style.left = `${left - GAP}%`;
    w.style.width = `${GAP}%`;
    w.innerHTML = "<i></i>";
    gwrapEl.appendChild(w);
    n.wire = w;
  }
  const el = document.createElement("button");
  el.type = "button";
  el.className = "node";
  el.style.setProperty("--c", n.c);
  el.style.left = `${left}%`;
  el.style.width = `${NW}%`;
  el.textContent = n.short;
  el.title = n.name;
  el.addEventListener("click", e => {
    if(e.detail !== 0) return;                 // pointer clicks scrub instead
    scrollTo({ top: NP[i] * trackLength(), behavior: REDUCED ? "auto" : "smooth" });
  });
  gwrapEl.appendChild(el);
  n.el = el;
});

let scrubbing = false;
function scrubFrom(e){
  const r = gwrapEl.getBoundingClientRect();
  scrollTo(0, clamp01((e.clientX - r.left) / r.width) * trackLength());
}
graphEl.addEventListener("pointerdown", e => {
  scrubbing = true;
  stripEl.dataset.live = "1";
  graphEl.setPointerCapture(e.pointerId);
  scrubFrom(e);
  e.preventDefault();
});
graphEl.addEventListener("pointermove", e => { if(scrubbing) scrubFrom(e); });
const endScrub = () => { scrubbing = false; stripEl.dataset.live = "0"; };
graphEl.addEventListener("pointerup", endScrub);
graphEl.addEventListener("pointercancel", endScrub);
graphEl.addEventListener("keydown", e => {
  const step = e.shiftKey ? NP[1] : 0.02;
  let p = raw;
  if(e.key === "ArrowRight") p += step;
  else if(e.key === "ArrowLeft") p -= step;
  else if(e.key === "Home") p = 0;
  else if(e.key === "End") p = 1;
  else return;
  e.preventDefault();
  scrollTo(0, clamp01(p) * trackLength());
});

/* ---------- overlay ---------- */
function updateOverlay(p){
  for(const a of acts){
    const v = smoothstep(band(p, a.from - 0.04, a.to + 0.04, 0.05));
    a.inner.style.opacity = v.toFixed(3);
    a.inner.style.transform = `translate3d(0, ${((1 - v) * 24).toFixed(2)}px, 0)`;
  }
  tipEl.style.opacity = (1 - clamp01((p - 0.04) / 0.09)).toFixed(3);

  const gp = graphPos(p);
  const centerOf = i => i * (NW + GAP) + NW / 2;
  playheadEl.style.left = `${(centerOf(gp.i) + (centerOf(gp.i + 1) - centerOf(gp.i)) * gp.t).toFixed(3)}%`;
  graphEl.setAttribute("aria-valuenow", Math.round(p * 100));

  const active = gp.t > 0.5 ? gp.i + 1 : gp.i;
  NODES.forEach((n, i) => {
    n.el.dataset.on = i === active ? "1" : "0";
    if(n.wire) n.wire.dataset.on = p >= NP[i - 1] ? "1" : "0";
  });
  const cur = NODES[active];
  nowNodeEl.innerHTML = cur.name.replace(/(\d+)$/, "<b>$1</b>");
  nowRoleEl.textContent = cur.role;
  vwNodeEl.textContent = cur.name;

  stripEl.dataset.off = scrollY > trackLength() + innerHeight * 0.3 ? "1" : "0";
}
updateOverlay(raw);

/* ---------- node thumbnails: eight views, one per node ---------- */
function shotCanvas(kind){
  const W = 320, H = 180;
  const cv = document.createElement("canvas");
  cv.width = W; cv.height = H;
  const c = cv.getContext("2d");

  const vgrad = (a, b) => {
    const g = c.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, a); g.addColorStop(1, b);
    return g;
  };
  const label = (txt, x, y, col, size) => {
    c.fillStyle = col;
    c.font = `500 ${size || 11}px 'JetBrains Mono', ui-monospace, monospace`;
    c.fillText(txt, x, y);
  };
  // the operator with a shoulder rig — the thing being composited
  const subject = (col, sx, sy, sc) => {
    c.save(); c.translate(sx, sy); c.scale(sc, sc);
    c.fillStyle = col;
    c.beginPath(); c.arc(0, -46, 13, 0, Math.PI * 2); c.fill();
    c.beginPath();
    c.moveTo(-21, 0); c.lineTo(-15, -33); c.lineTo(14, -33); c.lineTo(20, 0);
    c.closePath(); c.fill();
    c.fillRect(9, -37, 34, 15);
    c.beginPath(); c.arc(49, -29, 8, 0, Math.PI * 2); c.fill();
    c.restore();
  };
  const brandSky = () => {
    const g = c.createLinearGradient(0, 0, W, H);
    g.addColorStop(0, "#15607a"); g.addColorStop(0.5, "#6b4494"); g.addColorStop(1, "#8e3a68");
    c.fillStyle = g; c.fillRect(0, 0, W, H);
    const s = c.createRadialGradient(W * 0.72, H * 0.34, 4, W * 0.72, H * 0.34, 92);
    s.addColorStop(0, "rgba(255,222,244,.95)");
    s.addColorStop(0.4, "rgba(244,114,182,.35)");
    s.addColorStop(1, "rgba(244,114,182,0)");
    c.fillStyle = s; c.fillRect(0, 0, W, H);
  };

  if(kind === "plate"){
    // raw, ungraded source
    c.fillStyle = vgrad("#94a7b1", "#39454c"); c.fillRect(0, 0, W, H);
    c.fillStyle = "rgba(26,33,38,.9)"; c.fillRect(0, H * 0.72, W, H * 0.28);
    subject("#070c10", W * 0.42, H * 0.72, 1);
    label("A001_C012", 14, 22, "rgba(255,255,255,.55)", 12);
    label("REC 709", W - 78, 22, "rgba(255,255,255,.45)", 12);
  }

  else if(kind === "wheels"){
    // primary colour wheels, the way a grading panel shows them
    c.fillStyle = "#0d1117"; c.fillRect(0, 0, W, H);
    const names = ["LIFT", "GAMMA", "GAIN"];
    for(let i = 0; i < 3; i++){
      const cx = W * (0.2 + i * 0.3), cy = H * 0.46, r = 33;
      for(let a2 = 0; a2 < 60; a2++){
        const t0 = (a2 / 60) * Math.PI * 2, t1 = ((a2 + 1.4) / 60) * Math.PI * 2;
        c.beginPath();
        c.arc(cx, cy, r, t0, t1);
        c.strokeStyle = `hsl(${(a2 / 60) * 360}, 62%, 52%)`;
        c.lineWidth = 7; c.stroke();
      }
      c.beginPath(); c.arc(cx, cy, r - 6, 0, Math.PI * 2);
      c.fillStyle = "#0f141b"; c.fill();
      const ox = Math.cos(i * 2.2) * 9, oy = Math.sin(i * 2.2) * 9;
      c.beginPath(); c.arc(cx + ox, cy + oy, 4.5, 0, Math.PI * 2);
      c.fillStyle = "#e5e7eb"; c.fill();
      c.strokeStyle = "rgba(255,255,255,.22)"; c.lineWidth = 1;
      c.beginPath(); c.moveTo(cx, cy); c.lineTo(cx + ox, cy + oy); c.stroke();
      c.textAlign = "center";
      label(names[i], cx, H * 0.86, "rgba(156,163,175,.85)", 12);
      c.textAlign = "left";
    }
  }

  else if(kind === "key"){
    // chroma plate on the left, the matte it produces on the right
    const split = W * 0.56;
    c.fillStyle = "#2fae4a"; c.fillRect(0, 0, split, H);
    c.fillStyle = "rgba(0,0,0,.10)"; c.fillRect(0, H * 0.78, split, H * 0.22);
    subject("#0d1418", split * 0.46, H * 0.78, 0.86);
    c.fillStyle = "#000"; c.fillRect(split, 0, W - split, H);
    subject("#ffffff", split + (W - split) * 0.46, H * 0.78, 0.86);
    c.strokeStyle = "rgba(255,255,255,.55)"; c.lineWidth = 1;
    c.beginPath(); c.moveTo(split, 0); c.lineTo(split, H); c.stroke();
    label("SRC", 12, 22, "rgba(255,255,255,.7)", 12);
    label("MATTE", split + 12, 22, "rgba(255,255,255,.7)", 12);
  }

  else if(kind === "sky"){
    // the generated plate on its own — no subject yet
    brandSky();
    c.fillStyle = "rgba(10,14,20,.88)";
    c.beginPath();
    c.moveTo(0, H * 0.86); c.quadraticCurveTo(W * 0.28, H * 0.66, W * 0.55, H * 0.82);
    c.quadraticCurveTo(W * 0.8, H * 0.94, W, H * 0.74);
    c.lineTo(W, H); c.lineTo(0, H); c.closePath(); c.fill();
    c.fillStyle = "rgba(6,9,14,.75)";
    c.beginPath();
    c.moveTo(0, H * 0.94); c.quadraticCurveTo(W * 0.4, H * 0.8, W, H * 0.92);
    c.lineTo(W, H); c.lineTo(0, H); c.closePath(); c.fill();
  }

  else if(kind === "merge"){
    // two layers meeting — the overlap is where the merge happens
    c.fillStyle = "#0b0f14"; c.fillRect(0, 0, W, H);
    c.globalCompositeOperation = "lighter";
    const box = (x, y, w, h, col) => {
      c.fillStyle = col.replace("ALPHA", ".16");
      c.fillRect(x, y, w, h);
      c.strokeStyle = col.replace("ALPHA", ".85");
      c.lineWidth = 2; c.strokeRect(x, y, w, h);
    };
    box(38, 30, 150, 96, "rgba(34,211,238,ALPHA)");
    box(126, 58, 150, 96, "rgba(244,114,182,ALPHA)");
    c.globalCompositeOperation = "source-over";
    c.fillStyle = "rgba(255,255,255,.85)";
    c.font = "600 22px 'JetBrains Mono', ui-monospace, monospace";
    c.fillText("+", 152, 100);
    label("FG / BG", 12, 170, "rgba(156,163,175,.8)", 12);
  }

  else if(kind === "glow"){
    // a light source, blooming
    c.fillStyle = vgrad("#141024", "#0a0c12"); c.fillRect(0, 0, W, H);
    const cx = W * 0.5, cy = H * 0.46;
    c.globalCompositeOperation = "lighter";
    const g = c.createRadialGradient(cx, cy, 2, cx, cy, 96);
    g.addColorStop(0, "rgba(255,255,255,.98)");
    g.addColorStop(0.16, "rgba(226,180,255,.55)");
    g.addColorStop(0.45, "rgba(120,180,255,.18)");
    g.addColorStop(1, "rgba(120,180,255,0)");
    c.fillStyle = g; c.fillRect(0, 0, W, H);
    const st = c.createLinearGradient(0, 0, W, 0);
    st.addColorStop(0, "rgba(120,210,255,0)");
    st.addColorStop(0.5, "rgba(190,235,255,.75)");
    st.addColorStop(1, "rgba(120,210,255,0)");
    c.fillStyle = st; c.fillRect(0, cy - 1.5, W, 3);
    c.globalCompositeOperation = "source-over";
    c.fillStyle = "rgba(255,255,255,.92)";
    c.font = "600 20px Poppins, system-ui, sans-serif";
    c.fillText("ASPERRO", W * 0.09, H * 0.9);
    c.fillStyle = "rgba(34,211,238,.9)";
    c.fillRect(W * 0.09, H * 0.93, 50, 2);
  }

  else if(kind === "text"){
    // a title card with its typographic guides showing
    c.fillStyle = vgrad("#101620", "#0a0d12"); c.fillRect(0, 0, W, H);
    c.strokeStyle = "rgba(34,211,238,.28)"; c.lineWidth = 1;
    c.setLineDash([4, 4]);
    for(const y of [H * 0.38, H * 0.62]){
      c.beginPath(); c.moveTo(18, y); c.lineTo(W - 18, y); c.stroke();
    }
    c.setLineDash([]);
    c.fillStyle = "#f2f4f7";
    c.font = "600 34px Poppins, system-ui, sans-serif";
    c.fillText("STUDIO", 26, H * 0.62);
    c.fillStyle = "rgba(34,211,238,.95)";
    c.fillRect(26, H * 0.68, 78, 3);
    c.fillStyle = "rgba(244,114,182,.9)";
    c.fillRect(W - 40, H * 0.38, 3, H * 0.24);
    label("SAFE", W - 74, 24, "rgba(156,163,175,.7)", 11);
  }

  else {   // "final"
    brandSky();
    c.fillStyle = "rgba(12,18,24,.9)"; c.fillRect(0, H * 0.74, W, H * 0.26);
    subject("#0a1016", W * 0.34, H * 0.74, 0.95);
    c.globalCompositeOperation = "lighter";
    const g = c.createRadialGradient(W * 0.72, H * 0.34, 2, W * 0.72, H * 0.34, 118);
    g.addColorStop(0, "rgba(255,255,255,.6)");
    g.addColorStop(0.35, "rgba(170,225,255,.16)");
    g.addColorStop(1, "rgba(170,225,255,0)");
    c.fillStyle = g; c.fillRect(0, 0, W, H);
    c.globalCompositeOperation = "source-over";
    c.fillStyle = "rgba(255,255,255,.94)";
    c.font = "600 20px Poppins, system-ui, sans-serif";
    c.fillText("LABS", W * 0.09, H * 0.9);
    c.fillStyle = "rgba(34,211,238,.9)";
    c.fillRect(W * 0.09, H * 0.93, 32, 2);
  }

  return cv;
}

const SHOTS = ["plate", "wheels", "key", "sky", "merge", "glow", "text", "final"];

/* ---------- WebGL ---------- */
if(THREE){
  const canvas = document.getElementById("stage");
  let renderer;
  try{
    renderer = new THREE.WebGLRenderer({ canvas, antialias:true, alpha:false, powerPreference:"high-performance" });
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
    renderer.toneMappingExposure = 1.05;
    renderer.setClearColor(0x07080a, 1);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, innerWidth / innerHeight, 0.1, 400);

    scene.add(new THREE.AmbientLight(0xffffff, 1.6));
    const key = new THREE.DirectionalLight(0xdfefff, 1.1);
    key.position.set(6, 9, 12);
    scene.add(key);

    /* ---- node cards ---- */
    const CARD_W = 6.2, CARD_H = 3.6, SPAN = 11.5;
    const cards = [];
    const cardGroup = new THREE.Group();
    scene.add(cardGroup);

    function cardTexture(i){
      const W = 384, H = 288;
      const cv = document.createElement("canvas");
      cv.width = W; cv.height = H;
      const c = cv.getContext("2d");
      const r = 10;
      // body
      c.fillStyle = "#0e1116";
      c.beginPath();
      c.moveTo(r, 0); c.lineTo(W - r, 0); c.quadraticCurveTo(W, 0, W, r);
      c.lineTo(W, H - r); c.quadraticCurveTo(W, H, W - r, H);
      c.lineTo(r, H); c.quadraticCurveTo(0, H, 0, H - r);
      c.lineTo(0, r); c.quadraticCurveTo(0, 0, r, 0);
      c.closePath(); c.fill();
      // thumbnail
      const shot = shotCanvas(SHOTS[i]);
      c.drawImage(shot, 12, 12, W - 24, H - 78);
      // title bar
      c.fillStyle = "#151a21";
      c.fillRect(12, H - 60, W - 24, 46);
      c.fillStyle = "#e5e7eb";
      c.font = "500 24px 'JetBrains Mono', ui-monospace, monospace";
      c.fillText(NODES[i].name, 24, H - 30);
      // position in the pipeline, burnt into the node the way a slate carries a take number
      c.fillStyle = "rgba(156,163,175,.7)";
      c.font = "500 16px 'JetBrains Mono', ui-monospace, monospace";
      c.fillText(`${String(i + 1).padStart(2, "0")}/08`, W - 128, H - 31);
      // the two viewer pips Fusion puts on every node
      for(let k = 0; k < 2; k++){
        c.beginPath();
        c.arc(W - 46 + k * 22, H - 36, 6, 0, Math.PI * 2);
        c.fillStyle = k === 0 ? "rgba(255,255,255,.18)" : "rgba(255,255,255,.10)";
        c.fill();
      }
      const t = new THREE.CanvasTexture(cv);
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = 4;
      return t;
    }

    const cardGeo = new THREE.PlaneGeometry(CARD_W, CARD_H);
    for(let i = 0; i < NODES.length; i++){
      const mat = new THREE.MeshBasicMaterial({ map:cardTexture(i), transparent:true });
      const m = new THREE.Mesh(cardGeo, mat);
      const z = [0, 2.4, -2.2, 3.0, -1.4, 2.0, -2.6, 0.6][i];
      const y = [0, 1.5, -1.4, 1.9, -0.9, 1.3, -1.6, 0.4][i];
      m.position.set(i * SPAN, y, z);
      m.userData.base = m.position.clone();
      cardGroup.add(m);
      cards.push(m);

      // selection frame, lit only when the node is active
      const frameGeo = new THREE.PlaneGeometry(CARD_W + 0.15, CARD_H + 0.15);
      const frameMat = new THREE.MeshBasicMaterial({
        color:new THREE.Color(i % 3 === 0 ? 0x22d3ee : i % 3 === 1 ? 0xc084fc : 0xf472b6),
        transparent:true, opacity:0, blending:THREE.AdditiveBlending, depthWrite:false
      });
      const frame = new THREE.Mesh(frameGeo, frameMat);
      frame.position.copy(m.position);
      frame.position.z -= 0.004;
      frame.renderOrder = -1;
      cardGroup.add(frame);
      m.userData.frame = frame;
    }

    /* ---- wires ---- */
    const wireMats = [];
    for(let i = 1; i < cards.length; i++){
      const a = cards[i - 1].position, b = cards[i].position;
      const mid = new THREE.Vector3().lerpVectors(a, b, 0.5);
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(a.x + CARD_W / 2, a.y, a.z),
        new THREE.Vector3(mid.x - 1.6, a.y * 0.7 + b.y * 0.3, (a.z + b.z) / 2 + 0.6),
        new THREE.Vector3(mid.x + 1.6, a.y * 0.3 + b.y * 0.7, (a.z + b.z) / 2 - 0.6),
        new THREE.Vector3(b.x - CARD_W / 2, b.y, b.z)
      ]);
      const mat = new THREE.ShaderMaterial({
        transparent:true, depthWrite:false, blending:THREE.AdditiveBlending,
        uniforms:{
          uTime:{ value:0 }, uOn:{ value:0 },
          uColor:{ value:new THREE.Color(0x22d3ee) }
        },
        vertexShader:`
          varying vec2 vUv;
          void main(){
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }`,
        fragmentShader:`
          uniform float uTime, uOn;
          uniform vec3 uColor;
          varying vec2 vUv;
          void main(){
            float dash = pow(fract(vUv.x * 1.6 - uTime * 0.30), 9.0);
            float base = 0.10 + 0.30 * uOn;
            float lit = base + dash * 2.6 * uOn;
            // fade the wire in from its upstream end as the node switches on
            lit *= smoothstep(0.0, 0.35, uOn * 1.4 - vUv.x * 0.35);
            gl_FragColor = vec4(uColor * lit, lit);
          }`
      });
      const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 42, 0.045, 6, false), mat);
      cardGroup.add(tube);
      wireMats.push(mat);
    }

    /* ---- node-editor grid, receding into the dark ---- */
    const gridMat = new THREE.ShaderMaterial({
      transparent:true, depthWrite:false,
      uniforms:{ uLift:{ value:0 } },
      vertexShader:`
        varying vec3 vW;
        void main(){
          vec4 wp = modelMatrix * vec4(position, 1.0);
          vW = wp.xyz;
          gl_Position = projectionMatrix * viewMatrix * wp;
        }`,
      fragmentShader:`
        uniform float uLift;
        varying vec3 vW;
        void main(){
          vec2 g = abs(fract(vW.xz / 4.0) - 0.5);
          float dot = smoothstep(0.46, 0.5, max(g.x, g.y));
          float fade = smoothstep(90.0, 12.0, length(vW.xz - vec2(vW.x, 0.0)) + abs(vW.z));
          float a = dot * fade * (0.10 + uLift * 0.22);
          gl_FragColor = vec4(mix(vec3(0.35,0.55,0.65), vec3(0.55,0.4,0.7), uLift) * a, a);
        }`
    });
    const grid = new THREE.Mesh(new THREE.PlaneGeometry(320, 160, 1, 1), gridMat);
    grid.rotation.x = -Math.PI / 2;
    grid.position.set((NODES.length - 1) * SPAN / 2, -7.5, 0);
    scene.add(grid);

    /* ---- backdrop: a slow field of light behind the whole comp ---- */
    const GRAPH_MID = (NODES.length - 1) * SPAN / 2;
    const bg = new THREE.Group();
    bg.position.x = GRAPH_MID;
    scene.add(bg);

    const liquidMat = new THREE.ShaderMaterial({
      side:THREE.BackSide, depthWrite:false,
      uniforms:{
        uTime:{ value:0 }, uProg:{ value:0 },
        uA:{ value:new THREE.Color(0x0f7d99) },
        uB:{ value:new THREE.Color(0x7a4bb0) },
        uC:{ value:new THREE.Color(0xb04a78) },
        uBase:{ value:new THREE.Color(0x07080a) }
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
        uniform vec3 uA, uB, uC, uBase;
        varying vec3 vW;
        float flow(vec2 p, float t){
          float a = 0.0;
          vec2 q = p;
          for(int i = 0; i < 4; i++){
            q += vec2(sin(q.y * 1.5 + t * 0.26), cos(q.x * 1.3 - t * 0.21)) * 0.55;
            a += sin(q.x * 0.85 + q.y * 1.05 + t * 0.17) * 0.25;
          }
          return a * 0.5 + 0.5;
        }
        void main(){
          vec2 p = vW.xy * 0.055 + vec2(vW.z * 0.022, vW.z * 0.012);
          float t = uTime * 0.5 + uProg * 2.4;
          float f = flow(p, t);
          float g = flow(p * 1.8 + 3.7, t * 0.7);
          vec3 col = mix(uA, uB, smoothstep(0.24, 0.74, f));
          col = mix(col, uC, smoothstep(0.48, 0.96, g));
          float body = pow(smoothstep(0.20, 1.0, f * 0.6 + g * 0.5), 3.4);
          float band = smoothstep(42.0, 4.0, abs(vW.y));
          vec3 dir = normalize(vW);
          float off = 0.18 + 0.82 * smoothstep(0.12, 0.82, length(dir.xy));
          gl_FragColor = vec4(uBase + col * body * 0.34 * band * off, 1.0);
        }`
    });
    const liquid = new THREE.Mesh(new THREE.SphereGeometry(120, 40, 26), liquidMat);
    liquid.renderOrder = -3;
    bg.add(liquid);

    /* ---- ghost nodes: the rest of the comp, far out of focus ---- */
    function ghostTexture(){
      const W = 160, H = 104;
      const cv = document.createElement("canvas");
      cv.width = W; cv.height = H;
      const c = cv.getContext("2d");
      c.strokeStyle = "rgba(190,220,240,.85)";
      c.lineWidth = 3;
      c.strokeRect(6, 6, W - 12, H - 12);
      c.fillStyle = "rgba(150,190,215,.30)";
      c.fillRect(6, H - 30, W - 12, 24);
      c.fillStyle = "rgba(200,230,245,.55)";
      c.fillRect(18, H - 21, 62, 6);
      const t = new THREE.CanvasTexture(cv);
      t.colorSpace = THREE.SRGBColorSpace;
      return t;
    }
    const ghostMat = new THREE.MeshBasicMaterial({
      map:ghostTexture(), transparent:true, opacity:0.11,
      blending:THREE.AdditiveBlending, depthWrite:false
    });
    const GH = innerWidth < 700 ? 26 : 46;
    const ghosts = new THREE.InstancedMesh(new THREE.PlaneGeometry(3.4, 2.2), ghostMat, GH);
    ghosts.renderOrder = -2;
    const dummy = new THREE.Object3D();
    for(let i = 0; i < GH; i++){
      const depth = -38 - Math.random() * 62;
      dummy.position.set(
        (Math.random() - 0.5) * 190,
        (Math.random() - 0.5) * 46,
        depth
      );
      const s = 1 + Math.random() * 2.2;
      dummy.scale.set(s, s, 1);
      dummy.rotation.z = (Math.random() - 0.5) * 0.05;
      dummy.updateMatrix();
      ghosts.setMatrixAt(i, dummy.matrix);
    }
    ghosts.instanceMatrix.needsUpdate = true;
    bg.add(ghosts);

    /* ---- two soft sources with anamorphic streaks ---- */
    function softTexture(){
      const cv = document.createElement("canvas");
      cv.width = cv.height = 128;
      const c = cv.getContext("2d");
      const g = c.createRadialGradient(64, 64, 0, 64, 64, 64);
      g.addColorStop(0, "rgba(255,255,255,1)");
      g.addColorStop(0.3, "rgba(255,255,255,.45)");
      g.addColorStop(1, "rgba(255,255,255,0)");
      c.fillStyle = g; c.fillRect(0, 0, 128, 128);
      const t = new THREE.CanvasTexture(cv);
      t.colorSpace = THREE.SRGBColorSpace;
      return t;
    }
    function streakTexture(){
      const cv = document.createElement("canvas");
      cv.width = 512; cv.height = 64;
      const c = cv.getContext("2d");
      const g = c.createLinearGradient(0, 0, 512, 0);
      g.addColorStop(0, "rgba(255,255,255,0)");
      g.addColorStop(0.5, "rgba(255,255,255,1)");
      g.addColorStop(1, "rgba(255,255,255,0)");
      c.fillStyle = g;
      c.globalAlpha = 0.15; c.fillRect(0, 18, 512, 28);
      c.globalAlpha = 0.42; c.fillRect(0, 28, 512, 8);
      c.globalAlpha = 1.0;  c.fillRect(0, 31, 512, 2);
      const t = new THREE.CanvasTexture(cv);
      t.colorSpace = THREE.SRGBColorSpace;
      return t;
    }
    const softTex = softTexture(), streakTex = streakTexture();
    const softs = [], streaks = [];
    for(const [hex, x, y, z, s] of [[0x22d3ee, -34, 9, -46, 30], [0xf472b6, 30, -10, -54, 36]]){
      const glow = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({
        map:softTex, color:hex, transparent:true, opacity:0.13,
        blending:THREE.AdditiveBlending, depthWrite:false
      }));
      glow.position.set(x, y, z);
      glow.scale.setScalar(s);
      glow.renderOrder = -2;
      softs.push(glow); bg.add(glow);

      const fl = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({
        map:streakTex, color:hex, transparent:true, opacity:0.22,
        blending:THREE.AdditiveBlending, depthWrite:false
      }));
      fl.position.set(x, y, z + 2);
      fl.scale.set(72, 5, 1);
      fl.renderOrder = -2;
      streaks.push(fl); bg.add(fl);
    }

    /* ---- drifting dust, so the dolly reads ---- */
    const DUST = 220;
    const dPos = new Float32Array(DUST * 3);
    for(let i = 0; i < DUST; i++){
      dPos[i * 3]     = Math.random() * (NODES.length + 1) * SPAN - SPAN;
      dPos[i * 3 + 1] = (Math.random() - 0.5) * 22;
      dPos[i * 3 + 2] = (Math.random() - 0.5) * 34;
    }
    const dGeo = new THREE.BufferGeometry();
    dGeo.setAttribute("position", new THREE.BufferAttribute(dPos, 3));
    const dust = new THREE.Points(dGeo, new THREE.PointsMaterial({
      size:0.055, color:0x9fc4d8, transparent:true, opacity:0.5,
      blending:THREE.AdditiveBlending, depthWrite:false
    }));
    scene.add(dust);

    /* ---------- postprocess ---------- */
    const fsGeo = new THREE.PlaneGeometry(2, 2);
    const fsCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const fsScene = new THREE.Scene();
    const fsQuad = new THREE.Mesh(fsGeo, null);
    fsScene.add(fsQuad);
    function pass(material, target){
      fsQuad.material = material;
      renderer.setRenderTarget(target || null);
      renderer.render(fsScene, fsCam);
    }

    const rtOpts = { minFilter:THREE.LinearFilter, magFilter:THREE.LinearFilter, depthBuffer:true };
    let rtScene = new THREE.WebGLRenderTarget(1, 1, rtOpts);
    rtScene.texture.colorSpace = THREE.SRGBColorSpace;
    let rtA = new THREE.WebGLRenderTarget(1, 1, { ...rtOpts, depthBuffer:false });
    let rtB = new THREE.WebGLRenderTarget(1, 1, { ...rtOpts, depthBuffer:false });

    const brightMat = new THREE.ShaderMaterial({
      uniforms:{ uMap:{ value:null }, uCut:{ value:0.62 } },
      vertexShader:`varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`,
      fragmentShader:`
        uniform sampler2D uMap; uniform float uCut;
        varying vec2 vUv;
        void main(){
          vec3 c = texture2D(uMap, vUv).rgb;
          float l = dot(c, vec3(0.2126, 0.7152, 0.0722));
          gl_FragColor = vec4(c * smoothstep(uCut, uCut + 0.35, l), 1.0);
        }`
    });

    const blurMat = new THREE.ShaderMaterial({
      uniforms:{ uMap:{ value:null }, uDir:{ value:new THREE.Vector2(1, 0) }, uTexel:{ value:new THREE.Vector2() } },
      vertexShader:`varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`,
      fragmentShader:`
        uniform sampler2D uMap; uniform vec2 uDir, uTexel;
        varying vec2 vUv;
        void main(){
          vec2 o = uDir * uTexel;
          vec3 s = texture2D(uMap, vUv).rgb * 0.227;
          s += (texture2D(uMap, vUv + o * 1.385).rgb + texture2D(uMap, vUv - o * 1.385).rgb) * 0.316;
          s += (texture2D(uMap, vUv + o * 3.231).rgb + texture2D(uMap, vUv - o * 3.231).rgb) * 0.070;
          gl_FragColor = vec4(s, 1.0);
        }`
    });

    const compMat = new THREE.ShaderMaterial({
      uniforms:{
        uScene:{ value:null }, uBloom:{ value:null },
        uGrade:{ value:0 }, uGlow:{ value:0 }, uMatte:{ value:0 },
        uVig:{ value:0.35 }, uAber:{ value:0 }, uTime:{ value:0 }
      },
      vertexShader:`varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`,
      fragmentShader:`
        uniform sampler2D uScene, uBloom;
        uniform float uGrade, uGlow, uMatte, uVig, uAber, uTime;
        varying vec2 vUv;

        vec3 gradeShot(vec3 c){
          // lift the shadows toward teal, push highlights toward magenta — a print-style grade
          vec3 lift = vec3(-0.012, 0.006, 0.030);
          vec3 gain = vec3(1.10, 0.97, 1.06);
          vec3 g = (c + lift) * gain;
          float l = dot(g, vec3(0.2126, 0.7152, 0.0722));
          return mix(vec3(l), g, 1.22);                       // a touch more saturation
        }

        void main(){
          vec2 uv = vUv;
          vec2 off = (uv - 0.5) * uAber * 0.004;
          vec3 c;
          c.r = texture2D(uScene, uv + off).r;
          c.g = texture2D(uScene, uv).g;
          c.b = texture2D(uScene, uv - off).b;

          c = mix(c, gradeShot(c), uGrade);
          c += texture2D(uBloom, uv).rgb * uGlow * 1.5;

          // DeltaKeyer flips the viewer to the matte for a moment
          float l = dot(c, vec3(0.2126, 0.7152, 0.0722));
          c = mix(c, vec3(smoothstep(0.12, 0.34, l)), uMatte);

          float d = length((uv - 0.5) * vec2(1.0, 0.92));
          c *= 1.0 - uVig * smoothstep(0.34, 0.92, d);

          // a little grain so the flat areas do not band
          float n = fract(sin(dot(uv * 1024.0 + uTime, vec2(12.9898, 78.233))) * 43758.545);
          c += (n - 0.5) * 0.016;

          gl_FragColor = vec4(c, 1.0);
        }`
    });

    /* ---------- camera path along the graph ---------- */
    const END_X = (NODES.length - 1) * SPAN;
    const camPts = [], lookPts = [];
    for(let i = 0; i < NODES.length; i++){
      const c = cards[i].position;
      camPts.push(new THREE.Vector3(c.x - 1.9, c.y * 0.45 + 1.1, c.z + 13.5));
      lookPts.push(new THREE.Vector3(c.x, c.y * 0.75, c.z));
    }
    const camCurve = new THREE.CatmullRomCurve3(camPts);
    const lookCurve = new THREE.CatmullRomCurve3(lookPts);
    const camPos = new THREE.Vector3(), lookAt = new THREE.Vector3();

    // which half of the frame the graph sits in, act by act — always opposite the copy
    const SIDE = [[0.0, 1], [0.2, -1], [0.4, 1], [0.6, -1], [0.8, 1], [0.97, -0.9]];
    function sideAt(p){
      if(p <= SIDE[0][0]) return SIDE[0][1];
      if(p >= SIDE[SIDE.length - 1][0]) return SIDE[SIDE.length - 1][1];
      for(let i = 0; i < SIDE.length - 1; i++){
        if(p <= SIDE[i + 1][0]){
          const t = smoothstep((p - SIDE[i][0]) / (SIDE[i + 1][0] - SIDE[i][0]));
          return SIDE[i][1] + (SIDE[i + 1][1] - SIDE[i][1]) * t;
        }
      }
      return 0;
    }

    /* ---------- pointer parallax ---------- */
    let px = 0, py = 0, tpx = 0, tpy = 0;
    if(!REDUCED && matchMedia("(pointer:fine)").matches){
      on(window, "pointermove", e => {
        tpx = (e.clientX / innerWidth - 0.5) * 2;
        tpy = (e.clientY / innerHeight - 0.5) * 2;
      }, { passive:true });
    }

    /* ---------- resize ---------- */
    let portrait = false, stripH = 76;
    function resize(){
      const w = innerWidth, h = innerHeight;
      const dpr = Math.min(devicePixelRatio, 1.75);
      renderer.setPixelRatio(dpr);
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      portrait = camera.aspect < 0.85;
      camera.fov = portrait ? 52 : 38;
      camera.updateProjectionMatrix();

      const pw = Math.max(2, Math.floor(w * dpr)), ph = Math.max(2, Math.floor(h * dpr));
      rtScene.setSize(pw, ph);
      const bw = Math.max(2, Math.floor(pw / 2)), bh = Math.max(2, Math.floor(ph / 2));
      rtA.setSize(bw, bh);
      rtB.setSize(bw, bh);
      blurMat.uniforms.uTexel.value.set(1 / bw, 1 / bh);

      stripH = stripEl.offsetHeight;
      document.documentElement.style.setProperty("--strip", `${stripH}px`);
    }
    resize();
    on(window, "resize", resize);

    /* ---------- loop ---------- */
    const clock = new THREE.Clock();
    const frameColor = new THREE.Color();
    const insAnchor = new THREE.Vector3();

    function frame(){
      if(disposed) return;
      requestAnimationFrame(frame);

      smooth += (raw - smooth) * (REDUCED ? 1 : 0.12);
      if(Math.abs(raw - smooth) < 0.00012) smooth = raw;
      if(scrollY > trackLength() + innerHeight * 0.4) return;

      const t = clock.getElapsedTime();
      const p = smooth;

      px += (tpx - px) * 0.06;
      py += (tpy - py) * 0.06;

      const gp = graphPos(p);
      const u = (gp.i + smoothstep(gp.t)) / (NODES.length - 1);
      camCurve.getPoint(u, camPos);
      lookCurve.getPoint(u, lookAt);
      // on the last act the copy owns the middle, so drop the card below it
      const endDrop = ramp(p, 0.86, 1.0) * 2.2;
      // nudge the whole framing up so the node strip never sits on the subject
      const liftY = (stripH * 0.5) * (2 * 13.5 * Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2)) / innerHeight;
      camera.position.set(
        camPos.x + px * 0.9,
        camPos.y - py * 0.5 - liftY + (REDUCED ? 0 : Math.sin(t * 0.4) * 0.09),
        camPos.z + (portrait ? 5.5 : 0) + endDrop * 1.1
      );
      // aim past the card so it lands on the half of the frame the copy is not using
      const side = sideAt(p);
      camera.lookAt(
        lookAt.x - side * (portrait ? 1.0 : 3.6),
        lookAt.y - liftY + endDrop - (portrait ? 0.25 : 1.15),
        lookAt.z
      );

      // node states drive both the cards and the image
      for(let i = 0; i < cards.length; i++){
        const on = ramp(p, NP[i] - 0.075, NP[i] - 0.005);
        const card = cards[i];
        card.material.opacity = 0.34 + 0.66 * on;
        card.userData.frame.material.opacity = 0.07 * on + 0.13 * on * (0.6 + 0.4 * Math.sin(t * 1.6 + i));
        card.position.y = card.userData.base.y + (REDUCED ? 0 : Math.sin(t * 0.5 + i * 1.3) * 0.12);
        card.userData.frame.position.y = card.position.y;
      }
      for(let i = 0; i < wireMats.length; i++){
        wireMats[i].uniforms.uOn.value = ramp(p, NP[i] - 0.02, NP[i + 1] - 0.03);
        wireMats[i].uniforms.uTime.value = REDUCED ? 0 : t;
        frameColor.setHSL(0.52 + i * 0.055, 0.72, 0.62);
        wireMats[i].uniforms.uColor.value.copy(frameColor);
      }

      const gradeOn = ramp(p, NP[1] - 0.06, NP[1] + 0.05);
      const matteOn = ramp(p, NP[2] - 0.05, NP[2]) * (1 - ramp(p, NP[2] + 0.02, NP[2] + 0.08));
      const bgOn    = ramp(p, NP[3] - 0.06, NP[3] + 0.04);
      const glowOn  = ramp(p, NP[5] - 0.06, NP[5] + 0.05);

      gridMat.uniforms.uLift.value = bgOn;
      compMat.uniforms.uGrade.value = gradeOn;
      compMat.uniforms.uMatte.value = matteOn * 0.78;
      compMat.uniforms.uGlow.value = glowOn;
      compMat.uniforms.uAber.value = 0.35 + glowOn * 0.95;
      compMat.uniforms.uVig.value = 0.30 + 0.14 * gradeOn;
      compMat.uniforms.uTime.value = t;

      vwStateEl.textContent = matteOn > 0.4 ? "Alpha · 1:1" : "RGB · 1:1";
      dust.rotation.y = t * 0.006;

      /* --- backdrop --- */
      liquidMat.uniforms.uTime.value = t;
      liquidMat.uniforms.uProg.value = p;
      bg.position.set(GRAPH_MID - px * 1.6, -py * 0.8, 0);
      ghosts.rotation.z = Math.sin(t * 0.03) * 0.01;
      for(let i = 0; i < softs.length; i++){
        const dir = i ? -1 : 1;
        softs[i].position.y = (i ? -10 : 9) + Math.sin(t * 0.17 + i * 2) * 3.2 * dir;
        streaks[i].position.y = softs[i].position.y;
        streaks[i].position.x = (i ? 30 : -34) + Math.sin(t * 0.11 + i * 1.4) * 6;
        streaks[i].material.opacity = 0.14 + 0.12 * Math.abs(Math.sin(t * 0.23 + i * 1.7));
      }

      /* --- inspector parks on the node the camera is parked on --- */
      const near = gp.t < 0.35 ? { i: gp.i, s: 1 - gp.t / 0.35 }
                 : gp.t > 0.65 ? { i: gp.i + 1, s: (gp.t - 0.65) / 0.35 }
                 : { i: -1, s: 0 };
      if(near.i < 0 || near.i >= cards.length || near.s < 0.03){
        insEl.style.opacity = "0";
      }else{
        fillInspector(near.i);
        const card = cards[near.i];
        insAnchor.set(card.position.x, card.position.y - CARD_H / 2, card.position.z).project(camera);
        const sx = (insAnchor.x * 0.5 + 0.5) * innerWidth;
        const sy = (-insAnchor.y * 0.5 + 0.5) * innerHeight;
        const pw = insEl.offsetWidth, ph = insEl.offsetHeight;
        const floor = innerHeight - stripH - ph - 14;
        let left, top;
        if(portrait){
          left = 13;
          top = Math.max(90, floor);
        }else if(sy + 20 + ph <= innerHeight - stripH - 14){
          // room under the card: hang the panel off its bottom edge
          left = Math.min(Math.max(sx - pw / 2, 20), innerWidth - pw - 20);
          top = Math.max(sy + 20, 88);
        }else{
          // no room below — park it on the opposite side so the card stays readable
          left = sx < innerWidth * 0.5 ? innerWidth - pw - 24 : 24;
          top = Math.max(floor, 88);
        }
        insEl.style.transform = `translate3d(${left.toFixed(1)}px, ${top.toFixed(1)}px, 0)`;
        insEl.style.opacity = (smoothstep(clamp01(near.s * 1.6)) * 0.97).toFixed(3);
      }

      // scene -> bloom -> composite
      renderer.setRenderTarget(rtScene);
      renderer.clear();
      renderer.render(scene, camera);

      if(glowOn > 0.01){
        brightMat.uniforms.uMap.value = rtScene.texture;
        pass(brightMat, rtA);
        blurMat.uniforms.uMap.value = rtA.texture;
        blurMat.uniforms.uDir.value.set(1, 0);
        pass(blurMat, rtB);
        blurMat.uniforms.uMap.value = rtB.texture;
        blurMat.uniforms.uDir.value.set(0, 1);
        pass(blurMat, rtA);
      }
      compMat.uniforms.uScene.value = rtScene.texture;
      compMat.uniforms.uBloom.value = rtA.texture;
      pass(compMat, null);

      updateOverlay(p);
    }
    frame();
  }
}

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
