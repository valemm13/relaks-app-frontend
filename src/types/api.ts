// interfaz y dto de cada modulo

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  avatar: string;
}

// DTOs for API requests
export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  avatar: string;
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
  password?: string;
  avatar?: string;
}
