import React from 'react';
import { Button, Container } from '@mui/material';
import { fetchPhotos } from '../redux/photosSlice';
import { useAppDispatch, useAppSelector } from '../hooks';
import MyPagination from './Pagination/MyPagination';
import PhotoCard from './PhotoCard/PhotoCard';
import style from './app.module.css';

const App: React.FC = () => {
	const dispatch = useAppDispatch();
	const { photoPages, pageNumber } = useAppSelector(
		(state) => state.userPhotos
	);
	function onSubmit() {
		dispatch(fetchPhotos());
	}
	const currentPage = photoPages[pageNumber];

	return (
		<div>
			<Container maxWidth="lg">
				<MyPagination photoPages={photoPages} pageNumber={pageNumber} />
				<div className={style.photoList}>
					{currentPage?.map((item) => (
						<PhotoCard
							key={item.id}
							imgUrl={item.thumbnailUrl}
							title={item.title}
						/>
					))}
				</div>
				<Button variant="contained" onClick={onSubmit}>
					Get photos
				</Button>
			</Container>
		</div>
	);
};

export default App;
