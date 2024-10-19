export interface Autenticacion {
  exp: number;
  iat: number;
  jti: string;
  iss: string;
  aud: string;
  sub: string;
  typ: string;
  azp: string;
  session_state: string;
  acr: string;
  realm_access: Realmaccess;
  resource_access: Resourceaccess;
  scope: string;
  sid: string;
  email_verified: boolean;
  preferred_username: string;
  given_name: string;
  family_name: string;
}

interface Resourceaccess {
  account: Realmaccess;
}

interface Realmaccess {
  roles: string[];
}