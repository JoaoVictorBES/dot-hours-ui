import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarProjetosComponent } from './listar-projetos.component';

describe('ListaProjetosComponent', () => {
  let component: ListarProjetosComponent;
  let fixture: ComponentFixture<ListarProjetosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarProjetosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListarProjetosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
