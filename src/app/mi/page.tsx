'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getReportes, getCitas, getBadgeClass, formatFecha, type Reporte, type Cita } from '@/lib/localStorage';

// Perfil ficticio del demo
const PERFIL_DEMO = {
  nombre: 'María García López',
  correo: 'maria.garcia@ejemplo.com',
  telefono: '784 123 4567',
  colonia: 'Col. Centro',
  miembroDesde: '2025-06-15',
  avatar: null as string | null
};

export default function MiPage() {
  const router = useRouter();
  const [tab, setTab] = useState<'perfil' | 'reportes' | 'citas'>('perfil');
  const [reportes, setReportes] = useState<Reporte[]>([]);
  const [citas, setCitas] = useState<Cita[]>([]);
  const [filtroEstado, setFiltroEstado] = useState('Todos');
  const [reporteDetalle, setReporteDetalle] = useState<Reporte | null>(null);
  const [citaQR, setCitaQR] = useState<Cita | null>(null);

  useEffect(() => {
    setReportes(getReportes());
    setCitas(getCitas());
    // Check URL params for tab
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get('tab');
    if (tabParam === 'reportes' || tabParam === 'citas') setTab(tabParam);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('ciudadana_auth');
    router.push('/login');
  };

  const reportesFiltrados = filtroEstado === 'Todos'
    ? reportes
    : reportes.filter(r => r.estado === filtroEstado);

  const initials = PERFIL_DEMO.nombre.split(' ').map(n => n[0]).join('').slice(0, 2);

  return (
    <div className="animate-fade-in">
      {/* Profile header */}
      <div className="hero-gradient text-white px-4 pt-8 pb-16">
        <div className="container">
          <div className="flex items-center gap-4">
            <div className="avatar-ring">
              <div className="w-16 h-16 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center text-xl font-bold text-white">
                {initials}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-bold">{PERFIL_DEMO.nombre}</h1>
              <p className="text-white/60 text-sm">{PERFIL_DEMO.correo}</p>
            </div>
            <button
              onClick={handleLogout}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Cerrar sesión"
              title="Cerrar sesión"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="container -mt-8 relative z-10 pb-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="stat-card">
            <div className="text-2xl font-bold text-[var(--color-primary)]">{reportes.length}</div>
            <div className="text-[10px] text-[var(--text-secondary)] mt-0.5">Reportes</div>
          </div>
          <div className="stat-card">
            <div className="text-2xl font-bold text-[var(--color-accent)]">{citas.length}</div>
            <div className="text-[10px] text-[var(--text-secondary)] mt-0.5">Citas</div>
          </div>
          <div className="stat-card">
            <div className="text-2xl font-bold text-[var(--color-success)]">
              {reportes.filter(r => r.estado === 'Cerrado' || r.estado === 'Atendido').length}
            </div>
            <div className="text-[10px] text-[var(--text-secondary)] mt-0.5">Resueltos</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[var(--border-color)] mb-6 overflow-x-auto">
          {(['perfil', 'reportes', 'citas'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`tab-button whitespace-nowrap ${tab === t ? 'active' : ''}`}
            >
              {t === 'perfil' && (
                <span className="flex items-center gap-1.5">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                  Perfil
                </span>
              )}
              {t === 'reportes' && (
                <span className="flex items-center gap-1.5">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
                  Reportes ({reportes.length})
                </span>
              )}
              {t === 'citas' && (
                <span className="flex items-center gap-1.5">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                  Citas ({citas.length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ═══ TAB: PERFIL ═══ */}
        {tab === 'perfil' && (
          <div className="space-y-4 animate-fade-in">
            <div className="card p-5">
              <h3 className="text-sm font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                Datos personales
              </h3>
              <div className="space-y-3">
                {[
                  { label: 'Nombre', value: PERFIL_DEMO.nombre },
                  { label: 'Correo', value: PERFIL_DEMO.correo },
                  { label: 'Teléfono', value: PERFIL_DEMO.telefono },
                  { label: 'Colonia', value: PERFIL_DEMO.colonia },
                  { label: 'Registrado desde', value: new Date(PERFIL_DEMO.miembroDesde).toLocaleDateString('es-MX', { year: 'numeric', month: 'long' }) }
                ].map(item => (
                  <div key={item.label} className="flex justify-between items-center py-2 border-b border-[var(--border-color)] last:border-0">
                    <span className="text-xs text-[var(--text-secondary)]">{item.label}</span>
                    <span className="text-sm font-medium text-[var(--text-primary)]">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div className="card p-5">
              <h3 className="text-sm font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M12 1v6m0 6v6m5.66-14.66l-4.24 4.24m-2.83 2.83l-4.24 4.24M23 12h-6m-6 0H5m14.66 5.66l-4.24-4.24m-2.83-2.83L7.34 6.34" /></svg>
                Ajustes
              </h3>
              <div className="space-y-2">
                {[
                  {
                    href: '/accesibilidad', label: 'Accesibilidad', desc: 'Tamaño de texto, contraste', icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="m15 9-6 6" /><path d="m9 9 6 6" /></svg>
                    )
                  },
                  {
                    href: '/privacidad', label: 'Privacidad', desc: 'Tratamiento de datos', icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                    )
                  },
                  {
                    href: '/terminos', label: 'Términos de uso', desc: 'Condiciones del servicio', icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>
                    )
                  }
                ].map(link => (
                  <a key={link.href} href={link.href} className="flex items-center gap-3 p-3 rounded-xl hover:bg-[var(--color-neutral-100)] transition-colors no-underline group">
                    <div className="icon-container icon-container-sm bg-[var(--color-neutral-100)] text-[var(--text-secondary)] group-hover:text-[var(--color-primary)]">
                      {link.icon}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-[var(--text-primary)]">{link.label}</div>
                      <div className="text-xs text-[var(--text-secondary)]">{link.desc}</div>
                    </div>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="btn btn-outline w-full justify-center text-[var(--color-danger)] border-[var(--color-danger)] hover:bg-[var(--color-danger)] hover:text-white"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Cerrar sesión
            </button>
          </div>
        )}

        {/* ═══ TAB: REPORTES ═══ */}
        {tab === 'reportes' && (
          <div className="animate-fade-in">
            {/* Filter */}
            <div className="flex gap-2 overflow-x-auto pb-3 mb-4 -mx-1 px-1">
              {['Todos', 'Recibido', 'En proceso', 'Atendido', 'Cerrado'].map(estado => (
                <button
                  key={estado}
                  onClick={() => setFiltroEstado(estado)}
                  className={`btn btn-sm whitespace-nowrap ${filtroEstado === estado
                      ? 'btn-primary'
                      : 'bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-secondary)]'
                    }`}
                >
                  {estado}
                </button>
              ))}
            </div>

            {reportesFiltrados.length === 0 ? (
              <div className="card p-8 text-center">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-3">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
                </svg>
                <p className="text-sm text-[var(--text-secondary)]">No tienes reportes{filtroEstado !== 'Todos' ? ` con estado "${filtroEstado}"` : ''}</p>
                <a href="/reportar" className="btn btn-accent btn-sm mt-4">Crear un reporte</a>
              </div>
            ) : (
              <div className="space-y-3 stagger-children">
                {reportesFiltrados.map(reporte => (
                  <button
                    key={reporte.folio}
                    onClick={() => setReporteDetalle(reporte)}
                    className="card card-hover p-4 w-full text-left"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`badge ${getBadgeClass(reporte.estado)}`}>{reporte.estado}</span>
                          <span className="text-[10px] text-[var(--text-tertiary)] font-mono">{reporte.folio}</span>
                        </div>
                        <h3 className="text-sm font-semibold text-[var(--text-primary)] capitalize mb-0.5">
                          {reporte.categoria}
                        </h3>
                        <p className="text-xs text-[var(--text-secondary)] line-clamp-1">{reporte.direccion}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-[10px] text-[var(--text-tertiary)]">
                          {new Date(reporte.fecha).toLocaleDateString('es-MX', { day: 'numeric', month: 'short' })}
                        </div>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-2 ml-auto"><polyline points="9 18 15 12 9 6" /></svg>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ═══ TAB: CITAS ═══ */}
        {tab === 'citas' && (
          <div className="animate-fade-in">
            {citas.length === 0 ? (
              <div className="card p-8 text-center">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-3">
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <p className="text-sm text-[var(--text-secondary)]">No tienes citas programadas</p>
                <a href="/citas" className="btn btn-accent btn-sm mt-4">Agendar cita</a>
              </div>
            ) : (
              <div className="space-y-3 stagger-children">
                {citas.map(cita => (
                  <div key={cita.folio} className="card p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`badge ${getBadgeClass(cita.estado)}`}>{cita.estado}</span>
                        </div>
                        <h3 className="text-sm font-semibold text-[var(--text-primary)]">{cita.tramite}</h3>
                        <p className="text-xs text-[var(--text-secondary)]">{cita.dependencia} · {cita.sede}</p>
                        <p className="text-xs text-[var(--color-accent)] font-medium mt-1">
                          {new Date(cita.fechaHora).toLocaleDateString('es-MX', {
                            weekday: 'long', day: 'numeric', month: 'long',
                            hour: '2-digit', minute: '2-digit'
                          })}
                        </p>
                      </div>
                      <div className="flex flex-col gap-1.5 flex-shrink-0">
                        {cita.estado === 'Programada' && (
                          <button
                            onClick={() => setCitaQR(cita)}
                            className="btn btn-sm btn-outline"
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="5" height="5" x="3" y="3" rx="1" /><rect width="5" height="5" x="16" y="3" rx="1" /><rect width="5" height="5" x="3" y="16" rx="1" /><path d="M21 16h-3a2 2 0 0 0-2 2v3" /><path d="M21 21v.01" /><path d="M12 7v3a2 2 0 0 1-2 2H7" /><path d="M3 12h.01" /><path d="M12 3h.01" /><path d="M12 16v.01" /><path d="M16 12h1" /><path d="M21 12v.01" /><path d="M12 21v-1" /></svg>
                            QR
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ═══ MODAL: Detalle Reporte ═══ */}
      {reporteDetalle && (
        <div className="modal-overlay" onClick={() => setReporteDetalle(null)}>
          <div className="modal-content p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-[var(--text-primary)]">Detalle del reporte</h2>
              <button onClick={() => setReporteDetalle(null)} className="p-2 rounded-lg hover:bg-[var(--color-neutral-100)] transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className={`badge ${getBadgeClass(reporteDetalle.estado)}`}>{reporteDetalle.estado}</span>
                <span className="text-xs text-[var(--text-tertiary)] font-mono">{reporteDetalle.folio}</span>
              </div>

              <div>
                <div className="text-xs text-[var(--text-secondary)] mb-0.5">Categoría</div>
                <div className="text-sm font-semibold text-[var(--text-primary)] capitalize">{reporteDetalle.categoria}</div>
              </div>

              <div>
                <div className="text-xs text-[var(--text-secondary)] mb-0.5">Ubicación</div>
                <div className="text-sm text-[var(--text-primary)]">{reporteDetalle.direccion}</div>
              </div>

              <div>
                <div className="text-xs text-[var(--text-secondary)] mb-0.5">Descripción</div>
                <div className="text-sm text-[var(--text-primary)] leading-relaxed">{reporteDetalle.detalles}</div>
              </div>

              <div>
                <div className="text-xs text-[var(--text-secondary)] mb-0.5">Fecha de reporte</div>
                <div className="text-sm text-[var(--text-primary)]">{formatFecha(reporteDetalle.fecha)}</div>
              </div>

              {/* Timeline */}
              {reporteDetalle.notas && reporteDetalle.notas.length > 0 && (
                <div>
                  <div className="text-xs text-[var(--text-secondary)] mb-2">Seguimiento</div>
                  <div className="space-y-2">
                    {reporteDetalle.notas.map((nota, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-[var(--color-accent)] mt-1.5 flex-shrink-0" />
                        <div className="text-sm text-[var(--text-primary)]">{nota}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {reporteDetalle.calificacion && (
                <div>
                  <div className="text-xs text-[var(--text-secondary)] mb-1">Tu calificación</div>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map(n => (
                      <svg key={n} width="18" height="18" viewBox="0 0 24 24" fill={n <= reporteDetalle.calificacion! ? '#F59E0B' : 'none'} stroke={n <= reporteDetalle.calificacion! ? '#F59E0B' : 'var(--text-tertiary)'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ═══ MODAL: QR Cita ═══ */}
      {citaQR && (
        <div className="modal-overlay" onClick={() => setCitaQR(null)}>
          <div className="modal-content p-6 text-center" onClick={e => e.stopPropagation()}>
            <div className="flex justify-end mb-2">
              <button onClick={() => setCitaQR(null)} className="p-2 rounded-lg hover:bg-[var(--color-neutral-100)] transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>

            <div className="w-48 h-48 mx-auto bg-[var(--color-neutral-100)] rounded-2xl flex items-center justify-center mb-4">
              {/* Simulated QR */}
              <div className="grid grid-cols-8 gap-0.5 w-32 h-32">
                {Array.from({ length: 64 }).map((_, i) => (
                  <div key={i} className={`rounded-sm ${Math.random() > 0.4 ? 'bg-[var(--text-primary)]' : 'bg-transparent'}`} />
                ))}
              </div>
            </div>

            <h3 className="font-bold text-[var(--text-primary)] mb-1">{citaQR.tramite}</h3>
            <p className="text-sm text-[var(--text-secondary)]">{citaQR.dependencia}</p>
            <p className="text-xs text-[var(--color-accent)] font-medium mt-1">
              {new Date(citaQR.fechaHora).toLocaleDateString('es-MX', {
                weekday: 'long', day: 'numeric', month: 'long',
                hour: '2-digit', minute: '2-digit'
              })}
            </p>
            <p className="text-xs text-[var(--text-tertiary)] font-mono mt-3">{citaQR.folio}</p>

            <p className="text-xs text-[var(--text-secondary)] mt-4 leading-relaxed">
              Muestra este código al llegar a tu cita para agilizar tu atención.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
