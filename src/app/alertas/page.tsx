'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ALERTAS_SEED } from '@/lib/localStorage';

export default function AlertasPage() {
  const [suscripciones, setSuscripciones] = useState<string[]>([]);
  const colonias = ['Col. Centro', 'Col. Reforma', 'Col. Insurgentes', 'Col. San Juan', 'Col. Morelos'];

  const toggleSuscripcion = (col: string) => {
    setSuscripciones(prev => prev.includes(col) ? prev.filter(c => c !== col) : [...prev, col]);
  };

  const alertasVigentes = ALERTAS_SEED.filter(a => a.vigente);
  const alertasHistoricas = ALERTAS_SEED.filter(a => !a.vigente);

  const getAlertColor = (tipo: string) => {
    switch (tipo) {
      case 'Protección Civil': return '#EF4444';
      case 'Servicios': return '#3B82F6';
      case 'Vialidad': return '#F97316';
      default: return '#6B7280';
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="hero-gradient text-white px-4 pt-6 pb-12">
        <div className="container">
          <Link href="/" className="inline-flex items-center gap-1.5 text-white/60 text-sm hover:text-white/80 transition-colors mb-3 no-underline">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
            Inicio
          </Link>
          <h1 className="text-xl font-bold mb-1">Alertas y avisos</h1>
          <p className="text-white/60 text-sm">Información importante para la ciudadanía</p>
        </div>
      </div>

      <div className="container -mt-6 relative z-10 pb-6">
        {/* Active alerts */}
        {alertasVigentes.length > 0 && (
          <section className="mb-6">
            <h2 className="text-sm font-bold text-[var(--text-primary)] mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              Alertas vigentes
            </h2>
            <div className="space-y-3 stagger-children">
              {alertasVigentes.map(a => (
                <div key={a.id} className="card p-4 border-l-4" style={{ borderLeftColor: getAlertColor(a.tipo) }}>
                  <div className="flex items-start gap-3">
                    <div className="icon-container icon-container-sm rounded-lg flex-shrink-0" style={{ backgroundColor: `${getAlertColor(a.tipo)}15`, color: getAlertColor(a.tipo) }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold" style={{ color: getAlertColor(a.tipo) }}>{a.tipo}</span>
                      </div>
                      <h3 className="text-sm font-semibold text-[var(--text-primary)]">{a.titulo}</h3>
                      <p className="text-xs text-[var(--text-secondary)] mt-0.5 leading-relaxed">{a.mensaje}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Historical */}
        {alertasHistoricas.length > 0 && (
          <section className="mb-6">
            <h2 className="text-sm font-bold text-[var(--text-primary)] mb-3">Historial</h2>
            <div className="space-y-3">
              {alertasHistoricas.map(a => (
                <div key={a.id} className="card p-4 opacity-60">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-[var(--text-tertiary)]">{a.tipo}</span>
                    <span className="text-xs text-[var(--text-tertiary)]">·</span>
                    <span className="text-xs text-[var(--text-tertiary)]">{a.fecha}</span>
                  </div>
                  <h3 className="text-sm font-medium text-[var(--text-primary)]">{a.titulo}</h3>
                  <p className="text-xs text-[var(--text-secondary)]">{a.mensaje}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Subscriptions */}
        <section className="mb-6">
          <h2 className="text-sm font-bold text-[var(--text-primary)] mb-3">Notificaciones por colonia</h2>
          <div className="card p-4">
            <p className="text-xs text-[var(--text-secondary)] mb-3">Recibe alertas relevantes para tu zona:</p>
            <div className="space-y-2">
              {colonias.map(col => (
                <label key={col} className="flex items-center gap-3 p-2 rounded-lg hover:bg-[var(--color-neutral-100)] transition-colors cursor-pointer">
                  <input
                    type="checkbox"
                    checked={suscripciones.includes(col)}
                    onChange={() => toggleSuscripcion(col)}
                    className="w-4 h-4 rounded accent-[var(--color-accent)]"
                  />
                  <span className="text-sm text-[var(--text-primary)]">{col}</span>
                </label>
              ))}
            </div>
          </div>
        </section>

        {/* Emergency contacts */}
        <section>
          <div className="card p-4 bg-red-50 border-red-200">
            <h3 className="text-sm font-bold text-red-800 mb-2">Contactos de emergencia</h3>
            <div className="space-y-1.5 text-xs text-red-700">
              <p><strong>911</strong> — Emergencias</p>
              <p><strong>089</strong> — Denuncia anónima</p>
              <p><strong>066</strong> — Seguridad pública</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
