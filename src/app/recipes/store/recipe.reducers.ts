import {Recipe} from '../recipe.model';
import {Ingredient} from '../../shared/ingredient.model';

export interface FeatureState {
  recipes: State
}

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: [
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
  ]
};

export function recipeReducer(state = initialState, action) {
  return state;
}
