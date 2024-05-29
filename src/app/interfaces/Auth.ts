export interface Auth{
    id?: string | number;
    email: string;
    password: string
}

export interface AuthResponse {
    token: string;
  }