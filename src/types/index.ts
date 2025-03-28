export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
  user_id?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface ApiResponse<T> {
  data: T;
  page?: number;
  per_page?: number;
  total?: number;
  total_pages?: number;
}

export interface SignUpCredentials {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}