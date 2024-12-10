type Writeable<T> = { -readonly [P in keyof T]: T[P] };

export class Perfil {

  readonly idPerfil: number;
  readonly idSistema: number;
  readonly idEntidad: number;
  readonly idRol: number;
  readonly nombrePerfil: string;
  readonly estado: string;

  public set setIdPerfil(idPerfil: number) {
    (this as Writeable<Perfil>).idPerfil = idPerfil;
  }

  public set setIdSistema(idSistema: number) {
    (this as Writeable<Perfil>).idSistema = idSistema;
  }

  public set setIdEntidad(idEntidad: number) {
    (this as Writeable<Perfil>).idEntidad = idEntidad;
  }

  public set setIdRol(idRol: number) {
    (this as Writeable<Perfil>).idRol = idRol;
  }

  public set setNombrePerfil(nombrePerfil: string) {
    (this as Writeable<Perfil>).nombrePerfil = nombrePerfil;
  }

  public set setEstado(estado: string){
    (this as Writeable<Perfil>).estado = estado;
  }
  
}