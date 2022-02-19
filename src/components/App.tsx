import React, { useEffect, useState } from 'react';
import { Container, Grid } from '@mui/material';
import { fetchPhotos, setCurrentPage } from '../redux/photosSlice';
import { useAppDispatch, useAppSelector } from '../hooks';
import { Photo } from '../AppTypes';
import MyPagination from './MyPagination';
import PhotoCard from './PhotoCard';
import ModalWindow from './ModalWindow';

const App: React.FC = () => {
	const dispatch = useAppDispatch();
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [activePhoto, setActivePhoto] = useState<Photo>({
		albumId: 0,
		id: 0,
		thumbnailUrl: '',
		title: '',
		url: '',
	});
	const { photoPages, pageNumber, currentPage } = useAppSelector(
		(state) => state.userPhotos
	);

	function setModalData(id: number) {
		const active = currentPage.find((item) => item.id === id);
		active && setActivePhoto(active);
	}

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
		<Container maxWidth="lg">
			<MyPagination photoPages={photoPages} pageNumber={pageNumber} />
			<Grid container spacing={1}>
				{currentPage?.map((item) => (
					<Grid item xs={3} key={item.id}>
						<PhotoCard
							key={item.id}
							imgUrl={item.thumbnailUrl}
							id={item.id}
							deletePhoto={deletePhoto}
							setModalData={setModalData}
							setIsOpen={setIsOpen}
						/>
					</Grid>
				))}
			</Grid>
			<ModalWindow isOpen={isOpen} setIsOpen={setIsOpen} photo={activePhoto} />
		</Container>
	);
};

export default App;
