import { Recipe } from "./recipe";

export class Cookbook {
    recipes: Recipe[] = [];
    file_path: string = ""
    constructor(csv_file_path="") {
        this.file_path = csv_file_path;
        // TODO: load from file
    }

    all():Recipe[] {
        return this.recipes;
    }

    add_recipe(recipe:Recipe) {
        this.recipes.push(recipe);
        // TODO: Write to file
    }

    remove_recipe(recipe_index:number) {
        // TODO: this.recipes.reduce(recipe_index);
        if (recipe_index >= 0) {
            this.recipes = this.recipes.filter(obj => obj.recipeId !== recipe_index)
        }
    }
}
