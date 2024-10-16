import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule, MatExpansionPanel } from '@angular/material/expansion';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { PipesModule } from '../../pipes/pipes.module';
import { Menu } from '../../models/menu.model';

enum DrawerMode {
  Side = "side",
  Over = "over",
  Push = "push"
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,
    RouterModule, 
    MatSidenavModule, 
    MatIconModule, 
    MatListModule, 
    MatExpansionModule, 
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    PipesModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  public titlePage: string;
  public showSpinner = false;

  @ViewChild('drawer', { read: false, static: false }) sidenav: MatSidenav | undefined;
  @ViewChildren(MatExpansionPanel) viewPanels: QueryList<MatExpansionPanel> | undefined;
  public sidenavWidth = 19;
  public hideArrow: boolean = false;
  modo__: DrawerMode = DrawerMode.Side;
  _allExpandState = false;
  static readonly ROUTE_DATA_BREADCRUMB = 'title';
  readonly home = {icon: 'icon ion-ios-home', url: 'home'};
  // state$: Observable<object>;
  dataMenus: Array<Menu>;
  menus: Menu | undefined;
  constructor(readonly router: Router, readonly route: ActivatedRoute) {
      this.titlePage = "home component";
      this.dataMenus = [];
      this.menus = {idSistema: 0, opciones: []};
      // this.state$ = this.route.paramMap.pipe(map((value: ParamMap) => value));
  }

  ngOnInit(): void {
    // this.state$.subscribe((data) => {
    //   console.log(data);
    // });
    let params = this.route.snapshot.params;
    console.log(this.route.snapshot.params);
    this.getMenus(params['id']);
  }

  getMenus(id: number){
    this.dataMenus = [
      {
        idSistema: 1,
        opciones: [
          {
            icono: 'account_circle',
            titulo: 'Opción 1',
            subopciones: []
          },
          {
            icono: 'account_circle',
            titulo: 'Opción 2',
            subopciones: []
          },
          {
            icono: 'account_circle',
            titulo: 'Opción 3',
            subopciones: []
          }
        ]
      },
      {
        idSistema: 2,
        opciones: [
          {
            icono: 'account_circle',
            titulo: 'Usuarios',
            subopciones: []
          },
          {
            icono: 'settings_accessibility',
            titulo: 'Roles y Perfiles',
            subopciones: []
          },
          {
            icono: 'verified_user',
            titulo: 'Entidades y Sistemas',
            subopciones: [
              {
                titulo: 'Gestión de entidades',
                url: 'entidades'
              },
              {
                titulo: 'Gestión de sistemas',
                url: 'sistemas'
              }
            ]
          }
        ]
      }
    ];

    this.dataMenus = this.dataMenus.filter((value: Menu | undefined) => {
      return value?.idSistema == id;
    });
    this.menus = this.dataMenus[0];
  }

  drawerToogle() {
    this.modo__ = DrawerMode.Side;
    // this.allExpandState = false;
    // if (this.sidenavWidth >= 16) {
    //   this.decrease();
    // } else {
    //   this.increase();
    // }
  }

  drawerToogleMovile() {
    this.modo__= DrawerMode.Over;
  }

  increase() {
    this.sidenavWidth = 16;
    this.hideArrow = false;
  }

  decrease() {
    this.sidenavWidth = 4;
    this.hideArrow = true;
  }

   private set allExpandState (value: boolean) {
    this._allExpandState = value;
    this.togglePanels(value);
  }

  private get allExpandState (): boolean {
    return this._allExpandState;
  }

  private togglePanels(value: boolean) {
    if(this.viewPanels){
      this.viewPanels.forEach(p => value ? p.open() : p.close());
    }
  }

  public closeSideNav(): void
  {
    if(this.modo__ == DrawerMode.Over){
      if(this.sidenav){
        this.sidenav.close();
      }
    }
  }

  public closeSession(): void {
    // localStorage.removeItem('user');
    this.router.navigateByUrl('login');
  }

  public navigateTo(view: string) {
    this.router.navigate([view]);
  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }

}
