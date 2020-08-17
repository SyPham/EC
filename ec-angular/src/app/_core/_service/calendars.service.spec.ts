/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CalendarsService } from './calendars.service';

describe('Service: Calendars', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalendarsService]
    });
  });

  it('should ...', inject([CalendarsService], (service: CalendarsService) => {
    expect(service).toBeTruthy();
  }));
});
