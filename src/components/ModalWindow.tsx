import {
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Modal,
} from '@mui/material';
import React from 'react';
import { Photo } from '../AppTypes';

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
		<Modal
			open={isOpen}
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}>
			<Card sx={{ width: '50%', minWidth: '300px' }}>
				<CardMedia component="img" image={photo.url} alt={photo.title} />
				<CardContent component={'h2'} sx={{ margin: 0, padding: '1% 3%' }}>
					{photo.title}
				</CardContent>
				<CardActions>
					<Button onClick={toggleIsOpen}>Close</Button>
				</CardActions>
			</Card>
		</Modal>
	);
};

export default ModalWindow;
