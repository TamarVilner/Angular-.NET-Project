import { Component } from "@angular/core";


@Component({
    //מה התבנית עיצוב
    // template:"<h1>hellooo</h1><h1>{{getString()}}</h1>",
    templateUrl: "./app.component.html",
    //שם הסלקטור שנרצה להפעיל
    selector: "my-app-root"

})


export class AppComponent {
    x: number = 5;

    calc() {
        return 0;
    }
    getString() {
        return "tamar vilner development"
    }
    constructor() {
        //this.x="ggg" שגיאה כי X מוגדר כמספר
    }
}