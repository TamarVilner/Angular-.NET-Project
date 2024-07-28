import { Component } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-directive-demo',
  templateUrl: './directive-demo.component.html',
  styleUrl: './directive-demo.component.scss'
})
export class DirectiveDemoComponent {
  
  private sideSubject: BehaviorSubject<string> = new BehaviorSubject('rtl');
  side$: Observable<string> = this.sideSubject.asObservable();

  getSide(): boolean {
    return this.sideSubject.getValue() === 'rtl';
  }

  eng() {
    this.sideSubject.next('ltr');
  }

  eb() {
    this.sideSubject.next('rtl');
  }
}