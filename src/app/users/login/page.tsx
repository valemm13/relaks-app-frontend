'use client';

import LoginForm from "@/components/users/UserLogin";

export default function Login() {

  const handleLogin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const res = await fetch("http://localhost:3001/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const result = await res.json();

    if (!res.ok) {
      alert("El usuario no existe o la contraseña es incorrecta.");
      return;
    }

    // Guardar datos del usuario en localStorage
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("email", result.user.email); // Cambié "userEmail" por "email"
    localStorage.setItem("username", result.user.name || result.user.username || "Usuario"); // Agregar nombre
    
    // Si tu API devuelve foto, también la guardas:
    if (result.user.photo) {
      localStorage.setItem("photo", result.user.photo);
    }

    console.log("Datos guardados:", { // Para debug
      email: result.user.email,
      name: result.user.name,
      loggedIn: "true"
    });

    window.location.href = "/";
  };


  return (
   <div className="flex justify-center items-center min-h-[calc(100vh-80px)] bg-gray-100">
      <div className="w-full max-w-md bg-white shadow p-8 rounded-lg">
        <h1 className="text-3xl font-bold mb-5 text-center">Iniciar sesión</h1>
        <LoginForm onSubmit={handleLogin} />
      </div>
    </div>
  );
}