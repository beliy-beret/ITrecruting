import React from 'react';
import { Pagination } from '@mui/material';
import { useAppDispatch } from '../hooks';
import { setPageNumber } from '../redux/photosSlice';

type Props = {
	pages: number;
	pageNumber: number;
};

const PhotoPagination: React.FC<Props> = ({ pages, pageNumber }) => {
	const dispatch = useAppDispatch();
	function changeCurrentPage(e: React.ChangeEvent<unknown>, value: number) {
		dispatch(setPageNumber(value));
	}

	return (
		<Pagination
			count={pages}
			color="primary"
			shape="rounded"
			page={pageNumber}
			onChange={changeCurrentPage}
			sx={{
				marginY: 2,
				marginX: 'auto',
				width: '50%',
				minWidth: '350px',
			}}
		/>
	);
};

export default PhotoPagination;
