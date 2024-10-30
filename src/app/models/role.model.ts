type Writeable<T> = { -readonly [P in keyof T]: T[P] };

export class Role {

  readonly idRol: string;
  readonly idSistema: string;
  readonly nombreRol: string;

  public set setIdRol(idRol: string) {
    (this as Writeable<Role>).idRol = idRol;
  }

  public set setIdSistema(idSistema: string) {
    (this as Writeable<Role>).idSistema = idSistema;
  }

  public set setNombreRol(nombreRol: string) {
    (this as Writeable<Role>).nombreRol = nombreRol;
  }

  
}