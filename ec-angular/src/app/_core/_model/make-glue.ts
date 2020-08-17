import { IIngredient } from './Ingredient';

export interface IMakeGlue {
    id: number;
    name: string;
    code: string;
    ingredients: IIngredient[];
  }