import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { PipesModule } from '../../pipes/pipes.module';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, PipesModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  sistemas: Array<any>;
  constructor(readonly router: Router){
    this.sistemas = [
      {
        grupo: [
          {
            id: 1,
            titulo: "Insad Servicios",
            imagen: "img1"
          },
          {
            id: 2,
            titulo: "Módulo de Seguridad Centralizada de Aplicaciones",
            imagen: "img2"
          },
          {
            id: 3,
            titulo: "Sife",
            imagen: "img3"
          }
        ],
      }
    ];
  }

  seleccionarSistema(data: any): void {
    this.router.navigate(['home', {id: data.id}]);
  }

}
