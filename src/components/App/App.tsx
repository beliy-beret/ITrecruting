import React, { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import { fetchPhotos, setCurrentPage } from '../../redux/photosSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import MyPagination from '../Pagination/MyPagination';
import PhotoCard from '../PhotoCard/PhotoCard';
import { Photo } from '../../AppTypes';
import style from './app.module.css';
import ModalWindow from '../ModalWindow/ModalWindow';

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
		<div>
			<MyPagination photoPages={photoPages} pageNumber={pageNumber} />
			<Container maxWidth="lg">
				<div className={style.photoList}>
					{currentPage?.map((item) => (
						<PhotoCard
							key={item.id}
							imgUrl={item.thumbnailUrl}
							title={item.title}
							id={item.id}
							deletePhoto={deletePhoto}
							setModalData={setModalData}
							setIsOpen={setIsOpen}
						/>
					))}
				</div>
				<ModalWindow
					isOpen={isOpen}
					setIsOpen={setIsOpen}
					photo={activePhoto}
				/>
			</Container>
		</div>
	);
};

export default App;
