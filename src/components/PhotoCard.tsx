import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { Card, CardMedia } from '@mui/material';

type Props = {
	imgUrl: string;
	id: number;
	deletePhoto: (id: number) => void;
	setModalData: (id: number) => void;
	setIsOpen: (status: boolean) => void;
};

const PhotoCard: React.FC<Props> = ({
	imgUrl,
	id,
	deletePhoto,
	setModalData,
	setIsOpen,
}) => {
	function onClickPhoto() {
		setModalData(id);
		setIsOpen(true);
	}

	function onClickButton() {
		deletePhoto(id);
	}

	return (
		<Card sx={{ position: 'relative' }}>
			<CardMedia component={'img'} image={imgUrl} onClick={onClickPhoto} />
			<DeleteIcon
				onClick={onClickButton}
				sx={{ position: 'absolute', top: '1rem', right: '1rem' }}
			/>
		</Card>
	);
};

export default PhotoCard;
