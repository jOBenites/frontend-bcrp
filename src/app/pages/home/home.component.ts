import { AfterViewInit, Component, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule, MatExpansionPanel } from '@angular/material/expansion';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { PipesModule } from '../../pipes/pipes.module';
import { Menu } from '../../models/menu.model';
import { SpinnerObserverService } from '../../services/spinner-observer.service';
import { Subscription, switchMap } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { SessionService } from '../../services/session.service';

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
    NgxSpinnerModule,
    PipesModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  public titlePage: string;
  public showSpinner = false;

  @ViewChild('drawer', { read: false, static: false }) sidenav: MatSidenav | undefined;
  @ViewChildren(MatExpansionPanel) viewPanels: QueryList<MatExpansionPanel> | undefined;
  public sidenavWidth = 20;
  public hideArrow: boolean = false;
  modo__: DrawerMode = DrawerMode.Side;
  _allExpandState = false;
  static readonly ROUTE_DATA_BREADCRUMB = 'title';
  readonly home = {icon: 'icon ion-ios-home', url: 'home'};
  dataMenus: Array<Menu>;
  menus: Menu | undefined;
  private spinnerSubscription: Subscription;
  userName: string = '';
  constructor(
      readonly router: Router, 
      readonly route: ActivatedRoute,
      readonly spinnerObserver: SpinnerObserverService,
      readonly spinner: NgxSpinnerService,
      readonly authService: AuthService,
      readonly sessionService: SessionService) {
      this.titlePage = "home component";
      this.dataMenus = [];
      this.menus = {idSistema: 0, opciones: []};
      // this.state$ = this.route.paramMap.pipe(map((value: ParamMap) => value));
  }

  ngOnInit(): void {
    let params = this.route.snapshot.params;
    console.log(params);
    this.getMenus(params['id']);

    this.spinnerSubscription = this.spinnerObserver.getStateSpinner().subscribe((value: boolean) => {
      value ? this.spinner.show() : this.spinner.hide();
    });

    let user = this.sessionService.getUser();
    if(user){
      this.userName = user;
    }
  }

  ngOnDestroy(): void {
    this.spinnerSubscription.unsubscribe();
  }

  getMenus(id: number){
    this.dataMenus = [
      {
        idSistema: 1,
        opciones: [
          {
            icono: 'account_circle',
            titulo: 'Opción 1',
            url: '',
            subopciones: []
          },
          {
            icono: 'account_circle',
            titulo: 'Opción 2',
            url: '',
            subopciones: []
          },
          {
            icono: 'account_circle',
            titulo: 'Opción 3',
            url: '',
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
            url: 'usuarios',
            subopciones: []
          },
          {
            icono: 'settings_accessibility',
            titulo: 'Roles y Perfiles',
            url: '',
            subopciones: [
              {
                titulo: 'Gestión de roles',
                url: 'roles'
              },
              {
                titulo: 'Gestión de perfiles',
                url: 'perfiles'
              }
            ]
          },
          {
            icono: 'verified_user',
            titulo: 'Entidades y Sistemas',
            url: '',
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
          },
          {
            icono: 'format_list_numbered',
            titulo: 'Módulos y opciones',
            url: '',
            subopciones: [
               {
                titulo: 'Módulos',
                url: 'modulos'
              },
              {
                titulo: 'Opciones',
                url: 'opciones'
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
    this.allExpandState = false;
    if (this.sidenavWidth >= 20) {
      this.decrease();
    } else {
      this.increase();
    }
  }

  drawerToogleMovile() {
    this.modo__= DrawerMode.Over;
  }

  increase() {
    this.sidenavWidth = 20;
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
    this.authService.logout()
    .subscribe({
      next: res => {
        console.log(res);
        this.router.navigateByUrl('login');
      },
      error: err => {
        console.log(err);
        this.router.navigateByUrl('login');
      }
    });
  }

  public navigateTo(view: string) {
    this.router.navigate([view]);
  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }

}
