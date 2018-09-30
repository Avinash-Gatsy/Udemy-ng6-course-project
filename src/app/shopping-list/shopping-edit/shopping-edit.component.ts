import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {Store} from '@ngrx/store';
import * as ShoppingListActions from '../ngrx-store/shopping-list.actions';
import * as fromApp from '../../store/app.reducers';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @ViewChild('nameInput') nameInputRef: ElementRef;
  // @ViewChild('amountInput') amountInputRef: ElementRef;
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editingIng: Ingredient;

  constructor(private slService: ShoppingListService,
              private store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
    this.subscription = this.store.select('shoppingList')
      .subscribe((data) => {
        if (data.editedIngredientIndex > -1) {
          this.editingIng = data.editedIngredient;
          this.editMode = true;
          this.slForm.setValue({
            name: this.editingIng.name,
            amount: this.editingIng.amount
          });
        } else {
          this.editMode = false;
        }
      });
  }

  onSubmitIng(form: NgForm) {
    // const ingName = this.nameInputRef.nativeElement.value;
    // const ingAmount = this.amountInputRef.nativeElement.value;
    // const newIngredient = new Ingredient(ingName, ingAmount);
    console.log(form);
    const newIngredient = new Ingredient(form.value.name, form.value.amount);
    if (this.editMode) {
      // this.slService.updateIngredient(this.editedIngIndex, newIngredient);
      this.store.dispatch(new ShoppingListActions.UpdateIngredient(
        {ingredient: newIngredient}
      ));
    } else {
      // this.slService.addIngredient(newIngredient);
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.onClear();
    // this.slService.deleteIngredient(this.editedIngIndex);
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
  }

  ngOnDestroy() {
    this.store.dispatch(new ShoppingListActions.StopEdit());
    this.subscription.unsubscribe();
  }
}
