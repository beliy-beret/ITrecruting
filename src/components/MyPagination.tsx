import React from 'react';
import { Pagination } from '@mui/material';
import { PhotoCards } from '../AppTypes';
import { useAppDispatch } from '../hooks';
import { setPageNumber } from '../redux/photosSlice';

type Props = {
	photoPages: PhotoCards[];
	pageNumber: number;
};

const MyPagination: React.FC<Props> = ({ photoPages, pageNumber }) => {
	const dispatch = useAppDispatch();
	const pageCount = photoPages.length;
	function changeCurrentPage(e: React.ChangeEvent<unknown>, value: number) {
		dispatch(setPageNumber(value));
	}

	return (
		<Pagination
			count={pageCount}
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

export default MyPagination;
