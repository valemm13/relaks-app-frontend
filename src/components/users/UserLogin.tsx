'use client';
import { useState } from "react";

type UserLoginProps = {
  onSubmit: (data: { email: string; password: string }) => void;
};

export default function UserLogin({ onSubmit } : UserLoginProps) { const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState("");

    return(
        <form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
            e.preventDefault();
            onSubmit({email,password})
        }}
        >
        <input
            type ="email"
            placeholder="Correo"
            className="border p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
      />
        <input
            type="password"
            placeholder="Contraseña"
            className="border p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-blue-900 text-white py-2 rounded">
            Iniciar sesión
        </button>
        </form>
  );
}