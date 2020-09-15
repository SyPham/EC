import { IIngredient } from './Ingredient';

export interface IGlueIngredient {
    id: number;
    name: string;
    code: string;
    ingredients: IIngredient[];
  }
