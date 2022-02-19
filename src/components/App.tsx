import React, { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import { fetchPhotos } from '../redux/photosSlice';
import { useAppDispatch, useAppSelector } from '../hooks';
import { Photo } from '../AppTypes';
import ModalWindow from './ModalWindow';
import AllPhotos from './AllPhotos';

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
	const { allPhotos } = useAppSelector((state) => state.userPhotos);

	function setModalData(id: number) {
		const active = allPhotos.find((item) => item.id === id);
		active && setActivePhoto(active);
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
			/>
		</Container>
	);
};

export default App;
