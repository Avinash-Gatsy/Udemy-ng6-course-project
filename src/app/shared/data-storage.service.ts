import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RecipesService} from '../recipes/recipes.service';
import {Recipe} from '../recipes/recipe.model';
import {map} from 'rxjs/operators';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipesService) {}

  storeRecipes() {
    return this.http.put(environment.recipesURLFirebase, this.recipeService.getRecipes());
  }

  getRecipes() {
    this.http.get<Recipe[]>(environment.recipesURLFirebase)
      .pipe(map((recipes) => {
        for (const recipe of recipes) {
          if (!recipe['ingredient']) {
            recipe['ingredient'] = [];
          }
        }
        return recipes;
      }))
      .subscribe((recipes) => {
        console.log(recipes);
        this.recipeService.setRecipes(recipes);
      });
  }
}
