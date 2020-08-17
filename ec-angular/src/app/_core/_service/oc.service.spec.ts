/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OcService } from './oc.service';

describe('Service: Oc', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OcService]
    });
  });

  it('should ...', inject([OcService], (service: OcService) => {
    expect(service).toBeTruthy();
  }));
});
