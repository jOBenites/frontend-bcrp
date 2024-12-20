import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component'
import { UsuariosComponent } from './pages/home/usuarios/usuarios.component';
import { SistemasComponent } from './pages/home/sistemas/sistemas.component';
import { FormSistemaComponent } from './pages/home/sistemas/form-sistema/form-sistema.component';
import { EntidadesComponent } from './pages/home/entidades/entidades.component';
import { FormEntidadComponent } from './pages/home/entidades/form-entidad/form-entidad.component';
import { ModulosComponent } from './pages/home/modulos/modulos.component';
import { OpcionesComponent } from './pages/home/opciones/opciones.component';
import { FormModuloComponent } from './pages/home/modulos/form-modulo/form-modulo.component';
import { PerfilesComponent } from './pages/home/perfiles/perfiles.component';
import { FormPerfilComponent } from './pages/home/perfiles/form-perfil/form-perfil.component';
import { FormOpcionComponent } from './pages/home/opciones/form-opcion/form-opcion.component';
import { RolesComponent } from './pages/home/roles/roles.component';
import { FormRoleComponent } from './pages/home/roles/form-role/form-role.component';
import { FormUsuarioComponent } from './pages/home/usuarios/form-usuario/form-usuario.component';
import { AuthGuard } from './services/auth.guard';
import { MfaComponent } from './pages/login/mfa/mfa.component';
import { SignInComponent } from './pages/login/sign-in/sign-in.component';

export const routes: Routes = [
  { path: 'home', 
    component: HomeComponent, 
    canActivate: [AuthGuard],
    children: [
      { path: 'usuarios', component: UsuariosComponent },
      { path: 'usuarios/nuevo-usuario', component: FormUsuarioComponent },
      { path: 'sistemas', component: SistemasComponent },
      { path: 'sistemas/formulario', component: FormSistemaComponent },
      { path: 'entidades', component: EntidadesComponent },
      { path: 'entidades/nueva-entidad', component: FormEntidadComponent },
      { path: 'modulos', component: ModulosComponent },
      { path: 'modulos/nuevo-modulo', component: FormModuloComponent },
      { path: 'opciones', component: OpcionesComponent },
      { path: 'opciones/nueva-opcion', component: FormOpcionComponent },
      { path: 'perfiles', component: PerfilesComponent },
      { path: 'perfiles/nuevo-perfil', component: FormPerfilComponent },
      { path: 'roles', component: RolesComponent },
      { path: 'roles/nuevo-rol', component: FormRoleComponent },
    ] 
  },
  { path: 'portal', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'login', 
    component: LoginComponent,
    children: [
      { path: 'sign-in', component: SignInComponent },
      { path: 'mfa', component: MfaComponent },
      { path: '', redirectTo: 'sign-in', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: 'login/sign-in', pathMatch: 'full' },
  { path: '**', redirectTo: 'login/sign-in' }
];
