type Writeable<T> = { -readonly [P in keyof T]: T[P] };

export class Modulo {
  
  readonly idModulo: number;
  readonly idSistema: string;
  readonly nombreModulo: string;


  public set setIdModulo(idModulo: number) {
    (this as Writeable<Modulo>).idModulo = idModulo;
  }

  public set setIdSistema(idSistema: string) {
    (this as Writeable<Modulo>).idSistema = idSistema;
  }

  public set setNombreModulo(nombreModulo: string) {
    (this as Writeable<Modulo>).nombreModulo = nombreModulo;
  }
  
}