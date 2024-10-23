import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component'
import { UsuariosComponent } from './pages/home/usuarios/usuarios.component';
import { SistemasComponent } from './pages/home/sistemas/sistemas.component';
import { FormSistemaComponent } from './pages/home/sistemas/form-sistema/form-sistema.component';
import { EntidadesComponent } from './pages/home/entidades/entidades.component';
import { FormEntidadComponent } from './pages/home/entidades/form-entidad/form-entidad.component';

export const routes: Routes = [
  { path: 'home', 
    component: HomeComponent, 
    children: [
    { path: 'usuarios', component: UsuariosComponent },
    { path: 'sistemas', component: SistemasComponent },
    { path: 'sistemas/formulario', component: FormSistemaComponent },
    { path: 'entidades', component: EntidadesComponent },
    { path: 'entidades/nueva-entidad', component: FormEntidadComponent }
  ] },
  { path: 'portal', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];
