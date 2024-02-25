import { DrawerContext } from '@/app/context/DrawerContext';
import styled from '@emotion/styled';
import { Button, Drawer, IconButton, Divider, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useContext, useEffect } from 'react';
import { CountrySpecies } from '@/app/context/CountrySpecies';
import { CountryContext } from '@/app/context/CountryContext';
import MapOptions from './MapOptions';

export default function MapDrawer({ userUid }) {
	const { isDrawerOpen, toggleDrawer } = useContext(DrawerContext);
	const { countrySpecies } = useContext(CountrySpecies);
	const { country } = useContext(CountrySpecies);

	const handleDrawerClose = () => {
		toggleDrawer(!isDrawerOpen);
	};

	const DrawerHeader = styled('div')`
		display: flex;
		align-items: center;
		justify-content: flex-end;
		padding: 8px 8px;
	`;

	useEffect(() => {
		console.log(country);
	}, [countrySpecies, country]);

	return (
		<Drawer
			variant="temporary"
			anchor="left"
			open={isDrawerOpen}
			onClose={handleDrawerClose}
			ModalProps={{
				keepMounted: true, // Better open performance on mobile.
			}}
			hideBackdrop={true}
		>
			<DrawerHeader>
				<Typography
					variant="h6"
					sx={{
						paddingLeft: '1rem',
						marginRight: 'auto',
						textAlign: 'center',
					}}
				>
					Map Options
				</Typography>
				<IconButton onClick={handleDrawerClose}>
					<ChevronLeftIcon />
				</IconButton>
			</DrawerHeader>
			<Divider />
			<MapOptions userUid={userUid} />
		</Drawer>
	);
}
