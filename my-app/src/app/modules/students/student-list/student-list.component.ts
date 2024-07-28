import { Component, OnInit } from '@angular/core';
import { EducationPrograms, Student } from '../student.model';
import { CommonModule } from '@angular/common'; // ייבוא של CommonModule
import { STUDENTS, StudentService } from '../student.service';
import { Observable, from, map } from 'rxjs';
import { loadZone } from 'zone.js/lib/zone';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html'
})

export class StudentListComponent implements OnInit {

  educationPrograms = EducationPrograms;
  total = 0;
  // students: Student[] = [
  //   { id: 1, fName: "tamar", lName: "vilner", adress: "herzog", fon: 123, active: new Date("2024-06-03"), avg: 10 },
  //   { id: 2, fName: "mosh", lName: "acb", adress: "hagalil", fon: 3332, active: new Date("2024-10-10"), avg: 100 },
  //   { id: 3, fName: "gili", lName: "levi", adress: "bneibrak", fon: 336632, active: new Date("2024-02-02"), avg: 80 },
  //   { id: 3, fName: "gili", lName: "levi", adress: "bneibrak", fon: 336632, active: new Date("2025-02-02"), avg: 80 }
  // ];

  //students : Student[] = this.studentService.getStudents();
  students: Student[] = [];
  selectedS?: Student;
  avg?: number;
  today: Date;
  s?: any;

  sendEmail: Observable<string> = new Observable((obs) => {
    this.today?.setHours(0, 0, 0, 0);
    for (let index = 0; index < STUDENTS.length; index++) {
      if (STUDENTS[index].active && STUDENTS[index].active > this.today) {
        obs.next(STUDENTS[index].adress);
      }
    }
    obs.complete();
  })

  sendEmailByPipe = from(STUDENTS).pipe(map(val => { val.active && val.active > this.today }));

  constructor(private studentService: StudentService) {
    this.today = new Date();
    this.today.setHours(0, 0, 0, 0); // איפוס השעות כדי להשוות רק תאריכים
  }
  ngOnInit(): void {
    // this.studentService.getStudentsByPromise().then(data => this.students = data).catch(err => {
    //   console.log(err);
    // })

    this.studentService.getStudentFromServer().subscribe(data => {
      console.log('data',data);
      
      this.students = data;
    })
  }

  showStudentByActive(active: boolean) {
    this.studentService.getStudentFromServerByActive(active).subscribe(val => {
      this.students = val;
      console.log( "ssssssssssssssssss",val);
    });
  }

  dellStudentById(id: number) {
    this.students = this.students.filter(student => student.id !== id);
    this.studentService.dellFromServer(id).subscribe(val => {
      if (val)
        alert("dell from serverrrr");
    })
  }

  totalF(id: number = 0): number {
    this.total = this.studentService.totalDaysAbsence(id);
    return this.total;
  }

  gpa(id: number) {
    this.studentService.gpa(id).then(a => this.avg = a).catch(err => {
      console.log(err);
    });
  }

  showNewStudentDetails() {
    this.selectedS = new Student();
  }

  upStudent(s: Student) {
    this.selectedS = s;
    
  }

  sendEmailF() {
    this.sendEmail.subscribe({
      next: (val) => {
        alert("email Send to: " + val)
      },
      complete: () => {
        console.log("observable completed!");
      }
    });
  }

  sendEmailFByForm() {
    this.sendEmail.subscribe({
      next: (val) => {
        alert("email Send to: " + val)
      },
      complete: () => {
        console.log("observable completed!");
      }
    });
  }

  addStudent(studentToAdd: Student) {
    let updateStudent = this.students.filter(student => student.id == studentToAdd.id)[0];
    if (updateStudent) {
      let i = this.students.indexOf(updateStudent);
      this.students[i] = studentToAdd;
      alert("The student was successfully update:" + studentToAdd.fName + studentToAdd.lName)

      this.studentService.upDateStudentToServer(studentToAdd).subscribe(data => {
        if (data)
          alert("update sucsses new students from serverrrrr");
        else
          alert("error on update a student to the serverrrrrrr");
      });

    }
    else {
      studentToAdd.id = this.students.length + 1; // קביעת ID חדש
      this.students.push(studentToAdd);
      alert("The student was successfully added:" + studentToAdd.fName + studentToAdd.lName)

      this.studentService.addStudentToServer(studentToAdd).subscribe(data => {
        if (data)
          alert("save sucsses new students from serverrrr");
        else
          alert("error on add a student to the serverrrr");
      });
    }
    this.selectedS = undefined; // לאפס את הבחירה לאחר הוספה
  }

  
}
