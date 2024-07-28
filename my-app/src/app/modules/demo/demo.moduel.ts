import { NgModule } from "@angular/core";
import { ObservableDemoComponent } from "./observable-demo/observable-demo.component";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [ObservableDemoComponent],
    imports: [CommonModule],
    exports: [ObservableDemoComponent]

})
export class DemoModule {

}