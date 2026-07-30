// ============================================================
// AURORA – elegantní animované pozadí (nahrazuje video s dýmem)
// Chceš-li vrátit původní video, řekni si Claudovi o zálohu :)
// ============================================================
export const AnimatedBackground = () => (
  <div
    className="fixed inset-0 overflow-hidden pointer-events-none bg-dark"
    aria-hidden="true"
    role="presentation"
  >
    {/* Plující barevné záře */}
    <div className="aurora-blob aurora-1 w-[55vw] h-[55vw] top-[-15%] left-[-10%] bg-cyan-500/60" />
    <div className="aurora-blob aurora-2 w-[50vw] h-[50vw] bottom-[-20%] right-[-10%] bg-pink-500/50" />
    <div className="aurora-blob aurora-3 w-[45vw] h-[45vw] top-[30%] left-[35%] bg-purple-600/45" />

    {/* Jemné ztmavení pro čitelnost textu */}
    <div className="absolute inset-0 bg-dark/55" />

    {/* Vinětace – ztmavené okraje pro filmový dojem */}
    <div
      className="absolute inset-0"
      style={{
        background:
          'radial-gradient(ellipse at center, transparent 45%, rgba(10,10,10,0.75) 100%)',
      }}
    />
  </div>
);
