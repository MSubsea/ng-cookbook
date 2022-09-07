import { IRecipe } from "./irecipe"

export class Recipe implements IRecipe {
    recipeId: number = -1;
    name:string;
    description:string;
    imageUrl:string = "";
    rating: number = 0;
    done: boolean = false;

    constructor(name:string, description:string) {
        this.name = name;
        this.description = description;
    }

    setName(newName:string):void {
        this.name = newName;
    }

    setDescription(newDescription:string):void {
        this.description = newDescription;
    }
}
