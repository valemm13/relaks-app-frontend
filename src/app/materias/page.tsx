"use client";

import { useState } from "react";

type Profesor = {
  id: number;
  nombre: string;
  facultad?: string;
};

const MATERIAS = [
  { id: "MAT001", nombre: "Estructuras de datos" },
  { id: "MAT002", nombre: "Programación Orientada a Objetos" },
];

export default function MateriasPage() {
  const [materiaId, setMateriaId] = useState<string>("MAT001");
  const [profesores, setProfesores] = useState<Profesor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const materiaSeleccionada = MATERIAS.find((m) => m.id === materiaId);

  const handleBuscar = async () => {
    if (!materiaId) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `/api/profes?materia=${encodeURIComponent(materiaId)}`
      );

      if (!res.ok) {
        throw new Error("Error al buscar profesores");
      }

      const data: Profesor[] = await res.json();
      setProfesores(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message ?? "Error inesperado");
      setProfesores([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-start py-10">
      <div className="w-[1000px] bg-white px-10 pt-10 pb-16 shadow">

        {/* Buscador */}
        <div className="flex items-center justify-between mb-10">
          {/* Selector de materia */}
          <div className="flex items-center gap-3">
            <span className="text-2xl">🔍</span>
            <select
              value={materiaId}
              onChange={(e) => setMateriaId(e.target.value)}
              className="w-72 bg-gray-200 rounded-full px-4 py-2 text-sm outline-none"
            >
              {MATERIAS.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.nombre}
                </option>
              ))}
            </select>
            <button
              onClick={handleBuscar}
              className="bg-blue-800 text-white px-6 py-2 rounded-md font-semibold text-sm hover:bg-blue-900 transition"
            >
              Buscar
            </button>
          </div>

          {/* Título */}
          <div className="text-right">
            <h1 className="text-[26px] font-bold text-blue-800 leading-tight">
              Profesores disponibles para
              <br />
              {materiaSeleccionada?.nombre ?? ""}
            </h1>
          </div>
        </div>

        {/* Estados */}
        {loading && (
          <p className="text-center text-sm text-gray-600 mb-4">
            Cargando profesores...
          </p>
        )}
        {error && (
          <p className="text-center text-sm text-red-600 mb-4">{error}</p>
        )}
        {!loading && !error && profesores.length === 0 && (
          <p className="text-center text-sm text-gray-600 mb-4">
            No se encontraron profesores para esta materia.
          </p>
        )}

        {/* Tarjetas */}
        <div className="flex flex-wrap justify-center gap-8 mt-4">
          {profesores.map((profe) => (
            <div
              key={profe.id}
              className="relative bg-gray-300 w-72 rounded-3xl pt-14 pb-8 flex flex-col items-center"
            >
              {/* Circulo de foto (iniciales) */}
              <div className="w-32 h-32 rounded-full bg-gray-400 absolute -top-16 flex items-center justify-center text-white text-3xl overflow-hidden">
                {profe.nombre.charAt(0)}
              </div>

              {/* Nombre */}
              <h2 className="mt-10 font-semibold text-center text-gray-800 px-4">
                {profe.nombre}
              </h2>

              {/* Facultad */}
              {profe.facultad && (
                <p className="text-xs text-gray-600 mt-1">{profe.facultad}</p>
              )}

              {/* Reseñas placeholder */}
              <div className="mt-6 bg-white rounded-2xl px-4 py-6 text-center w-56 text-xs text-gray-600 border border-gray-300">
                Todavía no hay reseñas para {profe.nombre}
              </div>

              {/* Estrellas */}
              <div className="flex justify-center gap-1 text-gray-400 text-xl mt-4">
                ★ ★ ★ ★ ★
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
