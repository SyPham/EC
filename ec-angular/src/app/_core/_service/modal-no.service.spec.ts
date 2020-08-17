import { TestBed } from '@angular/core/testing';

import { ModalNoService } from './modal-no.service';

describe('ModalNoService', () => {
  let service: ModalNoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalNoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
