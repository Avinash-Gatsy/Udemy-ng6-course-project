import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';

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
  editedIngIndex: number;
  editingIng: Ingredient;
  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.slService.ingredientEditing
      .subscribe((index: number) => {
        this.editedIngIndex = index;
        this.editMode = true;
        this.editingIng = this.slService.getIngredient(index);
        this.slForm.setValue({
          name: this.editingIng.name,
          amount: this.editingIng.amount
        });
      });
  }
  onSubmitIng(form: NgForm) {
  // const ingName = this.nameInputRef.nativeElement.value;
  // const ingAmount = this.amountInputRef.nativeElement.value;
  // const newIngredient = new Ingredient(ingName, ingAmount);
    console.log(form);
    const newIngredient = new Ingredient(form.value.name, form.value.amount);
    if (this.editMode) {
      this.slService.updateIngredient(this.editedIngIndex, newIngredient);
    } else {
      this.slService.addIngredient(newIngredient);
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
    this.slService.deleteIngredient(this.editedIngIndex);
  }
  ngOnDestroy() {
  this.subscription.unsubscribe();
  }
}
