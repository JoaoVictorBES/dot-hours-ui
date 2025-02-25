import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarAtividadeComponent } from './editar-atividade.component';

describe('EditarAtividadeComponent', () => {
  let component: EditarAtividadeComponent;
  let fixture: ComponentFixture<EditarAtividadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarAtividadeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarAtividadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
