'use client';

import Link from 'next/link';
import { use } from 'react';
import { NOTICIAS_SEED } from '@/lib/localStorage';

export default function NoticiaDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const noticia = NOTICIAS_SEED.find(n => n.id === id);

  if (!noticia) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-xl font-bold text-[var(--text-primary)] mb-2">Noticia no encontrada</h1>
        <Link href="/noticias" className="btn btn-primary mt-4">Ver noticias</Link>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Image cover */}
      <div className="relative h-56 bg-[var(--color-neutral-100)]">
        <img src={noticia.imagen} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <Link href="/noticias" className="absolute top-4 left-4 w-10 h-10 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center no-underline">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
        </Link>
      </div>

      <div className="container pb-6">
        <div className="card -mt-8 relative z-10 p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="badge badge-received">Noticia</span>
            <span className="text-xs text-[var(--text-tertiary)]">
              {new Date(noticia.fecha).toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
          </div>
          <h1 className="text-xl font-bold text-[var(--text-primary)] mb-3">{noticia.titulo}</h1>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-medium mb-4">{noticia.resumen}</p>
          <div className="prose max-w-none">
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{noticia.contenido}</p>
          </div>
        </div>

        {/* Other news */}
        <div className="mt-6">
          <h2 className="text-sm font-bold text-[var(--text-primary)] mb-3">Más noticias</h2>
          <div className="space-y-3">
            {NOTICIAS_SEED.filter(n => n.id !== id).slice(0, 2).map(n => (
              <Link key={n.id} href={`/noticias/${n.id}`} className="card card-hover p-3 flex gap-3 no-underline">
                <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-[var(--color-neutral-100)]">
                  <img src={n.imagen} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-[var(--text-primary)] line-clamp-2">{n.titulo}</h3>
                  <span className="text-xs text-[var(--text-tertiary)]">
                    {new Date(n.fecha).toLocaleDateString('es-MX', { day: 'numeric', month: 'short' })}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
