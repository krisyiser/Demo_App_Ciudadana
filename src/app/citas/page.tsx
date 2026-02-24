'use client';

import { useState } from 'react';
import Link from 'next/link';
import { saveCita, DEPENDENCIAS } from '@/lib/localStorage';

const PASOS = ['Dependencia', 'Servicio', 'Requisitos', 'Fecha'];

export default function CitasPage() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [folio, setFolio] = useState('');

  const [depId, setDepId] = useState('');
  const [servicio, setServicio] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');

  const dep = DEPENDENCIAS.find(d => d.id === depId);

  const horasDisponibles = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '12:00', '12:30', '13:00', '13:30'
  ];

  const isStepValid = () => {
    switch (step) {
      case 0: return !!depId;
      case 1: return !!servicio;
      case 2: return true; // solo info
      case 3: return !!fecha && !!hora;
      default: return false;
    }
  };

  const handleSubmit = () => {
    if (!dep) return;
    const fechaHora = new Date(`${fecha}T${hora}:00`);
    const f = saveCita({
      dependencia: dep.nombre,
      tramite: servicio,
      sede: dep.sede,
      fechaHora: fechaHora.toISOString(),
      estado: 'Programada'
    });
    setFolio(f);
    setDone(true);
  };

  // Calcular fecha mínima (mañana)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  if (done) {
    return (
      <div className="container py-12 text-center animate-scale-in">
        <div className="card max-w-md mx-auto p-8">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-[var(--text-primary)] mb-2">¡Cita agendada!</h1>
          <p className="text-sm text-[var(--text-secondary)] mb-4">
            Tu cita ha sido programada exitosamente. Muestra tu folio o QR al llegar.
          </p>
          <div className="bg-[var(--color-neutral-100)] rounded-xl p-4 mb-4">
            <div className="text-xs text-[var(--text-secondary)] mb-1">Tu folio</div>
            <div className="text-lg font-bold font-mono text-[var(--color-primary)]">{folio}</div>
          </div>
          <div className="bg-[var(--color-neutral-100)] rounded-xl p-4 mb-6 text-left space-y-2">
            <div className="flex justify-between">
              <span className="text-xs text-[var(--text-secondary)]">Servicio</span>
              <span className="text-sm font-medium text-[var(--text-primary)]">{servicio}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-[var(--text-secondary)]">Sede</span>
              <span className="text-sm font-medium text-[var(--text-primary)]">{dep?.sede}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-[var(--text-secondary)]">Fecha y hora</span>
              <span className="text-sm font-medium text-[var(--color-accent)]">
                {new Date(`${fecha}T${hora}`).toLocaleDateString('es-MX', {
                  weekday: 'short', day: 'numeric', month: 'short'
                })} · {hora}
              </span>
            </div>
          </div>
          <div className="flex gap-3">
            <Link href="/mi?tab=citas" className="btn btn-primary flex-1">Ver mis citas</Link>
            <Link href="/" className="btn btn-ghost flex-1">Inicio</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="hero-gradient text-white px-4 pt-6 pb-12">
        <div className="container">
          <Link href="/" className="inline-flex items-center gap-1.5 text-white/60 text-sm hover:text-white/80 transition-colors mb-3 no-underline">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
            Inicio
          </Link>
          <h1 className="text-xl font-bold mb-1">Agendar una cita</h1>
          <p className="text-white/60 text-sm">Paso {step + 1} de {PASOS.length}: {PASOS[step]}</p>
        </div>
      </div>

      <div className="container -mt-6 relative z-10 pb-6">
        {/* Progress */}
        <div className="progress-bar mb-6">
          <div className="progress-bar-fill" style={{ width: `${((step + 1) / PASOS.length) * 100}%` }} />
        </div>

        {/* PASO 0: Dependencia */}
        {step === 0 && (
          <div className="animate-fade-in">
            <h2 className="text-sm font-bold text-[var(--text-primary)] mb-4">Selecciona la dependencia</h2>
            <div className="space-y-3 stagger-children">
              {DEPENDENCIAS.map(d => (
                <button
                  key={d.id}
                  onClick={() => { setDepId(d.id); setServicio(''); }}
                  className={`card p-4 w-full text-left transition-all ${depId === d.id ? 'border-[var(--color-accent)] bg-sky-50/50' : 'card-hover'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="icon-container icon-container-md bg-[var(--color-primary)]/8 text-[var(--color-primary)]">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18" /><path d="M5 21V7l8-4v18" /><path d="M19 21V11l-6-4" /></svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-[var(--text-primary)]">{d.nombre}</h3>
                      <p className="text-xs text-[var(--text-secondary)]">{d.sede} · {d.horario}</p>
                    </div>
                    {depId === d.id && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* PASO 1: Servicio */}
        {step === 1 && dep && (
          <div className="animate-fade-in">
            <h2 className="text-sm font-bold text-[var(--text-primary)] mb-4">Selecciona el servicio</h2>
            <div className="space-y-3 stagger-children">
              {dep.servicios.map(s => (
                <button
                  key={s}
                  onClick={() => setServicio(s)}
                  className={`card p-4 w-full text-left transition-all ${servicio === s ? 'border-[var(--color-accent)] bg-sky-50/50' : 'card-hover'
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-[var(--text-primary)]">{s}</span>
                    {servicio === s && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* PASO 2: Requisitos */}
        {step === 2 && dep && (
          <div className="animate-fade-in space-y-4">
            <h2 className="text-sm font-bold text-[var(--text-primary)] mb-2">Requisitos para tu trámite</h2>
            <div className="card p-5">
              <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">{servicio}</h3>
              <div className="space-y-2">
                {['Identificación oficial vigente (INE/IFE)', 'Comprobante de domicilio reciente', 'CURP'].map((req, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                    <span className="text-sm text-[var(--text-secondary)]">{req}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card p-4 bg-amber-50 border-amber-200">
              <div className="flex items-start gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>
                <p className="text-xs text-amber-800 leading-relaxed">
                  Presenta documentos en original y copia. Llega 15 minutos antes de tu hora programada.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* PASO 3: Fecha y hora */}
        {step === 3 && (
          <div className="animate-fade-in space-y-4">
            <h2 className="text-sm font-bold text-[var(--text-primary)] mb-2">Selecciona fecha y hora</h2>
            <div className="form-group">
              <label className="form-label">Fecha</label>
              <input
                type="date"
                value={fecha}
                onChange={e => setFecha(e.target.value)}
                min={minDate}
                className="form-input"
              />
            </div>

            {fecha && (
              <div>
                <label className="form-label mb-3">Horarios disponibles</label>
                <div className="grid grid-cols-3 gap-2 stagger-children">
                  {horasDisponibles.map(h => (
                    <button
                      key={h}
                      onClick={() => setHora(h)}
                      className={`btn btn-sm transition-all ${hora === h
                          ? 'btn-accent'
                          : 'bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)]'
                        }`}
                    >
                      {h}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Navigation */}
        <div className="flex gap-3 mt-8">
          {step > 0 && (
            <button onClick={() => setStep(s => s - 1)} className="btn btn-ghost flex-1">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
              Anterior
            </button>
          )}
          {step < PASOS.length - 1 ? (
            <button
              onClick={() => setStep(s => s + 1)}
              disabled={!isStepValid()}
              className="btn btn-primary flex-1 disabled:opacity-40"
            >
              Siguiente
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!isStepValid()}
              className="btn btn-accent flex-1 disabled:opacity-40"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              Confirmar cita
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
