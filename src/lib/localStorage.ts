// ═══════════════════════════════════════════
// Tipos para los datos locales
// ═══════════════════════════════════════════

export interface Reporte {
  folio: string;
  categoria: string;
  direccion: string;
  lat?: number;
  lng?: number;
  fotos: string[];
  detalles: string;
  contacto?: {
    nombre?: string;
    telefono?: string;
    correo?: string;
  };
  estado: 'Recibido' | 'En proceso' | 'Atendido' | 'Cerrado';
  fecha: string;
  notas?: string[];
  calificacion?: number;
}

export interface Cita {
  folio: string;
  dependencia: string;
  tramite: string;
  sede: string;
  fechaHora: string;
  qrSimulado: string;
  estado: 'Programada' | 'Confirmada' | 'Cancelada' | 'Completada';
  fecha: string;
}

export interface Preferencias {
  colonia?: string;
  notifsPorColonia: string[];
  tema: 'light' | 'dark';
  contraste: boolean;
  fontSize: 'small' | 'medium' | 'large';
}

// ═══════════════════════════════════════════
// Claves para localStorage
// ═══════════════════════════════════════════

const KEYS = {
  REPORTES: 'ciudadana_reportes',
  CITAS: 'ciudadana_citas',
  PREFS: 'ciudadana_prefs',
  SEEDED: 'ciudadana_seeded'
} as const;

// ═══════════════════════════════════════════
// Seed data – se inyecta una sola vez para la demo
// ═══════════════════════════════════════════

function ensureSeedData() {
  if (typeof window === 'undefined') return;
  if (localStorage.getItem(KEYS.SEEDED)) return;

  // Seed reportes
  const seedReportes: Reporte[] = [
    {
      folio: 'AC-R-DEMO001',
      categoria: 'bache',
      direccion: 'Av. Reforma 210, Col. Centro',
      lat: 20.4511,
      lng: -97.315,
      fotos: [],
      detalles: 'Bache de aproximadamente 2 metros de diámetro frente al edificio de correos. Riesgo para vehículos y motociclistas.',
      estado: 'En proceso',
      fecha: new Date(Date.now() - 5 * 86400000).toISOString(),
      notas: ['Asignado al equipo de obras públicas'],
      contacto: { nombre: 'María García' }
    },
    {
      folio: 'AC-R-DEMO002',
      categoria: 'alumbrado',
      direccion: 'Calle Hidalgo 45, Col. Insurgentes',
      fotos: [],
      detalles: 'Tres luminarias apagadas en esta cuadra, genera inseguridad por las noches.',
      estado: 'Atendido',
      fecha: new Date(Date.now() - 12 * 86400000).toISOString(),
      notas: ['Se reemplazaron las luminarias el día 15']
    },
    {
      folio: 'AC-R-DEMO003',
      categoria: 'agua',
      direccion: 'Calle Benito Juárez 78, Col. San Juan',
      fotos: [],
      detalles: 'Fuga de agua potable en la esquina, lleva más de una semana.',
      estado: 'Cerrado',
      fecha: new Date(Date.now() - 20 * 86400000).toISOString(),
      calificacion: 4
    }
  ];

  // Seed citas
  const seedCitas: Cita[] = [
    {
      folio: 'AC-C-DEMO001',
      dependencia: 'Tesorería',
      tramite: 'Pago de predial',
      sede: 'Palacio Municipal',
      fechaHora: new Date(Date.now() + 3 * 86400000 + 10 * 3600000).toISOString(),
      qrSimulado: 'QR-AC-C-DEMO001',
      estado: 'Programada',
      fecha: new Date(Date.now() - 1 * 86400000).toISOString()
    },
    {
      folio: 'AC-C-DEMO002',
      dependencia: 'Registro Civil',
      tramite: 'Actas de nacimiento',
      sede: 'Oficinas Registro Civil',
      fechaHora: new Date(Date.now() - 7 * 86400000 + 9 * 3600000).toISOString(),
      qrSimulado: 'QR-AC-C-DEMO002',
      estado: 'Completada',
      fecha: new Date(Date.now() - 10 * 86400000).toISOString()
    }
  ];

  localStorage.setItem(KEYS.REPORTES, JSON.stringify(seedReportes));
  localStorage.setItem(KEYS.CITAS, JSON.stringify(seedCitas));
  localStorage.setItem(KEYS.SEEDED, 'true');
}

// ═══════════════════════════════════════════
// Utilidades para reportes
// ═══════════════════════════════════════════

export function saveReporte(reporte: Omit<Reporte, 'folio' | 'fecha' | 'estado'>): string {
  const reportes = getReportes();
  const folio = generateFolio('R');
  const nuevoReporte: Reporte = {
    ...reporte,
    folio,
    fecha: new Date().toISOString(),
    estado: 'Recibido'
  };
  reportes.push(nuevoReporte);
  localStorage.setItem(KEYS.REPORTES, JSON.stringify(reportes));
  return folio;
}

export function getReportes(): Reporte[] {
  ensureSeedData();
  try {
    const data = localStorage.getItem(KEYS.REPORTES);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function getReporte(folio: string): Reporte | null {
  const reportes = getReportes();
  return reportes.find(r => r.folio === folio) || null;
}

export function updateReporte(folio: string, updates: Partial<Reporte>): boolean {
  const reportes = getReportes();
  const index = reportes.findIndex(r => r.folio === folio);
  if (index === -1) return false;
  reportes[index] = { ...reportes[index], ...updates };
  localStorage.setItem(KEYS.REPORTES, JSON.stringify(reportes));
  return true;
}

export function addNotaReporte(folio: string, nota: string): boolean {
  const reporte = getReporte(folio);
  if (!reporte) return false;
  const notas = reporte.notas || [];
  notas.push(`${new Date().toLocaleDateString()} - ${nota}`);
  return updateReporte(folio, { notas });
}

// ═══════════════════════════════════════════
// Utilidades para citas
// ═══════════════════════════════════════════

export function saveCita(cita: Omit<Cita, 'folio' | 'fecha' | 'qrSimulado'>): string {
  const citas = getCitas();
  const folio = generateFolio('C');
  const nuevaCita: Cita = {
    ...cita,
    folio,
    fecha: new Date().toISOString(),
    qrSimulado: `QR-${folio}-${Date.now()}`
  };
  citas.push(nuevaCita);
  localStorage.setItem(KEYS.CITAS, JSON.stringify(citas));
  return folio;
}

export function getCitas(): Cita[] {
  ensureSeedData();
  try {
    const data = localStorage.getItem(KEYS.CITAS);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function getCita(folio: string): Cita | null {
  const citas = getCitas();
  return citas.find(c => c.folio === folio) || null;
}

export function updateCita(folio: string, updates: Partial<Cita>): boolean {
  const citas = getCitas();
  const index = citas.findIndex(c => c.folio === folio);
  if (index === -1) return false;
  citas[index] = { ...citas[index], ...updates };
  localStorage.setItem(KEYS.CITAS, JSON.stringify(citas));
  return true;
}

export function cancelarCita(folio: string): boolean {
  return updateCita(folio, { estado: 'Cancelada' });
}

// ═══════════════════════════════════════════
// Utilidades para preferencias
// ═══════════════════════════════════════════

export function getPreferencias(): Preferencias {
  try {
    const data = localStorage.getItem(KEYS.PREFS);
    return data ? JSON.parse(data) : {
      notifsPorColonia: [],
      tema: 'light',
      contraste: false,
      fontSize: 'medium'
    };
  } catch {
    return {
      notifsPorColonia: [],
      tema: 'light',
      contraste: false,
      fontSize: 'medium'
    };
  }
}

export function savePreferencias(prefs: Partial<Preferencias>): void {
  const current = getPreferencias();
  const updated = { ...current, ...prefs };
  localStorage.setItem(KEYS.PREFS, JSON.stringify(updated));
}

// ═══════════════════════════════════════════
// Utilidades generales
// ═══════════════════════════════════════════

function generateFolio(prefix: string): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 5);
  return `AC-${prefix}-${timestamp}${random}`.toUpperCase();
}

export function isOnline(): boolean {
  return typeof navigator !== 'undefined' ? navigator.onLine : true;
}

export function formatFecha(fecha: string): string {
  return new Date(fecha).toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export function getBadgeClass(estado: string): string {
  switch (estado) {
    case 'Recibido':
    case 'Programada':
      return 'badge-received';
    case 'En proceso':
    case 'Confirmada':
      return 'badge-process';
    case 'Atendido':
      return 'badge-attended';
    case 'Cerrado':
    case 'Completada':
      return 'badge-closed';
    case 'Cancelada':
      return 'badge-cancelled';
    default:
      return 'badge-received';
  }
}

// ═══════════════════════════════════════════
// Categorías de reportes
// ═══════════════════════════════════════════

export const CATEGORIAS_REPORTE = [
  { id: 'bache', nombre: 'Bache', icono: '🕳️', color: '#F97316' },
  { id: 'alumbrado', nombre: 'Alumbrado', icono: '💡', color: '#EAB308' },
  { id: 'agua', nombre: 'Agua/Drenaje', icono: '💧', color: '#3B82F6' },
  { id: 'basura', nombre: 'Basura/Limpia', icono: '🗑️', color: '#22C55E' },
  { id: 'parques', nombre: 'Parques/Jardines', icono: '🌳', color: '#10B981' },
  { id: 'señaletica', nombre: 'Señalética/Vialidad', icono: '🚧', color: '#F59E0B' },
  { id: 'proteccion', nombre: 'Protección Civil', icono: '⚠️', color: '#EF4444' },
  { id: 'ruido', nombre: 'Ruido/Comercio', icono: '🔊', color: '#8B5CF6' },
  { id: 'animales', nombre: 'Animales', icono: '🐕', color: '#EC4899' },
  { id: 'otro', nombre: 'Otro', icono: '📝', color: '#6B7280' }
];

// ═══════════════════════════════════════════
// Dependencias
// ═══════════════════════════════════════════

export const DEPENDENCIAS = [
  {
    id: 'tesoreria',
    nombre: 'Tesorería',
    servicios: ['Pago de predial', 'Expedición de recibos', 'Consulta de adeudos'],
    sede: 'Palacio Municipal',
    horario: 'L-V 8:00-15:00'
  },
  {
    id: 'registro',
    nombre: 'Registro Civil',
    servicios: ['Actas de nacimiento', 'Actas de matrimonio', 'Actas de defunción'],
    sede: 'Oficinas Registro Civil',
    horario: 'L-V 8:00-14:00'
  },
  {
    id: 'catastro',
    nombre: 'Catastro',
    servicios: ['Consulta catastral', 'Deslinde de predios', 'Avalúos'],
    sede: 'Palacio Municipal',
    horario: 'L-V 8:00-15:00'
  },
  {
    id: 'desarrollo',
    nombre: 'Desarrollo Urbano',
    servicios: ['Licencias de construcción', 'Uso de suelo', 'Permisos'],
    sede: 'Palacio Municipal',
    horario: 'L-V 9:00-14:00'
  },
  {
    id: 'padron',
    nombre: 'Padrón y Licencias',
    servicios: ['Licencias comerciales', 'Renovaciones', 'Permisos eventuales'],
    sede: 'Palacio Municipal',
    horario: 'L-V 8:00-15:00'
  },
  {
    id: 'juzgado',
    nombre: 'Juzgado Cívico',
    servicios: ['Infracciones', 'Conciliación', 'Mediación'],
    sede: 'Juzgado Municipal',
    horario: 'L-V 8:00-16:00'
  }
];

// ═══════════════════════════════════════════
// Datos semilla para noticias
// ═══════════════════════════════════════════

export const NOTICIAS_SEED = [
  {
    id: '1',
    titulo: 'Rehabilitación de calles en zona centro',
    resumen: 'Brigadas de obras iniciaron trabajos nocturnos para agilizar circulación vial.',
    contenido: 'El gobierno municipal inició los trabajos de rehabilitación vial en la zona centro. Los trabajos se realizan en horario nocturno para reducir las afectaciones al tráfico vehicular y mejorar la infraestructura urbana.',
    fecha: '2026-02-20',
    imagen: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400'
  },
  {
    id: '2',
    titulo: 'Campaña de reforestación en parques',
    resumen: 'Brigadas ciudadanas plantarán especies nativas este fin de semana.',
    contenido: 'Como parte del programa ambiental municipal, este sábado se llevará a cabo una jornada de reforestación en los principales parques de la ciudad, fortaleciendo los espacios verdes urbanos.',
    fecha: '2026-02-19',
    imagen: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400'
  },
  {
    id: '3',
    titulo: 'Jornada de salud y vacunación',
    resumen: 'Consulta sedes y horarios en el módulo de servicios.',
    contenido: 'El DIF Municipal en coordinación con la Secretaría de Salud realizará una jornada de atención médica gratuita y aplicación de vacunas en diversos puntos de la ciudad.',
    fecha: '2026-02-18',
    imagen: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400'
  }
];

// ═══════════════════════════════════════════
// Datos semilla para alertas
// ═══════════════════════════════════════════

export const ALERTAS_SEED = [
  {
    id: '1',
    tipo: 'Protección Civil',
    titulo: 'Lluvias intensas',
    mensaje: 'Lluvias intensas previstas de 17:00 a 21:00. Evita zonas bajas e inundables.',
    vigente: true,
    fecha: '2026-02-23'
  },
  {
    id: '2',
    tipo: 'Servicios',
    titulo: 'Corte de agua',
    mensaje: 'Suspensión temporal del servicio en Col. Reforma (8:00–18:00).',
    vigente: true,
    fecha: '2026-02-23'
  },
  {
    id: '3',
    tipo: 'Vialidad',
    titulo: 'Cierre vial',
    mensaje: 'Cierre parcial por obras en Av. Principal, utiliza vías alternas.',
    vigente: false,
    fecha: '2026-02-22'
  }
];
