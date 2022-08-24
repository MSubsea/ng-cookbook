import { IRecipe } from "./irecipe"

export class Recipe implements IRecipe {
    name:string;
    description:string;

    constructor(name:string, description:string) {
        this.name = name;
        this.description = description;
    }
}
