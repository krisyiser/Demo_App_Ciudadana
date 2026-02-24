'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Simulate network delay
        await new Promise(r => setTimeout(r, 800));

        if (usuario === 'demo' && password === 'demo') {
            localStorage.setItem('ciudadana_auth', JSON.stringify({
                loggedIn: true,
                user: 'demo',
                name: 'María García López',
                loginTime: new Date().toISOString()
            }));
            router.push('/');
        } else {
            setError('Usuario o contraseña incorrectos');
        }
        setLoading(false);
    };

    return (
        <div className="login-bg flex items-center justify-center p-4 min-h-screen">
            <div className="w-full max-w-md animate-scale-in" style={{ position: 'relative', zIndex: 1 }}>
                {/* Logo / Branding */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-lg mb-4 border border-white/20">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 21h18" />
                            <path d="M5 21V7l8-4v18" />
                            <path d="M19 21V11l-6-4" />
                            <path d="M9 9v.01" />
                            <path d="M9 12v.01" />
                            <path d="M9 15v.01" />
                            <path d="M9 18v.01" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-1">Atención Ciudadana</h1>
                    <p className="text-white/60 text-sm">Plataforma de servicios municipales</p>
                </div>

                {/* Login Card */}
                <div className="login-card p-8">
                    <h2 className="text-xl font-bold text-white mb-1">Iniciar sesión</h2>
                    <p className="text-white/50 text-sm mb-6">Ingresa tus credenciales para continuar</p>

                    <form onSubmit={handleLogin} className="space-y-5">
                        {/* User field */}
                        <div>
                            <label className="block text-white/70 text-sm font-medium mb-2">
                                Usuario
                            </label>
                            <div className="relative">
                                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                                        <circle cx="12" cy="7" r="4" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    value={usuario}
                                    onChange={(e) => setUsuario(e.target.value)}
                                    placeholder="Ingresa tu usuario"
                                    className="w-full px-4 pl-11 py-3.5 rounded-xl bg-white/90 border border-white/15 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-sky-400/50 focus:ring-1 focus:ring-sky-400/30 transition-all text-sm"
                                    required
                                    autoComplete="username"
                                    id="login-user"
                                />
                            </div>
                        </div>

                        {/* Password field */}
                        <div>
                            <label className="block text-white/70 text-sm font-medium mb-2">
                                Contraseña
                            </label>
                            <div className="relative">
                                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                                        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                    </svg>
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Ingresa tu contraseña"
                                    className="w-full px-4 pl-11 pr-11 py-3.5 rounded-xl bg-white/90 border border-white/15 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-sky-400/50 focus:ring-1 focus:ring-sky-400/30 transition-all text-sm"
                                    required
                                    autoComplete="current-password"
                                    id="login-password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                    aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                                >
                                    {showPassword ? (
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                                            <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                                            <line x1="1" y1="1" x2="23" y2="23" />
                                        </svg>
                                    ) : (
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                            <circle cx="12" cy="12" r="3" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Error message */}
                        {error && (
                            <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/15 border border-red-500/25">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="15" y1="9" x2="9" y2="15" />
                                    <line x1="9" y1="9" x2="15" y2="15" />
                                </svg>
                                <span className="text-red-400 text-sm">{error}</span>
                            </div>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3.5 rounded-xl font-semibold text-sm transition-all bg-gradient-to-r from-sky-500 to-blue-600 text-white hover:from-sky-400 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-sky-500/25 hover:shadow-xl hover:shadow-sky-500/30"
                            id="login-submit"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                    Verificando...
                                </span>
                            ) : (
                                'Iniciar sesión'
                            )}
                        </button>
                    </form>

                    {/* Demo hint */}
                    <div className="mt-6 p-3.5 rounded-xl bg-white/5 border border-white/10">
                        <div className="flex items-start gap-2.5">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-shrink-0">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M12 16v-4" />
                                <path d="M12 8h.01" />
                            </svg>
                            <div>
                                <p className="text-white/50 text-xs leading-relaxed">
                                    <span className="text-white/70 font-medium">Demo:</span> usuario <code className="px-1.5 py-0.5 rounded bg-white/10 text-sky-300 text-xs font-mono">demo</code> contraseña <code className="px-1.5 py-0.5 rounded bg-white/10 text-sky-300 text-xs font-mono">demo</code>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <p className="text-center text-white/30 text-xs mt-6">
                    App ciudadana Demo de Zima Technologies
                </p>
            </div>
        </div>
    );
}
