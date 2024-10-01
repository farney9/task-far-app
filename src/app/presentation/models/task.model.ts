export interface TaskModel {
  id: number;
  title: string;
  isCompleted: boolean;
  isEditing?: boolean;
  deadLine: Date;
  persons: Person[];
}

export interface Person {
  fullName: string;
  age: number;
  skills: string[];
}

export type Filtertype = 'all' | 'active' | 'completed';
