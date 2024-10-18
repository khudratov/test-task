import { FC } from 'react';
import { useFormik } from 'formik';
import { Box, Button, TextField } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { LoadingButton } from '@mui/lab';
import * as yup from 'yup';

import { TodoFormik, TodoRequest } from '../types.ts';

interface Props {
	onCancel: () => void;
	onSubmit: (values: TodoRequest) => void;
	initialValues?: TodoFormik;
	loading?: boolean;
	actionButtonText: string;
}

const validationSchema = yup.object().shape({
	title: yup.string().required('Title is required'),
	dueDate: yup.string().required('Due date is required'),
});

const TodoForm: FC<Props> = props => {
	const {
		actionButtonText,
		loading,
		onCancel,
		onSubmit,
		initialValues = {
			title: '',
			description: '',
			isCompleted: false,
			dueDate: null,
		},
	} = props;

	const innerSubmit = (values: TodoFormik) => {
		if (values.dueDate) {
			const convertedData = {
				...values,
				dueDate: values.dueDate.format(
					'YYYY-MM-DDTHH:mm:ss',
				) as unknown as Date,
			};

			onSubmit(convertedData);
		}
	};

	const { values, handleSubmit, setFieldValue, handleChange, errors, touched } =
		useFormik({
			validationSchema,
			initialValues,
			onSubmit: innerSubmit,
		});

	return (
		<form onSubmit={handleSubmit}>
			<Box display={'flex'} flexDirection={'column'} rowGap={4}>
				<TextField
					label="Title"
					value={values.title}
					helperText={touched.title && errors.title}
					error={touched.title && !!errors.title}
					onChange={handleChange('title')}
				/>

				<TextField
					label="Description"
					value={touched.description && values.description}
					helperText={errors.description}
					error={touched.description && !!errors.description}
					onChange={handleChange('description')}
				/>

				<DateTimePicker
					slotProps={{
						textField: {
							error: touched.dueDate && !!errors.dueDate,
							helperText: touched.dueDate && errors.dueDate,
						},
					}}
					label="Due Date"
					value={values.dueDate}
					onChange={value => {
						console.log(value);
						setFieldValue('dueDate', value);
					}}
				/>

				<Box
					gap={2}
					sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}
				>
					<Button
						disabled={loading}
						variant={'contained'}
						fullWidth
						color={'inherit'}
						size={'large'}
						onClick={onCancel}
					>
						Cancel
					</Button>

					<LoadingButton
						loading={loading}
						type={'submit'}
						size={'large'}
						variant={'contained'}
						fullWidth
					>
						{actionButtonText}
					</LoadingButton>
				</Box>
			</Box>
		</form>
	);
};

export default TodoForm;
