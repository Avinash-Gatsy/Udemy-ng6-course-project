import {Ingredient} from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';
import {st} from '@angular/core/src/render3';

const initialState = {
  ingredients : [
    new Ingredient('tablespoon minced mint leaves', 4),
    new Ingredient('tablespoon garlic paste', 2),
    new Ingredient('white onion', 5)
  ]
}
export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      console.log({...state, ingredients: [...state.ingredients, action.payload]});
      // we cannot modify the state, instead we can replace the existing state with a new state
      return {
        // return all the properties from old state and the new info form payload
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    case ShoppingListActions.ADD_INGREDIENTS:
      return{
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };
    default:
      return state;
  }
}
