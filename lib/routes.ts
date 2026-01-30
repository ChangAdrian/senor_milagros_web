const url = () => {
  return "https://localhost:7094";
};

// Rutas de la API

export const API_ROUTES = {
  // Autenticación
  auth: {
    login: url() + "/api/auth/login",
    logout: "/api/auth/logout",
    register: "/api/auth/register",
    refresh: "/api/auth/refresh",
    profile: "/api/auth/profile",
  },
  // Hermanos
  hermanos: {
    base: url() + "/api/hermanos",
    byId: (id: string | number) => `/api/hermanos/${id}`,
    search: "/api/hermanos/search",
    export: "/api/hermanos/export",
  },

  // Eventos
  eventos: {
    base: url() + "/api/events/get",
    byId: (id: string | number) => `/api/eventos/${id}`,
    upcoming: "/api/eventos/upcoming",
    past: "/api/eventos/past",
    byDate: (date: string) => `/api/eventos/date/${date}`,
  },

  // Sanciones
  sanciones: {
    base: "/api/sanciones",
    byId: (id: string | number) => `/api/sanciones/${id}`,
    byHermano: (hermanoId: string | number) =>
      `/api/sanciones/hermano/${hermanoId}`,
    active: "/api/sanciones/active",
  },

  // Testimonios
  testimonios: {
    base: "/api/testimonios",
    byId: (id: string | number) => `/api/testimonios/${id}`,
    public: "/api/testimonios/public",
    pending: "/api/testimonios/pending",
    approved: "/api/testimonios/approved",
  },

  // Dashboard
  dashboard: {
    stats: "/api/dashboard/stats",
    recentActivity: "/api/dashboard/recent-activity",
    notifications: "/api/dashboard/notifications",
  },

  // Uploads
  uploads: {
    image: "/api/upload/image",
    document: "/api/upload/document",
    avatar: "/api/upload/avatar",
  },
};

// Rutas de páginas (frontend)
export const PAGE_ROUTES = {
  // Públicas
  home: "/",
  eventos: "/eventos",
  testimonios: "/testimonios",
  himno: "/himno",

  // Autenticación
  login: "/login",

  // Dashboard (privadas)
  dashboard: {
    home: "/dashboard",
    hermanos: "/dashboard/hermanos",
    eventos: "/dashboard/eventos",
    sanciones: "/dashboard/sanciones",
    testimonios: "/dashboard/testimonios",
  },
};

// Función helper para agregar query parameters

export default API_ROUTES;
