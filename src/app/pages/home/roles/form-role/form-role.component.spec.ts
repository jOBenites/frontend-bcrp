import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRoleComponent } from './form-role.component';

describe('FormRoleComponent', () => {
  let component: FormRoleComponent;
  let fixture: ComponentFixture<FormRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormRoleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
