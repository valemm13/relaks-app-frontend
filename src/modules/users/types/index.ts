// Tipos usados en tu módulo de Users
export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
}

export interface CreateUserDto {
  name: string;
  email: string;
  avatar?: string;
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
  avatar?: string;
}

export interface SearchUserDto{
  name?: string;
  email?: string;
}
export interface UserFilters {
  name?: string;
  email?: string;
}
