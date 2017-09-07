import { TestBed, inject } from '@angular/core/testing';

import { RegisterPopoverService } from './register-popover.service';

describe('RegisterPopoverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegisterPopoverService]
    });
  });

  it('should be created', inject([RegisterPopoverService], (service: RegisterPopoverService) => {
    expect(service).toBeTruthy();
  }));
});
