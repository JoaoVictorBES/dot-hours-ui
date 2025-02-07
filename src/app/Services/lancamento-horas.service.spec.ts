import { TestBed } from '@angular/core/testing';

import { LancamentoHorasService } from './lancamento-horas.service';

describe('LancamentoHorasService', () => {
  let service: LancamentoHorasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LancamentoHorasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
