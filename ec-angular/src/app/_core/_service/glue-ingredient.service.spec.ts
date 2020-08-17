/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GlueIngredientService } from './glue-ingredient.service';

describe('Service: GlueIngredient', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GlueIngredientService]
    });
  });

  it('should ...', inject([GlueIngredientService], (service: GlueIngredientService) => {
    expect(service).toBeTruthy();
  }));
});
