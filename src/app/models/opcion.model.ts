type Writeable<T> = { -readonly [P in keyof T]: T[P] };

export class Opcion {

  readonly optionId: number;
  readonly moduleId: number;
  readonly systemId: string;
  readonly optionName: string;
  readonly url: string;
  readonly state: string;

  public set setIdOpcion(idOpcion: number) {
    (this as Writeable<Opcion>).optionId = idOpcion;
  }

  public set setIdModulo(idModulo: number) {
    (this as Writeable<Opcion>).moduleId = idModulo;
  }

  public set setIdSistema(idSistema: string) {
    (this as Writeable<Opcion>).systemId = idSistema;
  }

  public set setNombreModulo(nombreOpcion: string) {
    (this as Writeable<Opcion>).optionName = nombreOpcion;
  }

  public set setUrl(url: string) {
    (this as Writeable<Opcion>).url = url;
  }

  public set setEstado(estado: string){
    (this as Writeable<Opcion>).state = estado;
  }
  
}