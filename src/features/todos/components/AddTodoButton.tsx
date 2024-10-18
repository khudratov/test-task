import { FC, useState } from 'react';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import StyledModal from '../../../components/StyledModal.tsx';
import TodoForm from './TodoForm.tsx';
import { useCreateTodoMutation } from '../todosApi.tsx';
import { TodoRequest } from '../types.ts';

const AddTodoButton: FC = () => {
	const [open, setOpen] = useState(false);
	const [createTodo, { isLoading }] = useCreateTodoMutation();

	const handleOpen = () => setOpen(true);

	const handleClose = () => setOpen(false);

	const handleSubmit = async (values: TodoRequest) => {
		console.log('request', values);
		await createTodo(values);
		handleClose();
	};

	return (
		<>
			<StyledModal open={open} onClose={handleClose}>
				<TodoForm
					actionButtonText={'Create'}
					onSubmit={handleSubmit}
					onCancel={handleClose}
					loading={isLoading}
				/>
			</StyledModal>

			<Fab
				color="primary"
				aria-label="add"
				onClick={handleOpen}
				sx={{
					position: 'fixed',
					bottom: {
						xs: 16,
						sm: 32,
					},
					right: {
						xs: 16,
						sm: 32,
					},
				}}
			>
				<AddIcon />
			</Fab>
		</>
	);
};

export default AddTodoButton;
