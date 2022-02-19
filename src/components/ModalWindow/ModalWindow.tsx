import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Modal,
	Typography,
} from '@mui/material';
import React from 'react';
import { Photo } from '../../AppTypes';

type Props = {
	isOpen: boolean;
	photo: Photo;
	setIsOpen: (status: boolean) => void;
};

const ModalWindow: React.FC<Props> = ({ isOpen, setIsOpen, photo }) => {
	function toggleIsOpen() {
		setIsOpen(false);
	}
	return (
		<Modal open={isOpen}>
			<Box>
				<Card sx={{ maxWidth: 345 }}>
					<CardMedia
						component="img"
						height="140"
						image={photo.url}
						alt={photo.title}
					/>
					<CardContent>
						<Typography variant="h3" component="h3">
							{photo.title}
						</Typography>
					</CardContent>
					<CardActions>
						<Button onClick={toggleIsOpen}>Close</Button>
					</CardActions>
				</Card>
			</Box>
		</Modal>
	);
};

export default ModalWindow;
