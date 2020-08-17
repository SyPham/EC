/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ArticleNoService } from './articleNoService.service';

describe('Service: ArticleNoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArticleNoService]
    });
  });

  it('should ...', inject([ArticleNoService], (service: ArticleNoService) => {
    expect(service).toBeTruthy();
  }));
});
