import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarLancamentosComponent } from './listar-lancamentos.component';

describe('ListarLancamentosComponent', () => {
  let component: ListarLancamentosComponent;
  let fixture: ComponentFixture<ListarLancamentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarLancamentosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListarLancamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
