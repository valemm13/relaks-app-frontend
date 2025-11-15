'use client';
import { usePathname } from "next/navigation";

export default function Header() {
    const pathname = usePathname();
return (
    <header className="flex items-center justify-between bg-blue-900 text-white px-10 py-4">
        <div className="flex items-center gap-10">
        <img src="flor.png" className="w-16" alt="Logo" />
        <nav className="flex space-x-8">
            <a
            href="/"
            className={`${pathname === "/" ? "text-yellow-300 font-bold underline underline-offset-4" : "hover:text-yellow-300"}`}
            >
            Inicio
            </a>
            <a
            href="/calificar"
            className={`${pathname === "calificar" ? "text-yellow-300 font-bold underline underline-offset-4" : "hover:text-yellow-300"}`}
            >
            Calificar
            </a>
            <a
            href="/materias"
            className={`${pathname === "materias" ? "text-yellow-300 font-bold underline underline-offset-4" : "hover:text-yellow-300"}`}
            >
            Materias
            </a>
            <a
            href="profes"
            className={`${pathname === "profes" ? "text-yellow-300 font-bold underline underline-offset-4" : "hover:text-yellow-300"}`}
            >
            Profes
            </a>
        </nav>
        </div>
        <img src="usuario.png" className="w-12 h-12 rounded-full hover:opacity-80 cursor-pointer" alt="Usuario" />
    </header>)
}