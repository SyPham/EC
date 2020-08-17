import { TestBed } from '@angular/core/testing';

import { ModalNameService } from './modal-name.service';

describe('ModalNameService', () => {
  let service: ModalNameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalNameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
