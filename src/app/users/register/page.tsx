'use client';
import { useState } from 'react';
import { UserForm } from '@/components/users/UserForm';
import { createUser } from '@/modules/users/services';

export default function UsersPage() {
  const [message, setMessage] = useState<string | null>(null);

  const handleCreateUser = async (data: any) => {
    setMessage(null);
    try {
      console.log('Enviando:', data);
      const newUser = await createUser(data);
      console.log('Usuario creado:', newUser);
      localStorage.setItem("loggedIn", "true");
      setTimeout(() => {
        window.location.href = '/'; 
      }, 1000);
      
    } catch (error) {
      console.error('Error:', error);
      
      if (error instanceof Error) {
        setMessage(`Error: ${error.message}`);
      } else {
        setMessage('Error al crear el usuario');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">
        Registrarse
      </h1>

      {message && (
        <div className={`max-w-md mx-auto mb-4 shadow p-4 rounded text-center ${
          message.includes('Correcto') 
            ? 'bg-green-100 text-green-700' 
            : 'bg-red-100 text-red-700'
        }`}>
          {message}
        </div>
      )}

      <div className="max-w-md mx-auto bg-white shadow p-6 rounded">
        <UserForm onSubmit={handleCreateUser} />
      </div>
    </div>
  );
}