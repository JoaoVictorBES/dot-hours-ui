import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtividadeUsuarioComponent } from './atividade-usuario.component';

describe('AtividadeUsuarioComponent', () => {
  let component: AtividadeUsuarioComponent;
  let fixture: ComponentFixture<AtividadeUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtividadeUsuarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AtividadeUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
