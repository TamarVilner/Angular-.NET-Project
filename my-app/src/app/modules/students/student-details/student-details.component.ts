import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Student } from '../student.model';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
})
export class StudentDetailsComponent implements OnInit {
  today: Date;

  @Input()
  student?: Student;

  @Output()
  onSaveNewStudent: EventEmitter<Student> = new EventEmitter();

  constructor() {
    this.today = new Date();
  }

  ngOnInit(): void {
    this.today.setHours(0, 0, 0, 0); // איפוס השעות כדי להשוות רק תאריכים
  }

  isDateBeforeToday(date?: Date): boolean {
    if (!date) return false;
    return date < this.today;
  }

  saveNewStudent() {
    this.onSaveNewStudent.emit(this.student);
    console.log(this.student);
  }
}
