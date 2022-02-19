import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import { Photo, PhotoCards } from '../AppTypes';
import { useAppSelector } from '../hooks';
import PhotoPagination from './PhotoPagination';
import PhotoCard from './PhotoCard';

type Props = {
	allPhotos: Photo[];
	maxWidth: boolean;
	setModalData: (id: number) => void;
	setIsOpen: (status: boolean) => void;
	deletePhoto: (id: number) => void;
};

const AllPhotos: React.FC<Props> = ({
	allPhotos,
	setModalData,
	setIsOpen,
	deletePhoto,
	maxWidth,
}) => {
	const pageSize = 12;
	const { pageNumber } = useAppSelector((state) => state.userPhotos);
	const [pages, setPages] = useState<PhotoCards[]>([]);
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

	return (
		<>
			<Typography
				component={'h2'}
				align={'center'}
				variant={'h2'}
				sx={{ textDecoration: 'underline' }}>
				All photos
			</Typography>
			<PhotoPagination pages={pages.length} pageNumber={pageNumber} />
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
