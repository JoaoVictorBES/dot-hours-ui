import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarLancamentoComponent } from './editar-lancamento.component';

describe('EditarLancamentoComponent', () => {
  let component: EditarLancamentoComponent;
  let fixture: ComponentFixture<EditarLancamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarLancamentoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarLancamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
