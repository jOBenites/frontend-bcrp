type Writeable<T> = { -readonly [P in keyof T]: T[P] };

export class Opcion {

  readonly idOpcion: number;
  readonly idModulo: number;
  readonly idSistema: string;
  readonly nombreOpcion: string;
  readonly url: string;
  readonly estado: string;

  public set setIdOpcion(idOpcion: number) {
    (this as Writeable<Opcion>).idOpcion = idOpcion;
  }

  public set setIdModulo(idModulo: number) {
    (this as Writeable<Opcion>).idModulo = idModulo;
  }

  public set setIdSistema(idSistema: string) {
    (this as Writeable<Opcion>).idSistema = idSistema;
  }

  public set setNombreModulo(nombreOpcion: string) {
    (this as Writeable<Opcion>).nombreOpcion = nombreOpcion;
  }

  public set setUrl(url: string) {
    (this as Writeable<Opcion>).url = url;
  }

  public set setEstado(estado: string){
    (this as Writeable<Opcion>).estado = estado;
  }
  
}