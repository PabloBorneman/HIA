import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursosDictadosComponent } from './cursos-dictados.component';

describe('CursosDictadosComponent', () => {
  let component: CursosDictadosComponent;
  let fixture: ComponentFixture<CursosDictadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CursosDictadosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CursosDictadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
