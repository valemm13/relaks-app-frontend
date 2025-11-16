'use client';

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Header() {
    const pathname = usePathname();
    const [openMenu, setOpenMenu] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    // Al cargar el header, revisa si hay login guardado
    useEffect(() => {
        const logged = localStorage.getItem("loggedIn");
        setIsLoggedIn(logged === "true");
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("loggedIn");
        setIsLoggedIn(false);
    };

    return (
        <header className="flex items-center justify-between bg-blue-900 text-white px-10 py-4">
            <div className="flex items-center gap-10">
                <img src="flor.png" className="w-16" alt="Logo" />
                <nav className="flex space-x-8">
                    <Link href="/" className={`${pathname==="/" ? "text-yellow-300 font-bold underline underline-offset-4" : "hover:text-yellow-300"}`}>
                        Inicio
                    </Link>
                    <Link href="/calificar" className={`${pathname==="/calificar" ? "text-yellow-300 font-bold underline underline-offset-4" : "hover:text-yellow-300"}`}>
                        Calificar
                    </Link>
                    <Link href="/materias" className={`${pathname==="/materias" ? "text-yellow-300 font-bold underline underline-offset-4" : "hover:text-yellow-300"}`}>
                        Materias
                    </Link>
                    <Link href="/profes" className={`${pathname==="/profes" ? "text-yellow-300 font-bold underline underline-offset-4" : "hover:text-yellow-300"}`}>
                        Profes
                    </Link>
                </nav>
            </div>

            <div className="relative">
                <img 
                    src="usuario.webp" 
                    className="w-12 h-12 rounded-full hover:opacity-80 cursor-pointer"
                    onClick={() => setOpenMenu(!openMenu)}
                /> 

                {openMenu && (
                    <div className="absolute right-0 mt-2 bg-white text-black rounded-lg shadow-lg w-40 p-2">
                        {!isLoggedIn ? (
                            <>
                                <Link href="/users/login" className="block px-3 py-2 hover:bg-gray-200 rounded">Iniciar sesión</Link>
                                <Link href="/users/register" className="block px-3 py-2 hover:bg-gray-200 rounded">Registrarse</Link>
                            </>
                        ) : (
                            <>
                                <Link href="/users/profile" className="block px-3 py-2 hover:bg-gray-200 rounded">Ver perfil</Link>
                                <button 
                                    className="w-full text-left px-3 py-2 hover:bg-gray-200 rounded"
                                    onClick={handleLogout}
                                >
                                    Cerrar sesión
                                </button>
                            </>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
}
