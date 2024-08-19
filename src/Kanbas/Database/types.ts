export interface User {
    _id: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    dob: string;
    role: string;
}
export interface Assignment {
    _id: string;
    title: string;
    description: string;
    course: string;
    due: string;
    available: string;
    until: string;
    points: number;
    editing?: boolean;
  }

export interface Grade {
    _id: string;
    student: string;
    assignment: string;
    grade: string;
}

export interface Enrollment {
    _id: string;
    user: string;
    course: string;
 
}

export interface Course {
    _id: string;
    name: string;
    number: string;
    startDate: string;
    endDate: string;
    department: string;
    credits: number;
    description: string;
}
