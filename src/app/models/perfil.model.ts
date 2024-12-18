type Writeable<T> = { -readonly [P in keyof T]: T[P] };

export class Perfil {

  readonly profileId: number;
  readonly systemId: number;
  readonly entityId: number;
  readonly roleId: number;
  readonly profileName: string;
  readonly state: string;

  public set setIdPerfil(idPerfil: number) {
    (this as Writeable<Perfil>).profileId = idPerfil;
  }

  public set setIdSistema(idSistema: number) {
    (this as Writeable<Perfil>).systemId = idSistema;
  }

  public set setIdEntidad(idEntidad: number) {
    (this as Writeable<Perfil>).entityId = idEntidad;
  }

  public set setIdRol(idRol: number) {
    (this as Writeable<Perfil>).roleId = idRol;
  }

  public set setNombrePerfil(nombrePerfil: string) {
    (this as Writeable<Perfil>).profileName = nombrePerfil;
  }

  public set setEstado(estado: string){
    (this as Writeable<Perfil>).state = estado;
  }
  
}