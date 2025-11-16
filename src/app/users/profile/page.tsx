"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage() {
    const router = useRouter();

    const [user, setUser] = useState({
        name: "",
        email: "",
        photo: ""
    });

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Verificar que estamos en el cliente
        if (typeof window === "undefined") return;

        const logged = localStorage.getItem("loggedIn");

        if (logged !== "true") {
            router.push("/users/login");
            return;
        }

        // Obtener los datos del usuario
        const storedName = localStorage.getItem("username");
        const storedEmail = localStorage.getItem("email");
        const storedPhoto = localStorage.getItem("photo");

        console.log("Datos cargados:", { storedName, storedEmail, storedPhoto }); // Para debug

        setUser({
            name: storedName || "Usuario",
            email: storedEmail || "correo@example.com",
            photo: storedPhoto || ""
        });

        setIsLoading(false);
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("username");
        localStorage.removeItem("email");
        localStorage.removeItem("photo");
        router.push("/");
    };

    // Mostrar loading mientras carga
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <p>Cargando...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">

            {/* BARRA SUPERIOR */}
            <div className="bg-blue-900 text-white py-6 relative flex justify-center items-center">
                <button 
                    onClick={() => router.back()}
                    className="absolute left-6 bg-transparent border border-white rounded-full w-12 h-12 flex items-center justify-center hover:bg-blue-600 transition"
                >
                    ←
                </button>
                <h1 className="text-3xl font-semibold">Perfil</h1>
            </div>

            {/* CONTENIDO */}
            <div className="flex flex-col items-center mt-8">

                {/* FOTO DEL PERFIL */}
                <div className="w-40 h-40 rounded-full bg-gray-300 border-4 border-white shadow-lg flex items-center justify-center overflow-hidden">
                    {user.photo && user.photo !== "" ? (
                        <img
                            src={user.photo}
                            alt="Foto de perfil"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <svg 
                            className="w-24 h-24 text-gray-600" 
                            fill="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                        </svg>
                    )}
                </div>

                {/* DATOS */}
                <div className="mt-10 w-full max-w-sm space-y-5 px-4">
                    <div className="border border-gray-300 py-3 px-4 text-center bg-white rounded shadow-sm">
                        {user.name}
                    </div>

                    <div className="border border-gray-300 py-3 px-4 text-center bg-white rounded shadow-sm">
                        {user.email}
                    </div>

                    <button className="border border-gray-300 py-3 w-full text-center bg-white rounded hover:bg-gray-200 transition shadow-sm">
                        Calificaciones
                    </button>
                </div>

                {/* CERRAR SESIÓN */}
                <button 
                    onClick={handleLogout}
                    className="mt-10 text-blue-900 font-semibold flex items-center gap-2 hover:text-blue-900 transition"
                >
                    Cerrar sesión →
                </button>

            </div>
        </div>
    );
}