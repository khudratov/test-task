import React from 'react';
import { Box, Typography } from '@mui/material';

interface Props {
	errorMessage?: string;
}

const ErrorText: React.FC<Props> = ({ errorMessage }) => {
	return (
		<Box
			display="flex"
			justifyContent="center"
			alignItems="center"
			textAlign="center"
		>
			<Typography variant="h6" color="error">
				{errorMessage || 'Something went wrong. Please try again later.'}
			</Typography>
		</Box>
	);
};

export default ErrorText;
