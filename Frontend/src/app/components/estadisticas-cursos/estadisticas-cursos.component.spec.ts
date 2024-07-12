import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticasCursosComponent } from './estadisticas-cursos.component';

describe('EstadisticasCursosComponent', () => {
  let component: EstadisticasCursosComponent;
  let fixture: ComponentFixture<EstadisticasCursosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstadisticasCursosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstadisticasCursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
