import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSistemaComponent } from './form-sistema.component';

describe('FormSistemaComponent', () => {
  let component: FormSistemaComponent;
  let fixture: ComponentFixture<FormSistemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormSistemaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormSistemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
