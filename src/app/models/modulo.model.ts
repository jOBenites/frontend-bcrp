type Writeable<T> = { -readonly [P in keyof T]: T[P] };

export class Modulo {
  
  readonly moduleId: number;
  readonly systemId: string;
  readonly moduleName: string;
  readonly state: string;

  public set setIdModulo(idModulo: number) {
    (this as Writeable<Modulo>).moduleId = idModulo;
  }

  public set setIdSistema(idSistema: string) {
    (this as Writeable<Modulo>).systemId = idSistema;
  }

  public set setNombreModulo(nombreModulo: string) {
    (this as Writeable<Modulo>).moduleName = nombreModulo;
  }
  public set setEstado(estado: string){
    (this as Writeable<Modulo>).state = estado;
  }
  
}