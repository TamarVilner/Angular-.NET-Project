import { Component, OnInit } from '@angular/core';
import { Observable, from, interval } from 'rxjs';
import { Student } from '../../students/student.model';
import { STUDENTS } from '../../students/student.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-observable-demo',
  templateUrl: './observable-demo.component.html',
})

export class ObservableDemoComponent implements OnInit {
  s?: Student;
  d?: string;
  dOperator?: string;
  today: Date = new Date();
  timer: Observable<string> = new Observable((obs) => {
    setInterval(() => { obs.next(new Date().toLocaleTimeString()) }, 1000)
  })

  timerByOperator: Observable<string> = interval(1000).pipe(map(x => { return new Date().toLocaleTimeString() }));



  source: Observable<Student> = new Observable((observer) => {
    STUDENTS.forEach((s) => {
      observer.next(s);
    })
    //erro או comlete 
    // observer.error("critical and danger error!!")
    observer.complete();
  })


  constructor() {
    this.printToConsoleByPipeAndMap();

    this.source.subscribe({
      next: (val) => {
        this.s = val;
        console.log(this.s.fName, " ", this.s.lName);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log("observable completed!");
      }
    });

    this.timer.subscribe({
      next: (val) => {
        this.d = val;
      }
    })

    this.timerByOperator.subscribe({
      next: (val) => {
        this.dOperator = val;
      }
    })
  }

  printToConsoleByPipeAndMap() {
    const sources = from(STUDENTS).pipe(map(val => val.fName)).subscribe(val => { console.log("ByPipe", val) });
  }

  ngOnInit(): void {

  }
}
