/* eslint-disable */
// ============================================================
//  LANDING – choreografie hlavní stránky (bez závislostí)
//  Vrací funkci pro úklid při odchodu ze stránky.
// ============================================================

export function initLanding(){
var disposed = false;
var offs = [];
var observers = [];
var on = function(t, ev, fn, opt){
  t.addEventListener(ev, fn, opt);
  offs.push(function(){ t.removeEventListener(ev, fn, opt); });
};


  var root = document.documentElement;
  root.classList.add("js");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var clamp = function(v,a,b){ return v<a?a:(v>b?b:v); };
  var smooth = function(v,a,b){ var t = clamp((v-a)/(b-a),0,1); return t*t*(3-2*t); };

  /* ---------- nav / progress / sticky cta ---------- */
  var nav = document.getElementById("nav");
  var prog = document.getElementById("prog");
  var mcta = document.getElementById("mcta");

  function chrome(){
    var y = window.pageYOffset || 0;
    if (nav) nav.classList.toggle("stuck", y > 16);
    var max = document.documentElement.scrollHeight - window.innerHeight;
    if (prog) prog.style.transform = "scaleX(" + (max > 0 ? clamp(y/max,0,1) : 0) + ")";
    if (mcta) mcta.classList.toggle("show", y > window.innerHeight * 0.9 && y < max - 380);
  }

  /* ---------- reveal ---------- */
  var rv = [].slice.call(document.querySelectorAll(".rv"));
  function showAll(){ rv.forEach(function(el){ el.classList.add("in"); }); }
  if ("IntersectionObserver" in window){
    var io = new IntersectionObserver(function(es){
      es.forEach(function(e){ if (e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    rv.forEach(function(el){ io.observe(el); });
    observers.push(io);
    setTimeout(showAll, 2200);
  } else { showAll(); }

  var steps = document.getElementById("steps");
  if (steps && "IntersectionObserver" in window){
    var so = new IntersectionObserver(function(es){
      es.forEach(function(e){
        if (!e.isIntersecting) return;
        [].slice.call(steps.children).forEach(function(s,i){ setTimeout(function(){ s.classList.add("lit"); }, i*160); });
        so.disconnect();
      });
    }, { threshold: 0.3 });
    so.observe(steps);
    observers.push(so);
  } else if (steps) {
    [].slice.call(steps.children).forEach(function(s){ s.classList.add("lit"); });
  }

  /* ---------- liquid FAQ ---------- */
  var items = [].slice.call(document.querySelectorAll(".lq-item"));
  items.forEach(function(item){
    var q = item.querySelector(".lq-q");
    if (!q) return;
    q.addEventListener("click", function(){
      var open = item.classList.contains("on");
      items.forEach(function(o){
        o.classList.remove("on");
        var b = o.querySelector(".lq-q"); if (b) b.setAttribute("aria-expanded","false");
      });
      if (!open){ item.classList.add("on"); q.setAttribute("aria-expanded","true"); }
    });
    q.addEventListener("pointermove", function(e){
      var r = q.getBoundingClientRect();
      q.style.setProperty("--mx", ((e.clientX - r.left) / r.width * 100).toFixed(1) + "%");
      q.style.setProperty("--my", ((e.clientY - r.top) / r.height * 100).toFixed(1) + "%");
    });
  });

  /* ---------- 3D hero engine ---------- */
  var hero  = document.getElementById("hero");
  var frames = [].slice.call(document.querySelectorAll(".frm"));
  var floor = document.getElementById("floor");
  var acts  = [
    { el: document.getElementById("act1"), s: 0.00, e: 0.30 },
    { el: document.getElementById("act2"), s: 0.36, e: 0.64 },
    { el: document.getElementById("act3"), s: 0.70, e: 1.26 }
  ];
  var tlPlay = document.getElementById("tlPlay");
  var tcNow  = document.getElementById("tcNow");
  var clips  = [].slice.call(document.querySelectorAll(".tl-clip"));
  var hint   = document.getElementById("hint");

  frames.forEach(function(f){
    f.baseZ = parseFloat(f.dataset.z);
    f.dx = parseFloat(f.dataset.x);
    f.dy = parseFloat(f.dataset.y);
    f.ry = parseFloat(f.dataset.ry);
  });

  function pad(n){ return n < 10 ? "0"+n : ""+n; }

  function paint(p){
    var vw = window.innerWidth, vh = window.innerHeight;
    var cam = p * 6900;

    for (var i=0;i<frames.length;i++){
      var f = frames[i], z = f.baseZ + cam;
      if (z > 460 || z < -7000){ f.style.opacity = 0; f.style.visibility = "hidden"; continue; }
      f.style.visibility = "visible";
      var o = smooth(z,-6400,-3800) * (1 - smooth(z,140,440));
      var x = f.dx * vw / 100, y = f.dy * vh / 100;
      f.style.opacity = o;
      f.style.transform = "translate(-50%,-50%) translate3d("+x.toFixed(1)+"px,"+y.toFixed(1)+"px,"+z.toFixed(1)+"px) rotateY("+f.ry+"deg)";
    }

    if (floor) floor.style.backgroundPositionY = (cam * 0.55).toFixed(0) + "px";

    for (var a=0;a<acts.length;a++){
      var A = acts[a];
      if (!A.el) continue;
      var span = A.e - A.s, t = (p - A.s) / span;
      var vis;
      if (t < 0 || t > 1) vis = 0;
      else vis = (A.s === 0 ? 1 : smooth(t,0,0.22)) * (1 - smooth(t,0.78,1));
      A.el.style.opacity = vis;
      A.el.style.transform = "translateY(" + ((0.42 - t) * 70).toFixed(1) + "px) scale(" + (0.965 + vis*0.035).toFixed(3) + ")";
      A.el.style.filter = vis < 0.98 ? "blur(" + ((1-vis)*5).toFixed(2) + "px)" : "none";
      A.el.style.pointerEvents = vis > 0.6 ? "auto" : "none";
    }

    if (tlPlay) tlPlay.style.left = (p*100).toFixed(2) + "%";
    if (clips.length){
      var idx = Math.min(9, Math.floor(p * 10));
      for (var c=0;c<clips.length;c++) clips[c].classList.toggle("on", c <= idx);
    }
    if (tcNow){
      var fr = Math.round(p * 24 * 25);
      tcNow.textContent = "00:00:" + pad(Math.floor(fr/25)) + ":" + pad(fr % 25);
    }
    if (hint) hint.style.opacity = p > 0.025 ? 0 : 0.8;
  }

  var target = 0, cur = 0, ticking = false;
  function measure(){
    if (!hero) return 0;
    var rect = hero.getBoundingClientRect();
    var total = hero.offsetHeight - window.innerHeight;
    return total > 0 ? clamp(-rect.top / total, 0, 1) : 0;
  }
  function loop(){
    if (disposed) return;
    cur += (target - cur) * 0.12;
    if (Math.abs(target - cur) < 0.0004) cur = target;
    paint(cur);
    if (Math.abs(target - cur) > 0.00005) { requestAnimationFrame(loop); }
    else { ticking = false; }
  }
  function onScroll(){
    chrome();
    if (reduce) return;
    target = measure();
    if (!ticking){ ticking = true; requestAnimationFrame(loop); }
  }

  if (reduce){
    frames.forEach(function(f){ f.style.opacity = 0; });
    if (acts[0].el){ acts[0].el.style.opacity = 1; }
  } else {
    paint(measure());
    cur = target = measure();
  }
  chrome();
  on(window, "scroll", onScroll, { passive: true });
  on(window, "resize", function(){ target = measure(); cur = target; if (!reduce) paint(cur); chrome(); });

return function(){
  disposed = true;
  offs.forEach(function(off){ off(); });
  observers.forEach(function(o){ try{ o.disconnect(); }catch(e){} });
  document.documentElement.classList.remove("js");
};
}
