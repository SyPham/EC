import { TestBed } from '@angular/core/testing';

import { PartName2Service } from './part-name2.service';

describe('PartName2Service', () => {
  let service: PartName2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartName2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
