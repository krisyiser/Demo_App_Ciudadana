import Link from 'next/link';

export default function PrivacidadPage() {
  return (
    <div className="animate-fade-in">
      <div className="hero-gradient text-white px-4 pt-6 pb-12">
        <div className="container">
          <Link href="/mi" className="inline-flex items-center gap-1.5 text-white/60 text-sm hover:text-white/80 transition-colors mb-3 no-underline">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
            Perfil
          </Link>
          <h1 className="text-xl font-bold mb-1">Aviso de privacidad</h1>
          <p className="text-white/60 text-sm">Tratamiento de datos personales</p>
        </div>
      </div>

      <div className="container -mt-6 relative z-10 pb-6">
        <div className="card p-6">
          <div className="prose max-w-none space-y-6">
            <section>
              <h2 className="text-lg font-bold text-[var(--text-primary)] mb-2">Introducción</h2>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                El Gobierno Municipal se compromete a proteger la privacidad y datos personales de los ciudadanos que utilizan la plataforma de Atención Ciudadana.
                Este aviso explica cómo recopilamos, utilizamos y protegemos su información personal.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[var(--text-primary)] mb-2">Datos que recabamos</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-[var(--color-neutral-100)] p-4 rounded-xl">
                  <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-2">Para reportes:</h4>
                  <ul className="text-xs text-[var(--text-secondary)] space-y-1 list-disc pl-4">
                    <li>Ubicación del problema</li>
                    <li>Fotos del incidente (opcional)</li>
                    <li>Descripción del problema</li>
                    <li>Datos de contacto (solo si solicita seguimiento)</li>
                  </ul>
                </div>
                <div className="bg-[var(--color-neutral-100)] p-4 rounded-xl">
                  <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-2">Para citas:</h4>
                  <ul className="text-xs text-[var(--text-secondary)] space-y-1 list-disc pl-4">
                    <li>Nombre completo</li>
                    <li>Teléfono de contacto</li>
                    <li>Correo electrónico (opcional)</li>
                    <li>Tipo de trámite solicitado</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[var(--text-primary)] mb-2">Sus derechos (ARCO)</h2>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3">
                Usted tiene derecho a Acceder, Rectificar, Cancelar y Oponerse al tratamiento de sus datos personales.
              </p>
              <div className="bg-[var(--color-neutral-100)] p-4 rounded-xl text-xs text-[var(--text-secondary)] space-y-1">
                <p><strong>Contacto:</strong> Unidad de Transparencia</p>
                <p><strong>Horario:</strong> Lunes a Viernes, 8:00 – 15:00</p>
                <p><strong>Tiempo de respuesta:</strong> Máximo 20 días hábiles</p>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[var(--text-primary)] mb-2">Seguridad</h2>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                Implementamos medidas de seguridad técnicas, físicas y administrativas para proteger sus datos personales, incluyendo cifrado en tránsito y almacenamiento, acceso restringido y respaldos seguros.
              </p>
            </section>

            <div className="card p-4 bg-amber-50 border-amber-200">
              <p className="text-xs text-amber-800 leading-relaxed">
                <strong>Importante:</strong> Todos los datos de contacto son opcionales. Puede usar la aplicación de forma anónima para reportes básicos.
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-4">
          <Link href="/terminos" className="btn btn-outline flex-1 no-underline">Términos de uso</Link>
          <Link href="/" className="btn btn-primary flex-1 no-underline">Inicio</Link>
        </div>
      </div>
    </div>
  );
}
