import { Component, OnInit } from '@angular/core';
import { Cookbook } from '../lib/cookbook';
import { Recipe } from '../lib/recipe';
import { RecipeService } from './recipe.service';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './cookbook.component.html',
  styleUrls: ['./cookbook.component.scss']
})
export class CookbookComponent implements OnInit {
  myCookbook:Cookbook;
  sub!: Subscription;
  filteredRecipes: Recipe[] = [];
  errorMessage: string = "";
  imageWidth: number = 70;
  imageMargin: number = 2;
  showImage:boolean = false;
  private _listFilter:string = "";
  private _nextId = -1;

  get listFilter():string {
    return this._listFilter;
  }

  set listFilter(value:string) {
    this._listFilter = value;
    this.filteredRecipes = this.performFilter();
  }

  performFilter(): Recipe[] {
    return this.myCookbook.all().filter((recipe: Recipe) => {
      let n:string = recipe.name.toLowerCase()
      return n.includes(this.listFilter.toLowerCase());
    })
  }

  constructor(private recipeService:RecipeService) { 
    this.myCookbook = new Cookbook()
  }

  toggleImage() {
    this.showImage = !this.showImage;
  }

  deleteMenu() {
    const val:HTMLInputElement = <HTMLInputElement>document.getElementById("menuid");
    const val_num = parseInt(val.value);
    if (val_num && (val_num > 0) && (val_num <= this.myCookbook.all().length)) {
      this.myCookbook.remove_recipe(val_num - 1);
    } else {
      console.log("A correct number (1<= number <=" + this.myCookbook.all().length + ") should be provided!");
    }
    val.value = "";
  }

  deleteRecipe(recipeId:number) {
    console.log("Deleting recipe: " + recipeId);
    this.myCookbook.remove_recipe(recipeId);
    this.filteredRecipes = this.myCookbook.all();
  }

  addMenu() {
    const name:HTMLInputElement = <HTMLInputElement>document.getElementById("menuname");
    const desc:HTMLInputElement = <HTMLInputElement>document.getElementById("menudesc");
    const rating:HTMLInputElement = <HTMLInputElement>document.getElementById("menurating");
    const done:HTMLInputElement = <HTMLInputElement>document.getElementById("menudone");
    const imageUrl:HTMLInputElement = <HTMLInputElement>document.getElementById("menuimageurl");
    const newRecipe = new Recipe(name.value, desc.value);
    newRecipe.rating = parseInt(rating.value, 10);
    newRecipe.done = done.value === "done";
    newRecipe.imageUrl = imageUrl.value;
    newRecipe.recipeId = this._nextId;
    this._nextId += 1;
    this.myCookbook.add_recipe(newRecipe);
    name.value = "";
    desc.value = "";
    rating.value = "1";
    done.value = "not done"
    imageUrl.value = "";
  }

  readSingleFile(e:any) {
    e.preventDefault();
    let file = e.target!.files[0]!;
    if (!file) {
      return;
    }

    let reader = new FileReader();
    let menus: Recipe[] = [];
    reader.onload = function(e) {
      var contents:string = <string>e.target?.result;
      let lines = contents.split("\n");
      let line_no = 0
      lines.forEach((line) => {
        let l = line.trim()
        let menu = l.split(";")
        let menu1 = new Recipe(menu[0], menu[1]);
        menus.push(menu1)
        line_no += 1
      })

    };
    reader.readAsText(file);
    console.log("Loaded menus");
    menus.forEach((menu) => {
      console.log(menu.name + "; " + menu.description);
      this.myCookbook.add_recipe(menu)
    })
  }

  ngOnInit(): void {
    this.listFilter = "";
    this.sub = this.recipeService.getRecipes().subscribe({
      next: recipes => {
        recipes.forEach(recipe => {
          let new_recipe = new Recipe(recipe.name, recipe.description);
          new_recipe.rating = recipe.rating;
          new_recipe.imageUrl = recipe.imageUrl;
          new_recipe.done = recipe.done;
          new_recipe.recipeId = recipe.recipeId;
          if (recipe.recipeId >= this._nextId) {
            this._nextId = recipe.recipeId + 1;
          }
          this.myCookbook.add_recipe(new_recipe);
        })
        this.filteredRecipes = this.myCookbook.all();
      },
    
      error: err => this.errorMessage = err
    })

    document.getElementById("addsubmit")!.addEventListener("click", (event) => {
      event.preventDefault();
      this.addMenu();
    })

    document.getElementById("uploadName")?.addEventListener('change', this.readSingleFile, false)

    document.getElementById("download")!.addEventListener("click", (event) => {
      event.preventDefault();
      console.log("TODO ... Download json file")
    })
  }

}
