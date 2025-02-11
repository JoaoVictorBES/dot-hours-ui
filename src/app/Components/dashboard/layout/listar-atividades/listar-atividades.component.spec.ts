import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarAtividadesComponent } from './listar-atividades.component';

describe('ListarAtividadesComponent', () => {
  let component: ListarAtividadesComponent;
  let fixture: ComponentFixture<ListarAtividadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarAtividadesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListarAtividadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
