import React, { useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import PhotoCard from './PhotoCard';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchAlbum } from '../redux/albumsSlice';
import AlbumPagination from './AlbumPagination';

type Props = {
	albumsCount: number;
	maxWidth: boolean;
	setModalData: (id: number) => void;
	setIsOpen: (status: boolean) => void;
	deletePhoto: (id: number) => void;
};

const AllAlbums: React.FC<Props> = ({
	albumsCount,
	maxWidth,
	setModalData,
	setIsOpen,
	deletePhoto,
}) => {
	const dispatch = useAppDispatch();
	const { album, albumId } = useAppSelector((state) => state.album);

	useEffect(() => {
		dispatch(fetchAlbum(albumId));
	}, [albumId, dispatch]);

	return (
		<>
			<Typography
				component={'h2'}
				align={'center'}
				variant={'h2'}
				sx={{ textDecoration: 'underline' }}>
				Albums
			</Typography>
			<AlbumPagination albumId={albumId} pages={albumsCount} />
			<Grid container spacing={1}>
				{album?.map((item) => (
					<Grid item xs={maxWidth ? 4 : 3} key={item.id}>
						<PhotoCard
							key={item.id}
							imgUrl={item.thumbnailUrl}
							id={item.id}
							setModalData={setModalData}
							setIsOpen={setIsOpen}
							deletePhoto={deletePhoto}
						/>
					</Grid>
				))}
			</Grid>
		</>
	);
};

export default AllAlbums;
