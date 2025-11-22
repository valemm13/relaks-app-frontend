"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface Profesor {
  id: number;
  nombre: string;
  facultad?: string;
  materiaId?: string;
}

export default function SearchPage() {
  const router = useRouter();
  const params = useSearchParams();
  const nombre = params.get("nombre") || "";

  const [profes, setProfes] = useState<Profesor[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function fetchProfes() {
      try {
        const res = await fetch(
          `http://localhost:3000/profes?nombre=${encodeURIComponent(nombre)}`
        );
        const data = await res.json();
        setProfes(data);
      } catch (error) {
        console.log("Error obteniendo profes", error);
      } finally {
        setCargando(false);
      }
    }

    fetchProfes();
  }, [nombre]);

  if (cargando) {
    return <p className="mt-20 text-center">Cargando...</p>;
  }

  return (
    <div className="flex flex-col items-center mt-10 gap-8">
      <h1 className="text-2xl font-semibold">Resultados para "{nombre}"</h1>

      {profes.length === 0 && (
        <p className="text-gray-600">No se encontraron profesores.</p>
      )}

      <div className="flex flex-col gap-4 w-full max-w-lg">
        {profes.map((profe) => (
          <div
            key={profe.id}
            onClick={() => router.push(`/profes/${profe.nombre}`)}
            className="border rounded p-4 shadow cursor-pointer hover:bg-gray-100"
          >
            <div className="flex items-center gap-4">
              {/* Imagen por defecto (tu backend NO tiene imagen) */}
              <img
                src="/default-profe.png"
                alt={profe.nombre}
                className="w-16 h-16 rounded-full object-cover"
              />

              <div>
                <p className="font-bold text-lg">{profe.nombre}</p>

                {/* Campos reales que sí existen */}
                <p className="text-gray-600">
                  Facultad: {profe.facultad || "No especificada"}
                </p>

                <p className="text-gray-500">
                  Materia ID: {profe.materiaId || "—"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
