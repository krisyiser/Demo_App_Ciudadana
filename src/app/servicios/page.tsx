'use client';

import Link from 'next/link';

const SERVICIOS = [
  {
    titulo: 'Predial y Contribuciones',
    desc: 'Consulta, cálculo y pago de impuesto predial y contribuciones municipales.',
    color: '#1E3A5F',
    icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /></svg>),
    acciones: [
      { label: 'Consultar adeudo', href: '#' },
      { label: 'Agendar cita', href: '/citas' }
    ]
  },
  {
    titulo: 'Agua Potable',
    desc: 'Consulta de consumo, pago de servicio y reportes de fugas o fallas.',
    color: '#3B82F6',
    icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" /></svg>),
    acciones: [
      { label: 'Reportar fuga', href: '/reportar?categoria=agua' },
      { label: 'Agendar cita', href: '/citas' }
    ]
  },
  {
    titulo: 'Licencias y Permisos',
    desc: 'Solicitud y renovación de licencias comerciales, permisos de construcción y uso de suelo.',
    color: '#10B981',
    icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>),
    acciones: [
      { label: 'Ver requisitos', href: '#' },
      { label: 'Agendar cita', href: '/citas' }
    ]
  },
  {
    titulo: 'Registro Civil',
    desc: 'Actas de nacimiento, matrimonio, defunción y correcciones.',
    color: '#8B5CF6',
    icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>),
    acciones: [
      { label: 'Agendar cita', href: '/citas' }
    ]
  },
  {
    titulo: 'Protección Civil',
    desc: 'Información sobre riesgos, prevención y protocolos de emergencia.',
    color: '#EF4444',
    icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>),
    acciones: [
      { label: 'Ver alertas', href: '/alertas' },
      { label: 'Reportar riesgo', href: '/reportar?categoria=proteccion' }
    ]
  },
  {
    titulo: 'Desarrollo Urbano',
    desc: 'Catastro, avalúos, permisos de construcción y uso de suelo.',
    color: '#F97316',
    icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18" /><path d="M5 21V7l8-4v18" /><path d="M19 21V11l-6-4" /><path d="M9 9v.01" /><path d="M9 12v.01" /><path d="M9 15v.01" /><path d="M9 18v.01" /></svg>),
    acciones: [
      { label: 'Agendar cita', href: '/citas' }
    ]
  }
];

export default function ServiciosPage() {
  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="hero-gradient text-white px-4 pt-6 pb-12">
        <div className="container">
          <Link href="/" className="inline-flex items-center gap-1.5 text-white/60 text-sm hover:text-white/80 transition-colors mb-3 no-underline">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
            Inicio
          </Link>
          <h1 className="text-xl font-bold mb-1">Servicios municipales</h1>
          <p className="text-white/60 text-sm">Trámites, pagos y atención ciudadana</p>
        </div>
      </div>

      <div className="container -mt-6 relative z-10 pb-6">
        <div className="space-y-3 stagger-children">
          {SERVICIOS.map((srv) => (
            <div key={srv.titulo} className="card p-5">
              <div className="flex items-start gap-3 mb-3">
                <div className="icon-container icon-container-lg rounded-xl" style={{ backgroundColor: `${srv.color}12`, color: srv.color }}>
                  {srv.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-base font-bold text-[var(--text-primary)]">{srv.titulo}</h2>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed mt-0.5">{srv.desc}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {srv.acciones.map(a => (
                  <Link key={a.label} href={a.href} className="btn btn-sm btn-outline no-underline">
                    {a.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Emergency notice */}
        <div className="card p-4 mt-6 bg-red-50 border-red-200">
          <div className="flex items-start gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
            <div>
              <h3 className="text-sm font-bold text-red-800 mb-0.5">Emergencias</h3>
              <p className="text-xs text-red-700 leading-relaxed">
                Esta aplicación no sustituye al <strong>911</strong>. En caso de emergencia, marca directamente.
              </p>
            </div>
          </div>
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-2 gap-3 mt-6">
          <Link href="/mapa" className="card card-hover p-4 text-center no-underline">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-2"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" /><line x1="8" y1="2" x2="8" y2="18" /><line x1="16" y1="6" x2="16" y2="22" /></svg>
            <span className="text-sm font-semibold text-[var(--text-primary)]">Mapa</span>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5">Directorio de oficinas</p>
          </Link>
          <Link href="/noticias/1" className="card card-hover p-4 text-center no-underline">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-2"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" /><path d="M18 14h-8" /><path d="M15 18h-5" /><path d="M10 6h8v4h-8V6Z" /></svg>
            <span className="text-sm font-semibold text-[var(--text-primary)]">Noticias</span>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5">Avisos y comunicados</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
