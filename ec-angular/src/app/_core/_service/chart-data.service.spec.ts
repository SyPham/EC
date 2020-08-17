/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ChartDataService } from './chart-data.service';

describe('Service: ChartData', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChartDataService]
    });
  });

  it('should ...', inject([ChartDataService], (service: ChartDataService) => {
    expect(service).toBeTruthy();
  }));
});
