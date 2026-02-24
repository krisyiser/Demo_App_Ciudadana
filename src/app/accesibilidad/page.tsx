'use client';

import Link from 'next/link';
import { usePreferencias } from '@/hooks/usePreferencias';

export default function AccesibilidadPage() {
  const { preferencias, toggleTema, toggleContraste, setFontSize } = usePreferencias();

  return (
    <div className="animate-fade-in">
      <div className="hero-gradient text-white px-4 pt-6 pb-12">
        <div className="container">
          <Link href="/mi" className="inline-flex items-center gap-1.5 text-white/60 text-sm hover:text-white/80 transition-colors mb-3 no-underline">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
            Perfil
          </Link>
          <h1 className="text-xl font-bold mb-1">Accesibilidad</h1>
          <p className="text-white/60 text-sm">Personaliza la experiencia a tu medida</p>
        </div>
      </div>

      <div className="container -mt-6 relative z-10 pb-6 space-y-4">
        {/* Text size */}
        <div className="card p-5">
          <h2 className="text-sm font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 7 4 4 20 4 20 7" /><line x1="9" y1="20" x2="15" y2="20" /><line x1="12" y1="4" x2="12" y2="20" /></svg>
            Tamaño de texto
          </h2>
          <div className="grid grid-cols-3 gap-2">
            {([
              { value: 'small' as const, label: 'Pequeño', size: 'text-xs' },
              { value: 'medium' as const, label: 'Normal', size: 'text-sm' },
              { value: 'large' as const, label: 'Grande', size: 'text-base' },
            ]).map(opt => (
              <button
                key={opt.value}
                onClick={() => setFontSize(opt.value)}
                className={`p-3 rounded-xl border-2 transition-all text-center ${preferencias.fontSize === opt.value
                    ? 'border-[var(--color-accent)] bg-sky-50'
                    : 'border-[var(--border-color)]'
                  }`}
              >
                <span className={`${opt.size} font-semibold text-[var(--text-primary)]`}>Aa</span>
                <div className="text-[10px] text-[var(--text-secondary)] mt-1">{opt.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Theme */}
        <div className="card p-5">
          <h2 className="text-sm font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>
            Apariencia
          </h2>
          <button
            onClick={toggleTema}
            className="w-full flex items-center justify-between p-3 rounded-xl border border-[var(--border-color)] hover:bg-[var(--color-neutral-100)] transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">{preferencias.tema === 'dark' ? '🌙' : '☀️'}</span>
              <div className="text-left">
                <div className="text-sm font-medium text-[var(--text-primary)]">Modo oscuro</div>
                <div className="text-xs text-[var(--text-secondary)]">
                  {preferencias.tema === 'dark' ? 'Activado' : 'Desactivado'}
                </div>
              </div>
            </div>
            <div className={`w-12 h-7 rounded-full p-1 transition-colors ${preferencias.tema === 'dark' ? 'bg-[var(--color-accent)]' : 'bg-[var(--color-neutral-300)]'
              }`}>
              <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${preferencias.tema === 'dark' ? 'translate-x-5' : ''
                }`} />
            </div>
          </button>
        </div>

        {/* High contrast */}
        <div className="card p-5">
          <h2 className="text-sm font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 2a10 10 0 0 1 0 20" /></svg>
            Contraste
          </h2>
          <button
            onClick={toggleContraste}
            className="w-full flex items-center justify-between p-3 rounded-xl border border-[var(--border-color)] hover:bg-[var(--color-neutral-100)] transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">🔲</span>
              <div className="text-left">
                <div className="text-sm font-medium text-[var(--text-primary)]">Alto contraste</div>
                <div className="text-xs text-[var(--text-secondary)]">
                  {preferencias.contraste ? 'Activado' : 'Desactivado'}
                </div>
              </div>
            </div>
            <div className={`w-12 h-7 rounded-full p-1 transition-colors ${preferencias.contraste ? 'bg-[var(--color-accent)]' : 'bg-[var(--color-neutral-300)]'
              }`}>
              <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${preferencias.contraste ? 'translate-x-5' : ''
                }`} />
            </div>
          </button>
        </div>

        {/* Preview */}
        <div className="card p-5">
          <h2 className="text-sm font-bold text-[var(--text-primary)] mb-3">Vista previa</h2>
          <div className="card p-4 border-dashed">
            <h3 className="font-semibold text-[var(--text-primary)]">Título de ejemplo</h3>
            <p className="text-sm text-[var(--text-secondary)] mt-1 leading-relaxed">
              Este es un texto de ejemplo para visualizar los cambios. Puedes ajustar el tamaño, tema y contraste según tu preferencia.
            </p>
            <button className="btn btn-accent btn-sm mt-3">Botón de ejemplo</button>
          </div>
        </div>
      </div>
    </div>
  );
}
