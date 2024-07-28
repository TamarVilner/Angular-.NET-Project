import { DaysAbsence } from "./daysAbsence.model";

export class Student {
    id?: number;
    fName?: string;
    lName?: string;
    adress?: string;
    fon?: number;
    active?: Date;
    avg?: number;
    educationPrograms? : EducationPrograms;
    classS?:string;
    arrAbsence?: DaysAbsence[] = [];

}

export enum EducationPrograms {
    Engineers,
    Architecture,
    Mathematics,
    Dance,
    Singing
}