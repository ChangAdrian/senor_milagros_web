// Configuración básica con variables de entorno

export const config = {
  app: {
    name: process.env.NEXT_PUBLIC_APP_NAME || "Señor de los Milagros",
    version: process.env.NEXT_PUBLIC_APP_VERSION || "1.0.0",
  },

  urls: {
    api: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
    base: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
  },
};

export const apiUrl = config.urls.api;
export const baseUrl = config.urls.base;

export default config;
