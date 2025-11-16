import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ✅ Proxy para Backend (evita CORS)
  async rewrites() {
    return [
      {
        source: '/api/users/:path*',
        destination: 'http://localhost:3001/users/:path*'
      },
      {
        source: '/api/materias/:path*',
        destination: 'http://localhost:3001/materias/:path*'
      },
      {
        source: '/api/profes/:path*',
        destination: 'http://localhost:3001/profes/:path*'
      },
      {
        source: '/api/calificaciones/:path*',
        destination: 'http://localhost:3001/calificaciones/:path*'
      }
    ];
  },

  // ✅ Optimización de imágenes externas
  images: {
    remotePatterns: [
      { hostname: 'images.unsplash.com' },
      { hostname: 'ui-avatars.com' }
    ]
  }
};

export default nextConfig;
