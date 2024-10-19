type Writeable<T> = { -readonly [P in keyof T]: T[P] };

export class Sistema {
  
  readonly idSistema: number;
  readonly codigo: string;
  readonly nombre: string;
  readonly version: string;
  readonly logoMain: string; 
  readonly logoHead: string;
  readonly url: string;


  public set setIdSistema(idSistema: number) {
    (this as Writeable<Sistema>).idSistema = idSistema;
  }
  public set setCodigo(value: string) {
    (this as Writeable<Sistema>).codigo = value;
  }
  public set setNombre(value: string) {
    (this as Writeable<Sistema>).nombre = value;
  }
  public set setVersion(value: string) {
    (this as Writeable<Sistema>).version = value;
  }
  public set setLogoMain(value: string) {
    (this as Writeable<Sistema>).logoMain = value;
  }
  public set setLogoHead(value: string) {
    (this as Writeable<Sistema>).logoHead = value;
  }
  public set setUrl(value: string) {
    (this as Writeable<Sistema>).url = value;
  }
  
}