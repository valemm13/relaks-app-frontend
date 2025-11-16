'use client';

import { useState } from 'react';

export function UserForm({ onSubmit }: { onSubmit: (data: any) => Promise<void> }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [avatar, setAvatar] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatar(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Crear FormData con todos los campos
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('email', form.email);
      formData.append('password', form.password);
      
      // Si hay imagen, agregarla
      if (avatar) {
        formData.append('avatar', avatar);
      }

      // Enviar al backend
      await onSubmit(formData);
      
      // Limpiar formulario
      setForm({ name: '', email: '', password: '' });
      setAvatar(null);
      
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold mb-4 text-center">Registro</h2>

      <input
        name="name"
        placeholder="Nombre"
        value={form.name}
        onChange={handleChange}
        className="border rounded w-full p-2"
        required
      />

      <input
        name="email"
        placeholder="Correo"
        type="email"
        value={form.email}
        onChange={handleChange}
        className="border rounded w-full p-2"
        required
      />

      <input
        name="password"
        placeholder="Contraseña (mínimo 10 caracteres)"
        type="password"
        value={form.password}
        onChange={handleChange}
        className="border rounded w-full p-2"
        required
        minLength={10}
      />

      <div>
        <label className="block text-sm mb-2"></label>
        <input
          type="file"
          onChange={handleFileChange}
          className="border rounded w-full p-2"
          accept="image/*"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`px-4 py-2 rounded w-full text-white ${
          loading 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-blue-900 hover:bg-blue-700'
        }`}
      >
        {loading ? 'Registrando...' : 'Registrarse'}
      </button>
    </form>
  );
}