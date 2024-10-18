import { Middleware, isRejectedWithValue } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

export interface ErrorPayload {
	data?: {
		error?: string;
	};
}

export const rtkQueryErrorNotify: Middleware = () => next => action => {
	if (isRejectedWithValue(action)) {
		const errorPayload = action.payload as ErrorPayload;
		const errorMessage =
			errorPayload.data?.error || 'An unexpected error occurred';
		toast.error(errorMessage);
	}

	return next(action);
};
