import React from 'react';
import { Button, Container, Pagination } from '@mui/material';
import { fetchPhotos } from '../redux/photosSlice';
import { useAppDispatch } from '../hooks';

const App: React.FC = () => {
	const dispatch = useAppDispatch();
	function onSubmit() {
		dispatch(fetchPhotos());
	}

	return (
		<div>
			<Container maxWidth="lg">
				<Pagination count={10} color="primary" shape="rounded" />
				<Button variant="contained" onClick={onSubmit}>
					Get photos
				</Button>
			</Container>
		</div>
	);
};

export default App;
