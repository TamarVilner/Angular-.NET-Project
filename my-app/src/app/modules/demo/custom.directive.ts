import { Directive, ElementRef, HostListener, Input, Renderer2, input } from "@angular/core";
import { Observable, map, tap } from "rxjs";


@Directive({
    selector: "[appCustom]"
})
export class CustomDirective {

    @Input()
    appCustom?: string;

    constructor(private _el: ElementRef, private render: Renderer2) {
    }
    ngOnInit() {
        this._el.nativeElement.style.backgroundColor = this.appCustom || "yellow";
    }

    @Input() set appDir(dir: Observable<string>) {
        dir.pipe(
          tap((dd) => {
            if (dd === 'ltr') {
              this.render.removeClass(this._el.nativeElement, 'rtl');
              this.render.addClass(this._el.nativeElement, 'ltr');
            } else {
              this.render.removeClass(this._el.nativeElement, 'ltr');
              this.render.addClass(this._el.nativeElement, 'rtl');
            }
          })
        ).subscribe(); // Make sure to subscribe to the Observable
      }
    }