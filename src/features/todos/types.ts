import { Dayjs } from 'dayjs';

export interface Todo {
	id: string;
	title: string;
	description: string;
	isCompleted: boolean;
	dueDate: Date;
	createdAt: Date;
	updatedAt: Date;
}

export interface TodoFormik extends Pick<Todo, 'title' | 'description'> {
	dueDate: Dayjs | null;
}

export interface TodoRequest
	extends Pick<Todo, 'title' | 'description' | 'dueDate'> {}
