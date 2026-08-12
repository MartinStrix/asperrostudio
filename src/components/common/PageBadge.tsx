// ============================================================
// Jednotné záhlaví stránek – odznak s ikonou a názvem sekce
// (stejný styl jako na stránce Videotvorba)
// ============================================================
import { ReactNode } from 'react';

export const PageBadge = ({ icon, label }: { icon: ReactNode; label: string }) => (
  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/15 text-cyan-400 text-sm font-medium mb-6">
    {icon}
    <span>{label}</span>
  </div>
);
