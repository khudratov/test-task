import React, { ReactNode } from 'react';
import { Box, Modal, Typography } from '@mui/material';

interface StyledModalProps {
	open: boolean;
	onClose: () => void;
	title?: string;
	children: ReactNode;
	minWidth?: string | number;
}

const style = {
	position: 'absolute' as const,
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 4,
};

const StyledModal: React.FC<StyledModalProps> = props => {
	const { open, onClose, title, children, minWidth = '80%' } = props;

	return (
		<Modal open={open} onClose={onClose}>
			<Box sx={{ ...style, minWidth }}>
				{title && (
					<Typography variant="h6" component="h2" mb={2}>
						{title}
					</Typography>
				)}
				{children}
			</Box>
		</Modal>
	);
};

export default StyledModal;
