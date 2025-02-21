import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarProjetoComponent } from './editar-projeto.component';

describe('EditarProjetoComponent', () => {
  let component: EditarProjetoComponent;
  let fixture: ComponentFixture<EditarProjetoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarProjetoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarProjetoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
