import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { EducationPrograms, Student } from '../student.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../student.service';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-student-details-form-md',
  templateUrl: './student-details-form-md.component.html',
})
export class StudentDetailsFormMDComponent implements OnInit {

  datestartAbsence?: Date;
  numberAbsence?: number;
  totalAbsenceDays: number = 0;
  today: Date;
  educationPrograms = EducationPrograms;
  studentForm: FormGroup = new FormGroup({});
  private _student?: Student;

  constructor(private studentService: StudentService, private _acr: ActivatedRoute) {
    this.today = new Date();
  }

  studentId?: number;

  ngOnInit(): void {
    this.today.setHours(0, 0, 0, 0); // Reset hours to compare only dates

    this._acr.paramMap.subscribe(paramMap => {
      if (paramMap.has("student") && paramMap.get("student") != null) {
        const a = paramMap.get("student");
        if (a != null) {
          this.studentId = +a;
          this.studentService.getStudentById(this.studentId).subscribe(val => {
            this.student = val;
          })
        }
      }
    });
  }


  @Input()
  public set student(value: Student) {
    console.log();

    this._student = value;
    if (this.student) {
      console.log('gggggggggggg', this.student);

      this.studentForm = new FormGroup({
        "id": new FormControl(this.student.id, Validators.required),
        "fName": new FormControl(this._student.fName, [Validators.required, Validators.minLength(3), Validators.required]),
        "lName": new FormControl(this._student.lName, [Validators.minLength(3)]),
        "active": new FormControl(this._student.active, Validators.required),
        "adress": new FormControl(this._student.adress, [Validators.email]),
        "avg": new FormControl(this._student.avg),
        "fon": new FormControl(this._student.fon, [Validators.minLength(9), Validators.maxLength(10)]),
        "educationPrograms": new FormControl(this._student.educationPrograms),
        "classS": new FormControl(this._student.classS)
      })

    }
  }

  public get student(): Student | undefined {
    return this._student;
  }

  @Output()
  onSaveNewStudent: EventEmitter<Student> = new EventEmitter();



  isDateBeforeToday(date?: Date): boolean {
    if (!date) return false;
    return date < this.today;
  }

  totalF() {
    this.totalAbsenceDays = this.studentService.totalDaysAbsence(this.student?.id || 0);
    return this.totalAbsenceDays;
  }

  saveNewStudent() {

    this.student = this.studentForm.value;

    if (this.numberAbsence && this.numberAbsence > 0) {
      this.student?.arrAbsence?.push({
        startDaysAbsence: this.datestartAbsence,
        numberOfDaysAbsence: this.numberAbsence
      })
    }

    this.onSaveNewStudent.emit(this.student);
  }

  saveNewStudentByNavigate() {
    this.student = this.studentForm.value;
    if (this.student) {
      this.studentService.upDateStudentToServer(this.student).subscribe(val => {
        if (val == false)
          console.error("error to update student");
        else
          console.log("update sucssesful");
      })
    }
  }
}
