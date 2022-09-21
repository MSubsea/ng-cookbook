import { Recipe } from "./recipe";

describe('Recipe Class', () => {
    it('Recipe name in construtor is inserted correctly', () => {
        const recipe = new Recipe('Cheeseburger', 'Hamburger with extra Cheddar');
        expect(recipe.name).toContain("Cheeseburger")
    }) 

    it('Recipe description in construtor is inserted correctly', () => {
        const recipe = new Recipe('Cheeseburger', 'Hamburger with extra Cheddar');
        expect(recipe.description).toContain("Hamburger with extra Cheddar")
    })

    it('Recipe name can be changed by function', () => {
        const recipe = new Recipe('Cheeseburger', 'Hamburger with extra Cheddar');
        recipe.setName("McCheeseburger")
        expect(recipe.name).toContain("McCheeseburger")
    })

    it('Recipe description can be changed by function', () => {
        const recipe = new Recipe('Cheeseburger', 'Hamburger with extra Cheddar');
        recipe.setDescription("Cheeseburger with extra Cheddar and McKetchup")
        expect(recipe.description).toContain("Cheeseburger with extra Cheddar and McKetchup")
    })
})