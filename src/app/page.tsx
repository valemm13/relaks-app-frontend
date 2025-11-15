'use client';
import { usePathname } from "next/navigation";

export default function Home() {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-100 font-sans flex flex-col">

      {/* 🔹 Sección principal */}
      <main className="flex flex-col md:flex-row items-center justify-center px-10 py-16 gap-10 bg-white flex-grow">
        <img src="estudiantes.png" className="w-96 max-w-sm" alt="Estudiantes" />

        <div className="text-center md:text-center">
          <h1 className="text-4xl font-bold text-blue-900 leading-snug">
            Comienza tu semestre con una<br />buena decisión
          </h1>

          <h2 className="text-xl mt-6 text-gray-700 font-semibold">
            Apartados para buscar
          </h2>

          <div className="flex justify-center md:justify-center mt-5 space-x-8">
            <img src="Estrella.webp" className="w-12" alt="Estrella" />
            <img src="libros.avif" className="w-12" alt="Libro" />
            <img src="profesor.jpg" className="w-12" alt="Profesor" />
          </div>
        </div>
      </main>

      {/* 🔹 Sección de tarjetas */}
      <section className="flex flex-wrap justify-center gap-8 mt-6 px-8 pb-12">
        <div className="bg-gray-200 p-10 shadow text-center w-72 rounded-lg">
          <h3 className="font-bold text-lg mb-2 text-gray-900">Calificar</h3>
          <p>Califica a tus profesores.</p>
        </div>

        <div className="bg-gray-200 p-10 shadow text-center w-72 rounded-lg">
          <h3 className="font-bold text-lg mb-2 text-gray-900">Materias</h3>
          <p>Busca los mejores profesores para tu materia.</p>
        </div>

        <div className="bg-gray-200 p-10 shadow text-center w-72 rounded-lg">
          <h3 className="font-bold text-lg mb-2 text-gray-900">Profes</h3>
          <p>Busca las calificaciones del profesor que desees.</p>
        </div>
      </section>
    </div>
  );
}
