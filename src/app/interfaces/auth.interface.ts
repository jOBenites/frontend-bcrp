export interface AuthResponse {
  id: string;
  name: string;
  expires_in: number;
  refresh_token: string;
  refresh_expires_in: number;
  access_token: string;
}