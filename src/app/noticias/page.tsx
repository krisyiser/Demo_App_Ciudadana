'use client';

import Link from 'next/link';
import { NOTICIAS_SEED } from '@/lib/localStorage';

export default function NoticiasPage() {
    return (
        <div className="animate-fade-in">
            {/* Header */}
            <div className="hero-gradient text-white px-4 pt-6 pb-12">
                <div className="container">
                    <Link href="/" className="inline-flex items-center gap-1.5 text-white/60 text-sm hover:text-white/80 transition-colors mb-3 no-underline">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                        Inicio
                    </Link>
                    <h1 className="text-xl font-bold mb-1">Noticias y comunicados</h1>
                    <p className="text-white/60 text-sm">Información oficial del municipio</p>
                </div>
            </div>

            <div className="container -mt-6 relative z-10 pb-6">
                <div className="space-y-4 stagger-children">
                    {NOTICIAS_SEED.map((n) => (
                        <Link key={n.id} href={`/noticias/${n.id}`} className="card card-hover p-0 overflow-hidden block no-underline">
                            <div className="h-44 bg-[var(--color-neutral-100)] overflow-hidden">
                                <img src={n.imagen} alt="" className="w-full h-full object-cover" />
                            </div>
                            <div className="p-4">
                                <h2 className="text-base font-bold text-[var(--text-primary)] mb-1">{n.titulo}</h2>
                                <p className="text-sm text-[var(--text-secondary)] line-clamp-2 mb-2">{n.resumen}</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-[var(--text-tertiary)]">
                                        {new Date(n.fecha).toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })}
                                    </span>
                                    <span className="text-xs font-semibold text-[var(--color-accent)]">Leer más →</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
