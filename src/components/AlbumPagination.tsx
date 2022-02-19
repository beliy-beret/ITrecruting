import React from 'react';
import { Pagination, Typography } from '@mui/material';
import { useAppDispatch } from '../hooks';
import { setAlbumId } from '../redux/albumsSlice';

type Props = {
	pages: number;
	albumId: number;
};

const AlbumPagination: React.FC<Props> = ({ pages, albumId }) => {
	const dispatch = useAppDispatch();
	function changeAlbumId(e: React.ChangeEvent<unknown>, value: number) {
		dispatch(setAlbumId(value));
	}

	return (
		<>
			<Typography
				component={'h3'}
				variant={'h3'}
				align={'center'}
				sx={{ textDecoration: 'underline' }}>
				albums id
			</Typography>
			<Pagination
				count={pages}
				color="primary"
				shape="rounded"
				page={albumId}
				onChange={changeAlbumId}
				sx={{
					marginY: 2,
					marginX: 'auto',
					width: '50%',
					minWidth: '350px',
				}}
			/>
		</>
	);
};

export default AlbumPagination;
