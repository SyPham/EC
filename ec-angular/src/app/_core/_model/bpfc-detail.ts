import { IIngredient } from './Ingredient';
export class IBpfc {
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

export class IBpfcDetail {
    id: number;
    name: string;
    details: Array<IBpfc>;
}
