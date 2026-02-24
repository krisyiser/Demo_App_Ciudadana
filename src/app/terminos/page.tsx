import Link from 'next/link';

export default function TerminosPage() {
  return (
    <div className="animate-fade-in">
      <div className="hero-gradient text-white px-4 pt-6 pb-12">
        <div className="container">
          <Link href="/mi" className="inline-flex items-center gap-1.5 text-white/60 text-sm hover:text-white/80 transition-colors mb-3 no-underline">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
            Perfil
          </Link>
          <h1 className="text-xl font-bold mb-1">Términos de uso</h1>
          <p className="text-white/60 text-sm">Condiciones de la plataforma</p>
        </div>
      </div>

      <div className="container -mt-6 relative z-10 pb-6">
        <div className="card p-6">
          <div className="prose max-w-none space-y-6">
            <section>
              <h2 className="text-lg font-bold text-[var(--text-primary)] mb-2">1. Introducción</h2>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                Bienvenido a la plataforma de Atención Ciudadana. Al utilizar esta aplicación, usted acepta cumplir con estos términos de uso.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[var(--text-primary)] mb-2">2. Uso responsable</h2>
              <ul className="text-sm text-[var(--text-secondary)] space-y-1.5 list-disc pl-5">
                <li>Proporcionar información verídica y exacta en reportes</li>
                <li>Usar lenguaje respetuoso en todas las comunicaciones</li>
                <li>No crear reportes falsos o malintencionados</li>
                <li>Respetar la privacidad de otras personas</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[var(--text-primary)] mb-2">3. Contenidos prohibidos</h2>
              <ul className="text-sm text-[var(--text-secondary)] space-y-1.5 list-disc pl-5">
                <li>Contenido ofensivo o discriminatorio</li>
                <li>Información difamatoria</li>
                <li>Material inapropiado</li>
                <li>Datos personales de terceros sin autorización</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[var(--text-primary)] mb-2">4. Tiempos de atención</h2>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                Los reportes se procesan en días hábiles. Los tiempos de respuesta varían según la naturaleza del problema. Las emergencias deben reportarse directamente al 911.
              </p>
            </section>

            <div className="card p-4 bg-red-50 border-red-200">
              <p className="text-xs text-red-800 leading-relaxed">
                <strong>Importante:</strong> Esta aplicación NO debe utilizarse para reportar emergencias. En caso de emergencia, llame al <strong>911</strong>.
              </p>
            </div>

            <section>
              <h2 className="text-lg font-bold text-[var(--text-primary)] mb-2">5. Aceptación</h2>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                Al utilizar esta plataforma, usted confirma que ha leído y acepta estos términos de uso y el aviso de privacidad.
              </p>
            </section>
          </div>
        </div>

        <div className="flex gap-3 mt-4">
          <Link href="/privacidad" className="btn btn-outline flex-1 no-underline">Aviso de privacidad</Link>
          <Link href="/" className="btn btn-primary flex-1 no-underline">Inicio</Link>
        </div>
      </div>
    </div>
  );
}
