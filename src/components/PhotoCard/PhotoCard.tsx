import React from 'react';
import style from './photoCard.module.css';
import DeleteIcon from '@mui/icons-material/Delete';

type Props = {
	imgUrl: string;
	title: string;
};

const PhotoCard: React.FC<Props> = ({ imgUrl, title }) => {
	return (
		<div className={style.card}>
			<img src={imgUrl} alt={title} />
			<h2 className={style.title}>{title}</h2>
			<button className={style.delete}>
				<DeleteIcon />
			</button>
		</div>
	);
};

export default PhotoCard;
