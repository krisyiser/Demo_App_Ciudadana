'use client';

import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { saveReporte, CATEGORIAS_REPORTE } from '@/lib/localStorage';

const STEPS = ['Categoría', 'Ubicación', 'Fotos', 'Detalles', 'Contacto'];

export default function ReportarPage() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [folio, setFolio] = useState('');

  // Form data
  const [categoria, setCategoria] = useState('');
  const [direccion, setDireccion] = useState('');
  const [lat, setLat] = useState<number>();
  const [lng, setLng] = useState<number>();
  const [fotos, setFotos] = useState<string[]>([]);
  const [detalles, setDetalles] = useState('');
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [localizando, setLocalizando] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  // Pre-select from URL
  useEffect(() => {
    const cat = searchParams.get('categoria');
    if (cat) {
      setCategoria(cat);
      setStep(1);
    }
  }, [searchParams]);

  const isStepValid = () => {
    switch (step) {
      case 0: return !!categoria;
      case 1: return direccion.trim().length >= 5;
      case 2: return true; // fotos opcionales
      case 3: return detalles.trim().length >= 10;
      case 4: return true; // contacto opcional
      default: return false;
    }
  };

  const handleGeolocate = () => {
    if (!navigator.geolocation) return;
    setLocalizando(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLat(pos.coords.latitude);
        setLng(pos.coords.longitude);
        setDireccion(prev => prev || `Lat ${pos.coords.latitude.toFixed(4)}, Lng ${pos.coords.longitude.toFixed(4)}`);
        setLocalizando(false);
      },
      () => setLocalizando(false),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setFotos(prev => [...prev, reader.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = () => {
    const f = saveReporte({
      categoria,
      direccion,
      lat,
      lng,
      fotos,
      detalles,
      contacto: (nombre || telefono || correo) ? { nombre, telefono, correo } : undefined
    });
    setFolio(f);
    setDone(true);
  };

  if (done) {
    return (
      <div className="container py-12 text-center animate-scale-in">
        <div className="card max-w-md mx-auto p-8">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-[var(--text-primary)] mb-2">¡Reporte enviado!</h1>
          <p className="text-sm text-[var(--text-secondary)] mb-4">
            Tu reporte ha sido registrado. Puedes darle seguimiento con tu folio.
          </p>
          <div className="bg-[var(--color-neutral-100)] rounded-xl p-4 mb-6">
            <div className="text-xs text-[var(--text-secondary)] mb-1">Tu folio</div>
            <div className="text-lg font-bold font-mono text-[var(--color-primary)]">{folio}</div>
          </div>
          <div className="flex gap-3">
            <Link href="/mi?tab=reportes" className="btn btn-primary flex-1">Ver mis reportes</Link>
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
          <h1 className="text-xl font-bold mb-1">Reportar un problema</h1>
          <p className="text-white/60 text-sm">Paso {step + 1} de {STEPS.length}: {STEPS[step]}</p>
        </div>
      </div>

      <div className="container -mt-6 relative z-10 pb-6">
        {/* Progress bar */}
        <div className="progress-bar mb-6">
          <div className="progress-bar-fill" style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} />
        </div>

        {/* STEP 0: Categoría */}
        {step === 0 && (
          <div className="animate-fade-in">
            <h2 className="text-sm font-bold text-[var(--text-primary)] mb-4">¿Qué tipo de problema quieres reportar?</h2>
            <div className="grid grid-cols-2 gap-3 stagger-children">
              {CATEGORIAS_REPORTE.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setCategoria(cat.id)}
                  className={`card p-4 text-left transition-all ${categoria === cat.id
                      ? 'border-[var(--color-accent)] bg-sky-50/50 shadow-md'
                      : 'hover:border-[var(--color-neutral-300)]'
                    }`}
                >
                  <div className="icon-container icon-container-md mb-2" style={{ backgroundColor: `${cat.color}15`, color: cat.color }}>
                    <span className="text-xl">{cat.icono}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-[var(--text-primary)]">{cat.nombre}</h3>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 1: Ubicación */}
        {step === 1 && (
          <div className="animate-fade-in space-y-4">
            <h2 className="text-sm font-bold text-[var(--text-primary)] mb-2">¿Dónde está el problema?</h2>
            <div className="form-group">
              <label className="form-label">Dirección o referencia</label>
              <input
                type="text"
                value={direccion}
                onChange={e => setDireccion(e.target.value)}
                placeholder="Ej: Av. Reforma 210, Col. Centro"
                className="form-input"
              />
            </div>
            <button
              onClick={handleGeolocate}
              className="btn btn-outline w-full"
              disabled={localizando}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
              {localizando ? 'Localizando...' : 'Usar mi ubicación actual'}
            </button>
            {lat && lng && (
              <div className="card p-3 bg-green-50 border-green-200">
                <div className="flex items-center gap-2 text-green-700 text-sm">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  Ubicación GPS capturada
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 2: Fotos */}
        {step === 2 && (
          <div className="animate-fade-in space-y-4">
            <h2 className="text-sm font-bold text-[var(--text-primary)] mb-2">Adjunta fotos (opcional)</h2>
            <p className="text-xs text-[var(--text-secondary)]">Las fotos ayudan a identificar y resolver el problema más rápido.</p>

            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />

            <button
              onClick={() => fileRef.current?.click()}
              className="card card-hover p-6 w-full border-dashed text-center"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-2">
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                <circle cx="9" cy="9" r="2" />
                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
              </svg>
              <span className="text-sm text-[var(--text-secondary)]">Toca para seleccionar fotos</span>
            </button>

            {fotos.length > 0 && (
              <div className="grid grid-cols-3 gap-2">
                {fotos.map((foto, i) => (
                  <div key={i} className="relative rounded-xl overflow-hidden aspect-square">
                    <img src={foto} alt="" className="w-full h-full object-cover" />
                    <button
                      onClick={() => setFotos(prev => prev.filter((_, j) => j !== i))}
                      className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/60 flex items-center justify-center"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* STEP 3: Detalles */}
        {step === 3 && (
          <div className="animate-fade-in space-y-4">
            <h2 className="text-sm font-bold text-[var(--text-primary)] mb-2">Describe el problema</h2>
            <div className="form-group">
              <label className="form-label">Descripción detallada</label>
              <textarea
                value={detalles}
                onChange={e => setDetalles(e.target.value)}
                placeholder="Describe el problema con el mayor detalle posible: tamaño, gravedad, desde cuándo ocurre..."
                rows={5}
                className="form-input resize-none"
              />
              <div className="text-xs text-[var(--text-tertiary)] mt-1 text-right">
                {detalles.length} / 500
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Contacto */}
        {step === 4 && (
          <div className="animate-fade-in space-y-4">
            <h2 className="text-sm font-bold text-[var(--text-primary)] mb-1">Datos de contacto (opcional)</h2>
            <p className="text-xs text-[var(--text-secondary)] mb-2">
              Si deseas recibir actualizaciones sobre tu reporte, proporciona tus datos.
            </p>

            <div className="form-group">
              <label className="form-label">Nombre</label>
              <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Tu nombre" className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Teléfono</label>
              <input type="tel" value={telefono} onChange={e => setTelefono(e.target.value)} placeholder="10 dígitos" className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Correo electrónico</label>
              <input type="email" value={correo} onChange={e => setCorreo(e.target.value)} placeholder="tu@correo.com" className="form-input" />
            </div>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex gap-3 mt-8">
          {step > 0 && (
            <button onClick={() => setStep(s => s - 1)} className="btn btn-ghost flex-1">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
              Anterior
            </button>
          )}
          {step < STEPS.length - 1 ? (
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
              className="btn btn-accent flex-1"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4z" /><path d="m22 2-11 11" /></svg>
              Enviar reporte
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
