import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEntidadComponent } from './form-entidad.component';

describe('FormEntidadComponent', () => {
  let component: FormEntidadComponent;
  let fixture: ComponentFixture<FormEntidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormEntidadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormEntidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
