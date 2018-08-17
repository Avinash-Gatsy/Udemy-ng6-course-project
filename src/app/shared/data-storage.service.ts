import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RecipesService} from '../recipes/recipes.service';
import {Recipe} from '../recipes/recipe.model';
import {map} from 'rxjs/operators';
import { environment } from '../../environments/environment';
import {AuthService} from '../auth/auth.service';
@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  constructor(private http: HttpClient,
              private recipeService: RecipesService,
              private authService: AuthService) {}

  storeRecipes() {
    const token = this.authService.getToken();
    return this.http.put(`${environment.recipesURLFirebase}?auth=${token}`, this.recipeService.getRecipes());
  }

  getRecipes() {
    const token = this.authService.getToken();
    this.http.get<Recipe[]>(`${environment.recipesURLFirebase}?auth=${token}`)
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
