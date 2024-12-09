type Writeable<T> = { -readonly [P in keyof T]: T[P] };

export class Role {

  readonly idRol: string;
  readonly idSistema: string;
  readonly nombreSistema: string;
  readonly nombreRol: string;
  readonly estado: string;

  public set setIdRol(idRol: string) {
    (this as Writeable<Role>).idRol = idRol;
  }

  public set setIdSistema(idSistema: string) {
    (this as Writeable<Role>).idSistema = idSistema;
  }

  public set setNombreSistema(nombreSistema: string) {
    (this as Writeable<Role>).nombreSistema = nombreSistema;
  }

  public set setNombreRol(nombreRol: string) {
    (this as Writeable<Role>).nombreRol = nombreRol;
  }

  public set setEstado(estado: string){
    (this as Writeable<Role>).estado = estado;
  }

  
}