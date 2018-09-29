import {Injectable} from '@angular/core';
import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  recipeChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [
    new Recipe('Chicken Biryani 1',
      'Chicken biryani is a simple dish of chicken and rice.',
      'http://www.authenticroyal.com/wp-content/uploads/2017/07/Royal_ChickenProvencal_Horizontal-square.jpg',
      [
        new Ingredient('Rice', 1),
        new Ingredient('Meat', 1),
        new Ingredient('Tomato', 1)
      ]),
    new Recipe('Chicken Biryani 2',
      'Chicken biryani is a simple dish of chicken and rice.',
      'http://www.authenticroyal.com/wp-content/uploads/2017/07/Royal_ChickenProvencal_Horizontal-square.jpg',
      [
        new Ingredient('Basmati Rice', 1),
        new Ingredient('Onion', 3),
        new Ingredient('Meat', 1)
      ])
  ];

  constructor() {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }
  getRecipes() {
    // if we return this.recipes; we will expose the array reference and hence it can be modified from outside.
    // Hence we use .splice() which exposes a copy
    return this.recipes.slice();
  }
  getRecipe(index: number){
    return this.recipes[index];
  }
  // addIngredientsToShoppingList(ingredients: Ingredient[]) {
  //   // this.slService.addIngredients(ingredients);
  // }
  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }
  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }
  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }
}
