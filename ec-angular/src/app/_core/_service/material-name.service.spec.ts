import { TestBed } from '@angular/core/testing';

import { MaterialNameService } from './material-name.service';

describe('MaterialNameService', () => {
  let service: MaterialNameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaterialNameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
