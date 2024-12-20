type Writeable<T> = { -readonly [P in keyof T]: T[P] };

export class Sistema {
  
  readonly idSystem: number;
  readonly code: string;
  readonly name: string;
  readonly version: string;
  readonly logoMain: string; 
  readonly logoHead: string;
  readonly url: string;
  readonly estate: string;
  readonly userResponsible: string;
  readonly idUserResponsible: number;
  readonly userResponsibleAlternate: string;
  readonly idUserResponsibleAlternate: number;
  readonly urlExternal: string;
  readonly idStateCritical: string;
  readonly unitOrganizational: string;
  readonly delete: number;


  public set setIdSistema(idSistema: number) {
    (this as Writeable<Sistema>).idSystem = idSistema;
  }
  public set setCodigo(value: string) {
    (this as Writeable<Sistema>).code = value;
  }
  public set setNombre(value: string) {
    (this as Writeable<Sistema>).name = value;
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
  public set setEstado(estado: string){
    (this as Writeable<Sistema>).userResponsible = estado;
  }
  public set setIdUserResponsible(estado: number){
    (this as Writeable<Sistema>).idUserResponsible = estado;
  }
  public set setUserResponsibleAlternate(estado: string){
    (this as Writeable<Sistema>).userResponsibleAlternate = estado;
  }
  public set setIdUserResponsibleAlternate(estado: number){
    (this as Writeable<Sistema>).idUserResponsibleAlternate = estado;
  }
  public set setUrlExternal(estado: string){
    (this as Writeable<Sistema>).urlExternal = estado;
  }
  public set setIdStateCritical(estado: string){
    (this as Writeable<Sistema>).idStateCritical = estado;
  }
  public set setUnitOrganizational(estado: string){
    (this as Writeable<Sistema>).unitOrganizational = estado;
  }
  public set setDelete(estado: number){
    (this as Writeable<Sistema>).delete = estado;
  }
  
}