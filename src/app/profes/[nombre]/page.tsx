import { PROFES_FAKE } from "../../../modules/profes/data";

export default function ProfePage({ params }: { params: { nombre: string } }) {
  const profe = PROFES_FAKE.find(
    (p) => p.nombre.toLowerCase() === params.nombre.toLowerCase()
  );

  if (!profe) {
    return (
      <p className="text-center mt-20">
        No se encontró información del profesor.
      </p>
    );
  }

  return (
    <div className="flex flex-col items-center mt-12">
      <div className="bg-white border shadow-lg rounded-xl p-8 w-80 flex flex-col items-center gap-4">
        
        {/* Icono simulando foto */}
        <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-4xl">
          👤
        </div>

        <h2 className="text-xl font-bold">{profe.nombre}</h2>

        <div className="w-full text-left mt-3">
          <p><strong>ID:</strong> {profe.id}</p>
          <p><strong>Facultad:</strong> {profe.facultad}</p>
        </div>
      </div>
    </div>
  );
}
