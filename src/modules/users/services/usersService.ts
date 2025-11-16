// src/services/userService.ts
import type {
  CreateUserDto,
  UpdateUserDto,
  SearchUserDto,
  User
} from "../types";

const API_BASE_URL = "/api";

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

// Obtener todos los usuarios
export async function getAllUsers(): Promise<User[]> {
  const response = await fetch(`${API_BASE_URL}/users`);
  if (!response.ok) throw new ApiError(response.status, "Error al obtener usuarios");
  return response.json();
}

// Obtener usuario por ID
export async function getUserById(id: number): Promise<User> {
  const response = await fetch(`${API_BASE_URL}/users/${id}`);
  if (!response.ok) throw new ApiError(response.status, "Error al obtener usuario");
  return response.json();
}

// Crear usuario
export async function createUser(data: any): Promise<User> {
  const isFormData = data instanceof FormData;
  
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: "POST",
    headers: isFormData ? {} : { "Content-Type": "application/json" },
    body: isFormData ? data : JSON.stringify(data),
  });

  if (!response.ok) {
    throw new ApiError(response.status, "No se pudo crear el usuario");
  }
  
  return response.json();
}

// Actualizar usuario
export async function updateUser(id: number, data: UpdateUserDto): Promise<User> {
  const response = await fetch(`${API_BASE_URL}/users/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new ApiError(response.status, "No se pudo actualizar el usuario");
  return response.json();
}

// Eliminar usuario
export async function deleteUser(id: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/users/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) throw new ApiError(response.status, "No se pudo eliminar el usuario");
}

// Buscar usuarios con filtros
export async function searchUsers(filters: SearchUserDto): Promise<User[]> {
  const query = new URLSearchParams(filters as any).toString();
  const response = await fetch(`${API_BASE_URL}/users/search?${query}`);

  if (!response.ok) throw new ApiError(response.status, "Error al buscar usuarios");
  return response.json();
}

// Login de usuario
export async function loginUser(data: { email: string; password: string }) {
  const response = await fetch(`${API_BASE_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new ApiError(response.status, result.message || "Error al iniciar sesión");
  }

  return result; 
}
