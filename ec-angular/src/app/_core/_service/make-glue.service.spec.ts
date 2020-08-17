/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MakeGlueService } from './make-glue.service';

describe('Service: GlueIngredient', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MakeGlueService]
    });
  });

  it('should ...', inject([MakeGlueService], (service: MakeGlueService) => {
    expect(service).toBeTruthy();
  }));
});
