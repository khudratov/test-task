import { FC } from 'react';
import TodoList from '../features/todos/components/TodoList.tsx';
import AddTodoButton from '../features/todos/components/AddTodoButton.tsx';
import { Box } from '@mui/material';

const Todos: FC = () => {
	return (
		<Box
			display="flex"
			minHeight="90%"
			alignItems={'center'}
			justifyContent={'center'}
			flexDirection={'column'}
		>
			<TodoList />

			<AddTodoButton />
		</Box>
	);
};

export default Todos;
