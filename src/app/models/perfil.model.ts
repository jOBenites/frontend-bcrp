type Writeable<T> = { -readonly [P in keyof T]: T[P] };

export class Perfil {

  readonly idPerfil: string;
  readonly idSistema: string;
  readonly nombrePerfil: string;

  public set setIdPerfil(idPerfil: string) {
    (this as Writeable<Perfil>).idPerfil = idPerfil;
  }

  public set setIdSistema(idSistema: string) {
    (this as Writeable<Perfil>).idSistema = idSistema;
  }

  public set setNombrePerfil(nombrePerfil: string) {
    (this as Writeable<Perfil>).nombrePerfil = nombrePerfil;
  }

  
}