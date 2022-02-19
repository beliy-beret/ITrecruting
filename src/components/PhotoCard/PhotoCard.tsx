import React from 'react';
import style from './photoCard.module.css';
import DeleteIcon from '@mui/icons-material/Delete';

type Props = {
	imgUrl: string;
	title: string;
	id: number;
	deletePhoto: (id: number) => void;
	setModalData: (id: number) => void;
	setIsOpen: (status: boolean) => void;
};

const PhotoCard: React.FC<Props> = ({
	imgUrl,
	title,
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
		<div className={style.card}>
			<img src={imgUrl} alt={title} onClick={onClickPhoto} />
			<h2 className={style.title}>{title}</h2>
			<button className={style.delete} onClick={onClickButton}>
				<DeleteIcon />
			</button>
		</div>
	);
};

export default PhotoCard;
