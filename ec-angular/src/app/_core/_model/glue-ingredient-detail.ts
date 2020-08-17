import { IIngredient } from './Ingredient';
export class IGlueIngredient {
  id: number;
  glueID: number;
  ingredientID: number;
  ingredientName: string;
  glueName: string;
  percentage: number;
  createdDate: Date;
  position: string;
  allow: number;
  expiredTime: number;
 }

export class IGlueIngredientDetail {
    id: number;
    name: string;
    details: Array<IGlueIngredient>;
}
