/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { IngredientService } from './ingredient.service';

describe('Service: Ingredient', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IngredientService]
    });
  });

  it('should ...', inject([IngredientService], (service: IngredientService) => {
    expect(service).toBeTruthy();
  }));
});
