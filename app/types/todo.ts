export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export interface TodoFormData {
  text: string;
}

export interface TodoCounts {
  total: number;
  completed: number;
  active: number;
}
