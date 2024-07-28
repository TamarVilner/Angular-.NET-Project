import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Student } from '../student.model';
@Component({
  selector: 'app-student-details-form-td',
  templateUrl: './student-details-form-td.component.html',
})

export class StudentDetailsFormTDComponent implements OnInit{
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
