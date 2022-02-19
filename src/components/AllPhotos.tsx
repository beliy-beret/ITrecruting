import { Grid, useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Photo, PhotoCards } from '../AppTypes';
import { useAppDispatch, useAppSelector } from '../hooks';
import { changePhotoList } from '../redux/photosSlice';
import { RootState } from '../redux/store';
import MyPagination from './MyPagination';
import PhotoCard from './PhotoCard';

type Props = {
	allPhotos: Photo[];
	setModalData: (id: number) => void;
	setIsOpen: (status: boolean) => void;
};

const AllPhotos: React.FC<Props> = ({ allPhotos, setModalData, setIsOpen }) => {
	const pageSize = 12;
	const maxWidth = useMediaQuery('(max-width:550px)');
	const { pageNumber } = useAppSelector((state: RootState) => state.userPhotos);
	const [pages, setPages] = useState<PhotoCards[]>([]);
	const dispatch = useAppDispatch();
	const activePage = pages[pageNumber - 1];

	useEffect(() => {
		setPages(getPhotoPages(allPhotos));
	}, [allPhotos]);

	function getPhotoPages(allPhotos: Photo[]) {
		let pages = [];
		for (let i = 0; i < Math.ceil(allPhotos.length / pageSize); i++) {
			pages.push(allPhotos.slice(i * pageSize, i * pageSize + pageSize));
		}
		return pages;
	}

	function deletePhoto(id: number) {
		const result = allPhotos.filter((item) => item.id !== id);
		dispatch(changePhotoList(result));
	}

	return (
		<>
			<MyPagination pages={pages.length} pageNumber={pageNumber} />
			<Grid container spacing={1}>
				{activePage?.map((item) => (
					<Grid item xs={maxWidth ? 4 : 3} key={item.id}>
						<PhotoCard
							key={item.id}
							imgUrl={item.thumbnailUrl}
							id={item.id}
							deletePhoto={deletePhoto}
							setModalData={setModalData}
							setIsOpen={setIsOpen}
						/>
					</Grid>
				))}
			</Grid>
		</>
	);
};

export default AllPhotos;
