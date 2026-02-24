'use client';

import Link from 'next/link';

export default function ClimaPage() {
  const clima = {
    temp: 28,
    condicion: 'Parcialmente nublado',
    humedad: 72,
    viento: 15,
    sensacion: 31,
    uv: 7,
    amanecer: '06:45',
    atardecer: '18:32',
    tempMax: 32,
    tempMin: 20
  };

  const horas = [
    { h: '12:00', temp: 28, icon: '⛅' },
    { h: '13:00', temp: 30, icon: '☀️' },
    { h: '14:00', temp: 31, icon: '☀️' },
    { h: '15:00', temp: 32, icon: '☀️' },
    { h: '16:00', temp: 30, icon: '⛅' },
    { h: '17:00', temp: 27, icon: '🌧️' },
    { h: '18:00', temp: 24, icon: '🌧️' },
    { h: '19:00', temp: 22, icon: '🌙' },
  ];

  const semana = [
    { dia: 'Mar', max: 33, min: 21, icon: '☀️' },
    { dia: 'Mié', max: 30, min: 20, icon: '🌧️' },
    { dia: 'Jue', max: 28, min: 19, icon: '⛅' },
    { dia: 'Vie', max: 31, min: 20, icon: '☀️' },
    { dia: 'Sáb', max: 32, min: 21, icon: '⛅' },
    { dia: 'Dom', max: 29, min: 19, icon: '🌧️' },
  ];

  return (
    <div className="animate-fade-in">
      <div className="hero-gradient text-white px-4 pt-6 pb-16">
        <div className="container">
          <Link href="/" className="inline-flex items-center gap-1.5 text-white/60 text-sm hover:text-white/80 transition-colors mb-3 no-underline">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
            Inicio
          </Link>
          <div className="flex items-center gap-4">
            <div>
              <p className="text-white/60 text-sm mb-1">Ahora</p>
              <div className="text-5xl font-bold">{clima.temp}°</div>
              <p className="text-white/70 text-sm mt-1">{clima.condicion}</p>
            </div>
            <div className="text-6xl ml-auto animate-float">⛅</div>
          </div>
        </div>
      </div>

      <div className="container -mt-8 relative z-10 pb-6">
        {/* Details */}
        <div className="card p-4 mb-4">
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Sensación', value: `${clima.sensacion}°`, icon: '🌡️' },
              { label: 'Humedad', value: `${clima.humedad}%`, icon: '💧' },
              { label: 'Viento', value: `${clima.viento} km/h`, icon: '💨' },
              { label: 'Índice UV', value: `${clima.uv} (Alto)`, icon: '☀️' },
              { label: 'Amanecer', value: clima.amanecer, icon: '🌅' },
              { label: 'Atardecer', value: clima.atardecer, icon: '🌇' },
            ].map(d => (
              <div key={d.label} className="flex items-center gap-3">
                <span className="text-xl">{d.icon}</span>
                <div>
                  <div className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider">{d.label}</div>
                  <div className="text-sm font-semibold text-[var(--text-primary)]">{d.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hourly */}
        <div className="card p-4 mb-4">
          <h2 className="text-sm font-bold text-[var(--text-primary)] mb-3">Por hora</h2>
          <div className="flex gap-3 overflow-x-auto pb-1">
            {horas.map(h => (
              <div key={h.h} className="flex flex-col items-center min-w-[56px]">
                <span className="text-xs text-[var(--text-tertiary)]">{h.h}</span>
                <span className="text-xl my-1">{h.icon}</span>
                <span className="text-sm font-semibold text-[var(--text-primary)]">{h.temp}°</span>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly */}
        <div className="card p-4 mb-4">
          <h2 className="text-sm font-bold text-[var(--text-primary)] mb-3">Próximos días</h2>
          <div className="space-y-3">
            {semana.map(d => (
              <div key={d.dia} className="flex items-center gap-3">
                <span className="text-sm font-medium text-[var(--text-primary)] w-10">{d.dia}</span>
                <span className="text-xl">{d.icon}</span>
                <div className="flex-1 flex items-center gap-2">
                  <span className="text-sm font-semibold text-[var(--text-primary)]">{d.max}°</span>
                  <div className="flex-1 h-1.5 rounded-full bg-[var(--color-neutral-200)] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-sky-400 to-orange-400"
                      style={{ width: `${((d.max - 15) / 25) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm text-[var(--text-tertiary)]">{d.min}°</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div className="card p-4 bg-amber-50 border-amber-200">
          <div className="flex items-start gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>
            <div>
              <h3 className="text-sm font-bold text-amber-800 mb-0.5">Recomendaciones</h3>
              <p className="text-xs text-amber-700 leading-relaxed">
                Índice UV alto: usa protector solar, lentes y sombrero. Se esperan lluvias por la tarde, lleva paraguas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
