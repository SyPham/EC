/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SingalrService } from './singalr.service';

describe('Service: Singalr', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SingalrService]
    });
  });

  it('should ...', inject([SingalrService], (service: SingalrService) => {
    expect(service).toBeTruthy();
  }));
});
