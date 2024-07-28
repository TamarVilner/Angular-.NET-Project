import { Injectable } from "@angular/core";
import { Student } from "./student.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

export const STUDENTS = [{ id: 1, fName: "tamar", lName: "vilner", adress: "herzog", fon: 123, active: new Date("2024-06-03"), avg: 10, arrAbsence: [{ startDaysAbsence: new Date("2025-02-02"), numberOfDaysAbsence: 5 }, { startDaysAbsence: new Date("2025-02-01"), numberOfDaysAbsence: 1 }] },
{ id: 2, fName: "moshfromService", lName: "acb", adress: "hagalil", fon: 3332, active: new Date("2024-10-10"), avg: 100, arrAbsence: [{ startDaysAbsence: new Date("2025-02-02"), numberOfDaysAbsence: 5 }, { startDaysAbsence: new Date("2025-02-01"), numberOfDaysAbsence: 6 }] },
{ id: 3, fName: "gili", lName: "levi", adress: "bneibrak", fon: 336632, active: new Date("2024-02-02"), avg: 80, arrAbsence: [{ startDaysAbsence: new Date("2025-02-02"), numberOfDaysAbsence: 5 }, { startDaysAbsence: new Date("2025-02-01"), numberOfDaysAbsence: 2 }] },
{ id: 4, fName: "gili", lName: "levi", adress: "bneibrak", fon: 336632, active: new Date("2025-02-02"), avg: 80, arrAbsence: [{ startDaysAbsence: new Date("2025-02-02"), numberOfDaysAbsence: 5 }, { startDaysAbsence: new Date("2025-02-01"), numberOfDaysAbsence: 3 }] }
];


@Injectable()
export class StudentService {

  constructor(private _http: HttpClient) {

  }
  getStudents(): Student[] {
    return STUDENTS;
  }

  getStudentsByPromise(): Promise<Student[]> {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res(STUDENTS);
      }, 2000);
    });
  }

  gpa(id: number): Promise<number> {
    var x: number;
    return new Promise((res, rej) => {
      setTimeout(() => { res(x = STUDENTS.filter(x => x.id == id)[0].avg) }, 2000);
    });
  }

  totalDaysAbsence(id: number): number {
    let totalDays = 0;
    const student = STUDENTS.find(student => student.id === id);
    if (student && student.arrAbsence) {
      totalDays = student.arrAbsence.reduce((accum, current) => {
        return accum + (current.numberOfDaysAbsence || 0);
      }, 0);
    }
    return totalDays;
  }

  //server ///////////////////////////////////////////

  getStudentFromServer(): Observable<Student[]> {
    return this._http.get<Student[]>("/api/Students");
  }

  getStudentFromServerByActive(active: boolean): Observable<Student[]> {
    console.log("service");

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'charset': 'utf-8'
    });

    return this._http.get<Student[]>(`/api/Students/filterByActive/${active}`, { headers });
  }

  addStudentToServer(student: Student): Observable<boolean> {
    return this._http.post<boolean>("/api/Students", student);
  }

  getStudentById(studentId: number) {
    return this._http.get<Student>(`/api/Students/filterById/${studentId}`);
  }

  upDateStudentToServer(student: Student): Observable<boolean> {
    return this._http.put<boolean>(`/api/Students/${student.id}`, student);
  }

  dellFromServer(id: number): Observable<boolean> {
    return this._http.delete<boolean>(`/api/Students/${id}`);
  }
}