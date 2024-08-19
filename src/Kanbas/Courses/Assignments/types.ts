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
  