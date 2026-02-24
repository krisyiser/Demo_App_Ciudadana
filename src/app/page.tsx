'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getReportes, getCitas, NOTICIAS_SEED, ALERTAS_SEED } from '@/lib/localStorage';

export default function HomePage() {
  const [misReportes, setMisReportes] = useState(0);
  const [misCitas, setMisCitas] = useState(0);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    setMisReportes(getReportes().length);
    setMisCitas(getCitas().length);
    try {
      const auth = JSON.parse(localStorage.getItem('ciudadana_auth') || '{}');
      setUserName(auth.name?.split(' ')[0] || 'Ciudadano');
    } catch { setUserName('Ciudadano'); }
  }, []);

  const accionesRapidas = [
    {
      id: 'bache', nombre: 'Bache', descripcion: 'Reportar un bache', color: '#F97316', icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20h16" /><path d="M8 16c0-2 1-4 4-4s4 2 4 4" /><circle cx="12" cy="9" r="2" /></svg>
      )
    },
    {
      id: 'alumbrado', nombre: 'Alumbrado', descripcion: 'Luminaria dañada', color: '#EAB308', icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" /><path d="M9 18h6" /><path d="M10 22h4" /></svg>
      )
    },
    {
      id: 'agua', nombre: 'Agua', descripcion: 'Fugas o brotes', color: '#3B82F6', icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" /></svg>
      )
    },
    {
      id: 'basura', nombre: 'Basura', descripcion: 'Recolección', color: '#22C55E', icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
      )
    },
    {
      id: 'proteccion', nombre: 'Riesgos', descripcion: 'Protección civil', color: '#EF4444', icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
      )
    },
    {
      id: 'denuncia', nombre: 'Denuncia', descripcion: 'No urgente', color: '#8B5CF6', icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
      )
    },
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Header */}
      <section className="hero-gradient text-white px-4 pt-8 pb-16">
        <div className="container">
          <div className="max-w-lg">
            <p className="text-sky-200/80 text-sm font-medium mb-1">Bienvenido, {userName}</p>
            <h1 className="text-2xl sm:text-3xl font-bold mb-3 leading-tight">
              Atención Ciudadana
            </h1>
            <p className="text-white/70 text-sm leading-relaxed mb-6 max-w-md">
              Reporta problemas, agenda citas y mantente informado sobre los servicios de tu municipio.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/reportar" className="btn btn-accent btn-lg">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                Reportar
              </Link>
              <Link href="/citas" className="btn btn-lg bg-white/10 border border-white/25 text-white hover:bg-white/20">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                Agendar cita
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="container -mt-8 relative z-10 pb-6">
        {/* Stats cards */}
        {(misReportes > 0 || misCitas > 0) && (
          <div className="grid grid-cols-2 gap-3 mb-6">
            <Link href="/mi?tab=reportes" className="stat-card no-underline">
              <div className="text-2xl font-bold text-[var(--color-primary)]">{misReportes}</div>
              <div className="text-xs text-[var(--text-secondary)] mt-1">Mis reportes</div>
            </Link>
            <Link href="/mi?tab=citas" className="stat-card no-underline">
              <div className="text-2xl font-bold text-[var(--color-accent)]">{misCitas}</div>
              <div className="text-xs text-[var(--text-secondary)] mt-1">Mis citas</div>
            </Link>
          </div>
        )}

        {/* Quick actions */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4">Acciones rápidas</h2>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 stagger-children">
            {accionesRapidas.map((accion) => (
              <Link
                key={accion.id}
                href={`/reportar?categoria=${accion.id}`}
                className="card card-hover p-3 text-center no-underline group"
              >
                <div
                  className="icon-container icon-container-md mx-auto mb-2 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${accion.color}12`, color: accion.color }}
                >
                  {accion.icon}
                </div>
                <h3 className="text-xs font-semibold text-[var(--text-primary)] leading-tight">
                  {accion.nombre}
                </h3>
              </Link>
            ))}
          </div>
        </section>

        {/* Active alerts */}
        {ALERTAS_SEED.filter(a => a.vigente).length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4">Avisos del día</h2>
            <div className="space-y-3 stagger-children">
              {ALERTAS_SEED.filter(a => a.vigente).map(alerta => (
                <div key={alerta.id} className="card p-4 border-l-4 border-l-amber-400">
                  <div className="flex items-start gap-3">
                    <div className="icon-container icon-container-sm bg-amber-50 text-amber-600 flex-shrink-0">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm text-[var(--text-primary)]">{alerta.titulo}</h3>
                      <p className="text-xs text-[var(--text-secondary)] mt-0.5">{alerta.mensaje}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* News */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-[var(--text-primary)]">Noticias</h2>
            <Link href="/noticias/1" className="text-xs font-semibold text-[var(--color-accent)] hover:underline">
              Ver todas →
            </Link>
          </div>
          <div className="space-y-3 stagger-children">
            {NOTICIAS_SEED.slice(0, 3).map((noticia) => (
              <Link
                key={noticia.id}
                href={`/noticias/${noticia.id}`}
                className="card card-hover p-4 block no-underline"
              >
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-20 h-20 bg-[var(--color-neutral-100)] rounded-xl overflow-hidden">
                    <img
                      src={noticia.imagen}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm text-[var(--text-primary)] mb-1 line-clamp-2">
                      {noticia.titulo}
                    </h3>
                    <p className="text-xs text-[var(--text-secondary)] mb-2 line-clamp-2">
                      {noticia.resumen}
                    </p>
                    <div className="flex items-center gap-2 text-[10px] text-[var(--text-tertiary)]">
                      <span>{new Date(noticia.fecha).toLocaleDateString('es-MX')}</span>
                      <span className="text-[var(--color-accent)] font-semibold">Leer más →</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Trust banner */}
        <section className="mb-4">
          <div className="card bg-[var(--bg-secondary)] p-4 text-center border-dashed">
            <div className="flex items-center justify-center gap-2 mb-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
              <span className="text-sm font-semibold text-[var(--text-primary)]">Tu información está protegida</span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed max-w-md mx-auto">
              Esta herramienta es gratuita. Tus reportes pueden ser anónimos y recibes seguimiento por folio.
              No atiende emergencias: en caso urgente marca <strong className="text-[var(--color-danger)]">911</strong>.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
