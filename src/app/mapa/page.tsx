'use client';

import Link from 'next/link';
import { useState } from 'react';

const UBICACIONES = [
  {
    id: '1', nombre: 'Palacio Municipal', tipo: 'gobierno',
    direccion: 'Plaza de la Constitución S/N, Col. Centro',
    telefono: '784-842-0001', horario: 'L-V 8:00 - 15:00',
    servicios: ['Tesorería', 'Catastro', 'Desarrollo Urbano', 'Presidencia'],
    lat: 20.4511, lng: -97.315
  },
  {
    id: '2', nombre: 'Centro de Salud', tipo: 'salud',
    direccion: 'Av. 20 de Noviembre 15, Col. Centro',
    telefono: '784-842-1234', horario: 'L-V 7:00 - 19:00',
    servicios: ['Consulta general', 'Vacunación', 'Laboratorio'],
    lat: 20.4522, lng: -97.316
  },
  {
    id: '3', nombre: 'Comandancia de Policía', tipo: 'seguridad',
    direccion: 'Calle Reforma 50, Col. Centro',
    telefono: '784-842-0911', horario: '24 horas',
    servicios: ['Seguridad pública', 'Denuncias', 'Tránsito'],
    lat: 20.4505, lng: -97.314
  },
  {
    id: '4', nombre: 'Casa de la Cultura', tipo: 'cultura',
    direccion: 'Av. Juárez 8, Col. Centro',
    telefono: '784-842-3456', horario: 'L-S 9:00 - 18:00',
    servicios: ['Talleres', 'Exposiciones', 'Biblioteca'],
    lat: 20.453, lng: -97.318
  },
  {
    id: '5', nombre: 'DIF Municipal', tipo: 'gobierno',
    direccion: 'Calle 5 de Mayo 22, Col. Centro',
    telefono: '784-842-2345', horario: 'L-V 8:00 - 16:00',
    servicios: ['Asistencia social', 'Programas alimentarios', 'Atención a la familia'],
    lat: 20.4518, lng: -97.3165
  }
];

const TIPOS = [
  { id: 'todos', label: 'Todos', color: 'var(--color-primary)' },
  { id: 'gobierno', label: 'Gobierno', color: '#1E3A5F' },
  { id: 'salud', label: 'Salud', color: '#10B981' },
  { id: 'seguridad', label: 'Seguridad', color: '#EF4444' },
  { id: 'cultura', label: 'Cultura', color: '#8B5CF6' },
];

export default function MapaPage() {
  const [filtro, setFiltro] = useState('todos');
  const [seleccionado, setSeleccionado] = useState<string | null>(null);

  const ubicacionesFiltradas = filtro === 'todos'
    ? UBICACIONES
    : UBICACIONES.filter(u => u.tipo === filtro);

  const sel = UBICACIONES.find(u => u.id === seleccionado);

  return (
    <div className="animate-fade-in">
      <div className="hero-gradient text-white px-4 pt-6 pb-12">
        <div className="container">
          <Link href="/" className="inline-flex items-center gap-1.5 text-white/60 text-sm hover:text-white/80 transition-colors mb-3 no-underline">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
            Inicio
          </Link>
          <h1 className="text-xl font-bold mb-1">Directorio y mapa</h1>
          <p className="text-white/60 text-sm">Oficinas y servicios municipales</p>
        </div>
      </div>

      <div className="container -mt-6 relative z-10 pb-6">
        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-4">
          {TIPOS.map(t => (
            <button
              key={t.id}
              onClick={() => setFiltro(t.id)}
              className={`btn btn-sm whitespace-nowrap ${filtro === t.id ? 'btn-primary' : 'bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-secondary)]'
                }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Map placeholder */}
        <div className="card p-0 overflow-hidden mb-4 h-48 bg-[var(--color-neutral-100)] flex items-center justify-center">
          <div className="text-center">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-2">
              <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
              <line x1="8" y1="2" x2="8" y2="18" />
              <line x1="16" y1="6" x2="16" y2="22" />
            </svg>
            <p className="text-sm text-[var(--text-tertiary)]">Mapa interactivo</p>
          </div>
        </div>

        {/* Locations list */}
        <div className="space-y-3 stagger-children">
          {ubicacionesFiltradas.map(u => {
            const tipoObj = TIPOS.find(t => t.id === u.tipo);
            return (
              <button
                key={u.id}
                onClick={() => setSeleccionado(u.id === seleccionado ? null : u.id)}
                className={`card p-4 w-full text-left transition-all ${seleccionado === u.id ? 'border-[var(--color-accent)]' : 'card-hover'
                  }`}
              >
                <div className="flex items-start gap-3">
                  <div className="icon-container icon-container-md rounded-lg flex-shrink-0" style={{ backgroundColor: `${tipoObj?.color || '#6B7280'}15`, color: tipoObj?.color }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-[var(--text-primary)]">{u.nombre}</h3>
                    <p className="text-xs text-[var(--text-secondary)]">{u.direccion}</p>
                    <p className="text-xs text-[var(--text-tertiary)] mt-0.5">{u.horario}</p>
                  </div>
                </div>

                {seleccionado === u.id && (
                  <div className="mt-3 pt-3 border-t border-[var(--border-color)] animate-fade-in">
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {u.servicios.map(s => (
                        <span key={s} className="badge badge-received">{s}</span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <a
                        href={`tel:${u.telefono}`}
                        className="btn btn-sm btn-outline flex-1 no-underline"
                        onClick={e => e.stopPropagation()}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                        Llamar
                      </a>
                      <a
                        href={`https://www.openstreetmap.org/?mlat=${u.lat}&mlon=${u.lng}#map=17/${u.lat}/${u.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-accent flex-1 no-underline"
                        onClick={e => e.stopPropagation()}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11" /></svg>
                        Cómo llegar
                      </a>
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
