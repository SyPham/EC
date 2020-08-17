/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BpfcService } from './bpfc.service';

describe('Service: Bpfc', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BpfcService]
    });
  });

  it('should ...', inject([BpfcService], (service: BpfcService) => {
    expect(service).toBeTruthy();
  }));
});
