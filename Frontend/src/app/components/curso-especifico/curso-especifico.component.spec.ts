import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoEspecificoComponent } from './curso-especifico.component';

describe('CursoEspecificoComponent', () => {
  let component: CursoEspecificoComponent;
  let fixture: ComponentFixture<CursoEspecificoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CursoEspecificoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CursoEspecificoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
