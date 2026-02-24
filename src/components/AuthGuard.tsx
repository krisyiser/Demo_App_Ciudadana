'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const authData = localStorage.getItem('ciudadana_auth');
        if (authData) {
            try {
                const parsed = JSON.parse(authData);
                if (parsed.loggedIn) {
                    setIsAuthenticated(true);
                    return;
                }
            } catch { }
        }
        setIsAuthenticated(false);
        if (pathname !== '/login') {
            router.replace('/login');
        }
    }, [pathname, router]);

    // On login page, don't guard
    if (pathname === '/login') {
        return <>{children}</>;
    }

    // Loading state
    if (isAuthenticated === null) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-secondary)' }}>
                <div className="text-center animate-fade-in">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] mb-4">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 21h18" />
                            <path d="M5 21V7l8-4v18" />
                            <path d="M19 21V11l-6-4" />
                        </svg>
                    </div>
                    <div className="w-6 h-6 border-2 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin mx-auto" />
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return null;
    }

    return <>{children}</>;
}
