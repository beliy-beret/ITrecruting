import React from 'react';
import { Button, Container } from '@mui/material';
import { fetchPhotos } from '../redux/photosSlice';
import { useAppDispatch, useAppSelector } from '../hooks';
import MyPagination from './Pagination/MyPagination';

const App: React.FC = () => {
	const dispatch = useAppDispatch();
	const { photoPages, pageNumber } = useAppSelector(
		(state) => state.userPhotos
	);
	function onSubmit() {
		dispatch(fetchPhotos());
	}

	return (
		<div>
			<Container maxWidth="lg">
				<MyPagination photoPages={photoPages} pageNumber={pageNumber} />
				<Button variant="contained" onClick={onSubmit}>
					Get photos
				</Button>
			</Container>
		</div>
	);
};

export default App;
