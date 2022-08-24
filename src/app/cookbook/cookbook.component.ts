import { Component, OnInit } from '@angular/core';
import { Cookbook } from '../lib/cookbook';
import { Recipe } from '../lib/recipe';

@Component({
  selector: 'app-cookbook',
  templateUrl: './cookbook.component.html',
  styleUrls: ['./cookbook.component.scss']
})
export class CookbookComponent implements OnInit {
  myCookbook:Cookbook;

  constructor() { 
    this.myCookbook = new Cookbook()
    let menu1 = new Recipe("Spaghetti Carbonara", "best italian food");
    this.myCookbook.add_recipe(menu1);
    let menu2 = new Recipe("Maki", "japanese Sushi");
    this.myCookbook.add_recipe(menu2);
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

  ngOnInit(): void {
    document.getElementById("addsubmit")!.addEventListener("click", (event) => {
      event.preventDefault();
      this.addMenu();
    })

    document.getElementById("delsubmit")!.addEventListener("click", (event) => {
      event.preventDefault();
      this.deleteMenu();
    })
  }

}
