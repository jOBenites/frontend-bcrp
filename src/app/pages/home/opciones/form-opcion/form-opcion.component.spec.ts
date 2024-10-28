import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormOpcionComponent } from './form-opcion.component';

describe('FormOpcionComponent', () => {
  let component: FormOpcionComponent;
  let fixture: ComponentFixture<FormOpcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormOpcionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormOpcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
