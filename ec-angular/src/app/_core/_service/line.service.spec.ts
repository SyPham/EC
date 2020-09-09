import { LineService } from './line.service';
import { TestBed } from '@angular/core/testing';

// import { LineService } from './modal-name.service';

describe('LineService', () => {
  let service: LineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
