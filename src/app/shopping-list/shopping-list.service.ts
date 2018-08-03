import {EventEmitter, Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientsChanged = new EventEmitter<Ingredient[]>();
  private ingredients: Ingredient[] = [
    new Ingredient('tablespoon minced mint leaves', 4),
    new Ingredient('tablespoon garlic paste', 2),
    new Ingredient('white onion', 5)
  ];

  constructor() { }

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    // once we update the array, we emit the EE with a new copy of the updated array
    this.ingredientsChanged.emit(this.ingredients.slice());
  }
  addIngredients(ingredients: Ingredient[]) {
    // push all the ingredients using ES6 spread operator
  this.ingredients.push(...ingredients);
  this.ingredientsChanged.emit(this.ingredients.slice());
  }
}
