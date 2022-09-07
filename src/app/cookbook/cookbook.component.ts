import { Component, OnInit } from '@angular/core';
import { Cookbook } from '../lib/cookbook';
import { Recipe } from '../lib/recipe';
import { saveAs } from "file-saver";
import { RecipeService } from './recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cookbook',
  templateUrl: './cookbook.component.html',
  styleUrls: ['./cookbook.component.scss']
})
export class CookbookComponent implements OnInit {
  myCookbook:Cookbook;
  sub!: Subscription;
  filteredRecipes: Recipe[] = [];
  errorMessage: string = "";

  constructor(private recipeService:RecipeService) { 
    this.myCookbook = new Cookbook()
    /*let menu1 = new Recipe("Spaghetti Carbonara", "best italian food");
    this.myCookbook.add_recipe(menu1);
    let menu2 = new Recipe("Maki", "japanese Sushi");
    this.myCookbook.add_recipe(menu2);  */
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

  addMenu() {
    const name:HTMLInputElement = <HTMLInputElement>document.getElementById("menuname");
    const desc:HTMLInputElement = <HTMLInputElement>document.getElementById("menudesc");
    const newRecipe = new Recipe(name.value, desc.value);
    this.myCookbook.add_recipe(newRecipe);
    name.value = "";
    desc.value = "";
  }

  uploadFromCsv() {
    let csv_array = [];
    const name:HTMLInputElement = <HTMLInputElement>document.getElementById("uploadName");
    console.log(name.value);
    const reader = new FileReader();
    reader.onload = (e:any) => {
      console.log(e.target.result);
    }
    //reader.readAsArrayBuffer(name.value);
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

  downloadAsCsv() {
    let csv_array = [];
    const name:HTMLInputElement = <HTMLInputElement>document.getElementById("downloadName");
    csv_array.push("Name; Description");
    this.myCookbook.recipes.forEach((recipe) => {
      csv_array.push(recipe.name + ";" + recipe.description)
    })
    let csv_a = csv_array.join("\r\n")
    let blob = new Blob([csv_a], {type: "text/csv"});
    console.log(csv_a);
    saveAs(blob, name.value);
  }

  ngOnInit(): void {
    this.sub = this.recipeService.getRecipes().subscribe({
      next: recipes => {
        recipes.forEach(recipe => {
          let new_recipe = new Recipe(recipe.name, recipe.description);
          new_recipe.rating = recipe.rating;
          new_recipe.imageUrl = recipe.imageUrl;
          new_recipe.done = recipe.done;
          new_recipe.recipeId = recipe.recipeId;
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

    document.getElementById("delsubmit")!.addEventListener("click", (event) => {
      event.preventDefault();
      this.deleteMenu();
    })

    /*document.getElementById("upload")!.addEventListener("click", (event) => {
      event.preventDefault();
      this.uploadFromCsv();
    })*/

    document.getElementById("uploadName")?.addEventListener('change', this.readSingleFile, false)

    document.getElementById("download")!.addEventListener("click", (event) => {
      event.preventDefault();
      this.downloadAsCsv();
    })
  }

}
