import * as fromShoppingList from '../shopping-list/ngrx-store/shopping-list.reducers';
import * as fromAuth from '../auth/store/auth.reducers';

export interface AppState {
  shoppingList: fromShoppingList.State;
  auth: fromAuth.State;
}
