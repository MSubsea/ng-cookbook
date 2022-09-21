import { Cookbook } from "./cookbook"
import { Recipe } from "./recipe";

describe('Cookbook Class', () => {

    it('Cookook is empty at begin', () => {
        let cookbook = new Cookbook();
        expect(cookbook.recipes.length).toEqual(0);
    })

    it('Recipe is added correctly', () => {
        let cookbook = new Cookbook();
        let recipe = new Recipe("Cheeseburger", "Hamburger with extra Cheddar");
        recipe.recipeId = 1;
        cookbook.add_recipe(recipe);

        expect(cookbook.recipes.length).toEqual(1);
    })

    it('Recipe with correct id is deleted', () => {
        let cookbook = new Cookbook();
        let recipe = new Recipe("Cheeseburger", "Hamburger with extra Cheddar");
        recipe.recipeId = 1;
        cookbook.add_recipe(recipe);

        cookbook.remove_recipe(1);
        expect(cookbook.recipes.length).toEqual(0);
    })

    it('Cookbook remains unchanged with unknown delete recipeid', () => {
        let cookbook = new Cookbook();
        let recipe = new Recipe("Cheeseburger", "Hamburger with extra Cheddar");
        recipe.recipeId = 1;
        cookbook.add_recipe(recipe);

        cookbook.remove_recipe(2);
        expect(cookbook.recipes.length).toEqual(1);
    })

    it('Cookbook remains unchanged with invalid delete recipeid', () => {
        let cookbook = new Cookbook();
        let recipe = new Recipe("Cheeseburger", "Hamburger with extra Cheddar");
        recipe.recipeId = 1;
        cookbook.add_recipe(recipe);

        cookbook.remove_recipe(-1);
        expect(cookbook.recipes.length).toEqual(1);
    })

})
