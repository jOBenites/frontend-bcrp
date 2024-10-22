export interface AuthResponse {
  id: string;
  nombre: string;
  token: string
  expires_in: number;
  refreshToken: string;
  refresh_expires_in: number;
  access_token: string;
}