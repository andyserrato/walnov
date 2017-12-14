import { TestBed, inject } from '@angular/core/testing';

import { MensajesService } from './mensajes.service';

describe('MensajesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MensajesService]
    });
  });

  it('should be created', inject([MensajesService], (service: MensajesService) => {
    expect(service).toBeTruthy();
  }));
});
