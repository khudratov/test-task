import { FC } from 'react';
import { useGetAllTodosQuery } from '../todosApi.tsx';
import TodoItem from './TodoItem.tsx';
import CircularProgress from '@mui/material/CircularProgress';
import ErrorText from '../../../components/ErrorText.tsx';
import { Box, Typography } from '@mui/material';

const TodoList: FC = () => {
	const { data, isLoading, isError } = useGetAllTodosQuery();

	if (isLoading) {
		return <CircularProgress />;
	}

	if (isError) {
		return <ErrorText />;
	}

	if (data && data.length === 0) {
		return (
			<Box
				width={'100%'}
				flex={1}
				alignItems={'center'}
				display={'flex'}
				justifyContent={'center'}
			>
				<Typography textAlign={'center'} variant={'h5'}>
					Nothing Here Yet
				</Typography>
			</Box>
		);
	}

	return (
		<Box
			width={'100%'}
			flex={1}
			display={'flex'}
			flexDirection={'column'}
			rowGap={4}
		>
			{(data || []).map(todo => {
				return <TodoItem todo={todo} key={todo.id} />;
			})}
		</Box>
	);
};

export default TodoList;
