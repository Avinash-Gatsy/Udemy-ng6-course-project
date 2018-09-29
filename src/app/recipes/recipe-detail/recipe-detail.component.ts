import {Component, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {RecipesService} from '../recipes.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import * as ShoppingListActions from '../../shopping-list/ngrx-store/shopping-list.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;
  constructor(private recipeService: RecipesService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private store: Store<any>) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.recipe = this.recipeService.getRecipe(this.id);
        }
      );
  }
  onAddToShoppingList() {
  // this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  // use the application store to add ingredients to shopping list
  this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients));
  }
  onEditRecipe() {
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.activatedRoute});
    this.router.navigate(['edit'], {relativeTo: this.activatedRoute});
  }
  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

}
