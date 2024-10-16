import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoSistemaComponent } from './listado-sistema.component';

describe('ListadoSistemaComponent', () => {
  let component: ListadoSistemaComponent;
  let fixture: ComponentFixture<ListadoSistemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoSistemaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoSistemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
