import {Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs/Subject';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  ingredientEditing = new Subject<number>();
  private ingredients: Ingredient[] = [
    new Ingredient('tablespoon minced mint leaves', 4),
    new Ingredient('tablespoon garlic paste', 2),
    new Ingredient('white onion', 5)
  ];

  constructor() { }

  // getIngredients() {
  //   return this.ingredients.slice();
  // }
  getIngredient(index: number) {
    return this.ingredients[index];
  }

  // addIngredient(ingredient: Ingredient) {
  //   this.ingredients.push(ingredient);
  //   // once we update the array, we emit the EE with a new copy of the updated array
  //   this.ingredientsChanged.next(this.ingredients.slice());
  // }

  // addIngredients(ingredients: Ingredient[]) {
  //   // push all the ingredients using ES6 spread operator
  // this.ingredients.push(...ingredients);
  // this.ingredientsChanged.next(this.ingredients.slice());
  // }
  updateIngredient(index: number, changedIng: Ingredient) {
    this.ingredients[index] = changedIng;
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
