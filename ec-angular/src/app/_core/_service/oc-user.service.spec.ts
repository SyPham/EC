/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OcUserService } from './oc-user.service';

describe('Service: OcUser', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OcUserService]
    });
  });

  it('should ...', inject([OcUserService], (service: OcUserService) => {
    expect(service).toBeTruthy();
  }));
});
