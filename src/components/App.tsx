import React, { useEffect, useState } from 'react';
import { Container, useMediaQuery } from '@mui/material';
import { changePhotoList, fetchPhotos } from '../redux/photosSlice';
import { useAppDispatch, useAppSelector } from '../hooks';
import { Photo } from '../AppTypes';
import ModalWindow from './ModalWindow';
import AllPhotos from './AllPhotos';
import AllAlbums from './AllAlbums';

const App: React.FC = () => {
	const dispatch = useAppDispatch();
	const maxWidth = useMediaQuery('(max-width:550px)');
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [activePhoto, setActivePhoto] = useState<Photo>({
		albumId: 0,
		id: 0,
		thumbnailUrl: '',
		title: '',
		url: '',
	});
	const { allPhotos } = useAppSelector((state) => state.userPhotos);
	const albumsCount = allPhotos[allPhotos.length - 1]?.albumId;

	function setModalData(id: number) {
		const active = allPhotos.find((item) => item.id === id);
		active && setActivePhoto(active);
	}

	function deletePhoto(id: number) {
		const result = allPhotos.filter((item) => item.id !== id);
		dispatch(changePhotoList(result));
	}

	useEffect(() => {
		dispatch(fetchPhotos());
	}, [dispatch]);

	return (
		<Container maxWidth="lg">
			<ModalWindow isOpen={isOpen} setIsOpen={setIsOpen} photo={activePhoto} />
			<AllPhotos
				allPhotos={allPhotos}
				setModalData={setModalData}
				setIsOpen={setIsOpen}
				deletePhoto={deletePhoto}
				maxWidth={maxWidth}
			/>
			<AllAlbums
				albumsCount={albumsCount}
				maxWidth={maxWidth}
				setIsOpen={setIsOpen}
				setModalData={setModalData}
				deletePhoto={deletePhoto}
			/>
		</Container>
	);
};

export default App;
