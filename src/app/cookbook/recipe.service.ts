import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { IRecipe } from "../lib/irecipe";
import { catchError, Observable, tap, throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class RecipeService {
    private productUrl = 'assets/recipes/recipes.json';
    constructor(private http: HttpClient) {}

    getRecipes(): Observable<IRecipe[]> {
        return this.http.get<IRecipe[]>(this.productUrl).pipe(
            tap(data => console.log('All: ', JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    private handleError(err: HttpErrorResponse) {
        let errorMessage:any = "";
        if (err.error instanceof ErrorEvent) {
            errorMessage = err.error.message;
        } else {
            errorMessage = err.status;
        }
        console.error(errorMessage)

        return throwError(() => errorMessage)
    }
}
