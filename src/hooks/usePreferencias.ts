'use client';

import { useState, useEffect } from 'react';
import { getPreferencias, savePreferencias, type Preferencias } from '@/lib/localStorage';

export function usePreferencias() {
  const [preferencias, setPreferenciasState] = useState<Preferencias>({
    notifsPorColonia: [],
    tema: 'light',
    contraste: false,
    fontSize: 'medium'
  });

  // Cargar preferencias al montar
  useEffect(() => {
    const prefs = getPreferencias();
    setPreferenciasState(prefs);
    applyPreferences(prefs);
  }, []);

  // Aplicar preferencias al DOM
  const applyPreferences = (prefs: Preferencias) => {
    const html = document.documentElement;

    // Aplicar tema
    if (prefs.tema === 'dark') {
      html.setAttribute('data-theme', 'dark');
    } else {
      html.removeAttribute('data-theme');
    }

    // Aplicar contraste alto
    if (prefs.contraste) {
      html.classList.add('high-contrast');
    } else {
      html.classList.remove('high-contrast');
    }

    // Aplicar tamaño de fuente
    html.classList.remove('font-small', 'font-medium', 'font-large');
    html.classList.add(`font-${prefs.fontSize}`);
  };

  // Actualizar preferencias
  const updatePreferencias = (updates: Partial<Preferencias>) => {
    const newPrefs = { ...preferencias, ...updates };
    setPreferenciasState(newPrefs);
    savePreferencias(updates);
    applyPreferences(newPrefs);
  };

  // Alternar tema
  const toggleTema = () => {
    const nuevoTema = preferencias.tema === 'light' ? 'dark' : 'light';
    updatePreferencias({ tema: nuevoTema });
  };

  // Alternar contraste
  const toggleContraste = () => {
    updatePreferencias({ contraste: !preferencias.contraste });
  };

  // Cambiar tamaño de fuente
  const setFontSize = (fontSize: 'small' | 'medium' | 'large') => {
    updatePreferencias({ fontSize });
  };

  // Agregar notificación por colonia
  const addNotificacionColonia = (colonia: string) => {
    if (!preferencias.notifsPorColonia.includes(colonia)) {
      updatePreferencias({
        notifsPorColonia: [...preferencias.notifsPorColonia, colonia]
      });
    }
  };

  // Remover notificación por colonia
  const removeNotificacionColonia = (colonia: string) => {
    updatePreferencias({
      notifsPorColonia: preferencias.notifsPorColonia.filter(c => c !== colonia)
    });
  };

  return {
    preferencias,
    updatePreferencias,
    toggleTema,
    toggleContraste,
    setFontSize,
    addNotificacionColonia,
    removeNotificacionColonia
  };
}
