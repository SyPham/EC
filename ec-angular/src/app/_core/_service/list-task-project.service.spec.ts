import { TestBed } from '@angular/core/testing';

import { ListTaskProjectService } from './list-task-project.service';

describe('ListTaskProjectService', () => {
  let service: ListTaskProjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListTaskProjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
