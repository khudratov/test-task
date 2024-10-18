import { api } from '../../app/store.ts';
import { Todo, TodoRequest } from './types.ts';

const basePath = (endpoint: string) => `/Todos${endpoint}`;

export const todosApi = api.injectEndpoints({
	endpoints: builder => ({
		getAllTodos: builder.query<Todo[], void>({
			query: () => basePath(''),
			providesTags: ['Todos'],
		}),
		createTodo: builder.mutation<Todo, TodoRequest>({
			invalidatesTags: ['Todos'],
			query: newTodo => ({
				url: basePath(''),
				method: 'POST',
				body: newTodo,
			}),
		}),
		removeTodo: builder.mutation<Todo, string>({
			invalidatesTags: ['Todos'],
			query: id => ({
				url: basePath(`/${id}`),
				method: 'DELETE',
			}),
		}),
		editTodo: builder.mutation<Todo, { data: TodoRequest; id: string }>({
			invalidatesTags: ['Todos'],
			query: ({ id, data }) => ({
				url: basePath(`/${id}`),
				method: 'PUT',
				body: data,
			}),
		}),
		toggleTodo: builder.mutation<Todo, string>({
			invalidatesTags: ['Todos'],
			query: id => ({
				url: basePath(`/toggle/${id}`),
				method: 'PUT',
			}),
		}),
	}),
});

export const {
	useGetAllTodosQuery,
	useCreateTodoMutation,
	useRemoveTodoMutation,
	useEditTodoMutation,
	useToggleTodoMutation,
} = todosApi;
