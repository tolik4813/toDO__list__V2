export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  tags?: string[];
}

export interface TodoFormData {
  text: string;
  tags?: string[];
}

export interface TodoCounts {
  total: number;
  completed: number;
  active: number;
}
