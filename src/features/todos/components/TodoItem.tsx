import React, { useState } from 'react';
import {
	Box,
	Button,
	Card,
	CardContent,
	Checkbox,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	IconButton,
	Menu,
	MenuItem,
	Typography,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import dayjs from 'dayjs';
import { Todo, TodoRequest } from '../types.ts';
import {
	useEditTodoMutation,
	useRemoveTodoMutation,
	useToggleTodoMutation,
} from '../todosApi.tsx';
import { LoadingButton } from '@mui/lab';
import StyledModal from '../../../components/StyledModal.tsx';
import TodoForm from './TodoForm.tsx';

interface Props {
	todo: Todo;
}

const TodoItem: React.FC<Props> = ({ todo }) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [openConfirm, setOpenConfirm] = useState(false);
	const [openEdit, setOpenEdit] = useState(false);
	const [removeTodo, { isLoading: isRemoveLoading }] = useRemoveTodoMutation();
	const [editTodo, { isLoading: isEditLoading }] = useEditTodoMutation();
	const [toggleTodo, { isLoading: isToggleLoading }] = useToggleTodoMutation();

	const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const handleOpenEdit = () => {
		setOpenEdit(true);
	};

	const handleEdit = () => {
		handleOpenEdit();
		handleMenuClose();
	};

	const handleRemove = () => {
		handleMenuClose();
		setOpenConfirm(true);
	};

	const handleConfirmClose = () => {
		if (!isRemoveLoading) {
			setOpenConfirm(false);
		}
	};

	const handleConfirmRemove = async () => {
		await removeTodo(todo.id);
		setOpenConfirm(false);
	};

	const handleCloseEdit = () => {
		if (!isEditLoading) {
			setOpenEdit(false);
		}
	};

	const handleSubmitEdit = async (values: TodoRequest) => {
		await editTodo({ id: todo.id, data: values });
		handleCloseEdit();
	};

	const handleChangeCheckbox = async () => {
		await toggleTodo(todo.id);
	};

	return (
		<>
			<Card
				style={{ opacity: todo.isCompleted ? 0.6 : 1 }}
				sx={{ width: '100%' }}
			>
				<CardContent>
					<Box display={'flex'} justifyContent={'space-between'} columnGap={3}>
						<Box alignSelf={'center'}>
							<Checkbox
								disabled={isToggleLoading}
								value={todo.isCompleted}
								onChange={handleChangeCheckbox}
							/>
						</Box>
						<Box flex={1}>
							<Typography
								variant="h5"
								style={{
									textDecoration: todo.isCompleted ? 'line-through' : 'none',
								}}
							>
								{todo.title}
							</Typography>
							<Typography variant="body2" color="textSecondary">
								{todo.description}
							</Typography>
							<Typography variant="body2" color="textSecondary">
								Due: {dayjs(todo.dueDate).format('MMMM D, YYYY h:mm A')}
							</Typography>
						</Box>

						<Box>
							<IconButton onClick={handleMenuClick} size="small">
								<MoreVertIcon />
							</IconButton>
						</Box>
					</Box>

					<Menu
						anchorEl={anchorEl}
						open={Boolean(anchorEl)}
						onClose={handleMenuClose}
					>
						<MenuItem onClick={handleEdit}>Edit</MenuItem>
						<MenuItem onClick={handleRemove}>Remove</MenuItem>
					</Menu>
				</CardContent>
			</Card>

			<StyledModal open={openEdit} onClose={handleCloseEdit}>
				<TodoForm
					actionButtonText={'Update'}
					initialValues={{
						title: todo.title,
						description: todo.description,
						dueDate: dayjs(todo.dueDate),
					}}
					onCancel={handleCloseEdit}
					onSubmit={handleSubmitEdit}
					loading={isEditLoading}
				/>
			</StyledModal>

			<StyledModal open={openConfirm} onClose={handleConfirmClose}>
				<DialogTitle>Confirm Removal</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Are you sure you want to remove this todo item?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={handleConfirmClose}
						color="primary"
						disabled={isRemoveLoading}
						sx={{ mr: 2 }}
					>
						Cancel
					</Button>

					<LoadingButton
						loading={isRemoveLoading}
						variant={'contained'}
						onClick={handleConfirmRemove}
						color="error"
					>
						Confirm
					</LoadingButton>
				</DialogActions>
			</StyledModal>
		</>
	);
};

export default TodoItem;
