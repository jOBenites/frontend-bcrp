type Writeable<T> = { -readonly [P in keyof T]: T[P] };
// type Mutable<T> = { -readonly [P in keyof T]: T[P] };
export class Usuario {
  
  readonly usuario: string;
  readonly password: string;

  public set setUsuario(usuario: string) {
    (this as Writeable<Usuario>).usuario = usuario; 
  }

  public set setPassword(password: string) {
    (this as Writeable<Usuario>).password = password;
  }

}