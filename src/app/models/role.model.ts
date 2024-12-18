type Writeable<T> = { -readonly [P in keyof T]: T[P] };

export class Role {

  readonly roleId: string;
  readonly systemId: string;
  readonly systemName: string;
  readonly roleName: string;
  readonly state: string;

  public set setIdRol(idRol: string) {
    (this as Writeable<Role>).roleId = idRol;
  }

  public set setIdSistema(idSistema: string) {
    (this as Writeable<Role>).systemId = idSistema;
  }

  public set setNombreSistema(nombreSistema: string) {
    (this as Writeable<Role>).systemName = nombreSistema;
  }

  public set setNombreRol(nombreRol: string) {
    (this as Writeable<Role>).roleName = nombreRol;
  }

  public set setEstado(estado: string){
    (this as Writeable<Role>).state = estado;
  }

  
}