// Tipos específicos del módulo Users
import type { User, CreateUserDto, UpdateUserDto } from '@/types/api';


export interface UserFilters {
  search?: string;
  ageRange?: {
    min: number;
    max: number;
  };
  goal?: string;
}

export type { User, CreateUserDto, UpdateUserDto };