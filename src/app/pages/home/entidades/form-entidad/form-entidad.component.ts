import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Location } from "@angular/common";

@Component({
  selector: 'app-form-entidad',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatCardModule,
    MatButtonModule
  ],
  providers: [
     {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}
  ],
  templateUrl: './form-entidad.component.html',
  styleUrl: './form-entidad.component.scss'
})
export class FormEntidadComponent {

  public formGroup: FormGroup;
  constructor(readonly fb: FormBuilder, readonly location: Location){
    this.formGroup = this.fb.group({
      codigo: ['', Validators.required],
      ruc: ['', Validators.required],
      nombre: ['', Validators.required],
      sigla: ['', Validators.required]
    });
  }

  cancel(){
    this.location.back();
  }

  save(){

  }

}
