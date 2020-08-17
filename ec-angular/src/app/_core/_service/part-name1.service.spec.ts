import { TestBed } from '@angular/core/testing';

import { PartName1Service } from './part-name1.service';

describe('PartName1Service', () => {
  let service: PartName1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartName1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
