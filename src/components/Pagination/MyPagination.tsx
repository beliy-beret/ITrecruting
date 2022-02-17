import { Pagination } from '@mui/material';
import React from 'react';
import { PhotoCards } from '../../AppTypes';
import { useAppDispatch } from '../../hooks';
import { setPageNumber } from '../../redux/photosSlice';

type Props = {
	photoPages: PhotoCards[];
	pageNumber: number;
};

const MyPagination: React.FC<Props> = ({ photoPages, pageNumber }) => {
	const dispatch = useAppDispatch();
	const pageCount = photoPages.length - 1;
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
		/>
	);
};

export default MyPagination;
