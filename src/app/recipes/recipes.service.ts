import {EventEmitter, Injectable} from '@angular/core';
import {Recipe} from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  recipeSelected =  new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe('Chicken Biryani 1',
      'Chicken biryani is a simple dish of chicken and rice.',
      'http://www.authenticroyal.com/wp-content/uploads/2017/07/Royal_ChickenProvencal_Horizontal-square.jpg'),
    new Recipe('Chicken Biryani 2',
      'Chicken biryani is a simple dish of chicken and rice.',
      'http://www.authenticroyal.com/wp-content/uploads/2017/07/Royal_ChickenProvencal_Horizontal-square.jpg')
  ];

  constructor() {}
  getRecipes() {
    // if we return this.recipes; we will expose the array reference and hence it can be modified from outside.
    // Hence we use .splice() which exposes a copy
    return this.recipes.slice();
  }
}
