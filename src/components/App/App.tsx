import React, { useEffect } from 'react';
import { Container } from '@mui/material';
import { fetchPhotos, setCurrentPage } from '../../redux/photosSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import MyPagination from '../Pagination/MyPagination';
import PhotoCard from '../PhotoCard/PhotoCard';
import style from './app.module.css';

const App: React.FC = () => {
	const dispatch = useAppDispatch();
	const { photoPages, pageNumber, currentPage } = useAppSelector(
		(state) => state.userPhotos
	);

	function deletePhoto(id: number) {
		const result = currentPage.filter((item) => item.id !== id);
		dispatch(setCurrentPage(result));
	}

	useEffect(() => {
		dispatch(fetchPhotos());
	}, [dispatch]);

	useEffect(() => {
		dispatch(setCurrentPage(photoPages[pageNumber - 1]));
	}, [pageNumber, photoPages, dispatch]);
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
							id={item.id}
							deletePhoto={deletePhoto}
						/>
					))}
				</div>
			</Container>
		</div>
	);
};

export default App;
