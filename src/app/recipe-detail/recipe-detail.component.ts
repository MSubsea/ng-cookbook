import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { __param } from 'tslib';
import { RecipeService } from '../cookbook/recipe.service';
import { Cookbook } from '../lib/cookbook';
import { Recipe } from '../lib/recipe';

@Component({
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  thisReceipe:Recipe|undefined;
  sub!: Subscription;
  errorMessage: string = "";
  id:number = -1;
  imageWidth: number = 280;
  imageMargin: number = 2;
  recipeLoaded:boolean = false;

  constructor(private recipeService:RecipeService, private route: ActivatedRoute) { 
  }

  ngOnInit(): void {
    this.sub = this.recipeService.getRecipes().subscribe({
      next: recipes => {
        recipes.forEach(recipe => {
          if (this.id === recipe.recipeId) {
            this.thisReceipe = new Recipe(recipe.name, recipe.description);
            this.thisReceipe.rating = recipe.rating;
            this.thisReceipe.imageUrl = recipe.imageUrl;
            this.thisReceipe.done = recipe.done;
            this.thisReceipe.recipeId = recipe.recipeId;
            this.recipeLoaded = true;
            console.log(this.thisReceipe.name)
          }
        })
      },
      
      error: err => this.errorMessage = err
    })

    const routeId = this.route.snapshot.paramMap.get('id')

    if (routeId !== null) {
      this.id = parseInt(routeId, 10);
    }
    console.log(this.id)
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
