import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Location } from "@angular/common";

@Component({
  selector: 'app-form-sistema',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatCardModule,
    MatButtonModule
  ],
  providers: [
     {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}
  ],
  templateUrl: './form-sistema.component.html',
  styleUrl: './form-sistema.component.scss'
})
export class FormSistemaComponent {
  
  public formGroup: FormGroup;
  constructor(readonly fb: FormBuilder, readonly location: Location){
    this.formGroup = this.fb.group({
      sistema: ['', Validators.required],
      version: ['', Validators.required],
      url: ['', Validators.required]
    });
  }

  cancel(){
    this.location.back();
  }

  save(){

  }

}
