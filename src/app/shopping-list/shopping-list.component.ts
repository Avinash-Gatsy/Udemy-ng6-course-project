import {Component, OnInit} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from './shopping-list.service';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  // ingredients: Ingredient[];
  ingredientsState: Observable<{ ingredients: Ingredient[] }>;

  // private subscription: Subscription;

  constructor(private slService: ShoppingListService,
              private store: Store<{
                shoppingList: {
                  ingredients: Ingredient[]
                }
              }>) {
  }

  ngOnInit() {
    // this.ingredients = this.slService.getIngredients();
    // this.subscription = this.slService.ingredientsChanged
    //   .subscribe((ingredients: Ingredient[]) => {
    //     this.ingredients = ingredients;
    //   });

    this.ingredientsState = this.store.select('shoppingList');
  }

  onEditItem(index: number) {
    this.slService.ingredientEditing.next(index);
  }

  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }
}
