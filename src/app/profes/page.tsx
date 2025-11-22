"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PROFES_FAKE } from "../../modules/profes/data";

export default function BuscarProfes() {
  const router = useRouter();
  const [seleccion, setSeleccion] = useState("");

  const buscar = () => {
    if (!seleccion) return;
    router.push(`/profes/${seleccion}`);
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-10">

      <select
        value={seleccion}
        onChange={(e) => setSeleccion(e.target.value)}
        className="border px-4 py-2 rounded w-64 shadow"
      >
        <option value="">Selecciona un profesor</option>

        {PROFES_FAKE.map((p) => (
          <option key={p.id} value={p.nombre}>
            {p.nombre}
          </option>
        ))}
      </select>

      <button
        onClick={buscar}
        className="bg-blue-600 text-white px-5 py-2 rounded shadow"
      >
        Buscar
      </button>
    </div>
  );
}
